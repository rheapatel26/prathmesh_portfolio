// Native `scrollIntoView({behavior:'smooth'})` gets silently cancelled if
// anything else on the page re-renders/reflows mid-animation (e.g. the nav
// menu collapsing right after a click) — the scroll just stops wherever it
// was. Driving the scroll ourselves via rAF re-asserts the position every
// frame, so it can't be knocked off course by unrelated state updates.
export function smoothScrollTo(targetY: number, duration = 900) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  const startTime = performance.now();
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  function step(now: number) {
    const progress = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, startY + diff * easeOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

export function scrollToSelector(selector: string, duration = 900) {
  const target = document.querySelector(selector);
  if (!target) return;
  const y = target.getBoundingClientRect().top + window.scrollY;
  smoothScrollTo(y, duration);
}
