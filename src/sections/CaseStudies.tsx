import { useRef, type CSSProperties } from 'react';
import { motion, useInView } from 'framer-motion';
import { caseStudies } from '../data/caseStudies';
import { BinderClip, PaperClipIcon, TornMapCorner } from '../components/CaseStudyDecor';
import './CaseStudies.css';

// Sticky-stack tuning.
// NAV_OFFSET   — px from viewport top where the tab row and cards pin (clears the fixed navbar).
// TAB_HEIGHT   — px height of the tab row, so cards pin directly beneath it.
// WRAP_VH      — vh of scroll before the next card starts covering this one.
// LAST_WRAP_VH — the final card only needs to fill the viewport once.
// TAB_STAGGER_PX  — horizontal offset per tab, so all tabs sit in one row
//                   staircasing rightward (not stacking vertically).
// CARD_STAGGER_PX — each card insets from the left by this much per index, so
//                   every earlier (wider) folder keeps peeking out from behind —
//                   like a fanned stack of real folders, none of them ever leave.
const NAV_OFFSET = 110;
const TAB_HEIGHT = 52;
const WRAP_VH = 170;
const LAST_WRAP_VH = 100;
const TAB_STAGGER_PX = 160;
const CARD_STAGGER_PX = 32;

// One shade of red per card, darkest first — overrides the shared --cs-red
// custom property for that card's subtree (folder bg, spiral holes, CTA hover).
const CARD_SHADES = ['#5c0101', '#8a0202', '#b5473d'];

const wrapHeightVh = (index: number, total: number) => (index === total - 1 ? LAST_WRAP_VH : WRAP_VH);

const cumulativeVh = (index: number, total: number) => {
  let sum = 0;
  for (let k = 0; k < index; k++) sum += wrapHeightVh(k, total);
  return sum;
};

function CaseStudyOverlay({ study, index, total }: { study: (typeof caseStudies)[0]; index: number; total: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const isLast = index === total - 1;

  return (
    // Spans from this card's own start to the very end of the whole stack, so
    // both the tab and the card body inside stay sticky (never unstick and
    // scroll away) — once a folder arrives it stays put, only getting
    // partially covered by the ones that come after it.
    <div
      className="cs-overlay"
      style={{
        top: `${cumulativeVh(index, total)}vh`,
        zIndex: 10 + index,
        ['--cs-red' as string]: CARD_SHADES[index % CARD_SHADES.length],
      } as CSSProperties}
    >
      {/* Folder tab — all tabs sit in one row (same top), staircasing only
          rightward as the index increases. */}
      <div
        className="cs-tab"
        style={{ top: `${NAV_OFFSET}px`, marginLeft: `${index * TAB_STAGGER_PX}px` }}
        aria-hidden="true"
      >
        <span>{study.tab}</span>
      </div>

      {/* Folder body — same top for every card (just below the tab row); the
          hand-off is driven purely by z-index/scroll timing, not offset. */}
      <article
        ref={ref}
        className="cs-card"
        style={{
          top: `${NAV_OFFSET + TAB_HEIGHT}px`,
          marginLeft: `${index * CARD_STAGGER_PX}px`,
          width: `calc(100% - ${index * CARD_STAGGER_PX}px)`,
        }}
        aria-label={`Case study: ${study.tab}`}
      >
        <div className={`cs-card__body${isLast ? ' cs-card__body--last' : ''}`}>
          {/* Left column — spiral-bound notebook page */}
          <motion.div
            className="cs-card__left"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="cs-card__spiral" aria-hidden="true" />

            <div className="cs-card__photo-wrap">
              <BinderClip className="cs-card__clip cs-card__clip--photo" />
              <img src={study.photo} alt={study.title} className="cs-card__photo" loading="lazy" />
            </div>

            <div className="cs-card__receipt" aria-hidden="true">
              <PaperClipIcon className="cs-card__receipt-clip" />
              <span>RECEIPT</span>
              <span>{study.brief.year}</span>
            </div>

            <h3 className="cs-card__title">{study.title}</h3>

            <p className="cs-card__desc">
              {study.description.map((chunk, i) =>
                chunk.bold ? <strong key={i}>{chunk.text}</strong> : <span key={i}>{chunk.text}</span>
              )}
            </p>

            {study.status === 'in-progress' ? (
              <span className="cs-card__badge">
                Research in progress <span className="cs-card__badge-arrow">↳</span>
              </span>
            ) : (
              <a href={study.cta?.href} className="cs-card__cta" data-hover>
                {study.cta?.label} ↗
              </a>
            )}

            <img src={study.sticker} alt="" className="cs-card__sticker" aria-hidden="true" />
          </motion.div>

          {/* Right column — hole-punched brief sheet, overlapped by a
              second mounted polaroid with a handwritten caption */}
          <motion.div
            className="cs-card__right"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <TornMapCorner className="cs-card__map-corner" />

            <div className="cs-card__brief">
              <div className="cs-card__brief-holes" aria-hidden="true" />

              <div className="cs-card__brief-tag">
                <span>{study.category}</span>
                <strong>{study.categoryNumber}</strong>
              </div>

              <p className="cs-card__brief-line">
                <strong>CASE STUDY BRIEF</strong> — {study.tab.replace(/_/g, ' ').trim()}
              </p>
              <p className="cs-card__brief-line">Classification: {study.brief.classification}</p>
              <p className="cs-card__brief-line">
                Role: {study.brief.role} · Year: {study.brief.year}
              </p>
              <p className="cs-card__brief-line">Status: {study.brief.status}</p>

              <p className="cs-card__brief-heading">{study.brief.problemHeading}</p>
              <p className="cs-card__brief-text">{study.brief.problem}</p>
            </div>

            <div className="cs-card__mockup-wrap">
              <div className="cs-card__mockup-backing" aria-hidden="true" />
              <BinderClip className="cs-card__clip cs-card__clip--mockup" />
              <img src={study.mockup} alt="" className="cs-card__mockup" loading="lazy" />
              <p className="cs-card__mockup-caption">{study.title.charAt(0) + study.title.slice(1).toLowerCase()}</p>
            </div>
          </motion.div>
        </div>
      </article>
    </div>
  );
}

export default function CaseStudies() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });
  const total = caseStudies.length;

  return (
    <section className="case-studies section--light" id="case-studies" aria-label="Case Studies">
      <div className="case-studies__header" ref={headerRef}>
        <motion.span
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Selected Work
        </motion.span>
        <motion.h2
          className="case-studies__heading"
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          Case Studies
        </motion.h2>
      </div>

      <div className="case-studies__stack">
        {/* Invisible spacers — give the stack its total scroll height, since
            the visible tab/card content below is pulled out of flow. */}
        {caseStudies.map((study, i) => (
          <div key={study.id + '-spacer'} className="cs-spacer" style={{ height: `${wrapHeightVh(i, total)}vh` }} aria-hidden="true" />
        ))}

        {caseStudies.map((study, i) => (
          <CaseStudyOverlay key={study.id} study={study} index={i} total={total} />
        ))}
      </div>
    </section>
  );
}
