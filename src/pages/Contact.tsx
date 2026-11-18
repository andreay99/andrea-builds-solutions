import { useEffect, useState } from 'react';
import { Copy, Check, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { OrbitButton, RollLink } from '@/components/OrbitButton';

const EMAIL = 'andreayanez11@outlook.com';

const ELSEWHERE = [
  { label: 'GitHub',   href: 'https://github.com/andreay99' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/andreayanezsoto' },
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
  const time = useLocalTime();

  const copy = async () => {
    try { await navigator.clipboard.writeText(EMAIL); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* clipboard blocked: the mailto link still works */ }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const r = await fetch('https://formspree.io/f/xjgjjjdj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (r.ok) { setStatus('sent'); setForm({ name: '', email: '', message: '' }); } else setStatus('error');
    } catch { setStatus('error'); }
  };

  const field = (k: keyof typeof form, label: string, type = 'text') => (
    <label className="line-field">
      <span>{label}</span>
      {k === 'message'
        ? <textarea rows={4} required value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} />
        : <input type={type} required value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} />}
    </label>
  );

  return (
    <div className="sky-page">
      <div className="sky-stars" aria-hidden />

      <header className="sky-head">
        <p className="contact-status"><span className="contact-dot" /> Open to full-time roles, research and interesting projects · New Jersey · {time}</p>
        <h1 className="contact-statement">Have something in mind?<br /><em>Let's talk.</em></h1>

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
            <p className="contact-label">Or leave a note</p>
            <div className="contact-row">
              {field('name', 'Your name')}
              {field('email', 'Email', 'email')}
            </div>
            {field('message', 'What are you working on?')}
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 8, flexWrap: 'wrap' }}>
              <OrbitButton type="submit" disabled={status === 'sending'} icon={<ArrowRight size={14} />}>
                {status === 'sending' ? 'Sending' : status === 'sent' ? 'Sent, thank you' : 'Send it'}
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
