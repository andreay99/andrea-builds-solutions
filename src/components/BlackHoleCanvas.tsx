import { useEffect } from 'react';

const VS = `attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}`;
const FS = `precision highp float;
uniform vec2 u_res,u_mouse;uniform float u_time;uniform vec3 u_c[8];uniform int u_n;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5);}
vec3 stars(vec2 uv,float t){
  vec3 c=vec3(0.);
  for(float s=80.;s<220.;s+=1.4){
    vec2 si=floor(uv*s);float h=hash(si);
    if(h>.984){vec2 sf=fract(uv*s)-.5;float b=exp(-dot(sf,sf)*90.)*(0.4+0.6*sin(t*1.8+h*6.28));c+=b*mix(vec3(.8,.9,1.),vec3(1.,.9,.8),h);}
  }return c;
}
void main(){
  vec2 uv=gl_FragCoord.xy/u_res;
  vec2 asp=vec2(u_res.x/u_res.y,1.);
  vec2 p=(uv*2.-1.)*asp,m=(u_mouse*2.-1.)*asp;
  float t=u_time;
  vec2 tl=vec2(0.);
  vec2 dm=p-m;float rm=length(dm);
  tl+=-normalize(dm)*0.22/(rm*rm+0.05);
  for(int i=0;i<8;i++){
    if(i>=u_n)break;
    vec2 cp=(u_c[i].xy*2.-1.)*asp;float age=u_c[i].z;
    vec2 dc=p-cp;float rc=length(dc);
    tl+=-normalize(dc)*0.18*exp(-age*0.9)/(rc*rc+0.05);
  }
  vec2 lensed=uv+tl*0.055;
  vec3 col=stars(lensed,t);
  float rd=length(p-m);
  float da=atan(dm.y,dm.x)+t*0.35;
  float disk=0.;
  for(float r=0.07;r<0.3;r+=0.055){
    float ring=exp(-pow((rd-r)*22.,2.))*0.65;
    disk+=ring*(.5+.5*sin(da*3.+r*18.-t*2.))*smoothstep(.3,.07,r);
  }
  col+=mix(vec3(1.,.38,.04),vec3(1.,.88,.28),disk*0.6)*disk;
  float eh=smoothstep(.065,.025,rm);
  float ps=exp(-pow((rm-.07)*32.,2.))*0.45;
  col+=vec3(.45,.22,0.)*ps;
  col=mix(col,vec3(0.),eh);
  col+=vec3(.08,.04,.18)*exp(-rm*2.2)*.25;
  for(int i=0;i<8;i++){
    if(i>=u_n)break;
    vec2 cp=(u_c[i].xy*2.-1.)*asp;float age=u_c[i].z;
    float r=length(p-cp);float ps2=exp(-pow((r-.07)*32.,2.))*.3*exp(-age*0.7);
    float eh2=smoothstep(.055,.02,r)*exp(-age*0.5);
    col+=vec3(.45,.22,0.)*ps2;col=mix(col,vec3(0.),eh2);
  }
  col+=vec3(.06,.03,.15)*exp(-rd*1.8)*0.2;
  col=1.-exp(-col*1.3);col=pow(clamp(col,0.,1.),vec3(.78));
  gl_FragColor=vec4(col,1.);
}`;

export const BlackHoleCanvas = () => {
  useEffect(() => {
    const canvas = document.getElementById('bg-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { antialias: true, alpha: false });
    if (!gl) return;

    let W = 0, H = 0;
    let mouse = [0.5, 0.5];
    let clicks: { x: number; y: number; age: number }[] = [];
    let time = 0;
    const start = performance.now();
    let animId: number;

    function mk(src: string, type: number) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }

    const prog = gl.createProgram()!;
    gl.attachShader(prog, mk(VS, gl.VERTEX_SHADER));
    gl.attachShader(prog, mk(FS, gl.FRAGMENT_SHADER));
    gl.linkProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      gl!.viewport(0, 0, W, H);
    }
    window.addEventListener('resize', resize);
    resize();

    function onMove(e: MouseEvent) { mouse = [e.clientX / W, 1 - e.clientY / H]; }
    function onClick(e: MouseEvent) {
      clicks.unshift({ x: e.clientX / W, y: 1 - e.clientY / H, age: 0 });
      if (clicks.length > 8) clicks.length = 8;
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('click', onClick);

    canvas.classList.add('hero-active');

    let last = performance.now();
    function frame(now: number) {
      animId = requestAnimationFrame(frame);
      const dt = (now - last) / 1000;
      last = now;
      time = (now - start) / 1000;
      clicks.forEach(c => c.age += dt);
      clicks = clicks.filter(c => c.age < 5);

      gl!.useProgram(prog);
      const a = gl!.getAttribLocation(prog, 'a');
      gl!.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl!.enableVertexAttribArray(a);
      gl!.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);

      const u = (n: string, fn: (l: WebGLUniformLocation, ...args: any[]) => void, ...args: any[]) => {
        const l = gl!.getUniformLocation(prog, n);
        if (l != null) fn(l, ...args);
      };
      u('u_res',   (l, ...a) => gl!.uniform2f(l, ...a), W, H);
      u('u_mouse', (l, ...a) => gl!.uniform2f(l, ...a), mouse[0], mouse[1]);
      u('u_time',  (l, ...a) => gl!.uniform1f(l, ...a), time);
      u('u_n',     (l, ...a) => gl!.uniform1i(l, ...a), clicks.length);
      const ca = new Float32Array(24);
      clicks.forEach((c, i) => { ca[i*3] = c.x; ca[i*3+1] = c.y; ca[i*3+2] = c.age; });
      u('u_c', (l, ...a) => gl!.uniform3fv(l, ...a), ca);
      gl!.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      canvas.classList.remove('hero-active');
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
    };
  }, []);

  return null;
};
