import { useEffect, useRef, useState } from 'react';

// ── CONSTANTS ──────────────────────────────────────────────────────────
const MU_SUN = 1.32712440018e20;
const AU     = 1.495978707e11;
// site palette: starlight white for healthy units, warm gold while dodging a shadow, muted red when lost
const UNIT = '#f4f5fa';
const WARN = '#ffcf8a';
const LOST = 'rgba(236,140,130,0.6)';

// ── ORBITAL MECHANICS (ported from Python sim) ─────────────────────────
function trueToMean(nu: number, e: number): number {
  const E = 2 * Math.atan2(
    Math.sqrt(1 - e) * Math.sin(nu / 2),
    Math.sqrt(1 + e) * Math.cos(nu / 2),
  );
  return ((E - e * Math.sin(E)) + 2 * Math.PI) % (2 * Math.PI);
}

function meanToTrue(M: number, e: number): number {
  let E = M;
  for (let k = 0; k < 100; k++) {
    const dE = (M - E + e * Math.sin(E)) / (1 - e * Math.cos(E));
    E += dE;
    if (Math.abs(dE) < 1e-12) break;
  }
  return (2 * Math.atan2(
    Math.sqrt(1 + e) * Math.sin(E / 2),
    Math.sqrt(1 - e) * Math.cos(E / 2),
  ) + 2 * Math.PI) % (2 * Math.PI);
}

function propagateNu(a: number, e: number, nu: number, dt: number): number {
  const n  = Math.sqrt(MU_SUN / (a * a * a));
  const M1 = (trueToMean(nu, e) + n * dt) % (2 * Math.PI);
  return meanToTrue(M1, e);
}

function coeToXY(a: number, e: number, i: number, omega: number, raan: number, nu: number): [number, number] {
  const p     = a * (1 - e * e);
  const r_mag = p / (1 + e * Math.cos(nu));

  // PQW frame
  const rx_pqw = r_mag * Math.cos(nu);
  const ry_pqw = r_mag * Math.sin(nu);

  // Rotation matrix PQW -> ECI (rows 0,1 for x,y)
  const ci = Math.cos(i),  si = Math.sin(i);
  const co = Math.cos(omega), so = Math.sin(omega);
  const cr = Math.cos(raan),  sr = Math.sin(raan);

  const x = (cr * co - sr * so * ci) * rx_pqw + (-cr * so - sr * co * ci) * ry_pqw;
  const y = (sr * co + cr * so * ci) * rx_pqw + (-sr * so + cr * co * ci) * ry_pqw;
  return [x, y];
}

function coeTo3D(a: number, e: number, i: number, omega: number, raan: number, nu: number): [number, number, number] {
  const r = (a * (1 - e * e)) / (1 + e * Math.cos(nu));
  const px = r * Math.cos(nu), py = r * Math.sin(nu);
  const ci = Math.cos(i), si = Math.sin(i), co = Math.cos(omega), so = Math.sin(omega), cr = Math.cos(raan), sr = Math.sin(raan);
  return [
    (cr * co - sr * so * ci) * px + (-cr * so - sr * co * ci) * py,
    (sr * co + cr * so * ci) * px + (-sr * so + cr * co * ci) * py,
    (so * si) * px + (co * si) * py,
  ];
}

// ── UNIT STATE ────────────────────────────────────────────────────────
interface Unit {
  id:      number;
  a:       number;
  e:       number;
  i:       number;
  omega:   number;
  raan:    number;
  nu:      number;
  alive:   boolean;
  energy:  number;
  shadowed: boolean;
  trail:   [number, number][];
  target?: number;   // where rebalancing is steering this unit's RAAN
}

const N_DEFAULT      = 20;   // the 20-unit swarm from the NASA ORBIT design
const MIN_SAFE_DIST  = 0.005 * AU;
const MIN_ANG_SEP    = 10 * Math.PI / 180;
const NU_NUDGE       = 0.001;
const RAAN_NUDGE     = 0.05 * Math.PI / 180;
const SOLAR_W        = 1361;

