import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, Star, Maximize2, X } from 'lucide-react';
import { PageTransition } from '@/components/PageTransition';

const ACCENT = '#00C9D8';
const ACCENT_RGB = '0,201,216';

interface Metric { label: string; val: string; }

interface ProjectDetailProps {
  title: string;
  techLabel: string;
  description: string;
  highlight: string;
  awards?: string[];
  metrics: Metric[];
  techStack: string[];
  arch?: string;
  simComponent?: React.ReactNode;
  githubLink?: string;
  liveLink?: string;
}

const ArchLightbox = ({ src, title, onClose }: { src: string; title: string; onClose: () => void }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.88)',
        backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '32px',
        animation: 'fadeIn 0.18s ease both',
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 20, right: 20,
          width: 40, height: 40, borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
          color: '#f0f0f5', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1, transition: 'background 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.16)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
      >
        <X size={18} />
      </button>

      {/* Image container — stop propagation so clicking image doesn't close */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          borderRadius: 16, overflow: 'hidden',
          border: `1px solid rgba(${ACCENT_RGB},0.25)`,
          boxShadow: `0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(${ACCENT_RGB},0.1)`,
          maxWidth: '90vw', maxHeight: '85vh',
          animation: 'scaleIn 0.22s cubic-bezier(0.22,1,0.36,1) both',
        }}
      >
        {/* Terminal bar */}
        <div style={{ background: 'rgba(255,255,255,0.05)', borderBottom: `1px solid rgba(${ACCENT_RGB},0.15)`, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {['#ff5f57','#ffbd2e','#28c840'].map(c => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.7 }}/>
            ))}
          </div>
          <span style={{ fontSize: 11, color: 'rgba(240,240,245,0.45)', letterSpacing: '0.08em', fontFamily: 'monospace' }}>
            {title.toLowerCase().replace(/ /g,'_')}_architecture — fullscreen
          </span>
        </div>
        <img
          src={src}
          alt={`${title} architecture`}
          style={{ display: 'block', maxWidth: '90vw', maxHeight: 'calc(85vh - 42px)', objectFit: 'contain', filter: 'brightness(0.96) contrast(1.04)' }}
        />
      </div>

      {/* Hint */}
      <p style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', fontSize: 12, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em' }}>
        Press ESC or click outside to close
      </p>
    </div>
  );
};

