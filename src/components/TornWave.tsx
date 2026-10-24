import { useRef, type RefObject } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './TornWave.css';

// Builds a smooth sine-wave path, filled from the wave crest down to the
// bottom of the viewBox — used as the filled layer in the scroll-driven
// wave transition. `phase` shifts the wave horizontally over scroll.
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
// to the bottom/sides) for the stroked border layer.
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

interface TornWaveProps {
  targetRef?: RefObject<HTMLElement | null>;
  fillColor?: string;
  strokeColor?: string;
  filterId?: string;
  className?: string;
}

export default function TornWave({
  targetRef,
  fillColor = '#ffffff',
  strokeColor = '#8f1c1f',
  filterId = 'tear-distortion',
  className = '',
}: TornWaveProps) {
  const fallbackRef = useRef<HTMLDivElement>(null);
  const scrollTarget = targetRef || fallbackRef;

  const { scrollYProgress } = useScroll({
    target: scrollTarget,
    offset: ['start end', 'start start'],
  });

  // Flow the wave across scroll
  const wavePhase = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 4]);

  const tearBorderD = useTransform(wavePhase, (p) =>
    buildWaveLine(p, { amplitude: 12, baseline: 38, waveCount: 2 })
  );
  const tearFillD = useTransform(wavePhase, (p) =>
    buildWavePath(p, { amplitude: 12, baseline: 41, waveCount: 2 })
  );

  return (
    <div ref={fallbackRef} className={`torn-wave ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="torn-wave__svg">
        <defs>
          <filter id={filterId} x="-10%" y="-50%" width="120%" height="200%">
            <feTurbulence type="fractalNoise" baseFrequency="0.05 0.22" numOctaves={2} seed={7} result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={7} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        <motion.path
          d={tearBorderD}
          fill="none"
          stroke={strokeColor}
          strokeWidth={7}
          opacity={0.9}
          filter={`url(#${filterId})`}
        />
        <motion.path d={tearFillD} fill={fillColor} filter={`url(#${filterId})`} />
      </svg>
    </div>
  );
}
