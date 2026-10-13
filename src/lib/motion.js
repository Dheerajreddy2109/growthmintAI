// Homepage scroll animations (set up by components/motion/HomeMotion.js).
//
// Every GSAP animation here is tied to scrolling: it either starts when its part of the page scrolls into
// view (ScrollTrigger) or is scrubbed to the scroll position. Clicks, tabs and the FAQ use plain CSS instead.
//
// Sections opt in with data attributes in their markup:
//   data-split      heading lines rise out of a mask; data-split="chars" flips letters in instead
//   data-lines      same rise for headings React keeps updating (they carry their own .mask-line markup)
//   data-reveal     fade up, or "left" / "right" / "scale"; data-delay="0.15" offsets it
//   data-stagger    direct children arrive one after another, row by row; [data-pop] icons spring in
//   data-marquee    endless strip that moves only while on screen, faster with scrolling ("reverse" flips it)
// Section-specific effects (hero depth and tilt, service cards, design reveals, comparison, process pin) are below.
//
// Ground rules: reveals fire early and only once, only one short pin (desktop), nothing runs when the
// visitor prefers reduced motion, and nothing is hidden by CSS, so content shows even if this never runs.
import { gsap, ScrollTrigger, SplitText } from './gsap';

const START = 'top 88%';
const EASE = 'power3.out';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => gsap.utils.toArray(selector, root);

// Already visible when animations are set up (top of the page, or a reload mid-page):
// leave it as it is rather than hiding it and fading it back in.
const onScreen = (el) => el.getBoundingClientRect().top < window.innerHeight * 0.95;

// Hide each item with `hide`, then play the timeline returned by `show(item)` as it scrolls in.
// Items that arrive together (one grid row) are staggered by `gap`.
function revealEach(items, hide, show, gap = 0.14) {
  const pending = items.filter((el) => !onScreen(el));
  if (!pending.length) return;
  pending.forEach(hide);
  ScrollTrigger.batch(pending, {
    start: 'top 86%',
    once: true,
    onEnter: (batch) => batch.forEach((el, i) => show(el).delay(i * gap)),
  });
}

/* ---------- Headings ---------- */

function splitHeadings() {
  $$('[data-split]').forEach((el) => {
    if (onScreen(el)) return;
    const chars = el.dataset.split === 'chars';
    SplitText.create(el, {
      type: chars ? 'words,chars' : 'lines',
      mask: chars ? undefined : 'lines',
      linesClass: 'split-line',
      autoSplit: !chars, // line breaks change with width and web fonts; re-split until it has played
      onSplit: (self) =>
        gsap.from(chars ? self.chars : self.lines, {
          ...(chars
            ? {
                yPercent: 70,
                rotationX: -95,
                opacity: 0,
                transformPerspective: 600,
                transformOrigin: '50% 50% -18px',
                duration: 0.9,
                ease: 'back.out(1.5)',
                stagger: 0.022,
              }
            : { yPercent: 118, duration: 1.15, ease: 'expo.out', stagger: 0.1 }),
          scrollTrigger: { trigger: el, start: START, once: true },
          // Restore the original markup once it has landed (clean resizing, selection and screen readers).
          onComplete: () => self.revert(),
        }),
    });
  });
}

function maskedLines() {
  $$('[data-lines]').forEach((el) => {
    if (onScreen(el)) return;
    gsap.from($$('[data-line]', el), {
      yPercent: 118,
      duration: 1.15,
      ease: 'expo.out',
      stagger: 0.1,
      clearProps: 'transform',
      scrollTrigger: { trigger: el, start: START, once: true },
    });
  });
}

/* ---------- Generic reveals ---------- */

function fadeReveals(desktop) {
  const d = desktop ? 48 : 28;
  const from = { up: { y: d }, left: { x: -d }, right: { x: d }, scale: { y: d / 2, scale: 0.94 } };
  $$('[data-reveal]').forEach((el) => {
    if (onScreen(el)) return;
    gsap.from(el, {
      ...(from[el.dataset.reveal] || from.up),
      autoAlpha: 0,
      duration: 1,
      ease: EASE,
      delay: Number(el.dataset.delay) || 0,
      clearProps: 'transform',
      scrollTrigger: { trigger: el, start: START, once: true },
    });
  });
}

function staggerReveals(desktop) {
  $$('[data-stagger]').forEach((group) => {
    const items = gsap.utils.toArray(group.children).filter((el) => !onScreen(el));
    if (!items.length) return;
    gsap.set(items, { autoAlpha: 0, y: desktop ? 44 : 28 });
    ScrollTrigger.batch(items, {
      start: START,
      once: true,
      onEnter: (batch) => {
        gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.9, ease: EASE, stagger: 0.09, clearProps: 'transform' });
        const pops = batch.flatMap((el) => $$('[data-pop]', el));
        if (pops.length) {
          gsap.fromTo(
            pops,
            { scale: 0.4, rotation: -25 },
            { scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(2.2)', stagger: 0.09, delay: 0.15, clearProps: 'transform' }
          );
        }
      },
    });
  });
}

