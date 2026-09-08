import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolio } from '../data/portfolio';
import './Navbar.css';

interface NavLinkItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

const navLinks: NavLinkItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Life Lately', href: '#life-lately' },
  { label: 'Case studies', href: '#case-studies' },
  { label: 'Lab', href: '#lab' },
  { label: 'Resume', href: portfolio.resumeUrl || '/resume.pdf', isExternal: true },
  { label: 'Contact', href: '#classified-contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const [time, setTime] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Detect background theme under navbar
      const el = document.elementFromPoint(
        Math.min(window.innerWidth - 60, window.innerWidth * 0.8),
        40
      );
      const isLightEl = !!el?.closest('.section--light, #about, #case-studies, .case-studies');
      setIsLight(isLightEl);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hours}:${mins}`);
    };
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);

  // Close menu on outside click & Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const handleNav = (link: NavLinkItem) => {
    setMenuOpen(false);
    if (link.isExternal) {
      window.open(link.href, '_blank', 'noopener,noreferrer');
      return;
    }
    const target = document.querySelector(link.href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${isLight ? 'navbar--light' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Col 1 — Logo */}
        <div
          className="navbar__logo"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          data-hover
        >
          <img
            src="/images/logo.png"
            alt={`${portfolio.name.first} ${portfolio.name.last}`}
            className="navbar__logo-img"
          />
        </div>

        {/* Col 2 — Location */}
        <div className="navbar__meta">
          <span className="navbar__meta-label">{portfolio.location}</span>
          <span className="navbar__meta-sub">{portfolio.timezone} · {time}</span>
        </div>

        {/* Col 3 — Status */}
        <div className="navbar__status">
          <span className="navbar__status-label">Currently</span>
          <span className="navbar__status-value">
            {portfolio.availabilityStatus && <span className="navbar__status-dot" />}
            {portfolio.availability}
          </span>
        </div>

        {/* Col 4 — Corner Menu Widget */}
        <div className="navbar__menu-container" ref={menuRef}>
          <div className={`navbar__corner-box ${menuOpen ? 'navbar__corner-box--open' : ''}`}>
            {/* 4 Corner brackets */}
            <span className="corner-bracket corner-bracket--tl" aria-hidden="true" />
            <span className="corner-bracket corner-bracket--tr" aria-hidden="true" />
            <span className="corner-bracket corner-bracket--bl" aria-hidden="true" />
            <span className="corner-bracket corner-bracket--br" aria-hidden="true" />

            {/* Header row with Menu / Close button */}
            <div className="navbar__corner-top">
              <button
                className="navbar__corner-btn"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-expanded={menuOpen}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                data-hover
              >
                {menuOpen ? 'Close' : 'Menu'}
              </button>
            </div>

            {/* Expandable vertical links list */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  className="navbar__corner-content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ul className="navbar__corner-list">
                    {navLinks.map((link, idx) => (
                      <motion.li
                        key={link.label}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.025, duration: 0.18 }}
                      >
                        <button
                          className="navbar__corner-item"
                          onClick={() => handleNav(link)}
                          data-hover
                        >
                          {link.label}
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      {/* ── Version tag ────────────────────────────────────── */}
      <div className={`nav__version ${isLight ? 'nav__version--light' : ''}`} aria-hidden="true">
        <span>{portfolio.version}</span>
        <span>{portfolio.birthdate}</span>
      </div>
    </>
  );
}
