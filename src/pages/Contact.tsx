import { useEffect, useRef, useState } from 'react';
import { Copy, Check, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { OrbitButton, RollLink } from '@/components/OrbitButton';

import { EMAIL } from '@/lib/contact';

// keep messages a sensible size; anything bigger is almost certainly a bot
const LIMITS = { name: 100, email: 254, message: 4000 } as const;
const MIN_FILL_MS = 3000;   // people take a few seconds to write; bots submit instantly

const ELSEWHERE = [
  { label: 'GitHub',   href: 'https://github.com/andreay99' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/andrea-yanez-soto-8b4653218' },
  { label: 'Medium',   href: 'https://medium.com/@ay387' },
  { label: 'Resume',   href: '/resume.pdf' },
];

/** current time in New Jersey, so people know when I'll see their message */
const useLocalTime = () => {
  const fmt = () => new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: '2-digit' }).format(new Date());
  const [t, setT] = useState(fmt);
  useEffect(() => { const id = setInterval(() => setT(fmt()), 15000); return () => clearInterval(id); }, []);
  return t;
};

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [copied, setCopied] = useState(false);
  const [trap, setTrap] = useState('');          // honeypot: hidden from people, bots fill it in
  const openedAt = useRef(Date.now());
  const time = useLocalTime();

  const copy = async () => {
    try { await navigator.clipboard.writeText(EMAIL); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* clipboard blocked: the mailto link still works */ }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    // bots: filled the hidden field, or submitted faster than a person can type. Pretend it worked.
    if (trap || Date.now() - openedAt.current < MIN_FILL_MS) { setStatus('sent'); return; }
    const clean = {
      name: form.name.trim().slice(0, LIMITS.name),
      email: form.email.trim().slice(0, LIMITS.email),
      message: form.message.trim().slice(0, LIMITS.message),
    };
    if (!clean.name || !clean.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email)) { setStatus('error'); return; }
    setStatus('sending');
    try {
      const r = await fetch('https://formspree.io/f/xjgjjjdj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        // _gotcha is Formspree's own honeypot field; Formspree drops submissions where it's filled
        body: JSON.stringify({ ...clean, _gotcha: trap }),
      });
      if (r.ok) { setStatus('sent'); setForm({ name: '', email: '', message: '' }); } else setStatus('error');
    } catch { setStatus('error'); }
  };

  const field = (k: keyof typeof form, label: string, type = 'text') => (
    <label className="line-field">
      <span>{label}</span>
      {k === 'message'
        ? <textarea rows={4} required maxLength={LIMITS[k]} value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} />
        : <input type={type} required maxLength={LIMITS[k]} autoComplete={k === 'email' ? 'email' : 'name'} value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} />}
    </label>
  );

  return (
    <div className="sky-page">
      <div className="sky-stars" aria-hidden />

      <header className="sky-head">
        <h1 className="contact-statement">Contact</h1>
        <p className="contact-status">I’m open to full-time roles, research and interesting projects. Email is the fastest way to reach me. I’m in New Jersey, where it’s {time}.</p>

        <div className="contact-email">
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <button onClick={copy} aria-label="Copy email">
            {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
          </button>
        </div>
      </header>

      <section className="sky-body contact-grid">
        <Reveal>
          <form onSubmit={submit} className="contact-form">
            <p className="contact-label">Or send a message here</p>
            <div className="contact-row">
              {field('name', 'Your name')}
              {field('email', 'Email', 'email')}
            </div>
            {field('message', 'Message')}
            {/* honeypot: off-screen and skipped by keyboard and screen readers, so only bots fill it */}
            <label className="hp" aria-hidden="true">
              Company website
              <input type="text" name="company_website" tabIndex={-1} autoComplete="off" value={trap} onChange={e => setTrap(e.target.value)} />
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 8, flexWrap: 'wrap' }}>
              <OrbitButton type="submit" disabled={status === 'sending'} icon={<ArrowRight size={14} />}>
                {status === 'sending' ? 'Sending' : status === 'sent' ? 'Sent. Thank you.' : 'Send'}
              </OrbitButton>
              {status === 'error' && <span style={{ fontSize: 13, color: '#f2a7a7' }}>That didn't go through. Try the email above.</span>}
            </div>
          </form>
        </Reveal>

        <Reveal delay={120}>
          <div className="contact-elsewhere">
            <p className="contact-label">Elsewhere</p>
            <ul>
              {ELSEWHERE.map(l => (
                <li key={l.label}><RollLink href={l.href} external>{l.label}</RollLink></li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default Contact;
