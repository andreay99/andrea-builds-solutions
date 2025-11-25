import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectCard } from "@/components/ProjectCard";
import { ArrowRight, Download, Mail, Linkedin, Github, FileText, ExternalLink, Briefcase, Code } from "lucide-react";
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
    <main className="scroll-container">
      {/* Hero Section */}
      <ParallaxSection 
        bgImage={techBg} 
        speed={0.2}
        bgOpacity={0.06}
        className="snap-section relative bg-surface-1"
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
                  <h1 className="font-serif leading-tight">
                    <GlitchText>
                      <TypingEffect text="Andrea" delay={500} speed={80} />
                    </GlitchText>
                    <br />
                    <GlitchText>
                      <TypingEffect text="Yanez" delay={1200} speed={80} />
                    </GlitchText>
                    <br />
                    <GlitchText>
                      <TypingEffect text="Soto" delay={1800} speed={80} />
                    </GlitchText>
                  </h1>
                </motion.div>
                
                <motion.div 
                  className="max-w-2xl space-y-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.6,
                    ease: [0.22, 0.61, 0.36, 1]
                  }}
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 2.5,
                    ease: [0.22, 0.61, 0.36, 1]
                  }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button asChild size="lg" className="group text-base px-8 py-6 rounded-none border-2 border-foreground text-foreground bg-transparent hover:bg-foreground hover:text-background transition-all relative overflow-hidden">
                      <a href="#projects">
                        <span className="relative z-10">View Projects</span>
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform relative z-10" />
                        <motion.div
                          className="absolute inset-0 bg-foreground"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ zIndex: 0 }}
                        />
                      </a>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button asChild size="lg" variant="outline" className="text-base px-8 py-6 rounded-none border-2 border-foreground text-foreground hover:bg-foreground hover:text-background transition-all">
                      <a href="/resume.pdf" download>
                        <Download className="mr-2 h-5 w-5" />
                        Download Resume
                      </a>
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </ScrollSection>
        </motion.div>
        </section>
      </ParallaxSection>

      {/* Projects Section */}
      <ParallaxSection 
        bgImage={abstractBg} 
        speed={0.4}
        bgOpacity={0.12}
        className="snap-section bg-surface-2"
      >
        <section id="projects" className="flex items-center justify-center py-24">
          <ScrollSection>
          <div className="section-container w-full">
            <div className="mb-20 md:mb-32">
              <h2 className="mb-8 font-serif">Featured Projects</h2>
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

      {/* Experience Section */}
      <ParallaxSection 
        bgImage={spaceBg} 
        speed={0.3}
        bgOpacity={0.1}
        className="snap-section bg-surface-3"
      >
        <section id="experience" className="flex items-center justify-center py-24">
        <ScrollSection>
          <div className="section-container w-full max-w-5xl">
            <div className="mb-20">
              <h2 className="mb-8 font-serif">Experience</h2>
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

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.1 }}
              >
                <Card className="border-l-4 border-l-accent glass-strong gradient-border">
                  <CardHeader>
                    <div className="flex justify-between items-start flex-wrap gap-4">
                      <div>
                        <CardTitle className="text-2xl">NASA-Funded AI Solar Eruption Research</CardTitle>
                        <CardDescription className="text-base mt-1">
                          NASA MIRO Program • NJIT
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="glass">Nov 2025 - Present</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Selected to conduct AI-powered solar eruption research using NASA satellite data</li>
                      <li>• Applying machine learning to analyze solar flare activity and develop prediction models</li>
                      <li>• Program led by Dr. Qin Li and supported by NASA MIRO at NJIT</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.2 }}
              >
                <Card className="border-l-4 border-l-accent glass-strong gradient-border">
                  <CardHeader>
                    <div className="flex justify-between items-start flex-wrap gap-4">
                      <div>
                        <CardTitle className="text-2xl">Training Lead</CardTitle>
                        <CardDescription className="text-base mt-1">
                          Apple • Edison, NJ
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="glass">Jul 2025 - Present</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Led technical training program that improved launch sales</li>
                      <li>• Delivered performance metrics to leadership, accelerating tool adoption</li>
                      <li>• Provided mentorship and structured guidance to new technicians</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border-l-4 border-l-accent glass-strong gradient-border">
                  <CardHeader>
                    <div className="flex justify-between items-start flex-wrap gap-4">
                      <div>
                        <CardTitle className="text-2xl">Technical Specialist</CardTitle>
                        <CardDescription className="text-base mt-1">
                          Apple • Edison, NJ
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="glass">Aug 2024 - Present</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Troubleshot software and hardware issues across macOS, iPadOS, and iOS, raising satisfaction by 15%</li>
                      <li>• Collaborated with engineers to resolve escalated technical issues</li>
                      <li>• Mentored peers in structured problem-solving, increasing team efficiency by 40%</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="glass-strong gradient-border">
                    <CardHeader>
                      <CardTitle>Languages</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {["Python", "JavaScript", "TypeScript", "Java", "SQL", "Node.js", "C++"].map((skill) => (
                          <Badge key={skill} variant="secondary" className="glass">{skill}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="glass-strong gradient-border">
                    <CardHeader>
                      <CardTitle>Frameworks & Tools</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {["Flask", "FastAPI", "Next.js", "PyTorch", "TensorFlow", "HuggingFace", "OpenCV", "MongoDB", "Git", "GitHub Actions", "Postman"].map((skill) => (
                          <Badge key={skill} variant="secondary" className="glass">{skill}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="glass-strong gradient-border">
                    <CardHeader>
                      <CardTitle>Cloud & DevOps</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {["Azure", "AWS", "CI/CD", "Docker"].map((skill) => (
                          <Badge key={skill} variant="secondary" className="glass">{skill}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="glass-strong gradient-border">
                    <CardHeader>
                      <CardTitle>AI/ML Specializations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {["Facial Recognition", "NLP", "Computer Vision", "Real-Time Processing", "Deep Learning", "Agentic Systems"].map((skill) => (
                          <Badge key={skill} variant="secondary" className="glass">{skill}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.5 }}
                className="mt-6"
              >
                <Card className="glass-strong gradient-border">
                  <CardHeader>
                    <CardTitle>Spoken Languages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {["English", "Spanish", "Portuguese", "Korean"].map((language) => (
                        <Badge key={language} variant="secondary" className="glass">{language}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
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

      {/* Contact Section */}
      <ParallaxSection 
        bgImage={techBg} 
        speed={0.35}
        bgOpacity={0.08}
        className="snap-section bg-surface-1"
      >
        <section id="contact" className="flex items-center justify-center py-24">
        <ScrollSection>
          <div className="section-container w-full max-w-4xl">
            <div className="mb-20">
              <h2 className="mb-8 font-serif">Get in Touch</h2>
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
                      {item.icon}
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
                    <a href="tel:+17329979798">+1 (732) 997-9798</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollSection>
        </section>
      </ParallaxSection>
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
