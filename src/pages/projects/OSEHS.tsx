import archImg from '@/assets/osehs-architecture.svg';
import ProjectDetail from './ProjectDetail';

const OSEHS = () => (
  <ProjectDetail
    title="OSEHS Digital Twin"
    techLabel="Python · NumPy · Swarm AI"
    description="OSEHS (Orbital Solar Energy Harvesting Swarm) is a full 3D digital twin simulating a fleet of satellites in a heliocentric orbit over a 3-year mission. Built for NASA's ORBIT Challenge Phase 2, the simulation models swarm coordination, fault tolerance, and continuous KPP tracking using orbital mechanics libraries and NumPy."
    highlight="Selected for NASA ORBIT Challenge Phase 2 — real orbital mechanics simulation with 94% accuracy and zero collision violations across a 3-year run."
    awards={['NASA ORBIT Challenge Phase 2']}
    metrics={[
      { label: 'Simulation accuracy', val: '94%' },
      { label: 'Mission duration', val: '3 Years' },
      { label: 'Team', val: 'Star Maker' },
    ]}
    techStack={['Python', 'NumPy', 'Matplotlib', 'Orbital Mechanics', 'Swarm AI']}
    arch={archImg}
    githubLink="https://github.com/andreay99/OSEHS-simulation"
  />
);

export default OSEHS;
