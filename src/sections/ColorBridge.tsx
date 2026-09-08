import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ColorBridge.css';

/**
 * A full-width scroll-driven colour transition strip.
 * Placed between Case Studies (light beige) and Labs (dark).
 * As the strip scrolls from bottom-of-screen to top-of-screen
 * the background smoothly shifts from the case-studies beige (#eeebe8)
 * to the labs dark (#0d0d0d).
 */
export default function ColorBridge() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const bg = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    ['#eeebe8', '#eeebe8', '#0d0d0d']
  );

  return (
    <motion.div
      ref={ref}
      className="color-bridge"
      style={{ backgroundColor: bg }}
      aria-hidden="true"
    />
  );
}
