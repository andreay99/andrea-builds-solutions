import { PageTransition } from "@/components/PageTransition";

const ACCENT = '#00C9D8';

const Blog = () => (
  <PageTransition>
    <div style={{ background: '#08090e', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <div className="page-enter" style={{ paddingTop: 120, minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', width: '100%', textAlign: 'center' }}>

          <p style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: ACCENT, marginBottom: 14, fontWeight: 600 }}>Writing</p>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 700, color: '#f0f0f5', marginBottom: 16, lineHeight: 1.1 }}>Blog</h2>
          <p style={{ color: 'rgba(240,240,245,0.45)', fontSize: 15, maxWidth: 360, margin: '0 auto' }}>
            Essays and notes on AI/ML, full-stack engineering, and building in public — coming soon.
          </p>
          <div style={{ marginTop: 48, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 40, border: '1px solid rgba(255,255,255,0.1)', fontSize: 13, color: 'rgba(240,240,245,0.45)' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: ACCENT, boxShadow: `0 0 8px ${ACCENT}` }}/>
            Coming soon
          </div>

        </div>
      </div>
    </div>
  </PageTransition>
);

export default Blog;
