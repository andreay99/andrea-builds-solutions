import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowUpRight, ArrowRight } from 'lucide-react';
import { OSEHSSim } from '@/components/OSEHSSim';
import { OrbitButton, RollLink } from '@/components/OrbitButton';
import { PROJECTS, type Project } from '@/data/projects';

interface Props {
  project: Project;
  /** where the light comes from, in viewport pixels (usually the star that was tapped) */
  origin: { x: number; y: number };
  onClose: () => void;
  onNext: (p: Project) => void;
}

const OPEN_MS = 900, CLOSE_MS = 650;

/** A project opening out of its star: a ring of light grows from the star until it fills the screen. */
export const ProjectReveal = ({ project, origin, onClose, onNext }: Props) => {
  const [closing, setClosing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const close = () => { if (closing) return; setClosing(true); setTimeout(onClose, CLOSE_MS); };

  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', k);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = prev; };
  });

  // switching to the next project: start at the top again
  useEffect(() => { scrollRef.current?.scrollTo({ top: 0 }); }, [project.slug]);

  const idx = PROJECTS.findIndex(p => p.slug === project.slug);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const style = { '--ox': `${origin.x}px`, '--oy': `${origin.y}px`, '--open': `${OPEN_MS}ms`, '--close': `${CLOSE_MS}ms` } as React.CSSProperties;

  return createPortal(
    <div className={`reveal-root${closing ? ' closing' : ''}`} style={style} role="dialog" aria-modal="true" aria-label={project.title}>
      <div className="reveal-flash" />
      <div className="reveal-sheet" ref={scrollRef}>
        <button className="reveal-close" onClick={close} aria-label="Back to the universe"><X size={18} /></button>

        <article key={project.slug} className="reveal-body">
          <p className="reveal-kicker r-in" style={{ '--d': '0ms' } as React.CSSProperties}>{project.kicker}</p>
          <h1 className="reveal-title r-in" style={{ '--d': '60ms' } as React.CSSProperties}>{project.title}</h1>
          <p className="reveal-oneliner r-in" style={{ '--d': '120ms' } as React.CSSProperties}>{project.oneLiner}</p>

          <div className="reveal-metrics r-in" style={{ '--d': '200ms' } as React.CSSProperties}>
            {project.metrics.map(m => (
              <div key={m.label}>
                <div className="reveal-metric-val">{m.val}</div>
                <div className="reveal-metric-label">{m.label}</div>
              </div>
            ))}
          </div>

          <p className="reveal-text r-in" style={{ '--d': '260ms' } as React.CSSProperties}>{project.description}</p>
          <p className="reveal-highlight r-in" style={{ '--d': '300ms' } as React.CSSProperties}>{project.highlight}</p>

          <div className="r-in" style={{ '--d': '340ms' } as React.CSSProperties}>
            {project.sim === 'osehs' && <div className="reveal-figure"><OSEHSSim /></div>}
            {project.arch && (
              <a className="reveal-figure reveal-arch" href={project.arch} target="_blank" rel="noopener noreferrer" title="Open full size">
                <img src={project.arch} alt={`${project.title} architecture`} />
                <span>Architecture · open full size <ArrowUpRight size={12} /></span>
              </a>
            )}
          </div>

          <p className="reveal-stack r-in" style={{ '--d': '380ms' } as React.CSSProperties}>
            <span>Built with</span> {project.stack.join(' · ')}
          </p>

          <div className="reveal-links r-in" style={{ '--d': '420ms' } as React.CSSProperties}>
            {project.live && <OrbitButton href={project.live} external>{project.liveLabel ?? 'Live'}</OrbitButton>}
            {project.github && (project.live
              ? <RollLink href={project.github} external icon={<ArrowUpRight size={14} />}>GitHub</RollLink>
              : <OrbitButton href={project.github} external>View on GitHub</OrbitButton>)}
          </div>

          <button className="reveal-next" onClick={() => onNext(next)}>
            <span>Next</span>
            <span className="reveal-next-title">{next.title} <ArrowRight size={18} /></span>
          </button>
        </article>
      </div>
    </div>,
    document.body,
  );
};
