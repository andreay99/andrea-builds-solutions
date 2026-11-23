import { CudaChart } from '@/components/CudaChart';
import type { Project } from '@/data/projects';

/** The picture for a project in the Work list: a real screenshot or photo, or the measured chart for CUDA. */
export const hasThumb = (p: Project) => !!p.thumb || p.slug === 'cuda-flash-attention';

export const WorkThumb = ({ project }: { project: Project }) => {
  if (project.slug === 'cuda-flash-attention') return <div className="thumb-chart"><CudaChart compact /></div>;
  if (!project.thumb) return null;
  return <img src={project.thumb.src} alt={project.thumb.alt} loading="lazy" decoding="async"
    style={project.thumb.position ? { objectPosition: project.thumb.position } : undefined} />;
};
