import { useRef, type ReactNode, type MouseEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';

/* Two buttons used across the site:
   OrbitButton – a pill that leans toward the cursor, fills with light from where the
                 cursor came in, and rolls its label up on hover.
   RollLink    – a text link whose label rolls and whose underline draws in, then slides out. */

/** letters decode from noise into the label (only in the "scramble" button style) */
const scramble = (host: HTMLElement | null) => {
  if (document.documentElement.dataset.btn !== 'scramble') return;
  const node = host?.querySelector('.roll-a')?.firstChild;
  if (!node || node.nodeType !== Node.TEXT_NODE) return;
  const el = host as HTMLElement & { _final?: string; _t?: number };
  // only trust the remembered label while a scramble is still running
  const final = (el._t && el._final) || node.nodeValue || '';
  el._final = final;
  const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/_';
  let f = 0; const total = 12;
  window.clearInterval(el._t);
  el._t = window.setInterval(() => {
    f++;
    node.nodeValue = final.split('').map((c, i) => (c === ' ' || i < (f / total) * final.length) ? c : glyphs[Math.floor(Math.random() * glyphs.length)]).join('');
    if (f >= total) { window.clearInterval(el._t); el._t = 0; node.nodeValue = final; }
  }, 34);
};

const Roll = ({ children }: { children: ReactNode }) => (
  <span className="roll">
    <span className="roll-a">{children}</span>
    <span className="roll-b" aria-hidden>{children}</span>
  </span>
);

interface Common {
  children: ReactNode;
  href?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  icon?: ReactNode | false;
  external?: boolean;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
}

export const OrbitButton = ({ children, href, onClick, icon, external, type = 'button', disabled, className = '' }: Common) => {
  const ref = useRef<HTMLElement | null>(null);
  const fine = typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const place = (e: MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    el.style.setProperty('--fx', `${x}px`); el.style.setProperty('--fy', `${y}px`);
    if (fine) el.style.transform = `translate(${(x - r.width / 2) * 0.18}px, ${(y - r.height / 2) * 0.3}px)`;
  };
  const leave = (e: MouseEvent) => { place(e); if (ref.current) ref.current.style.transform = ''; };
  const enter = (e: MouseEvent) => { place(e); scramble(ref.current); };

  const inner = (
    <>
      <span className="orbit-fill" aria-hidden />
      <Roll>{children}</Roll>
      {icon !== false && <span className="orbit-icon">{icon ?? <ArrowUpRight size={14} />}</span>}
    </>
  );
  const props = { className: `orbit-btn ${className}`, onMouseEnter: enter, onMouseMove: place, onMouseLeave: leave };

  return href ? (
    <a ref={el => (ref.current = el)} href={href} onClick={onClick} {...props}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{inner}</a>
  ) : (
    <button ref={el => (ref.current = el)} type={type} disabled={disabled} onClick={onClick} {...props}>{inner}</button>
  );
};

export const RollLink = ({ children, href, onClick, icon, external, className = '' }: Common) => {
  const inner = <><Roll>{children}</Roll>{icon}</>;
  return href ? (
    <a href={href} onClick={onClick} className={`roll-link ${className}`} onMouseEnter={e => scramble(e.currentTarget)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{inner}</a>
  ) : (
    <button type="button" onClick={onClick} className={`roll-link ${className}`} onMouseEnter={e => scramble(e.currentTarget)}>{inner}</button>
  );
};
