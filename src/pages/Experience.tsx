import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Reveal } from '@/components/Reveal';
import { ProjectReveal } from '@/components/ProjectReveal';
import { projectBySlug, type Project } from '@/data/projects';

/* ── The log ─────────────────────────────────────────────── */
interface Entry {
  year: string;          // shown big in the side column
  period: string;
  title: string;
  org: string;
  summary: string;
  notes: string[];
  numbers?: { val: string; label: string }[];
  stack?: string;
}

const LOG: Entry[] = [
  {
    year: '2025', period: 'Sept 2025 – now',
    title: 'Undergraduate Researcher',
    org: 'NJIT Center for Solar-Terrestrial Research · NASA MIRO',
    summary: 'I train multimodal transformers on decades of NASA SDO and SOHO observations to forecast solar eruptions.',
    notes: [
      'Systematic experiment tracking that improved eruption forecast accuracy by 20%.',
      'Python pipelines over 3D magnetic field data, computing current density and magnetic twist maps for physics-informed neural network reconstruction of the corona.',
      'ParaView visualizations of 3D field structures and flare dynamics for analysis and research talks.',
    ],
    numbers: [{ val: '+20%', label: 'forecast accuracy' }],
    stack: 'Python · PyTorch · ParaView',
  },
  {
    year: '2025', period: 'Jul 2025 – Dec 2025',
    title: 'Training Lead',
    org: 'Apple · Edison, NJ',
    summary: 'I designed and ran the hands-on troubleshooting curriculum for new technicians.',
    notes: [
      'Fewer launch-day escalations, faster tool adoption, and launch sales up 15%.',
      'Trained and mentored 30+ technicians per cycle and shortened the time to floor readiness.',
    ],
    numbers: [{ val: '15%', label: 'launch sales lift' }, { val: '30+', label: 'technicians per cycle' }],
  },
  {
    year: '2024', period: 'Aug 2024 – Mar 2026',
    title: 'Technical Specialist',
    org: 'Apple · Edison, NJ',
    summary: 'I worked escalated macOS and iOS issues with Cupertino engineering, using Xcode debugging tools and log analysis.',
    notes: [
      'Cut resolution time on critical escalated tickets.',
      'Ranked in the top 5% of technicians for quality and efficiency.',
    ],
    numbers: [{ val: 'Top 5%', label: 'quality & efficiency' }],
    stack: 'Xcode · macOS · iOS',
  },
];

const LAUNCHES: { event: string; place: string; project: string; slug: string; note: string; award?: string; major?: boolean }[] = [
  { event: 'HackPrinceton Fall 2026', place: 'Princeton, NJ', project: 'Tellavision', slug: 'tellavision',
    note: 'Backend and data engineer: TimescaleDB time-series answers, the parent Insights queries and the dashboard foundation.',
    award: 'Won Best Education Hack · one of the top tracks, 1,000+ students', major: true },
  { event: 'HackPrinceton Spring 2026', place: 'Princeton, NJ', project: 'ROM-COM', slug: 'rom-com',
    note: 'Gesture classifier, feature extractor and FMA-UE scoring engine for webcam-only stroke rehab, with a 4-person team.',
    award: 'AI & Tech for Clinical Trials (Regeneron)' },
  { event: 'NASA ORBIT Challenge', place: 'Houston, TX', project: 'OSEHS Digital Twin', slug: 'osehs',
    note: 'A 20-satellite swarm with decentralized consensus. I modeled the swarm communication; we pitched at NASA Johnson Space Center.',
    award: 'Space Track finalist · $15,000 prize' },
  { event: 'HackPrinceton 2025', place: 'Princeton, NJ', project: 'Recall', slug: 'recall',
    note: 'Face recognition memory aid on a Raspberry Pi.', award: 'Best Use of Grok (xAI) · Best Use of Arm (MLH)' },
  { event: 'HackHarvard 2025', place: 'Cambridge, MA', project: 'OffScript', slug: 'offscript',
    note: 'Led a team of three to ship an AI interview simulator in 36 hours.' },
];

const SCHOOL = [
  { title: 'B.S. Computer Science', org: 'New Jersey Institute of Technology', when: 'Expected May 2028',
    note: 'Data Structures, Algorithms, Database Systems, Computer Architecture, Linear Algebra, Discrete Math.' },
  { title: 'Quantum Computing Club', org: 'ACMI', when: 'Jan 2026',
    note: "Qubits, gates, entanglement and query algorithms. Implemented Deutsch's and Deutsch-Jozsa in Qiskit." },
];

