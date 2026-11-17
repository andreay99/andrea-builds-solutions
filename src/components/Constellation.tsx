// "AY" monogram drawn as a star constellation. Lines trace in, stars pop and twinkle.
// Coordinates live in a 240×220 viewBox.

const STARS: [number, number, number][] = [
  // A
  [30, 190, 2.6], [52, 120, 2.2], [78, 40, 3.2], [104, 120, 2.2], [126, 190, 2.6],
  // Y
  [140, 40, 2.8], [176, 108, 3.0], [212, 40, 2.8], [176, 150, 2.0], [176, 196, 2.6],
];

const LINES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [1, 3],
  [5, 6], [6, 7], [6, 8], [8, 9],
];

// Loose background stars that aren't part of the figure
const DUST: [number, number, number][] = [
  [12, 62, 1.1], [60, 10, 0.9], [150, 8, 1.2], [230, 122, 1.0], [204, 204, 0.9],
  [98, 212, 1.0], [6, 142, 0.8], [234, 70, 1.1], [118, 76, 0.8], [158, 168, 0.9],
  [40, 86, 0.7], [196, 150, 0.7],
];

export const Constellation = ({ size = 'min(40vw, 340px)' }: { size?: string }) => (
  <svg
    className="constellation"
    viewBox="-10 -10 260 240"
    style={{ width: size, height: 'auto', overflow: 'visible' }}
    aria-hidden
  >
    <defs>
      <filter id="star-glow" x="-200%" y="-200%" width="500%" height="500%">
        <feGaussianBlur stdDeviation="2.4" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <filter id="line-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="1.6" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>

    {DUST.map(([x, y, r], i) => (
      <circle key={`d${i}`} cx={x} cy={y} r={r} fill="#dfe8ff" className="c-twinkle"
        style={{ animationDelay: `${(i * 0.53) % 4}s`, opacity: 0.5 }} />
    ))}

    <g filter="url(#line-glow)">
      {LINES.map(([a, b], i) => (
        <line key={`l${i}`} pathLength={1} className="c-line"
          x1={STARS[a][0]} y1={STARS[a][1]} x2={STARS[b][0]} y2={STARS[b][1]}
          stroke="rgba(220,235,255,0.6)" strokeWidth={0.9} strokeLinecap="round"
          style={{ animationDelay: `${0.9 + i * 0.16}s` }} />
      ))}
    </g>

    <g filter="url(#star-glow)">
      {STARS.map(([x, y, r], i) => (
        <g key={`s${i}`} className="c-star" style={{ animationDelay: `${0.5 + i * 0.12}s`, transformOrigin: `${x}px ${y}px` }}>
          <circle cx={x} cy={y} r={r} fill="#ffffff" className="c-twinkle"
            style={{ animationDelay: `${2.4 + ((i * 0.7) % 3)}s` }} />
        </g>
      ))}
    </g>
  </svg>
);
