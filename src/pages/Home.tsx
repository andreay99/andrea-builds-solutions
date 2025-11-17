import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";
import { ArrowRight, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";

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

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <PageTransition>
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-48 md:pt-64 pb-32 md:pb-48 section-container overflow-hidden">
        <motion.div 
          className="max-w-7xl space-y-16 md:space-y-24"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.div 
            className="space-y-6 md:space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="font-serif leading-none">
              Andrea<br />
              Yanez<br />
              Soto
            </h1>
          </motion.div>
          
          <motion.div 
            className="max-w-2xl space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <p className="text-2xl md:text-3xl leading-relaxed text-foreground/90">
              CS student specializing in AI/ML and full-stack development.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-foreground/70">
              Relentlessly building tools that solve real problems. I build AI-driven tools and full-stack products that move quickly from idea to reality.
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-6 pt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <Button asChild size="lg" className="group text-base px-8 py-6 rounded-none border-2 border-foreground text-foreground bg-transparent hover:bg-foreground hover:text-background transition-all">
              <Link to="/projects">
                View Projects
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base px-8 py-6 rounded-none border-2 border-foreground text-foreground hover:bg-foreground hover:text-background transition-all">
              <a href="/resume.pdf" download>
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-32 md:py-48">
        <div className="section-container">
          <motion.div 
            className="mb-20 md:mb-32"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="mb-8 font-serif">Featured Projects</h2>
            <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl leading-relaxed">
              A selection of my recent work in AI/ML, full-stack development, and data analysis.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-32 md:py-48 border-t border-foreground/10">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-16 md:gap-24">
            {[
              { value: "4+", label: "Projects Completed" },
              { value: "2", label: "Hackathon Awards" },
              { value: "5+", label: "Tech Stacks" },
              { value: "4", label: "Languages" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              >
                <div className="text-6xl md:text-7xl font-serif font-bold mb-4">{stat.value}</div>
                <div className="text-sm uppercase tracking-wider text-foreground/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      </div>
    </PageTransition>
  );
};

export default Home;