/* ── Page ─────────────────────────────────────────────────── */
const Experience = () => {
  const logRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [path, setPath] = useState({ d: '', w: 0, h: 0 });
  const [len, setLen] = useState(0);
  const [progress, setProgress] = useState(0);
  const [sat, setSat] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<{ p: Project; x: number; y: number } | null>(null);

  // a curving flight path that threads through each role's marker
  useLayoutEffect(() => {
    const build = () => {
      const box = logRef.current; if (!box) return;
      const b = box.getBoundingClientRect();
      const pts = [...box.querySelectorAll<HTMLElement>('[data-node]')].map(n => {
        const r = n.getBoundingClientRect();
        return { x: r.left + r.width / 2 - b.left, y: r.top + r.height / 2 - b.top };
      });
      if (pts.length < 2) return;
      const start = { x: pts[0].x, y: 0 }, end = { x: pts[pts.length - 1].x, y: b.height };
      const all = [start, ...pts, end];
      let d = `M ${all[0].x} ${all[0].y}`;
      for (let i = 1; i < all.length; i++) {
        const p0 = all[i - 1], p1 = all[i], my = (p1.y - p0.y) * 0.55;
        d += ` C ${p0.x} ${p0.y + my}, ${p1.x} ${p1.y - my}, ${p1.x} ${p1.y}`;
      }
      setPath({ d, w: b.width, h: b.height });
    };
    build();
    const ro = new ResizeObserver(build);
    if (logRef.current) ro.observe(logRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => { if (pathRef.current) setLen(pathRef.current.getTotalLength()); }, [path.d]);

  // the path draws itself as you scroll, and a satellite rides its tip
  useEffect(() => {
    const onScroll = () => {
      const el = logRef.current, pe = pathRef.current; if (!el || !pe || !len) return;
      const r = el.getBoundingClientRect(), mid = window.innerHeight * 0.55;
      const p = Math.max(0, Math.min(1, (mid - r.top) / r.height));
      setProgress(p);
      const pt = pe.getPointAtLength(p * len);
      setSat({ x: pt.x, y: pt.y });
      let idx = 0;
      el.querySelectorAll<HTMLElement>('[data-entry]').forEach((it, i) => { if (it.getBoundingClientRect().top < mid) idx = i; });
      setActive(idx);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [len]);

  const launch = (slug: string, e: React.MouseEvent) => {
    const p = projectBySlug(slug); if (p) setOpen({ p, x: e.clientX, y: e.clientY });
  };

  return (
    <div className="log-page">
      <div className="log-stars" aria-hidden />

      <header className="log-head">
        <h1 className="serif-title">Experience</h1>
        <p>Solar physics research, two roles at Apple, and the hackathons in between.</p>
      </header>

      {/* ── Flight log: roles scattered across the page, joined by one path ── */}
      <section className="orbit-log" ref={logRef}>
        <svg className="orbit-path" width={path.w} height={path.h} aria-hidden>
          <path d={path.d} className="orbit-path-bg" />
          <path ref={pathRef} d={path.d} className="orbit-path-fg"
            style={{ strokeDasharray: len, strokeDashoffset: len * (1 - progress) }} />
          {len > 0 && <circle cx={sat.x} cy={sat.y} r="4.5" className="orbit-sat" />}
        </svg>

        {LOG.map((e, i) => (
          <article key={e.title} data-entry className={`orbit-entry pos-${i % 3}${i === active ? ' on' : ''}`}>
            <span className="orbit-year" aria-hidden>{e.year}</span>
            <span className="orbit-node" data-node />
            <Reveal>
              <p className="log-meta">{String(i + 1).padStart(2, '0')} · {e.period}</p>
              <h2 className="log-title">{e.title}</h2>
              <p className="orbit-org">{e.org}</p>
              <p className="log-summary">{e.summary}</p>
              {e.numbers && (
                <div className="log-numbers">
                  {e.numbers.map(n => <div key={n.label}><b>{n.val}</b><span>{n.label}</span></div>)}
                </div>
              )}
              <ul className="log-notes">{e.notes.map(n => <li key={n}>{n}</li>)}</ul>
              {e.stack && <p className="log-stack">{e.stack}</p>}
            </Reveal>
          </article>
        ))}
      </section>

      {/* ── Hackathons: a staggered field ── */}
      <section className="log-section">
        <Reveal><h2 className="section-title">Hackathons</h2></Reveal>
        {LAUNCHES.filter(l => l.major).map(l => (
          <Reveal key={l.event}>
            <button className="launch major" onClick={e => launch(l.slug, e)}>
              <span className="launch-num">Winner · {l.place}</span>
              <span className="launch-event">{l.event}</span>
              <span className="launch-award">{l.award}</span>
              <span className="launch-note"><b>{l.project}.</b> {l.note}</span>
              <span className="launch-open">[ Open project ]</span>
            </button>
          </Reveal>
        ))}
        <div className="launch-field">
          {LAUNCHES.filter(l => !l.major).map((l, i) => (
            <Reveal key={l.event} delay={(i % 2) * 120}>
              <button className="launch" onClick={e => launch(l.slug, e)}>
                <span className="launch-num">{String(i + 1).padStart(2, '0')} · {l.place}</span>
                <span className="launch-event">{l.event}</span>
                {l.award && <span className="launch-award">{l.award}</span>}
                <span className="launch-note"><b>{l.project}.</b> {l.note}</span>
                <span className="launch-open">[ Open project ]</span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── School ── */}
      <section className="log-section" style={{ paddingBottom: 120 }}>
        <Reveal><h2 className="section-title">School</h2></Reveal>
        <div className="log-school">
          {SCHOOL.map(s => (
            <Reveal key={s.title}>
              <div>
                <p className="log-meta">{s.when} · {s.org}</p>
                <h3 className="log-title" style={{ fontSize: 'clamp(1.6rem,3vw,2.1rem)' }}>{s.title}</h3>
                <p className="log-summary" style={{ fontSize: 15 }}>{s.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {open && (
        <ProjectReveal
          project={open.p}
          origin={{ x: open.x, y: open.y }}
          onClose={() => setOpen(null)}
          onNext={p => setOpen(o => (o ? { ...o, p } : o))}
        />
      )}
    </div>
  );
};

export default Experience;
