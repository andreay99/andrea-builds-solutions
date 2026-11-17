import archImg from '@/assets/cuda-architecture.svg';
import ProjectDetail from './ProjectDetail';

const CudaFlashAttention = () => (
  <ProjectDetail
    title="CUDA Flash Attention"
    techLabel="CUDA · C++ · Python"
    description="Implemented Flash Attention (Dao et al. 2022) forward and backward passes from scratch in raw CUDA C++, including online softmax, tiled GEMM, and gradient recomputation from saved statistics — never materializing the full N×N attention matrix. Achieved 22.9× softmax speedup (4.8 → 110 GB/s) and 86× HBM traffic reduction at seq_len=4096. Contributed a PyTorch CUDA backend API migration to Hugging Face Transformers (PR #45856)."
    highlight="86× HBM traffic reduction at seq_len=4096, validating Flash Attention's performance advantage at production scale. All gradients verified against PyTorch autograd with max error <4e-7."
    metrics={[
      { label: 'Softmax speedup', val: '22.9×' },
      { label: 'HBM reduction (seq=4096)', val: '86×' },
      { label: 'Gradient max error', val: '<4e-7' },
    ]}
    techStack={['CUDA', 'C++', 'Python', 'PyTorch', 'Hugging Face', 'NVIDIA T4']}
    arch={archImg}
    githubLink="https://github.com/andreay99/cuda-flash-attention"
  />
);

export default CudaFlashAttention;
