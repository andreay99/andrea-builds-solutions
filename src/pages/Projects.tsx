import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Github, ExternalLink, ArrowRight, Star } from 'lucide-react';

const ACCENT = '#00C9D8';

/* ── Cinematic gradient scenes — hero deck ─────────────────── */
const HERO_SCENES: Record<string, { bg: string; glow: string; accent: string; starColor: [number,number,number] }> = {
  recall: {
    bg: `radial-gradient(ellipse 60% 55% at 72% 28%, rgba(210,30,55,0.28) 0%, transparent 70%),
         radial-gradient(ellipse 40% 35% at 22% 65%, rgba(140,10,30,0.18) 0%, transparent 60%),
         linear-gradient(160deg, #060001 0%, #0e0003 60%, #040001 100%)`,
    glow: 'rgba(210,30,55,0.38)', accent: '#d81e37', starColor: [255,120,120],
  },
  offscript: {
    bg: `radial-gradient(ellipse 55% 50% at 68% 32%, rgba(60,40,220,0.26) 0%, transparent 70%),
         radial-gradient(ellipse 35% 30% at 25% 70%, rgba(0,60,200,0.14) 0%, transparent 60%),
         linear-gradient(150deg, #010008 0%, #030014 60%, #010008 100%)`,
    glow: 'rgba(60,40,220,0.40)', accent: '#4428e0', starColor: [120,140,255],
  },
  'rom-com': {
    bg: `radial-gradient(ellipse 60% 55% at 70% 30%, rgba(0,200,90,0.22) 0%, transparent 70%),
         radial-gradient(ellipse 40% 35% at 20% 68%, rgba(0,130,55,0.14) 0%, transparent 60%),
         linear-gradient(158deg, #000601 0%, #000e03 60%, #000501 100%)`,
    glow: 'rgba(0,200,90,0.35)', accent: '#00c060', starColor: [100,255,150],
  },
  osehs: {
    bg: `radial-gradient(ellipse 55% 50% at 74% 26%, rgba(255,160,0,0.30) 0%, rgba(220,80,0,0.15) 45%, transparent 70%),
         radial-gradient(ellipse 30% 28% at 20% 72%, rgba(180,60,0,0.12) 0%, transparent 55%),
         linear-gradient(155deg, #070300 0%, #110600 60%, #060200 100%)`,
    glow: 'rgba(255,150,0,0.42)', accent: '#ff9900', starColor: [255,200,100],
  },
  sona: {
    bg: `radial-gradient(ellipse 58% 52% at 68% 30%, rgba(160,0,240,0.26) 0%, transparent 70%),
         radial-gradient(ellipse 38% 32% at 24% 68%, rgba(100,0,180,0.14) 0%, transparent 60%),
         linear-gradient(148deg, #040010 0%, #080018 60%, #030010 100%)`,
    glow: 'rgba(160,0,240,0.40)', accent: '#a000f0', starColor: [200,100,255],
  },
  bikeshare: {
    bg: `radial-gradient(ellipse 56% 50% at 66% 30%, rgba(0,100,230,0.22) 0%, transparent 68%),
         radial-gradient(ellipse 36% 30% at 22% 70%, rgba(0,70,180,0.12) 0%, transparent 58%),
         linear-gradient(152deg, #000508 0%, #000c14 60%, #000508 100%)`,
    glow: 'rgba(0,110,230,0.36)', accent: '#0070e0', starColor: [100,170,255],
  },
};

