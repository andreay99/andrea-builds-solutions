import { useNavigate } from 'react-router-dom';
import { ArrowRight, Github, ExternalLink, Star } from 'lucide-react';
import { BlackHoleCanvas } from '@/components/BlackHoleCanvas';
import { RollingText } from '@/components/RollingText';
import { Reveal } from '@/components/Reveal';
import { Constellation } from '@/components/Constellation';

const ACCENT = '#00C9D8';
const ACCENT_RGB = '0,201,216';

const FEATURED = [
  { id:'recall',   title:'Recall',            link:'/projects/recall',   github:'https://github.com/Christinetrr/recall', live:'https://devpost.com/software/recall-cf0dp9',
    description:'Edge-deployable face recognition memory aid on Raspberry Pi. Under 200ms inference with 94% precision and <2% false positives.',
    awards:['Best Use of Grok (xAI)','Best Use of Arm (MLH)'], stack:['Python','OpenCV','DeepFace','MongoDB'] },
  { id:'cuda',     title:'CUDA Flash Attention', link:'/projects/cuda-flash-attention', github:'https://github.com/andreay99/cuda-flash-attention', live:undefined,
    description:'Flash Attention forward and backward passes written from scratch in raw CUDA C++. 22.9× softmax speedup and 86× less HBM traffic at seq_len=4096.',
    awards:[], stack:['CUDA','C++','PyTorch','Hugging Face'] },
  { id:'osehs',    title:'OSEHS Digital Twin', link:'/projects/osehs',    github:'https://github.com/andreay99/OSEHS-simulation', live:undefined,
    description:'Digital twin of a 20-unit satellite swarm for the NASA ORBIT Challenge. Clohessy-Wiltshire dynamics with a decentralized gossip protocol.',
    awards:['NASA ORBIT Challenge Phase 2'], stack:['Python','NumPy','Matplotlib','CW Equations'] },
];

