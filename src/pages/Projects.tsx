import { ProjectCard } from "@/components/ProjectCard";
import { PageTransition } from "@/components/PageTransition";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { ArrowRight, Zap, Trophy, Code, X } from "lucide-react";
import { GlitchText } from "@/components/GlitchText";
import { ParallaxSection } from "@/components/ParallaxSection";
import abstractBg from "@/assets/abstract-background.jpg";

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const projects = [
    {
      title: "Recall",
      description: "Assistive memory system with facial recognition using OpenCV and MongoDB. Helps users remember people through real-time face detection and recognition.",
      techStack: ["Flask", "MongoDB", "OpenCV", "ElevenLabs TTS", "Python"],
      awards: ["Best Use of Grok (xAI)", "Best Use of Arm (MLH)"],
      link: "/projects/recall",
      categories: ["ai-ml"],
      featured: true,
      metrics: { accuracy: "94%", users: "500+", impact: "2 Awards" }
    },
    {
      title: "OffScript",
      description: "Real-time AI-powered technical interview simulator with dynamic feedback and comprehensive question generation.",
      techStack: ["Next.js", "TypeScript", "FastAPI", "Gemini AI"],
      awards: ["HackHarvard 2025"],
      link: "/projects/offscript",
      categories: ["ai-ml", "full-stack"],
      featured: true,
      metrics: { accuracy: "92%", users: "1000+", impact: "1 Award" }
    },
    {
      title: "SONA AI",
      description: "Real-time emotion detection from voice using advanced ML techniques and agentic systems for enhanced accuracy.",
      techStack: ["Python", "TensorFlow", "Librosa", "FastAPI"],
      link: "/projects/sona-ai",
      categories: ["ai-ml"],
      featured: false,
      metrics: { accuracy: "89%", users: "100+", impact: "Research" }
    },
    {
      title: "Bikeshare Trip Analysis",
      description: "Comprehensive SQL-based analysis system for bikeshare operations, identifying usage patterns and optimization opportunities.",
      techStack: ["SQL", "SQLite", "Python", "Data Analysis"],
      link: "/projects/bikeshare",
      categories: ["full-stack", "cloud"],
      featured: false,
      metrics: { accuracy: "98%", users: "50K+", impact: "Data Insights" }
    }
  ];

  // Calculate stats
  const stats = useMemo(() => ({
    totalProjects: projects.length,
    totalAwards: projects.reduce((sum, p) => sum + (p.awards?.length || 0), 0),
    uniqueTechs: new Set(projects.flatMap(p => p.techStack)).size,
    featuredCount: projects.filter(p => p.featured).length
  }), []);

  // Get unique tech stack for visualization
  const allTechs = useMemo(() => {
    const techCount: { [key: string]: number } = {};
    projects.forEach(project => {
      project.techStack.forEach(tech => {
        techCount[tech] = (techCount[tech] || 0) + 1;
      });
    });
    return Object.entries(techCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12);
  }, []);

  const filteredProjects = useMemo(() => {
    let filtered = activeCategory === "all" 
      ? projects 
      : projects.filter(project => project.categories.includes(activeCategory));
    
    // Apply tech filter
    if (selectedTech) {
      filtered = filtered.filter(project => project.techStack.includes(selectedTech));
    }
    
    if (sortBy === "featured") {
      return filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    } else if (sortBy === "awards") {
      return filtered.sort((a, b) => (b.awards?.length || 0) - (a.awards?.length || 0));
    }
    return filtered;
  }, [activeCategory, sortBy, selectedTech]);

  return (
    <PageTransition>
      <div className="min-h-screen pb-20">
        {/* Hero Section with Stats */}
        <ParallaxSection 
          bgImage={abstractBg}
          speed={0.3}
          bgOpacity={0.08}
          className="relative"
        >
          <div className="pt-32 pb-20">
            <div className="section-container">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h1 className="text-6xl md:text-7xl font-serif font-bold">
                    <GlitchText>Project Portfolio</GlitchText>
                  </h1>
                  <p className="text-xl text-foreground/70 max-w-3xl leading-relaxed">
                    A comprehensive showcase of my work in AI/ML engineering, full-stack development, and data analysis. 
                    Each project demonstrates rapid prototyping, technical depth, and real-world impact.
                  </p>
                </div>

                {/* Stats Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8"
                >
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="p-6 rounded-lg bg-secondary/50 border border-border/50 backdrop-blur"
                  >
                    <div className="text-3xl font-bold text-accent mb-2">{stats.totalProjects}</div>
                    <p className="text-sm text-foreground/70">Projects Built</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="p-6 rounded-lg bg-secondary/50 border border-border/50 backdrop-blur"
                  >
                    <div className="text-3xl font-bold text-accent mb-2">{stats.totalAwards}</div>
                    <p className="text-sm text-foreground/70">Awards Won</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="p-6 rounded-lg bg-secondary/50 border border-border/50 backdrop-blur"
                  >
                    <div className="text-3xl font-bold text-accent mb-2">{stats.uniqueTechs}</div>
                    <p className="text-sm text-foreground/70">Technologies</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="p-6 rounded-lg bg-secondary/50 border border-border/50 backdrop-blur"
                  >
                    <div className="text-3xl font-bold text-accent mb-2">{stats.featuredCount}</div>
                    <p className="text-sm text-foreground/70">Featured</p>
                  </motion.div>
                </motion.div>

                {/* Tech Stack Visualization */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="pt-8 border-t border-border/30"
                >
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-semibold text-foreground">Most Used Technologies {selectedTech && `(Filtering by ${selectedTech})`}</p>
                    {selectedTech && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={() => setSelectedTech(null)}
                        className="flex items-center gap-1 px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold hover:bg-accent/30 transition-colors"
                      >
                        <X className="h-3 w-3" />
                        Clear Filter
                      </motion.button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {allTechs.map(([tech, count]) => (
                      <motion.button
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.1, y: -3 }}
                        transition={{ delay: Math.random() * 0.3 }}
                        onClick={() => setSelectedTech(selectedTech === tech ? null : tech)}
                        className={`px-4 py-2 rounded-full border text-sm font-medium transition-all cursor-pointer ${
                          selectedTech === tech
                            ? 'bg-accent/30 border-accent/50 text-accent ring-2 ring-accent/50'
                            : 'bg-accent/10 border-accent/30 text-accent hover:bg-accent/20'
                        }`}
                      >
                        {tech}
                        <span className="ml-2 text-xs opacity-60">×{count}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </ParallaxSection>

        {/* Projects Section */}
        <div className="section-container py-20">
          {/* Filter and Sort Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="mb-12 space-y-6"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Browse Projects</h2>
                <p className="text-sm text-foreground/60">Showing {filteredProjects.length} of {projects.length} projects</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex gap-2 p-1 bg-secondary rounded-lg border border-border/50"
                >
                  <Button 
                    variant={sortBy === "featured" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSortBy("featured")}
                    className="gap-2"
                  >
                    <Zap className="h-4 w-4" />
                    Featured
                  </Button>
                  <Button 
                    variant={sortBy === "awards" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSortBy("awards")}
                    className="gap-2"
                  >
                    <Trophy className="h-4 w-4" />
                    Awards
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Category Tabs */}
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveCategory}>
            <TabsList className="mb-12 w-full md:w-auto">
              <TabsTrigger value="all" className="gap-2">
                <Code className="h-4 w-4" />
                All Projects
              </TabsTrigger>
              <TabsTrigger value="ai-ml">AI/ML</TabsTrigger>
              <TabsTrigger value="full-stack">Full-Stack</TabsTrigger>
              <TabsTrigger value="cloud">Cloud</TabsTrigger>
            </TabsList>

            <TabsContent value={activeCategory} className="mt-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCategory}-${sortBy}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
                >
                  {filteredProjects.length > 0 ? (
                    filteredProjects.map((project, index) => (
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
                        {project.featured && (
                          <div className="absolute -top-3 -left-3 z-10">
                            <Badge className="gap-1 bg-accent text-accent-foreground shadow-lg">
                              <Zap className="h-3 w-3" />
                              Featured
                            </Badge>
                          </div>
                        )}
                        <ProjectCard {...project} />
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="col-span-full text-center py-12"
                    >
                      <p className="text-foreground/60">No projects found in this category.</p>
                    </motion.div>
                  )}
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
