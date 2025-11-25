import { ProjectCard } from "@/components/ProjectCard";
import { PageTransition } from "@/components/PageTransition";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const projects = [
    {
      title: "Recall",
      description: "Assistive memory system with facial recognition using OpenCV and MongoDB. Helps users remember people through real-time face detection and recognition.",
      techStack: ["Flask", "MongoDB", "OpenCV", "ElevenLabs TTS", "Python"],
      awards: ["Best Use of Grok (xAI)", "Best Use of Arm (MLH)"],
      link: "/projects/recall",
      categories: ["ai-ml"]
    },
    {
      title: "OffScript",
      description: "Real-time AI-powered technical interview simulator with dynamic feedback and comprehensive question generation.",
      techStack: ["Next.js", "TypeScript", "FastAPI", "Gemini AI"],
      awards: ["HackHarvard 2025"],
      link: "/projects/offscript",
      categories: ["ai-ml", "full-stack"]
    },
    {
      title: "SONA AI",
      description: "Real-time emotion detection from voice using advanced ML techniques and agentic systems for enhanced accuracy.",
      techStack: ["Python", "TensorFlow", "Librosa", "FastAPI"],
      link: "/projects/sona-ai",
      categories: ["ai-ml"]
    },
    {
      title: "Bikeshare Trip Analysis",
      description: "Comprehensive SQL-based analysis system for bikeshare operations, identifying usage patterns and optimization opportunities.",
      techStack: ["SQL", "SQLite", "Python", "Data Analysis"],
      link: "/projects/bikeshare",
      categories: ["full-stack", "cloud"]
    }
  ];

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.categories.includes(activeCategory));

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-20">
        <div className="section-container">
          <div className="mb-12">
            <h1 className="mb-4">Projects</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              A comprehensive showcase of my work in AI/ML engineering, full-stack development, and data analysis. 
              Each project demonstrates rapid prototyping, technical depth, and real-world impact.
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveCategory}>
            <TabsList className="mb-8 w-full md:w-auto">
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="ai-ml">AI/ML</TabsTrigger>
              <TabsTrigger value="full-stack">Full-Stack</TabsTrigger>
              <TabsTrigger value="cloud">Cloud</TabsTrigger>
            </TabsList>

            <TabsContent value={activeCategory} className="mt-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.title}
                      initial={{ opacity: 0, y: 60, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: [0.22, 0.61, 0.36, 1],
                      }}
                      whileHover={{ 
                        y: -8,
                        transition: { duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }
                      }}
                    >
                      <ProjectCard {...project} />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageTransition>
  );
};

export default Projects;
