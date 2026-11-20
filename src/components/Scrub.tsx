import { useRef } from 'react';

/** A number you change by dragging left or right (or with the arrow keys), Bret Victor style.
    Pass `values` to step through a fixed list (e.g. powers of two) instead of a range. */
export function Scrub({ value, min = 0, max = 100, values, onChange, format, pxPerStep = 8 }: {
  value: number; min?: number; max?: number; values?: number[];
  onChange: (n: number) => void; format?: (n: number) => string; pxPerStep?: number;
}) {
  const start = useRef<{ x: number; i: number } | null>(null);
  const list = values ?? null;
  const idx = list ? Math.max(0, list.indexOf(value)) : value;
  const lo = list ? 0 : min, hi = list ? list.length - 1 : max;
  const set = (i: number) => {
    const c = Math.max(lo, Math.min(hi, Math.round(i)));
    const v = list ? list[c] : c;
    if (v !== value) onChange(v);
  };
  return (
    <span className="scrub" role="slider" tabIndex={0} aria-valuemin={list ? list[0] : min} aria-valuemax={list ? list[list.length - 1] : max} aria-valuenow={value}
      title="Drag left or right"
      onPointerDown={e => { (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId); start.current = { x: e.clientX, i: idx }; }}
      onPointerMove={e => { if (start.current) set(start.current.i + (e.clientX - start.current.x) / pxPerStep); }}
      onPointerUp={() => { start.current = null; }}
      onKeyDown={e => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); set(idx + 1); }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); set(idx - 1); }
      }}>
      {format ? format(value) : value}
    </span>
  );
}
