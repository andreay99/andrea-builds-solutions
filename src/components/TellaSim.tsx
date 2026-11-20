import { useMemo, useState } from 'react';

/* What time_bucket() does for the parent Insights page: one session of answers, rolled up into
   buckets you choose. The answers are generated here for illustration; the query shape is a sketch
   of the real one, not a copy. */

const BUCKETS = [1, 2, 5, 10];                     // minutes
const SESSION = 30;                                // minutes of cartoon
const GOLD = '#ffd9a0';

const rng = (seed: number) => () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };

// a child gets better over a session: early answers often need a second try, later ones less so
const makeAnswers = () => {
  const r = rng(23);
  const out: { t: number; first: boolean }[] = [];
  let t = 0.4;
  while (t < SESSION) {
    out.push({ t, first: r() < 0.38 + 0.5 * (t / SESSION) });
    t += 0.12 + r() * 0.42;
  }
  return out;
};

export const TellaSim = () => {
  const answers = useMemo(makeAnswers, []);
  const [bi, setBi] = useState(2);
  const [hover, setHover] = useState<number | null>(null);
  const size = BUCKETS[bi];

  const buckets = useMemo(() => {
    const n = Math.ceil(SESSION / size);
    const b = Array.from({ length: n }, (_, i) => ({ start: i * size, total: 0, first: 0 }));
    for (const a of answers) { const k = Math.min(n - 1, Math.floor(a.t / size)); b[k].total++; if (a.first) b[k].first++; }
    return b;
  }, [answers, size]);

  // chart geometry
  const Wd = 760, Ht = 300, L = 40, R = 40, T = 34, B = 40;
  const cw = Wd - L - R, ch = Ht - T - B;
  const maxTotal = Math.max(...buckets.map(b => b.total));
  const bw = cw / buckets.length;
  const yCount = (v: number) => T + ch - (v / maxTotal) * ch;
  const yAcc = (v: number) => T + ch - v * ch;
  const pts = buckets.map((b, i) => ({ x: L + bw * (i + 0.5), y: yAcc(b.total ? b.first / b.total : 0), acc: b.total ? b.first / b.total : 0 }));
  const first = buckets.find(b => b.total), last = [...buckets].reverse().find(b => b.total);
  const accFirst = first ? Math.round(100 * first.first / first.total) : 0, accLast = last ? Math.round(100 * last.first / last.total) : 0;
  const h = hover !== null ? buckets[hover] : null;
  const label = size === 1 ? '1 minute' : `${size} minutes`;

  return (
    <figure className="orbit-fig">
      <figcaption className="arch-head"><span>Figure 1</span> One session, bucketed</figcaption>

      <div className="tella-stage">
        <svg viewBox={`0 0 ${Wd} ${Ht}`} width="100%" style={{ display: 'block' }} onMouseLeave={() => setHover(null)}>
          {/* faint guide lines at 50% and 100% accuracy */}
          {[0.5, 1].map(v => (
            <g key={v}>
              <line x1={L} x2={Wd - R} y1={yAcc(v)} y2={yAcc(v)} stroke="rgba(255,255,255,0.07)" strokeDasharray="2 4" />
              <text x={Wd - R + 6} y={yAcc(v) + 4} fill="rgba(240,240,245,0.35)" fontSize="11" fontFamily="JetBrains Mono, monospace">{v * 100}%</text>
            </g>
          ))}
          {buckets.map((b, i) => {
            const x = L + bw * i + bw * 0.18, w = bw * 0.64;
            const on = hover === i;
            return (
              <g key={i} onMouseEnter={() => setHover(i)}>
                <rect x={L + bw * i} y={T} width={bw} height={ch} fill="transparent" />
                <rect x={x} y={yCount(b.total)} width={w} height={T + ch - yCount(b.total)} fill={on ? 'rgba(244,245,250,0.28)' : 'rgba(244,245,250,0.13)'} />
                <rect x={x} y={yCount(b.first)} width={w} height={T + ch - yCount(b.first)} fill={GOLD} opacity={on ? 1 : 0.8} />
              </g>
            );
          })}
          {/* first-try accuracy as a line over the bars */}
          <path d={pts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')} fill="none" stroke="#f6f4ef" strokeWidth="1.4" />
          {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={hover === i ? 4 : 2.5} fill="#f6f4ef" />)}
          {/* labels on the drawing itself */}
          <text x={pts[0].x + 8} y={pts[0].y - 10} fill="#f6f4ef" fontSize="12">first-try accuracy</text>
          <text x={L} y={Ht - 14} fill="rgba(240,240,245,0.4)" fontSize="11" fontFamily="JetBrains Mono, monospace">0 min</text>
          <text x={Wd - R} y={Ht - 14} textAnchor="end" fill="rgba(240,240,245,0.4)" fontSize="11" fontFamily="JetBrains Mono, monospace">{SESSION} min</text>
          {h && (
            <text x={L + bw * (hover! + 0.5)} y={T - 12} textAnchor="middle" fill="#f6f4ef" fontSize="12">
              {h.start}–{h.start + size} min · {h.total} answers · {h.first} on the first try
            </text>
          )}
        </svg>
      </div>

      <div className="orbit-sliders">
        <label style={{ '--c': GOLD } as React.CSSProperties}>
          <span>bucket = {label}</span>
          <input type="range" min={0} max={BUCKETS.length - 1} value={bi} onChange={e => setBi(+e.target.value)} />
        </label>
      </div>

      <pre className="tella-sql"><code>{`SELECT time_bucket('${label}', answered_at) AS bucket,
       count(*)                                AS answers,
       avg(first_try_correct::int)             AS first_try_accuracy
FROM   answer_events
WHERE  session_id = $1
GROUP  BY bucket
ORDER  BY bucket;`}</code></pre>

      <p className="orbit-caption">
        Every answer is stored as an event with a timestamp. <code className="tella-inline">time_bucket()</code> groups them into windows,
        so the same table answers “how did today go?” and “how is this month going?”. Each bar is answers in a window;
        the <span className="c-gold">gold part</span> is answers right on the first try. In this session, first-try accuracy climbs
        from {accFirst}% to {accLast}%.
      </p>
      <p className="orbit-status">Drag the bucket size; hover a bar for its numbers. The answers are generated for this figure, and the query is a sketch of the real one.</p>
    </figure>
  );
};
