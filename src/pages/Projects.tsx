import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Github, ExternalLink, ArrowRight, Star } from 'lucide-react';

const ACCENT = '#00C9D8';

// Project Hail Mary — cold deep space, nebula bleeds, distant stars
const SPACE_BG = [
  // Tau Ceti system: near-black + pale blue starlight bleed + indigo dust cloud
  `radial-gradient(ellipse at 78% 22%, rgba(160,200,255,0.13) 0%, transparent 28%),
   radial-gradient(ellipse at 18% 68%, rgba(30,60,180,0.18) 0%, transparent 50%),
   radial-gradient(ellipse at 50% 50%, rgba(10,20,80,0.25) 0%, transparent 70%),
   linear-gradient(160deg, #00030d 0%, #010820 55%, #020c2a 100%)`,
  // Nebula corridor: violet + ember dust, like a stellar nursery seen from afar
  `radial-gradient(ellipse at 65% 28%, rgba(110,25,170,0.22) 0%, transparent 38%),
   radial-gradient(ellipse at 28% 72%, rgba(180,60,20,0.12) 0%, transparent 45%),
   radial-gradient(ellipse at 50% 50%, rgba(40,10,70,0.3) 0%, transparent 65%),
   linear-gradient(145deg, #060008 0%, #0e0318 55%, #130422 100%)`,
  // Cold void + distant gas giant glow: teal-blue aurora on the horizon
  `radial-gradient(ellipse at 55% 82%, rgba(0,120,100,0.18) 0%, transparent 40%),
   radial-gradient(ellipse at 80% 18%, rgba(20,80,180,0.15) 0%, transparent 38%),
   radial-gradient(ellipse at 25% 45%, rgba(0,50,80,0.2) 0%, transparent 55%),
   linear-gradient(155deg, #000a09 0%, #010e12 55%, #021520 100%)`,
];

// Star glows per card: color of the "primary star" in that scene
const STAR_GLOW = [
  'rgba(160,200,255,0.22)',   // pale blue-white — Tau Ceti
  'rgba(200,120,255,0.18)',   // violet — nebula core
  'rgba(80,220,200,0.18)',    // teal — gas giant aurora
];

// Deterministic star field — seeded per card so stars don't shift on re-render
const buildStars = (seed: number, count: number) => {
  const rng = (n: number) => { let x = Math.sin(seed * 9301 + n * 49297 + 233) * 93280; return x - Math.floor(x); };
  return Array.from({ length: count }, (_, i) => ({
    cx: rng(i * 3)     * 100,
    cy: rng(i * 3 + 1) * 100,
    r:  rng(i * 3 + 2) * 1.4 + 0.3,
    o:  rng(i * 3 + 2) * 0.55 + 0.25,
  }));
};

const StarField = ({ seed, count = 110 }: { seed: number; count?: number }) => {
  const stars = useMemo(() => buildStars(seed, count), [seed, count]);
  return (
    <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }} aria-hidden>
      {stars.map((s, i) => <circle key={i} cx={`${s.cx}%`} cy={`${s.cy}%`} r={s.r} fill={`rgba(255,255,255,${s.o.toFixed(2)})`}/>)}
    </svg>
  );
};

const PROJECTS = [
  { id:'recall', title:'Recall', description:'Assistive memory system with facial recognition using OpenCV and MongoDB. Helps users remember people through real-time face detection and recognition.', techStack:['Flask','MongoDB','OpenCV','ElevenLabs TTS','Python'], awards:['Best Use of Grok (xAI)','Best Use of Arm (MLH)'], githubLink:'https://github.com/andreay99/recall', liveLink:'https://recall-app.vercel.app', link:'/projects/recall', categories:['ai-ml'] },
  { id:'offscript', title:'OffScript', description:'Real-time AI-powered technical interview simulator with dynamic feedback and comprehensive question generation.', techStack:['Next.js','TypeScript','FastAPI','Gemini AI'], awards:['HackHarvard 2025'], githubLink:'https://github.com/andreay99/offscript', liveLink:'https://offscript.codestacx.com', link:'/projects/offscript', categories:['ai-ml','full-stack'] },
  { id:'rom-com', title:'ROM-COM', description:'Webcam-only stroke & TBI upper-extremity rehabilitation system with adaptive ROM calibration and automated FMA-UE clinical scoring.', techStack:['React','TypeScript','FastAPI','MediaPipe','Python','Arduino'], awards:['HackPrinceton SP2026'], githubLink:'https://github.com/tomiwaaluko/ROM-com', link:'/projects/rom-com', categories:['ai-ml','full-stack'] },
  { id:'osehs', title:'OSEHS Digital Twin', description:'Orbital Solar Energy Harvesting Swarm digital twin for NASA ORBIT Challenge Phase 2. Real-time 3D simulation with swarm coordination and KPP tracking.', techStack:['Python','NumPy','Matplotlib','Orbital Mechanics','Swarm AI'], awards:['NASA ORBIT Challenge Phase 2'], githubLink:'https://github.com/andreay99/OSEHS-simulation', link:'/projects/osehs', categories:['ai-ml'] },
  { id:'sona', title:'SONA AI', description:'Real-time emotion detection from voice using advanced ML techniques and agentic systems for enhanced accuracy.', techStack:['Python','TensorFlow','Librosa','FastAPI'], awards:[], githubLink:'https://github.com/andreay99/sona-ai', link:'/projects/sona-ai', categories:['ai-ml'] },
  { id:'bikeshare', title:'Bikeshare Trip Analysis', description:'Comprehensive SQL-based analysis system for bikeshare operations, identifying usage patterns across 50K+ trips.', techStack:['SQL','SQLite','Python','Data Analysis'], awards:[], githubLink:'https://github.com/andreay99/bikeshare-analysis', link:'/projects/bikeshare', categories:['full-stack','cloud'] },
];

