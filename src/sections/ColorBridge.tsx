import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ColorBridge.css';

/**
 * A tall scroll zone placed right after Case Studies' last card. A
 * full-viewport black panel stays pinned (position: sticky) while the user
 * scrolls through it and fades in from transparent to opaque — so instead of
 * a visible gradient strip, the whole screen (including whatever's still
 * showing of Case Studies underneath) darkens to black before Labs' own
 * dark background takes over. Matches the "section scroll background
 * transition" pattern (e.g. antonyraphy.com's case-studies → work handoff).
 */
export default function ColorBridge() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Function form (not the [input, output] array form) — the array form
  // was observed to produce a rise-then-fall curve past the input range
  // instead of clamping at 1, in this framer-motion version. Uses the full
  // 0–1 range (no early-complete dead zone) so none of the pin's already-
  // short scroll distance is spent sitting on solid black doing nothing.
  const opacity = useTransform(scrollYProgress, (v) => Math.min(v, 1));

  return (
    <div ref={ref} className="color-bridge">
      <motion.div className="color-bridge__fade" style={{ opacity }} aria-hidden="true" />
    </div>
  );
}
