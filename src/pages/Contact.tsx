import { useState } from "react";
import { Mail, Github, Linkedin, Send } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";

const ACCENT = '#00C9D8';

const LINKS = [
  { Icon: Mail,     label: 'Email',    value: 'andreayanez11@outlook.com',                         href: 'mailto:andreayanez11@outlook.com' },
  { Icon: Github,   label: 'GitHub',   value: 'github.com/andreay99',                              href: 'https://github.com/andreay99' },
  { Icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/andrea-yanez-soto',                 href: 'https://www.linkedin.com/in/andrea-yanez-soto-8b4653218' },
];

const fieldStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10,
  color: '#f0f0f5',
  padding: '14px 16px',
  fontSize: 14,
  fontFamily: 'Inter, sans-serif',
  outline: 'none',
  transition: 'border-color 0.2s',
  width: '100%',
  boxSizing: 'border-box' as const,
};

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const r = await fetch('https://formspree.io/f/xzzbyrqk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(r.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <PageTransition>
      <div style={{ background: '#08090e', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        <div className="page-enter" style={{ paddingTop: 120, paddingBottom: 100 }}>
          <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 32px' }}>

            <p style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: ACCENT, marginBottom: 14, fontWeight: 600 }}>Let's talk</p>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 700, color: '#f0f0f5', marginBottom: 14, lineHeight: 1.1 }}>Contact</h2>
            <p style={{ color: 'rgba(240,240,245,0.45)', fontSize: 15, marginBottom: 56, maxWidth: 440 }}>
              Open to full-time roles, research collaborations, and interesting projects.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>

              {/* Form */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {(['name', 'email', 'message'] as const).map(field =>
                  field === 'message' ? (
                    <textarea key={field} placeholder="Message" value={form[field]}
                      onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} required
                      rows={5} style={{ ...fieldStyle, resize: 'vertical', minHeight: 120, lineHeight: 1.6 }}
                      onFocus={e => (e.target.style.borderColor = ACCENT)}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
                  ) : (
                    <input key={field} type={field === 'email' ? 'email' : 'text'}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} required
                      style={fieldStyle}
                      onFocus={e => (e.target.style.borderColor = ACCENT)}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
                  )
                )}
                <button type="submit" disabled={status === 'sending'} style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '12px 24px', borderRadius: 40, background: ACCENT,
                  color: '#fff', fontWeight: 600, fontSize: 14, fontFamily: 'Space Grotesk, sans-serif',
                  border: 'none', cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  opacity: status === 'sending' ? 0.6 : 1, transition: 'opacity 0.2s',
                }}>
                  {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent ✓' : <><Send size={15} /> Send Message</>}
                </button>
                {status === 'error' && (
                  <p style={{ fontSize: 13, color: '#f87171', margin: 0 }}>Something went wrong. Please try again.</p>
                )}
              </form>

              {/* Link cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {LINKS.map(({ Icon, label, value, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    style={{
                      padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14,
                      textDecoration: 'none', color: 'inherit',
                      background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: 14, transition: 'border-color 0.25s, transform 0.25s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${ACCENT}50`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = ''; }}>
                    <Icon size={20} color={ACCENT} />
                    <div>
                      <div style={{ fontSize: 11, color: 'rgba(240,240,245,0.45)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 2 }}>{label}</div>
                      <div style={{ fontSize: 14, color: '#f0f0f5' }}>{value}</div>
                    </div>
                  </a>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
