"use client";

import React from 'react';
import '../css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-content">
        <div className="footer-brand">
        Growthmintai
        </div>
        <div className="footer-links">
          <a href="/">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact Us</a>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Growthmintai Network. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