function initUnits(n = N_DEFAULT): Unit[] {
  const units: Unit[] = [];
  const step = (2 * Math.PI) / n;
  for (let id = 0; id < n; id++) {
    units.push({
      id, a: AU, e: 0, i: 5 * Math.PI / 180,
      omega: 0, raan: id * step, nu: 0,
      alive: true, energy: 0, shadowed: false, trail: [],
    });
  }
  return units;
}

function stepUnits(units: Unit[], dt: number) {
  const alive = units.filter(u => u.alive);

  // Propagate positions
  for (const u of alive) {
    u.nu = propagateNu(u.a, u.e, u.nu, dt);
    const r = Math.hypot(...coeToXY(u.a, u.e, u.i, u.omega, u.raan, u.nu));
    u.energy += SOLAR_W * Math.pow(AU / r, 2) * dt;
  }

  // Collision + shadow avoidance
  for (const u of alive) {
    const [ux, uy] = coeToXY(u.a, u.e, u.i, u.omega, u.raan, u.nu);
    u.shadowed = false;
    for (const v of alive) {
      if (v.id === u.id) continue;
      const [vx, vy] = coeToXY(v.a, v.e, v.i, v.omega, v.raan, v.nu);
      const dist = Math.hypot(ux - vx, uy - vy);
      if (dist < MIN_SAFE_DIST) {
        u.nu = (u.nu + (u.nu > v.nu ? NU_NUDGE : -NU_NUDGE) + 2 * Math.PI) % (2 * Math.PI);
      }
      const um = Math.hypot(ux, uy), vm = Math.hypot(vx, vy);
      const dot = (ux * vx + uy * vy) / (um * vm);
      const ang = Math.acos(Math.min(1, Math.max(-1, dot)));
      if (ang < MIN_ANG_SEP) {
        u.shadowed = true;
        const diff = ((u.raan - v.raan + Math.PI) % (2 * Math.PI)) - Math.PI;
        u.raan = (u.raan + (diff >= 0 ? RAAN_NUDGE : -RAAN_NUDGE) + 2 * Math.PI) % (2 * Math.PI);
      }
    }
    // Update trail
    const pos = coeToXY(u.a, u.e, u.i, u.omega, u.raan, u.nu);
    u.trail.push(pos);
    if (u.trail.length > 80) u.trail.shift();
  }
}

function rebalanceRaan(units: Unit[]) {
  const alive = units.filter(u => u.alive);
  const step = (2 * Math.PI) / alive.length;
  // keep each survivor's order, then glide it to the nearest free slot
  const order = [...alive].sort((a, b) => a.raan - b.raan);
  const offset = order[0]?.raan ?? 0;
  order.forEach((u, idx) => { u.target = (offset + idx * step) % (2 * Math.PI); });
}

// ── COMPONENT ──────────────────────────────────────────────────────────
// Drawn the way good orbit explainers do it: a tilted 3D view you can turn, the Sun as a real light,
// hairline orbits, colours that match the words in the caption, and almost no interface.

const C = { gold: '#ffd9a0', amber: '#ffb35c', red: '#ef8a7c', white: '#f4f5fa' };
const W = 780, H = 440, DPR = 2;

