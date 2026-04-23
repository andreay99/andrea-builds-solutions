import { useState } from "react";
import { Mail, Linkedin, Github, FileText, ExternalLink, Send } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";

const ACCENT = '#00C9D8';

const LINKS = [
  {
    icon: Mail,
    label: 'Email',
    sub: 'Direct contact',
    href: 'mailto:andreayanez11@outlook.com',
    text: 'andreayanez11@outlook.com',
    external: false,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    sub: 'Connect professionally',
    href: 'https://www.linkedin.com/in/andrea-yanez-soto-8b4653218',
    text: 'View Profile',
    external: true,
  },
  {
    icon: Github,
    label: 'GitHub',
    sub: 'Explore my code',
    href: 'https://github.com/andreay99',
    text: 'View Repositories',
    external: true,
  },
  {
    icon: FileText,
    label: 'Resume',
    sub: 'Download my CV',
    href: '/resume.pdf',
    text: 'Download PDF',
    external: false,
    download: true,
  },
];

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10,
  padding: '11px 14px',
  fontSize: 14,
  color: '#f0f0f5',
  fontFamily: 'Inter, sans-serif',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
};

const labelStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: 'rgba(240,240,245,0.55)',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  marginBottom: 6,
  display: 'block',
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('https://formspree.io/f/xzzbyrqk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div style={{ background: '#08090e', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        <div className="page-enter" style={{ paddingTop: 120, paddingBottom: 100 }}>
          <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 32px' }}>

            {/* Header */}
            <p style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: ACCENT, marginBottom: 14, fontWeight: 600 }}>Contact</p>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 700, color: '#f0f0f5', marginBottom: 14, lineHeight: 1.1 }}>Get in Touch</h2>
            <p style={{ color: 'rgba(240,240,245,0.45)', fontSize: 15, marginBottom: 56, maxWidth: 520 }}>
              Open to collaborations, research opportunities, and full-time roles. Let's build something.
            </p>

            {/* Form */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '32px', marginBottom: 40 }}>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1rem', fontWeight: 600, color: '#f0f0f5', marginBottom: 4 }}>Send a Message</h3>
              <p style={{ fontSize: 13, color: 'rgba(240,240,245,0.35)', marginBottom: 24 }}>I'll get back to you as soon as possible.</p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label style={labelStyle} htmlFor="name">Name</label>
                    <input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Your name" style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
                  </div>
                  <div>
                    <label style={labelStyle} htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle} htmlFor="subject">Subject</label>
                  <input id="subject" name="subject" value={formData.subject} onChange={handleChange} required placeholder="What is this about?" style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
                </div>

                <div>
                  <label style={labelStyle} htmlFor="message">Message</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} required placeholder="Your message..." rows={5}
                    style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }}
                    onFocus={e => (e.target.style.borderColor = ACCENT)} onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
                </div>

                {status === 'success' && (
                  <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(0,201,216,0.08)', border: '1px solid rgba(0,201,216,0.3)', color: ACCENT, fontSize: 13 }}>
                    Thanks for reaching out! I'll get back to you soon.
                  </div>
                )}
                {status === 'error' && (
                  <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', fontSize: 13 }}>
                    Something went wrong. Please try again or email me directly.
                  </div>
                )}

                <button type="submit" disabled={loading} style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '12px 24px', borderRadius: 40, background: loading ? 'rgba(0,201,216,0.5)' : ACCENT,
                  color: '#fff', fontWeight: 600, fontSize: 14, fontFamily: 'Space Grotesk, sans-serif',
                  border: 'none', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.25s',
                  alignSelf: 'flex-start',
                }}>
                  <Send size={15} />
                  {loading ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Links grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 12, marginBottom: 32 }}>
              {LINKS.map(link => {
                const Icon = link.icon;
                return (
                  <a key={link.label} href={link.href}
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    {...(link.download ? { download: true } : {})}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: 14, padding: '16px 18px', textDecoration: 'none',
                      transition: 'border-color 0.25s, transform 0.25s, box-shadow 0.25s',
                    }}
                    onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = `${ACCENT}50`; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 12px 40px rgba(0,0,0,0.35)'; }}
                    onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(255,255,255,0.07)'; el.style.transform = ''; el.style.boxShadow = ''; }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(0,201,216,0.06)', border: '1px solid rgba(0,201,216,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={18} color={ACCENT} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 14, color: '#f0f0f5', lineHeight: 1.2 }}>{link.label}</div>
                      <div style={{ fontSize: 12, color: 'rgba(240,240,245,0.4)', marginTop: 2 }}>{link.sub}</div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Additional links */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="https://devpost.com/andreay99" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(240,240,245,0.45)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 8, padding: '7px 14px', transition: 'color 0.2s, border-color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = ACCENT; e.currentTarget.style.borderColor = `${ACCENT}50`; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(240,240,245,0.45)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; }}>
                <ExternalLink size={13} /> Devpost
              </a>
              <a href="tel:7325200494"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(240,240,245,0.45)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 8, padding: '7px 14px', transition: 'color 0.2s, border-color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = ACCENT; e.currentTarget.style.borderColor = `${ACCENT}50`; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(240,240,245,0.45)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; }}>
                (732) 520-0494
              </a>
            </div>

          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
