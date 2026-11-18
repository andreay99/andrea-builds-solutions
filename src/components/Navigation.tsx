import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Layers, Briefcase, FileText, Mail } from 'lucide-react';

const NAV_ITEMS = [
  { id: '/',           Icon: Home,      label: 'Home'       },
  { id: '/projects',   Icon: Layers,    label: 'Projects'   },
  { id: '/experience', Icon: Briefcase, label: 'Experience' },
  { id: '/blog',       Icon: FileText,  label: 'Blog'       },
  { id: '/contact',    Icon: Mail,      label: 'Contact'    },
];

export const Navigation = () => {
  const [hov, setHov] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav
      style={{
        position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)',
        zIndex: 100,
        display: 'inline-flex', alignItems: 'center', gap: 8,
      }}
    >
      {NAV_ITEMS.map(({ id, Icon, label }) => {
        const active = location.pathname === id || (id !== '/' && location.pathname.startsWith(id));
        const show   = hov === id || active;

        return (
          <button
            key={id}
            aria-label={label}
            onClick={() => navigate(id)}
            onMouseEnter={() => setHov(id)}
            onMouseLeave={() => setHov(null)}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              height: 36,
              minWidth: 36,
              padding: show ? '0 16px 0 12px' : '0',
              borderRadius: 999, cursor: 'pointer', outline: 'none', overflow: 'hidden', flexShrink: 0,
              background: active ? 'rgba(244,245,250,0.92)' : 'rgba(8,9,14,0.45)',
              border: `1px solid ${show ? 'rgba(244,245,250,0.5)' : 'rgba(255,255,255,0.1)'}`,
              backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
              transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <Icon
              size={15}
              strokeWidth={1.6}
              style={{
                color: active ? '#08090e' : show ? '#f4f5fa' : 'rgba(240,240,245,0.55)',
                transition: 'color 0.25s ease',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 10.5, fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif',
                letterSpacing: '0.16em', textTransform: 'uppercase', whiteSpace: 'nowrap',
                color: active ? '#08090e' : '#f4f5fa',
                maxWidth: show ? 110 : 0,
                opacity: show ? 1 : 0,
                overflow: 'hidden',
                transition: 'max-width 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.25s ease',
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
