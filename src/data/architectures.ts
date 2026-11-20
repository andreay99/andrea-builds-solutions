import type { ArchSpec } from '@/components/ArchDiagram';

// Columns sit 145px apart, rows 115px apart. Labels hang under each marker.

export const RECALL: ArchSpec = {
  title: 'How a face becomes a name',
  caption: 'A webcam frame is reduced to a 128-number embedding, matched against the people you have enrolled, and the match becomes a sentence spoken back to you. Inference stays under 200 ms on a Raspberry Pi.',
  w: 760, h: 345,
  nodes: [
    { id: 'cam', x: 60, y: 60, label: 'Webcam', sub: 'live video', kind: 'ext' },
    { id: 'detect', x: 205, y: 60, label: 'Find the face', sub: 'OpenCV' },
    { id: 'embed', x: 350, y: 60, label: 'Embedding', sub: 'DeepFace · 128-d' },
    { id: 'match', x: 495, y: 60, label: 'Match', sub: 'cosine + threshold' },
    { id: 'who', x: 640, y: 60, label: 'Who & where', sub: 'name · notes' },
    { id: 'db', x: 495, y: 175, label: 'Enrolled faces', sub: 'MongoDB', kind: 'data' },
    { id: 'grok', x: 640, y: 175, label: 'Memory prompt', sub: 'Grok (xAI)', kind: 'ext' },
    { id: 'tts', x: 495, y: 290, label: 'Voice', sub: 'ElevenLabs', kind: 'ext' },
    { id: 'ear', x: 205, y: 290, label: 'In your ear', sub: '“That’s Sarah, from…”', kind: 'ext' },
  ],
  edges: [
    { from: 'cam', to: 'detect', hot: true },
    { from: 'detect', to: 'embed', hot: true },
    { from: 'embed', to: 'match', hot: true },
    { from: 'match', to: 'who', hot: true },
    { from: 'who', to: 'grok', hot: true },
    { from: 'grok', to: 'tts', hot: true, via: [[640, 290]] },
    { from: 'tts', to: 'ear', hot: true },
    { from: 'db', to: 'match' },
  ],
  spans: [{ x1: 185, x2: 660, y: 122, label: 'Flask API on a Raspberry Pi (Arm)' }],
};

export const OFFSCRIPT: ArchSpec = {
  title: 'One turn of the interview',
  caption: 'Your answer goes to FastAPI. Gemini writes the next question while a second pass grades the answer against a rubric, and both stream back to the screen token by token.',
  w: 760, h: 235,
  nodes: [
    { id: 'you', x: 60, y: 70, label: 'Candidate', sub: 'answers out loud', kind: 'ext' },
    { id: 'ui', x: 205, y: 70, label: 'Interview UI', sub: 'Next.js · Monaco' },
    { id: 'api', x: 350, y: 70, label: 'FastAPI', sub: 'sessions · SSE' },
    { id: 'gem', x: 495, y: 70, label: 'Next question', sub: 'Gemini 1.5 Flash', kind: 'ext' },
    { id: 'judge', x: 640, y: 70, label: 'Grade', sub: 'LLM-as-judge rubric' },
    { id: 'bank', x: 350, y: 185, label: 'Question bank', sub: 'DS&A · behavioral', kind: 'data' },
    { id: 'report', x: 640, y: 185, label: 'Session report', sub: 'per-question scores' },
  ],
  edges: [
    { from: 'you', to: 'ui', hot: true },
    { from: 'ui', to: 'api', hot: true, label: 'REST' },
    { from: 'api', to: 'gem', hot: true },
    { from: 'gem', to: 'judge', hot: true },
    { from: 'judge', to: 'ui', hot: true, label: 'streamed back (SSE)', via: [[640, 22], [205, 22]] },
    { from: 'bank', to: 'api' },
    { from: 'judge', to: 'report' },
  ],
};

