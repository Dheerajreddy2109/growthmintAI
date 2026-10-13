"use client";

import React, { useState } from 'react';
import Icon from './Icon';
import ContactButton from './contact/ContactButton';
import { pricing, rupees } from '@/data/site';
import '../css/Pricing.css';

const tabs = [
  { id: 'websites', label: 'Websites', hint: 'Business sites & online stores' },
  { id: 'webapps', label: 'Web applications', hint: 'MVPs, CRMs, portals & SaaS' },
];

const Pricing = () => {
  const [tab, setTab] = useState('websites');
  const plans = pricing[tab];

  return (
    <section className="section section-soft" id="pricing">
      <div className="container">
        <div className="split-head reveal">
          <div>
            <span className="eyebrow">Transparent pricing</span>
            <h2 className="h-lg">
              Pick your size.
              <br />
              See the price.
            </h2>
          </div>
          <p className="lead">
            Clear starting prices for website development and web app development — then a fixed, written quote for
            your exact scope before you pay anything. Start small and add pages or features when your business needs
            them.
          </p>
        </div>

        <div className="price-tabs" role="tablist" aria-label="Package type">
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

        <div className="price-care reveal">
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
