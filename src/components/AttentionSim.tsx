import { useEffect, useRef, useState } from 'react';
import { Scrub } from '@/components/Scrub';

/* Standard attention vs Flash Attention, drawn as memory traffic.
   Left: the N×N score matrix as tiles. Right: what lives in HBM and in on-chip SRAM.
   Traffic model (fp32, head dim 64): standard writes and re-reads the N×N scores and
   probabilities (4·N² floats) plus Q, K, V; flash only streams Q, K, V. That reproduces
   the measured 22.67× at 1,024 tokens and 86× at 4,096. */

const D = 64;
const SEQS = [256, 512, 1024, 2048, 4096, 8192, 16384];
const BLOCKS = [32, 64, 128];
const SRAM_BYTES = 64 * 1024;                       // T4: 64 KB shared memory per SM

const stdBytes = (n: number) => 4 * (4 * n * n + 3 * n * D);
const flashBytes = (n: number) => 4 * (3 * n * D);
const fmt = (b: number) => b >= 1e9 ? `${(b / 1e9).toFixed(2)} GB` : b >= 1e6 ? `${(b / 1e6).toFixed(1)} MB` : `${(b / 1e3).toFixed(0)} KB`;

const CAPTION = {
  standard: 'Standard attention computes every score, writes the whole N×N matrix out to slow GPU memory (HBM), reads it back for softmax, writes it again, and reads it again to multiply by V. The red tiles are memory you are paying for.',
  flash: 'Flash Attention loads one block of Q and one block of K and V into fast on-chip SRAM, computes that tile, folds it into a running max and sum (online softmax), and throws it away. Only the output row ever goes back to HBM.',
};