export const ROMCOM: ArchSpec = {
  title: 'From webcam to a clinical score',
  caption: 'The webcam is the only sensor. MediaPipe finds 33 joints, I turn them into angles scaled to each patient’s own calibrated range, a random forest names the exercise, and the FMA-UE engine scores it live over a WebSocket.',
  w: 760, h: 345,
  nodes: [
    { id: 'cam', x: 60, y: 60, label: 'Webcam', sub: '30 fps', kind: 'ext' },
    { id: 'pose', x: 205, y: 60, label: 'Pose', sub: 'MediaPipe · 33 joints', kind: 'ext' },
    { id: 'feat', x: 350, y: 60, label: 'Features', sub: 'angles · velocity · ROM %' },
    { id: 'rf', x: 495, y: 60, label: 'Which exercise', sub: 'random forest · 91%' },
    { id: 'fma', x: 640, y: 60, label: 'FMA-UE score', sub: '0 to 66' },
    { id: 'cal', x: 350, y: 175, label: 'Calibration', sub: 'each patient’s range' },
    { id: 'ws', x: 640, y: 175, label: 'Live feedback', sub: 'FastAPI WebSocket' },
    { id: 'ui', x: 495, y: 290, label: 'Dashboard', sub: 'React · joint overlay' },
    { id: 'log', x: 640, y: 290, label: 'Session log', sub: 'reps · progress', kind: 'data' },
    { id: 'hap', x: 205, y: 290, label: 'Haptics', sub: 'Arduino, optional', kind: 'ext' },
  ],
  edges: [
    { from: 'cam', to: 'pose', hot: true },
    { from: 'pose', to: 'feat', hot: true },
    { from: 'feat', to: 'rf', hot: true },
    { from: 'rf', to: 'fma', hot: true },
    { from: 'fma', to: 'ws', hot: true },
    { from: 'ws', to: 'ui', hot: true },
    { from: 'cal', to: 'feat' },
    { from: 'ws', to: 'log' },
    { from: 'ui', to: 'hap', dashed: true },
  ],
};

export const SONA: ArchSpec = {
  title: 'Hearing an emotion',
  caption: 'Raw audio is cleaned and cut into fixed segments, Librosa turns it into MFCC and mel features, a CNN + LSTM trained on RAVDESS scores eight emotions, and an agentic pass re-checks low-confidence calls before the API answers, in under 200 ms.',
  w: 760, h: 345,
  nodes: [
    { id: 'mic', x: 60, y: 60, label: 'Audio', sub: 'mic or file', kind: 'ext' },
    { id: 'prep', x: 205, y: 60, label: 'Clean up', sub: 'normalize · segment' },
    { id: 'feat', x: 350, y: 60, label: 'Features', sub: 'Librosa · MFCC · mel' },
    { id: 'model', x: 495, y: 60, label: 'Classifier', sub: 'CNN + LSTM' },
    { id: 'agent', x: 640, y: 60, label: 'Second opinion', sub: 'agentic re-check' },
    { id: 'api', x: 640, y: 175, label: 'FastAPI', sub: '/predict · < 200 ms' },
    { id: 'out', x: 640, y: 290, label: 'Emotion', sub: '8 classes + confidence', kind: 'ext' },
    { id: 'data', x: 350, y: 175, label: 'RAVDESS', sub: '7,356 labeled clips', kind: 'data' },
    { id: 'train', x: 495, y: 175, label: 'Training', sub: '80/20 split · Adam' },
  ],
  edges: [
    { from: 'mic', to: 'prep', hot: true },
    { from: 'prep', to: 'feat', hot: true },
    { from: 'feat', to: 'model', hot: true },
    { from: 'model', to: 'agent', hot: true },
    { from: 'agent', to: 'api', hot: true },
    { from: 'api', to: 'out', hot: true },
    { from: 'data', to: 'train' },
    { from: 'train', to: 'model', dashed: true, label: 'weights' },
  ],
};

