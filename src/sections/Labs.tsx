import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { portfolio } from '../data/portfolio';
import sphereGlobe from '@/assets/labs/sphere-globe.svg';
import scroll3dCarousel from '@/assets/labs/scroll-3d-carousel.svg';
import dragParallaxSlider from '@/assets/labs/drag-parallax-slider.svg';
import rotatingImageStack from '@/assets/labs/rotating-image-stack.svg';
import diagonalCarousel from '@/assets/labs/diagonal-carousel.svg';
import './Labs.css';

const thumbnails: Record<string, string> = {
  'lab-1': sphereGlobe,
  'lab-2': scroll3dCarousel,
  'lab-3': dragParallaxSlider,
  'lab-4': rotatingImageStack,
  'lab-5': diagonalCarousel,
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.08 },
  }),
};

// ── Scramble/decode text reveal ──────────────────────────────
// Matches the reference: a box's label starts as random glyphs and resolves
// into the real text left-to-right once the box settles into view.
const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#$%&';

function useScrambleText(text: string, active: boolean, duration = 700) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const totalFrames = Math.round(duration / 32);

    const id = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      setDisplay(
        text
          .split('')
          .map((ch, i) => {
            if (ch === ' ') return ' ';
            const revealAt = i / text.length;
            if (progress > revealAt + 0.15) return ch;
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join('')
      );
      if (frame >= totalFrames) {
        setDisplay(text);
        clearInterval(id);
      }
    }, 32);

    return () => clearInterval(id);
  }, [active, text, duration]);

  return display;
}

// ── Floating parallax preview box (homepage teaser) ──────────
// Each box drifts from below the viewport to above it over its own slice of
// the section's scroll range — staggered per index so they enter/settle/exit
// one after another rather than moving in lockstep, like the reference.
type FloatSpot = { top?: string; bottom?: string; left?: string; right?: string; width: string };

// Each box gets its own non-overlapping horizontal lane so two in transit
// at once never sweep through the same column — only the top offset varies
// within a lane for a little organic, non-grid-like variety.
const FLOAT_SPOTS: FloatSpot[] = [
  { top: '14%', left: '1%', width: 'min(19vw, 280px)' },
  { top: '42%', left: '21%', width: 'min(19vw, 280px)' },
  { top: '8%', left: '41%', width: 'min(19vw, 280px)' },
  { top: '34%', left: '61%', width: 'min(19vw, 280px)' },
  { top: '18%', left: '81%', width: 'min(19vw, 280px)' },
];

function LabFloatBox({
  lab,
  index,
  scrollYProgress,
}: {
  lab: (typeof portfolio.labs)[0];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-40% 0px -40% 0px' });
  const label = useScrambleText(lab.title, inView);

  const span = 0.42;
  const start = index * 0.13;
  const end = start + span;
  const y = useTransform(scrollYProgress, [start, end], ['46vh', '-56vh']);
  const opacity = useTransform(
    scrollYProgress,
    [start, start + span * 0.12, end - span * 0.16, end],
    [0, 1, 1, 0]
  );

  const spot = FLOAT_SPOTS[index % FLOAT_SPOTS.length];

  return (
    <motion.div ref={ref} className="labs__float" style={{ ...spot, y, opacity }}>
      <div className="labs__float-frame">
        <img src={thumbnails[lab.id]} alt="" className="labs__float-img" loading="lazy" />
      </div>
      <span className="labs__float-label">{label}</span>
    </motion.div>
  );
}

// ── Full experiment grid — shown only inside the click-triggered modal ──
function LabCard({ lab, index }: { lab: (typeof portfolio.labs)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      // Placeholder destination — point this at a real experiments/lab page
      // once one exists.
      href="#lab"
      ref={ref}
      className="lab-card"
      variants={fadeUp}
      custom={index}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-hover
    >
      <div className="lab-card__frame">
        <motion.img
          src={thumbnails[lab.id]}
          alt={lab.title}
          className="lab-card__img"
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          loading="lazy"
        />
      </div>
      <div className="lab-card__footer">
        <span className="lab-card__num">{lab.number}</span>
        <span className="lab-card__title">{lab.title}</span>
      </div>
    </motion.a>
  );
}

function LabModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      className="lab-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Lab experiments"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="lab-modal__inner">
        <div className="lab-modal__header">
          <span className="lab-modal__heading">Lab</span>
          <button className="lab-modal__close" onClick={onClose} aria-label="Close" data-hover>
            Close ✕
          </button>
        </div>
        <div className="labs__grid">
          {portfolio.labs.map((lab, i) => (
            <LabCard key={lab.id} lab={lab} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Labs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section className="labs section--dark" id="lab" aria-label="Lab">
      {/* Tall scroll zone — background is solid dark from the moment this
          section begins (sitting right after Case Studies' light bg), so
          the flip reads as instant, matching the reference. "Lab ↗" stays
          pinned centered via position:sticky while 5 experiment previews
          drift past it, entering below and exiting above at staggered
          rates — click it to see the full grid. */}
      <div className="labs__scroll-zone" ref={sectionRef}>
        <div className="labs__sticky">
          {portfolio.labs.map((lab, i) => (
            <LabFloatBox key={lab.id} lab={lab} index={i} scrollYProgress={scrollYProgress} />
          ))}

          <button
            className="labs__link"
            onClick={() => setModalOpen(true)}
            data-hover
            aria-haspopup="dialog"
            aria-label="View lab experiments"
          >
            <span className="labs__text">Lab</span>
            <span className="labs__arrow">↗</span>
          </button>
        </div>
      </div>

      {modalOpen && <LabModal onClose={() => setModalOpen(false)} />}
    </section>
  );
}
