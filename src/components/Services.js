"use client";

import React from 'react';
import '../css/Services.css';

const Services = () => {
  const servicesData = [
    {
      id: '04',
      title: 'Web Developers',
      description: 'Hire expert web developers to build ultra-fast, responsive, and highly customized websites that act as a 24/7 sales machine for your business.',
    },
    {
      id: '05',
      title: 'SEO Experts',
      description: 'Dominate search rankings. Our data-driven SEO experts ensure you capture high-intent organic traffic consistently.',
    },
    {
      id: '06',
      title: 'Digital Marketers',
      description: 'Stop wasting ad spend. We create targeted, high-converting Meta ad campaigns that deliver measurable ROI.',
    }
  ];

  return (
    <section className="services-section" id="services">
      <div className="container">
        <h2 className="section-title">Explore By Categories</h2>
        <div className="services-grid">
          {servicesData.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-header">
                <span className="service-number">{service.id}</span>
                <a href="#contact" className="service-link">View More &rarr;</a>
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
