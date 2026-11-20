/* Architecture drawn in the site's own language: a metro map, not a box chart.
   Filled dot = code I wrote, hollow dot = outside service, square = data.
   Grey lines are dependencies; the gold line is the path one request takes, numbered in order. */

export interface ArchNode { id: string; x: number; y: number; label: string; sub?: string; kind?: 'own' | 'ext' | 'data' }
export interface ArchEdge { from: string; to: string; label?: string; hot?: boolean; dashed?: boolean; via?: [number, number][] }
export interface ArchSpec { title: string; caption: string; w: number; h: number; nodes: ArchNode[]; edges: ArchEdge[]; spans?: { x1: number; x2: number; y: number; label: string }[] }

const GOLD = 'rgba(255,217,160,0.95)';

export const ArchDiagram = ({ spec, fig, bare }: { spec: ArchSpec; fig?: number; bare?: boolean }) => {
  const at = Object.fromEntries(spec.nodes.map(n => [n.id, n]));
  let step = 0;

  const drawing = (
        <svg viewBox={`0 0 ${spec.w} ${spec.h}`} className="arch-svg" role="img" aria-label={`${spec.title}. ${spec.caption}`}>
          <defs>
            <marker id="arr" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0.8 L7 4 L0 7.2" fill="none" stroke="rgba(240,240,245,0.45)" strokeWidth="1" />
            </marker>
            <marker id="arr-hot" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0.8 L7 4 L0 7.2" fill="none" stroke={GOLD} strokeWidth="1.2" />
            </marker>
          </defs>

          {/* spans: quiet brackets that group a run of nodes (e.g. "runs on the Pi") */}
          {spec.spans?.map(s => (
            <g key={s.label} className="arch-span">
              <path d={`M${s.x1} ${s.y - 5} V${s.y} H${s.x2} V${s.y - 5}`} />
              <text x={s.x1 + 2} y={s.y + 15}>{s.label}</text>
            </g>
          ))}

          {spec.edges.map((e, i) => {
            const a = at[e.from], b = at[e.to];
            const pts: [number, number][] = [[a.x, a.y], ...(e.via ?? []), [b.x, b.y]];
            // stop the line just short of the markers at either end
            const trim = (p: [number, number], q: [number, number], d: number): [number, number] => {
              const len = Math.hypot(q[0] - p[0], q[1] - p[1]) || 1;
              return [p[0] + (q[0] - p[0]) * d / len, p[1] + (q[1] - p[1]) * d / len];
            };
            // labels hang under each dot, so a line leaving downward (or arriving from below) starts under the label
            const below = (p: [number, number], q: [number, number]) => Math.abs(q[0] - p[0]) < 2 && q[1] > p[1];
            const s0 = trim(pts[0], pts[1], below(pts[0], pts[1]) ? 48 : 11);
            const s1 = trim(pts[pts.length - 1], pts[pts.length - 2], below(pts[pts.length - 1], pts[pts.length - 2]) ? 48 : 12);
            const all = [s0, ...pts.slice(1, -1), s1];
            const d = all.map((p, k) => `${k ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
            // label sits at the middle of the longest segment
            let mi = 0, ml = 0;
            for (let k = 0; k < all.length - 1; k++) { const l = Math.hypot(all[k + 1][0] - all[k][0], all[k + 1][1] - all[k][1]); if (l > ml) { ml = l; mi = k; } }
            const mx = (all[mi][0] + all[mi + 1][0]) / 2, my = (all[mi][1] + all[mi + 1][1]) / 2;
            const vertical = Math.abs(all[mi + 1][0] - all[mi][0]) < 2;
            const n = e.hot ? ++step : 0;
            return (
              <g key={i}>
                <path d={d} className={`arch-edge${e.hot ? ' hot' : ''}${e.dashed ? ' dashed' : ''}`} markerEnd={`url(#${e.hot ? 'arr-hot' : 'arr'})`} />
                {(e.label || n > 0) && (
                  <text x={vertical ? mx + 8 : mx} y={vertical ? my + 3 : my - 7} textAnchor={vertical ? 'start' : 'middle'} className={`arch-edge-label${e.hot ? ' hot' : ''}`}>
                    {n > 0 && <tspan className="arch-step">{n}</tspan>}{n > 0 && e.label ? '  ' : ''}{e.label}
                  </text>
                )}
              </g>
            );
          })}

          {spec.nodes.map(n => {
            const hot = spec.edges.some(e => e.hot && (e.from === n.id || e.to === n.id));
            return (
              <g key={n.id} className={`arch-node ${n.kind ?? 'own'}${hot ? ' hot' : ''}`}>
                {n.kind === 'data'
                  ? <rect x={n.x - 4.5} y={n.y - 4.5} width="9" height="9" />
                  : <circle cx={n.x} cy={n.y} r={n.kind === 'ext' ? 5 : 4.5} />}
                <text x={n.x} y={n.y + 22} textAnchor="middle" className="arch-label">{n.label}</text>
                {n.sub && <text x={n.x} y={n.y + 37} textAnchor="middle" className="arch-sub">{n.sub}</text>}
              </g>
            );
          })}
        </svg>
  );
  if (bare) return drawing;

  return (
    <figure className="arch">
      <figcaption className="arch-head"><span>Figure{fig ? ` ${fig}` : ''}</span> {spec.title}</figcaption>
      <div className="arch-scroll">{drawing}</div>
      <p className="arch-caption">{spec.caption} <span className="arch-key">Filled dots are code I wrote, hollow dots are outside services, squares are data. The gold line is one request, in order.</span></p>
    </figure>
  );
};
