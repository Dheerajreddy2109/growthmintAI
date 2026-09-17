"use client";

import React from 'react';
import '../css/Hero.css';

const Hero = () => {
  return (
    <section className="hero-section" id="hero">
      <div className="container hero-container">
        <div className="hero-content centered">
          <h1 className="hero-title inline-images-title">
            Effortless <img src="/images/home/banner/img-1.svg" alt="Design" className="inline-hero-img" /> <span className="text-orange">Design</span> <br/>
            for <img src="/images/home/banner/img-1.svg" alt="Startups" className="inline-hero-img" /> Design Startups <br/>
            based in London, <img src="/images/home/banner/img-1.svg" alt="UK" className="inline-hero-img" /> UK
          </h1>
          <p className="hero-desc">
            We make it easy for startups to launch, grow, and scale with clean, conversion focused designs —no delays, no drama.
          </p>
          <div className="hero-buttons">
            <a href="#plans" className="btn-dark-pill">View Plans &rarr;</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
