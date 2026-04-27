// src/components/AuroraBackground.tsx
// Drop-in background for Contact (or any) page.
// Follows the exact same pattern as BlackHoleCanvas.tsx.
//
// SETUP:
//   1. Copy this file to src/components/AuroraBackground.tsx
//   2. Add the CSS block (see bottom of this file) to src/index.css
//   3. In index.html, add a second canvas inside <body>:
//        <canvas id="aurora-canvas"></canvas>
//   4. In src/pages/Contact.tsx, import and render <AuroraBackground />

import { useEffect } from 'react';

// ── Vertex shader (identical to BlackHoleCanvas) ──────────────────────────────
const VS = `attribute vec2 a; void main(){ gl_Position = vec4(a, 0., 1.); }`;

// ── Fragment shader: Aurora Borealis ─────────────────────────────────────────
const FS = `
precision highp float;
uniform vec2  u_res;
uniform vec2  u_mouse;
uniform vec2  u_click;
uniform float u_click_t;
uniform float u_time;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1,0)), f.x),
    mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x),
    f.y
  );
}

float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for(int i = 0; i < 6; i++){ v += a * noise(p); p *= 2.1; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 m  = u_mouse; // already 0..1
  float t = u_time * 0.18;

  // Click burst — ripple outward from last click
  vec2  cm    = u_click;
  float cdist = length(uv - cm);
  float burst = sin(cdist * 28.0 - u_click_t * 9.0)
                * exp(-cdist * 4.5)
                * exp(-u_click_t * 2.2)
                * 0.18;

  // Domain-warped FBM
  vec2 warp = vec2(
    fbm(uv * 2.3 + vec2(t,       m.y * 1.8)),
    fbm(uv * 2.3 + vec2(t + 1.7, m.x * 1.8))
  );
  float n = fbm(uv * 2.8 + warp * 0.9 + burst);

  // Curtain mask — concentrated in upper-mid band, fades at edges
  float curtain = smoothstep(0.05, 0.55, uv.y) * smoothstep(1.0, 0.45, uv.y);
  // Subtle horizontal sway driven by mouse x
  curtain *= 0.8 + 0.2 * sin(uv.x * 3.14159 + m.x * 1.5 + t * 0.6);

  float band = smoothstep(0.28, 0.72, n) * curtain;

  // Palette: teal → blue → violet
  vec3 c1  = vec3(0.00, 0.88, 0.62); // teal
  vec3 c2  = vec3(0.18, 0.32, 1.00); // deep blue
  vec3 c3  = vec3(0.65, 0.10, 0.92); // violet
  vec3 col = mix(c1, c2, n);
  col      = mix(col, c3, smoothstep(0.45, 1.0, n + m.x * 0.25));

  // Shimmer — fine horizontal ripples animated over time
  col *= band * (1.4 + 0.6 * sin(uv.x * 12.0 + t * 4.0 + n * 6.0));

  // Sky base — very dark navy matching --bg
  vec3 sky = vec3(0.028, 0.032, 0.072);
  col = mix(sky, col, band);

  // Soft vignette
  float vig = 1.0 - smoothstep(0.4, 1.2, length(uv - vec2(0.5, 0.4)) * 1.3);
  col *= 0.55 + 0.45 * vig;

  // Subtle star field — round dots with smooth falloff
  vec2 starGrid = uv * 320.0;
  vec2 starCell = floor(starGrid);
  vec2 starOffset = fract(starGrid) - 0.5; // -0.5..0.5 within cell
  float s = hash(starCell);
  if(s > 0.987){
    // Jitter center within cell so stars aren't grid-aligned
    vec2 jitter = vec2(hash(starCell + 7.3), hash(starCell + 13.7)) - 0.5;
    vec2 d = starOffset - jitter * 0.35;
    float dist = length(d);
    float glow = smoothstep(0.18, 0.0, dist); // round, soft edge
    float twinkle = 0.4 + 0.6 * sin(u_time * 2.0 + s * 6.28);
    col += vec3(0.6, 0.7, 0.9) * twinkle * glow * (1.0 - band * 2.0);
  }

  col = pow(clamp(col, 0.0, 1.0), vec3(0.88));
  gl_FragColor = vec4(col, 1.0);
}
`;

