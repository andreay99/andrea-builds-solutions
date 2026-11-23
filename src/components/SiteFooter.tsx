import { useEffect, useState } from 'react';
import { EMAIL } from '@/lib/contact';

/* Sign-off: the email, the usual links, and the year. */
export const SiteFooter = () => {
  const [time, setTime] = useState('');
  useEffect(() => {
    const f = () => setTime(new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: '2-digit' }).format(new Date()));
    f(); const id = setInterval(f, 30000); return () => clearInterval(id);
  }, []);

  return (
    <footer className="foot">
      <div className="foot-row">
        <a href={`mailto:${EMAIL}`} className="foot-mail">{EMAIL}</a>
        <nav className="foot-links">
          <a href="https://github.com/andreay99" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/andrea-yanez-soto-8b4653218" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://medium.com/@ay387" target="_blank" rel="noopener noreferrer">Medium</a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
        </nav>
      </div>
      <div className="foot-base">
        <span>© {new Date().getFullYear()} Andrea Yanez Soto</span>
        <span>New Jersey · {time}</span>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top ↑</button>
      </div>
    </footer>
  );
};
