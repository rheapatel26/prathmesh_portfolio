import { portfolio } from '../data/portfolio';
import { scrollToSelector } from '../utils/scrollTo';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer section--footer" aria-label="Footer">
      <div className="footer__inner">
        {/* Big logo */}
        <div className="footer__name-wrap">
          <img
            src="/images/logo.png"
            alt={`${portfolio.name.first} ${portfolio.name.last}`}
            className="footer__logo"
          />
        </div>

        {/* Dashed divider */}
        <div className="footer__divider" aria-hidden="true" />

        {/* Links row */}
        <div className="footer__links">
          {/* Email */}
          <div className="footer__links-col">
            <span className="footer__links-label">For Project Enquiries</span>
            <a href={`mailto:${portfolio.email}`} className="footer__link" data-hover>
              ↗ {portfolio.email}
            </a>
          </div>

          {/* Nav */}
          <div className="footer__links-col">
            {[
              { href: '#about', label: 'About' },
              { href: '#life-lately', label: 'Life Lately' },
              { href: '#case-studies', label: 'Case Studies' },
              { href: '#lab', label: 'Lab' },
              { href: '#classified-contact', label: 'Contact' },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="footer__link"
                data-hover
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSelector(href);
                }}
              >
                ↗ {label.toUpperCase()}
              </a>
            ))}
            <a href={portfolio.resumeUrl} className="footer__link" data-hover>↗ RESUME</a>
          </div>

          {/* Socials */}
          <div className="footer__links-col">
            {Object.entries(portfolio.social).map(([key, url]) => (
              <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="footer__link" data-hover>
                ↗ {key.toUpperCase()}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <span className="footer__copy">© {year}</span>
          <span className="footer__rights">ALL RIGHTS RESERVED</span>
          <button className="footer__top-btn" onClick={scrollTop} data-hover aria-label="Back to top">
            GO TOP
          </button>
        </div>
      </div>
    </footer>
  );
}
