import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/* A thin monospace bar. The page you're on sits in [ brackets ]; hovering a link slides them in. */

const LINKS = [
  { id: '/',           label: 'Home' },
  { id: '/experience', label: 'Experience' },
  { id: '/blog',       label: 'Writing' },
  { id: '/contact',    label: 'Contact' },
];

export const Navigation = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (id: string) => id === '/'
    ? pathname === '/' || pathname.startsWith('/projects/')
    : pathname.startsWith(id);

  return (
    <header className={`topbar${scrolled ? ' scrolled' : ''}`}>
      <button className="topbar-mark" onClick={() => navigate('/')} aria-label="Home">
        Andrea Yanez Soto
      </button>

      <nav className="topbar-links" aria-label="Main">
        {LINKS.map(l => (
          <button key={l.id} onClick={() => navigate(l.id)} className={`topbar-link${isActive(l.id) ? ' on' : ''}`}
            aria-current={isActive(l.id) ? 'page' : undefined}>
            {l.label}
          </button>
        ))}
      </nav>

      <a className="topbar-resume" href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume ↗</a>
    </header>
  );
};
