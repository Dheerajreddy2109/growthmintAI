"use client";

import React from 'react';
import '../css/Newsletter.css';

const Newsletter = () => {
  return (
    <section className="newsletter-section" id="contact">
      <div className="newsletter-container">
        <h2 className="newsletter-title">Do You Have Any Questions?</h2>
        <p className="newsletter-desc">
          Ready to scale your business with elite Web Developers, SEO Experts, and Meta Ads Specialists? 
          Drop your email below and our team will get in touch to start your project.
        </p>
        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Enter your email address..." 
            className="newsletter-input" 
            required 
          />
          <button type="submit" className="newsletter-btn">Subscribe</button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
