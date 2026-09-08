import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { portfolio } from '../data/portfolio';
import './Experience.css';

function ExperienceItem({
  exp,
  index,
}: {
  exp: typeof portfolio.experience[0];
  index: number;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const itemInView = useInView(itemRef, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={itemRef}
      className="exp-item"
      initial={{ opacity: 0, y: 32 }}
      animate={itemInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
    >
      <div className="exp-item__left">
        <span className="exp-item__num">0{index + 1}</span>
        <div className="exp-item__company">
          {exp.logo && (
            <img
              src={exp.logo}
              alt={exp.company}
              className="exp-item__logo"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          )}
          <span className="exp-item__company-name">{exp.company}</span>
        </div>
      </div>

      <div className="exp-item__center">
        <h3 className="exp-item__role">{exp.role}</h3>
        <p className="exp-item__desc">{exp.description}</p>
        <div className="exp-item__techs">
          {exp.technologies.map((tech) => (
            <span key={tech} className="exp-item__tech">{tech}</span>
          ))}
        </div>
      </div>

      <div className="exp-item__right">
        <span className="exp-item__duration">{exp.duration}</span>
        <span className="exp-item__type">{exp.type}</span>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="experience section--dark" id="experience" ref={ref} aria-label="Experience">
      <div className="experience__inner">
        <motion.span
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Experience
        </motion.span>

        <div className="experience__list">
          {portfolio.experience.map((exp, i) => (
            <ExperienceItem key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
