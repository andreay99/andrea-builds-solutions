import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { RollLink } from '@/components/OrbitButton';

const POSTS = [
  {
    title: "Implementing Flash Attention's backward pass in raw CUDA",
    sub: 'What I learned',
    excerpt: 'Writing a memory-efficient backward pass for Flash Attention from scratch in CUDA C++: tiled recomputation, online softmax statistics, and checking every gradient against PyTorch.',
    date: 'May 2026',
    read: '8 min read',
    tags: 'CUDA · Flash Attention · GPU programming',
    url: 'https://medium.com/@ay387/implementing-flash-attentions-backward-pass-in-raw-cuda-what-i-learned-34514b7c8b5f',
  },
];

const Blog = () => (
  <div className="sky-page">
    <div className="sky-stars" aria-hidden />

    <header className="sky-head">
      <h1 className="serif-title">Writing</h1>
      <p>Write-ups of things I built, mostly the parts that took longest to get right.</p>
    </header>

    <section className="sky-body">
      <ol className="post-list">
        {POSTS.map((p, i) => (
          <Reveal key={p.url} delay={i * 80}>
            <li>
              <a className="post-row" href={p.url} target="_blank" rel="noopener noreferrer">
                <span className="post-meta">{p.date}<br />{p.read}</span>
                <span>
                  <span className="post-title">{p.title}<em> — {p.sub}</em></span>
                  <span className="post-excerpt">{p.excerpt}</span>
                  <span className="post-tags">{p.tags}</span>
                </span>
                <span className="post-arrow"><ArrowUpRight size={20} /></span>
              </a>
            </li>
          </Reveal>
        ))}
      </ol>

      <Reveal>
        <p className="post-more">
          More coming. Follow along on <RollLink href="https://medium.com/@ay387" external>Medium</RollLink>.
        </p>
      </Reveal>
    </section>
  </div>
);

export default Blog;
