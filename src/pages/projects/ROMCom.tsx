import ProjectDetail from './ProjectDetail';

const ROMCom = () => (
  <ProjectDetail
    title="ROM-COM"
    techLabel="Python · MediaPipe · FastAPI"
    description="ROM-COM is a webcam-only stroke and TBI upper-extremity rehabilitation system with adaptive range-of-motion calibration and automated FMA-UE clinical scoring. Built at HackPrinceton SP2026, the system uses MediaPipe for real-time joint tracking and a Random Forest classifier for gesture recognition."
    highlight="Built a full clinical rehabilitation pipeline in 36 hours — gesture classification, FMA-UE scoring engine, and real-time WebSocket feedback, all from a webcam."
    awards={['HackPrinceton SP2026']}
    metrics={[
      { label: 'Gesture accuracy', val: '91%' },
      { label: 'Build time', val: '36 hrs' },
      { label: 'Joint tracking', val: 'Real-time' },
    ]}
    techStack={['Python', 'MediaPipe', 'FastAPI', 'scikit-learn', 'React', 'TypeScript', 'Arduino']}
    githubLink="https://github.com/tomiwaaluko/ROM-com"
  />
);

export default ROMCom;
