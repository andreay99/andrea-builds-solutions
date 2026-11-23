// Everything in the portfolio as a graph: each item is a star, `links` are the lines between them.

export type GroupId = 'projects' | 'experience' | 'research' | 'hackathons' | 'skills' | 'writing' | 'education';

export interface UNode {
  id: string;
  group: GroupId;
  label: string;
  sub?: string;
  desc?: string;
  tags?: string[];
  links?: string[];
  route?: string;   // internal page
  href?: string;    // external page
  hrefLabel?: string;
  minor?: boolean;  // small star (skills)
  prize?: 1 | 2;    // won something; 1 = the headline win
}

export const GROUPS: { id: GroupId; label: string; kind: string }[] = [
  { id: 'projects',   label: 'Projects',   kind: 'Project' },
  { id: 'experience', label: 'Experience', kind: 'Role' },
  { id: 'research',   label: 'Research',   kind: 'Research' },
  { id: 'hackathons', label: 'Hackathons', kind: 'Competition' },
  { id: 'skills',     label: 'Skills',     kind: 'Skill' },
  { id: 'writing',    label: 'Writing',    kind: 'Article' },
  { id: 'education',  label: 'Education',  kind: 'Education' },
];

const skill = (id: string, label: string): UNode => ({ id: `s-${id}`, group: 'skills', label, minor: true });

