import archImg from '@/assets/recall-architecture.png';
import ProjectDetail from './ProjectDetail';

const Recall = () => (
  <ProjectDetail
    title="Recall"
    techLabel="Flask · OpenCV · MongoDB"
    description="Recall is an AI-powered assistive memory system designed to help users remember the people they meet. Using OpenCV for real-time facial detection and recognition, combined with MongoDB for persistent storage, the system identifies faces through a webcam feed and surfaces contextual information via ElevenLabs TTS voice output."
    highlight="Awarded two categories at HackPrinceton 2025 — Best Use of Grok (xAI) and Best Use of Arm (MLH)."
    awards={['Best Use of Grok (xAI)', 'Best Use of Arm (MLH)']}
    metrics={[
      { label: 'Face recognition accuracy', val: '94%' },
      { label: 'Status', val: 'Active Dev' },
      { label: 'Awards', val: '2' },
    ]}
    techStack={['Flask', 'MongoDB', 'OpenCV', 'ElevenLabs TTS', 'Python']}
    arch={archImg}
    githubLink="https://github.com/andreay99/recall"
    liveLink="https://recall-app.vercel.app"
  />
);

export default Recall;
