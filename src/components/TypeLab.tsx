import { useEffect, useState } from 'react';

/* A temporary switcher for comparing fonts and button styles on the real pages.
   Only appears with ?lab in the URL, so visitors never see it. */

const FONTS = [
  { id: '',         label: 'A · Instrument Serif + Inter' },
  { id: 'clash',    label: 'B · Clash Display + Satoshi' },
  { id: 'fraunces', label: 'C · Fraunces + Manrope' },
  { id: 'mono',     label: 'D · General Sans + JetBrains Mono' },
];
const NAMES = [
  { id: '',          label: 'i · General Sans' },
  { id: 'clash',     label: 'ii · Clash Display' },
  { id: 'unbounded', label: 'iii · Unbounded' },
  { id: 'fraunces',  label: 'iv · Fraunces' },
  { id: 'mononame',  label: 'v · JetBrains Mono' },
];
const BUTTONS = [
  { id: '',         label: '1 · Magnetic fill' },
  { id: 'scramble', label: '2 · Scramble' },
  { id: 'bracket',  label: '3 · Brackets' },
  { id: 'expand',   label: '4 · Expand from arrow' },
];

const read = (k: string) => { try { return localStorage.getItem(k) ?? ''; } catch { return ''; } };
const write = (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* private mode */ } };

export const TypeLab = () => {
  const [on] = useState(() => typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('lab'));
  // the site defaults (set on <html>) are the starting point
  const [font, setFont] = useState(() => read('lab-font') || 'mono');
  const [btn, setBtn] = useState(() => read('lab-btn') || 'bracket');
  const [name, setName] = useState(() => read('lab-name'));
  const [min, setMin] = useState(false);

  useEffect(() => {
    if (!on) return;
    const h = document.documentElement;
    if (font) h.dataset.font = font; else delete h.dataset.font;
    if (btn) h.dataset.btn = btn; else delete h.dataset.btn;
    if (name) h.dataset.name = name; else delete h.dataset.name;
    write('lab-font', font); write('lab-btn', btn); write('lab-name', name);
  }, [on, font, btn, name]);

  if (!on) return null;

  const group = (title: string, opts: typeof FONTS, val: string, set: (v: string) => void) => (
    <div style={{ marginBottom: 12 }}>
      <p style={{ fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(240,240,245,0.45)', margin: '0 0 6px' }}>{title}</p>
      {opts.map(o => (
        <button key={o.id || 'default'} onClick={() => set(o.id)}
          style={{ display: 'block', width: '100%', textAlign: 'left', padding: '6px 10px', marginBottom: 2, borderRadius: 6, cursor: 'pointer',
            fontSize: 12.5, border: '1px solid ' + (val === o.id ? 'rgba(255,255,255,0.5)' : 'transparent'),
            background: val === o.id ? 'rgba(255,255,255,0.1)' : 'transparent', color: '#f4f5fa' }}>
          {o.label}
        </button>
      ))}
    </div>
  );

  return (
    <div style={{ position: 'fixed', left: 16, bottom: 16, zIndex: 10000, width: min ? 'auto' : 260, padding: min ? '8px 12px' : 14, borderRadius: 12,
      background: 'rgba(14,16,22,0.92)', border: '1px solid rgba(255,255,255,0.14)', backdropFilter: 'blur(12px)', fontFamily: 'Inter, sans-serif' }}>
      <button onClick={() => setMin(m => !m)} style={{ background: 'none', border: 'none', color: '#f4f5fa', fontSize: 12, fontWeight: 600, cursor: 'pointer', padding: 0, marginBottom: min ? 0 : 10 }}>
        Type lab {min ? '▴' : '▾'}
      </button>
      {!min && <>
        {group('Name', NAMES, name, setName)}
        {group('Font', FONTS, font, setFont)}
        {group('Buttons', BUTTONS, btn, setBtn)}
        <p style={{ fontSize: 11, color: 'rgba(240,240,245,0.4)', margin: 0 }}>Hover "See my work" and "Say hello" on Home, or the Send button on Contact.</p>
      </>}
    </div>
  );
};
