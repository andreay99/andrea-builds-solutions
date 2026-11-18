import { useEffect, useRef, useState, useCallback } from 'react';

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
export const OSEHSSim = () => {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const stateRef   = useRef<Unit[]>(initUnits());
  const victimRef  = useRef<{ id: number; x: number; y: number; t: number } | null>(null);
  const rafRef     = useRef<number>(0);
  const tRef       = useRef(0);
  const lastRef    = useRef(0);

  const [running,  setRunning]  = useState(true);
  const [speed,    setSpeed]    = useState(5);
  const [dayCount, setDayCount] = useState(0);
  const [count,    setCount]    = useState(N_DEFAULT);
  const [kpps,     setKpps]     = useState({ alive: N_DEFAULT, pct: 100, collisions: 0, shadows: 0 });
  const [selected, setSelected] = useState<number | null>(null);
  const [step,     setStep]     = useState(0);
  const [healing,  setHealing]  = useState(false);
  const [droplog,  setDroplog]  = useState<string[]>([]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;
    const scale = (Math.min(W, H) * 0.44) / AU;

    ctx.clearRect(0, 0, W, H);

    // Background
    ctx.fillStyle = '#030409';
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
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
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

    // while healing, show the free slots the survivors are gliding into
    for (const u of units) {
      if (!u.alive || u.target === undefined) continue;
      const [gx, gy] = coeToXY(u.a, u.e, u.i, u.omega, u.target, u.nu);
      ctx.beginPath(); ctx.arc(cx + gx * scale, cy - gy * scale, 7, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(255,217,160,0.35)'; ctx.setLineDash([2, 3]); ctx.lineWidth = 1; ctx.stroke(); ctx.setLineDash([]);
    }
    // a ring pulses where the last satellite was lost
    const vic = victimRef.current;
    if (vic) {
      const age = (performance.now() - vic.t) / 1000;
      if (age < 3) {
        ctx.beginPath(); ctx.arc(vic.x, vic.y, 8 + age * 14, 0, 2 * Math.PI);
        ctx.strokeStyle = `rgba(236,140,130,${0.7 * (1 - age / 3)})`; ctx.lineWidth = 1; ctx.stroke();
      }
    }

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
        ctx.strokeStyle = `rgba(255,225,180,${alpha})`;
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
        ctx.strokeStyle = LOST;
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(px - 5, py - 5); ctx.lineTo(px + 5, py + 5); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(px + 5, py - 5); ctx.lineTo(px - 5, py + 5); ctx.stroke();
        continue;
      }

      const color = u.shadowed ? WARN : UNIT;
      // Glow
      const g = ctx.createRadialGradient(px, py, 0, px, py, 10);
      g.addColorStop(0, color + '80');
      g.addColorStop(1, color + '00');
      ctx.beginPath(); ctx.arc(px, py, 10, 0, 2 * Math.PI);
      ctx.fillStyle = g; ctx.fill();
      // Dot
      ctx.beginPath(); ctx.arc(px, py, 4, 0, 2 * Math.PI);
      ctx.fillStyle = color; ctx.fill();
      if (u.id === selected) {
        ctx.beginPath(); ctx.arc(px, py, 11, 0, 2 * Math.PI);
        ctx.strokeStyle = 'rgba(255,217,160,0.9)'; ctx.lineWidth = 1; ctx.stroke();
      }
      // ID
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(String(u.id), px, py - 9);
    }

    // Day counter
    ctx.fillStyle = 'rgba(240,240,245,0.55)';
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`DAY ${String(dayCount).padStart(4, '0')}`, 14, H - 14);

    // mission-control readouts in the corners
    const aliveN = units.filter(u => u.alive).length;
    ctx.fillStyle = 'rgba(240,240,245,0.4)';
    ctx.fillText('OSEHS · HELIOCENTRIC · 1 AU', 14, 22);
    ctx.textAlign = 'right';
    ctx.fillText(`a 1.000 AU   i 5.0°   T 365.25 d`, W - 14, 22);
    ctx.fillText(`SPACING ${aliveN ? (360 / aliveN).toFixed(1) : '—'}°   ${healing ? 'REBALANCING' : 'NOMINAL'}`, W - 14, H - 14);
  }, [dayCount, selected, healing]);

  // Animation loop
  useEffect(() => {
    const DT_SIM = 86400; // 1 day per tick in sim seconds

    const loop = (now: number) => {
      rafRef.current = requestAnimationFrame(loop);
      const elapsed = now - lastRef.current;
      lastRef.current = now;

      if (running) {
        // survivors glide toward their new slots instead of teleporting
        let moving = false;
        for (const u of stateRef.current) {
          if (!u.alive || u.target === undefined) continue;
          const d = ((u.target - u.raan + 3 * Math.PI) % (2 * Math.PI)) - Math.PI;
          if (Math.abs(d) < 0.002) { u.raan = u.target; u.target = undefined; continue; }
          u.raan = (u.raan + d * 0.04 + 2 * Math.PI) % (2 * Math.PI); moving = true;
        }
        setHealing(moving);
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
        setKpps({ alive: alive.length, pct: Math.round(100 * alive.length / stateRef.current.length), collisions, shadows });
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
    const canvas = canvasRef.current;
    if (canvas) {
      const [x, y] = coeToXY(victim.a, victim.e, victim.i, victim.omega, victim.raan, victim.nu);
      const scale = (Math.min(canvas.width, canvas.height) * 0.44) / AU;
      victimRef.current = { id: victim.id, x: canvas.width / 2 + x * scale, y: canvas.height / 2 - y * scale, t: performance.now() };
    }
    victim.alive = false;
    victim.trail = [];
    if (selected === victim.id) setSelected(null);
    rebalanceRaan(stateRef.current);
    setDroplog(l => [`Day ${dayCount}: Unit ${victim.id} failed → swarm rebalanced`, ...l].slice(0, 4));
  };

  const reset = (n = count) => {
    stateRef.current = initUnits(n);
    victimRef.current = null;
    tRef.current = 0;
    setDayCount(0);
    setDroplog([]);
    setSelected(null);
    setKpps({ alive: n, pct: 100, collisions: 0, shadows: 0 });
  };

  const metrics = [
    { val: `${kpps.alive}/${count}`, label: 'Units alive', ok: kpps.alive === count },
    { val: `${kpps.pct}%`, label: 'Functional', ok: kpps.pct >= 80 },
    { val: String(kpps.collisions), label: 'Collisions', ok: kpps.collisions === 0 },
    { val: String(kpps.shadows), label: 'Dodging shadows', ok: true },
  ];

  // explorable steps: each one puts the simulation into the state it describes
  const STEPS = [
    { title: 'Hold formation', body: 'Every satellite sits in its own slot around the Sun. Nobody talks to the ground; each one only gossips with its neighbours.',
      run: () => { reset(); setRunning(true); } },
    { title: 'Lose one', body: 'A satellite fails. The red ring marks where it was, and for a moment there is a gap in the necklace.',
      run: () => { setRunning(true); triggerDropout(); } },
    { title: 'Heal itself', body: 'The survivors agree on new slots and glide into them, dashed rings show where each is heading. No central controller involved.',
      run: () => { setRunning(true); if (kpps.alive === count) triggerDropout(); } },
    { title: 'Your turn', body: 'Drag the numbers below, knock out as many as you like, and click any satellite to read its orbit.',
      run: () => setRunning(true) },
  ];

  const sel = selected !== null ? stateRef.current.find(u => u.id === selected) : null;
  const deg = (r: number) => ((r * 180 / Math.PI + 360) % 360).toFixed(1);

  const pick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const c = canvasRef.current; if (!c) return;
    const r = c.getBoundingClientRect();
    const mx = (e.clientX - r.left) * (c.width / r.width), my = (e.clientY - r.top) * (c.height / r.height);
    const scale = (Math.min(c.width, c.height) * 0.44) / AU;
    let best: number | null = null, bd = 18 * 18;
    for (const u of stateRef.current) {
      if (!u.alive) continue;
      const [x, y] = coeToXY(u.a, u.e, u.i, u.omega, u.raan, u.nu);
      const d = (c.width / 2 + x * scale - mx) ** 2 + (c.height / 2 - y * scale - my) ** 2;
      if (d < bd) { bd = d; best = u.id; }
    }
    setSelected(best);
  };

  return (
    <div className="sim">
      <div className="sim-head">
        <div>
          <p className="sim-kicker">Live simulation</p>
          <h3 className="sim-title">The swarm, in orbit around the Sun</h3>
        </div>
        <button className="sim-toggle" onClick={() => setRunning(r => !r)}>{running ? '[ Pause ]' : '[ Play ]'}</button>
      </div>

      <ol className="sim-steps">
        {STEPS.map((st, i) => (
          <li key={st.title}>
            <button className={step === i ? 'on' : undefined} onClick={() => { setStep(i); st.run(); }}>
              <span>{String(i + 1).padStart(2, '0')}</span>{st.title}
            </button>
          </li>
        ))}
      </ol>
      <p className="sim-story">{STEPS[step].body}</p>

      <div className="sim-canvas">
        <canvas ref={canvasRef} width={780} height={420} onClick={pick} />
      </div>

      <div className="sim-metrics">
        {metrics.map(m => (
          <div key={m.label}>
            <b className={m.ok ? undefined : 'bad'}>{m.val}</b>
            <span>{m.label}</span>
          </div>
        ))}
      </div>

      <p className="sim-sentence">
        Space <Scrub value={count} min={6} max={30} onChange={n => { setCount(n); reset(n); }} /> satellites evenly around the Sun
        and run time at <Scrub value={speed} min={1} max={30} onChange={setSpeed} suffix="×" /> speed.
      </p>

      <div className="sim-actions">
        <button onClick={() => { setStep(3); triggerDropout(); }} disabled={kpps.alive === 0}>Knock out a satellite</button>
        <button onClick={() => reset()}>Reset</button>
        <span className="sim-legend">
          <i style={{ background: UNIT }} /> healthy
          <i style={{ background: WARN }} /> dodging a shadow
          <i className="x" /> lost
        </span>
      </div>

      {sel && (
        <p className="sim-readout">
          SAT {String(sel.id).padStart(2, '0')} · RAAN {deg(sel.raan)}° · TRUE ANOMALY {deg(sel.nu)}° · INCLINATION {deg(sel.i)}° · ENERGY {(sel.energy / 1e9).toFixed(2)} GJ/m²
          <button onClick={() => setSelected(null)}>clear</button>
        </p>
      )}
      {droplog.length > 0 && (
        <div className="sim-log">{droplog.map((l, i) => <div key={i}>{l}</div>)}</div>
      )}
    </div>
  );
};

/** A number you change by dragging left or right (or with the arrow keys), Bret Victor style. */
function Scrub({ value, min, max, onChange, suffix = '' }: { value: number; min: number; max: number; onChange: (n: number) => void; suffix?: string }) {
  const start = useRef<{ x: number; v: number } | null>(null);
  const set = (n: number) => onChange(Math.max(min, Math.min(max, Math.round(n))));
  return (
    <span className="scrub" role="slider" tabIndex={0} aria-valuemin={min} aria-valuemax={max} aria-valuenow={value}
      title="Drag left or right"
      onPointerDown={e => { (e.target as HTMLElement).setPointerCapture(e.pointerId); start.current = { x: e.clientX, v: value }; }}
      onPointerMove={e => { if (start.current) { const n = start.current.v + (e.clientX - start.current.x) / 8; if (Math.round(n) !== value) set(n); } }}
      onPointerUp={() => { start.current = null; }}
      onKeyDown={e => { if (e.key === 'ArrowRight' || e.key === 'ArrowUp') set(value + 1); if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') set(value - 1); }}>
      {value}{suffix}
    </span>
  );
}
