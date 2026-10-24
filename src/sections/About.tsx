'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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


export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.section
      className="about2 section--light"
      id="about"
      ref={ref}
      aria-label="About"
    >

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