/* ---------- Hero ---------- */

function hero(desktop) {
  const section = $('.hero');
  if (!section || !desktop) return;

  // Depth: the floating cards sit at different distances from the viewer.
  gsap.set('[data-depth="dash"]', { z: 60 });
  gsap.set('[data-depth="toast"]', { z: 90 });
  gsap.set('[data-depth="score"]', { z: 40 });

  // Scrolling away: the copy drifts up and fades late, the mock turns in 3D and sinks more slowly than the page,
  // and the floating cards rise at different speeds, so the layers separate.
  gsap
    .timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: section, start: 0, end: 'bottom top', scrub: 0.6 },
    })
    .to('.hero-copy', { y: -90 }, 0)
    .to('.hero-copy', { opacity: 0.1, ease: 'power2.in' }, 0)
    .to('.hero-visual', { y: 110 }, 0)
    .to('.hero-glow', { y: 180 }, 0)
    .fromTo('.hero-stage', { rotationX: 0, rotationY: 0 }, { rotationX: 9, rotationY: -14 }, 0)
    .to('[data-depth="dash"]', { y: -120 }, 0)
    .to('[data-depth="toast"]', { y: -80 }, 0)
    .to('[data-depth="score"]', { y: -50 }, 0);
}

/* ---------- Marquees ---------- */

// Endless strips that move only while on screen; their speed and direction follow the scroll.
function marquees() {
  $$('[data-marquee]').forEach((wrap) => {
    // The track holds the items twice, so moving it by half its width loops seamlessly.
    const reverse = wrap.dataset.marquee === 'reverse';
    const loop = gsap.fromTo(
      wrap.firstElementChild,
      { xPercent: reverse ? -50 : 0 },
      { xPercent: reverse ? 0 : -50, duration: Number(wrap.dataset.speed) || 40, ease: 'none', repeat: -1 }
    );
    loop.totalTime(loop.duration() * 500); // start deep into the loop so it can also run backwards

    let direction = 1;
    let settle;
    const speed = (timeScale) => gsap.to(loop, { timeScale, duration: 0.6, ease: 'power2.out', overwrite: true });

    ScrollTrigger.create({
      trigger: wrap,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => (self.isActive ? loop.resume() : loop.pause()), // idle while off screen
      onUpdate: (self) => {
        direction = self.direction;
        speed(direction * (1 + gsap.utils.clamp(0, 4, Math.abs(self.getVelocity()) / 600)));
        settle?.kill();
        settle = gsap.delayedCall(0.18, () => speed(direction));
      },
    });
  });
}

/* ---------- Services ---------- */

function offerCards(desktop) {
  revealEach(
    $$('.offer-card'),
    (card) => {
      gsap.set(card, {
        autoAlpha: 0,
        y: desktop ? 110 : 50,
        rotationX: desktop ? 12 : 0,
        transformPerspective: 1400,
        transformOrigin: '50% 0%',
      });
      gsap.set($('.offer-icon', card), { scale: 0.3, rotation: -40 });
      gsap.set($$('li', card), { autoAlpha: 0, x: -14 });
    },
    (card) =>
      gsap
        .timeline()
        .to(card, { autoAlpha: 1, y: 0, rotationX: 0, duration: 1.3, ease: 'expo.out', clearProps: 'transform' })
        .to($('.offer-icon', card), { scale: 1, rotation: 0, duration: 0.9, ease: 'back.out(2)', clearProps: 'transform' }, 0.25)
        .to($$('li', card), { autoAlpha: 1, x: 0, duration: 0.55, ease: 'power2.out', stagger: 0.05, clearProps: 'transform' }, 0.4),
    0.16
  );
}

function designCards(desktop) {
  const clip = (top) => `inset(${top}% 0% 0% 0% round 22px)`;
  revealEach(
    $$('.diff-card'),
    (card) => {
      gsap.set($('.diff-art', card), { clipPath: clip(100) });
      gsap.set($('.art', card), { scale: 1.3, yPercent: 14 });
      gsap.set($$('.diff-copy > *', card), { autoAlpha: 0, y: 24 });
      gsap.set($$('[data-pop]', card), { scale: 0 });
    },
    (card) =>
      gsap
        .timeline()
        .to($('.diff-art', card), { clipPath: clip(0), duration: 1.25, ease: 'expo.out', clearProps: 'clipPath' })
        .to($('.art', card), { scale: 1, yPercent: 0, duration: 1.5, ease: 'expo.out' }, 0)
        .to($$('.diff-copy > *', card), { autoAlpha: 1, y: 0, duration: 0.8, ease: EASE, stagger: 0.08, clearProps: 'transform' }, 0.3)
        .to($$('[data-pop]', card), { scale: 1, duration: 0.7, ease: 'back.out(2.4)', stagger: 0.1, clearProps: 'transform' }, 0.55)
  );

  if (!desktop) return;
  // A little depth while the illustrations pass through the viewport.
  $$('.diff-card .art').forEach((art) =>
    gsap.fromTo(
      art,
      { y: 26 },
      { y: -26, ease: 'none', scrollTrigger: { trigger: art.closest('.diff-card'), start: 'top bottom', end: 'bottom top', scrub: true } }
    )
  );
}

