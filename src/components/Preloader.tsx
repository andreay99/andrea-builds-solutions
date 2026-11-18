import { useEffect, useState } from 'react';

/* A short launch sequence: a counter runs 00 → 100, then a curtain lifts. Once per visit. */
export const Preloader = () => {
  const [show, setShow] = useState(() => {
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
      return !sessionStorage.getItem('launched');
    } catch { return false; }
  });
  const [n, setN] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!show) return;
    try { sessionStorage.setItem('launched', '1'); } catch { /* private mode */ }
    const start = performance.now(), dur = 1300;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else { setLeaving(true); setTimeout(() => setShow(false), 900); }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [show]);

  if (!show) return null;
  return (
    <div className={`preload${leaving ? ' out' : ''}`} aria-hidden>
      <span className="preload-name">Andrea Yanez Soto</span>
      <span className="preload-line"><i style={{ transform: `scaleX(${n / 100})` }} /></span>
      <span className="preload-count">{String(n).padStart(3, '0')}</span>
      <span className="preload-label">Initiating launch sequence</span>
    </div>
  );
};
