---
title: 'How I built a 24/7 AI research assistant for my youtube channel'
description: 'From burnout to automation: a deep dive into the AI-powered workflow that runs my YouTube content engine.'
pubDate: '2025-04-17'
heroImage: '/images/blogs/burnout-to-automation-cover.jpg'
---

Before I built this workflow, my process was a recipe for burnout. I was doing everything manually:

- **Endless research:** Daily, I’d scour Reddit finance threads, Google Trends, and dozens of news sites, trying to spot the next big thing.
- **Creative drain:** I had to invent engaging hooks, compelling titles, and thumbnail ideas from scratch every single time.
- **The writing grind:** Churning out long-form educational scripts is incredibly time-consuming.
- **Organizational chaos:** I was trying to track all my ideas, scripts, and uploads in a messy and inconsistent spreadsheet.

All this busy work was robbing me of the one thing that truly matters on YouTube: publishing high-quality content consistently. I wasn't just fighting for ideas; I was fighting for my time and mental space.

## The solution – a youtube AI research assistant

I designed a multi-stage automated pipeline in n8n that acts as my [research and production assistant](https://github.com/Toms-x/automation-projects/tree/main/script-generator). Here’s a technical and logical breakdown of how it works.

![YouTube personal research assistant workflow](/blogs/youtube-assistant-workflow.png)

### 1. The content research engine

This workflow runs automatically every 24 hours, centered around a GPT-4o powered AI agent. This agent uses specialized sub-workflows as tools to query a wide range of online financial information, systematically scraping and structuring data from three key sources:

#### - Reddit research tool:

![A diagram of the Reddit research tool workflow](/images/blogs/reddit-research-tool.png)

This sub-workflow is designed to gather and rank the most engaging posts from three finance-related subreddits: **r/StockMarket**, **r/personalfinance**, and **r/Bitcoin**. It fetches the "top" posts from each community and then applies a custom scoring logic to every post. This "weighted score" prioritizes recent posts with a high number of both upvotes and comments, aiming to identify the most relevant and trending discussions.

After scoring and filtering out any posts that don't contain text, the workflow merges the processed lists from all three subreddits into a single master list. It then extracts key information like the title, content, and custom score into a clean, standardized format. The final step aggregates all the post titles, creating a consolidated list of the top-ranked discussions from across the three financial communities.

#### - Finance news:

![A diagram of the Finance news workflow](/images/blogs/finance-news-workflow.png)

This subworkflow works by gathering financial information for a particular stock using the Finnhub API. It begins by configuring necessary parameters like the stock symbol and a 7-day date range for news. It then simultaneously fetches three distinct sets of data: the stock quote, general market news, and recent news articles specifically about the stock.

Once the raw data is retrieved, the workflow processes each type to clean it up and create a standardized format. It renames data fields for clarity, calculates how long ago each news article was published, and even adds a custom market sentiment tag to the stock quote. Finally, it merges all the formatted data into a single list and selects key fields to produce a unified output of news articles.

#### - Google trends:

![A diagram of the Google Trends workflow](/images/blogs/google-trends-workflow.png)

This sub-workflow fetches a list of trending financial keywords from a specific Google Sheet. This sheet is updated every 24 hours with the latest trending finance-related search terms from the United States.

Once triggered, the workflow connects to the Google Sheet and reads its contents. It then isolates the column named "keywords" and renames it to "topics" for clarity and standardization. The final output is a clean list of these trending terms, which is then passed back to the parent workflow that initiated the request.

### 2. The human checkpoint via slack

This is the most crucial design choice: keeping a human in the loop. While AI is great at processing data, human intuition is irreplaceable for quality content. Using n8n's Wait Node, the system sends me a concise Slack message every morning.

The message looks something like this:

📌 Here are your top 5 hot topics for today.
👉 Click below to approve and generate scripts:
[Resume Workflow]

This single step saves me 90% of the time I’d normally spend on manual research, while ensuring I have the final say on the creative direction.

### 3. Smart content generation

Once I approve the topics, the real magic begins. The selected topics are fed into another Large Language Model (LLM) that acts as a creative partner. It generates a structured JSON object containing everything I need for production:

1.  A compelling video hook to grab the viewer's attention in the first 15 seconds.
2.  A full-length educational script (1900-2200 words).
3.  Three catchy, SEO-friendly title suggestions.
4.  Three short, punchy thumbnail hooks for visual design.

### 4. Structured logging with google sheets

To maintain a clean record and analyze performance over time, every piece of generated content is automatically logged in a google sheet.

The fields include title, script_source, timestamp, and thumbnail_hooks. This turns my chaotic notes into a powerful database for content planning and strategy.

### 5. From Text-to-Speech with a final review

As a final step, the approved script can be pushed directly to the ElevenLabs API to generate a realistic, high-quality voiceover. And just like the topic selection, I’ve built in another slack-based human check so I can review and approve the final audio before it goes into video production.

## What this automation delivers

This isn’t just about automating tasks, it’s about freeing up my mental space to focus on the bigger picture: brand, strategy, and growth. My YouTube channel now operates with a system that:

✅ Feeds me curated topics daily, eliminating decision fatigue.
✅ Writes data-driven scripts that are often better than what I could write on a bad day.
✅ Lets me intervene only when necessary, respecting my time and intuition.
✅ Keeps meticulous logs for content planning and performance analytics.
✅ Feels like I have a small content team working for me 24/7.

So with one workflow, and three subworkflows as tools I built a content engine that respects creativity while leveraging the raw power of automation.

The future of content creation isn't about choosing between human insight and AI efficiency. It's about orchestrating them in perfect harmony. This system has allowed me to focus on vision rather than execution.

You don’t need a bigger team. You need better systems.

If you’re a creator, brand, or business curious about using automation to save hours every week, make sure you subscribe to my weekly newsletter below. It’s packed with practical tips, real workflows, and insights from behind the scenes. For collaborations, workflow audits, or consulting, feel free to reach out.