const tags = ['all','AI/ML','Full Stack','Data','Awards'];

interface Project { id:string; title:string; description:string; techStack:string[]; awards:string[]; githubLink:string; liveLink?:string; link:string; categories:string[]; }

const PCard = ({ project, onClick }: { project: Project; onClick?: () => void }) => (
  <div onClick={onClick} style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, padding:24, display:'flex', flexDirection:'column', gap:12, height:'100%', cursor:onClick?'pointer':'default', transition:'border-color 0.3s,transform 0.3s,box-shadow 0.3s' }}
    onMouseEnter={e=>{const el=e.currentTarget as HTMLDivElement;el.style.borderColor='rgba(255,255,255,0.15)';el.style.transform='translateY(-3px)';el.style.boxShadow='0 16px 48px rgba(0,0,0,0.4)';}}
    onMouseLeave={e=>{const el=e.currentTarget as HTMLDivElement;el.style.borderColor='rgba(255,255,255,0.07)';el.style.transform='';el.style.boxShadow='';}}>
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:12 }}>
      <h3 style={{ fontFamily:'Space Grotesk,sans-serif', fontWeight:600, fontSize:'1rem', color:'#f0f0f5' }}>{project.title}</h3>
      <div style={{ display:'flex', gap:8, flexShrink:0 }}>
        {project.githubLink && <a href={project.githubLink} target="_blank" rel="noopener" onClick={e=>e.stopPropagation()} style={{ color:'rgba(240,240,245,0.45)' }}><Github size={18}/></a>}
        {project.liveLink && <a href={project.liveLink} target="_blank" rel="noopener" onClick={e=>e.stopPropagation()} style={{ color:'rgba(240,240,245,0.45)' }}><ExternalLink size={14}/></a>}
      </div>
    </div>
    <p style={{ fontSize:13.5, color:'rgba(240,240,245,0.45)', lineHeight:1.65, flex:1 }}>{project.description}</p>
    {project.awards.length > 0 && (
      <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
        {project.awards.map(a => <span key={a} style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'4px 10px', borderRadius:40, fontSize:11, fontWeight:600, background:'rgba(255,210,50,0.1)', color:'#ffd232', border:'1px solid rgba(255,210,50,0.25)' }}><Star size={10} fill="#ffd232"/>{a}</span>)}
      </div>
    )}
    <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginTop:'auto' }}>
      {project.techStack.map(t => <span key={t} style={{ display:'inline-flex', padding:'3px 10px', borderRadius:40, fontSize:11, fontWeight:500, background:'rgba(0,201,216,0.1)', color:ACCENT, border:'1px solid rgba(0,201,216,0.2)' }}>{t}</span>)}
    </div>
    {onClick && <div style={{ fontSize:12, color:ACCENT, display:'flex', alignItems:'center', gap:4, marginTop:4, opacity:0.8 }}>View details <ArrowRight size={12}/></div>}
  </div>
);

