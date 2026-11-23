/* Measured on an NVIDIA T4. Numbers are copied from the cuda-flash-attention README, not modeled. */
const HBM = [
  { n: 1024, base: 17, flash: 0.75, x: '22.7×' },
  { n: 2048, base: 66, flash: 1.5,  x: '44×' },
  { n: 4096, base: 260, flash: 3,   x: '86.7×' },
];

/** HBM traffic per forward pass, standard attention vs my Flash kernel. `compact` is the small Work-list version. */
export const CudaChart = ({ compact = false }: { compact?: boolean }) => {
  const W = compact ? 400 : 640, H = compact ? 250 : 330;
  const left = compact ? 52 : 70, right = compact ? 14 : 24, top = compact ? 46 : 28, bottom = compact ? 30 : 44;
  const max = 260, plotH = H - top - bottom, slot = (W - left - right) / HBM.length, bw = slot * 0.27;
  const y = (v: number) => top + plotH - (v / max) * plotH;
  const cx = (i: number) => left + slot * i + slot / 2;

  return (
    <svg className={`cuda-chart${compact ? ' compact' : ''}`} viewBox={`0 0 ${W} ${H}`} role="img"
      aria-label="HBM traffic per forward pass. Standard attention: 17, 66 and 260 MB at sequence lengths 1024, 2048 and 4096. Flash: 0.75, 1.5 and 3 MB.">
      {compact && <text x={left - 40} y={22} className="cc-title">HBM traffic per forward pass (MB)</text>}
      {[0, 100, 200].map(t => (
        <g key={t}>
          <line x1={left} x2={W - right} y1={y(t)} y2={y(t)} className="cc-grid" />
          <text x={left - 8} y={y(t) + 4} textAnchor="end" className="cc-tick">{t}{!compact && t === 200 ? ' MB' : ''}</text>
        </g>
      ))}
      {HBM.map((d, i) => (
        <g key={d.n}>
          <rect x={cx(i) - bw - 2} y={y(d.base)} width={bw} height={y(0) - y(d.base)} className="cc-base" />
          <rect x={cx(i) + 2} y={y(d.flash) - 2} width={bw} height={y(0) - y(d.flash) + 2} className="cc-flash" />
          <text x={cx(i) - bw / 2 - 2} y={y(d.base) - 6} textAnchor="middle" className="cc-val">{d.base}</text>
          <text x={cx(i) + bw / 2 + 2} y={y(d.flash) - 8} textAnchor="middle" className="cc-val flash">{d.flash}</text>
          <text x={cx(i)} y={H - bottom + (compact ? 20 : 20)} textAnchor="middle" className="cc-tick">{compact ? d.n : `N = ${d.n}`}</text>
          {!compact && <text x={cx(i)} y={H - bottom + 36} textAnchor="middle" className="cc-x">{d.x} less</text>}
        </g>
      ))}
      {/* direct labels instead of a legend, placed in the empty space beside the bars they name */}
      <text x={cx(2) - bw - 10} y={y(compact ? 225 : 200)} textAnchor="end" className="cc-label">standard</text>
      <text x={cx(1) + bw + 10} y={y(compact ? 30 : 22)} className="cc-label flash">Flash (mine)</text>
    </svg>
  );
};
