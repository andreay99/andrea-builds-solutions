import type { ArchSpec } from '@/components/ArchDiagram';
import { RECALL, OFFSCRIPT, ROMCOM, SONA, CUDA, TELLAVISION } from '@/data/architectures';

export interface Project {
  slug: string;        // /projects/<slug>
  nodeId: string;      // matching star in data/universe.ts
  title: string;
  kicker: string;      // where / when
  oneLiner: string;
  description: string;
  highlight: string;
  metrics: { val: string; label: string }[];
  stack: string[];
  diagram?: ArchSpec;
  /** prize won; tier 1 is the headline win */
  award?: { title: string; detail: string; tier: 1 | 2; tag?: string };
  sim?: 'osehs' | 'attention' | 'recall' | 'tella';
  github?: string;
  live?: string;
  liveLabel?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: 'tellavision', nodeId: 'p-tella',
    title: 'Tellavision',
    kicker: 'HackPrinceton · Fall 2026 · Backend & data engineer',
    award: { title: 'Best Education Hack', detail: 'HackPrinceton Fall 2026 · one of the top tracks, 1,000+ students', tier: 1 },
    oneLiner: 'Cartoons that pause to ask your kid a question.',
    description: 'An interactive learning app that turns kids’ cartoons into practice: Dora pauses to ask a question, listens to the child’s answer, and tells parents what their child is learning. I built the data layer in PostgreSQL on Tiger Cloud (TimescaleDB) with Drizzle ORM, modeled every answer as a time-series event, wrote the queries behind the parent Insights page, and built the foundation of the parent dashboard in Next.js 16. A Zod-validated read contract let three teammates build the AI, the kid experience and the UI in parallel against the same data.',
    highlight: 'Won Best Education Hack, one of the top tracks at HackPrinceton Fall 2026, with more than 1,000 students competing.',
    metrics: [
      { val: '85', label: 'automated tests (Vitest, PGlite)' },
      { val: '4', label: 'versioned schema migrations' },
      { val: '3', label: 'teammates building in parallel on one contract' },
    ],
    stack: ['TypeScript', 'Next.js 16', 'React 19', 'PostgreSQL', 'TimescaleDB', 'Drizzle ORM', 'Zod', 'Tailwind v4', 'Vitest', 'Turborepo'],
    sim: 'tella',
    diagram: TELLAVISION,
    github: 'https://github.com/luljaj/HackPrincetonFall26',
  },
  {
    slug: 'recall', nodeId: 'p-recall',
    title: 'Recall',
    kicker: 'HackPrinceton · Nov 2025',
    award: { title: 'Best Use of Grok (xAI) · Best Use of Arm (MLH)', detail: 'HackPrinceton 2025 · two sponsor prizes', tier: 2 },
    oneLiner: 'A memory aid that recognizes the people you meet.',
    description: 'An edge-deployable face recognition pipeline on a Raspberry Pi. Threshold-tuned embedding matching plus data augmentation keep false positives rare, and the streaming endpoints ship with full OpenAPI documentation and unit tests. When it recognizes someone, it tells you who they are and where you met.',
    highlight: 'Won two categories at HackPrinceton 2025.',
    metrics: [
      { val: '94%', label: 'precision' },
      { val: '<200ms', label: 'inference on a Raspberry Pi' },
      { val: '<2%', label: 'false positives' },
    ],
    stack: ['Python', 'OpenCV', 'DeepFace', 'MongoDB', 'Grok', 'ElevenLabs'],
    sim: 'recall',
    diagram: RECALL,
    github: 'https://github.com/Christinetrr/recall',
    live: 'https://devpost.com/software/recall-cf0dp9', liveLabel: 'Devpost',
  },
  {
    slug: 'cuda-flash-attention', nodeId: 'p-cuda',
    title: 'CUDA Flash Attention',
    kicker: 'Independent · Apr 2026 – now',
    oneLiner: 'Flash Attention forward and backward, written by hand in CUDA C++.',
    description: 'I implemented Flash Attention (Dao et al. 2022) forward and backward passes from scratch in raw CUDA C++: online softmax, tiled GEMM, and gradient recomputation from saved statistics, without ever materializing the full N×N attention matrix. Along the way I contributed a PyTorch CUDA backend API migration to Hugging Face Transformers (PR #45856).',
    highlight: 'Every gradient (dQ, dK, dV) matches both a CPU reference and PyTorch autograd to within 4e-7.',
    metrics: [
      { val: '22.9×', label: 'softmax speedup, 4.8 → 110 GB/s' },
      { val: '86×', label: 'less HBM traffic at seq_len 4096' },
      { val: '<4e-7', label: 'max gradient error' },
    ],
    stack: ['CUDA', 'C++', 'Python', 'PyTorch', 'NVIDIA T4'],
    sim: 'attention',
    diagram: CUDA,
    github: 'https://github.com/andreay99/cuda-flash-attention',
    live: 'https://medium.com/@ay387/implementing-flash-attentions-backward-pass-in-raw-cuda-what-i-learned-34514b7c8b5f',
    liveLabel: 'Read the write-up',
  },
  {
    slug: 'osehs', nodeId: 'p-osehs',
    title: 'OSEHS Digital Twin',
    kicker: 'NASA ORBIT Challenge · Space Track finalist · Houston, Jul 2026',
    award: { title: 'NASA ORBIT finalist · $15,000 prize', detail: 'One of 10 Space Track finalists from hundreds of university entries · pitched at NASA Johnson Space Center', tier: 2, tag: 'Prize' },
    oneLiner: 'A 20-satellite swarm that keeps formation without ground control.',
    description: 'A Python orbital simulation and digital twin for a 20-unit satellite swarm, modeling relative formation dynamics with Clohessy-Wiltshire equations. I designed a decentralized gossip protocol so the satellites share state and reach consensus with no central ground-control bottleneck and no single point of failure, then presented the architecture at the NASA ORBIT poster review.',
    highlight: 'Team Star Maker was one of 10 finalists in the Space Track of NASA’s first ORBIT Challenge, pitched at Johnson Space Center in Houston, and won a $15,000 prize. I modeled the swarm communication.',
    metrics: [
      { val: '20', label: 'satellites in the swarm' },
      { val: '65.3%', label: 'end-to-end pipeline efficiency' },
      { val: '0', label: 'central points of failure' },
    ],
    stack: ['Python', 'NumPy', 'Matplotlib', 'Clohessy-Wiltshire', 'Gossip protocol'],
    sim: 'osehs',
    github: 'https://github.com/andreay99/OSEHS-simulation',
  },
  {
    slug: 'rom-com', nodeId: 'p-romcom',
    title: 'ROM-COM',
    kicker: 'HackPrinceton SP2026',
    oneLiner: 'Stroke rehab you can do with just a webcam.',
    description: 'A webcam-only upper-extremity rehabilitation system for stroke and TBI patients. MediaPipe tracks joints in real time, an adaptive calibration learns each patient’s range of motion, and I built the Random Forest gesture classifier, the feature extractor and the FMA-UE clinical scoring engine, all streamed back over FastAPI WebSockets.',
    highlight: 'A full clinical scoring pipeline, built in 36 hours.',
    metrics: [
      { val: '91%', label: 'gesture accuracy' },
      { val: '36 hrs', label: 'from idea to demo' },
      { val: 'Real-time', label: 'joint tracking' },
    ],
    stack: ['Python', 'MediaPipe', 'FastAPI', 'scikit-learn', 'React', 'TypeScript'],
    diagram: ROMCOM,
    github: 'https://github.com/tomiwaaluko/ROM-com',
  },
  {
    slug: 'offscript', nodeId: 'p-offscript',
    title: 'OffScript',
    kicker: 'HackHarvard 2025',
    oneLiner: 'Mock interviews that push back like a real interviewer.',
    description: 'An end-to-end AI interview simulator. You practice live coding and behavioral questions while Gemini generates adaptive follow-ups, a FastAPI backend streams feedback in real time, and a Next.js split-screen UI keeps the conversation and the code side by side. I led the team of three.',
    highlight: 'Designed, built and shipped at HackHarvard in 36 hours.',
    metrics: [
      { val: '92%', label: 'response accuracy' },
      { val: '3', label: 'engineers' },
      { val: '36 hrs', label: 'to ship' },
    ],
    stack: ['Next.js', 'TypeScript', 'FastAPI', 'Gemini'],
    diagram: OFFSCRIPT,
    github: 'https://github.com/Smit2553/Offscript',
    live: 'https://offscript.codestacx.com', liveLabel: 'Try it',
  },
  {
    slug: 'sona-ai', nodeId: 'p-sona',
    title: 'SONA AI',
    kicker: 'Side project',
    oneLiner: 'Hears how you feel from your voice.',
    description: 'SONA processes raw audio streams to detect emotional state in real time. Librosa extracts features, a TensorFlow model trained on the RAVDESS dataset classifies them, and an agentic layer cross-validates predictions before a FastAPI endpoint returns the result.',
    highlight: 'Eight emotional states, classified in under 200ms.',
    metrics: [
      { val: '89%', label: 'emotion accuracy' },
      { val: '<200ms', label: 'latency' },
      { val: '8', label: 'emotion classes' },
    ],
    stack: ['Python', 'TensorFlow', 'Librosa', 'FastAPI'],
    diagram: SONA,
    github: 'https://github.com/andreay99/sona-ai',
  },
];

export const projectBySlug = (slug?: string) => PROJECTS.find(p => p.slug === slug);
export const projectByNode = (id?: string | null) => PROJECTS.find(p => p.nodeId === id);
