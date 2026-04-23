import { useEffect, useRef, useState, useCallback } from 'react';

// ── CONSTANTS ──────────────────────────────────────────────────────────
const MU_SUN = 1.32712440018e20;
const AU     = 1.495978707e11;
const ACCENT = '#00C9D8';

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
}

const N_UNITS        = 12;
const MIN_SAFE_DIST  = 0.005 * AU;
const MIN_ANG_SEP    = 10 * Math.PI / 180;
const NU_NUDGE       = 0.001;
const RAAN_NUDGE     = 0.05 * Math.PI / 180;
const SOLAR_W        = 1361;

function initUnits(): Unit[] {
  const units: Unit[] = [];
  const step = (2 * Math.PI) / N_UNITS;
  for (let id = 0; id < N_UNITS; id++) {
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
  alive.forEach((u, idx) => { u.raan = idx * step; u.trail = []; });
}

// ── COMPONENT ──────────────────────────────────────────────────────────
export const OSEHSSim = () => {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const stateRef   = useRef<Unit[]>(initUnits());
  const rafRef     = useRef<number>(0);
  const tRef       = useRef(0);
  const lastRef    = useRef(0);

  const [running,  setRunning]  = useState(true);
  const [speed,    setSpeed]    = useState(5);
  const [dayCount, setDayCount] = useState(0);
  const [kpps,     setKpps]     = useState({ alive: N_UNITS, pct: 100, collisions: 0, shadows: 0 });
  const [droplog,  setDroplog]  = useState<string[]>([]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;
    const scale = (W * 0.42) / AU;

    ctx.clearRect(0, 0, W, H);

    // Background
    ctx.fillStyle = '#08090e';
    ctx.fillRect(0, 0, W, H);

    // Stars
    const starSeed = [17, 83, 131, 197, 241, 307, 353, 419, 467, 523, 569, 631, 677, 743, 809, 863, 929];
    for (let s = 0; s < 120; s++) {
      const sx = ((starSeed[s % starSeed.length] * (s + 7) * 31) % W);
      const sy = ((starSeed[s % starSeed.length] * (s + 13) * 17) % H);
      const sr = 0.5 + (s % 3) * 0.4;
      ctx.beginPath();
      ctx.arc(sx, sy, sr, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(255,255,255,${0.2 + (s % 5) * 0.12})`;
      ctx.fill();
    }

    // Orbital ring
    ctx.beginPath();
    ctx.arc(cx, cy, AU * scale, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(0,201,216,0.12)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 8]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Sun
    const sunGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 22);
    sunGrad.addColorStop(0, '#fff7aa');
    sunGrad.addColorStop(0.4, '#ffd700');
    sunGrad.addColorStop(1, 'rgba(255,180,0,0)');
    ctx.beginPath();
    ctx.arc(cx, cy, 22, 0, 2 * Math.PI);
    ctx.fillStyle = sunGrad;
    ctx.fill();
    // Sun glow
    const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 50);
    glowGrad.addColorStop(0, 'rgba(255,200,0,0.15)');
    glowGrad.addColorStop(1, 'rgba(255,200,0,0)');
    ctx.beginPath();
    ctx.arc(cx, cy, 50, 0, 2 * Math.PI);
    ctx.fillStyle = glowGrad;
    ctx.fill();

    const units = stateRef.current;

    // Trails
    for (const u of units) {
      if (!u.alive || u.trail.length < 2) continue;
      for (let t = 1; t < u.trail.length; t++) {
        const alpha = (t / u.trail.length) * 0.35;
        const [x0, y0] = u.trail[t - 1];
        const [x1, y1] = u.trail[t];
        ctx.beginPath();
        ctx.moveTo(cx + x0 * scale, cy - y0 * scale);
        ctx.lineTo(cx + x1 * scale, cy - y1 * scale);
        ctx.strokeStyle = `rgba(0,201,216,${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // Units
    for (const u of units) {
      const [x, y] = coeToXY(u.a, u.e, u.i, u.omega, u.raan, u.nu);
      const px = cx + x * scale;
      const py = cy - y * scale;

      if (!u.alive) {
        // Dead — faint red X
        ctx.strokeStyle = 'rgba(239,68,68,0.5)';
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(px - 5, py - 5); ctx.lineTo(px + 5, py + 5); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(px + 5, py - 5); ctx.lineTo(px - 5, py + 5); ctx.stroke();
        continue;
      }

      const color = u.shadowed ? '#f59e0b' : ACCENT;
      // Glow
      const g = ctx.createRadialGradient(px, py, 0, px, py, 10);
      g.addColorStop(0, color + '80');
      g.addColorStop(1, color + '00');
      ctx.beginPath(); ctx.arc(px, py, 10, 0, 2 * Math.PI);
      ctx.fillStyle = g; ctx.fill();
      // Dot
      ctx.beginPath(); ctx.arc(px, py, 4, 0, 2 * Math.PI);
      ctx.fillStyle = color; ctx.fill();
      // ID
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font = '9px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(String(u.id), px, py - 9);
    }

    // Day counter
    ctx.fillStyle = 'rgba(0,201,216,0.7)';
    ctx.font = '600 12px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Day ${dayCount}`, 12, H - 12);
  }, [dayCount]);

  // Animation loop
  useEffect(() => {
    const DT_SIM = 86400; // 1 day per tick in sim seconds

    const loop = (now: number) => {
      rafRef.current = requestAnimationFrame(loop);
      const elapsed = now - lastRef.current;
      lastRef.current = now;

      if (running) {
        for (let s = 0; s < speed; s++) {
          stepUnits(stateRef.current, DT_SIM);
          tRef.current += DT_SIM;
        }
        const days = Math.floor(tRef.current / 86400);
        setDayCount(days);

        const alive = stateRef.current.filter(u => u.alive);
        const shadows = alive.filter(u => u.shadowed).length;
        let collisions = 0;
        for (let a = 0; a < alive.length; a++) {
          const [ax, ay] = coeToXY(alive[a].a, alive[a].e, alive[a].i, alive[a].omega, alive[a].raan, alive[a].nu);
          for (let b = a + 1; b < alive.length; b++) {
            const [bx, by] = coeToXY(alive[b].a, alive[b].e, alive[b].i, alive[b].omega, alive[b].raan, alive[b].nu);
            if (Math.hypot(ax - bx, ay - by) < MIN_SAFE_DIST) collisions++;
          }
        }
        setKpps({ alive: alive.length, pct: Math.round(100 * alive.length / N_UNITS), collisions, shadows });
      }

      draw();
    };

    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [running, speed, draw]);

  const triggerDropout = () => {
    const alive = stateRef.current.filter(u => u.alive);
    if (alive.length === 0) return;
    const victim = alive[Math.floor(Math.random() * alive.length)];
    victim.alive = false;
    victim.trail = [];
    rebalanceRaan(stateRef.current);
    setDroplog(l => [`Day ${dayCount}: Unit ${victim.id} failed → swarm rebalanced`, ...l].slice(0, 4));
  };

  const reset = () => {
    stateRef.current = initUnits();
    tRef.current = 0;
    setDayCount(0);
    setDroplog([]);
    setKpps({ alive: N_UNITS, pct: 100, collisions: 0, shadows: 0 });
  };

  return (
    <div style={{ marginBottom: 40 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
        <div>
          <p style={{ fontSize: 11, color: 'rgba(240,240,245,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>Live Simulation</p>
          <h3 style={{ fontSize: '1rem', color: '#f0f0f5', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600 }}>OSEHS Swarm — Heliocentric Orbit</h3>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {/* Speed */}
          {[1, 5, 10, 30].map(s => (
            <button key={s} onClick={() => setSpeed(s)} style={{
              padding: '5px 12px', borderRadius: 20, fontSize: 11, cursor: 'pointer', fontWeight: 600,
              border: `1px solid ${speed === s ? ACCENT : 'rgba(255,255,255,0.1)'}`,
              background: speed === s ? `rgba(0,201,216,0.15)` : 'transparent',
              color: speed === s ? ACCENT : 'rgba(240,240,245,0.45)',
              transition: 'all 0.2s',
            }}>{s}×</button>
          ))}
          {/* Play/Pause */}
          <button onClick={() => setRunning(r => !r)} style={{
            padding: '5px 14px', borderRadius: 20, fontSize: 11, cursor: 'pointer', fontWeight: 600,
            border: `1px solid ${ACCENT}`, background: `rgba(0,201,216,0.15)`, color: ACCENT,
          }}>{running ? '⏸ Pause' : '▶ Play'}</button>
        </div>
      </div>

      {/* Canvas */}
      <div style={{ position: 'relative', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(0,201,216,0.2)' }}>
        <canvas ref={canvasRef} width={780} height={420} style={{ display: 'block', width: '100%' }}/>
      </div>

      {/* KPP Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginTop: 12 }}>
        {[
          { label: 'Units Alive', val: `${kpps.alive} / ${N_UNITS}`, ok: kpps.pct >= 90 },
          { label: '% Functional', val: `${kpps.pct}%`,              ok: kpps.pct >= 90 },
          { label: 'Collisions',   val: String(kpps.collisions),      ok: kpps.collisions === 0 },
          { label: 'Shadowed',     val: String(kpps.shadows),         ok: kpps.shadows === 0 },
        ].map(m => (
          <div key={m.label} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: '10px 14px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif', color: m.ok ? ACCENT : '#f87171', marginBottom: 4 }}>{m.val}</div>
            <div style={{ fontSize: 10, color: 'rgba(240,240,245,0.45)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
        <button onClick={triggerDropout} disabled={kpps.alive === 0} style={{
          padding: '8px 18px', borderRadius: 20, fontSize: 12, cursor: 'pointer', fontWeight: 600,
          border: '1px solid rgba(239,68,68,0.4)', background: 'rgba(239,68,68,0.08)', color: '#f87171',
          transition: 'all 0.2s', opacity: kpps.alive === 0 ? 0.4 : 1,
        }}>⚡ Trigger Dropout</button>
        <button onClick={reset} style={{
          padding: '8px 18px', borderRadius: 20, fontSize: 12, cursor: 'pointer', fontWeight: 600,
          border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(240,240,245,0.55)',
        }}>↺ Reset</button>

        {/* Dropout log */}
        {droplog.length > 0 && (
          <div style={{ flex: 1, padding: '8px 14px', borderRadius: 10, background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', fontSize: 11, color: 'rgba(240,240,245,0.55)', lineHeight: 1.7 }}>
            {droplog.map((l, i) => <div key={i}>{l}</div>)}
          </div>
        )}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 20, marginTop: 10, fontSize: 11, color: 'rgba(240,240,245,0.35)', flexWrap: 'wrap' }}>
        <span><span style={{ color: ACCENT }}>●</span> Active unit</span>
        <span><span style={{ color: '#f59e0b' }}>●</span> Shadow-correcting</span>
        <span><span style={{ color: '#f87171' }}>✕</span> Failed (rebalanced)</span>
        <span style={{ marginLeft: 'auto', color: 'rgba(240,240,245,0.2)' }}>1 tick = 1 simulated day</span>
      </div>
    </div>
  );
};