export const AttentionSim = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<'standard' | 'flash'>('flash');
  const [n, setN] = useState(4096);
  const [block, setBlock] = useState(64);
  const [running, setRunning] = useState(true);
  const live = useRef({ mode, n, block, running, k: 0 });
  live.current.mode = mode; live.current.n = n; live.current.block = block; live.current.running = running;

  useEffect(() => { live.current.k = 0; }, [mode, n, block]);

  useEffect(() => {
    const c = canvasRef.current!; const ctx = c.getContext('2d')!;
    const W = c.width, H = c.height;
    let raf = 0, hold = 0;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      const L = live.current;
      const T = Math.min(32, Math.max(4, L.n / L.block));   // tiles per side, capped for drawing
      const total = T * T;
      if (L.running) {
        if (L.k >= total) { if (++hold > 70) { L.k = 0; hold = 0; } }
        else L.k = Math.min(total, L.k + total / 260);
      }
      const k = Math.floor(L.k), p = Math.min(1, L.k / total);

      ctx.fillStyle = '#030409'; ctx.fillRect(0, 0, W, H);
      ctx.font = '11px "JetBrains Mono", monospace'; ctx.textBaseline = 'alphabetic';

      // ── matrix
      const M = 330, mx = 30, my = 54, cell = M / T;
      ctx.fillStyle = 'rgba(240,240,245,0.45)'; ctx.textAlign = 'left';
      ctx.fillText(`scores QKᵀ, ${L.n.toLocaleString()} × ${L.n.toLocaleString()}`, mx, my - 14);
      ctx.strokeStyle = 'rgba(255,255,255,0.12)'; ctx.lineWidth = 1; ctx.strokeRect(mx + 0.5, my + 0.5, M, M);
      if (L.mode === 'standard') {
        for (let t = 0; t < Math.min(k, total); t++) {
          const i = Math.floor(t / T), j = t % T;
          ctx.fillStyle = 'rgba(236,120,105,0.42)';
          ctx.fillRect(mx + j * cell + 1, my + i * cell + 1, cell - 1, cell - 1);
        }
        if (k < total) {
          const i = Math.floor(k / T);
          ctx.strokeStyle = 'rgba(255,255,255,0.7)'; ctx.strokeRect(mx + 0.5, my + i * cell + 0.5, M, cell);
        }
      } else {
        const i = Math.floor(Math.min(k, total - 1) / T), j = Math.min(k, total - 1) % T;
        // Q block row and K/V block column sitting in SRAM
        ctx.fillStyle = 'rgba(255,217,160,0.06)';
        ctx.fillRect(mx, my + i * cell, M, cell); ctx.fillRect(mx + j * cell, my, cell, M);
        // tiles computed in this row fade away: nothing is stored
        for (let jj = 0; jj < j; jj++) {
          const age = (j - jj) / T;
          ctx.fillStyle = `rgba(255,217,160,${Math.max(0, 0.35 - age * 1.2)})`;
          ctx.fillRect(mx + jj * cell + 1, my + i * cell + 1, cell - 1, cell - 1);
        }
        if (k < total) {
          ctx.fillStyle = 'rgba(255,240,215,0.95)';
          ctx.fillRect(mx + j * cell + 1, my + i * cell + 1, cell - 1, cell - 1);
        }
        // output rows written back to HBM
        const ox = mx + M + 12;
        ctx.strokeStyle = 'rgba(255,255,255,0.12)'; ctx.strokeRect(ox + 0.5, my + 0.5, 10, M);
        const doneRows = k >= total ? T : i;
        ctx.fillStyle = 'rgba(244,245,250,0.75)'; ctx.fillRect(ox + 1, my + 1, 9, doneRows * cell - 1);
        ctx.fillStyle = 'rgba(240,240,245,0.45)'; ctx.fillText('O', ox + 1, my - 14);
      }

      // ── memory panel
      const px = 420, pw = W - px - 30;
      const std = stdBytes(L.n), fl = flashBytes(L.n);
      const bar = (y: number, label: string, total: number, now: number, color: string, scale: number) => {
        ctx.fillStyle = 'rgba(240,240,245,0.5)'; ctx.textAlign = 'left'; ctx.fillText(label, px, y - 8);
        ctx.textAlign = 'right'; ctx.fillStyle = 'rgba(240,240,245,0.75)'; ctx.fillText(fmt(now), px + pw, y - 8);
        ctx.fillStyle = 'rgba(255,255,255,0.06)'; ctx.fillRect(px, y, pw, 8);
        ctx.fillStyle = 'rgba(255,255,255,0.12)'; ctx.fillRect(px, y, Math.max(1, pw * total / scale), 8);
        ctx.fillStyle = color; ctx.fillRect(px, y, Math.max(1, pw * now / scale), 8);
      };
      ctx.fillStyle = 'rgba(240,240,245,0.45)'; ctx.textAlign = 'left';
      ctx.fillText('data moved to and from HBM (slow memory)', px, my - 14);
      bar(my + 22, 'standard', std, L.mode === 'standard' ? std * p : 0, 'rgba(236,120,105,0.8)', std);
      bar(my + 70, 'flash', fl, L.mode === 'flash' ? fl * p : 0, 'rgba(255,217,160,0.95)', std);
      ctx.textAlign = 'left'; ctx.fillStyle = '#f6f4ef'; ctx.font = '500 34px "General Sans", Inter, sans-serif';
      ctx.fillText(`${(std / fl).toFixed(1)}×`, px, my + 140);
      ctx.font = '11px "JetBrains Mono", monospace'; ctx.fillStyle = 'rgba(240,240,245,0.5)';
      ctx.fillText('less memory traffic with flash', px, my + 160);

      // SRAM: what one tile needs on chip
      const sramNeed = 4 * L.block * D * 4;           // Q, K, V, O blocks in fp32
      const sy = my + 214, fits = sramNeed <= SRAM_BYTES;
      ctx.fillStyle = 'rgba(240,240,245,0.45)'; ctx.fillText('on-chip SRAM one tile needs (a T4 has 64 KB)', px, sy - 14);
      const blocks = ['Q', 'K', 'V', 'O'];
      const bw = (pw - 30) / 4;
      blocks.forEach((b, i) => {
        const on = L.mode === 'flash';
        ctx.fillStyle = on ? (fits ? 'rgba(255,217,160,0.16)' : 'rgba(236,120,105,0.2)') : 'rgba(255,255,255,0.04)';
        ctx.fillRect(px + i * (bw + 10), sy, bw, 34);
        ctx.strokeStyle = on ? (fits ? 'rgba(255,217,160,0.6)' : 'rgba(236,120,105,0.7)') : 'rgba(255,255,255,0.1)';
        ctx.strokeRect(px + i * (bw + 10) + 0.5, sy + 0.5, bw, 34);
        ctx.fillStyle = on ? '#f6f4ef' : 'rgba(240,240,245,0.3)'; ctx.textAlign = 'center';
        ctx.fillText(`${b}${b === 'Q' || b === 'O' ? 'ᵢ' : 'ⱼ'}`, px + i * (bw + 10) + bw / 2, sy + 21);
      });
      ctx.textAlign = 'left';
      ctx.fillStyle = fits ? 'rgba(240,240,245,0.55)' : 'rgba(240,160,150,0.9)';
      ctx.fillText(`${fmt(sramNeed)} needed · ${fits ? 'fits' : 'too big, use a smaller block'}`, px, sy + 56);
      ctx.fillStyle = 'rgba(240,240,245,0.4)';
      ctx.fillText('plus a running max and sum for each row', px, sy + 76);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="sim">
      <div className="sim-head">
        <div>
          <p className="sim-kicker">Figure 1 · interactive</p>
          <h3 className="sim-title">Where the memory goes</h3>
        </div>
        <button className="sim-toggle" onClick={() => setRunning(r => !r)}>{running ? '[ Pause ]' : '[ Play ]'}</button>
      </div>

      <ol className="sim-steps" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
        {(['standard', 'flash'] as const).map((m, i) => (
          <li key={m}>
            <button className={mode === m ? 'on' : undefined} onClick={() => setMode(m)}>
              <span>{String(i + 1).padStart(2, '0')}</span>{m === 'standard' ? 'Standard attention' : 'Flash Attention'}
            </button>
          </li>
        ))}
      </ol>
      <p className="sim-story">{CAPTION[mode]}</p>

      <div className="sim-canvas"><canvas ref={canvasRef} width={780} height={420} /></div>

      <p className="sim-sentence">
        Run a sequence of <Scrub value={n} values={SEQS} onChange={setN} format={v => v.toLocaleString()} pxPerStep={22} /> tokens
        in blocks of <Scrub value={block} values={BLOCKS} onChange={setBlock} pxPerStep={22} /> rows.
      </p>
      <p className="sim-note">
        Traffic model: standard attention writes and re-reads the N×N scores and probabilities, flash streams Q, K and V once (fp32, head dim 64).
        It lands within a few percent of what I measured on an NVIDIA T4: 22.67× less traffic at 1,024 tokens and 86× at 4,096.
      </p>
    </div>
  );
};
