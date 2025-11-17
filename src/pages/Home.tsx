import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";
import { ArrowRight, Download } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const featuredProjects = [
    {
      title: "Recall",
      description: "Assistive memory system with facial recognition using OpenCV and MongoDB. Helps users remember people through real-time face detection and recognition.",
      techStack: ["Flask", "MongoDB", "OpenCV", "ElevenLabs TTS", "Python"],
      awards: ["Best Use of Grok (xAI)", "Best Use of Arm (MLH)"],
      link: "/projects/recall"
    },
    {
      title: "OffScript",
      description: "Real-time AI-powered technical interview simulator with dynamic feedback and comprehensive question generation.",
      techStack: ["Next.js", "TypeScript", "FastAPI", "Gemini AI"],
      awards: ["HackHarvard 2025"],
      link: "/projects/offscript"
    },
    {
      title: "SONA AI",
      description: "Real-time emotion detection from voice using advanced ML techniques and agentic systems for enhanced accuracy.",
      techStack: ["Python", "TensorFlow", "Librosa", "FastAPI"],
      link: "/projects/sona-ai"
    },
    {
      title: "Bikeshare Trip Analysis",
      description: "Comprehensive SQL-based analysis system for bikeshare operations, identifying usage patterns and optimization opportunities.",
      techStack: ["SQL", "SQLite", "Python", "Data Analysis"],
      link: "/projects/bikeshare"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 section-container">
        <div className="max-w-4xl">
          <div className="inline-block mb-4">
            <span className="text-sm font-medium text-accent">Available for internships</span>
          </div>
          <h1 className="mb-6 text-balance">
            Andrea Yanez Soto
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 text-balance">
            CS student specializing in AI/ML and full-stack development.
          </p>
          <p className="text-lg text-muted-foreground mb-8 text-balance">
            Relentlessly building tools that solve real problems. I build AI-driven tools and full-stack products that move quickly from idea to reality.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="group">
              <Link to="/projects">
                View Projects
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="/resume.pdf" download>
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-secondary/30">
        <div className="section-container">
          <div className="mb-12">
            <h2 className="mb-4">Featured Projects</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              A selection of my recent work in AI/ML, full-stack development, and data analysis.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">4+</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">2</div>
              <div className="text-sm text-muted-foreground">Hackathon Awards</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">5+</div>
              <div className="text-sm text-muted-foreground">Tech Stacks</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">4</div>
              <div className="text-sm text-muted-foreground">Languages</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
