import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { PROJECTS, type Project } from '@/data/projects';
import { WorkThumb } from '@/components/WorkThumbs';

/* Work as an index: big titles in a list. Hovering a row brings out a preview card that trails
   the cursor and leans with its speed, while the other rows dim. Tap or click opens the project. */

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
      const tilt = Math.max(-6, Math.min(6, dx * 0.06));
      // float above the cursor so the hovered title stays readable; drop below it near the top of the screen
      const above = y - el.offsetHeight - 28 > 72;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-30%, ${above ? 'calc(-100% - 28px)' : '28px'}) rotate(${tilt}deg)`;
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

      {/* the headline win gets the stage before the list */}
      {PROJECTS.filter(pr => pr.award?.tier === 1).map(pr => (
        <button key={pr.slug} className="windex-feature" onClick={e => onOpen(pr, { x: e.clientX, y: e.clientY })}>
          <span className="windex-feature-art"><WorkThumb slug={pr.slug} /></span>
          <span className="windex-feature-text">
            <span className="windex-prize"><b>Winner</b> {pr.award!.title}</span>
            <span className="windex-prize-detail">{pr.award!.detail}</span>
            <span className="windex-feature-title">{pr.title}</span>
            <span className="windex-what">{pr.oneLiner}</span>
            <span className="windex-feature-open">[ Open project ]</span>
          </span>
        </button>
      ))}

      <ol className="windex-list" onMouseLeave={() => setHover(null)}>
        {PROJECTS.map((proj, i) => proj.award?.tier === 1 ? null : (
          <li key={proj.slug} className={hover === i ? 'on' : undefined}>
            <button onMouseEnter={() => setHover(i)} onFocus={() => setHover(i)} onBlur={() => setHover(null)}
              onClick={e => onOpen(proj, { x: e.clientX || window.innerWidth / 2, y: e.clientY || window.innerHeight / 2 })}>
              <span className="windex-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="windex-title">{proj.title}{proj.award && <small className="windex-prize"><b>{proj.award.tag ?? 'Winner'}</b> {proj.award.title}</small>}</span>
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
              <WorkThumb slug={proj.slug} />
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