/* ── CSS gradient scenes — used in the project grid ────────── */
const GRID_SCENES: Record<string, { bg: string; glow: string; tint: [number,number,number]; accent: string }> = {
  recall: {
    bg: `radial-gradient(ellipse at 30% 38%, rgba(230,15,60,0.6) 0%, rgba(180,0,40,0.35) 22%, transparent 52%),
         radial-gradient(ellipse at 72% 22%, rgba(255,80,20,0.28) 0%, transparent 36%),
         radial-gradient(ellipse at 54% 70%, rgba(160,0,35,0.42) 0%, transparent 48%),
         linear-gradient(155deg, #0e0001 0%, #1a0004 55%, #0a0002 100%)`,
    glow: 'rgba(230,15,60,0.55)', tint: [255,90,80], accent: '#e01040',
  },
  offscript: {
    bg: `radial-gradient(ellipse at 50% 45%, rgba(70,40,255,0.38) 0%, transparent 60%),
         radial-gradient(ellipse at 24% 28%, rgba(0,90,255,0.30) 0%, transparent 42%),
         radial-gradient(ellipse at 76% 68%, rgba(100,0,220,0.28) 0%, transparent 44%),
         linear-gradient(145deg, #010014 0%, #060022 55%, #010012 100%)`,
    glow: 'rgba(80,60,255,0.48)', tint: [90,120,255], accent: '#5540ff',
  },
  'rom-com': {
    bg: `radial-gradient(ellipse at 40% 35%, rgba(0,255,110,0.38) 0%, rgba(0,200,80,0.22) 20%, transparent 52%),
         radial-gradient(ellipse at 76% 20%, rgba(0,230,160,0.26) 0%, transparent 32%),
         radial-gradient(ellipse at 55% 72%, rgba(0,140,60,0.38) 0%, transparent 48%),
         linear-gradient(158deg, #000a01 0%, #001604 55%, #000901 100%)`,
    glow: 'rgba(0,240,100,0.38)', tint: [100,255,150], accent: '#00d060',
  },
  osehs: {
    bg: `radial-gradient(ellipse at 68% 40%, rgba(255,180,0,0.55) 0%, rgba(255,120,0,0.35) 25%, transparent 55%),
         radial-gradient(ellipse at 30% 22%, rgba(255,140,0,0.25) 0%, transparent 38%),
         radial-gradient(ellipse at 52% 68%, rgba(220,80,0,0.35) 0%, transparent 48%),
         linear-gradient(155deg, #0f0600 0%, #1a0c00 55%, #0c0500 100%)`,
    glow: 'rgba(255,160,0,0.55)', tint: [255,200,80], accent: '#ffaa00',
  },
  sona: {
    bg: `radial-gradient(ellipse at 52% 42%, rgba(180,0,255,0.42) 0%, rgba(140,0,220,0.28) 25%, transparent 55%),
         radial-gradient(ellipse at 22% 25%, rgba(200,0,180,0.28) 0%, transparent 38%),
         radial-gradient(ellipse at 78% 72%, rgba(120,0,200,0.30) 0%, transparent 46%),
         linear-gradient(148deg, #0a0012 0%, #120018 55%, #080010 100%)`,
    glow: 'rgba(180,0,255,0.50)', tint: [200,80,255], accent: '#b820e0',
  },
  bikeshare: {
    bg: `radial-gradient(ellipse at 55% 45%, rgba(0,120,255,0.30) 0%, transparent 55%),
         radial-gradient(ellipse at 22% 30%, rgba(0,160,220,0.22) 0%, transparent 40%),
         radial-gradient(ellipse at 75% 65%, rgba(0,90,200,0.25) 0%, transparent 44%),
         linear-gradient(150deg, #000810 0%, #001020 55%, #000610 100%)`,
    glow: 'rgba(0,140,255,0.38)', tint: [80,180,255], accent: '#0090ff',
  },
};

