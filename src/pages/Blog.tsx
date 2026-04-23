import { PageTransition } from "@/components/PageTransition";

const ACCENT = '#00C9D8';

const TOPICS = [
  { tag: 'AI/ML',     desc: 'Deep dives into machine learning experiments and findings' },
  { tag: 'Projects',  desc: 'Behind-the-scenes looks at how projects were built' },
  { tag: 'Tutorials', desc: 'Technical guides and lessons learned' },
  { tag: 'Research',  desc: 'Updates from NASA solar eruption research' },
];

const Blog = () => (
  <PageTransition>
    <div style={{ background: '#08090e', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <div className="page-enter" style={{ paddingTop: 120, paddingBottom: 100 }}>
        <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 32px' }}>

          {/* Header */}
          <p style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: ACCENT, marginBottom: 14, fontWeight: 600 }}>Writing</p>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 700, color: '#f0f0f5', marginBottom: 14, lineHeight: 1.1 }}>Blog</h2>
          <p style={{ color: 'rgba(240,240,245,0.45)', fontSize: 15, marginBottom: 56, maxWidth: 480 }}>
            Insights on AI/ML engineering, project development, and lessons learned along the way.
          </p>

          {/* Coming soon card */}
          <div style={{ border: '1px dashed rgba(255,255,255,0.12)', borderRadius: 16, padding: '36px 32px' }}>
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.1rem', fontWeight: 600, color: '#f0f0f5', marginBottom: 6 }}>Coming Soon</h3>
            <p style={{ fontSize: 13.5, color: 'rgba(240,240,245,0.45)', marginBottom: 28 }}>This section will feature posts about:</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {TOPICS.map(t => (
                <div key={t.tag} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <span style={{
                    fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
                    color: ACCENT, border: `1px solid ${ACCENT}40`, borderRadius: 6,
                    padding: '3px 8px', whiteSpace: 'nowrap', marginTop: 1, flexShrink: 0,
                  }}>{t.tag}</span>
                  <span style={{ fontSize: 13.5, color: 'rgba(240,240,245,0.45)', lineHeight: 1.6 }}>{t.desc}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  </PageTransition>
);

export default Blog;