export const AuroraBackground = () => {
  useEffect(() => {
    const canvas = document.getElementById('aurora-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { antialias: true, alpha: false });
    if (!gl) return;

    let W = 0, H = 0;
    let mouse  = [0.5, 0.5];
    let click  = [0.5, 0.5];
    let clickT = -999;
    const start = performance.now();
    let animId: number;

    // Compile helper
    function mkShader(src: string, type: number) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS))
        console.warn('[AuroraBackground] shader error:', gl!.getShaderInfoLog(s));
      return s;
    }

    const prog = gl.createProgram()!;
    gl.attachShader(prog, mkShader(VS, gl.VERTEX_SHADER));
    gl.attachShader(prog, mkShader(FS, gl.FRAGMENT_SHADER));
    gl.linkProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1,-1, 1,-1, -1,1, 1,1]),
      gl.STATIC_DRAW
    );

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      gl!.viewport(0, 0, W, H);
    }
    window.addEventListener('resize', resize);
    resize();

    function onMove(e: MouseEvent) {
      mouse = [e.clientX / W, 1 - e.clientY / H];
    }
    function onClick(e: MouseEvent) {
      click  = [e.clientX / W, 1 - e.clientY / H];
      clickT = (performance.now() - start) / 1000;
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('click', onClick);

    // Make visible (mirrors BlackHoleCanvas hero-active pattern)
    canvas.classList.add('aurora-active');

    function frame(now: number) {
      animId = requestAnimationFrame(frame);
      const t = (now - start) / 1000;

      gl!.useProgram(prog);

      const aPos = gl!.getAttribLocation(prog, 'a');
      gl!.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl!.enableVertexAttribArray(aPos);
      gl!.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      const u1f = (name: string, v: number) => {
        const l = gl!.getUniformLocation(prog, name);
        if (l != null) gl!.uniform1f(l, v);
      };
      const u2f = (name: string, x: number, y: number) => {
        const l = gl!.getUniformLocation(prog, name);
        if (l != null) gl!.uniform2f(l, x, y);
      };

      u2f('u_res',     W, H);
      u2f('u_mouse',   mouse[0], mouse[1]);
      u2f('u_click',   click[0], click[1]);
      u1f('u_click_t', Math.max(0, t - clickT));
      u1f('u_time',    t);

      gl!.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      canvas.classList.remove('aurora-active');
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
    };
  }, []);

  return null; // Renders into #aurora-canvas — same pattern as BlackHoleCanvas
};


/* ─────────────────────────────────────────────────────────────────────────────
   ADD THIS TO src/index.css  (right after the #bg-canvas block)
   ─────────────────────────────────────────────────────────────────────────────

#aurora-canvas {
  position: fixed; top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 0;
  opacity: 0;
  transition: opacity 1.2s ease;
  pointer-events: none;
}
#aurora-canvas.aurora-active { opacity: 1; pointer-events: auto; }

   ─────────────────────────────────────────────────────────────────────────────
   ADD THIS TO index.html  <body> (right after <canvas id="bg-canvas"></canvas>)
   ─────────────────────────────────────────────────────────────────────────────

<canvas id="aurora-canvas"></canvas>

   ─────────────────────────────────────────────────────────────────────────────
   IN src/pages/Contact.tsx  (or Experience.tsx) — add at top of the JSX return:
   ─────────────────────────────────────────────────────────────────────────────

import { AuroraBackground } from '@/components/AuroraBackground';

// inside your return():
<AuroraBackground />

   ───────────────────────────────────────────────────────────────────────────── */
