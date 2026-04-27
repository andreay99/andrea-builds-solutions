import archImg from '@/assets/bikeshare-architecture.svg';
import ProjectDetail from './ProjectDetail';

const Bikeshare = () => (
  <ProjectDetail
    title="Bikeshare Trip Analysis"
    techLabel="SQL · SQLite · Python"
    description="A full data analysis pipeline built on SQLite that ingests raw bikeshare trip CSVs, cleans and normalizes the data, then runs a suite of analytical queries to surface peak usage windows, station imbalances, and seasonal trends. Results are visualized with Matplotlib dashboards."
    highlight="Uncovered 12+ actionable operational insights from 50,000+ real-world trips."
    metrics={[
      { label: 'Trips analyzed', val: '50K+' },
      { label: 'Query accuracy', val: '98%' },
      { label: 'Insights', val: '12+' },
    ]}
    techStack={['SQL', 'SQLite', 'Python', 'Data Analysis', 'Matplotlib']}
    arch={archImg}
    githubLink="https://github.com/andreay99/bikeshare-analysis"
  />
);

export default Bikeshare;