/* ── Unique SVG overlay per grid card ──────────────────────── */
const SceneOverlay = ({ id }: { id: string }) => {
  if (id === 'recall') return (
    <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', overflow:'visible' }} viewBox="0 0 400 280">
      <defs>
        <radialGradient id="bs1"><stop offset="0%" stopColor="#fff"/><stop offset="60%" stopColor="#ffaa50" stopOpacity="0.4"/><stop offset="100%" stopColor="transparent" stopOpacity="0"/></radialGradient>
        <radialGradient id="bs2"><stop offset="0%" stopColor="#fff" stopOpacity="0.9"/><stop offset="60%" stopColor="#ff6080" stopOpacity="0.35"/><stop offset="100%" stopColor="transparent" stopOpacity="0"/></radialGradient>
      </defs>
      <circle cx="255" cy="72" r="28" fill="url(#bs1)"/>
      <circle cx="255" cy="72" r="4" fill="#fff"/>
      <circle cx="272" cy="65" r="18" fill="url(#bs2)"/>
      <circle cx="272" cy="65" r="2.5" fill="rgba(255,220,200,0.95)"/>
      <ellipse cx="263" cy="69" rx="22" ry="6" fill="none" stroke="rgba(255,100,50,0.2)" strokeWidth="4"/>
    </svg>
  );
  if (id === 'offscript') return (
    <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }} viewBox="0 0 400 280">
      <defs><radialGradient id="wh"><stop offset="0%" stopColor="#8090ff" stopOpacity="0.9"/><stop offset="100%" stopColor="transparent" stopOpacity="0"/></radialGradient></defs>
      <ellipse cx="300" cy="80" rx="76" ry="68" fill="none" stroke="rgba(80,100,255,0.18)" strokeWidth="1.5"/>
      <ellipse cx="300" cy="80" rx="56" ry="50" fill="none" stroke="rgba(100,130,255,0.28)" strokeWidth="1.5"/>
      <ellipse cx="300" cy="80" rx="38" ry="34" fill="none" stroke="rgba(140,170,255,0.38)" strokeWidth="2"/>
      <ellipse cx="300" cy="80" rx="22" ry="20" fill="none" stroke="rgba(180,210,255,0.55)" strokeWidth="2"/>
      <ellipse cx="300" cy="80" rx="9"  ry="8"  fill="none" stroke="rgba(220,240,255,0.8)"  strokeWidth="2.5"/>
      <circle  cx="300" cy="80" r="4" fill="url(#wh)"/>
      <circle  cx="300" cy="80" r="2" fill="#c8d8ff"/>
    </svg>
  );
  if (id === 'rom-com') return (
    <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }} viewBox="0 0 400 280" preserveAspectRatio="none">
      <path d="M-20 100 Q 80 55, 200 80 Q 310 105, 440 60"  fill="none" stroke="rgba(0,220,100,0.22)" strokeWidth="22"/>
      <path d="M-20 130 Q 100 80, 220 110 Q 340 140, 440 90" fill="none" stroke="rgba(0,200,80,0.15)"  strokeWidth="32"/>
      <path d="M-20 75  Q 120 40, 250 65 Q 360 90, 440 45"   fill="none" stroke="rgba(0,240,130,0.12)" strokeWidth="14"/>
    </svg>
  );
  if (id === 'osehs') return (
    <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', overflow:'visible' }} viewBox="0 0 400 280">
      <defs><radialGradient id="sun"><stop offset="0%" stopColor="#fff"/><stop offset="30%" stopColor="#ffe060" stopOpacity="0.8"/><stop offset="70%" stopColor="#ff8000" stopOpacity="0.3"/><stop offset="100%" stopColor="transparent" stopOpacity="0"/></radialGradient></defs>
      <circle cx="320" cy="75" r="80" fill="url(#sun)"/>
      <circle cx="320" cy="75" r="18" fill="#fffbe0"/>
      <path d="M 320 57 Q 370 20, 360 -5"  fill="none" stroke="rgba(255,200,50,0.5)" strokeWidth="3" strokeLinecap="round"/>
      <path d="M 336 62 Q 395 55, 405 30"   fill="none" stroke="rgba(255,180,30,0.4)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M 330 90 Q 390 120, 380 150" fill="none" stroke="rgba(255,160,20,0.35)" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M 305 60 Q 260 10, 280 -20"  fill="none" stroke="rgba(255,220,80,0.35)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
  if (id === 'sona') return (
    <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }} viewBox="0 0 400 280">
      <defs><radialGradient id="sc"><stop offset="0%" stopColor="#cc40ff" stopOpacity="0.85"/><stop offset="100%" stopColor="transparent" stopOpacity="0"/></radialGradient></defs>
      <circle cx="290" cy="78" r="70" fill="none" stroke="rgba(180,0,255,0.15)" strokeWidth="1.5"/>
      <circle cx="290" cy="78" r="52" fill="none" stroke="rgba(200,0,255,0.22)" strokeWidth="1.5"/>
      <circle cx="290" cy="78" r="36" fill="none" stroke="rgba(220,40,255,0.32)" strokeWidth="2"/>
      <circle cx="290" cy="78" r="22" fill="none" stroke="rgba(240,80,255,0.45)" strokeWidth="2"/>
      <circle cx="290" cy="78" r="10" fill="none" stroke="rgba(255,140,255,0.65)" strokeWidth="2.5"/>
      <circle cx="290" cy="78" r="4"  fill="url(#sc)"/>
      <circle cx="290" cy="78" r="2"  fill="#f0b0ff"/>
    </svg>
  );
  if (id === 'bikeshare') return (
    <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }} viewBox="0 0 400 280" preserveAspectRatio="none">
      <defs>
        <linearGradient id="gp" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="rgba(0,100,200,0)"/>
          <stop offset="35%"  stopColor="rgba(20,140,255,0.18)"/>
          <stop offset="50%"  stopColor="rgba(60,180,255,0.28)"/>
          <stop offset="65%"  stopColor="rgba(20,140,255,0.18)"/>
          <stop offset="100%" stopColor="rgba(0,100,200,0)"/>
        </linearGradient>
        <radialGradient id="gc"><stop offset="0%" stopColor="#90d0ff" stopOpacity="0.7"/><stop offset="100%" stopColor="transparent" stopOpacity="0"/></radialGradient>
      </defs>
      <rect x="-20" y="-20" width="440" height="320" fill="url(#gp)" transform="rotate(-18, 200, 140)"/>
      <ellipse cx="265" cy="85" rx="40" ry="22" fill="url(#gc)"/>
    </svg>
  );
  return null;
};

