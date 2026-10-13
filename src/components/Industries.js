import Icon from './Icon';
import { included, industryUseCases } from '@/data/site';
import '../css/Industries.css';

const Industries = () => {
  return (
    <>
      <section className="section ind" id="industries">
        <div className="container">
          <div className="split-head">
            <div>
              <span className="eyebrow" data-reveal="left">Who we build for</span>
              <h2 className="h-lg" data-split>
                Whatever you sell, teach or serve —
                <br />
                <span className="gradient-text">your business belongs online.</span>
              </h2>
            </div>
            <p className="lead" data-reveal data-delay="0.15">
              Every industry has its own searches and its own workflows. Here is what businesses like yours usually
              ask us to build first.
            </p>
          </div>

          <div className="ind-grid" data-stagger>
            {industryUseCases.map((g) => (
              <article key={g.title} className="ind-card">
                <h3>{g.title}</h3>
                <ul>
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="ind-note" data-reveal>
            Your business isn’t listed? Every project starts with the same conversation. <a href="#quote">Tell us about your business →</a>
          </p>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div>
            <span className="eyebrow" data-reveal="left">In every project</span>
            <h2 className="h-lg" data-split>The details are taken care of.</h2>
            <p className="lead" style={{ marginTop: 16 }} data-reveal data-delay="0.15">
              Included from the first package — not sold as add-ons later.
            </p>
          </div>

          <div className="inc-grid" data-stagger>
            {included.map((f) => (
              <article key={f.title} className="inc-card">
                <span className="inc-icon" data-pop><Icon name={f.icon} size={20} /></span>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Industries;
