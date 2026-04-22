import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Github, ExternalLink, ArrowRight, Star } from 'lucide-react';

const ACCENT = '#FF6B35';
const PROJECT_GRADIENTS = [
  'linear-gradient(135deg, #0a0020 0%, #2d0060 50%, #7c1fa8 100%)',
  'linear-gradient(135deg, #001018 0%, #003d4d 50%, #007a94 100%)',
  'linear-gradient(135deg, #001810 0%, #003d20 50%, #007a40 100%)',
];

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
      {project.techStack.map(t => <span key={t} style={{ display:'inline-flex', padding:'3px 10px', borderRadius:40, fontSize:11, fontWeight:500, background:'rgba(255,107,53,0.1)', color:ACCENT, border:'1px solid rgba(255,107,53,0.2)' }}>{t}</span>)}
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

  return (
    <div style={{ background:'#08090e', minHeight:'100vh', position:'relative', zIndex:1 }}>
      <div style={{ position:'relative', width:'100%', height:phase>=3?'auto':'100vh', minHeight:phase>=3?520:'100vh', background:'#08090e', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        {phase < 3 && featured.map((p, i) => {
          const isFront = i === 0;
          const stackY=[0,18,36][i], stackS=[1,0.93,0.86][i], stackO=[1,0.7,0.45][i], staggerD=[0.22,0.12,0][i];
          const isExpanding = phase>=2 && isFront;
          return (
            <div key={p.id} style={{ position:'absolute', width:isExpanding?'100%':'62%', maxWidth:isExpanding?'none':780, height:isExpanding?'100%':420, top:isExpanding?0:undefined, left:isExpanding?0:undefined, borderRadius:isExpanding?0:20, background:PROJECT_GRADIENTS[i], transform:phase===0?`translateY(600px) scale(${stackS})`:phase===1?`translateY(${stackY}px) scale(${stackS})`:isFront?'none':`translateY(${stackY+40}px) scale(${stackS*0.92})`, opacity:phase===0?0:phase>=2&&!isFront?0:stackO, zIndex:isFront?3:i===1?2:1, transition:`all ${isExpanding?'1s':'0.75s'} cubic-bezier(0.22,1,0.36,1)`, transitionDelay:phase===1?`${staggerD}s`:'0s', overflow:'hidden', boxShadow:isFront?'0 40px 100px rgba(0,0,0,0.9)':'0 20px 50px rgba(0,0,0,0.6)' }}>
              <div style={{ position:'absolute', inset:0, pointerEvents:'none', background:'repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,0.03) 39px,rgba(255,255,255,0.03) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,255,255,0.03) 39px,rgba(255,255,255,0.03) 40px)' }}/>
              <div style={{ position:'absolute', top:'30%', left:'60%', width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,107,53,0.15) 0%, transparent 70%)', filter:'blur(40px)', pointerEvents:'none' }}/>
              {!isExpanding && <div style={{ position:'absolute', bottom:24, left:28, zIndex:2 }}><p style={{ fontSize:11, color:'rgba(255,107,53,0.8)', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:4 }}>{p.techStack[0]}</p><p style={{ fontFamily:'Space Grotesk,sans-serif', fontSize:'1.5rem', fontWeight:700, color:'#fff' }}>{p.title}</p></div>}
            </div>
          );
        })}

        {phase >= 3 && (
          <div style={{ position:'relative', width:'100%', height:520, background:PROJECT_GRADIENTS[hero], overflow:'hidden', animation:'fadeUp 0.5s ease both' }}>
            <div style={{ position:'absolute', inset:0, pointerEvents:'none', background:'repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,0.03) 39px,rgba(255,255,255,0.03) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,255,255,0.03) 39px,rgba(255,255,255,0.03) 40px)' }}/>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(8,9,14,1) 0%, rgba(8,9,14,0.4) 50%, transparent 100%)' }}/>
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
                    <div key={p.id} onClick={()=>setHero(i)} style={{ width:88, height:56, borderRadius:10, cursor:'pointer', flexShrink:0, background:PROJECT_GRADIENTS[i], border:`2px solid ${hero===i?ACCENT:'rgba(255,255,255,0.12)'}`, opacity:hero===i?1:0.5, transform:hero===i?'scale(1.08)':'scale(1)', transition:'all 0.25s ease', display:'flex', alignItems:'flex-end', padding:'6px 8px' }}>
                      <span style={{ fontSize:9, fontFamily:'Space Grotesk,sans-serif', fontWeight:700, color:'rgba(255,255,255,0.8)' }}>{p.title}</span>
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
              {tags.map(t=><button key={t} onClick={()=>setFilter(t)} style={{ padding:'5px 14px', borderRadius:40, fontSize:12, cursor:'pointer', fontWeight:500, fontFamily:'Inter,sans-serif', border:`1px solid ${filter===t?ACCENT:'rgba(255,255,255,0.07)'}`, background:filter===t?'rgba(255,107,53,0.12)':'transparent', color:filter===t?ACCENT:'rgba(240,240,245,0.45)', transition:'all 0.2s' }}>{t}</button>)}
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
