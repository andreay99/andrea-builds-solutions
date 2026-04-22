import { useState, useEffect } from 'react';

interface RollingTextProps {
  text: string;
  color?: string;
  duration?: number;
  stagger?: number;
  blur?: number;
  pattern?: 'sequential' | 'alternating';
  loop?: boolean;
  fontSize?: string;
}

export const RollingText = ({
  text, color = 'inherit', duration = 0.55, stagger = 0.04,
  blur = 6, pattern = 'sequential', loop = false,
}: RollingTextProps) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (!loop) return;
    const id = setInterval(() => setKey(k => k + 1), 4000);
    return () => clearInterval(id);
  }, [loop]);

  const chars = text.split('');
  return (
    <span key={key} style={{ display:'inline-block', perspective:'400px', color, lineHeight:'inherit', fontFamily:'inherit', fontWeight:'inherit' }}>
      {chars.map((ch, i) => {
        const idx = pattern === 'alternating' ? (i % 2 === 0 ? i : chars.length - 1 - i) : i;
        return (
          <span key={i}
            className="roll-char"
            style={{
              '--roll-dur': `${duration}s`,
              '--roll-blur': `${blur}px`,
              animationDelay: `${idx * stagger}s`,
              whiteSpace: ch === ' ' ? 'pre' : 'normal',
            } as React.CSSProperties}>
            {ch === ' ' ? '\u00a0' : ch}
          </span>
        );
      })}
    </span>
  );
};
