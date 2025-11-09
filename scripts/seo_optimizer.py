# scripts/seo_optimizer.py

import os
import json
import frontmatter
from textstat.textstat import textstat
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from collections import Counter
import re # For cleaning text

# --- NLTK for Keyword Generation ---
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

# --- Configuration ---
CONTENT_DIR = "src/content/blog" 
OUTPUT_FILE = "src/data/seo-reports.json"
# DEFAULT_KEYWORD is handled by the generation function if no content is found

# Initialize NLTK resources
STOP_WORDS = set(stopwords.words('english'))
analyzer = SentimentIntensityAnalyzer()


def generate_keyword_from_content(content_body):
    """
    Generates a composite keyword based on frequency analysis of the content body.
    This acts as the NLP-based fallback for missing frontmatter keywords.
    """
    if not content_body or len(content_body) < 50:
        return "marketing project machine learning" # Fixed fallback if content is too short

    # 1. Clean and Tokenize
    # Remove special characters and convert to lowercase
    text = re.sub(r'[^\w\s]', '', content_body).lower()
    
    # Tokenize the text into individual words
    words = word_tokenize(text)

    # 2. Filter Stop Words and Single-Letter Words
    filtered_words = [w for w in words if w not in STOP_WORDS and len(w) > 1]
    
    # 3. Frequency Analysis
    word_counts = Counter(filtered_words)
    
    # Get the top 3 most common words
    top_words = [word for word, count in word_counts.most_common(3)]
    
    # 4. Generate Composite Keyword (e.g., "astro marketing seo")
    generated_keyword = " ".join(top_words)
    
    # Fallback check
    if not generated_keyword:
         return "marketing project machine learning"
         
    return generated_keyword


# Add these two functions just below the analyze_content function in your script:

def calculate_seo_score(metrics):
    """
    Calculates a weighted SEO score based on metrics. 
    This is your simple ML/Intelligence model.
    """
    score = 0
    weights = {
        'keywordInTitle': 40,
        'wordCount_multiplier': 30,
        'readability_bonus': 15,
        'sentiment_bonus': 15
    }

    # 1. Keyword in Title (High Impact)
    if metrics['keywordInTitle'] == 1:
        score += weights['keywordInTitle']
    
    # 2. Word Count (Target: 800-1500 words)
    if 800 <= metrics['wordCount'] <= 1500:
        score += weights['wordCount_multiplier']
    elif 500 <= metrics['wordCount'] < 800 or metrics['wordCount'] > 1500:
        score += weights['wordCount_multiplier'] / 2
    
    # 3. Readability (Target: 60-70 Flesch-Kincaid)
    if 60 <= metrics['readabilityScore'] <= 70:
        score += weights['readability_bonus']
    elif metrics['readabilityScore'] > 70: # Too easy/simple
        score += weights['readability_bonus'] / 2
        
    # 4. Sentiment (Target: Neutral to Positive, > 0.1)
    if metrics['sentimentCompoundScore'] > 0.1:
        score += weights['sentiment_bonus']
        
    return int(min(score, 100)) # Ensure score doesn't exceed 100

def generate_suggestions(metrics, target_keyword):
    """Generates a list of actionable marketing suggestions."""
    suggestions = []
    
    # Suggestion 1: Keyword in Title
    if metrics['keywordInTitle'] == 0:
        suggestions.append(f"🔴 **High Priority:** Add the keyword '{target_keyword}' to the article title.")
    
    # Suggestion 2: Word Count
    if metrics['wordCount'] < 800:
        suggestions.append(f"🟡 **Content Depth:** Expand the article. Current word count is low ({metrics['wordCount']}). Target: 800+ words.")
    elif metrics['wordCount'] > 1500:
        suggestions.append(f"🟢 **Review Length:** Consider breaking the article into multiple posts. Current length is high ({metrics['wordCount']}).")
        
    # Suggestion 3: Readability
    if metrics['readabilityScore'] < 60:
        suggestions.append(f"🟡 **Readability:** Content may be too difficult to read (Score: {metrics['readabilityScore']:.1f}). Use shorter sentences and simpler vocabulary.")
    elif metrics['readabilityScore'] > 70:
        suggestions.append(f"🟢 **Readability:** Content may be too simple (Score: {metrics['readabilityScore']:.1f}). Ensure technical depth is sufficient.")

    # Suggestion 4: Keyword Density
    # Simple check for density (Keyword count / Total words). Target: 1-3%
    density = (metrics['keywordCount'] / metrics['wordCount']) * 100 if metrics['wordCount'] > 0 else 0
    if density < 0.5:
        suggestions.append(f"🟡 **Keyword Density:** Increase usage of '{target_keyword}'. Current density: {density:.2f}%.")

    return suggestions


