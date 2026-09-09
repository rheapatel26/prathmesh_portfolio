import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import phoneImg from '@/assets/phone.png';
import { portfolio } from '../data/portfolio';
import './ClassifiedContact.css';

export default function ClassifiedContact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [ringing, setRinging] = useState(false);

  function triggerRing() {
    setRinging(true);
    setTimeout(() => setRinging(false), 700);
  }

  return (
    <motion.section
      ref={ref}
      className="classified-contact"
      id="classified-contact"
      aria-label="Classified Contact"
    >
      <div className="classified-contact__inner">

        {/* Top label */}
        <motion.span
          className="classified-contact__label"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          CLASSIFIED CONTACT
        </motion.span>

        {/* Headline banner */}
        <motion.div
          className="classified-contact__banner"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <span className="classified-contact__headline">
            DIAL 007 TO MAKE CONTACT
          </span>
        </motion.div>

        {/* Phone image — interactive ringing element */}
        <motion.div
          className="classified-contact__phone-wrap"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          {/* iMessage-style bubble — visible while ringing */}
          <motion.div
            className="classified-contact__bubble"
            initial={{ opacity: 0, scale: 0.7, y: 10 }}
            animate={ringing
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.7, y: 10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            aria-live="polite"
          >
            <span className="classified-contact__bubble-text">
              Yo Phone Linging
              <span className="classified-contact__dots">
                <span /><span /><span />
              </span>
            </span>
            {/* Bubble tail */}
            <span className="classified-contact__bubble-tail" aria-hidden="true" />
          </motion.div>

          <motion.img
            src={phoneImg}
            alt="Vintage phone — click to make contact"
            className={`classified-contact__phone${ringing ? ' classified-contact__phone--ringing' : ''}`}
            onClick={() => {
              triggerRing();
              window.location.href = `mailto:${portfolio.email}`;
            }}
            onMouseEnter={triggerRing}
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            data-hover
          />
        </motion.div>

        {/* Bottom CTA */}
        <motion.a
          href={`mailto:${portfolio.email}`}
          className="classified-contact__cta"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          data-hover
        >
          ↗ {portfolio.email}
        </motion.a>

      </div>
    </motion.section>
  );
}
