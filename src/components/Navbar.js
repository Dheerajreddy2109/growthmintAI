"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import '../css/Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Order matches the page layout
      const sections = ['about', 'services', 'reviews', 'experts', 'contact'];
      let current = '';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          // If the scroll position is past the top of this section (plus a small buffer)
          if (window.scrollY >= element.offsetTop - 250) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className='navbar' >
      <div className="top-badge-container">
        <div className="top-badge">
          <span className="pulse-dot"></span> Available for New Projects
        </div>
      </div>
      <div className="nav-left">
        <Link href="/" className="nav-logo">
           Growthmintai
        </Link>
      </div>
      <div className="nav-center">
        <div className="nav-links">
          <Link href="#works" className={`nav-link ${activeSection === 'works' ? 'active' : ''}`}>Works</Link>
          <Link href="#services" className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}>Services</Link>
          <Link href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}>About</Link>
          <Link href="#blog" className={`nav-link ${activeSection === 'blog' ? 'active' : ''}`}>Blog</Link>
        </div>
      </div>
      <div className="nav-right">
        <Link href="#contact" className="btn-contact">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;
