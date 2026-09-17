"use client";

import React from 'react';
import '../css/Reviews.css';

const Reviews = () => {
  const reviewsData = [
    {
      id: 1,
      text: "Growthmintai has completely transformed our online presence. The web development team delivered a stunning, high-converting site ahead of schedule.",
      name: "Sarah Jenkins",
      role: "Product Manager • TechFlow",
      iconColor: "#f59e0b"
    },
    {
      id: 2,
      text: "The SEO experts at Growthmintai doubled our organic traffic in just 3 months. Their data-driven approach is truly unmatched.",
      name: "Donald Richards",
      role: "Marketing Director • Lumina",
      iconColor: "#8b5cf6"
    },
    {
      id: 3,
      text: "Our Meta Ads ROI skyrocketed after partnering with Growthmintai. They know exactly how to target the right audience and scale campaigns efficiently.",
      name: "Courtney Henry",
      role: "CEO • NextGen Retail",
      iconColor: "#ef4444"
    },
    {
      id: 4,
      text: "Finding top freelancers used to be a headache. Growthmintai made it seamless to hire digital marketers who actually deliver results.",
      name: "Leslie Alexander",
      role: "Founder • Vertex",
      iconColor: "#10b981"
    }
  ];

  return (
    <section className="reviews-section" id="reviews">
      <div className="container">
        <div className="reviews-header">
          <h2 className="section-title">Our Customer Review</h2>
          <a href="#">Explore More Review</a>
        </div>
        <div className="reviews-grid">
          {reviewsData.map((review) => (
            <div className="review-card" key={review.id}>
              <p className="review-text">{review.text}</p>
              <div className="reviewer-info">
                <div className="reviewer-profile">
                  <div className="reviewer-avatar"></div>
                  <div className="reviewer-details">
                    <h4>{review.name}</h4>
                    <p>{review.role}</p>
                  </div>
                </div>
                <div className="review-brand-icon" style={{backgroundColor: review.iconColor}}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