const STACK = [
  { name:'Python',     cat:'Language',   slug:'python',     color:'3776AB' },
  { name:'TypeScript', cat:'Language',   slug:'typescript', color:'3178C6' },
  { name:'C++',        cat:'Language',   slug:'cplusplus',  color:'00599C' },
  { name:'CUDA',       cat:'Language',   slug:'nvidia',     color:'76B900' },
  { name:'React',      cat:'Frontend',   slug:'react',      color:'61DAFB' },
  { name:'Next.js',    cat:'Framework',  slug:'nextdotjs',  color:'ffffff' },
  { name:'FastAPI',    cat:'Backend',    slug:'fastapi',    color:'009688' },
  { name:'Flask',      cat:'Backend',    slug:'flask',      color:'ffffff' },
  { name:'PyTorch',    cat:'AI / ML',    slug:'pytorch',    color:'EE4C2C' },
  { name:'TensorFlow', cat:'AI / ML',    slug:'tensorflow', color:'FF6F00' },
  { name:'OpenCV',     cat:'AI / ML',    slug:'opencv',     color:'5C3EE8' },
  { name:'MongoDB',    cat:'Database',   slug:'mongodb',    color:'47A248' },
  { name:'Docker',     cat:'DevOps',     slug:'docker',     color:'2496ED' },
  { name:'AWS',        cat:'Cloud',      slug:'',           color:'FF9900' }, // Simple Icons dropped the AWS mark; rendered as text
  { name:'GitHub',     cat:'DevOps',     slug:'github',     color:'ffffff' },
  { name:'Vercel',     cat:'Deploy',     slug:'vercel',     color:'ffffff' },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="page-enter" style={{ position:'relative', zIndex:1, minHeight:'100vh' }}>
      <BlackHoleCanvas />

      {/* Hero */}
      <section className="hero-stellar"
        onMouseMove={e => {
          const el = e.currentTarget;
          el.style.setProperty('--px', ((e.clientX / window.innerWidth) - 0.5).toFixed(3));
          el.style.setProperty('--py', ((e.clientY / window.innerHeight) - 0.5).toFixed(3));
        }}>
        <div style={{ position:'fixed', inset:0, zIndex:0, background:'rgba(8,9,14,0.45)', pointerEvents:'none' }}/>

        {/* planet limb */}
        <div className="horizon-clip"><div className="horizon"/></div>

        {/* AY constellation */}
        <div className="hero-constellation"><Constellation /></div>

        <div className="hero-top">
          <p className="hero-tag hero-sub" style={{ animationDelay:'0ms' }}>Available for opportunities</p>
          <h1 className="hero-title">
            <RollingText text="ANDREA" duration={0.6} stagger={0.05} blur={8} pattern="sequential" />
            <br/>
            <RollingText text="YANEZ " duration={0.6} stagger={0.05} blur={8} pattern="sequential" />
            <RollingText text="SOTO" color={ACCENT} duration={0.65} stagger={0.06} blur={8} pattern="alternating" />
          </h1>
        </div>

        <div className="hero-bottom hero-sub" style={{ animationDelay:'700ms' }}>
          <h2 className="hero-title">From solar data<br/>to shipped code</h2>
          <p className="hero-caption">Full-stack &amp; AI/ML engineer · NJIT · NASA-funded researcher</p>
        </div>

        <div className="hero-cta" style={{ display:'flex', gap:8, flexWrap:'wrap', justifyContent:'center', position:'relative', zIndex:2, animationDelay:'900ms' }}>
          <button className="btn-stellar" onClick={() => navigate('/projects')}>
            View projects <ArrowRight size={15} />
          </button>
          <button className="link-stellar" onClick={() => navigate('/contact')}>Get in touch</button>
        </div>
      </section>

      <Reveal>
        <div className="stats-strip">
          {[['6','Projects'],['3','Awards'],['NASA','Research'],['Apple','Industry']].map(([v,l]) => (
            <div key={l}>
              <div style={{ fontFamily:'Space Grotesk, sans-serif', fontSize:'clamp(1.8rem,3vw,2.4rem)', fontWeight:300, lineHeight:1, color:'#f0f0f5' }}>{v}</div>
              <div style={{ fontSize:11, color:'rgba(240,240,245,0.45)', letterSpacing:'0.12em', textTransform:'uppercase', marginTop:8 }}>{l}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <div style={{ height:1, background:'linear-gradient(90deg,transparent,rgba(0,201,216,0.15),transparent)', margin:'0 32px' }}/>

      {/* FEATURED WORK */}
      <section style={{ padding:'100px 0', position:'relative', zIndex:2 }}>
        <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 32px' }}>
          <Reveal style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:36, flexWrap:'wrap', gap:12 }}>
            <h2>Featured Work</h2>
            <button onClick={() => navigate('/projects')} className="btn-ghost" style={{ fontSize:13, padding:'8px 18px' }}>
              All projects <ArrowRight size={14}/>
            </button>
          </Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(290px,1fr))', gap:12 }}>
            {FEATURED.map((p, i) => (
              <Reveal key={p.id} delay={i * 110}>
              <div className="card" onClick={() => navigate(p.link)}
                style={{ padding:24, display:'flex', flexDirection:'column', gap:12, height:'100%', cursor:'pointer' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:12 }}>
                  <h3 style={{ fontSize:'1rem' }}>{p.title}</h3>
                  <div style={{ display:'flex', gap:8, flexShrink:0 }}>
                    {p.github && <a href={p.github} target="_blank" rel="noopener" onClick={e=>e.stopPropagation()} style={{ color:'var(--text-muted)' }}><Github size={18}/></a>}
                    {p.live   && <a href={p.live}   target="_blank" rel="noopener" onClick={e=>e.stopPropagation()} style={{ color:'var(--text-muted)' }}><ExternalLink size={14}/></a>}
                  </div>
                </div>
                <p style={{ fontSize:13.5, color:'var(--text-muted)', lineHeight:1.65, flex:1 }}>{p.description}</p>
                {p.awards.length > 0 && (
                  <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                    {p.awards.map(a => <span key={a} className="award"><Star size={10} fill="#ffd232"/>{a}</span>)}
                  </div>
                )}
                <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginTop:'auto' }}>
                  {p.stack.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                <div style={{ fontSize:12, color:ACCENT, display:'flex', alignItems:'center', gap:4, marginTop:4, opacity:0.8 }}>
                  View details <ArrowRight size={12}/>
                </div>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height:1, background:'linear-gradient(90deg,transparent,rgba(0,201,216,0.15),transparent)', margin:'0 32px' }}/>

      {/* MY STACK */}
      <section style={{ padding:'80px 0', position:'relative', zIndex:2 }}>
        <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 32px' }}>
          <Reveal style={{ marginBottom:40 }}>
            <p style={{ fontSize:12, letterSpacing:'0.15em', textTransform:'uppercase', color:ACCENT, marginBottom:10, fontWeight:600 }}>Arsenal</p>
            <h2 style={{ fontFamily:'Space Grotesk, sans-serif', fontSize:'clamp(1.8rem,4vw,2.8rem)', fontWeight:700, lineHeight:1, color:'#f0f0f5' }}>
              MY <span style={{ color:'rgba(240,240,245,0.18)' }}>STACK</span>
            </h2>
          </Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(210px,1fr))', gap:10 }}>
            {STACK.map((tool, i) => (
              <Reveal key={tool.name} delay={(i % 4) * 60}>
              <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, padding:'14px 18px', display:'flex', alignItems:'center', gap:14, transition:'border-color 0.3s,transform 0.3s,box-shadow 0.3s' }}
                onMouseEnter={e=>{const el=e.currentTarget as HTMLDivElement;el.style.borderColor='rgba(255,255,255,0.15)';el.style.transform='translateY(-3px)';el.style.boxShadow='0 16px 48px rgba(0,0,0,0.4)';}}
                onMouseLeave={e=>{const el=e.currentTarget as HTMLDivElement;el.style.borderColor='rgba(255,255,255,0.07)';el.style.transform='';el.style.boxShadow='';}}>
                <div style={{ width:44, height:44, borderRadius:10, flexShrink:0, background:'rgba(0,201,216,0.06)', border:'1px solid rgba(0,201,216,0.12)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  {!tool.slug
                    ? <span style={{ fontSize:11, fontWeight:700, letterSpacing:'0.04em', color:`#${tool.color}`, fontFamily:'Space Grotesk, sans-serif' }}>{tool.name}</span>
                    : <img src={`https://cdn.simpleicons.org/${tool.slug}/${tool.color}`} alt={tool.name} width={22} height={22} style={{ display:'block' }}
                    onError={e=>{const el=e.currentTarget as HTMLImageElement;el.style.display='none';if(el.parentNode)(el.parentNode as HTMLElement).innerHTML=`<span style="font-size:12px;font-weight:700;color:#${tool.color};font-family:monospace">${tool.name.slice(0,2).toUpperCase()}</span>`;}}/>}
                </div>
                <div>
                  <div style={{ fontWeight:600, fontSize:14, fontFamily:'Space Grotesk, sans-serif', lineHeight:1.2, color:'#f0f0f5' }}>{tool.name}</div>
                  <div style={{ fontSize:11, color:'rgba(240,240,245,0.45)', marginTop:3 }}>{tool.cat}</div>
                </div>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
