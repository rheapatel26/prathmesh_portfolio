import { useRef, type RefObject } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import sticker1 from '@/assets/life-lately/11.png';
import sticker2 from '@/assets/life-lately/12.png';
import './LifeStickers.css';

// Hand-drawn red splash stickers (jackiezhang.co.za/work-style) scattered
// around Life Lately. Each fades/scales in the first time it scrolls into
// view, then drifts via scroll-linked parallax (slower than the page) for
// the rest of the section — same behaviour verified on the reference site.

type StickerSpec = {
  img: string;
  className: string;
  tilt: number;
  size: number; // px
  speed: number; // fraction of normal scroll speed — <1 drifts slower (parallax)
  behind?: boolean; // renders under the card stack instead of over the page
};

const STICKERS: StickerSpec[] = [
  { img: sticker1, className: 'life-sticker--tl', tilt: -14, size: 40, speed: 0.5 },
  { img: sticker2, className: 'life-sticker--tr', tilt: 10, size: 46, speed: 0.65 },
  { img: sticker2, className: 'life-sticker--ml', tilt: -8, size: 36, speed: 0.35 },
  { img: sticker1, className: 'life-sticker--mr', tilt: 16, size: 42, speed: 0.6 },
  { img: sticker1, className: 'life-sticker--bl', tilt: 12, size: 44, speed: 0.4 },
  { img: sticker2, className: 'life-sticker--br', tilt: -10, size: 38, speed: 0.55 },
  // Peeking out from behind/beside the card stack itself.
  { img: sticker2, className: 'life-sticker--card-tl', tilt: -18, size: 40, speed: 0.45, behind: true },
  { img: sticker1, className: 'life-sticker--card-tr', tilt: 14, size: 34, speed: 0.7 },
  { img: sticker1, className: 'life-sticker--card-bl', tilt: 20, size: 38, speed: 0.7 },
  { img: sticker2, className: 'life-sticker--card-br', tilt: -12, size: 36, speed: 0.45, behind: true },
];

function Sticker({ spec, sectionRef }: { spec: StickerSpec; sectionRef: RefObject<HTMLElement | null> }) {
  const { img, className, tilt, size, speed, behind } = spec;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  // Parallax: this sticker's own travel across the section's scroll range is
  // `speed` × the section's own scroll distance, so slower-than-page drift.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const travel = 220 * (1 - speed);
  const y = useTransform(scrollYProgress, [0, 1], [travel / 2, -travel / 2]);

  return (
    <motion.div
      ref={ref}
      className={`life-sticker ${className}${behind ? ' life-sticker--behind' : ''}`}
      style={{ y, width: size, height: size }}
      initial={{ opacity: 0, scale: 0.4, rotate: tilt * 3 }}
      animate={inView ? { opacity: 1, scale: 1, rotate: tilt } : {}}
      transition={{ type: 'spring', stiffness: 180, damping: 14 }}
      aria-hidden="true"
    >
      <img src={img} alt="" className="life-sticker__img" draggable={false} />
    </motion.div>
  );
}

export default function LifeStickers({ sectionRef }: { sectionRef: RefObject<HTMLElement | null> }) {
  return (
    <>
      {STICKERS.map((spec, i) => (
        <Sticker key={i} spec={spec} sectionRef={sectionRef} />
      ))}
    </>
  );
}
