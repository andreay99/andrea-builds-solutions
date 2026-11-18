import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* A big-type sign-off: one line to start a conversation, the email, and the usual links. */
export const SiteFooter = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState('');
  useEffect(() => {
    const f = () => setTime(new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: '2-digit' }).format(new Date()));
    f(); const id = setInterval(f, 30000); return () => clearInterval(id);
  }, []);

  return (
    <footer className="foot">
      <button className="foot-cta" onClick={() => navigate('/contact')}>
        <span>Let's build</span> <em>something.</em>
      </button>
      <div className="foot-row">
        <a href="mailto:andreayanez11@outlook.com" className="foot-mail">andreayanez11@outlook.com</a>
        <nav className="foot-links">
          <a href="https://github.com/andreay99" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/andreayanezsoto" target="_blank" rel="noopener noreferrer">LinkedIn</a>
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
