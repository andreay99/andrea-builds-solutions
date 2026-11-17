import archImg from '@/assets/recall-architecture.svg';
import ProjectDetail from './ProjectDetail';

const Recall = () => (
  <ProjectDetail
    title="Recall"
    techLabel="Python · OpenCV · DeepFace"
    description="Built an edge-deployable face recognition pipeline on Raspberry Pi with <200ms inference latency. Designed threshold-tuned embedding matching with data augmentation for 94% precision and <2% false positives. Shipped streaming endpoints with full OpenAPI documentation and unit tests."
    highlight="Awarded two categories at HackPrinceton 2025 — Best Use of Grok (xAI) and Best Use of Arm (MLH)."
    awards={['Best Use of Grok (xAI)', 'Best Use of Arm (MLH)']}
    metrics={[
      { label: 'Precision', val: '94%' },
      { label: 'Inference latency', val: '<200ms' },
      { label: 'False positive rate', val: '<2%' },
    ]}
    techStack={['Python', 'OpenCV', 'DeepFace', 'MongoDB', 'Grok', 'ElevenLabs']}
    arch={archImg}
    githubLink="https://github.com/Christinetrr/recall"
    liveLink="https://devpost.com/software/recall-cf0dp9"
  />
);

export default Recall;
