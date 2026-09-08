'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { portfolio } from '../data/portfolio';
import { FlipCard } from '@/components/animate-ui/components/community/flip-card';
import cardFront from '@/assets/front-card.png';
import cardBack from '@/assets/back-card.png';
import './About.css';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: 'easeOut' as const, delay: i * 0.1 },
  }),
};

const paragraphs = [
  'I’m a graphic designer who likes turning ideas into things people want to look at. I’m into branding, visual identity, art direction, motion, and pretty much anything that lets me make something from scratch.',
  'Outside of design, I’m usually watching a movie, following sports, creating short films and funny sketches or getting distracted by something interesting on the internet. I like good stories, good visuals, and figuring out how the two can come together.',
  'Currently studying, making things, and trying not to overthink everything',
];

const socialLinks = Object.entries(portfolio.social).map(([key, url]) => ({
  label: key.toUpperCase(),
  url,
}));

// Builds a smooth sine-wave path, filled from the wave crest down to the
// bottom of the viewBox — used as one "water" layer in the scroll-driven
// wave transition below. `phase` shifts the wave horizontally, so animating
// it over scroll makes the whole thing look like it's flowing, not static.
function buildWavePath(
  phase: number,
  { amplitude, baseline, width = 1440, height = 90, waveCount = 2, samples = 32 }:
  { amplitude: number; baseline: number; width?: number; height?: number; waveCount?: number; samples?: number }
) {
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const x = t * width;
    const y = baseline + amplitude * Math.sin(t * Math.PI * 2 * waveCount + phase);
    pts.push({ x, y });
  }
  let d = `M 0,${height} L 0,${pts[0].y.toFixed(2)} `;
  for (let i = 0; i < pts.length - 1; i++) {
    const midX = (pts[i].x + pts[i + 1].x) / 2;
    const midY = (pts[i].y + pts[i + 1].y) / 2;
    d += `Q ${pts[i].x.toFixed(2)},${pts[i].y.toFixed(2)} ${midX.toFixed(2)},${midY.toFixed(2)} `;
  }
  const last = pts[pts.length - 1];
  d += `L ${last.x.toFixed(2)},${last.y.toFixed(2)} L ${width},${height} Z`;
  return d;
}

// Same sine-wave curve as buildWavePath, but left OPEN (no closing edges down
// to the bottom/sides) — for the stroked border layer. Stroking the closed
// version would also stroke its far-off bottom/side edges, which the
// turbulence filter then scatters into stray flecks well below the tear.
function buildWaveLine(
  phase: number,
  { amplitude, baseline, width = 1440, waveCount = 2, samples = 32 }:
  { amplitude: number; baseline: number; width?: number; waveCount?: number; samples?: number }
) {
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const x = t * width;
    const y = baseline + amplitude * Math.sin(t * Math.PI * 2 * waveCount + phase);
    pts.push({ x, y });
  }
  let d = `M ${pts[0].x.toFixed(2)},${pts[0].y.toFixed(2)} `;
  for (let i = 0; i < pts.length - 1; i++) {
    const midX = (pts[i].x + pts[i + 1].x) / 2;
    const midY = (pts[i].y + pts[i + 1].y) / 2;
    d += `Q ${pts[i].x.toFixed(2)},${pts[i].y.toFixed(2)} ${midX.toFixed(2)},${midY.toFixed(2)} `;
  }
  const last = pts[pts.length - 1];
  d += `L ${last.x.toFixed(2)},${last.y.toFixed(2)}`;
  return d;
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"]
  });

  // Smoothly slides up by 100px relative to normal scroll speed
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  // Drives the torn-edge transition below — two full cycles of horizontal
  // phase shift over the same scroll range Hero takes to hand off to About,
  // so the tear's underlying wave visibly flows (like ocean swell) as you
  // scroll through the seam; a turbulence filter roughens it into an actual
  // torn-paper edge instead of a smooth curve.
  const wavePhase = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 4]);
  // Dark-red shadow/border, sitting a couple of units higher so it peeks out
  // just above the white fill at the jagged edge.
  const tearBorderD = useTransform(wavePhase, (p) =>
    buildWaveLine(p, { amplitude: 12, baseline: 38, waveCount: 2 })
  );
  const tearFillD = useTransform(wavePhase, (p) =>
    buildWavePath(p, { amplitude: 12, baseline: 41, waveCount: 2 })
  );

  return (
    <motion.section
      className="about2 section--light"
      id="about"
      ref={ref}
      style={{ y }}
      aria-label="About"
    >
      
      {/* Torn-paper wave transition — a smooth ocean-swell wave, roughed up by
          an SVG turbulence filter into a jagged torn-edge, whose phase flows
          with scroll so the tear itself ripples like moving water. Dark-red
          border peeks out from behind the white fill at the ragged edge. */}
      <div className="about2__tear" aria-hidden="true">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="about2__tear-svg">
          <defs>
            <filter id="tear-distortion" x="-10%" y="-50%" width="120%" height="200%">
              <feTurbulence type="fractalNoise" baseFrequency="0.05 0.22" numOctaves={2} seed={7} result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale={7} xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
          <motion.path
            d={tearBorderD}
            fill="none"
            stroke="#8f1c1f"
            strokeWidth={7}
            opacity={0.9}
            filter="url(#tear-distortion)"
          />
          <motion.path d={tearFillD} fill="#ffffff" filter="url(#tear-distortion)" />
        </svg>
      </div>

      <div className="about2__inner">

        {/* Small label */}
        <motion.span
          className="about2__label"
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          A little about me
        </motion.span>

        {/* Two-column body */}
        <div className="about2__body">

          {/* Left — large text paragraphs */}
          <div className="about2__text">
            {paragraphs.map((para, i) => (
              <motion.p
                key={i}
                className="about2__para"
                variants={fadeUp}
                custom={i + 1}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Right — stacked FlipCard and Meta row */}
          <div className="about2__right">
            {/* Flip Card */}
            <motion.div
              className="about2__flipcard"
              variants={fadeUp}
              custom={paragraphs.length + 1}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <FlipCard frontImage={cardFront} backImage={cardBack} />
            </motion.div>

            {/* Meta clusters horizontal row */}
            <motion.div
              className="about2__meta"
              variants={fadeUp}
              custom={paragraphs.length + 2}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              {/* Cluster 1 — Social links */}
              <div className="about2__cluster">
                {socialLinks.map(({ label, url }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about2__social-link"
                    data-hover
                  >
                    <span className="about2__social-arrow">↗</span>
                    {label}
                  </a>
                ))}
                <span className="about2__bracket">┘</span>
              </div>

              {/* Cluster 2 — Date & location */}
              <div className="about2__cluster">
                <span className="about2__cluster-line">{portfolio.birthdate}</span>
                <span className="about2__cluster-line">{portfolio.location.toUpperCase()}</span>
                <span className="about2__bracket">┘</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}
