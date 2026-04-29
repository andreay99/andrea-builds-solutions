import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Layers, Briefcase, FileText, Mail } from 'lucide-react';

const NAV_ITEMS = [
  { id: '/',           Icon: Home,      label: 'Home',       color: '#00C9D8', glow: 'rgba(0,201,216,0.35)'   },
  { id: '/projects',   Icon: Layers,    label: 'Projects',   color: '#a78bfa', glow: 'rgba(167,139,250,0.35)' },
  { id: '/experience', Icon: Briefcase, label: 'Experience', color: '#fbbf24', glow: 'rgba(251,191,36,0.35)'  },
  { id: '/blog',       Icon: FileText,  label: 'Blog',       color: '#60a5fa', glow: 'rgba(96,165,250,0.35)'  },
  { id: '/contact',    Icon: Mail,      label: 'Contact',    color: '#34d399', glow: 'rgba(52,211,153,0.35)'  },
];

export const Navigation = () => {
  const [hov, setHov]     = useState<string | null>(null);
  const navigate           = useNavigate();
  const location           = useLocation();

  return (
    <nav
      style={{
        position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)',
        zIndex: 100,
        display: 'inline-flex', alignItems: 'center', gap: 2,
        background: 'rgba(8,9,14,0.72)',
        backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 999,
        padding: '6px 8px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {NAV_ITEMS.map(({ id, Icon, label, color, glow }) => {
        const active  = location.pathname === id || (id !== '/' && location.pathname.startsWith(id));
        const isHov   = hov === id;
        const show    = isHov || active;

        return (
          <button
            key={id}
            onClick={() => navigate(id)}
            onMouseEnter={() => setHov(id)}
            onMouseLeave={() => setHov(null)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: show ? '8px 16px' : '8px 11px',
              borderRadius: 999, border: 'none', cursor: 'pointer',
              background: show ? `${color}18` : 'transparent',
              boxShadow: show ? `0 0 16px ${glow}` : 'none',
              transition: 'all 0.32s cubic-bezier(0.34,1.56,0.64,1)',
              outline: 'none',
              minWidth: 0,
            }}
          >
            {/* Icon */}
            <Icon
              size={18}
              style={{
                color: show ? color : 'rgba(240,240,245,0.38)',
                transition: 'color 0.25s ease, transform 0.32s cubic-bezier(0.34,1.56,0.64,1)',
                transform: show ? 'scale(1.15)' : 'scale(1)',
                flexShrink: 0,
              }}
            />

            {/* Label — slides in/out */}
            <span
              style={{
                fontSize: 12.5, fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif',
                letterSpacing: '0.02em', whiteSpace: 'nowrap',
                color: show ? color : 'transparent',
                maxWidth: show ? 90 : 0,
                overflow: 'hidden',
                opacity: show ? 1 : 0,
                transition: 'max-width 0.32s cubic-bezier(0.34,1.56,0.64,1), opacity 0.22s ease, color 0.22s ease',
              }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
