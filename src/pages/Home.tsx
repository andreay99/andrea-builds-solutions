import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BlackHoleCanvas } from '@/components/BlackHoleCanvas';
import { RollingText } from '@/components/RollingText';

const ACCENT = '#FF6B35';

const STACK = [
  { name:'Python',     cat:'Language',   slug:'python',     color:'3776AB' },
  { name:'TypeScript', cat:'Language',   slug:'typescript', color:'3178C6' },
  { name:'React',      cat:'Frontend',   slug:'react',      color:'61DAFB' },
  { name:'Next.js',    cat:'Framework',  slug:'nextdotjs',  color:'ffffff' },
  { name:'FastAPI',    cat:'Backend',    slug:'fastapi',    color:'009688' },
  { name:'Flask',      cat:'Backend',    slug:'flask',      color:'ffffff' },
  { name:'TensorFlow', cat:'AI / ML',    slug:'tensorflow', color:'FF6F00' },
  { name:'OpenCV',     cat:'AI / ML',    slug:'opencv',     color:'5C3EE8' },
  { name:'MongoDB',    cat:'Database',   slug:'mongodb',    color:'47A248' },
  { name:'PostgreSQL', cat:'Database',   slug:'postgresql', color:'4169E1' },
  { name:'GitHub',     cat:'DevOps',     slug:'github',     color:'ffffff' },
  { name:'Vercel',     cat:'Deploy',     slug:'vercel',     color:'ffffff' },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="page-enter" style={{ position:'relative', zIndex:1, background:'#08090e', minHeight:'100vh' }}>
      <BlackHoleCanvas />

      {/* Hero */}
      <section style={{
        minHeight:'100vh', display:'flex', flexDirection:'column',
        justifyContent:'center', alignItems:'center', textAlign:'center',
        padding:'120px 32px 80px', position:'relative', zIndex:2,
      }}>
        <div style={{ position:'fixed', inset:0, zIndex:-1, background:'rgba(8,9,14,0.55)', pointerEvents:'none' }}/>

        <p className="hero-sub" style={{ fontSize:12, letterSpacing:'0.15em', textTransform:'uppercase', color:ACCENT, marginBottom:24, fontWeight:600, animationDelay:'0ms' }}>
          Available for opportunities
        </p>

        <h1 style={{ fontFamily:'Space Grotesk, sans-serif', fontSize:'clamp(3.5rem,8vw,7.5rem)', fontWeight:700, lineHeight:0.92, letterSpacing:'-0.03em', marginBottom:24 }}>
          <RollingText text="ANDREA" duration={0.55} stagger={0.05} blur={8} pattern="sequential" />
          <br/>
          <RollingText text="YANEZ " duration={0.55} stagger={0.05} blur={8} pattern="sequential" />
          <RollingText text="SOTO" color={ACCENT} duration={0.6} stagger={0.06} blur={8} pattern="alternating" />
        </h1>

        <p className="hero-sub" style={{ fontSize:'clamp(0.95rem,1.8vw,1.2rem)', color:'rgba(240,240,245,0.45)', fontFamily:'Space Grotesk, sans-serif', fontWeight:400, marginBottom:20, lineHeight:1.4, animationDelay:'350ms' }}>
          Full Stack Developer &amp; AI/ML Engineer
        </p>

        <p className="hero-sub" style={{ fontSize:14, color:'rgba(240,240,245,0.45)', lineHeight:1.7, maxWidth:440, marginBottom:36, animationDelay:'450ms' }}>
          NJIT student building AI-powered tools — from NASA solar research to hackathon-winning apps.
        </p>

        <div className="hero-cta" style={{ display:'flex', gap:12, flexWrap:'wrap', justifyContent:'center', marginBottom:52, animationDelay:'550ms' }}>
          <button onClick={() => navigate('/projects')} style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'12px 24px', borderRadius:40, background:ACCENT, color:'#fff', fontWeight:600, fontSize:14, fontFamily:'Space Grotesk, sans-serif', border:'none', cursor:'pointer', transition:'all 0.25s' }}>
            View Projects <ArrowRight size={16} />
          </button>
          <button onClick={() => navigate('/contact')} style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'12px 24px', borderRadius:40, background:'transparent', color:'#f0f0f5', fontWeight:500, fontSize:14, fontFamily:'Space Grotesk, sans-serif', border:'1px solid rgba(255,255,255,0.07)', cursor:'pointer', transition:'all 0.25s' }}>
            Get in Touch
          </button>
        </div>

        <div className="hero-stats" style={{ display:'flex', gap:36, flexWrap:'wrap', justifyContent:'center', animationDelay:'650ms' }}>
          {[['7','Projects'],['3','Awards'],['NASA','Research'],['Apple','Industry']].map(([v,l]) => (
            <div key={l}>
              <div style={{ fontFamily:'Space Grotesk, sans-serif', fontSize:'clamp(1.8rem,3vw,2.4rem)', fontWeight:700, lineHeight:1, color:'#f0f0f5' }}>{v}</div>
              <div style={{ fontSize:11, color:'rgba(240,240,245,0.45)', letterSpacing:'0.08em', textTransform:'uppercase', marginTop:5 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ height:1, background:'linear-gradient(90deg,transparent,rgba(255,107,53,0.15),transparent)', margin:'0 32px' }}/>

      {/* MY STACK */}
      <section style={{ padding:'80px 0', position:'relative', zIndex:2 }}>
        <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 32px' }}>
          <div style={{ marginBottom:40 }}>
            <p style={{ fontSize:12, letterSpacing:'0.15em', textTransform:'uppercase', color:ACCENT, marginBottom:10, fontWeight:600 }}>Arsenal</p>
            <h2 style={{ fontFamily:'Space Grotesk, sans-serif', fontSize:'clamp(1.8rem,4vw,2.8rem)', fontWeight:700, lineHeight:1, color:'#f0f0f5' }}>
              MY <span style={{ color:'rgba(240,240,245,0.18)' }}>STACK</span>
            </h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(210px,1fr))', gap:10 }}>
            {STACK.map(tool => (
              <div key={tool.name} style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:14, padding:'14px 18px', display:'flex', alignItems:'center', gap:14, transition:'border-color 0.3s,transform 0.3s,box-shadow 0.3s' }}
                onMouseEnter={e=>{const el=e.currentTarget as HTMLDivElement;el.style.borderColor='rgba(255,255,255,0.15)';el.style.transform='translateY(-3px)';el.style.boxShadow='0 16px 48px rgba(0,0,0,0.4)';}}
                onMouseLeave={e=>{const el=e.currentTarget as HTMLDivElement;el.style.borderColor='rgba(255,255,255,0.07)';el.style.transform='';el.style.boxShadow='';}}>
                <div style={{ width:44, height:44, borderRadius:10, flexShrink:0, background:'rgba(255,107,53,0.06)', border:'1px solid rgba(255,107,53,0.12)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <img src={`https://cdn.simpleicons.org/${tool.slug}/${tool.color}`} alt={tool.name} width={22} height={22} style={{ display:'block' }}
                    onError={e=>{const el=e.currentTarget as HTMLImageElement;el.style.display='none';if(el.parentNode)(el.parentNode as HTMLElement).innerHTML=`<span style="font-size:12px;font-weight:700;color:#${tool.color};font-family:monospace">${tool.name.slice(0,2).toUpperCase()}</span>`;}}/>
                </div>
                <div>
                  <div style={{ fontWeight:600, fontSize:14, fontFamily:'Space Grotesk, sans-serif', lineHeight:1.2, color:'#f0f0f5' }}>{tool.name}</div>
                  <div style={{ fontSize:11, color:'rgba(240,240,245,0.45)', marginTop:3 }}>{tool.cat}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer style={{ borderTop:'1px solid rgba(255,255,255,0.07)', padding:'32px', textAlign:'center', color:'rgba(240,240,245,0.22)', fontSize:13, fontFamily:'Inter, sans-serif', position:'relative', zIndex:2 }}>
        Andrea Yanez Soto · andreasoto.dev · Built with intention
      </footer>
    </div>
  );
};

export default Home;
