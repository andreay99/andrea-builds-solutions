import archImg from '@/assets/offscript-architecture.svg';
import ProjectDetail from './ProjectDetail';

const OffScript = () => (
  <ProjectDetail
    title="OffScript"
    techLabel="Next.js · FastAPI · Gemini AI"
    description="OffScript is an end-to-end AI interview simulator. Candidates practice live coding and behavioral questions while the system generates adaptive follow-ups powered by Google Gemini. A FastAPI backend streams feedback in real-time, while the Next.js frontend renders a polished split-screen interview UI."
    highlight="Built and shipped at HackHarvard 2025 in under 24 hours with a team of 3 engineers."
    awards={['HackHarvard 2025']}
    metrics={[
      { label: 'Response accuracy', val: '92%' },
      { label: 'Status', val: 'Early Stage' },
      { label: 'Awards', val: '1' },
    ]}
    techStack={['Next.js', 'TypeScript', 'FastAPI', 'Gemini AI']}
    arch={archImg}
    githubLink="https://github.com/andreay99/offscript"
    liveLink="https://offscript.codestacx.com"
  />
);

export default OffScript;
