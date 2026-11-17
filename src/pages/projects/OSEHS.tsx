import { OSEHSSim } from '@/components/OSEHSSim';
import ProjectDetail from './ProjectDetail';

const OSEHS = () => (
  <ProjectDetail
    title="OSEHS Digital Twin"
    techLabel="Python · NumPy · Swarm AI"
    description="Built a Python orbital simulation and digital twin for a 20-unit satellite swarm, modeling relative formation dynamics with Clohessy-Wiltshire equations and measuring end-to-end pipeline efficiency at 65.3%. Designed a decentralized gossip protocol for inter-satellite state sharing, holding formation and reaching consensus with no central ground-control bottleneck. Presented the system architecture at the NASA Orbit poster review."
    highlight="Selected for NASA ORBIT Challenge Phase 2 — decentralized swarm coordination with gossip protocol consensus, no single point of failure."
    awards={['NASA ORBIT Challenge Phase 2']}
    metrics={[
      { label: 'Pipeline efficiency', val: '65.3%' },
      { label: 'Swarm units', val: '20' },
      { label: 'Team', val: 'Star Maker' },
    ]}
    techStack={['Python', 'NumPy', 'Matplotlib', 'CW Equations', 'Gossip Protocol']}
    simComponent={<OSEHSSim />}
    githubLink="https://github.com/andreay99/OSEHS-simulation"
  />
);

export default OSEHS;
