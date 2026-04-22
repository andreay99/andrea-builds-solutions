import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Layers, Briefcase, FileText, Mail } from 'lucide-react';

const navItems = [
  { id: '/',           Icon: Home,       label: 'Home'       },
  { id: '/projects',   Icon: Layers,     label: 'Projects'   },
  { id: '/experience', Icon: Briefcase,  label: 'Experience' },
  { id: '/blog',       Icon: FileText,   label: 'Blog'       },
  { id: '/contact',    Icon: Mail,       label: 'Contact'    },
];

export const Navigation = () => {
  const [hov, setHov] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav style={{
      position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)',
      zIndex: 100, display: 'flex', gap: 4,
      background: 'rgba(8,9,14,0.78)', backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.08)', borderRadius: 50,
      padding: '8px 12px',
    }}>
      {navItems.map(({ id, Icon, label }) => {
        const active = location.pathname === id || (id !== '/' && location.pathname.startsWith(id));
        return (
          <button
            key={id}
            onClick={() => navigate(id)}
            onMouseEnter={() => setHov(id)}
            onMouseLeave={() => setHov(null)}
            style={{
              background: active ? 'rgba(255,255,255,0.1)' : 'none',
              border: 'none', cursor: 'pointer',
              color: active ? '#f0f0f5' : 'rgba(240,240,245,0.4)',
              padding: '8px 14px', borderRadius: 40,
              display: 'flex', alignItems: 'center', gap: 6,
              transition: 'all 0.2s', fontFamily: 'Inter, sans-serif', fontWeight: 500,
            }}
          >
            <Icon size={18} />
            <span style={{
              maxWidth: hov === id ? 80 : 0,
              overflow: 'hidden', whiteSpace: 'nowrap',
              transition: 'max-width 0.25s ease, opacity 0.25s ease',
              fontSize: 12, letterSpacing: '0.02em',
              opacity: hov === id ? 1 : 0,
            }}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
};
