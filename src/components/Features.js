"use client";

import React from 'react';
import '../css/Features.css';

const Features = () => {
  const features = [
    {
      id: 1,
      title: 'Top 1% Talent',
      description: 'We rigorously vet our web developers, SEO strategists, and Meta Ads specialists so you only work with the absolute best in the industry.',
      colorClass: 'icon-yellow',
      icon: '✓'
    },
    {
      id: 2,
      title: 'Data-Driven ROI',
      description: 'Our digital marketers and SEO experts focus purely on metrics that matter. We build campaigns and websites designed specifically to scale your revenue.',
      colorClass: 'icon-blue',
      icon: '★'
    },
    {
      id: 3,
      title: 'Seamless Hiring',
      description: 'Skip the endless interviews. We match you instantly with specialized freelancers ready to execute your web development and ad campaigns immediately.',
      colorClass: 'icon-purple',
      icon: '⚡'
    }
  ];

  return (
    <section className="features-section" id="about">
      <div className="container">
        <h2 className="section-title">Why Choose Us</h2>
        <div className="features-grid">
          {features.map((feature) => (
            <div className="feature-card" key={feature.id}>
              <div className={`feature-icon-wrapper ${feature.colorClass}`}>
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
