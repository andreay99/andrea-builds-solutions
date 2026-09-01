import { PageTransition } from "@/components/PageTransition";
import { AuroraBackground } from "@/components/AuroraBackground";
import { ExternalLink, Clock, Tag } from "lucide-react";

const ACCENT = '#00C9D8';

/* ── Blog post data ─────────────────────────────────────────── */
const POSTS = [
  {
    title: "Implementing Flash Attention's Backward Pass in Raw CUDA — What I Learned",
    description: "A deep dive into writing a memory-efficient backward pass for Flash Attention from scratch in CUDA C++. Covers tiled recomputation, online softmax statistics, gradient verification against PyTorch, and the 22.67× HBM reduction that makes it possible.",
    date: 'May 2026',
    readTime: '8 min read',
    tags: ['CUDA', 'Flash Attention', 'GPU Programming', 'Deep Learning'],
    url: 'https://medium.com/@ay387/implementing-flash-attentions-backward-pass-in-raw-cuda-what-i-learned-34514b7c8b5f',
    featured: true,
  },
];

/* ── Helpers ────────────────────────────────────────────────── */
const glass: React.CSSProperties = {
  background: 'rgba(8,9,14,0.45)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 16,
};

const BlogCard = ({ post }: { post: typeof POSTS[0] }) => (
  <a
    href={post.url}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      ...glass,
      display: 'block',
      padding: '32px 36px',
      textDecoration: 'none',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
      cursor: 'pointer',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,201,216,0.12)`;
      e.currentTarget.style.borderColor = 'rgba(0,201,216,0.25)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
    }}
  >
    {/* Featured glow */}
    {post.featured && (
      <div style={{
        position: 'absolute', top: 0, right: 0, width: 200, height: 200,
        background: `radial-gradient(circle, ${ACCENT}10 0%, transparent 70%)`,
        pointerEvents: 'none',
      }}/>
    )}

    {/* Header row */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{
          fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
          color: ACCENT, background: `${ACCENT}14`, padding: '4px 10px', borderRadius: 20,
          border: `1px solid ${ACCENT}28`,
        }}>
          {post.featured ? 'Featured' : 'Post'}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'rgba(240,240,245,0.35)' }}>
          <Clock size={12} />
          {post.readTime}
        </span>
      </div>
      <span style={{ fontSize: 12, color: 'rgba(240,240,245,0.3)', whiteSpace: 'nowrap' }}>{post.date}</span>
    </div>

    {/* Title */}
    <h3 style={{
      fontFamily: 'Space Grotesk, sans-serif',
      fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
      fontWeight: 700,
      color: '#f0f0f5',
      lineHeight: 1.3,
      marginBottom: 12,
    }}>
      {post.title}
    </h3>

    {/* Description */}
    <p style={{
      fontSize: 14, color: 'rgba(240,240,245,0.5)', lineHeight: 1.7,
      marginBottom: 20, maxWidth: 680,
    }}>
      {post.description}
    </p>

    {/* Tags */}
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
      {post.tags.map(tag => (
        <span key={tag} style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          padding: '4px 10px', borderRadius: 40,
          fontSize: 11, fontWeight: 500, letterSpacing: '0.03em',
          background: `${ACCENT}10`, color: ACCENT, border: `1px solid ${ACCENT}20`,
          fontFamily: 'Inter, sans-serif',
        }}>
          <Tag size={10} />
          {tag}
        </span>
      ))}
    </div>

    {/* Read link */}
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      fontSize: 13, fontWeight: 600, color: ACCENT,
    }}>
      Read on Medium
      <ExternalLink size={14} />
    </div>
  </a>
);

/* ── Page ──────────────────────────────────────────────────── */
const Blog = () => (
  <PageTransition>
    <AuroraBackground />
    <div style={{ background: 'transparent', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <div className="page-enter" style={{ paddingTop: 120, paddingBottom: 100 }}>
        <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 32px' }}>

          {/* Header */}
          <p style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: ACCENT, marginBottom: 14, fontWeight: 600 }}>Writing</p>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 700, color: '#f0f0f5', marginBottom: 14, lineHeight: 1.1 }}>Blog</h2>
          <p style={{ color: 'rgba(240,240,245,0.45)', fontSize: 15, marginBottom: 56, maxWidth: 480 }}>
            Technical deep dives on GPU programming, AI/ML, and building systems from scratch.
          </p>

          {/* Posts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {POSTS.map(post => <BlogCard key={post.url} post={post} />)}
          </div>

        </div>
      </div>
    </div>
  </PageTransition>
);

export default Blog;