export const NODES: UNode[] = [
  // ── Projects
  { id: 'p-tella', group: 'projects', label: 'Tellavision', sub: 'Best Education Hack · HackPrinceton Fall 2026', prize: 1,
    desc: 'Dora pauses to ask the child a question, listens to the answer, and tells parents what their child is learning. I built the TimescaleDB data layer, the time_bucket() insights and the parent dashboard.',
    tags: ['TypeScript', 'Next.js', 'PostgreSQL', 'TimescaleDB'], route: '/projects/tellavision',
    links: ['s-typescript', 's-nextjs', 's-react', 's-postgres', 'h-hpf26'],
    href: 'https://github.com/luljaj/HackPrincetonFall26', hrefLabel: 'GitHub' },
  { id: 'p-recall', group: 'projects', label: 'Recall', sub: 'Face recognition memory aid', prize: 2,
    desc: 'Edge-deployable face recognition on Raspberry Pi with <200ms inference, 94% precision and <2% false positives. Streaming endpoints with OpenAPI docs and unit tests.',
    tags: ['Python', 'OpenCV', 'DeepFace', 'MongoDB'], route: '/projects/recall',
    links: ['s-python', 's-opencv', 's-mongodb', 'h-hp25'] },
  { id: 'p-offscript', group: 'projects', label: 'OffScript', sub: 'AI interview simulator',
    desc: 'Real-time AI interview simulator with dynamic question generation, live evaluation and session reports. Built by a team of 3 in 36 hours.',
    tags: ['Next.js', 'TypeScript', 'FastAPI', 'Gemini'], route: '/projects/offscript',
    links: ['s-nextjs', 's-typescript', 's-fastapi', 'h-hh25'] },
  { id: 'p-romcom', group: 'projects', label: 'ROM-COM', sub: 'Stroke & TBI rehabilitation', prize: 2,
    desc: 'Webcam-only rehab system: MediaPipe motion tracking, adaptive range-of-motion calibration, a Random Forest gesture classifier and automated FMA-UE scoring.',
    tags: ['Python', 'MediaPipe', 'FastAPI', 'React'], route: '/projects/rom-com',
    links: ['s-python', 's-react', 's-typescript', 's-fastapi', 'h-hp26'] },
  { id: 'p-osehs', group: 'projects', label: 'OSEHS Digital Twin', sub: 'Satellite swarm simulation', prize: 2,
    desc: 'Digital twin of a 20-unit satellite swarm using Clohessy-Wiltshire dynamics, with a decentralized gossip protocol for consensus and 65.3% pipeline efficiency.',
    tags: ['Python', 'NumPy', 'CW equations'], route: '/projects/osehs',
    links: ['s-python', 'h-orbit'] },
  { id: 'p-sona', group: 'projects', label: 'SONA AI', sub: 'Voice emotion detection',
    desc: 'Real-time emotion detection from voice with a CNN trained on RAVDESS and agentic cross-validation across 8 emotion classes.',
    tags: ['Python', 'TensorFlow', 'Librosa', 'FastAPI'], route: '/projects/sona-ai',
    links: ['s-python', 's-tensorflow', 's-fastapi'] },
  { id: 'p-cuda', group: 'projects', label: 'CUDA Flash Attention', sub: 'Forward & backward in raw CUDA',
    desc: 'Flash Attention forward and backward passes from scratch in CUDA C++. 22.9× softmax speedup and 86× less HBM traffic at seq_len=4096, gradients verified to <4e-7.',
    tags: ['CUDA', 'C++', 'PyTorch'], route: '/projects/cuda-flash-attention',
    links: ['s-cuda', 's-cpp', 's-pytorch', 'w-flash'] },

  // ── Experience
  { id: 'x-nasa', group: 'experience', label: 'Undergraduate Researcher', sub: 'NJIT CSTR · NASA MIRO · Sept 2025 – Aug 2026',
    desc: 'Trained multimodal transformers on decades of NASA SDO and SOHO data to forecast solar eruptions.',
    tags: ['Python', 'PyTorch', 'ParaView'], route: '/experience',
    links: ['r-solar', 'r-pinn', 'r-paraview', 's-python', 's-pytorch', 'e-njit'] },
  { id: 'x-apple-ts', group: 'experience', label: 'Technical Specialist', sub: 'Apple · Aug 2024 – Mar 2026',
    desc: 'Worked with Cupertino engineering on escalated macOS and iOS issues using Xcode debugging and log analysis. Top 5% of technicians for quality and efficiency.',
    tags: ['Xcode', 'macOS', 'iOS'], route: '/experience', links: ['x-apple-tl'] },
  { id: 'x-apple-tl', group: 'experience', label: 'Training Lead', sub: 'Apple · Jul 2025 – Dec 2025',
    desc: 'Built a hands-on troubleshooting curriculum and trained 30+ technicians per cycle. Launch sales up 15%.',
    tags: ['Leadership', 'Training'], route: '/experience' },

  // ── Research
  { id: 'r-solar', group: 'research', label: 'Solar eruption forecasting', sub: 'Multimodal transformers',
    desc: 'Systematic experiment tracking on SDO and SOHO observations improved eruption forecast accuracy by 20%.',
    tags: ['PyTorch', 'Transformers'], links: ['s-pytorch', 's-python'] },
  { id: 'r-pinn', group: 'research', label: 'Coronal field reconstruction', sub: 'Physics-informed neural networks',
    desc: 'Python pipelines over 3D magnetic field data computing current density and magnetic twist maps for PINN reconstruction.',
    tags: ['Python', 'PINN'], links: ['s-python'] },
  { id: 'r-paraview', group: 'research', label: '3D flare visualization', sub: 'ParaView',
    desc: 'Visualizations of 3D field structures and flare eruption dynamics for analysis and research talks.',
    tags: ['ParaView'] },

  // ── Hackathons
  { id: 'h-hpf26', group: 'hackathons', label: 'HackPrinceton Fall 2026', sub: 'Won Best Education Hack · 1,000+ students', prize: 1,
    desc: 'Backend and data engineer: the time-series data layer, the parent insights and the dashboard foundation.', links: ['p-tella'] },
  { id: 'h-hp25', group: 'hackathons', label: 'HackPrinceton 2025', prize: 2, sub: 'Best Use of Grok (xAI) · Best Use of Arm (MLH)',
    desc: 'Two category wins with Recall.', links: ['p-recall'] },
  { id: 'h-hp26', group: 'hackathons', label: 'HackPrinceton Spring 2026', prize: 2, sub: 'AI & Tech for Clinical Trials (Regeneron)',
    desc: 'Won the Regeneron clinical trials prize with ROM-COM. I built the gesture classifier, feature extractor and FMA-UE scoring engine.', links: ['p-romcom'] },
  { id: 'h-hh25', group: 'hackathons', label: 'HackHarvard 2025', sub: 'OffScript',
    desc: 'Led a team of 3 engineers to ship a full-stack AI interview simulator in 36 hours.', links: ['p-offscript'] },
  { id: 'h-orbit', group: 'hackathons', label: 'NASA ORBIT Challenge', sub: 'Space Track finalist · $15,000 prize', prize: 2,
    desc: 'One of 10 Space Track finalists from hundreds of university entries. Team Star Maker pitched at NASA Johnson Space Center in Houston; I modeled the swarm communication.', links: ['p-osehs'] },

  // ── Writing
  { id: 'w-flash', group: 'writing', label: "Flash Attention's backward pass in raw CUDA", sub: 'Medium · 8 min read',
    desc: 'What I learned writing tiled recomputation and online softmax statistics by hand.',
    links: ['p-cuda', 's-cuda'],
    href: 'https://medium.com/@ay387/implementing-flash-attentions-backward-pass-in-raw-cuda-what-i-learned-34514b7c8b5f', hrefLabel: 'Read on Medium' },

  // ── Education
  { id: 'e-njit', group: 'education', label: 'B.S. Computer Science', sub: 'NJIT · Expected May 2028',
    desc: 'Data Structures, Algorithms, Database Systems, Computer Architecture, Linear Algebra, Discrete Math.' },
  { id: 'e-quantum', group: 'education', label: 'Quantum Computing Club', sub: 'ACMI · Jan 2026',
    desc: "Implemented Deutsch's and Deutsch-Jozsa algorithms in Qiskit.", links: ['s-python', 'e-njit'] },

  // ── Skills
  skill('python', 'Python'), skill('typescript', 'TypeScript'), skill('cpp', 'C++'), skill('cuda', 'CUDA'),
  skill('pytorch', 'PyTorch'), skill('tensorflow', 'TensorFlow'), skill('opencv', 'OpenCV'),
  skill('fastapi', 'FastAPI'), skill('nextjs', 'Next.js'), skill('react', 'React'),
  skill('mongodb', 'MongoDB'), skill('postgres', 'PostgreSQL'), skill('docker', 'Docker'), skill('aws', 'AWS'),
];