# full analyze_content function

def analyze_content(filepath, target_keyword):
    """Reads a single content file, extracts metrics, calculates score, and generates suggestions."""
    with open(filepath, 'r', encoding='utf-8') as f:
        post = frontmatter.load(f)
    
    # 1. Data Extraction
    title = post.metadata.get('title', 'No Title')
    content_body = post.content # Markdown text body
    
    # 2. Metric Calculations
    
    # Word Count
    word_count = textstat.lexicon_count(content_body)
    
    # Readability Score (Flesch-Kincaid)
    readability = textstat.flesch_reading_ease(content_body)
    
    # Keyword Presence (Simple count/check)
    keyword_in_title = 1 if target_keyword.lower() in title.lower() else 0
    keyword_count = content_body.lower().count(target_keyword.lower())
    
    # Sentiment Score (using VADER)
    sentiment_score = analyzer.polarity_scores(content_body)['compound']
    
    # 3. Compile Report & Calculate Score/Suggestions
    report = {
        "slug": os.path.basename(filepath).replace('.md', '').replace('.mdx', ''),
        "title": title,
        "targetKeyword": target_keyword,
        "metrics": {
            "wordCount": word_count,
            "readabilityScore": readability,
            "keywordInTitle": keyword_in_title,
            "keywordCount": keyword_count,
            "sentimentCompoundScore": sentiment_score
        }
    }
    
    seo_score = calculate_seo_score(report['metrics'])
    suggestions = generate_suggestions(report['metrics'], target_keyword)
    
    report["seoScore"] = seo_score
    report["suggestions"] = suggestions
    
    return report


# scripts/seo_optimizer.py (MODIFIED main function - Final Attempt)

def main():
    """Main function to process all content files with robust error handling."""
    all_reports = []
    
    # CONFIRMING CONTENT_DIR is 'src/content/blog'
    CONTENT_DIR = "src/content/blog" 
    
    if not os.path.isdir(CONTENT_DIR):
        print(f"FATAL ERROR: Directory not found: '{CONTENT_DIR}'. Check path.")
        return

    print(f"Starting analysis on content in: {CONTENT_DIR}")

    # Use a case-insensitive, robust content filter
    for filename in os.listdir(CONTENT_DIR):
        
        # Convert filename to lowercase for matching
        filename_lower = filename.lower()
        
        # 1. Skip system files, hidden files, and config files
        if filename.startswith('.') or filename_lower.endswith(('.ts', '.js', '.json')):
            # print(f"DEBUG: Skipping system/config file: {filename}")
            continue 
            
        # 2. Check for content file extensions
        if filename_lower.endswith(('.md', '.mdx', '.markdown')):
            filepath = os.path.join(CONTENT_DIR, filename)
            
            try:
                # --- START of file processing logic (your existing code) ---
                
                # 1. Attempt to load the file and frontmatter
                with open(filepath, 'r', encoding='utf-8') as f:
                    try:
                        post = frontmatter.load(f)
                    except Exception as e:
                        print(f"❌ FRONTMATTER ERROR: Could not parse frontmatter in {filename}. Skipping.")
                        print(f"   Details: {e}")
                        continue 
                        
                target_keyword = post.metadata.get('targetKeyword')
                content_body = post.content 

                # 2. Generate Keyword if none found
                if not target_keyword:
                    target_keyword = generate_keyword_from_content(content_body)
                
                # 3. Analyze content
                report = analyze_content(filepath, target_keyword)
                all_reports.append(report)
                
            except Exception as e:
                # Catches other potential file or processing errors
                print(f"❌ UNKNOWN ERROR: Failed to process {filename} entirely. Skipping.")
                print(f"   Details: {e}")

    # Write the combined results to a JSON file (same as before)
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(all_reports, f, indent=2)
    
    print(f"\n✅ SEO analysis complete! Report saved to: {OUTPUT_FILE} ({len(all_reports)} articles analyzed)")

if __name__ == "__main__":
    main()