export const OSEHSSim = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef  = useRef<Unit[]>(initUnits());
  const lostRef   = useRef<{ p: [number, number, number]; t: number }[]>([]);
  const cam       = useRef({ yaw: -0.5, pitch: 0.36 });
  const live      = useRef({ running: true, speed: 4, selected: null as number | null });

  const [running, setRunning] = useState(true);
  const [speed, setSpeed]     = useState(4);
  const [count, setCount]     = useState(N_DEFAULT);
  const [alive, setAlive]     = useState(N_DEFAULT);
  const [healing, setHealing] = useState(false);
  const [day, setDay]         = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  live.current.running = running; live.current.speed = speed; live.current.selected = selected;

  const reset = (n = count) => {
    stateRef.current = initUnits(n);
    lostRef.current = [];
    setSelected(null); setAlive(n); setDay(0);
  };

  const knockOut = () => {
    const pool = stateRef.current.filter(u => u.alive);
    if (pool.length <= 2) return;
    const v = pool[Math.floor(Math.random() * pool.length)];
    lostRef.current.push({ p: coeTo3D(v.a, v.e, v.i, v.omega, v.raan, v.nu), t: performance.now() });
    v.alive = false; v.trail = [];
    if (selected === v.id) setSelected(null);
    rebalanceRaan(stateRef.current);
    setRunning(true);
  };

  useEffect(() => {
    const cv = canvasRef.current!; const ctx = cv.getContext('2d')!;
    cv.width = W * DPR; cv.height = H * DPR;
    let raf = 0, days = 0, frame = 0;

    // camera: turn about the Sun (yaw), then look down at the orbit plane (pitch)
    const f = 236, cx = W / 2, cy = H / 2 + 4;
    const proj = (x: number, y: number, z: number) => {
      const { yaw, pitch } = cam.current;
      const x1 = x * Math.cos(yaw) - y * Math.sin(yaw), y1 = x * Math.sin(yaw) + y * Math.cos(yaw);
      const sp = Math.sin(pitch), cp = Math.cos(pitch);
      return { sx: cx + f * x1, sy: cy + f * (y1 * sp - z * cp * 1.8), depth: y1 * cp + z * sp };  // tilt drawn 1.8× so it reads
    };
    const P = (v: [number, number, number]) => proj(v[0] / AU, v[1] / AU, v[2] / AU);

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const L = live.current;
      const units = stateRef.current;

      // ── simulate
      if (L.running) {
        let moving = false;
        for (const u of units) {
          if (!u.alive || u.target === undefined) continue;
          const d = ((u.target - u.raan + 3 * Math.PI) % (2 * Math.PI)) - Math.PI;
          if (Math.abs(d) < 0.002) { u.raan = u.target; u.target = undefined; continue; }
          u.raan = (u.raan + d * 0.035 + 2 * Math.PI) % (2 * Math.PI); moving = true;
        }
        for (let s = 0; s < L.speed; s++) stepUnits(units, 86400);
        days += L.speed;
        if (++frame % 6 === 0) {
          setDay(days); setHealing(moving); setAlive(units.filter(u => u.alive).length);
        }
      }

      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.fillStyle = '#020307'; ctx.fillRect(0, 0, W, H);

      // the orbital plane, barely there
      ctx.beginPath();
      for (let k = 0; k <= 96; k++) { const a = (k / 96) * Math.PI * 2; const q = proj(Math.cos(a) * 1.08, Math.sin(a) * 1.08, 0); if (k) ctx.lineTo(q.sx, q.sy); else ctx.moveTo(q.sx, q.sy); }
      ctx.fillStyle = 'rgba(255,217,160,0.035)'; ctx.fill();

      // each satellite's own orbit: tilted 5°, turned to its own node, so together they weave
      const ring = (u: Unit, front: boolean, color: string) => {
        ctx.beginPath(); let on = false;
        for (let k = 0; k <= 120; k++) {
          const q = P(coeTo3D(u.a, u.e, u.i, u.omega, u.raan, (k / 120) * Math.PI * 2));
          const show = front ? q.depth < 0 : q.depth >= 0;
          if (show) { if (on) ctx.lineTo(q.sx, q.sy); else { ctx.moveTo(q.sx, q.sy); on = true; } } else on = false;
        }
        ctx.strokeStyle = color; ctx.stroke();
      };
      ctx.lineWidth = 0.7;
      for (const u of units) if (u.alive) ring(u, false, u.id === L.selected ? 'rgba(255,217,160,0.5)' : 'rgba(255,217,160,0.08)');

      // satellites behind the Sun
      const dots = units.filter(u => u.alive).map(u => ({ u, q: P(coeTo3D(u.a, u.e, u.i, u.omega, u.raan, u.nu)) }));
      const drawDot = ({ u, q }: { u: Unit; q: { sx: number; sy: number } }) => {
        const col = u.target !== undefined ? C.amber : u.shadowed ? C.amber : C.white;
        const g = ctx.createRadialGradient(q.sx, q.sy, 0, q.sx, q.sy, 7);
        g.addColorStop(0, col === C.white ? 'rgba(255,240,215,0.55)' : 'rgba(255,179,92,0.6)'); g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(q.sx, q.sy, 7, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = col; ctx.beginPath(); ctx.arc(q.sx, q.sy, 2.1, 0, Math.PI * 2); ctx.fill();
        if (u.id === L.selected) { ctx.strokeStyle = C.gold; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(q.sx, q.sy, 7, 0, Math.PI * 2); ctx.stroke(); }
        // where it's gliding to while the swarm re-spaces
        if (u.target !== undefined) {
          const t = P(coeTo3D(u.a, u.e, u.i, u.omega, u.target, u.nu));
          ctx.strokeStyle = 'rgba(255,179,92,0.45)'; ctx.setLineDash([2, 3]); ctx.lineWidth = 0.8;
          ctx.beginPath(); ctx.arc(t.sx, t.sy, 4.5, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
        }
      };
      dots.filter(d => d.q.depth >= 0).forEach(drawDot);

      // the Sun: a hot core, limb-darkened disc and a soft corona
      const sun = proj(0, 0, 0), R = 17;
      const corona = ctx.createRadialGradient(sun.sx, sun.sy, R * 0.6, sun.sx, sun.sy, R * 6);
      corona.addColorStop(0, 'rgba(255,190,110,0.35)'); corona.addColorStop(0.35, 'rgba(255,150,70,0.08)'); corona.addColorStop(1, 'rgba(255,140,60,0)');
      ctx.fillStyle = corona; ctx.beginPath(); ctx.arc(sun.sx, sun.sy, R * 6, 0, Math.PI * 2); ctx.fill();
      const disc = ctx.createRadialGradient(sun.sx - R * 0.15, sun.sy - R * 0.15, 0, sun.sx, sun.sy, R);
      disc.addColorStop(0, '#fffaf0'); disc.addColorStop(0.55, '#ffe2a8'); disc.addColorStop(0.9, '#ffab55'); disc.addColorStop(1, '#e8772e');
      ctx.fillStyle = disc; ctx.beginPath(); ctx.arc(sun.sx, sun.sy, R, 0, Math.PI * 2); ctx.fill();

      // front halves of the orbits and the satellites in front of the Sun
      ctx.lineWidth = 0.7;
      for (const u of units) if (u.alive) ring(u, true, u.id === L.selected ? 'rgba(255,217,160,0.85)' : 'rgba(255,217,160,0.16)');
      dots.filter(d => d.q.depth < 0).forEach(drawDot);

      // where satellites were lost: a red mark that fades
      lostRef.current = lostRef.current.filter(l => now - l.t < 6000);
      for (const l of lostRef.current) {
        const q = P(l.p), age = (now - l.t) / 6000;
        ctx.strokeStyle = `rgba(239,138,124,${0.9 * (1 - age)})`; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(q.sx - 4, q.sy - 4); ctx.lineTo(q.sx + 4, q.sy + 4); ctx.moveTo(q.sx + 4, q.sy - 4); ctx.lineTo(q.sx - 4, q.sy + 4); ctx.stroke();
        ctx.beginPath(); ctx.arc(q.sx, q.sy, 6 + age * 26, 0, Math.PI * 2); ctx.lineWidth = 0.8; ctx.stroke();
      }

      // a single quiet label
      ctx.fillStyle = 'rgba(240,240,245,0.35)'; ctx.font = '11px "JetBrains Mono", monospace'; ctx.textAlign = 'right';
      ctx.fillText(`day ${days.toLocaleString()}`, W - 18, H - 18);
      ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(255,217,160,0.55)';
      ctx.fillText('Sun', sun.sx, sun.sy + R + 18);
    };
    raf = requestAnimationFrame(loop);

    // drag to turn the view, click to pick a satellite
    let down: { x: number; y: number; yaw: number; pitch: number } | null = null, moved = 0;
    const onDown = (e: PointerEvent) => { down = { x: e.clientX, y: e.clientY, ...cam.current }; moved = 0; cv.setPointerCapture(e.pointerId); };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      moved = Math.abs(e.clientX - down.x) + Math.abs(e.clientY - down.y);
      cam.current.yaw = down.yaw + (e.clientX - down.x) * 0.008;
      cam.current.pitch = Math.max(0.12, Math.min(1.35, down.pitch + (e.clientY - down.y) * 0.006));
    };
    const onUp = (e: PointerEvent) => {
      if (down && moved < 5) {
        const r = cv.getBoundingClientRect();
        const mx = (e.clientX - r.left) * (W / r.width), my = (e.clientY - r.top) * (H / r.height);
        let best: number | null = null, bd = 14 * 14;
        for (const u of stateRef.current) {
          if (!u.alive) continue;
          const q = P(coeTo3D(u.a, u.e, u.i, u.omega, u.raan, u.nu));
          const d = (q.sx - mx) ** 2 + (q.sy - my) ** 2;
          if (d < bd) { bd = d; best = u.id; }
        }
        setSelected(best);
      }
      down = null;
    };
    cv.addEventListener('pointerdown', onDown); cv.addEventListener('pointermove', onMove); cv.addEventListener('pointerup', onUp);
    return () => { cancelAnimationFrame(raf); cv.removeEventListener('pointerdown', onDown); cv.removeEventListener('pointermove', onMove); cv.removeEventListener('pointerup', onUp); };
  }, []);

  const spacing = alive ? (360 / alive).toFixed(1) : '—';
  const sel = selected !== null ? stateRef.current.find(u => u.id === selected) : null;
  const deg = (r: number) => ((r * 180 / Math.PI + 360) % 360).toFixed(0);

  return (
    <figure className="orbit-fig">
      <figcaption className="arch-head"><span>Figure 1</span> The swarm, in orbit around the Sun</figcaption>

      <div className="orbit-stage">
        <canvas ref={canvasRef} style={{ width: '100%', height: 'auto', display: 'block', cursor: 'grab', touchAction: 'none' }} />
        <button className="orbit-pause" onClick={() => setRunning(r => !r)} aria-label={running ? 'Pause' : 'Play'}>
          {running
            ? <svg viewBox="0 0 12 12" width="12" height="12"><rect x="2" y="1.5" width="2.6" height="9" rx="0.6" fill="currentColor" /><rect x="7.4" y="1.5" width="2.6" height="9" rx="0.6" fill="currentColor" /></svg>
            : <svg viewBox="0 0 12 12" width="12" height="12"><path d="M3 1.5 L10.5 6 L3 10.5 Z" fill="currentColor" /></svg>}
        </button>
      </div>

      <div className="orbit-sliders">
        <label style={{ '--c': C.gold } as React.CSSProperties}>
          <span>satellites = {count}</span>
          <input type="range" min={6} max={30} value={count} onChange={e => { const n = +e.target.value; setCount(n); reset(n); }} />
        </label>
        <label style={{ '--c': C.white } as React.CSSProperties}>
          <span>days per frame = {speed}</span>
          <input type="range" min={1} max={20} value={speed} onChange={e => setSpeed(+e.target.value)} />
        </label>
      </div>

      <p className="orbit-caption">
        <span className="c-gold">{count === 20 ? 'Twenty' : count} satellites</span> share one orbit around the Sun, each on its own slightly
        tilted path. None of them talk to the ground; each only gossips with its neighbours.{' '}
        <button className="orbit-act" onClick={knockOut}>Knock one out</button> and it is marked in <span className="c-red">red</span>; the survivors
        agree on new slots and glide into them in <span className="c-amber">amber</span> until the spacing is even again.{' '}
        <button className="orbit-act" onClick={() => reset()}>Start over</button>.
      </p>
      <p className="orbit-status">
        {alive} of {count} working, {spacing}° apart{healing ? <>, <span className="c-amber">re-spacing now</span></> : ''}.
        {sel
          ? <> Satellite {sel.id + 1}: node at {deg(sel.raan)}°, {deg(sel.i)}° tilt, {(sel.energy / 1e9).toFixed(1)} GJ/m² of sunlight collected.</>
          : <> Drag to turn the view; click a satellite to trace its orbit.</>}
      </p>
    </figure>
  );
};
