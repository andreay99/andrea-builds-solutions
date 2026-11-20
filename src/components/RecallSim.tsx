import { useEffect, useMemo, useRef, useState } from 'react';
import { Scrub } from '@/components/Scrub';

/* How Recall decides who you're looking at: every face becomes a point (an embedding), and a
   new face is matched to the nearest person only if it's close enough. Drag the new face around,
   and drag the threshold to see precision trade off against false matches.
   The points are illustrative, generated here, not real faces. */

const PEOPLE = ['Maya', 'Jonah', 'Priya', 'Leo', 'Ana'];
const CENTERS: [number, number][] = [[0.28, 0.33], [0.62, 0.23], [0.53, 0.52], [0.3, 0.53], [0.78, 0.43]];
const THRESHOLDS = Array.from({ length: 39 }, (_, i) => +(0.02 + i * 0.01).toFixed(2));

const rng = (seed: number) => () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
const gauss = (r: () => number) => Math.sqrt(-2 * Math.log(r() + 1e-9)) * Math.cos(2 * Math.PI * r());

interface Pt { x: number; y: number; who: number } // who = -1 for strangers

// The embedding space is drawn as a brain seen from the side (front to the right).
// Every face you've met is a memory somewhere inside it.
const OUTLINE: [number, number][] = [
  [0.08, 0.5], [0.1, 0.34], [0.18, 0.2], [0.32, 0.11], [0.5, 0.08], [0.66, 0.11], [0.8, 0.19], [0.9, 0.31],
  [0.94, 0.45], [0.9, 0.57], [0.8, 0.63], [0.7, 0.62], [0.66, 0.7], [0.58, 0.77], [0.46, 0.78], [0.36, 0.72],
  [0.26, 0.67], [0.16, 0.63],
];
// a smooth closed curve through the outline points (Catmull-Rom)
const BRAIN: [number, number][] = (() => {
  const out: [number, number][] = [], n = OUTLINE.length;
  for (let i = 0; i < n; i++) {
    const p0 = OUTLINE[(i - 1 + n) % n], p1 = OUTLINE[i], p2 = OUTLINE[(i + 1) % n], p3 = OUTLINE[(i + 2) % n];
    for (let k = 0; k < 12; k++) {
      const t = k / 12, t2 = t * t, t3 = t2 * t;
      out.push([0, 1].map(j => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3)) as [number, number]);
    }
  }
  return out;
})();
const inPoly = (x: number, y: number) => {
  let inside = false;
  for (let i = 0, j = BRAIN.length - 1; i < BRAIN.length; j = i++) {
    const [xi, yi] = BRAIN[i], [xj, yj] = BRAIN[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
};
// inside, with a little margin from the edge
const insideBrain = (x: number, y: number, m = 0.025) => inPoly(x, y) && inPoly(x + m, y) && inPoly(x - m, y) && inPoly(x, y + m) && inPoly(x, y - m);

const makeData = () => {
  const r = rng(11);
  const pts: Pt[] = [];
  CENTERS.forEach(([cx, cy], who) => {
    for (let i = 0; i < 24;) {
      const x = cx + gauss(r) * 0.05, y = cy + gauss(r) * 0.05;
      if (insideBrain(x, y)) { pts.push({ x, y, who }); i++; }
    }
  });
  // strangers: in a real embedding space most unfamiliar faces land far from anyone you know…
  for (let n = 0, tries = 0; n < 44 && tries < 40000; tries++) {
    const x = r(), y = r();
    if (insideBrain(x, y) && CENTERS.every(([cx, cy]) => Math.hypot(x - cx, y - cy) > 0.15)) { pts.push({ x, y, who: -1 }); n++; }
  }
  // …but a few lookalikes sit just outside someone's cluster, which is what a loose threshold lets in
  CENTERS.forEach(([cx, cy], i) => {
    for (let k = 0; k < 2; k++) {
      const a = r() * Math.PI * 2, d = 0.12 + r() * 0.04;
      const x = cx + Math.cos(a + i) * d, y = cy + Math.sin(a + i) * d;
      if (insideBrain(x, y)) pts.push({ x, y, who: -1 });
    }
  });
  return pts;
};

const nearest = (x: number, y: number) => {
  let best = 0, bd = Infinity;
  CENTERS.forEach(([cx, cy], i) => { const d = Math.hypot(x - cx, y - cy); if (d < bd) { bd = d; best = i; } });
  return { who: best, d: bd };
};

const score = (pts: Pt[], t: number) => {
  let tp = 0, fp = 0, known = 0, strangers = 0, falseAccept = 0;
  for (const p of pts) {
    const m = nearest(p.x, p.y);
    if (p.who >= 0) { known++; if (m.d < t) { if (m.who === p.who) tp++; else fp++; } }
    else { strangers++; if (m.d < t) { fp++; falseAccept++; } }
  }
  return { precision: tp + fp ? tp / (tp + fp) : 1, recall: tp / known, fmr: falseAccept / strangers };
};

export const RecallSim = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const data = useMemo(makeData, []);
  // folds: shrunken echoes of the outline that wobble like gyri
  const folds = useMemo(() => {
    const cx = 0.52, cy = 0.43;
    return [0.82, 0.64, 0.46, 0.3].map((k, ring) => BRAIN.map(([x, y], i): [number, number] => {
      const w = 1 + 0.07 * Math.sin(i * (0.9 + ring * 0.25) + ring * 2);
      return [cx + (x - cx) * k * w, cy + (y - cy) * k * w];
    }));
  }, []);
  const curve = useMemo(() => THRESHOLDS.map(t => ({ t, ...score(data, t) })), [data]);
  // the tuned operating point: catch as many faces as possible while keeping precision high and false matches rare
  const tuned = useMemo(() => {
    const ok = curve.filter(c => c.precision >= 0.94 && c.fmr < 0.02);
    return (ok.length ? ok.reduce((a, b) => (b.recall > a.recall ? b : a)) : curve[8]).t;
  }, [curve]);
  const [t, setT] = useState(tuned);
  const [probe, setProbe] = useState({ x: 0.6, y: 0.47 });
  const dragging = useRef(false);
  const m = score(data, t);
  const match = nearest(probe.x, probe.y);
  const live = useRef({ t, probe });
  live.current = { t, probe };

  useEffect(() => {
    const c = canvasRef.current!; const ctx = c.getContext('2d')!;
    const W = c.width, H = c.height;
    let raf = 0;
    const S = 380, ox = 30, oy = 22;                        // map square
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const { t, probe } = live.current;
      ctx.fillStyle = '#030409'; ctx.fillRect(0, 0, W, H);
      const X = (u: number) => ox + u * S, Y = (v: number) => oy + v * S;
      const brainPath = () => {
        ctx.beginPath();
        BRAIN.forEach(([u, v], i) => (i ? ctx.lineTo(X(u), Y(v)) : ctx.moveTo(X(u), Y(v))));
        ctx.closePath();
      };
      // brainstem and cerebellum, tucked underneath and behind
      ctx.strokeStyle = 'rgba(240,240,245,0.22)'; ctx.fillStyle = '#05060c';
      ctx.beginPath(); ctx.moveTo(X(0.44), Y(0.72)); ctx.quadraticCurveTo(X(0.45), Y(0.86), X(0.41), Y(0.97));
      ctx.lineTo(X(0.49), Y(0.97)); ctx.quadraticCurveTo(X(0.52), Y(0.86), X(0.53), Y(0.74)); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(X(0.27), Y(0.73), 0.13 * S, 0.08 * S, -0.1, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.save(); ctx.beginPath(); ctx.ellipse(X(0.27), Y(0.73), 0.13 * S, 0.08 * S, -0.1, 0, Math.PI * 2); ctx.clip();
      ctx.strokeStyle = 'rgba(240,240,245,0.12)';
      for (let k = -3; k <= 3; k++) { ctx.beginPath(); ctx.ellipse(X(0.27), Y(0.73 + k * 0.022), 0.14 * S, 0.03 * S, -0.1, 0.1, Math.PI - 0.1); ctx.stroke(); }
      ctx.restore();
      // cortex
      brainPath(); ctx.fillStyle = '#06070e'; ctx.fill();
      ctx.strokeStyle = 'rgba(240,240,245,0.38)'; ctx.lineWidth = 1.3; ctx.stroke(); ctx.lineWidth = 1;
      ctx.save(); brainPath(); ctx.clip();
      ctx.strokeStyle = 'rgba(240,240,245,0.09)';
      for (const f of folds) { ctx.beginPath(); f.forEach(([u, v], k) => (k ? ctx.lineTo(X(u), Y(v)) : ctx.moveTo(X(u), Y(v)))); ctx.closePath(); ctx.stroke(); }
      ctx.strokeStyle = 'rgba(240,240,245,0.2)';
      // central sulcus and lateral fissure
      ctx.beginPath(); ctx.moveTo(X(0.55), Y(0.08)); ctx.bezierCurveTo(X(0.5), Y(0.22), X(0.56), Y(0.34), X(0.5), Y(0.5)); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(X(0.38), Y(0.66)); ctx.bezierCurveTo(X(0.5), Y(0.56), X(0.62), Y(0.58), X(0.76), Y(0.5)); ctx.stroke();
      ctx.restore();
      ctx.font = '10.5px "JetBrains Mono", monospace';

      // each person is a memory: a soft glow, brighter when it's being recalled
      const recalled = (() => { const q = nearest(probe.x, probe.y); return q.d < t ? q.who : -1; })();
      CENTERS.forEach(([cx, cy], i) => {
        const g = ctx.createRadialGradient(X(cx), Y(cy), 0, X(cx), Y(cy), 0.11 * S);
        g.addColorStop(0, `rgba(255,217,160,${i === recalled ? 0.32 : 0.1})`); g.addColorStop(1, 'rgba(255,217,160,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(X(cx), Y(cy), 0.11 * S, 0, Math.PI * 2); ctx.fill();
      });
      // acceptance radius around each person
      CENTERS.forEach(([cx, cy], i) => {
        ctx.beginPath(); ctx.arc(ox + cx * S, oy + cy * S, t * S, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,217,160,0.04)'; ctx.fill();
        ctx.setLineDash([3, 4]); ctx.strokeStyle = 'rgba(255,217,160,0.35)'; ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = 'rgba(240,240,245,0.6)'; ctx.textAlign = 'center';
        ctx.fillText(PEOPLE[i], ox + cx * S, oy + cy * S - t * S - 6);
      });
      // known faces and strangers
      for (const p of data) {
        const x = ox + p.x * S, y = oy + p.y * S;
        if (p.who >= 0) { ctx.fillStyle = 'rgba(244,245,250,0.8)'; ctx.beginPath(); ctx.arc(x, y, 2.2, 0, Math.PI * 2); ctx.fill(); }
        else {
          const inside = nearest(p.x, p.y).d < t;
          ctx.strokeStyle = inside ? 'rgba(236,120,105,0.9)' : 'rgba(240,240,245,0.25)';
          ctx.lineWidth = 1; ctx.beginPath();
          ctx.moveTo(x - 2.5, y - 2.5); ctx.lineTo(x + 2.5, y + 2.5); ctx.moveTo(x + 2.5, y - 2.5); ctx.lineTo(x - 2.5, y + 2.5); ctx.stroke();
        }
      }
      // the new face
      const mm = nearest(probe.x, probe.y), hit = mm.d < t;
      const px = ox + probe.x * S, py = oy + probe.y * S;
      const [cx, cy] = CENTERS[mm.who];
      // a curved nerve from the new face to the memory; a pulse travels along it on a match
      const ex = ox + cx * S, ey = oy + cy * S;
      const qx = (px + ex) / 2 + (ey - py) * 0.3, qy = (py + ey) / 2 - (ex - px) * 0.3;
      ctx.setLineDash(hit ? [] : [2, 4]);
      ctx.strokeStyle = hit ? 'rgba(255,217,160,0.85)' : 'rgba(240,240,245,0.28)'; ctx.lineWidth = hit ? 1.4 : 1;
      ctx.beginPath(); ctx.moveTo(px, py); ctx.quadraticCurveTo(qx, qy, ex, ey); ctx.stroke(); ctx.setLineDash([]); ctx.lineWidth = 1;
      if (hit) {
        const u = (now / 900) % 1, w = 1 - u;
        const bx = w * w * px + 2 * w * u * qx + u * u * ex, by = w * w * py + 2 * w * u * qy + u * u * ey;
        const pg = ctx.createRadialGradient(bx, by, 0, bx, by, 9);
        pg.addColorStop(0, 'rgba(255,240,215,1)'); pg.addColorStop(1, 'rgba(255,217,160,0)');
        ctx.fillStyle = pg; ctx.beginPath(); ctx.arc(bx, by, 9, 0, Math.PI * 2); ctx.fill();
      }
      const pulse = 9 + Math.sin(now / 300) * 2;
      ctx.beginPath(); ctx.arc(px, py, pulse, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.stroke();
      ctx.beginPath(); ctx.arc(px, py, 4.5, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill();
      ctx.textAlign = 'left'; ctx.fillStyle = '#f6f4ef';
      ctx.fillText(hit ? `that's ${PEOPLE[mm.who]}` : 'no memory close enough', Math.min(px + 14, ox + S - 140), py - 14);

      // tradeoff chart
      const gx = 450, gy = 40, gw = W - gx - 30, gh = 230;
      ctx.fillStyle = 'rgba(240,240,245,0.45)'; ctx.textAlign = 'left';
      ctx.fillText('as the threshold loosens →', gx, gy - 14);
      ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.strokeRect(gx + 0.5, gy + 0.5, gw, gh);
      const tx = (v: number) => gx + ((v - THRESHOLDS[0]) / (THRESHOLDS[THRESHOLDS.length - 1] - THRESHOLDS[0])) * gw;
      const line = (key: 'precision' | 'recall' | 'fmr', color: string) => {
        ctx.beginPath();
        curve.forEach((c, i) => { const x = tx(c.t), y = gy + gh - c[key] * gh; if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); });
        ctx.strokeStyle = color; ctx.lineWidth = 1.5; ctx.stroke(); ctx.lineWidth = 1;
      };
      line('recall', 'rgba(244,245,250,0.85)');
      line('precision', 'rgba(255,217,160,0.95)');
      line('fmr', 'rgba(236,120,105,0.9)');
      // tuned point and current threshold
      ctx.setLineDash([2, 4]); ctx.strokeStyle = 'rgba(255,217,160,0.5)';
      ctx.beginPath(); ctx.moveTo(tx(tuned), gy); ctx.lineTo(tx(tuned), gy + gh); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(255,217,160,0.7)'; ctx.fillText('tuned', tx(tuned) + 4, gy + 12);
      ctx.strokeStyle = '#fff'; ctx.beginPath(); ctx.moveTo(tx(t), gy); ctx.lineTo(tx(t), gy + gh); ctx.stroke();
      // label each line where it ends instead of a legend
      const last = curve[curve.length - 1];
      const tags: [string, number, string][] = [['precision', last.precision, 'rgba(255,217,160,0.95)'], ['faces found', last.recall, 'rgba(244,245,250,0.85)'], ['false matches', last.fmr, 'rgba(236,120,105,0.9)']];
      ctx.textAlign = 'right';
      tags.forEach(([l, v, col], i) => { ctx.fillStyle = col; ctx.fillText(l, gx + gw - 4, gy + gh - v * gh + (i === 1 ? 14 : -6)); });
      ctx.textAlign = 'left';
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [data, curve, tuned]);

  const toMap = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const c = canvasRef.current!; const r = c.getBoundingClientRect();
    const x = ((e.clientX - r.left) * (c.width / r.width) - 30) / 380;
    const y = ((e.clientY - r.top) * (c.height / r.height) - 22) / 380;
    return { x, y, inside: x >= 0 && x <= 1 && y >= 0 && y <= 1 };
  };

  return (
    <div className="sim">
      <div className="sim-head">
        <div>
          <p className="sim-kicker">Figure 1 · interactive</p>
          <h3 className="sim-title">Who is this?</h3>
        </div>
      </div>
      <p className="sim-story">
        Recall keeps every face you have met as a memory: an embedding, where faces of the same person land close together.
        A new face is matched to the nearest memory only if it falls inside that person's ring. Drag the white face around the brain.
      </p>

      <div className="sim-canvas">
        <canvas ref={canvasRef} width={780} height={420} style={{ cursor: 'grab', touchAction: 'none' }}
          onPointerDown={e => { const p = toMap(e); if (p.inside) { dragging.current = true; e.currentTarget.setPointerCapture(e.pointerId); setProbe({ x: p.x, y: p.y }); } }}
          onPointerMove={e => { if (!dragging.current) return; const p = toMap(e); setProbe({ x: Math.min(1, Math.max(0, p.x)), y: Math.min(1, Math.max(0, p.y)) }); }}
          onPointerUp={() => { dragging.current = false; }} />
      </div>

      <div className="sim-metrics">
        <div><b>{Math.round(m.precision * 100)}%</b><span>Precision</span></div>
        <div><b>{Math.round(m.recall * 100)}%</b><span>Faces found</span></div>
        <div><b className={m.fmr >= 0.02 ? 'bad' : undefined}>{(m.fmr * 100).toFixed(1)}%</b><span>False matches</span></div>
        <div><b>{match.d < t ? PEOPLE[match.who] : 'Unknown'}</b><span>New face</span></div>
      </div>

      <p className="sim-sentence">
        Accept a match when a face is within <Scrub value={t} values={THRESHOLDS} onChange={setT} format={v => v.toFixed(2)} pxPerStep={6} /> of
        someone you've met. Too loose and strangers get named; too tight and friends go unrecognized.
      </p>
      <p className="sim-note">
        Illustrative points, generated in your browser. On Recall's real data, tuning the threshold with augmentation landed at 94% precision and under 2% false positives.
      </p>
    </div>
  );
};
