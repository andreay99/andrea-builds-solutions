/* Small illustrations for the Work list, drawn in the same language as the figures:
   near-black, hairlines, one warm accent, a little motion. viewBox is 320 × 200. */

const G = '#ffd9a0', W = '#f4f5fa', BG = '#020307';
const dim = (a: number) => `rgba(244,245,250,${a})`;
const gold = (a: number) => `rgba(255,217,160,${a})`;

const Frame = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 320 200" width="100%" height="100%" style={{ display: 'block' }} aria-hidden>
    <rect width="320" height="200" fill={BG} />
    {children}
  </svg>
);

// a tile sweeps across the attention matrix; only the output column fills
const Cuda = () => (
  <Frame>
    {Array.from({ length: 8 }, (_, r) => Array.from({ length: 12 }, (_, c) => (
      <rect key={`${r}-${c}`} x={56 + c * 15} y={34 + r * 15} width="13" height="13" fill={r === 3 ? gold(0.07) : 'none'} stroke={dim(0.12)} strokeWidth="0.6" />
    )))}
    <rect x={56} y={79} width="13" height="13" fill={gold(0.95)}>
      <animate attributeName="x" from="56" to="221" dur="3.2s" repeatCount="indefinite" />
    </rect>
    <rect x={244} y={34} width="8" height="120" fill="none" stroke={dim(0.2)} strokeWidth="0.6" />
    <rect x={245} y={35} width="6" height="44" fill={dim(0.75)} />
    <text x="56" y="172" fill={dim(0.4)} fontFamily="JetBrains Mono, monospace" fontSize="8">only one tile in SRAM at a time</text>
  </Frame>
);

// a swarm on woven, slightly tilted orbits around the Sun
const Osehs = () => (
  <Frame>
    <defs>
      <radialGradient id="th-sun"><stop offset="0" stopColor="#fffaf0" /><stop offset="0.55" stopColor="#ffe2a8" /><stop offset="1" stopColor="#ff9a48" /></radialGradient>
      <radialGradient id="th-corona"><stop offset="0" stopColor="rgba(255,180,100,0.35)" /><stop offset="1" stopColor="rgba(255,150,70,0)" /></radialGradient>
    </defs>
    <ellipse cx="160" cy="100" rx="128" ry="40" fill={gold(0.03)} />
    {Array.from({ length: 9 }, (_, i) => (
      <ellipse key={i} cx="160" cy="100" rx="122" ry="36" fill="none" stroke={gold(0.13)} strokeWidth="0.6" transform={`rotate(${(i - 4) * 1.6} 160 100)`} />
    ))}
    <circle cx="160" cy="100" r="46" fill="url(#th-corona)" />
    <circle cx="160" cy="100" r="11" fill="url(#th-sun)" />
    <g>
      {Array.from({ length: 20 }, (_, i) => {
        const a = (i / 20) * Math.PI * 2;
        return <circle key={i} cx={160 + Math.cos(a) * 122} cy={100 + Math.sin(a) * 36} r="1.8" fill={W} />;
      })}
    </g>
  </Frame>
);

// memories glowing inside a brain; a nerve lights from a new face to one of them
const Recall = () => (
  <Frame>
    <defs><radialGradient id="th-mem"><stop offset="0" stopColor="rgba(255,217,160,0.45)" /><stop offset="1" stopColor="rgba(255,217,160,0)" /></radialGradient></defs>
    <ellipse cx="128" cy="150" rx="30" ry="17" fill="none" stroke={dim(0.22)} strokeWidth="0.8" />
    <path d="M150 150 Q152 172 147 190 L160 190 Q163 170 166 152" fill={BG} stroke={dim(0.22)} strokeWidth="0.8" />
    <path d="M84 104 C84 70 108 44 150 40 C196 36 236 56 244 92 C250 118 236 128 222 130 C214 146 196 156 176 154 C156 158 144 148 130 144 C108 140 84 130 84 104 Z"
      fill="#06070e" stroke={dim(0.4)} strokeWidth="1" />
    <path d="M100 98 C120 70 170 60 214 82 M110 120 C140 100 190 104 226 112 M150 42 C142 70 156 86 146 120" fill="none" stroke={dim(0.1)} strokeWidth="0.8" />
    {[[124, 80], [190, 68], [168, 112], [118, 118], [214, 104]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r={i === 2 ? 22 : 16} fill="url(#th-mem)" opacity={i === 2 ? 1 : 0.55} />
    ))}
    <path id="th-nerve" d="M262 150 Q236 104 168 112" fill="none" stroke={gold(0.85)} strokeWidth="1.2" />
    <circle r="3" fill="#fff8ec"><animateMotion dur="1.4s" repeatCount="indefinite"><mpath href="#th-nerve" /></animateMotion></circle>
    <circle cx="262" cy="150" r="4" fill={W} />
    <circle cx="262" cy="150" r="9" fill="none" stroke={dim(0.5)} />
  </Frame>
);

