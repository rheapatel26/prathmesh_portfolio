import { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import photo1 from '@/assets/life-lately/photo-1.svg';
import photo2 from '@/assets/life-lately/photo-2.svg';
import photo3 from '@/assets/life-lately/photo-3.svg';
import photo4 from '@/assets/life-lately/photo-4.svg';
import photo5 from '@/assets/life-lately/photo-5.svg';
import './LifeLately.css';

// Dummy placeholders — swap for real photos later.
const PHOTOS = [photo1, photo2, photo3, photo4, photo5];

type StackItem = {
  id: number;
  cycle: number;
  img: string;
  caption: string;
  tag: string;
};

const CAPTIONS = [
  'Coffee before the chaos.',
  'Late-night build session.',
  'Weekend, unplugged.',
  'Somewhere between meetings.',
  'A quiet Sunday reset.',
];

const TAGS = ['MUMBAI', 'STUDIO', 'ROAD TRIP', 'DESK', 'HOME'];

const initialStack: StackItem[] = PHOTOS.map((img, i) => ({
  id: i,
  cycle: 0,
  img,
  caption: CAPTIONS[i % CAPTIONS.length],
  tag: TAGS[i % TAGS.length],
}));

const SWIPE_OFFSET_THRESHOLD = 110;
const SWIPE_VELOCITY_THRESHOLD = 500;
const VISIBLE_DEPTH = 4;

function StackCard({
  item,
  depth,
  isTop,
  exitDir,
  onSwipe,
}: {
  item: StackItem;
  depth: number;
  isTop: boolean;
  exitDir: 'left' | 'right';
  onSwipe: (dir: 'left' | 'right') => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 220], [-16, 16]);
  const cardOpacity = useTransform(x, [-220, -140, 0, 140, 220], [0, 1, 1, 1, 0]);

  const likeOpacity = useTransform(x, [20, 120], [0, 1]);
  const nopeOpacity = useTransform(x, [-120, -20], [1, 0]);

  return (
    <motion.div
      className="life-card"
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        opacity: isTop ? cardOpacity : 1,
        zIndex: VISIBLE_DEPTH - depth,
      }}
      animate={{
        scale: 1 - depth * 0.05,
        y: depth * 16,
      }}
      exit={{
        x: exitDir === 'right' ? 520 : -520,
        rotate: exitDir === 'right' ? 24 : -24,
        opacity: 0,
        transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={(_, info) => {
        if (info.offset.x > SWIPE_OFFSET_THRESHOLD || info.velocity.x > SWIPE_VELOCITY_THRESHOLD) {
          onSwipe('right');
        } else if (info.offset.x < -SWIPE_OFFSET_THRESHOLD || info.velocity.x < -SWIPE_VELOCITY_THRESHOLD) {
          onSwipe('left');
        }
      }}
      whileTap={isTop ? { cursor: 'grabbing' } : undefined}
      data-hover
    >
      <img src={item.img} alt="" className="life-card__img" draggable={false} />

      {isTop && (
        <>
          <motion.span className="life-card__stamp life-card__stamp--like" style={{ opacity: likeOpacity }}>
            KEEP
          </motion.span>
          <motion.span className="life-card__stamp life-card__stamp--nope" style={{ opacity: nopeOpacity }}>
            NEXT
          </motion.span>
        </>
      )}

      <div className="life-card__footer">
        <span className="life-card__tag">{item.tag}</span>
        <span className="life-card__caption">{item.caption}</span>
      </div>
    </motion.div>
  );
}

export default function LifeLately() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [stack, setStack] = useState(initialStack);
  const [exitDir, setExitDir] = useState<'left' | 'right'>('left');

  function handleSwipe(dir: 'left' | 'right') {
    setExitDir(dir);
    setStack((prev) => {
      const [top, ...rest] = prev;
      return [...rest, { ...top, cycle: top.cycle + 1 }];
    });
  }

  return (
    <section className="life-lately" id="life-lately" ref={ref} aria-label="Life Lately">
      <div className="life-lately__inner">
        <motion.span
          className="section-label section-label--light"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Off the Clock
        </motion.span>

        <motion.h2
          className="life-lately__heading"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          Life Lately
        </motion.h2>

        <motion.p
          className="life-lately__hint"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Drag a card left or right to see the next one.
        </motion.p>

        <motion.div
          className="life-lately__stack"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
        >
          <AnimatePresence initial={false}>
            {stack.slice(0, VISIBLE_DEPTH).map((item, i) => (
              <StackCard
                key={`${item.id}-${item.cycle}`}
                item={item}
                depth={i}
                isTop={i === 0}
                exitDir={exitDir}
                onSwipe={handleSwipe}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
