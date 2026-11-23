import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, RotateCcw, Pause, Play, X, ArrowUpRight, Search } from 'lucide-react';
import { GROUPS, NODES, type GroupId, type UNode } from '@/data/universe';
import { OrbitButton } from '@/components/OrbitButton';

/* ──────────────────────────────────────────────────────────────────────────
   Interstellar-style black hole: rays are bent around the hole and coloured
   where they cross a thin accretion disk, so the disk wraps over the top.
   Drawn on its own canvas with mix-blend-mode:screen, so black = see-through.
   ────────────────────────────────────────────────────────────────────────── */
const BH_VS = `attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}`;
const BH_FS = `
precision highp float;
uniform vec2 u_res; uniform float u_time; uniform float u_tilt;
float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float hash3(vec3 p){ return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453); }
float noise(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y); }
float fbm(vec2 p){ float v=0.,a=.5; for(int i=0;i<5;i++){ v+=a*noise(p); p=p*2.03+vec2(1.7,9.2); a*=.5; } return v; }

// colour of a glowing body at temperature t (in thousands of kelvin)
vec3 blackbody(float t){
  float x=t*10.;                                         // T/100
  vec3 c;
  if(x<=66.){ c.r=1.; c.g=clamp(.39008*log(x)-.63184,0.,1.); }
  else{ c.r=clamp(1.29294*pow(x-60.,-.13320),0.,1.); c.g=clamp(1.12989*pow(x-60.,-.07551),0.,1.); }
  c.b = x>=66. ? 1. : (x<=19. ? 0. : clamp(.54321*log(x-10.)-1.19625,0.,1.));
  return c;
}

void main(){
  vec2 uv=(gl_FragCoord.xy-.5*u_res)/u_res.y;          // x spans about ±1.1, y ±0.5
  float dist=18.;
  vec3 ro=vec3(0.,sin(u_tilt)*dist,-cos(u_tilt)*dist);
  vec3 fw=normalize(-ro), rt=normalize(cross(vec3(0,1,0),fw)), up=cross(fw,rt);
  vec3 v=normalize(fw+(uv.x*rt+uv.y*up)*.9);
  vec3 p=ro;
  vec3 hv=cross(p,v); float h2=dot(hv,hv);           // conserved, drives the bending (event horizon r=1)
  vec3 col=vec3(0.); float alpha=0., minR=1e3, haze=0., captured=0.;
  const float RIN=3., ROUT=10.;                       // disk starts at the innermost stable orbit (3 rs)
  for(int i=0;i<170;i++){
    float r=length(p);
    minR=min(minR,r);
    if(r<1.){ captured=1.; alpha=1.; break; }
    if(r>dist*1.6) break;
    float dt=.025+.03*r;                               // small steps near the hole, where light bends hardest
    float rp=length(p.xz);
    haze+=exp(-abs(p.y)*6.)*smoothstep(ROUT+3.,RIN,rp)*smoothstep(RIN*.8,RIN,rp)*dt*(1.-alpha);
    vec3 prev=p;
    v+=-1.5*h2*p/pow(r,5.)*dt;
    p+=v*dt;
    if(prev.y*p.y<0.){
      vec3 hit=mix(prev,p,prev.y/(prev.y-p.y));
      float rr=length(hit.xz);
      if(rr>RIN && rr<ROUT){
        float ang=atan(hit.z,hit.x);
        float swirl=ang-u_time*5./pow(rr,1.5);
        float turb=fbm(vec2(rr*2.2,swirl*3.));
        float streak=.8+.2*sin(rr*9.+turb*12.);
        float fine=fbm(vec2(rr*5.5,swirl*4.5));          // clumps and filaments, not rings
        float dens=streak*(.2+1.1*fine*fine)*(.5+.8*turb);
        // thin-disk temperature profile, hottest just outside the inner edge
        float T=pow(rr/RIN,-.75)*pow(max(1.-sqrt(RIN/rr),0.),.25)*2.1;
        // orbiting gas: blueshifted and brighter where it moves toward us, plus gravitational redshift
        vec3 vel=normalize(vec3(-hit.z,0.,hit.x));
        float beta=min(.62*sqrt(.5/(rr-1.)),.6);
        float gam=1./sqrt(1.-beta*beta);
        float g=sqrt(1.-1./rr)/(gam*(1.-beta*dot(vel,-normalize(v))));
        float Tobs=T*g*4.4;                              // in thousands of kelvin
        float edge=smoothstep(RIN,RIN+.25,rr)*smoothstep(ROUT,ROUT-4.5,rr);
        float I=pow(T,1.7)*g*g*g*g*dens*edge*3.;
        vec3 c=blackbody(max(Tobs,1.))*I;
        float da=clamp(edge*dens*(.25+T*1.1),0.,1.);
        col+=(1.-alpha)*c*da; alpha+=(1.-alpha)*da;
        if(alpha>.985) break;
      }
    }
  }
  // lensed background stars: whatever escapes keeps its bent direction
  if(captured<.5){
    vec3 d=normalize(v)*170.;
    vec3 cell=floor(d); float h=hash3(cell);
    if(h>.994){
      vec3 f=fract(d)-.5;
      float s=smoothstep(.22,0.,length(f))*(.5+.5*hash3(cell+3.1));
      col+=(1.-alpha)*vec3(.85,.9,1.)*s*1.4;
    }
  }
  float ring=exp(-pow((minR-1.5)*3.2,2.));
  col+=(1.-alpha)*vec3(1.,.8,.6)*ring*.45;
  col+=vec3(1.,.55,.25)*haze*(1.-captured*.85)*.32;
  col*=smoothstep(.5,.3,length(vec2(uv.x*.455,uv.y)));
  col=vec3(1.)-exp(-col*1.3);                          // filmic roll-off: the hot inner disk burns to white
  col=mix(vec3(dot(col,vec3(.299,.587,.114))),col,1.5);  // a touch of saturation so the gas reads warm
  col=pow(max(col,0.),vec3(.95));
  col+=(hash(gl_FragCoord.xy+fract(u_time))-.5)/160.;   // film grain hides banding
  gl_FragColor=vec4(col,1.);
}`;