/* ── Deterministic star field ──────────────────────────────── */
const buildStars = (seed: number, count: number) => {
  const rng = (n: number) => { let x = Math.sin(seed * 9301 + n * 49297 + 233) * 93280; return x - Math.floor(x); };
  return Array.from({ length: count }, (_, i) => ({
    cx: rng(i*3)*100, cy: rng(i*3+1)*100,
    r: rng(i*3+2)*1.5+0.2, o: rng(i*3+2)*0.6+0.25, tinted: rng(i*3+1)>0.45,
  }));
};
const StarField = ({ seed, count=120, tint }: { seed:number; count?:number; tint:[number,number,number] }) => {
  const stars = useMemo(() => buildStars(seed, count), [seed, count]);
  const [r,g,b] = tint;
  return (
    <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }} aria-hidden>
      {stars.map((s,i) => (
        <circle key={i} cx={`${s.cx}%`} cy={`${s.cy}%`} r={s.r}
          fill={s.tinted ? `rgba(${r},${g},${b},${(s.o*0.6).toFixed(2)})` : `rgba(255,255,255,${s.o.toFixed(2)})`}/>
      ))}
    </svg>
  );
};

/* ── Data ──────────────────────────────────────────────────── */
const PROJECTS = [
  { id:'recall',    title:'Recall',                  description:'Assistive memory system with real-time facial recognition. Identifies people and surfaces context through voice.',                                    techStack:['Python','OpenCV','MongoDB','ElevenLabs','Grok'],    awards:['Best Use of Grok (xAI)','Best Use of Arm (MLH)'], githubLink:'https://github.com/andreay99/recall',            liveLink:'https://devpost.com/software/recall-cf0dp9',  link:'/projects/recall',    categories:['ai-ml'] },
  { id:'offscript', title:'OffScript',               description:'Real-time AI-powered interview simulator with dynamic question generation, live evaluation, and session reports.',                                    techStack:['Next.js','FastAPI','Gemini AI','TypeScript'],        awards:['HackHarvard 2025'],                               githubLink:'https://github.com/andreay99/offscript',         liveLink:'https://offscript.codestacx.com',     link:'/projects/offscript', categories:['ai-ml','full-stack'] },
  { id:'rom-com',   title:'ROM-COM',                 description:'Webcam-only stroke & TBI rehabilitation with adaptive ROM calibration and automated FMA-UE clinical scoring.',                                       techStack:['React','TypeScript','FastAPI','MediaPipe','Python'], awards:['HackPrinceton SP2026'],                           githubLink:'https://github.com/tomiwaaluko/ROM-com',                                                          link:'/projects/rom-com',   categories:['ai-ml','full-stack'] },
  { id:'osehs',     title:'OSEHS Digital Twin',      description:'NASA ORBIT Challenge Phase 2 — real-time 3D orbital swarm simulation with KPP tracking and formation control.',                                     techStack:['Python','NumPy','Matplotlib','Orbital Mechanics'],   awards:['NASA ORBIT Challenge Phase 2'],                   githubLink:'https://github.com/andreay99/OSEHS-simulation',                                                   link:'/projects/osehs',     categories:['ai-ml'] },
  { id:'sona',      title:'SONA AI',                 description:'Real-time emotion detection from voice via CNN trained on RAVDESS, with agentic cross-validation across 8 emotion classes.',                        techStack:['Python','TensorFlow','Librosa','FastAPI'],           awards:[],                                                 githubLink:'https://github.com/andreay99/sona-ai',                                                            link:'/projects/sona-ai',   categories:['ai-ml'] },
  { id:'bikeshare', title:'Bikeshare Trip Analysis', description:'End-to-end SQL analytics pipeline across 50K+ real trips. 12+ operational insights via automated Matplotlib dashboards.',                            techStack:['SQL','SQLite','Python','Matplotlib'],                awards:[],                                                 githubLink:'https://github.com/andreay99/bikeshare-analysis',                                                 link:'/projects/bikeshare', categories:['full-stack','cloud'] },
];