const Projects = () => {
  const [phase, setPhase] = useState(0);
  const [hero, setHero] = useState(0);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  const featured = PROJECTS.slice(0, 3);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 80);
    const t2 = setTimeout(() => setPhase(2), 1000);
    const t3 = setTimeout(() => setPhase(3), 1900);
    return () => [t1,t2,t3].forEach(clearTimeout);
  }, []);

  const filtered = PROJECTS.filter(p => {
    if (filter==='all') return true;
    if (filter==='Awards') return p.awards.length > 0;
    if (filter==='AI/ML') return p.techStack.some(t=>['Python','TensorFlow','FastAPI','Gemini AI','OpenCV','MediaPipe','NumPy','Swarm AI'].includes(t));
    if (filter==='Full Stack') return p.techStack.some(t=>['Next.js','TypeScript','Flask','React'].includes(t));
    if (filter==='Data') return p.techStack.some(t=>['SQL','SQLite','NumPy','Data Analysis','Matplotlib'].includes(t));
    return true;
  });

  const heroProject = featured[hero];

  // Physical deck: front card narrowest/highest, back card widest/lowest
  const CARD_W  = ['min(58vw,620px)', 'min(65vw,700px)', 'min(72vw,780px)'];
  const CARD_H  = [340, 358, 376];
  const STACK_Y = [-24, 18, 60];   // front above center, back cards below
  const STACK_O = [1, 0.78, 0.52];
  const STAGGER = [0.22, 0.10, 0]; // back enters first

  return (
    <div style={{ background:'#08090e', minHeight:'100vh', position:'relative', zIndex:1 }}>
      <div style={{ position:'relative', width:'100%', height:phase>=3?'auto':'100vh', minHeight:phase>=3?520:'100vh', background:'#08090e', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center', perspective:'1200px' }}>
        {phase < 3 && featured.map((p, i) => {
          const isFront = i === 0;
          const isExpanding = phase >= 2 && isFront;

          // inset:0 + margin:auto centers the card; width/height grow to 100% expanding from center.
          // transform:translateY handles the deck stagger — no percentage-based translations that
          // would recalculate mid-transition and cause the top-left jump.
          let transform = 'translateY(700px)';
          if (phase === 1) {
            transform = `translateY(${STACK_Y[i]}px)`;
          } else if (phase >= 2) {
            transform = isFront ? 'translateY(0px)' : `translateY(${STACK_Y[i] + 60}px)`;
          }

          return (
            <div key={p.id} style={{
              position: 'absolute',
              inset: 0,
              margin: 'auto',
              width:  isExpanding ? '100%' : CARD_W[i],
              height: isExpanding ? '100%' : CARD_H[i],
              maxWidth: isExpanding ? 'none' : undefined,
              borderRadius: isExpanding ? 0 : 18,
              background: SPACE_BG[i],
              transform,
              opacity: phase === 0 ? 0 : phase >= 2 && !isFront ? 0 : STACK_O[i],
              zIndex: isFront ? 3 : i === 1 ? 2 : 1,
              transition: `all ${isExpanding ? '1s' : '0.8s'} cubic-bezier(0.22,1,0.36,1)`,
              transitionDelay: phase === 1 ? `${STAGGER[i]}s` : '0s',
              overflow: 'hidden',
              boxShadow: isFront
                ? '0 32px 80px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.05)'
                : '0 16px 48px rgba(0,0,0,0.7)',
            }}>
              {/* Star field */}
              <StarField seed={i + 1} count={isFront ? 140 : 90} />
              {/* Primary star point */}
              <div style={{ position:'absolute', top:'18%', right:'22%', width:3, height:3, borderRadius:'50%', background:'#fff', boxShadow:`0 0 6px 3px ${STAR_GLOW[i]}, 0 0 20px 8px ${STAR_GLOW[i]}`, pointerEvents:'none' }}/>
              {/* Nebula glow */}
              <div style={{ position:'absolute', top:'10%', left:'55%', width:340, height:260, borderRadius:'50%', background:`radial-gradient(ellipse, ${STAR_GLOW[i]} 0%, transparent 70%)`, filter:'blur(50px)', pointerEvents:'none' }}/>
              {/* Bottom vignette so label reads cleanly */}
              <div style={{ position:'absolute', bottom:0, left:0, right:0, height:120, background:'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)', pointerEvents:'none' }}/>
              {/* Bottom edge accent bar — visible on back cards */}
              {!isFront && <div style={{ position:'absolute', bottom:0, left:0, right:0, height:2, background:`rgba(255,255,255,0.08)` }}/>}
              {/* Label */}
              {!isExpanding && (
                <div style={{ position:'absolute', bottom:22, left:24, zIndex:2 }}>
                  <p style={{ fontSize:10, color:'rgba(200,220,255,0.6)', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:3 }}>{p.techStack[0]}</p>
                  <p style={{ fontFamily:'Space Grotesk,sans-serif', fontSize: isFront ? '1.4rem' : '1.1rem', fontWeight:700, color:'#f0f0f5', opacity: isFront ? 1 : 0.65 }}>{p.title}</p>
                </div>
              )}
            </div>
          );
        })}

        {phase >= 3 && (
          <div style={{ position:'relative', width:'100%', height:520, background:SPACE_BG[hero], overflow:'hidden', animation:'fadeUp 0.5s ease both' }}>
            <StarField seed={hero + 1} count={180} />
            {/* Primary star */}
            <div style={{ position:'absolute', top:'15%', right:'18%', width:4, height:4, borderRadius:'50%', background:'#fff', boxShadow:`0 0 8px 4px ${STAR_GLOW[hero]}, 0 0 28px 10px ${STAR_GLOW[hero]}`, pointerEvents:'none' }}/>
            {/* Nebula glow */}
            <div style={{ position:'absolute', top:'5%', left:'50%', width:500, height:380, borderRadius:'50%', background:`radial-gradient(ellipse, ${STAR_GLOW[hero]} 0%, transparent 70%)`, filter:'blur(60px)', pointerEvents:'none' }}/>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)' }}/>
            <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'0 40px 40px', zIndex:2 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', maxWidth:1100, margin:'0 auto', flexWrap:'wrap', gap:20 }}>
                <div style={{ maxWidth:560 }}>
                  {heroProject.awards.length > 0 && <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:14 }}>{heroProject.awards.map(a=><span key={a} style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'4px 10px', borderRadius:40, fontSize:11, fontWeight:600, background:'rgba(255,210,50,0.1)', color:'#ffd232', border:'1px solid rgba(255,210,50,0.25)' }}><Star size={10} fill="#ffd232"/>{a}</span>)}</div>}
                  <h2 style={{ fontFamily:'Space Grotesk,sans-serif', fontSize:'clamp(2rem,5vw,3.5rem)', marginBottom:10, lineHeight:1, color:'#f0f0f5' }}>{heroProject.title}</h2>
                  <p style={{ fontSize:14, color:'rgba(255,255,255,0.55)', lineHeight:1.65, marginBottom:22 }}>{heroProject.description}</p>
                  <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                    <button onClick={()=>navigate(heroProject.link)} style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'12px 24px', borderRadius:40, background:ACCENT, color:'#fff', fontWeight:600, fontSize:14, fontFamily:'Space Grotesk,sans-serif', border:'none', cursor:'pointer' }}>View Details <ArrowRight size={16}/></button>
                    <a href={heroProject.githubLink} target="_blank" rel="noopener" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'12px 24px', borderRadius:40, background:'transparent', color:'#f0f0f5', fontWeight:500, fontSize:14, fontFamily:'Space Grotesk,sans-serif', border:'1px solid rgba(255,255,255,0.07)', textDecoration:'none' }}><Github size={18}/> GitHub</a>
                  </div>
                </div>
                <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                  {featured.map((p,i)=>(
                    <div key={p.id} onClick={()=>setHero(i)} style={{ width:88, height:56, borderRadius:10, cursor:'pointer', flexShrink:0, background:SPACE_BG[i], border:`2px solid ${hero===i?ACCENT:'rgba(255,255,255,0.1)'}`, opacity:hero===i?1:0.5, transform:hero===i?'scale(1.08)':'scale(1)', transition:'all 0.25s ease', display:'flex', alignItems:'flex-end', padding:'6px 8px', overflow:'hidden', position:'relative' }}>
                      <span style={{ fontSize:9, fontFamily:'Space Grotesk,sans-serif', fontWeight:700, color:'rgba(255,255,255,0.85)', position:'relative', zIndex:1 }}>{p.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <section style={{ padding:'50px 0 100px', opacity:phase>=3?1:0, transform:phase>=3?'none':'translateY(20px)', transition:'opacity 0.6s ease,transform 0.6s ease', transitionDelay:'0.4s' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 32px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24, flexWrap:'wrap', gap:12 }}>
            <p style={{ fontSize:13, color:'rgba(240,240,245,0.45)' }}>{PROJECTS.length} projects total</p>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              {tags.map(t=><button key={t} onClick={()=>setFilter(t)} style={{ padding:'5px 14px', borderRadius:40, fontSize:12, cursor:'pointer', fontWeight:500, fontFamily:'Inter,sans-serif', border:`1px solid ${filter===t?ACCENT:'rgba(255,255,255,0.07)'}`, background:filter===t?'rgba(0,201,216,0.12)':'transparent', color:filter===t?ACCENT:'rgba(240,240,245,0.45)', transition:'all 0.2s' }}>{t}</button>)}
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(290px,1fr))', gap:16 }}>
            {filtered.map(p=><PCard key={p.id} project={p} onClick={()=>navigate(p.link)}/>)}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
