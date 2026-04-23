import archImg from '@/assets/sona-architecture.png';
import ProjectDetail from './ProjectDetail';

const SonaAI = () => (
  <ProjectDetail
    title="SONA AI"
    techLabel="Python · TensorFlow · Librosa"
    description="SONA AI processes raw audio streams to detect emotional states in real-time. A TensorFlow model trained on the RAVDESS dataset extracts features via Librosa, while an agentic layer cross-validates predictions for higher accuracy. The system is exposed via a FastAPI endpoint for real-time inference."
    highlight="89% emotion classification accuracy across 8 emotional states with sub-200ms latency."
    metrics={[
      { label: 'Emotion accuracy', val: '89%' },
      { label: 'Latency', val: '<200ms' },
      { label: 'Classes', val: '8' },
    ]}
    techStack={['Python', 'TensorFlow', 'Librosa', 'FastAPI']}
    arch={archImg}
    githubLink="https://github.com/andreay99/sona-ai"
  />
);

export default SonaAI;
