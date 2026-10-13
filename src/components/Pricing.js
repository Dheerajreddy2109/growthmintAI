"use client";

import React, { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import ContactButton from './contact/ContactButton';
import { pricing, rupees } from '@/data/site';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap';
import '../css/Pricing.css';

const tabs = [
  { id: 'websites', label: 'Websites', hint: 'Business sites & online stores' },
  { id: 'webapps', label: 'Web applications', hint: 'MVPs, CRMs, portals & SaaS' },
];

const Pricing = () => {
  const [tab, setTab] = useState('websites');
  const plans = pricing[tab];
  const root = useRef(null);
  const tabsRef = useRef(null);
  const gliderRef = useRef(null);

  // Scroll reveal only: cards still below the fold rise in as you scroll down to them.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const cards = gsap.utils.toArray('.price-card', root.current);
      if (cards[0].getBoundingClientRect().top <= window.innerHeight) return;
      gsap.from(cards, {
        autoAlpha: 0,
        y: 70,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.1,
        clearProps: 'transform',
        scrollTrigger: { trigger: cards[0].parentElement, start: 'top 85%', once: true },
      });
    },
    { scope: root, dependencies: [tab], revertOnUpdate: true }
  );

  // Tab highlight: slides to the active tab with a CSS transition. Clicks are plain UI, so no GSAP here.
  useEffect(() => {
    const tabs = tabsRef.current;
    const glider = gliderRef.current;
    const place = () => {
      const active = tabs.querySelector('[aria-selected="true"]');
      glider.style.transform = `translate(${active.offsetLeft}px, ${active.offsetTop}px)`;
      glider.style.width = `${active.offsetWidth}px`;
      glider.style.height = `${active.offsetHeight}px`;
    };
    place();
    tabs.classList.add('has-glider');
    // The slide is switched on after the first placement, so the highlight doesn't fly in from the corner on load.
    const frame = requestAnimationFrame(() => glider.classList.add('is-ready'));
    const observer = new ResizeObserver(place);
    observer.observe(tabs);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [tab]);

  return (
    <section className="section section-soft" id="pricing" ref={root}>
      <div className="container">
        <div className="split-head">
          <div>
            <span className="eyebrow" data-reveal="left">Transparent pricing</span>
            <h2 className="h-lg" data-split>
              Pick your size.
              <br />
              See the price.
            </h2>
          </div>
          <p className="lead" data-reveal data-delay="0.15">
            Clear starting prices for website development and web app development — then a fixed, written quote for
            your exact scope before you pay anything. Start small and add pages or features when your business needs
            them.
          </p>
        </div>

        <div className="price-tabs" role="tablist" aria-label="Package type" ref={tabsRef} data-reveal>
          <span className="price-glider" ref={gliderRef} aria-hidden="true" />
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              className={tab === t.id ? 'on' : ''}
              onClick={() => setTab(t.id)}
            >
              <b>{t.label}</b>
              <span>{t.hint}</span>
            </button>
          ))}
        </div>

        <div className={`price-grid cols-${plans.length}`} role="tabpanel">
          {plans.map((p) => (
            <article key={p.name} className={`price-card ${p.popular ? 'popular' : ''}`}>
              {p.popular && <span className="price-badge">Most chosen</span>}
              <h3>{p.name}</h3>
              <p className="price-for">{p.for}</p>
              <div className="price-amount">
                {p.custom ? (
                  <b>Custom</b>
                ) : (
                  <>
                    {p.from && <small>from</small>}
                    <b>{rupees(p.price)}</b>
                  </>
                )}
                <span>{p.custom ? p.note : `+ GST · ${p.note}`}</span>
              </div>
              <ContactButton
                className={`btn ${p.popular ? 'btn-wa' : 'btn-dark'} price-cta`}
                source={`pricing: ${p.name}`}
                title={`Get a quote for the ${p.name}.`}
                prefill={{ project: p.project, message: `I'm interested in the ${p.name} package.` }}
              >
                {p.cta} <Icon name="arrow" />
              </ContactButton>
              <ul>
                {p.features.map((f) => (
                  <li key={f}>
                    <Icon name="check" size={15} strokeWidth={2.6} /> {f}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="price-care" data-reveal>
          <span className="price-care-icon"><Icon name="shield" size={22} /></span>
          <div>
            <b>Care plan, after launch</b>
            <p>{pricing.care.text}</p>
          </div>
          <ContactButton className="link-arrow link-button" source="pricing: not sure" prefill={{ project: 'Not sure yet' }}>
            Not sure which fits? <Icon name="arrow" />
          </ContactButton>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
