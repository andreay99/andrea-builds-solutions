import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, Star } from 'lucide-react';
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

const ProjectDetail = ({
  title, techLabel, description, highlight,
  awards = [], metrics, techStack, arch, simComponent,
  githubLink, liveLink,
}: ProjectDetailProps) => {
  const navigate = useNavigate();

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

            {/* Live simulation (overrides static arch diagram) */}
            {simComponent && simComponent}

            {/* Architecture */}
            {!simComponent && arch ? (
              <div style={{ marginBottom: 40, borderRadius: 14, overflow: 'hidden', border: `1px solid rgba(${ACCENT_RGB},0.2)` }}>
                <div style={{ background: 'rgba(255,255,255,0.04)', borderBottom: `1px solid rgba(${ACCENT_RGB},0.15)`, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {['#ff5f57','#ffbd2e','#28c840'].map(c => (
                      <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.7 }}/>
                    ))}
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.08em', fontFamily: 'monospace' }}>
                    {title.toLowerCase().replace(/ /g,'_')}_architecture.png
                  </span>
                </div>
                <img src={arch} alt={`${title} architecture`} style={{ width: '100%', display: 'block', filter: 'brightness(0.92) contrast(1.05)' }}/>
              </div>
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
