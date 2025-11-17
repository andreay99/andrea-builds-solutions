import { ProjectCard } from "@/components/ProjectCard";

const Projects = () => {
  const projects = [
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
    <div className="min-h-screen pt-24 pb-20">
      <div className="section-container">
        <div className="mb-12">
          <h1 className="mb-4">Projects</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            A comprehensive showcase of my work in AI/ML engineering, full-stack development, and data analysis. 
            Each project demonstrates rapid prototyping, technical depth, and real-world impact.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
