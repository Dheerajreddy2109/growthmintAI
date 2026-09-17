"use client";

import React from 'react';
import '../css/Experts.css';

const Experts = () => {
  const expertsData = [
    {
      id: 1,
      name: 'Darrell Steward',
      role: 'Meta Ads Specialist',
      location: 'Australia',
      reviews: '50 Reviews',
      price: '$500.00',
      featured: true,
      image: '/images/expert_1.jpg'
    },
    {
      id: 2,
      name: 'Courtney Henry',
      role: 'Front-End Developer',
      location: 'England',
      reviews: '80 Reviews',
      price: '$800.00',
      featured: true,
      image: '/images/expert_2.jpg'
    },
    {
      id: 3,
      name: 'Jenny Wilson',
      role: 'SEO Strategist',
      location: 'Germany',
      reviews: '45 Reviews',
      price: '$600.00',
      featured: true,
      image: '/images/expert_3.jpg'
    },
    {
      id: 4,
      name: 'Ralph Edwards',
      role: 'Digital Marketer',
      location: 'Argentina',
      reviews: '75 Reviews',
      price: '$450.00',
      featured: true,
      image: '/images/expert_4.jpg'
    },
    {
      id: 5,
      name: 'Brooklyn Simmons',
      role: 'Web Developer',
      location: 'Canada',
      reviews: '90 Reviews',
      price: '$1100.00',
      featured: true,
      image: '/images/expert_5.jpg'
    },
    {
      id: 6,
      name: 'Robert Fox',
      role: 'SEO Expert',
      location: 'Switzerland',
      reviews: '120 Reviews',
      price: '$900.00',
      featured: true,
      image: '/images/expert_6.jpg'
    }
  ];

  return (
    <section className="experts-section" id="experts">
      <div className="container">
        <div className="experts-header">
          <h2 className="section-title" style={{marginBottom: '10px'}}>Most Hired Freelancers</h2>
          <p>Work with talented people at the most affordable price to get your job done</p>
        </div>
        
        <div className="experts-grid">
          {expertsData.map((expert) => (
            <div className="expert-card" key={expert.id}>
              <div className="expert-image-wrapper">
                <img src={expert.image} alt={expert.name} className="expert-img" />
                {expert.featured && <span className="expert-badge">Featured</span>}
              </div>
              <div className="expert-info">
                <div className="expert-role">
                  <h4>{expert.role}</h4>
                  <span>{expert.name}</span>
                </div>
                <div className="expert-meta">
                  <span>📍 {expert.location}</span>
                  <span>⭐ {expert.reviews}</span>
                </div>
                <div className="expert-price">
                  💵 {expert.price} <span>/ Monthly</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experts;
