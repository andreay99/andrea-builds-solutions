import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { PROJECTS, type Project } from '@/data/projects';

/* Work as an index: big titles in a list. Hovering a row brings out a preview card that trails
   the cursor and leans with its speed, while the other rows dim. Tap or click opens the project. */

const OrbitArt = () => (
  <svg viewBox="0 0 400 250" style={{ width: '100%', height: '100%', display: 'block' }} aria-hidden>
    <rect width="400" height="250" fill="#05070f" />
    <circle cx="200" cy="125" r="14" fill="#ffd9a0" />
    <circle cx="200" cy="125" r="36" fill="none" stroke="rgba(255,217,160,0.22)" />
    {[70, 104, 140].map((r, i) => <ellipse key={r} cx="200" cy="125" rx={r * 1.25} ry={r * 0.55} fill="none" stroke="rgba(244,245,250,0.16)" transform={`rotate(${-8 + i * 6} 200 125)`} />)}
    {Array.from({ length: 20 }, (_, i) => {
      const a = (i / 20) * Math.PI * 2;
      return <circle key={i} cx={200 + Math.cos(a) * 130} cy={125 + Math.sin(a) * 57} r="2.4" fill="#f4f5fa" transform="rotate(4 200 125)" />;
    })}
  </svg>
);

const year = (p: Project) => p.kicker.match(/20\d\d/)?.[0] ?? '';

export const WorkIndex = ({ onOpen }: { onOpen: (p: Project, at: { x: number; y: number }) => void }) => {
  const [hover, setHover] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const fine = typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // the card eases toward the cursor and tilts with how fast it is moving
  useEffect(() => {
    if (!fine) return;
    let raf = 0, x = 0, y = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const el = cardRef.current; if (!el) return;
      const dx = target.current.x - x, dy = target.current.y - y;
      x += dx * 0.14; y += dy * 0.14;
      const tilt = Math.max(-14, Math.min(14, dx * 0.12));
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(36px, -62%) rotate(${tilt}deg)`;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [fine]);

  const p = hover !== null ? PROJECTS[hover] : null;

  return (
    <section id="work" className={`windex${hover !== null ? ' hovering' : ''}`}
      onMouseMove={e => { target.current = { x: e.clientX, y: e.clientY }; }}>
      <header className="windex-head">
        <h2 className="section-title">Work</h2>
        <span>{String(PROJECTS.length).padStart(2, '0')} projects · hover to preview</span>
      </header>

      <ol className="windex-list" onMouseLeave={() => setHover(null)}>
        {PROJECTS.map((proj, i) => (
          <li key={proj.slug} className={hover === i ? 'on' : undefined}>
            <button onMouseEnter={() => setHover(i)} onFocus={() => setHover(i)} onBlur={() => setHover(null)}
              onClick={e => onOpen(proj, { x: e.clientX || window.innerWidth / 2, y: e.clientY || window.innerHeight / 2 })}>
              <span className="windex-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="windex-title">{proj.title}</span>
              <span className="windex-what">{proj.oneLiner}</span>
              <span className="windex-year">{year(proj)}</span>
            </button>
          </li>
        ))}
      </ol>

      {/* portaled so the page's entrance transform can't offset a fixed element */}
      {fine && createPortal(
        <div ref={cardRef} className={`windex-card${p ? ' show' : ''}`} aria-hidden>
          {PROJECTS.map((proj, i) => (
            <div key={proj.slug} className={`windex-card-art${hover === i ? ' on' : ''}`}>
              {proj.arch ? <img src={proj.arch} alt="" loading="lazy" /> : <OrbitArt />}
            </div>
          ))}
          <div className="windex-card-foot">
            <span>{p ? `${p.metrics[0].val} ${p.metrics[0].label}` : ''}</span>
            <span>[ View ]</span>
          </div>
        </div>,
        document.body,
      )}
    </section>
  );
};
