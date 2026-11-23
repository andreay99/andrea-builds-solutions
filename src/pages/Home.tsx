import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Galaxy } from '@/components/Galaxy';
import { Reveal } from '@/components/Reveal';
import { ProjectReveal } from '@/components/ProjectReveal';
import { OrbitButton, RollLink } from '@/components/OrbitButton';
import { WorkIndex } from '@/components/WorkIndex';
import { PROJECTS, projectBySlug, projectByNode, type Project } from '@/data/projects';

const TOOLS = [
  { group: 'Languages',     items: 'Python, TypeScript, C++, CUDA, Java, SQL' },
  { group: 'AI / ML',       items: 'PyTorch, TensorFlow, Hugging Face, OpenCV, LangChain, RAG' },
  { group: 'Web & backend', items: 'React, Next.js, FastAPI, Flask, Node.js, MongoDB' },
  { group: 'Infra',         items: 'Docker, GitHub Actions, AWS, Azure, Vercel' },
];

const PRIZES = PROJECTS.reduce((n, p) => n + (p.award ? p.award.title.split(' · ').filter(t => !t.startsWith('$')).length : 0), 0);
const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
const say = (n: number) => WORDS[n] ?? String(n);

const Home = () => {
  const navigate = useNavigate();
  // /projects/<slug> is this same page with that project opened out of its star
  const { slug } = useParams();
  const project = projectBySlug(slug);
  const [origin, setOrigin] = useState(() => ({ x: window.innerWidth / 2, y: window.innerHeight / 2 }));

  useEffect(() => { if (slug && !project) navigate('/', { replace: true }); }, [slug, project, navigate]);

  // old /projects links land here as /#work
  useEffect(() => {
    if (window.location.hash === '#work') setTimeout(() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }), 400);
  }, []);

  const open = (p: Project, from?: { x: number; y: number }) => {
    if (from) setOrigin(from);
    navigate(`/projects/${p.slug}`);
  };

  return (
    <div className="page-enter" style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>

      {/* Hero: the whole portfolio as a galaxy */}
      <section className="home-galaxy">
        <Galaxy
          height="100%"
          centerY={0.56}
          focusId={project?.nodeId}
          onOpen={(nodeId, x, y) => { const p = projectByNode(nodeId); if (p) open(p, { x, y }); }}
        />
        <div className="home-intro">
          <h1 className="serif-name">Andrea Yanez Soto</h1>
          <p className="home-lede">
            Computer science at NJIT. I write CUDA by hand, build at hackathons, and spent a year forecasting solar eruptions from NASA data.
          </p>
          <div className="home-links">
            <OrbitButton icon={<ArrowRight size={14} style={{ transform: 'rotate(90deg)' }} />}
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}>See my work</OrbitButton>
            <RollLink onClick={() => navigate('/contact')}>Say hello</RollLink>
          </div>
        </div>
        <div className="home-fade" />
      </section>

      <div className="planet-surface">
        <Reveal>
          <p className="home-summary">
            {say(PROJECTS.length)[0].toUpperCase() + say(PROJECTS.length).slice(1)} projects and {say(PRIZES)} prizes so far.
            I spent a year on research at NJIT’s Center for Solar-Terrestrial Research with NASA data, worked at Apple from 2024 to 2026 as a technical specialist and training lead, and now create content and recruit creators on TikTok.
          </p>
        </Reveal>

        <div className="hairline" />

        {/* Work: an index with a cursor-following preview */}
        <WorkIndex onOpen={open} />

        {/* Tools */}
        <section style={{ padding: '40px 0 110px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 28px' }}>
            <Reveal>
              <h2 className="section-title" style={{ marginBottom: 36 }}>Tools I use</h2>
              <div className="tools-list">
                {TOOLS.map(t => (
                  <div key={t.group}>
                    <h3>{t.group}</h3>
                    <p>{t.items}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      </div>

      {project && (
        <ProjectReveal
          project={project}
          origin={origin}
          onClose={() => navigate('/')}
          onNext={p => navigate(`/projects/${p.slug}`, { replace: true })}
        />
      )}
    </div>
  );
};

export default Home;