const ProjectDetail = ({
  title, techLabel, description, highlight,
  awards = [], metrics, techStack, arch, simComponent,
  githubLink, liveLink,
}: ProjectDetailProps) => {
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState(false);
  const openLightbox  = useCallback(() => setLightbox(true),  []);
  const closeLightbox = useCallback(() => setLightbox(false), []);

  return (
    <PageTransition>
      <div style={{ background: '#08090e', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        <div className="page-enter" style={{ paddingTop: 120, paddingBottom: 100 }}>
          <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 32px' }}>

            {/* Back */}
            <button onClick={() => navigate('/projects')} className="btn-ghost"
              style={{ marginBottom: 36, padding: '8px 16px', fontSize: 13 }}>
              <ArrowLeft size={16} /> Back to Projects
            </button>

            {/* Header */}
            <p style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: ACCENT, marginBottom: 12, fontWeight: 600 }}>
              {techLabel}
            </p>
            <h2 style={{ marginBottom: 16 }}>{title}</h2>

            {/* Awards */}
            {awards.length > 0 && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
                {awards.map(a => (
                  <span key={a} className="award"><Star size={10} fill="#ffd232" />{a}</span>
                ))}
              </div>
            )}

            {/* Description */}
            <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: 36 }}>
              {description}
            </p>

            {/* Highlight callout */}
            <div style={{
              padding: '16px 20px', borderRadius: 12, marginBottom: 36,
              background: `rgba(${ACCENT_RGB},0.08)`,
              borderLeft: `3px solid ${ACCENT}`,
            }}>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text)' }}>{highlight}</p>
            </div>

            {/* Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 40 }}>
              {metrics.map(m => (
                <div key={m.label} className="card" style={{ padding: '20px 16px', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: ACCENT, marginBottom: 6 }}>{m.val}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{m.label}</div>
                </div>
              ))}
            </div>

            {/* Live simulation */}
            {simComponent && simComponent}

            {/* Architecture with lightbox */}
            {!simComponent && arch ? (
              <>
                <div style={{ marginBottom: 40, borderRadius: 14, overflow: 'hidden', border: `1px solid rgba(${ACCENT_RGB},0.2)` }}>
                  {/* Terminal bar */}
                  <div style={{ background: 'rgba(255,255,255,0.04)', borderBottom: `1px solid rgba(${ACCENT_RGB},0.15)`, padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        {['#ff5f57','#ffbd2e','#28c840'].map(c => (
                          <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.7 }}/>
                        ))}
                      </div>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.08em', fontFamily: 'monospace' }}>
                        {title.toLowerCase().replace(/ /g,'_')}_architecture
                      </span>
                    </div>
                    {/* Expand button */}
                    <button
                      onClick={openLightbox}
                      title="View fullscreen"
                      style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        padding: '4px 10px', borderRadius: 6,
                        background: 'transparent', border: `1px solid rgba(${ACCENT_RGB},0.2)`,
                        color: ACCENT, fontSize: 11, cursor: 'pointer',
                        fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em',
                        transition: 'background 0.2s, border-color 0.2s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = `rgba(${ACCENT_RGB},0.1)`; e.currentTarget.style.borderColor = ACCENT; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = `rgba(${ACCENT_RGB},0.2)`; }}
                    >
                      <Maximize2 size={12} /> Expand
                    </button>
                  </div>

                  {/* Image — clickable to open lightbox */}
                  <div style={{ position: 'relative', cursor: 'zoom-in', overflow: 'hidden' }} onClick={openLightbox}>
                    <img
                      src={arch}
                      alt={`${title} architecture`}
                      style={{ width: '100%', display: 'block', filter: 'brightness(0.92) contrast(1.05)', transition: 'filter 0.25s, transform 0.35s cubic-bezier(0.22,1,0.36,1)' }}
                      onMouseEnter={e => { (e.target as HTMLImageElement).style.filter = 'brightness(1) contrast(1.05)'; (e.target as HTMLImageElement).style.transform = 'scale(1.015)'; }}
                      onMouseLeave={e => { (e.target as HTMLImageElement).style.filter = 'brightness(0.92) contrast(1.05)'; (e.target as HTMLImageElement).style.transform = ''; }}
                    />
                    {/* Hover overlay hint */}
                    <div style={{
                      position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: `rgba(${ACCENT_RGB},0.06)`, opacity: 0, transition: 'opacity 0.25s',
                      pointerEvents: 'none',
                    }}
                      className="arch-hover-hint"
                    />
                  </div>
                </div>

                {/* Lightbox portal */}
                {lightbox && <ArchLightbox src={arch} title={title} onClose={closeLightbox} />}
              </>
            ) : !simComponent && (
              <div style={{ height: 220, borderRadius: 14, marginBottom: 40, border: '1px solid var(--border)', background: 'repeating-linear-gradient(45deg,rgba(255,255,255,0.015) 0px,rgba(255,255,255,0.015) 1px,transparent 1px,transparent 14px)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
                <div style={{ fontSize: 11, color: 'var(--text-dim)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Architecture Diagram</div>
                <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>coming soon</div>
              </div>
            )}

            {/* Tech stack */}
            <h3 style={{ marginBottom: 14, fontSize: '0.95rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>Tech Stack</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
              {techStack.map(t => <span key={t} className="tag">{t}</span>)}
            </div>

            {/* Links */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {githubLink && (
                <a href={githubLink} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ textDecoration: 'none', fontSize: 14 }}>
                  <Github size={16} /> GitHub
                </a>
              )}
              {liveLink && (
                <a href={liveLink} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ textDecoration: 'none', fontSize: 14 }}>
                  <ExternalLink size={14} /> Live Demo
                </a>
              )}
            </div>

          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ProjectDetail;
