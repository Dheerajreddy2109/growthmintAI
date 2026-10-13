import Icon from './Icon';
import { faqs, techStack } from '@/data/site';
import '../css/FAQ.css';

const FAQ = () => {
  const allTech = Object.values(techStack).flat();

  return (
    <>
      <section className="section" id="faq">
        <div className="container faq-wrap">
          <div className="faq-head reveal">
            <span className="eyebrow">FAQ</span>
            <h2 className="h-lg">What people ask before they book.</h2>
            <p className="lead" style={{ marginTop: 16 }}>
              Straight answers about website cost, timelines, SEO and web app development.
            </p>
          </div>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <details key={f.q} className="faq-item" open={i === 0}>
                <summary>
                  {f.q}
                  <Icon name="chevron" size={18} />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section tech">
        <div className="tech-marquee" aria-hidden="true">
          <div className="tech-track">
            {[...allTech, ...allTech].map((t, i) => (
              <span key={i}>{t}</span>
            ))}
          </div>
        </div>

        <div className="container">
          <div className="split-head reveal">
            <div>
              <span className="eyebrow">Powered by</span>
              <h2 className="h-lg">The same engineering that runs serious products.</h2>
            </div>
            <p className="lead">
              Your website is not built on a drag-and-drop page builder. It runs on the frameworks, databases and cloud
              services that modern product teams use — set up and maintained for you.
            </p>
          </div>

          <div className="tech-groups">
            {Object.entries(techStack).map(([group, items]) => (
              <div key={group} className="tech-group reveal">
                <h3>{group}</h3>
                <div>
                  {items.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="tech-callout reveal">
            <Icon name="rocket" size={22} />
            <p>
              <b>The day your business takes off, nothing has to be rebuilt.</b> The same stack runs a one-page
              website and a platform with thousands of users, orders and logins — we switch on what you need, when you
              need it.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
