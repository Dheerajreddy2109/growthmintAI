import Icon from './Icon';
import ContactButton from './contact/ContactButton';
import { offerings } from '@/data/site';
import '../css/Services.css';

const differences = [
  {
    tone: 'mint',
    title: 'Look as good as your work.',
    text: 'Your own design, your story. A first impression that feels like you — not like a theme.',
    art: (
      <div className="art art-site">
        <div className="art-window">
          <div className="art-dots"><i /><i /><i /></div>
          <div className="art-awning">{Array.from({ length: 6 }).map((_, i) => <span key={i} />)}</div>
          <div className="art-shop"><b /><em /></div>
        </div>
        <span className="art-badge"><Icon name="check" size={22} strokeWidth={2.6} /></span>
        <span className="art-plus p1"><Icon name="plus" size={18} /></span>
        <span className="art-plus p2"><Icon name="plus" size={14} /></span>
      </div>
    ),
  },
  {
    tone: 'lilac',
    title: 'Let your product do the talking.',
    text: 'Dashboards, catalogues and flows that make complex things feel simple to use.',
    art: (
      <div className="art art-app">
        <div className="art-panel side">
          <i /><i /><i /><i />
        </div>
        <div className="art-panel main">
          <div className="art-kpis"><b /><b /><b /></div>
          <div className="art-bars">{[40, 65, 50, 80, 60, 95].map((h, i) => <span key={i} style={{ height: `${h}%` }} />)}</div>
        </div>
        <span className="art-code"><Icon name="code" size={16} /> <i /></span>
      </div>
    ),
  },
  {
    tone: 'deep',
    title: 'One tap. A conversation.',
    text: 'Book, pay, enquire on WhatsApp or call — every page makes the next step obvious.',
    art: (
      <div className="art art-phone">
        <div className="art-device">
          <span className="art-tick"><Icon name="check" size={18} strokeWidth={2.6} /></span>
          <b /><b className="short" />
        </div>
        <div className="art-msg"><i /><b /><b className="short" /></div>
        <div className="art-typing"><i /><i /><i /><em /></div>
      </div>
    ),
  },
];

const Services = () => {
  return (
    <>
      <section className="section section-soft" id="services">
        <div className="container">
          <div className="split-head reveal">
            <div>
              <span className="eyebrow">What we build</span>
              <h2 className="h-lg">
                Two things.
                <br />
                Done properly.
              </h2>
            </div>
            <p className="lead">
              We only build for the web — so every hour goes into making your website or web application faster,
              clearer and better at bringing in business than the one your competitor bought.
            </p>
          </div>

          <div className="offer-grid">
            {offerings.map((o, idx) => (
              <article key={o.id} className={`offer-card reveal ${idx === 1 ? 'dark' : ''}`}>
                <div className="offer-top">
                  <span className="offer-icon"><Icon name={idx === 0 ? 'layout' : 'code'} size={22} /></span>
                  <span className="offer-eyebrow">{o.eyebrow}</span>
                </div>
                <h3 className="h-md">{o.title}</h3>
                <p className="offer-text">{o.text}</p>
                <ul>
                  {o.items.map((it) => (
                    <li key={it}>
                      <Icon name="check" size={16} strokeWidth={2.4} /> {it}
                    </li>
                  ))}
                </ul>
                <a href="#pricing" className="offer-link">
                  See {idx === 0 ? 'website' : 'web app'} packages <Icon name="arrow" size={16} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="design">
        <div className="container">
          <div className="split-head reveal">
            <div>
              <span className="eyebrow">Built around your business</span>
              <h2 className="h-lg">
                Good design.
                <br />
                A real difference.
              </h2>
            </div>
            <div>
              <p className="lead">
                From a local shop’s first website to a startup’s first product — show people why you are worth
                choosing, and make it effortless to say yes.
              </p>
              <ContactButton className="link-arrow link-button" style={{ marginTop: 16 }} source="design-section">
                Talk about my project <Icon name="arrow" />
              </ContactButton>
            </div>
          </div>

          <div className="diff-grid">
            {differences.map((d, i) => (
              <article key={d.title} className="diff-card reveal">
                <div className={`diff-art tone-${d.tone}`} aria-hidden="true">{d.art}</div>
                <div className="diff-copy">
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{d.title}</h3>
                    <p>{d.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
