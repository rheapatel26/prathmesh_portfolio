import { useEffect, useRef } from 'react';

export function useMousePosition() {
  const x = useRef(0);
  const y = useRef(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.current = e.clientX;
      y.current = e.clientY;
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return { x, y };
}

export function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.setProperty('--revealed', '1');
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
