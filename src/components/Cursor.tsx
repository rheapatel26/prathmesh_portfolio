import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [dark, setDark] = useState(false);
  const [hovered, setHovered] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isDark = !!target.closest('.section--dark, .section--footer');
      setDark(isDark);
      const isHover = !!target.closest('a, button, [data-hover]');
      setHovered(isHover);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onEnter);

    const animate = () => {
      if (cursorRef.current && ringRef.current) {
        cursorRef.current.style.left = `${pos.current.x}px`;
        cursorRef.current.style.top = `${pos.current.y}px`;

        // ring lags behind
        ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
        ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`cursor ${dark ? 'cursor--dark' : ''} ${hovered ? 'cursor--hover' : ''}`}
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${dark ? 'cursor-ring--dark' : ''} ${hovered ? 'cursor-ring--hover' : ''}`}
      />
    </>
  );
}
