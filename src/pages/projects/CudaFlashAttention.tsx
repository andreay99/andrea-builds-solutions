import archImg from '@/assets/cuda-architecture.svg';
import ProjectDetail from './ProjectDetail';

const CudaFlashAttention = () => (
  <ProjectDetail
    title="CUDA Flash Attention"
    techLabel="CUDA · C++ · Python"
    description="Ground-up CUDA implementation of softmax and scaled dot-product attention, optimized step by step from naive kernels to a full Flash Attention backward pass. Benchmarked at each stage — achieved 22.9× memory bandwidth improvement on softmax and 22.67× HBM traffic reduction over baseline attention on an NVIDIA T4."
    highlight="Flash Attention backward pass implemented in raw CUDA — including gradient recomputation from saved statistics (m and l), without ever materializing the full N×N score matrix."
    metrics={[
      { label: 'Softmax speedup', val: '22.9×' },
      { label: 'HBM traffic reduction', val: '22.67×' },
      { label: 'Gradient max error', val: '~1e-7' },
    ]}
    techStack={['CUDA', 'C++', 'Python', 'PyTorch', 'NVIDIA T4', 'Flash Attention']}
    arch={archImg}
    githubLink="https://github.com/andreay99/cuda-flash-attention"
  />
);

export default CudaFlashAttention;
