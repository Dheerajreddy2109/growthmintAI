import Icon from './Icon';
import ContactButton from './contact/ContactButton';
import { keywordStrip, pricing, rupees } from '@/data/site';
import '../css/Hero.css';

const trust = [
  { icon: 'doc', title: 'Fixed price, in writing', text: 'No surprise invoices' },
  { icon: 'key', title: 'You own the code', text: 'Domain, design & logins' },
  { icon: 'layout', title: 'Live preview link', text: 'Watch it being built' },
  { icon: 'chat', title: 'Talk to the developer', text: 'Not a sales team' },
];

const Hero = () => {
  const fromWebsite = pricing.websites[0].price;
  const fromApp = pricing.webapps[0].price;

  return (
    <section className="hero" id="top">
      <div className="hero-glow" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="hero-pill">
            <Icon name="sparkle" size={14} /> Custom websites · Web apps · SaaS
          </span>
          {/* Each phrase rises out of its own mask on first paint (CSS, so it doesn't wait for JavaScript). */}
          <h1 className="h-xl hero-title">
            <span className="hl"><span style={{ '--d': '0.05s' }}>Websites</span></span>{' '}
            <span className="hl"><span style={{ '--d': '0.12s' }}>&amp;</span></span>{' '}
            <span className="hl"><span style={{ '--d': '0.19s' }}>web apps</span></span>
            <br />
            <span className="hl"><span className="gradient-text" style={{ '--d': '0.3s' }}>built to win</span></span>{' '}
            <span className="hl"><span className="gradient-text" style={{ '--d': '0.38s' }}>customers.</span></span>
          </h1>
          <p className="lead hero-lead">
            We design and develop custom websites, online stores and web applications for growing businesses and
            startups — fast, mobile-first, SEO-ready and <strong>100% yours</strong>. No templates. No page builders.
          </p>

          <div className="hero-price">
            <div>
              <span className="hero-price-label">Websites from</span>
              <span className="hero-price-value">{rupees(fromWebsite)}</span>
            </div>
            <span className="hero-price-sep" />
            <div>
              <span className="hero-price-label">Web apps from</span>
              <span className="hero-price-value">{rupees(fromApp)}</span>
            </div>
          </div>

          <div className="hero-ctas">
            <ContactButton className="btn btn-wa" source="hero">
              <Icon name="sparkle" />
              <span className="btn-stack">
                Get a free quote
                <small>Written quote · reply within 24 hours</small>
              </span>
            </ContactButton>
            <a href="#pricing" className="btn btn-ghost">
              See packages <Icon name="arrow" />
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          {/* GSAP moves .hero-stage (3D tilt) and the .depth layers (scroll parallax); CSS animates the
              cards inside them. Kept on separate elements because GSAP folds an element's CSS
              translate/scale into its own transform the first time it touches it. */}
          <div className="hero-stage">
            <div className="mock-browser">
              <div className="mock-bar">
                <span /><span /><span />
                <div className="mock-url">
                  <Icon name="lock" size={11} /> yourbusiness.in
                </div>
              </div>
              <div className="mock-site">
                <div className="mock-nav">
                  <i className="mock-logo" />
                  <b /><b /><b />
                  <em>Book now</em>
                </div>
                <div className="mock-hero">
                  <div>
                    <strong>The first result when your city searches</strong>
                    <p />
                    <p className="short" />
                    <div className="mock-btns">
                      <em>Get a quote</em>
                      <em className="ghost">WhatsApp</em>
                    </div>
                  </div>
                  <div className="mock-photo" />
                </div>
                <div className="mock-cards">
                  <div /><div /><div />
                </div>
              </div>
            </div>

            <div className="depth" data-depth="dash">
              <div className="mock-dash">
                <div className="mock-dash-head">
                  <span>Your dashboard</span>
                  <b>Live</b>
                </div>
                <div className="mock-chart">
                  {[28, 40, 34, 52, 46, 64, 58, 76, 70, 92].map((h, i) => (
                    <i key={i} style={{ height: `${h}%` }} />
                  ))}
                </div>
                <div className="mock-dash-foot">
                  <span><i className="dot" /> Bookings</span>
                  <span><i className="dot alt" /> Orders</span>
                </div>
              </div>
            </div>

            <div className="depth" data-depth="toast">
              <div className="mock-toast">
                <span className="mock-toast-icon"><Icon name="check" size={14} strokeWidth={2.4} /></span>
                <div>
                  <b>New booking</b>
                  <span>Paid via UPI · just now</span>
                </div>
              </div>
            </div>

            <div className="depth" data-depth="score">
              <div className="mock-score">
                <div className="ring"><span>98</span></div>
                <div>
                  <b>Performance</b>
                  <span>Core Web Vitals passed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <ul className="hero-trust">
          {trust.map((t, i) => (
            <li key={t.title} style={{ '--i': i }}>
              <span className="hero-trust-icon"><Icon name={t.icon} size={18} /></span>
              <div>
                <b>{t.title}</b>
                <span>{t.text}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="marquee" aria-label="What we build" data-marquee data-speed="45">
        <div className="marquee-track">
          {[...keywordStrip, ...keywordStrip].map((k, i) => (
            <span key={i} aria-hidden={i >= keywordStrip.length}>
              <i /> {k}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
