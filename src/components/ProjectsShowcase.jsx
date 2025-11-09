// src/components/ProjectsShowcase.jsx
import React, { useState } from 'react';
import { ExternalLink, Github, Play, FileText, Filter } from 'lucide-react';

export default function ProjectsShowcase() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(3);

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'automation', name: 'Automation & Integrations' },
    { id: 'ml', name: 'Machine Learning' },
    { id: 'analytics', name: 'Data Analytics' },
    { id: 'web3', name: 'Web3 & Blockchain' }
  ];

  const projects = [
    // Automation Projects
    {
      id: 7,
      title: 'Smart Contract Monitoring System',
      category: 'web3',
      status: 'completed',
      description: 'Real-time monitoring system tracking smart contract events and anomalies with automated alerting.',
      thumbnail: '/images/blogs/smart-contract-dashboard.jpg',
      techStack: ['Python', 'Web3.py', 'Etherscan API', 'n8n', 'Openai'],
      metrics: { label: 'Contracts Monitored', value: '2+' },
      links: [
        { type: 'demo', label: 'View Demo', url: 'https://dashboard-web-432979189889.us-central1.run.app/' },
        { type: 'github', label: 'See Code', url: 'https://github.com/Toms-x/smart-contract-monitor' }
      ]
    },
    {
      id: 1,
      title: 'AI-powered reddit lead generation and ad creation',
      category: 'automation',
      status: 'completed',
      description: 'n8n workflow that automatically finds potential customers on Reddit by identifying users discussing pain points your product solves, then generates personalized ad content for direct engagement.',
      thumbnail: '/images/blogs/reddit-ad-workflow.png',
      techStack: ['n8n', 'Supabase', 'RSS Feed', 'OpenAI API', 'HTTP Request nodes', 'Reddit API'],
      metrics: { label: 'Time Saved', value: '10 hrs/week' },
      links: [
        { type: 'demo', label: 'View Workflow', url: '#' },
        { type: 'docs', label: 'Documentation', url: 'https://github.com/Toms-x/automation-projects/tree/main/reddit-ad' }
      ]
    },
    {
      id: 2,
      title: 'AI finance research assistant',
      category: 'automation',
      status: 'completed',
      description: 'n8n workflow that runs every 24 hours, using GPT-4o to automatically gather, analyze, and structure financial data from Reddit discussions, Finnhub news, and Google Trends for comprehensive market intelligence.',
      thumbnail: '/images/blogs/youtube-writer-workflow.png',
      techStack: ['n8n', 'Webhooks', 'Finnhub API', 'OpenAI API', 'REST APIs', 'PostgreSQL'],
      metrics: { label: 'Integrations', value: '10 platforms' },
      links: [
        { type: 'demo', label: 'View Demo', url: '#' },
        { type: 'github', label: 'See Code', url: 'https://github.com/Toms-x/automation-projects/tree/main/script-generator' }
      ]
    },
    // ML Projects (Coming Soon)
    {
      id: 3,
      title: 'Crypto Price Prediction Model',
      category: 'ml',
      status: 'in-progress',
      description: 'Machine learning model predicting cryptocurrency price movements using technical indicators and sentiment analysis.',
      thumbnail: '🤖',
      techStack: ['Python', 'TensorFlow', 'Pandas', 'Scikit-learn'],
      metrics: { label: 'Progress', value: '60%' },
      links: [
        { type: 'github', label: 'View Progress', url: '#' }
      ]
    },
    {
      id: 4,
      title: 'SEO Content Automation Dashboard',
      category: 'ml',
      status: 'in-progress',
      description: 'A custom Machine Learning pipeline (Python/NLTK) integrated into the Netlify build process to automate SEO optimization suggestions for content on this website.',
      thumbnail: '🎨',
      techStack: ['Python', 'NLTK', 'Astro', 'Tailwind CSS', 'Netlify CI/CD'],
      metrics: { label: 'Articles Analyzed', value: '6+' },
      links: [
        { type: 'live', label: 'View Live Dashboard', url: '/seo-dashboard' }
      ]
    },
    // Analytics Projects
    {
      id: 5,
      title: 'DeFi Protocol TVL Dashboard',
      category: 'analytics',
      status: 'completed',
      description: 'Interactive dashboard tracking Total Value Locked across major DeFi protocols with trend analysis and comparative metrics.',
      thumbnail: '📊',
      techStack: ['Python', 'Plotly', 'DeFiLlama API', 'Streamlit'],
      metrics: { label: 'Protocols Tracked', value: '12+' },
      links: [
        { type: 'demo', label: 'Live Dashboard', url: '#' },
        { type: 'docs', label: 'Read Analysis', url: '#' },
        { type: 'github', label: 'View Code', url: '#' }
      ]
    },
    {
      id: 6,
      title: 'Web3 User Behavior Analytics',
      category: 'analytics',
      status: 'completed',
      description: 'Comprehensive analysis of user engagement patterns across Web3 platforms, identifying key retention factors.',
      thumbnail: '📈',
      techStack: ['Python', 'Pandas', 'Tableau', 'SQL'],
      metrics: { label: 'Users Analyzed', value: '50K+' },
      links: [
        { type: 'demo', label: 'View Dashboard', url: '#' },
        { type: 'docs', label: 'Read Report', url: '#' }
      ]
    },
    // Web3 Projects
    {
      id: 8,
      title: 'On-Chain Data Visualization Platform',
      category: 'web3',
      status: 'in-progress',
      description: 'Interactive platform visualizing blockchain transaction flows and wallet behaviors for better transparency.',
      thumbnail: '⛓️',
      techStack: ['React', 'D3.js', 'The Graph', 'Alchemy API'],
      metrics: { label: 'Progress', value: '75%' },
      links: [
        { type: 'github', label: 'View Progress', url: '#' }
      ]
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);
  
  // only show the projects up to the visibleCount.
  const projectsToShow = filteredProjects.slice(0, visibleCount);

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    // when the filter changes, reset to showing 3.
    setVisibleCount(3);
  };

  const getStatusBadge = (status) => {
    const badges = {
      completed: { label: 'Completed', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
      'in-progress': { label: 'In Progress', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
      'coming-soon': { label: 'Coming Soon', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' }
    };
    return badges[status];
  };

  const getLinkIcon = (type) => {
    const icons = {
      demo: <Play size={16} />,
      github: <Github size={16} />,
      docs: <FileText size={16} />
    };
    return icons[type];
  };

  return (
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-100 mb-4">
            My Projects
          </h2>
          <p className="text-lg text-slate-300 mb-12 max-w-3xl mx-auto">
            Explore my diverse portfolio across key areas of data science, automation, and blockchain analytics
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleFilterChange(cat.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeFilter === cat.id
                  ? 'bg-white text-slate-900 shadow-lg scale-105'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 3. UPDATE THE MAP: Use projectsToShow instead of filteredProjects */}
          {projectsToShow.map((project) => {
            const statusBadge = getStatusBadge(project.status);
            return (
              <div
                key={project.id}
                className="bg-slate-800 rounded-lg border border-slate-700 hover:border-slate-500 transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/50 overflow-hidden group"
              >
                {/* ... Card content remains the same ... */}
                <div className="bg-gradient-to-br from-slate-700 to-slate-800 p-1 flex items-center justify-center border-b border-slate-700">
                  <img
                    src={project.thumbnail}
                    alt={`${project.title} thumbnail`}
                    className="w-full aspect-video object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusBadge.color}`}>
                      {statusBadge.label}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="mb-4">
                    <p className="text-xs text-slate-500 mb-2">Tech Stack:</p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-slate-700 text-slate-300 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4 p-3 bg-slate-700/50 rounded-lg">
                    <p className="text-xs text-slate-400">{project.metrics.label}</p>
                    <p className="text-lg font-bold text-white">{project.metrics.value}</p>
                  </div>
                  {project.links.length > 0 ? (
                    <div className="space-y-2">
                      {project.links.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between w-full p-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded transition-colors group/link"
                        >
                          <span className="text-sm font-medium flex items-center gap-2">
                            {getLinkIcon(link.type)}
                            {link.label}
                          </span>
                          <ExternalLink size={14} className="group-hover/link:translate-x-1 transition-transform" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-3 text-slate-500 text-sm italic">
                      Details coming soon
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 5. ADD THE "SEE MORE" BUTTON: It only shows if there are more projects to load. */}
        {visibleCount < filteredProjects.length && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisibleCount(prevCount => prevCount + 3)}
              className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              See More Projects
            </button>
          </div>
        )}

        {/* Empty State and Coming Soon Section remain the same */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <Filter size={48} className="mx-auto text-slate-600 mb-4" />
            <p className="text-slate-400 text-lg">No projects found in this category</p>
          </div>
        )}

        <div className="mt-16 p-8 bg-slate-800/50 border border-slate-700 rounded-lg text-center">
          <h3 className="text-2xl font-bold text-white mb-3">More Projects Coming Soon</h3>
          <p className="text-slate-400 max-w-2xl mx-auto">
            I'm constantly working on new projects in machine learning, automation, and blockchain analytics. 
            Check back regularly for updates!
          </p>
        </div>
      </div>
    </section>
  );
}