/* ── deterministic randomness so the galaxy looks the same every visit ── */
const rng = (seed: number) => () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
const gauss = (r: () => number) => Math.sqrt(-2 * Math.log(r() + 1e-9)) * Math.cos(2 * Math.PI * r());

interface Star { x: number; y: number; z: number; s: number; a: number; tw: number; ph: number; }
interface Placed extends UNode { x: number; y: number; z: number; sx: number; sy: number; vis: number; }
interface Comet { R: number; inc: number; node: number; spd: number; ph: number; }

interface GalaxyProps {
  groups?: GroupId[];
  /** let the mouse wheel zoom (only on the full-page view, so it never hijacks page scroll) */
  wheelZoom?: boolean;
  centerLabel?: string;
  height?: string | number;
  /** vertical position of the galaxy centre, as a fraction of the height */
  centerY?: number;
  /** select this star from outside (e.g. a project opened from a link) */
  focusId?: string | null;
  /** called for project stars instead of leaving the page; x/y are viewport pixels of the star */
  onOpen?: (nodeId: string, x: number, y: number) => void;
}

const ease = (cur: number, to: number, k: number) => cur + (to - cur) * k;

export const Galaxy = ({ groups, wheelZoom = false, centerLabel, height = '100%', centerY = 0.5, focusId, onOpen }: GalaxyProps) => {
  const navigate = useNavigate();
  const wrapRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLCanvasElement>(null);
  const bhHostRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const centerRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);

  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const [indexOpen, setIndexOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const reduceMotion = useMemo(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  // camera lives in a ref so the animation loop never re-renders React
  const cam = useRef({ yaw: 0.4, elev: 1.05, zoom: 1, tYaw: 0.4, tElev: 1.05, tZoom: 1, fx: 0, fz: 0, tfx: 0, tfz: 0, ox: 0 });
  const live = useRef({ selected: null as string | null, hovered: null as string | null, paused: false });
  live.current.selected = selected; live.current.hovered = hovered; live.current.paused = paused || reduceMotion;

  /* ── layout: groups on a ring, their items clustered around each centre ── */
  const { placed, groupCenters, edges, byId } = useMemo(() => {
    const shown = GROUPS.filter(g => !groups || groups.includes(g.id));
    const r = rng(7);
    const centers: Record<string, { x: number; z: number; label: string; count: number }> = {};
    shown.forEach((g, i) => {
      const a = (i / shown.length) * Math.PI * 2 + 0.35;
      const R = shown.length <= 3 ? 0.55 : 0.64;
      centers[g.id] = { x: Math.cos(a) * R, z: Math.sin(a) * R, label: g.label, count: 0 };
    });
    const nodes = NODES.filter(n => centers[n.group]);
    const out: Placed[] = [];
    nodes.forEach(n => {
      const c = centers[n.group]; c.count++;
      const spread = n.group === 'skills' ? 0.19 : 0.13;
      let x = 0, z = 0;
      for (let t = 0; t < 30; t++) {          // keep stars from landing on top of each other
        const ang = r() * Math.PI * 2, rad = Math.sqrt(r()) * spread;
        x = c.x + Math.cos(ang) * rad; z = c.z + Math.sin(ang) * rad;
        if (out.every(o => (o.x - x) ** 2 + (o.z - z) ** 2 > 0.0042)) break;
      }
      out.push({ ...n, x, y: gauss(r) * 0.02, z, sx: 0, sy: 0, vis: 0 });
    });
    const ids = new Set(out.map(n => n.id));
    const seen = new Set<string>();
    const e: [string, string][] = [];
    out.forEach(n => (n.links || []).forEach(l => {
      if (!ids.has(l)) return;
      const k = [n.id, l].sort().join('|');
      if (!seen.has(k)) { seen.add(k); e.push([n.id, l]); }
    }));
    return { placed: out, groupCenters: centers, edges: e, byId: Object.fromEntries(out.map(n => [n.id, n])) as Record<string, Placed> };
  }, [groups]);

  const related = useMemo(() => {
    const m: Record<string, Set<string>> = {};
    edges.forEach(([a, b]) => { (m[a] ||= new Set()).add(b); (m[b] ||= new Set()).add(a); });
    return m;
  }, [edges]);

  /* ── background dust + comets, generated once ── */
  const { dust, comets, web } = useMemo(() => {
    const r = rng(42);
    const d: Star[] = [];
    for (let i = 0; i < 3200; i++) {
      const arm = Math.floor(r() * 2);
      const rad = 0.24 + Math.pow(r(), 0.8) * 0.95;
      const a = arm * Math.PI + rad * 3.2 + gauss(r) * 0.55;
      d.push({ x: Math.cos(a) * rad, y: gauss(r) * 0.03, z: Math.sin(a) * rad,
        s: 0.35 + r() * r() * 1.4, a: 0.18 + r() * 0.7, tw: r() < 0.3 ? 1 + r() * 2.5 : 0, ph: r() * 6.28 });
    }
    const web: [number, number][] = [];
    Object.values(groupCenters).forEach(c => {
      for (let i = 0; i < 300; i++) {
        d.push({ x: c.x + gauss(r) * 0.095, y: gauss(r) * 0.025, z: c.z + gauss(r) * 0.095,
          s: 0.5 + r() * r() * 1.5, a: 0.35 + r() * 0.6, tw: r() < 0.35 ? 1 + r() * 2 : 0, ph: r() * 6.28 });
      }
      // brighter "idea" stars, each tied to its two nearest neighbours
      const first = d.length;
      for (let i = 0; i < 46; i++) {
        d.push({ x: c.x + gauss(r) * 0.085, y: gauss(r) * 0.02, z: c.z + gauss(r) * 0.085,
          s: 1.1 + r() * 1.2, a: 0.85, tw: r() < 0.5 ? 0.8 + r() * 1.5 : 0, ph: r() * 6.28 });
      }
      for (let i = first; i < d.length; i++) {
        const near = [];
        for (let j = first; j < d.length; j++) if (j !== i) near.push([(d[i].x - d[j].x) ** 2 + (d[i].z - d[j].z) ** 2, j]);
        near.sort((a, b) => a[0] - b[0]);
        near.slice(0, 2).forEach(([, j]) => { if (i < j) web.push([i, j]); });
      }
    });
    const cm: Comet[] = Array.from({ length: 10 }, () => ({
      R: 1.45 + r() * 0.55, inc: (r() - 0.5) * 1.2, node: r() * 6.28, spd: 0.05 + r() * 0.07, ph: r() * 6.28,
    }));
    return { dust: d, comets: cm, web };
  }, [groupCenters]);

  /* ── the render loop ── */
  useEffect(() => {
    const wrap = wrapRef.current!, sc = starRef.current!;
    // a fresh canvas per setup: a WebGL context that was released can never be reused
    const bc = document.createElement('canvas');
    bc.style.cssText = 'position:absolute;left:0;top:0;mix-blend-mode:screen;pointer-events:none';
    bhHostRef.current!.appendChild(bc);
    const ctx = sc.getContext('2d')!;
    const gl = bc.getContext('webgl', { antialias: false, alpha: false, premultipliedAlpha: false });

    let prog: WebGLProgram | null = null;
    if (gl) {
      const mk = (src: string, t: number) => { const s = gl.createShader(t)!; gl.shaderSource(s, src); gl.compileShader(s); return s; };
      prog = gl.createProgram()!;
      gl.attachShader(prog, mk(BH_VS, gl.VERTEX_SHADER));
      gl.attachShader(prog, mk(BH_FS, gl.FRAGMENT_SHADER));
      gl.linkProgram(prog);
      gl.useProgram(prog);
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, 'a');
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    }

    // soft nebula smoke, painted once
    const neb = document.createElement('canvas'); neb.width = neb.height = 512;
    const nctx = neb.getContext('2d')!; const nr = rng(9);
    for (let i = 0; i < 150; i++) {
      const x = 180 + nr() * 332, y = 120 + nr() * 392, rad = 30 + nr() * 120;
      const grey = 150 + nr() * 50;
      const g = nctx.createRadialGradient(x, y, 0, x, y, rad);
      g.addColorStop(0, `rgba(${grey},${grey},${grey + 8},${0.025 + nr() * 0.05})`);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      nctx.fillStyle = g; nctx.fillRect(0, 0, 512, 512);
    }

    let W = 0, H = 0, dpr = 1, bhPx = 0, raf = 0;
    const start = performance.now();
    let last = start;

    const resize = () => {
      W = wrap.clientWidth; H = wrap.clientHeight; dpr = Math.min(window.devicePixelRatio || 1, 2);
      sc.width = W * dpr; sc.height = H * dpr; sc.style.width = W + 'px'; sc.style.height = H + 'px';
    };
    const ro = new ResizeObserver(resize); ro.observe(wrap); resize();

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (document.hidden) return;
      const t = (now - start) / 1000, dt = Math.min(0.05, (now - last) / 1000); last = now;
      const c = cam.current, L = live.current;

      if (!L.paused && !dragging) c.tYaw += dt * 0.035;
      c.yaw = ease(c.yaw, c.tYaw, 0.08); c.elev = ease(c.elev, c.tElev, 0.08); c.zoom = ease(c.zoom, c.tZoom, 0.08);
      c.fx = ease(c.fx, c.tfx, 0.06); c.fz = ease(c.fz, c.tfz, 0.06);
      // slide the scene left so the panel never covers the star it describes
      c.ox = ease(c.ox, L.selected && W > 640 ? -Math.min(200, W * 0.2) : 0, 0.07);

      const base = Math.min(W, H) * 0.47 * c.zoom, D = 3.2;
      const cy0 = Math.cos(c.yaw), sy0 = Math.sin(c.yaw), ce = Math.cos(c.elev), se = Math.sin(c.elev);
      const proj = (x: number, y: number, z: number) => {
        x -= c.fx; z -= c.fz;
        const xr = x * cy0 - z * sy0, zr = x * sy0 + z * cy0;
        const up = y * ce + zr * se, depth = D - y * se + zr * ce;
        const k = D / Math.max(depth, 0.2);
        return [W / 2 + c.ox + base * xr * k, H * centerY - base * up * k, k] as const;
      };

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#030409'; ctx.fillRect(0, 0, W, H);

      // nebula
      ctx.globalAlpha = 0.9;
      const ns = Math.max(W, H) * 1.5;
      ctx.save(); ctx.translate(W * 0.5, H * 0.52); ctx.rotate(t * 0.004);
      ctx.drawImage(neb, -ns / 2, -ns / 2, ns, ns); ctx.restore();
      ctx.globalAlpha = 1;

      ctx.globalCompositeOperation = 'lighter';

      // fine web between idea stars
      ctx.lineWidth = 0.6;
      ctx.strokeStyle = 'rgba(210,222,255,0.09)';
      ctx.beginPath();
      for (const [i, j] of web) {
        const A = dust[i], B = dust[j];
        const [ax, ay] = proj(A.x, A.y, A.z), [bx, by] = proj(B.x, B.y, B.z);
        ctx.moveTo(ax, ay); ctx.lineTo(bx, by);
      }
      ctx.stroke();

      // dust
      for (let i = 0; i < dust.length; i++) {
        const s = dust[i]; const [px, py, k] = proj(s.x, s.y, s.z);
        if (px < -4 || py < -4 || px > W + 4 || py > H + 4) continue;
        let a = s.a; if (s.tw) a *= 0.6 + 0.4 * Math.sin(t * s.tw + s.ph);
        const sz = s.s * k * Math.min(1.6, 0.7 + c.zoom * 0.35);
        ctx.fillStyle = `rgba(225,232,255,${a.toFixed(3)})`;
        ctx.fillRect(px - sz / 2, py - sz / 2, sz, sz);
      }

      // comets on tilted orbits
      for (const m of comets) {
        const ci = Math.cos(m.inc), si = Math.sin(m.inc), cn = Math.cos(m.node), sn = Math.sin(m.node);
        const pos = (th: number) => {
          const ox = Math.cos(th) * m.R, oz = Math.sin(th) * m.R;
          const y = oz * si, z0 = oz * ci;
          return proj(ox * cn - z0 * sn, y, ox * sn + z0 * cn);
        };
        const head = m.ph + t * m.spd;
        ctx.lineWidth = 1.1;
        for (let j = 0; j < 40; j++) {
          const [x1, y1] = pos(head - j * 0.016), [x2, y2] = pos(head - (j + 1) * 0.016);
          ctx.strokeStyle = `rgba(235,240,255,${(0.55 * (1 - j / 40) ** 1.5).toFixed(3)})`;
          ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
        }
        const [hx, hy] = pos(head);
        const g = ctx.createRadialGradient(hx, hy, 0, hx, hy, 5);
        g.addColorStop(0, 'rgba(255,255,255,0.95)'); g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = g; ctx.fillRect(hx - 5, hy - 5, 10, 10);
      }

      // project nodes
      const sel = L.selected, hov = L.hovered;
      const focus = sel || hov;
      const rel = focus ? related[focus] : undefined;
      for (const n of placed) { const [px, py, k] = proj(n.x, n.y, n.z); n.sx = px; n.sy = py; n.vis = k; }

      // edges
      for (const [a, b] of edges) {
        const A = byId[a], B = byId[b];
        const lit = focus && (a === focus || b === focus);
        ctx.strokeStyle = lit ? `rgba(235,242,255,${sel ? 0.75 : 0.45})` : `rgba(200,215,255,${focus ? 0.025 : 0.06})`;
        ctx.lineWidth = lit ? 1.1 : 0.7;
        ctx.beginPath(); ctx.moveTo(A.sx, A.sy); ctx.lineTo(B.sx, B.sy); ctx.stroke();
      }

      // stars
      for (const n of placed) {
        const on = !focus || n.id === focus || rel?.has(n.id);
        const big = n.id === focus;
        const prize = n.prize ?? 0;
        const r0 = (n.minor ? 1.0 : 1.5) * n.vis * (big ? 1.5 : 1) * (prize === 1 ? 1.9 : prize === 2 ? 1.35 : 1);
        const glow = r0 * (n.minor ? 4 : 5.5);
        const a = on ? 1 : 0.3;
        const g = ctx.createRadialGradient(n.sx, n.sy, 0, n.sx, n.sy, glow);
        g.addColorStop(0, `rgba(255,255,255,${0.95 * a})`);
        g.addColorStop(0.12, `rgba(255,255,255,${0.85 * a})`);
        g.addColorStop(0.3, prize ? `rgba(255,217,160,${0.32 * a})` : `rgba(220,230,255,${0.18 * a})`);
        g.addColorStop(1, prize ? 'rgba(255,200,130,0)' : 'rgba(180,200,255,0)');
        ctx.fillStyle = g; ctx.fillRect(n.sx - glow, n.sy - glow, glow * 2, glow * 2);
        // the headline win wears a slow gold ring
        if (prize === 1) {
          const ph = (t * 0.5) % 1;
          ctx.strokeStyle = `rgba(255,217,160,${0.7 * (1 - ph) * a})`; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(n.sx, n.sy, r0 * 3 + ph * r0 * 6, 0, Math.PI * 2); ctx.stroke();
        }
        if (big) {
          ctx.strokeStyle = 'rgba(255,255,255,0.55)'; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(n.sx, n.sy, r0 * 4 + 2 * Math.sin(t * 3), 0, Math.PI * 2); ctx.stroke();
        }
      }

      // shadow of the hole, so stars behind it are hidden
      const [ox, oy, ok] = proj(0, 0, 0);
      const bhSize = Math.min(W, H) * 0.4 * c.zoom * ok, bhW = bhSize * 2.2;
      // warm bloom stretched along the disk
      ctx.save(); ctx.translate(ox, oy); ctx.scale(2.6, 0.55);
      const bl = ctx.createRadialGradient(0, 0, 0, 0, 0, bhSize * 0.5);
      bl.addColorStop(0, 'rgba(255,214,160,0.14)'); bl.addColorStop(1, 'rgba(255,190,120,0)');
      ctx.fillStyle = bl; ctx.fillRect(-bhSize * 0.5, -bhSize * 0.5, bhSize, bhSize); ctx.restore();
      ctx.globalCompositeOperation = 'source-over';
      const shR = bhSize * 0.165;
      const sg = ctx.createRadialGradient(ox, oy, shR * 0.9, ox, oy, shR * 1.08);
      sg.addColorStop(0, 'rgba(0,0,0,1)'); sg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(ox, oy, shR * 1.08, 0, Math.PI * 2); ctx.fill();

      // black hole canvas follows the galaxy centre
      bc.style.width = bhW + 'px'; bc.style.height = bhSize + 'px';
      bc.style.transform = `translate(${ox - bhW / 2}px, ${oy - bhSize / 2}px)`;
      if (gl && prog) {
        const px = Math.min(480, Math.round(bhSize * Math.min(dpr, 1.5))), pw = Math.round(px * 2.2);
        if (px !== bhPx) { bc.width = pw; bc.height = bhPx = px; gl.viewport(0, 0, pw, px); }
        // looking down on the galaxy = more open disk; edge-on = Interstellar shot
        const tilt = 0.04 + (c.elev - 0.35) * 0.12;
        gl.uniform2f(gl.getUniformLocation(prog, 'u_res'), pw, px);
        gl.uniform1f(gl.getUniformLocation(prog, 'u_time'), L.paused ? 0 : t);
        gl.uniform1f(gl.getUniformLocation(prog, 'u_tilt'), tilt);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }

      // HTML labels
      Object.entries(groupCenters).forEach(([id, gc]) => {
        const el = labelRefs.current[id]; if (!el) return;
        const [lx, ly] = proj(gc.x, 0, gc.z);
        el.style.transform = `translate(${lx}px, ${ly - 18}px) translate(-50%, -100%)`;
        el.style.opacity = focus ? '0.35' : '1';
      });
      if (centerRef.current) centerRef.current.style.transform = `translate(${ox}px, ${oy + shR * 1.9}px) translate(-50%, 0)`;
      if (tipRef.current) {
        const tn = hov ? byId[hov] : sel ? byId[sel] : null;
        tipRef.current.style.opacity = tn ? '1' : '0';
        if (tn) tipRef.current.style.transform = `translate(${tn.sx + 12}px, ${tn.sy - 12}px) translate(0, -100%)`;
      }
    };

    /* ── pointer controls: drag to orbit/tilt, tap a star to open it ── */
    let dragging = false, moved = 0, lx = 0, ly = 0;
    const pick = (x: number, y: number) => {
      let best: Placed | null = null, bd = 18 * 18;
      for (const n of placed) { const d = (n.sx - x) ** 2 + (n.sy - y) ** 2; if (d < bd) { bd = d; best = n; } }
      return best;
    };
    const rect = () => wrap.getBoundingClientRect();
    // UI layered on the galaxy (panel, controls, Index) handles its own clicks. This native listener
    // runs before React's stopPropagation, so without this check a click on "Enter" would also count
    // as a click on empty sky and close the panel before the button ever fired.
    const isUi = (t: EventTarget | null) => !!(t as HTMLElement | null)?.closest?.('.galaxy-panel, .galaxy-controls, .galaxy-index-btn');
    const down = (e: PointerEvent) => { if (isUi(e.target)) return; dragging = true; moved = 0; lx = e.clientX; ly = e.clientY; };
    const move = (e: PointerEvent) => {
      const r = rect();
      if (dragging) {
        const dx = e.clientX - lx, dy = e.clientY - ly; lx = e.clientX; ly = e.clientY; moved += Math.abs(dx) + Math.abs(dy);
        if (moved > 4) {
          const c = cam.current;
          c.tYaw -= dx * 0.005;
          c.tElev = Math.max(0.35, Math.min(1.45, c.tElev + dy * 0.004));
        }
      } else if (e.pointerType === 'mouse') {
        const n = pick(e.clientX - r.left, e.clientY - r.top);
        setHovered(n ? n.id : null);
        wrap.style.cursor = n ? 'pointer' : 'grab';
      }
    };
    const up = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      if (moved > 6) return;
      const r = rect();
      const n = pick(e.clientX - r.left, e.clientY - r.top);
      setSelected(n ? n.id : null);
    };
    const wheel = (e: WheelEvent) => {
      if (!wheelZoom) return;
      e.preventDefault();
      const c = cam.current; c.tZoom = Math.max(0.6, Math.min(3, c.tZoom * Math.exp(-e.deltaY * 0.0015)));
    };
    const leave = () => setHovered(null);

    wrap.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    wrap.addEventListener('pointerleave', leave);
    wrap.addEventListener('wheel', wheel, { passive: false });
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf); ro.disconnect();
      wrap.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      wrap.removeEventListener('pointerleave', leave);
      wrap.removeEventListener('wheel', wheel);
      // this canvas is discarded right after, so freeing its context is safe
      gl?.getExtension('WEBGL_lose_context')?.loseContext();
      bc.remove();
    };
  }, [placed, edges, byId, related, dust, comets, web, groupCenters, wheelZoom, centerY]);

  /* ── fly toward the selected star ── */
  useEffect(() => {
    const c = cam.current;
    if (selected) { const n = byId[selected]; if (n) { c.tfx = n.x * 0.55; c.tfz = n.z * 0.55; c.tZoom = Math.max(c.tZoom, 1.35); } }
    else { c.tfx = 0; c.tfz = 0; }
  }, [selected, byId]);

  useEffect(() => { if (focusId) setSelected(focusId); }, [focusId]);

  const enter = (n: Placed) => {
    const r = wrapRef.current!.getBoundingClientRect();
    onOpen?.(n.id, r.left + n.sx, r.top + n.sy);
  };

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setSelected(null); setIndexOpen(false); }
      // press / anywhere to search, like the video
      if (e.key === '/' && !(e.target as HTMLElement).closest('input, textarea')) { e.preventDefault(); setSelected(null); setIndexOpen(true); setTimeout(() => searchRef.current?.focus(), 30); }
    };
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
  }, []);

  const zoomBy = (f: number) => { const c = cam.current; c.tZoom = Math.max(0.6, Math.min(3, c.tZoom * f)); };
  const reset = () => { const c = cam.current; c.tZoom = 1; c.tElev = 1.05; setSelected(null); };

  const sel = selected ? byId[selected] : null;
  const tipNode = hovered ? byId[hovered] : sel;
  const groupKind = (g: GroupId) => GROUPS.find(x => x.id === g)?.kind ?? '';

  return (
    <div ref={wrapRef} className="galaxy" style={{ height, touchAction: wheelZoom ? 'none' : 'pan-y' }}>
      <canvas ref={starRef} style={{ position: 'absolute', inset: 0 }} />
      <div ref={bhHostRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      {Object.entries(groupCenters).map(([id, g]) => (
        <div key={id} ref={el => (labelRefs.current[id] = el)} className="galaxy-label">
          <div className="galaxy-label-name">{g.label}</div>
          <div className="galaxy-label-count">{g.count} {g.count === 1 ? 'item' : 'items'}</div>
        </div>
      ))}
      {centerLabel && <div ref={centerRef} className="galaxy-center">{centerLabel}</div>}
      <div ref={tipRef} className="galaxy-tip">{tipNode?.label}</div>

      <div className="galaxy-controls" onPointerDown={e => e.stopPropagation()}>
        <button aria-label="Zoom out" onClick={() => zoomBy(0.8)}><Minus size={14} /></button>
        <button aria-label="Zoom in" onClick={() => zoomBy(1.25)}><Plus size={14} /></button>
        <button aria-label="Reset view" onClick={reset}><RotateCcw size={13} /></button>
        {!reduceMotion && (
          <button aria-label={paused ? 'Resume' : 'Pause'} onClick={() => setPaused(p => !p)}>
            {paused ? <Play size={13} /> : <Pause size={13} />}
          </button>
        )}
      </div>
      <p className="galaxy-hint">Drag to orbit · tap a star</p>

      <button className="galaxy-index-btn" onPointerDown={e => e.stopPropagation()}
        onClick={() => { setSelected(null); setIndexOpen(o => !o); setTimeout(() => searchRef.current?.focus(), 30); }}>
        Index
      </button>

      {indexOpen && !sel && (
        <aside className="galaxy-panel" onPointerDown={e => e.stopPropagation()}>
          <button className="galaxy-close" aria-label="Close" onClick={() => setIndexOpen(false)}><X size={15} /></button>
          <p className="galaxy-section" style={{ marginTop: 4 }}>Index</p>
          <label className="galaxy-search">
            <Search size={14} />
            <input ref={searchRef} value={query} onChange={e => setQuery(e.target.value)} placeholder="Search (press / anywhere)" />
          </label>
          {GROUPS.filter(g => groupCenters[g.id]).map(g => {
            const items = placed.filter(n => n.group === g.id && n.label.toLowerCase().includes(query.trim().toLowerCase()));
            if (!items.length) return null;
            return (
              <div key={g.id} className="galaxy-index-group">
                <p>{g.label}</p>
                {items.map(n => <button key={n.id} onClick={() => setSelected(n.id)}>{n.label}{n.sub && <span>{n.sub}</span>}</button>)}
              </div>
            );
          })}
        </aside>
      )}

      {sel && (
        <aside className="galaxy-panel" onPointerDown={e => e.stopPropagation()}>
          <button className="galaxy-close" aria-label="Close" onClick={() => setSelected(null)}><X size={15} /></button>
          <span className="galaxy-chip">{groupKind(sel.group)}</span>
          <h3>{sel.label}</h3>
          {sel.sub && <p className="galaxy-sub">{sel.sub}</p>}
          {sel.desc && <p className="galaxy-desc">{sel.desc}</p>}
          {sel.tags && (
            <div className="galaxy-tags">{sel.tags.map(t => <span key={t}>{t}</span>)}</div>
          )}
          {related[sel.id] && (
            <>
              <p className="galaxy-section">Connected</p>
              <div className="galaxy-links">
                {[...related[sel.id]].map(id => (
                  <button key={id} onClick={() => setSelected(id)}>{byId[id].label}</button>
                ))}
              </div>
            </>
          )}
          <div className="galaxy-actions">
            {sel.route && (onOpen && sel.route.startsWith('/projects/')
              ? <OrbitButton onClick={() => enter(sel)}>Enter</OrbitButton>
              : <OrbitButton onClick={() => navigate(sel.route!)}>Open</OrbitButton>)}
            {sel.href && <OrbitButton href={sel.href} external>{sel.hrefLabel ?? 'Open'}</OrbitButton>}
          </div>
        </aside>
      )}
    </div>
  );
};