const FILTER_TAGS = ['all','AI/ML','Full Stack','Data','Awards'];
interface Project { id:string; title:string; description:string; techStack:string[]; awards:string[]; githubLink:string; liveLink?:string; link:string; categories:string[]; }

/* ── Grid card (CSS gradient + SVG scene) ──────────────────── */
const PCard = ({ project, seed, onClick }: { project:Project; seed:number; onClick?:()=>void }) => {
  const [hov, setHov] = useState(false);
  const scene = GRID_SCENES[project.id] ?? GRID_SCENES['recall'];
  return (
    <div onClick={onClick} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        position:'relative', height:285, borderRadius:16, overflow:'hidden',
        cursor:onClick?'pointer':'default', background:scene.bg,
        border:`1px solid ${hov?scene.accent+'55':'rgba(255,255,255,0.06)'}`,
        transform:hov?'translateY(-5px) scale(1.01)':'none',
        boxShadow:hov?`0 28px 64px rgba(0,0,0,0.75),0 0 0 1px ${scene.accent}30`:'0 6px 24px rgba(0,0,0,0.55)',
        transition:'all 0.35s cubic-bezier(0.22,1,0.36,1)',
      }}>
      <StarField seed={seed} count={130} tint={scene.tint}/>
      <SceneOverlay id={project.id}/>
      <div style={{ position:'absolute', top:'10%', left:'42%', width:300, height:220, borderRadius:'50%',
        background:`radial-gradient(ellipse, ${scene.glow} 0%, transparent 70%)`,
        filter:'blur(50px)', pointerEvents:'none' }}/>
      {hov && <div style={{ position:'absolute', inset:0, borderRadius:16,
        boxShadow:`inset 0 0 50px ${scene.glow.replace(/[\d.]+\)$/,'0.18)')}`, pointerEvents:'none' }}/>}
      {/* Bottom vignette */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'75%',
        background:'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.55) 45%, transparent 100%)',
        pointerEvents:'none' }}/>
      {/* Content */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'14px 18px 18px', zIndex:2 }}>
        {project.awards.length > 0 && (
          <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:8 }}>
            {project.awards.map(a=>(
              <span key={a} style={{ display:'inline-flex', alignItems:'center', gap:4, padding:'3px 9px',
                borderRadius:40, fontSize:10.5, fontWeight:700, background:'rgba(255,210,50,0.1)',
                color:'#ffd232', border:'1px solid rgba(255,210,50,0.25)' }}>
                <Star size={9} fill="#ffd232"/>{a}
              </span>
            ))}
          </div>
        )}
        <h3 style={{ fontFamily:'Space Grotesk,sans-serif', fontWeight:700, fontSize:'1.05rem',
          color:'#f0f0f5', marginBottom:6, lineHeight:1.15 }}>{project.title}</h3>
        <p style={{ fontSize:12.5, color:'rgba(255,255,255,0.5)', lineHeight:1.6, marginBottom:12,
          display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
          {project.description}
        </p>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:8 }}>
          <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
            {project.techStack.slice(0,3).map(t=>(
              <span key={t} style={{ padding:'2px 8px', borderRadius:40, fontSize:10.5, fontWeight:500,
                background:`${scene.accent}16`, color:scene.accent, border:`1px solid ${scene.accent}28` }}>{t}</span>
            ))}
          </div>
          <div style={{ display:'flex', gap:10, flexShrink:0 }}>
            {project.githubLink && <a href={project.githubLink} target="_blank" rel="noopener" onClick={e=>e.stopPropagation()} style={{ color:'rgba(255,255,255,0.5)' }}><Github size={15}/></a>}
            {project.liveLink  && <a href={project.liveLink}  target="_blank" rel="noopener" onClick={e=>e.stopPropagation()} style={{ color:'rgba(255,255,255,0.5)' }}><ExternalLink size={13}/></a>}
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:4, marginTop:10,
          opacity:hov?1:0, transform:hov?'translateY(0)':'translateY(4px)',
          transition:'opacity 0.25s,transform 0.25s',
          fontSize:11.5, color:scene.accent, fontWeight:600 }}>
          Explore project <ArrowRight size={11}/>
        </div>
      </div>
    </div>
  );
};