// an arm with its range-of-motion arc
const RomCom = () => (
  <Frame>
    <path d="M118 66 A70 70 0 0 1 214 120" fill="none" stroke={gold(0.25)} strokeWidth="10" strokeLinecap="round" />
    <path d="M118 66 A70 70 0 0 1 188 72" fill="none" stroke={gold(0.9)} strokeWidth="1.4">
      <animate attributeName="d" values="M118 66 A70 70 0 0 1 150 56;M118 66 A70 70 0 0 1 206 100;M118 66 A70 70 0 0 1 150 56" dur="3s" repeatCount="indefinite" />
    </path>
    <line x1="118" y1="136" x2="118" y2="66" stroke={dim(0.35)} strokeWidth="1" strokeDasharray="2 3" />
    <g>
      <line x1="118" y1="136" x2="182" y2="96" stroke={W} strokeWidth="2" strokeLinecap="round" />
      <line x1="182" y1="96" x2="236" y2="62" stroke={W} strokeWidth="2" strokeLinecap="round" />
      <circle cx="118" cy="136" r="4" fill={G} /><circle cx="182" cy="96" r="4" fill={W} /><circle cx="236" cy="62" r="4" fill={W} />
      <animateTransform attributeName="transform" type="rotate" values="-38 118 136;12 118 136;-38 118 136" dur="3s" repeatCount="indefinite" />
    </g>
    <text x="40" y="180" fill={dim(0.4)} fontFamily="JetBrains Mono, monospace" fontSize="8">shoulder flexion · scored live</text>
  </Frame>
);

// the interview: a question on the left, code streaming in on the right
const OffScript = () => (
  <Frame>
    <line x1="150" y1="26" x2="150" y2="174" stroke={dim(0.12)} />
    <rect x="34" y="40" width="92" height="22" rx="11" fill="none" stroke={dim(0.3)} />
    <rect x="44" y="49" width="60" height="3" rx="1.5" fill={dim(0.5)} />
    <rect x="60" y="76" width="70" height="22" rx="11" fill={gold(0.12)} stroke={gold(0.6)} />
    <rect x="70" y="85" width="40" height="3" rx="1.5" fill={gold(0.8)} />
    <rect x="34" y="112" width="84" height="22" rx="11" fill="none" stroke={dim(0.3)} />
    <circle cx="50" cy="123" r="2" fill={dim(0.6)}><animate attributeName="opacity" values="1;0.2;1" dur="1.2s" repeatCount="indefinite" /></circle>
    <circle cx="58" cy="123" r="2" fill={dim(0.6)}><animate attributeName="opacity" values="0.2;1;0.2" dur="1.2s" repeatCount="indefinite" /></circle>
    {[[0, 70], [12, 96], [12, 58], [24, 84], [12, 40], [0, 22]].map(([indent, w], i) => (
      <rect key={i} x={170 + indent} y={44 + i * 16} width={w} height="4" rx="2" fill={i === 3 ? gold(0.8) : dim(0.35)}>
        <animate attributeName="width" values={`0;${w};${w}`} keyTimes="0;0.4;1" dur="4s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
      </rect>
    ))}
  </Frame>
);

// a voice: waveform above, spectrogram below
const Sona = () => {
  const wave = Array.from({ length: 120 }, (_, i) => {
    const x = 30 + i * 2.2, env = Math.sin((i / 119) * Math.PI);
    const y = 70 + env * 26 * (Math.sin(i * 0.55) * 0.7 + Math.sin(i * 1.7) * 0.3);
    return `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ');
  return (
    <Frame>
      <path d={wave} fill="none" stroke={W} strokeWidth="1" opacity="0.85" />
      {Array.from({ length: 44 }, (_, c) => Array.from({ length: 7 }, (_, r) => {
        const v = Math.max(0, Math.sin(c * 0.35 + r * 0.9) * 0.5 + 0.5 - r * 0.08) * Math.sin((c / 43) * Math.PI);
        return <rect key={`${c}-${r}`} x={30 + c * 6} y={170 - r * 9} width="5" height="8" fill={gold(0.08 + v * 0.8)} />;
      }))}
    </Frame>
  );
};

// a cartoon paused for a question, with the child's answers stacking up as a time series
const Tella = () => (
  <Frame>
    <rect x="70" y="26" width="180" height="104" rx="6" fill="none" stroke={dim(0.4)} />
    <circle cx="128" cy="86" r="16" fill="none" stroke={dim(0.5)} />
    <circle cx="122" cy="82" r="2" fill={dim(0.8)} /><circle cx="134" cy="82" r="2" fill={dim(0.8)} />
    <path d="M122 92 Q128 96 134 92" fill="none" stroke={dim(0.7)} />
    <rect x="156" y="46" width="76" height="26" rx="13" fill={gold(0.12)} stroke={gold(0.7)} />
    <text x="194" y="63" textAnchor="middle" fill={G} fontFamily="Inter, sans-serif" fontSize="12">¿qué color?</text>
    <g fill={W}><rect x="148" y="98" width="4" height="14" rx="1" /><rect x="156" y="98" width="4" height="14" rx="1" /></g>
    {Array.from({ length: 22 }, (_, i) => {
      const h = 6 + ((i * 37) % 9) + i * 0.9, f = 0.45 + i * 0.022;
      return (
        <g key={i}>
          <rect x={70 + i * 8.2} y={176 - h} width="5.5" height={h} fill={dim(0.18)} />
          <rect x={70 + i * 8.2} y={176 - h * f} width="5.5" height={h * f} fill={gold(0.85)}>
            <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.1;1" dur="4s" begin={`${i * 0.12}s`} repeatCount="indefinite" />
          </rect>
        </g>
      );
    })}
  </Frame>
);

const THUMBS: Record<string, () => JSX.Element> = {
  tellavision: Tella,
  'cuda-flash-attention': Cuda, osehs: Osehs, recall: Recall, 'rom-com': RomCom, offscript: OffScript, 'sona-ai': Sona,
};

export const WorkThumb = ({ slug }: { slug: string }) => {
  const T = THUMBS[slug];
  return T ? <T /> : null;
};