/* ---------- Comparison ---------- */

function comparison(desktop) {
  const shift = desktop ? 60 : 24;
  $$('.cmp-col').forEach((col) => {
    if (onScreen(col)) return;
    const good = !!$('.cmp-row.good', col);
    const at = desktop && good ? 0.2 : 0; // the "with a website" side answers the other a beat later
    gsap
      .timeline({ scrollTrigger: { trigger: col, start: 'top 82%', once: true } })
      .from($('.cmp-label', col), { autoAlpha: 0, y: 14, duration: 0.5, ease: EASE }, at)
      .from($$('.cmp-row', col), { autoAlpha: 0, x: good ? shift : -shift, duration: 0.85, ease: EASE, stagger: 0.09, clearProps: 'transform' }, at + 0.1)
      .from($$('.cmp-row > span', col), { scale: 0, duration: 0.5, ease: 'back.out(3)', stagger: 0.09, clearProps: 'transform' }, at + 0.35);
  });

  const banner = $('.cmp-banner');
  if (banner && !onScreen(banner)) {
    gsap.from(banner, {
      autoAlpha: 0,
      y: 70,
      scale: 0.95,
      duration: 1.2,
      ease: 'expo.out',
      clearProps: 'transform',
      scrollTrigger: { trigger: banner, start: START, once: true },
    });
  }

  // The one-line summary lights up word by word as it is read; fully lit by the time it is mid-screen.
  const title = $('.cmp-banner-title');
  if (title) {
    const split = SplitText.create(title, { type: 'words', tag: 'span', aria: 'none' });
    gsap.fromTo(
      split.words,
      { opacity: 0.16 },
      { opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: title, start: 'top 92%', end: 'top 62%', scrub: 0.6 } }
    );
  }
}

/* ---------- Process ---------- */

// Desktop: the section holds still for a short scroll while the line draws across the four steps
// and each one lights up as the line reaches it.
function processSteps() {
  const section = $('#process');
  const fill = section && $('.proc-line-fill', section);
  if (!fill) return;

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: section,
      start: 'center center+=40', // a little low, so the heading clears the sticky navbar
      end: () => `+=${Math.round(window.innerHeight * 0.9)}`,
      pin: true,
      scrub: 0.8,
      anticipatePin: 1,
      refreshPriority: 1, // measure triggers in page order now that a pin adds space
      invalidateOnRefresh: true,
    },
  });

  tl.fromTo(fill, { scaleX: 0 }, { scaleX: 1, duration: 3 }, 0);
  $$('.proc-step', section)
    .slice(1)
    .forEach((step, i) => {
      const at = i + 1; // the line reaches step n at time n
      tl.fromTo(
        $('.proc-icon', step),
        { scale: 0.72, backgroundColor: '#e7ede9' },
        { scale: 1, backgroundColor: '#c6f36b', duration: 0.35, ease: 'back.out(2.5)' },
        at - 0.18
      ).fromTo($$('h3, p', step), { opacity: 0.28 }, { opacity: 1, duration: 0.3 }, at - 0.15);
    });
  tl.to({}, { duration: 0.4 }); // hold the finished row for a moment before letting go
}

/* ---------- Final call to action ---------- */

function finalIcon() {
  const icon = $('.final-icon');
  if (!icon || onScreen(icon)) return;
  gsap.from(icon, {
    scale: 0,
    rotation: -180,
    duration: 1.1,
    ease: 'back.out(1.8)',
    scrollTrigger: { trigger: icon, start: START, once: true },
  });
}

/* ---------- Setup ---------- */

// One failing effect must not take the others down (or leave content hidden).
function run(name, setup) {
  try {
    setup();
  } catch (err) {
    console.error(`[motion] ${name} failed`, err);
  }
}

export function initHomeMotion() {
  // matchMedia reverts everything (restoring the original markup) and re-runs when a condition changes.
  gsap.matchMedia().add(
    {
      motion: '(prefers-reduced-motion: no-preference)',
      desktop: '(min-width: 961px)',
      tall: '(min-height: 720px)',
    },
    ({ conditions: { motion, desktop, tall } }) => {
      if (!motion) return;
      run('headings', splitHeadings);
      run('masked lines', maskedLines);
      run('reveals', () => fadeReveals(desktop));
      run('staggers', () => staggerReveals(desktop));
      run('hero', () => hero(desktop));
      run('marquees', marquees);
      run('offer cards', () => offerCards(desktop));
      run('design cards', () => designCards(desktop));
      run('comparison', () => comparison(desktop));
      if (desktop && tall) run('process', processSteps);
      run('final icon', finalIcon);
    }
  );
}