/* ── Main page ─────────────────────────────────────────────── */
const Projects = () => {
  const [phase, setPhase] = useState(0);
  const [hero, setHero] = useState(0);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const t1 = setTimeout(()=>setPhase(1), 80);
    const t2 = setTimeout(()=>setPhase(2), 1100);
    const t3 = setTimeout(()=>setPhase(3), 2100);
    return () => [t1,t2,t3].forEach(clearTimeout);
  }, []);

  const filtered = PROJECTS.filter(p => {
    if (filter==='all')        return true;
    if (filter==='Awards')     return p.awards.length > 0;
    if (filter==='AI/ML')      return p.techStack.some(t=>['Python','TensorFlow','FastAPI','Gemini AI','OpenCV','MediaPipe','NumPy','Grok'].includes(t));
    if (filter==='Full Stack') return p.techStack.some(t=>['Next.js','TypeScript','Flask','React'].includes(t));
    if (filter==='Data')       return p.techStack.some(t=>['SQL','SQLite','NumPy','Matplotlib'].includes(t));
    return true;
  });

  const heroProject = PROJECTS[hero];
  const heroScene   = HERO_SCENES[heroProject.id];

  // ── Deck config for all 6 cards ──
  // Index 0 = front (smallest, highest), index 5 = back (widest, lowest)
  const CARD_W  = ['min(54vw,580px)','min(59vw,635px)','min(64vw,688px)','min(69vw,738px)','min(73vw,782px)','min(77vw,822px)'];
  const CARD_H  = [326, 338, 350, 360, 368, 374];
  const STACK_Y = [-20, 12, 40, 64, 84, 100];
  const STACK_O = [1, 0.82, 0.62, 0.44, 0.28, 0.15];
  const STAGGER = [0.30, 0.22, 0.15, 0.09, 0.04, 0]; // back card enters first

  return (
    <div style={{ background:'#08090e', minHeight:'100vh', position:'relative', zIndex:1 }}>

      {/* ── Hero / deck ──────────────────────────────────── */}
      <div style={{
        position:'relative', width:'100%',
        height:phase>=3?'auto':'100vh', minHeight:phase>=3?520:'100vh',
        background:'#08090e', overflow:'hidden',
        display:'flex', alignItems:'center', justifyContent:'center',
        perspective:'1200px',
      }}>

        {/* ── Stacked deck (phases 0–2) ── */}
        {phase < 3 && PROJECTS.map((p, i) => {
          const isFront     = i === 0;
          const isExpanding = phase >= 2 && isFront;
          const scene       = HERO_SCENES[p.id];

          let transform = 'translateY(800px)';
          if (phase === 1)     transform = `translateY(${STACK_Y[i]}px)`;
          else if (phase >= 2) transform = isFront ? 'translateY(0px)' : `translateY(${STACK_Y[i]+80}px)`;

          return (
            <div key={p.id} style={{
              position:'absolute', inset:0, margin:'auto',
              width:  isExpanding ? '100%' : CARD_W[i],
              height: isExpanding ? '100%' : CARD_H[i],
              maxWidth: isExpanding ? 'none' : undefined,
              borderRadius: isExpanding ? 0 : 18,
              background: scene.bg,
              transform,
              opacity: phase===0 ? 0 : phase>=2 && !isFront ? 0 : STACK_O[i],
              zIndex: 6 - i,
              transition:`all ${isExpanding?'1s':'0.85s'} cubic-bezier(0.22,1,0.36,1)`,
              transitionDelay: phase===1 ? `${STAGGER[i]}s` : '0s',
              overflow:'hidden',
              boxShadow: isFront
                ? '0 32px 80px rgba(0,0,0,0.9),0 0 0 1px rgba(255,255,255,0.06)'
                : '0 16px 48px rgba(0,0,0,0.75)',
            }}>
              {/* Star field */}
              <StarField seed={i+1} count={isFront?180:110} tint={scene.starColor}/>
              {/* nebula bloom */}
              <div style={{ position:'absolute', top:'12%', right:'18%', width:260, height:200,
                borderRadius:'50%', background:`radial-gradient(ellipse, ${scene.glow} 0%, transparent 70%)`,
                filter:'blur(50px)', pointerEvents:'none' }}/>
              {/* single hot star */}
              <div style={{ position:'absolute', top:'20%', right:'26%', width:isFront?5:3, height:isFront?5:3,
                borderRadius:'50%', background:'#fff',
                boxShadow:`0 0 8px 4px ${scene.glow},0 0 22px 10px ${scene.glow}`,
                pointerEvents:'none' }}/>
              {/* bottom vignette */}
              <div style={{ position:'absolute', bottom:0, left:0, right:0, height:120,
                background:'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
                pointerEvents:'none' }}/>
              {/* label on non-expanding cards */}
              {!isExpanding && (
                <div style={{ position:'absolute', bottom:22, left:24, zIndex:2 }}>
                  <p style={{ fontSize:10, color:scene.accent, letterSpacing:'0.12em',
                    textTransform:'uppercase', marginBottom:3, fontWeight:600 }}>
                    {p.techStack[0]}
                  </p>
                  <p style={{ fontFamily:'Space Grotesk,sans-serif',
                    fontSize:isFront?'1.4rem':'1.05rem', fontWeight:700,
                    color:'#f0f0f5', opacity:isFront?1:0.7 }}>{p.title}</p>
                </div>
              )}
            </div>
          );
        })}

        {/* ── Full hero banner (phase 3) ── */}
        {phase >= 3 && (
          <div style={{ position:'relative', width:'100%', height:520, overflow:'hidden',
            background: heroScene.bg, animation:'fadeUp 0.5s ease both' }}>
            {/* star field */}
            <StarField seed={hero+1} count={220} tint={heroScene.starColor}/>
            {/* nebula bloom */}
            <div style={{ position:'absolute', top:'6%', right:'14%', width:440, height:340,
              borderRadius:'50%', background:`radial-gradient(ellipse, ${heroScene.glow} 0%, transparent 70%)`,
              filter:'blur(65px)', pointerEvents:'none' }}/>
            {/* secondary soft lobe */}
            <div style={{ position:'absolute', top:'45%', left:'8%', width:280, height:220,
              borderRadius:'50%', background:`radial-gradient(ellipse, ${heroScene.glow.replace(/[\d.]+\)$/,'0.15)')} 0%, transparent 70%)`,
              filter:'blur(50px)', pointerEvents:'none' }}/>
            {/* single bright star */}
            <div style={{ position:'absolute', top:'18%', right:'22%', width:5, height:5,
              borderRadius:'50%', background:'#fff',
              boxShadow:`0 0 10px 5px ${heroScene.glow},0 0 32px 14px ${heroScene.glow}`,
              pointerEvents:'none' }}/>
            <div style={{ position:'absolute', inset:0,
              background:'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)' }}/>

            {/* Content */}
            <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'0 40px 40px', zIndex:2 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end',
                maxWidth:1100, margin:'0 auto', flexWrap:'wrap', gap:20 }}>
                <div style={{ maxWidth:580 }}>
                  {heroProject.awards.length > 0 && (
                    <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:14 }}>
                      {heroProject.awards.map(a=>(
                        <span key={a} style={{ display:'inline-flex', alignItems:'center', gap:5,
                          padding:'4px 10px', borderRadius:40, fontSize:11, fontWeight:600,
                          background:'rgba(255,210,50,0.12)', color:'#ffd232',
                          border:'1px solid rgba(255,210,50,0.28)' }}>
                          <Star size={10} fill="#ffd232"/>{a}
                        </span>
                      ))}
                    </div>
                  )}
                  <h2 style={{ fontFamily:'Space Grotesk,sans-serif', fontSize:'clamp(2rem,5vw,3.5rem)',
                    marginBottom:10, lineHeight:1, color:'#f0f0f5' }}>{heroProject.title}</h2>
                  <p style={{ fontSize:14, color:'rgba(255,255,255,0.58)', lineHeight:1.65, marginBottom:22 }}>
                    {heroProject.description}
                  </p>
                  <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                    <button onClick={()=>navigate(heroProject.link)} style={{ display:'inline-flex',
                      alignItems:'center', gap:8, padding:'12px 24px', borderRadius:40,
                      background:heroScene.accent, color:'#fff', fontWeight:600, fontSize:14,
                      fontFamily:'Space Grotesk,sans-serif', border:'none', cursor:'pointer' }}>
                      View Details <ArrowRight size={16}/>
                    </button>
                    <a href={heroProject.githubLink} target="_blank" rel="noopener"
                      style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'12px 24px',
                        borderRadius:40, background:'rgba(255,255,255,0.08)', color:'#f0f0f5',
                        fontWeight:500, fontSize:14, fontFamily:'Space Grotesk,sans-serif',
                        border:'1px solid rgba(255,255,255,0.1)', textDecoration:'none' }}>
                      <Github size={18}/> GitHub
                    </a>
                  </div>
                </div>

                {/* Thumbnail switcher — all 6 */}
                <div style={{ display:'flex', gap:8, alignItems:'center', flexWrap:'wrap', maxWidth:360 }}>
                  {PROJECTS.map((p,i)=>{
                    const s = HERO_SCENES[p.id];
                    return (
                      <div key={p.id} onClick={()=>setHero(i)} style={{
                        width:80, height:52, borderRadius:10, cursor:'pointer', flexShrink:0,
                        background: s.bg,
                        border:`2px solid ${hero===i?s.accent:'rgba(255,255,255,0.08)'}`,
                        opacity:hero===i?1:0.5,
                        transform:hero===i?'scale(1.1)':'scale(1)',
                        transition:'all 0.25s ease',
                        position:'relative', overflow:'hidden',
                      }}>
                        {/* tiny bloom */}
                        <div style={{ position:'absolute', top:-10, right:-10, width:50, height:50,
                          borderRadius:'50%', background:`radial-gradient(ellipse, ${s.glow} 0%, transparent 70%)`,
                          filter:'blur(12px)', pointerEvents:'none' }}/>
                        <span style={{ position:'absolute', bottom:4, left:5, fontSize:8,
                          fontFamily:'Space Grotesk,sans-serif', fontWeight:700,
                          color:'rgba(255,255,255,0.9)', zIndex:1, lineHeight:1.2 }}>
                          {p.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Project grid ──────────────────────────────────── */}
      <section style={{ padding:'50px 0 100px',
        opacity:phase>=3?1:0, transform:phase>=3?'none':'translateY(20px)',
        transition:'opacity 0.6s ease,transform 0.6s ease', transitionDelay:'0.4s' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 32px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
            marginBottom:28, flexWrap:'wrap', gap:12 }}>
            <p style={{ fontSize:13, color:'rgba(240,240,245,0.4)' }}>{PROJECTS.length} projects</p>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              {FILTER_TAGS.map(t=>(
                <button key={t} onClick={()=>setFilter(t)} style={{ padding:'5px 14px', borderRadius:40,
                  fontSize:12, cursor:'pointer', fontWeight:500, fontFamily:'Inter,sans-serif',
                  border:`1px solid ${filter===t?ACCENT:'rgba(255,255,255,0.07)'}`,
                  background:filter===t?'rgba(0,201,216,0.12)':'transparent',
                  color:filter===t?ACCENT:'rgba(240,240,245,0.45)', transition:'all 0.2s' }}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:18 }}>
            {filtered.map((p,i) => (
              <PCard key={p.id} project={p} seed={i+10} onClick={()=>navigate(p.link)}/>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
