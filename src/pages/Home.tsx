import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectCard } from "@/components/ProjectCard";
import { ArrowRight, Download, Mail, Linkedin, Github, FileText, ExternalLink, Briefcase, Code, Zap, Target, Layers, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ParallaxSection } from "@/components/ParallaxSection";
import { useRef } from "react";
import abstractBg from "@/assets/abstract-background.jpg";
import spaceBg from "@/assets/space-background.jpg";
import techBg from "@/assets/abstract-tech-background.jpg";
import { TypingEffect } from "@/components/TypingEffect";
import { FloatingTechBadges } from "@/components/FloatingTechBadges";
import { BentoProjectGrid } from "@/components/BentoProjectGrid";
import { MarqueeSkills } from "@/components/MarqueeSkills";
import { GlitchText } from "@/components/GlitchText";
import { ParticleBackground } from "@/components/ParticleBackground";
import { ScrollColorTransition } from "@/components/ScrollColorTransition";
import { MagneticButton } from "@/components/MagneticButton";
import { CareerTimeline } from "@/components/CareerTimeline";
import { CircularSkillChart } from "@/components/CircularSkillChart";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { BackToTop } from "@/components/BackToTop";

const Home = () => {
  const featuredProjects = [
    {
      title: "Recall",
      description: "Assistive memory system with facial recognition using OpenCV and MongoDB. Helps users remember people through real-time face detection and recognition.",
      techStack: ["Flask", "MongoDB", "OpenCV", "ElevenLabs TTS", "Python"],
      awards: ["Best Use of Grok (xAI)", "Best Use of Arm (MLH)"],
      link: "/projects/recall",
      githubLink: "https://github.com/andreay99",
    },
    {
      title: "OffScript",
      description: "Real-time AI-powered technical interview simulator with dynamic feedback and comprehensive question generation.",
      techStack: ["Next.js", "TypeScript", "FastAPI", "Gemini AI"],
      awards: ["HackHarvard 2025"],
      link: "/projects/offscript",
      githubLink: "https://github.com/andreay99",
      liveLink: "https://offscript.codestacx.com"
    },
    {
      title: "SONA AI",
      description: "Real-time emotion detection from voice using advanced ML techniques and agentic systems for enhanced accuracy.",
      techStack: ["Python", "TensorFlow", "Librosa", "FastAPI"],
      link: "/projects/sona-ai",
      githubLink: "https://github.com/andreay99",
    },
    {
      title: "Bikeshare Trip Analysis",
      description: "Comprehensive SQL-based analysis system for bikeshare operations, identifying usage patterns and optimization opportunities.",
      techStack: ["SQL", "SQLite", "Python", "Data Analysis"],
      link: "/projects/bikeshare",
      githubLink: "https://github.com/andreay99",
    }
  ];

  return (
    <main className="scroll-container">
      <ScrollProgressBar />
      {/* Hero Section */}
      <ScrollColorTransition 
        fromColor="hsl(36, 38%, 96%)" 
        toColor="hsl(40, 15%, 94%)"
        className="snap-section relative"
      >
      <ParallaxSection 
        bgImage={techBg} 
        speed={0.2}
        bgOpacity={0.06}
        className="relative"
      >
        <section className="flex items-center justify-center pt-24 md:pt-32">
          <ParticleBackground />
          <FloatingTechBadges />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: [0.22, 0.61, 0.36, 1],
            delay: 0.2
          }}
        >
          <ScrollSection>
            <div className="section-container relative z-10">
              <div className="max-w-7xl space-y-16 md:space-y-24">
                <motion.div 
                  className="space-y-6 md:space-y-8"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.4,
                    ease: [0.22, 0.61, 0.36, 1]
                  }}
                >
                  <div className="space-y-3">
                    <h1 className="font-serif leading-tight text-6xl md:text-7xl lg:text-8xl font-bold">
                      <GlitchText>
                        <TypingEffect text="Andrea" delay={500} speed={80} />
                      </GlitchText>
                      <br />
                      <GlitchText>
                        <TypingEffect text="Yanez Soto" delay={1200} speed={80} />
                      </GlitchText>
                    </h1>
                    <div className="flex items-center gap-3 pt-4">
                      <div className="h-1 w-12 bg-gradient-to-r from-accent to-accent/50" />
                      <p className="text-lg md:text-xl font-semibold text-accent tracking-wide">
                        AI/ML & Full-Stack Engineer
                      </p>
                    </div>
                  </div>

                  {/* Animated Stats */}
                  <motion.div 
                    className="flex flex-wrap gap-8 md:gap-12 pt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 1.8,
                      ease: [0.22, 0.61, 0.36, 1]
                    }}
                  >
                    <div className="text-left">
                      <motion.div 
                        className="text-4xl md:text-5xl font-bold text-accent"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.8, duration: 0.6 }}
                      >
                        4
                      </motion.div>
                      <p className="text-sm md:text-base text-muted-foreground mt-2">Deployed Projects</p>
                    </div>
                    <div className="text-left">
                      <motion.div 
                        className="text-4xl md:text-5xl font-bold text-accent"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 2.0, duration: 0.6 }}
                      >
                        2
                      </motion.div>
                      <p className="text-sm md:text-base text-muted-foreground mt-2">Hackathon Wins</p>
                    </div>
                    <div className="text-left">
                      <motion.div 
                        className="text-4xl md:text-5xl font-bold text-accent"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 2.2, duration: 0.6 }}
                      >
                        4+
                      </motion.div>
                      <p className="text-sm md:text-base text-muted-foreground mt-2">Languages</p>
                    </div>
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  className="max-w-3xl space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.6,
                    ease: [0.22, 0.61, 0.36, 1]
                  }}
                >
                  <p className="text-xl md:text-2xl leading-relaxed text-foreground/90 font-light">
                    I build <span className="font-semibold text-accent">AI-powered solutions</span> and <span className="font-semibold text-accent">full-stack products</span> that solve real problems. HackPrinceton 2025 winner. Currently researching AI with NASA.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-4">
                    <Badge className="bg-accent/10 text-accent border border-accent/30 px-3 py-1">🏆 2x Hackathon Winner</Badge>
                    <Badge className="bg-accent/10 text-accent border border-accent/30 px-3 py-1">🚀 4 Deployed Projects</Badge>
                    <Badge className="bg-accent/10 text-accent border border-accent/30 px-3 py-1">🎯 AI/ML Specialist</Badge>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 pt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 2.5,
                    ease: [0.22, 0.61, 0.36, 1]
                  }}
                >
                  <motion.div whileTap={{ scale: 0.98 }} className="flex-1 sm:flex-none">
                    <MagneticButton strength={0.4} distance={120}>
                      <Button asChild size="lg" className="w-full sm:w-auto group text-base px-8 py-7 rounded-lg bg-gradient-to-r from-accent to-accent/80 text-background hover:from-accent hover:to-accent transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-accent/50">
                        <a href="#projects" className="flex items-center justify-center gap-2">
                          <span className="font-semibold">View My Projects</span>
                          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </Button>
                    </MagneticButton>
                  </motion.div>
                  <motion.div whileTap={{ scale: 0.98 }} className="flex-1 sm:flex-none">
                    <MagneticButton strength={0.3} distance={100}>
                      <Button asChild size="lg" className="w-full sm:w-auto text-base px-8 py-7 rounded-lg border-2 border-foreground text-foreground bg-background hover:bg-foreground hover:text-background transition-all duration-300">
                        <a href="/resume.pdf" download className="flex items-center justify-center gap-2">
                          <FileText className="h-5 w-5" />
                          <span className="font-semibold">Download Resume</span>
                        </a>
                      </Button>
                    </MagneticButton>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </ScrollSection>
        </motion.div>
        </section>
      </ParallaxSection>
      </ScrollColorTransition>

      {/* Projects Section */}
      <ScrollColorTransition 
        fromColor="hsl(40, 15%, 94%)" 
        toColor="hsl(40, 15%, 92%)"
        className="snap-section relative"
      >
      <ParallaxSection 
        bgImage={abstractBg} 
        speed={0.4}
        bgOpacity={0.12}
        className="relative"
      >
        <section id="projects" className="flex items-center justify-center py-24">
          <ScrollSection>
          <div className="section-container w-full">
            <div className="mb-20 md:mb-32">
              <h2 className="mb-8 font-serif">
                <GlitchText>Featured Projects</GlitchText>
              </h2>
              <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl leading-relaxed">
                A selection of my recent work in AI/ML, full-stack development, and data analysis.
              </p>
            </div>
            <BentoProjectGrid projects={featuredProjects} />
            <div className="mt-16 text-center">
              <Button asChild size="lg" variant="outline" className="text-base px-8 py-6 rounded-none border-2">
                <Link to="/projects">
                  View All Projects
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          </ScrollSection>
        </section>
      </ParallaxSection>
      </ScrollColorTransition>

      {/* Featured Case Study Section */}
      <ScrollColorTransition 
        fromColor="hsl(40, 15%, 92%)" 
        toColor="hsl(40, 15%, 90%)"
        className="snap-section relative"
      >
      <ParallaxSection 
        bgImage={abstractBg} 
        speed={0.35}
        bgOpacity={0.08}
        className="relative"
      >
        <section id="case-study" className="flex items-center justify-center py-24">
          <ScrollSection>
          <div className="section-container w-full max-w-6xl">
            <div className="mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                className="inline-block mb-4"
              >
                <Badge variant="outline" className="glass text-xs">Featured Project</Badge>
              </motion.div>
              <h2 className="mb-4 font-serif">
                <GlitchText>Recall: Interview Simulator</GlitchText>
              </h2>
              <p className="text-lg text-foreground/70 max-w-3xl leading-relaxed">
                An advanced AI-powered interview preparation platform that provides real-time feedback and personalized coaching.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
              {/* Project Stats */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.1 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Winning Interview Preparation</h3>
                  <p className="text-foreground/70 leading-relaxed">
                    Recall combines advanced AI models with real-world interview scenarios to help professionals ace their technical interviews. The platform provides instant feedback, identifies improvement areas, and delivers personalized recommendations.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.2 }}
                    className="p-4 rounded-lg bg-secondary/50 border border-border/50"
                  >
                    <div className="text-3xl font-bold text-accent mb-1">2</div>
                    <p className="text-sm text-foreground/70">Awards Won</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.3 }}
                    className="p-4 rounded-lg bg-secondary/50 border border-border/50"
                  >
                    <div className="text-3xl font-bold text-accent mb-1">10+</div>
                    <p className="text-sm text-foreground/70">Tech Stack</p>
                  </motion.div>
                </div>

                <div className="space-y-3 pt-4">
                  <h4 className="font-semibold text-foreground">Key Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {["FastAPI", "React", "OpenAI API", "WebRTC", "PostgreSQL", "AWS", "Stripe"].map((tech) => (
                      <Badge key={tech} variant="secondary" className="glass text-xs">{tech}</Badge>
                    ))}
                  </div>
                </div>

                <Button asChild size="lg" className="w-full sm:w-auto rounded-lg mt-4">
                  <Link to="/projects" className="flex items-center justify-center gap-2">
                    View Full Case Study
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>

              {/* Project Metrics & Impact */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.3 }}
                    className="p-6 rounded-lg glass-strong gradient-border space-y-3"
                  >
                    <h4 className="font-semibold text-foreground">Real-Time Feedback</h4>
                    <p className="text-sm text-foreground/70">AI analyzes responses and provides instant, actionable feedback during simulations</p>
                    <div className="inline-flex items-center gap-2 text-accent font-semibold">
                      <Zap className="h-4 w-4" />
                      Live Analysis
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.4 }}
                    className="p-6 rounded-lg glass-strong gradient-border space-y-3"
                  >
                    <h4 className="font-semibold text-foreground">Personalized Coaching</h4>
                    <p className="text-sm text-foreground/70">Adaptive difficulty levels and customized practice plans based on user performance</p>
                    <div className="inline-flex items-center gap-2 text-accent font-semibold">
                      <Target className="h-4 w-4" />
                      Adaptive Learning
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.5 }}
                    className="p-6 rounded-lg glass-strong gradient-border space-y-3"
                  >
                    <h4 className="font-semibold text-foreground">Multi-Modal Input</h4>
                    <p className="text-sm text-foreground/70">Support for code writing, verbal explanations, and whiteboarding exercises</p>
                    <div className="inline-flex items-center gap-2 text-accent font-semibold">
                      <Layers className="h-4 w-4" />
                      Multi-Format
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.6 }}
                    className="p-6 rounded-lg glass-strong gradient-border space-y-3"
                  >
                    <h4 className="font-semibold text-foreground">Progress Tracking</h4>
                    <p className="text-sm text-foreground/70">Detailed analytics and historical performance data to track improvement over time</p>
                    <div className="inline-flex items-center gap-2 text-accent font-semibold">
                      <TrendingUp className="h-4 w-4" />
                      Analytics
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3 }}
              className="mt-16 pt-12 border-t border-border/50 text-center"
            >
              <p className="text-lg text-foreground/70 mb-6">Interested in similar projects or have an opportunity?</p>
              <Button asChild size="lg" className="rounded-lg">
                <Link to="/contact" className="flex items-center justify-center gap-2">
                  Get in Touch
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
          </ScrollSection>
        </section>
      </ParallaxSection>
      </ScrollColorTransition>

      {/* Experience Section */}
      <ScrollColorTransition 
        fromColor="hsl(40, 15%, 92%)" 
        toColor="hsl(38, 20%, 90%)"
        className="snap-section relative"
      >
      <ParallaxSection 
        bgImage={spaceBg} 
        speed={0.3}
        bgOpacity={0.1}
        className="relative"
      >
        <section id="experience" className="flex items-center justify-center py-24">
        <ScrollSection>
          <div className="section-container w-full max-w-5xl">
            <div className="mb-20">
              <h2 className="mb-8 font-serif">
                <GlitchText>Experience</GlitchText>
              </h2>
              <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl leading-relaxed">
                My journey in technology, from research to industry experience.
              </p>
            </div>

            {/* Work Experience */}
            <div className="space-y-8 mb-16">
              <div className="flex items-center gap-3 mb-8">
                <Briefcase className="h-6 w-6 text-accent" />
                <h3 className="text-3xl font-bold">Work Experience</h3>
              </div>

              <CareerTimeline 
                items={[
                  {
                    id: "nasa",
                    title: "NASA-Funded AI Solar Eruption Research",
                    organization: "NASA MIRO Program • NJIT",
                    period: "Nov 2025 - Present",
                    type: "work",
                    description: "Selected to conduct AI-powered solar eruption research using NASA satellite data",
                    highlights: [
                      "Applying machine learning to analyze solar flare activity and develop prediction models",
                      "Program led by Dr. Qin Li and supported by NASA MIRO at NJIT",
                      "Research focuses on predictive modeling of solar eruptions"
                    ]
                  },
                  {
                    id: "apple-lead",
                    title: "Training Lead",
                    organization: "Apple • Edison, NJ",
                    period: "Jul 2025 - Present",
                    type: "work",
                    description: "Led technical training program that improved launch sales",
                    highlights: [
                      "Delivered performance metrics to leadership, accelerating tool adoption",
                      "Provided mentorship and structured guidance to new technicians",
                      "Managed training curriculum for product launches"
                    ]
                  },
                  {
                    id: "apple-specialist",
                    title: "Technical Specialist",
                    organization: "Apple • Edison, NJ",
                    period: "Aug 2024 - Present",
                    type: "work",
                    description: "Troubleshot software and hardware issues across Apple ecosystem",
                    highlights: [
                      "Raised customer satisfaction by 15% through efficient troubleshooting",
                      "Collaborated with engineers to resolve escalated technical issues",
                      "Mentored peers in structured problem-solving, increasing team efficiency by 40%"
                    ]
                  }
                ]}
              />
            </div>

            {/* Technical Skills */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-8">
                <Code className="h-6 w-6 text-accent" />
                <h3 className="text-3xl font-bold">Technical Skills</h3>
              </div>

              {/* Marquee Skills Showcase */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                className="mb-12"
              >
                <MarqueeSkills 
                  skills={[
                    "Python", "JavaScript", "TypeScript", "Java", "SQL", "Node.js", "C++",
                    "Flask", "FastAPI", "Next.js", "PyTorch", "TensorFlow", "HuggingFace",
                    "Azure", "AWS", "Docker", "CI/CD", "OpenCV", "MongoDB", "Git"
                  ]} 
                />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Skill categories with animated progress */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.1 }}
                  className="space-y-4"
                >
                  <div className="text-center mb-6">
                    <h4 className="font-semibold text-foreground mb-2">Languages</h4>
                    <p className="text-xs text-muted-foreground">7 languages mastered</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: "Python", level: 95 },
                      { name: "TypeScript", level: 90 },
                      { name: "JavaScript", level: 88 },
                      { name: "SQL", level: 85 }
                    ].map((skill) => (
                      <motion.div key={skill.name} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-xs text-accent">{skill.level}%</span>
                        </div>
                        <motion.div 
                          className="h-2 bg-secondary rounded-full overflow-hidden"
                          initial={{ scaleX: 0, originX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          viewport={{ once: false }}
                        >
                          <motion.div 
                            className="h-full bg-gradient-to-r from-accent to-accent/60"
                            initial={{ scaleX: 0, originX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            viewport={{ once: false }}
                            style={{ width: `${skill.level}%` }}
                          />
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  <div className="text-center mb-6">
                    <h4 className="font-semibold text-foreground mb-2">Frameworks & Tools</h4>
                    <p className="text-xs text-muted-foreground">11 technologies</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: "FastAPI", level: 92 },
                      { name: "Next.js", level: 88 },
                      { name: "TensorFlow", level: 90 },
                      { name: "Docker", level: 85 }
                    ].map((skill) => (
                      <motion.div key={skill.name} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-xs text-accent">{skill.level}%</span>
                        </div>
                        <motion.div 
                          className="h-2 bg-secondary rounded-full overflow-hidden"
                          initial={{ scaleX: 0, originX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          viewport={{ once: false }}
                        >
                          <motion.div 
                            className="h-full bg-gradient-to-r from-accent to-accent/60"
                            initial={{ scaleX: 0, originX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            viewport={{ once: false }}
                            style={{ width: `${skill.level}%` }}
                          />
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <div className="text-center mb-6">
                    <h4 className="font-semibold text-foreground mb-2">AI/ML Specializations</h4>
                    <p className="text-xs text-muted-foreground">Advanced expertise</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: "Computer Vision", level: 92 },
                      { name: "NLP", level: 88 },
                      { name: "Deep Learning", level: 90 },
                      { name: "Agentic Systems", level: 85 }
                    ].map((skill) => (
                      <motion.div key={skill.name} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-xs text-accent">{skill.level}%</span>
                        </div>
                        <motion.div 
                          className="h-2 bg-secondary rounded-full overflow-hidden"
                          initial={{ scaleX: 0, originX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          viewport={{ once: false }}
                        >
                          <motion.div 
                            className="h-full bg-gradient-to-r from-accent to-accent/60"
                            initial={{ scaleX: 0, originX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            viewport={{ once: false }}
                            style={{ width: `${skill.level}%` }}
                          />
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Quick reference badges section */}
              <div className="mt-12 pt-8 border-t border-border/50">
                <h4 className="text-center font-semibold text-foreground mb-6">Full Technology Stack & Languages</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.1 }}
                  >
                    <p className="text-xs text-muted-foreground mb-2">Languages</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {["Python", "JavaScript", "TypeScript", "Java", "SQL", "Node.js", "C++"].map((skill) => (
                        <Badge key={skill} variant="secondary" className="glass text-xs">{skill}</Badge>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-xs text-muted-foreground mb-2">Frameworks</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {["Flask", "FastAPI", "Next.js", "React", "PyTorch", "TensorFlow"].map((skill) => (
                        <Badge key={skill} variant="secondary" className="glass text-xs">{skill}</Badge>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-xs text-muted-foreground mb-2">Cloud & DevOps</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {["Azure", "AWS", "CI/CD", "Docker", "Git", "GitHub Actions"].map((skill) => (
                        <Badge key={skill} variant="secondary" className="glass text-xs">{skill}</Badge>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.4 }}
                  >
                    <p className="text-xs text-muted-foreground mb-2">Languages (Spoken)</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {["English", "Spanish", "Portuguese", "Korean"].map((language) => (
                        <Badge key={language} variant="secondary" className="glass text-xs">{language}</Badge>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <Button asChild size="lg" variant="outline" className="text-base px-8 py-6 rounded-none border-2">
                <Link to="/experience">
                  View Full Experience
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          </ScrollSection>
        </section>
      </ParallaxSection>
      </ScrollColorTransition>

      {/* Awards & Recognition Section */}
      <ScrollColorTransition 
        fromColor="hsl(38, 20%, 90%)" 
        toColor="hsl(40, 15%, 92%)"
        className="snap-section relative"
      >
      <ParallaxSection 
        bgImage={abstractBg} 
        speed={0.3}
        bgOpacity={0.1}
        className="relative"
      >
        <section id="awards" className="flex items-center justify-center py-24">
          <ScrollSection>
          <div className="section-container w-full max-w-4xl">
            <div className="mb-20">
              <h2 className="mb-8 font-serif">
                <GlitchText>Awards & Recognition</GlitchText>
              </h2>
              <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl leading-relaxed">
                Recognition for innovative work in AI/ML and full-stack development across hackathons and tech competitions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  award: "Best Use of Grok (xAI)",
                  event: "Hackathon 2025",
                  project: "Recall - Interview Simulator",
                  description: "Recognized for innovative implementation of xAI's Grok API in real-world application",
                  icon: "🏆"
                },
                {
                  award: "Best Use of Arm (MLH)",
                  event: "Hackathon 2025",
                  project: "Recall - Interview Simulator",
                  description: "Award for optimized performance on ARM architecture and mobile deployment",
                  icon: "⚡"
                },
                {
                  award: "HackHarvard 2025 Winner",
                  event: "HackHarvard 2025",
                  project: "OffScript - AI Interview Prep",
                  description: "Selected from 200+ teams for excellence in AI/ML innovation and execution",
                  icon: "🎓"
                },
                {
                  award: "NASA MIRO Program",
                  event: "NASA - NJIT Partnership",
                  project: "Solar Eruption AI Research",
                  description: "Selected researcher for NASA-funded AI-powered solar eruption prediction",
                  icon: "🚀"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group p-6 rounded-lg glass-strong gradient-border cursor-pointer transition-all duration-300 hover:shadow-xl"
                >
                  <div className="mb-4 text-4xl">{item.icon}</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{item.award}</h3>
                  <p className="text-sm text-foreground/60 mb-3">{item.event}</p>
                  <p className="text-sm font-semibold text-foreground/80 mb-2">📁 {item.project}</p>
                  <p className="text-sm text-foreground/70 leading-relaxed">{item.description}</p>
                  <motion.div
                    className="mt-4 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-transparent"
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.5 }}
              className="mt-16 pt-12 border-t border-border/50 text-center"
            >
              <p className="text-lg text-foreground/70 mb-6">Continuously pushing boundaries in AI/ML innovation</p>
              <div className="inline-flex items-center gap-4">
                <div className="h-1 w-8 bg-gradient-to-r from-blue-400 to-purple-400" />
                <span className="text-sm font-semibold text-foreground tracking-wide">ALWAYS LEARNING & INNOVATING</span>
                <div className="h-1 w-8 bg-gradient-to-r from-purple-400 to-blue-400" />
              </div>
            </motion.div>
          </div>
          </ScrollSection>
        </section>
      </ParallaxSection>
      </ScrollColorTransition>

      {/* Contact Section */}
      <ScrollColorTransition 
        fromColor="hsl(38, 20%, 90%)" 
        toColor="hsl(36, 38%, 96%)"
        className="snap-section relative"
      >
      <ParallaxSection 
        bgImage={techBg} 
        speed={0.35}
        bgOpacity={0.08}
        className="relative"
      >
        <section id="contact" className="flex items-center justify-center py-24">
        <ScrollSection>
          <div className="section-container w-full max-w-4xl">
            <div className="mb-20">
              <h2 className="mb-8 font-serif">
                <GlitchText>Get in Touch</GlitchText>
              </h2>
              <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl leading-relaxed">
                I'm always interested in discussing new opportunities, collaborations, or interesting projects.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {[
                {
                  icon: <Mail className="h-8 w-8 text-accent mb-2" />,
                  title: "Email",
                  description: "Send me a message",
                  button: (
                    <Button asChild className="w-full" variant="default">
                      <a href="mailto:andreayanez11@outlook.com">
                        andreayanez11@outlook.com
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  )
                },
                {
                  icon: <Linkedin className="h-8 w-8 text-accent mb-2" />,
                  title: "LinkedIn",
                  description: "Connect professionally",
                  button: (
                    <Button asChild className="w-full" variant="default">
                      <a href="https://www.linkedin.com/in/andrea-yanez-soto-8b4653218" target="_blank" rel="noopener noreferrer">
                        View Profile
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  )
                },
                {
                  icon: <Github className="h-8 w-8 text-accent mb-2" />,
                  title: "GitHub",
                  description: "Check out my code",
                  button: (
                    <Button asChild className="w-full" variant="default">
                      <a href="https://github.com/andreayanez" target="_blank" rel="noopener noreferrer">
                        View Repositories
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  )
                },
                {
                  icon: <FileText className="h-8 w-8 text-accent mb-2" />,
                  title: "Resume",
                  description: "Download my CV",
                  button: (
                    <Button asChild className="w-full" variant="default">
                      <a href="/resume.pdf" download>
                        Download PDF
                        <Download className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  )
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.22, 0.61, 0.36, 1]
                  }}
                  whileHover={{
                    y: -4,
                    transition: { duration: 0.2 }
                  }}
                >
                  <Card className="hover-lift hover:shadow-lg transition-all bg-card/80 backdrop-blur h-full">
                    <CardHeader>
                      <motion.div 
                        whileHover={{ 
                          scale: 1.15, 
                          rotate: index === 0 ? -5 : index === 1 ? 5 : index === 2 ? -8 : 8,
                          y: -8
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                      >
                        {item.icon}
                      </motion.div>
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {item.button}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card className="bg-accent/5 border-accent/20 backdrop-blur">
              <CardHeader>
                <CardTitle>Additional Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Devpost</span>
                  <Button asChild variant="link">
                    <a href="https://devpost.com/andreayanez" target="_blank" rel="noopener noreferrer">
                      View Projects <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Phone</span>
                  <Button asChild variant="link">
                    <a href="tel:+17325200494">+1 (732) 520-0494</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollSection>
        </section>
      </ParallaxSection>
      </ScrollColorTransition>
      <BackToTop />
    </main>
  );
};

// Scroll animation wrapper component with enhanced smooth animations
const ScrollSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        scale: 1,
      } : { 
        opacity: 0, 
        y: 50, 
        scale: 0.95,
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 0.61, 0.36, 1], // Custom easing for smooth effect
        opacity: { duration: 0.6 },
        scale: { duration: 0.8 }
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export default Home;
