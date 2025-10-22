// src/components/ContentStrategy.jsx
import React, { useState } from 'react';
import { ExternalLink, ChevronDown } from 'lucide-react';

export default function ContentStrategy() {
  const [expandedCard, setExpandedCard] = useState(null);

  const companies = [
    {
      id: 'beincrypto',
      name: 'BeInCrypto',
      role: 'Crypto Content Writer',
      period: 'July 2021 - April 2024',
      color: 'from-blue-600 to-blue-400',
      icon: '📚',
      mainAchievement: '15+ In-Depth Guides on Web3 Fundamentals',
      metric: '100+ Articles Published',
      description: 'Researched and authored comprehensive long-form content educating users about Web3 and cryptocurrency.',
      highlights: [
        'Developed standardized data representation framework',
        'Improved user visibility into key performance metrics',
        'Covered diverse crypto topics for broad audience reach'
      ],
      links: [
        { label: 'View Article Portfolio', url: '#', type: 'primary' }
      ]
    },
    {
      id: 'lbank',
      name: 'LBank',
      role: 'Content Marketer & Copywriter',
      period: 'Nov 2022 - Mar 2024',
      color: 'from-purple-600 to-purple-400',
      icon: '📱',
      mainAchievement: '200+ Social Media Posts & Campaigns',
      metric: '40%+ Engagement Growth',
      description: 'Produced high-quality daily content and creative social media campaigns driving community growth.',
      highlights: [
        'Daily content & caption creation across platforms',
        'Multi-platform social media creative concepts',
        '"Guess What" engagement campaigns',
        'Emocentric storytelling for audience connection'
      ],
      links: [
        { label: 'View Campaign Gallery', url: '#', type: 'primary' },
        { label: 'Content Samples', url: '#', type: 'secondary' }
      ]
    },
    {
      id: 'dopamine',
      name: 'Dopamine App',
      role: 'Content Marketer & Product Manager',
      period: 'Feb 2022 - May 2024',
      color: 'from-pink-600 to-pink-400',
      icon: '🚀',
      mainAchievement: 'End-to-End Product & Website Management',
      metric: 'Website Performance Optimized',
      description: 'Managed all aspects of company operations including website, user guides, customer support, and feature testing.',
      highlights: [
        'Website management & performance optimization',
        'User guide creation with cross-functional teams',
        'Customer support across multiple channels',
        'Feature testing & upsell opportunity identification',
        'Customer acquisition & retention strategy'
      ],
      links: [
        { label: 'View Case Study', url: '#', type: 'primary' },
        { label: 'Website Portfolio', url: '#', type: 'secondary' }
      ]
    }
  ];

  return (
    <div className="pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-slate-100 mb-4">
            Content Strategy in Action
          </h2>
          <p className="text-lg text-slate-300 mb-12 max-w-3xl">
            My analysis and content have been featured on leading platforms in the Web3 and tech space
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <div
              key={company.id}
              className="group cursor-pointer"
              onClick={() => setExpandedCard(expandedCard === company.id ? null : company.id)}
            >
              {/* Main Card */}
              <div
                className={`bg-gradient-to-br ${company.color} p-0.5 rounded-lg transition-all duration-300 ${
                  expandedCard === company.id ? 'ring-2 ring-white' : 'hover:shadow-lg hover:shadow-white/20'
                }`}
              >
                <div className="bg-slate-800 rounded-lg p-6 h-full">
                  {/* Icon & Title */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{company.icon}</span>
                      <div>
                        <h2 className="text-2xl font-bold text-white">{company.name}</h2>
                        <p className="text-sm text-slate-400">{company.period}</p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`text-slate-400 transition-transform duration-300 ${
                        expandedCard === company.id ? 'rotate-180' : ''
                      }`}
                      size={24}
                    />
                  </div>

                  {/* Role */}
                  <p className="text-slate-300 font-semibold mb-3">{company.role}</p>

                  {/* Main Achievement */}
                  <div className="mb-4 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                    <p className="text-sm text-slate-400 mb-1">Key Achievement</p>
                    <p className="text-white font-semibold text-lg">{company.mainAchievement}</p>
                  </div>

                  {/* Metric */}
                  <div className="mb-6">
                    <span
                      className={`inline-block px-4 py-2 rounded-full text-white font-semibold text-sm bg-gradient-to-r ${company.color}`}
                    >
                      {company.metric}
                    </span>
                  </div>

                  {/* Expandable Section */}
                  {expandedCard === company.id && (
                    <div className="mt-6 pt-6 border-t border-slate-600 animate-in fade-in duration-300">
                      <p className="text-slate-300 mb-4">{company.description}</p>

                      {/* Highlights */}
                      <div className="mb-6">
                        <h3 className="text-white font-semibold mb-3">Key Highlights</h3>
                        <ul className="space-y-2">
                          {company.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex gap-2 text-slate-300 text-sm">
                              <span className="text-blue-400 font-bold">•</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Links */}
                      <div className="space-y-2">
                        {company.links.map((link, idx) => (
                          <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className={`flex items-center justify-between p-3 rounded-lg transition-all group/link ${
                              link.type === 'primary'
                                ? `bg-gradient-to-r ${company.color} text-white hover:shadow-lg hover:shadow-white/20`
                                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                            }`}
                          >
                            <span className="font-semibold">{link.label}</span>
                            <ExternalLink size={16} className="group-hover/link:translate-x-1 transition-transform" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Collapsed Preview */}
                  {expandedCard !== company.id && (
                    <p className="text-slate-400 text-sm italic">Click to explore</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12">
          <p className="text-slate-400 text-sm">
            Click any company to view detailed achievements and work samples
          </p>
        </div>
      </div>
    </div>
  );
}