export const CUDA: ArchSpec = {
  title: 'One kernel, two passes',
  caption: 'Forward: one tile at a time through on-chip SRAM, folding each into a running max and sum, so the N×N matrix never exists. Backward: rebuild the probabilities from those two saved numbers per row instead of storing them.',
  w: 760, h: 345,
  nodes: [
    { id: 'hbm', x: 60, y: 70, label: 'Q, K, V', sub: 'in HBM', kind: 'data' },
    { id: 'load', x: 205, y: 70, label: 'Load a tile', sub: 'into SRAM' },
    { id: 'qk', x: 350, y: 70, label: 'S = QKᵀ', sub: 'one tile only' },
    { id: 'soft', x: 495, y: 70, label: 'Online softmax', sub: 'update m and l' },
    { id: 'pv', x: 640, y: 70, label: 'O += P·V', sub: 'accumulate' },
    { id: 'out', x: 640, y: 185, label: 'Write O, m, l', sub: 'back to HBM', kind: 'data' },
    { id: 'rec', x: 495, y: 290, label: 'Rebuild P', sub: 'from m and l' },
    { id: 'grad', x: 350, y: 290, label: 'dQ · dK · dV', sub: 'nothing N×N stored' },
    { id: 'ok', x: 205, y: 290, label: 'Checked', sub: 'vs PyTorch, < 4e-7', kind: 'ext' },
  ],
  edges: [
    { from: 'hbm', to: 'load', hot: true },
    { from: 'load', to: 'qk', hot: true },
    { from: 'qk', to: 'soft', hot: true },
    { from: 'soft', to: 'pv', hot: true },
    { from: 'pv', to: 'out', hot: true },
    { from: 'pv', to: 'load', dashed: true, label: 'next K, V block', via: [[640, 22], [205, 22]] },
    { from: 'out', to: 'rec', label: 'backward pass', via: [[640, 290]] },
    { from: 'rec', to: 'grad' },
    { from: 'grad', to: 'ok' },
  ],
};

export const TELLAVISION: ArchSpec = {
  title: 'From a child’s answer to a parent’s insight',
  caption: 'Teammates built the AI that pauses the show and listens. Every answer arrives through a typed, Zod-validated contract, lands as an event in a TimescaleDB hypertable, and time_bucket() queries roll those events up into the progress parents see.',
  w: 760, h: 345,
  nodes: [
    { id: 'kid', x: 60, y: 60, label: 'Kid watches', sub: 'Dora asks a question', kind: 'ext' },
    { id: 'ai', x: 205, y: 60, label: 'Ask & listen', sub: 'AI pipeline (team)', kind: 'ext' },
    { id: 'contract', x: 350, y: 60, label: 'Typed contract', sub: 'Zod-validated' },
    { id: 'events', x: 495, y: 60, label: 'Answer events', sub: 'TimescaleDB hypertable', kind: 'data' },
    { id: 'bucket', x: 640, y: 60, label: 'time_bucket()', sub: 'answers over time' },
    { id: 'insights', x: 640, y: 175, label: 'Insights', sub: 'first-try accuracy' },
    { id: 'dash', x: 495, y: 290, label: 'Parent dashboard', sub: 'Next.js 16 · live view' },
    { id: 'parent', x: 205, y: 290, label: 'Parent', sub: 'sees what they learn', kind: 'ext' },
    { id: 'focus', x: 350, y: 175, label: 'Learning focus', sub: 'steers the tutor' },
  ],
  edges: [
    { from: 'kid', to: 'ai', hot: true },
    { from: 'ai', to: 'contract', hot: true },
    { from: 'contract', to: 'events', hot: true },
    { from: 'events', to: 'bucket', hot: true },
    { from: 'bucket', to: 'insights', hot: true },
    { from: 'insights', to: 'dash', hot: true, via: [[640, 290]] },
    { from: 'dash', to: 'parent', hot: true },
    { from: 'parent', to: 'focus', dashed: true, label: 'sets' },
    { from: 'focus', to: 'ai', dashed: true },
  ],
  spans: [{ x1: 330, x2: 660, y: 122, label: 'Postgres on Tiger Cloud · Drizzle · 85 tests' }],
};
