import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectCard } from "@/components/ProjectCard";
import { ArrowRight, Download, Mail, Linkedin, Github, FileText, ExternalLink, Briefcase, Code } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { MagneticButton } from "@/components/MagneticButton";
import { useRef } from "react";

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
      <section className="snap-section relative bg-surface-1 flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('/src/assets/abstract-tech-background.jpg')] bg-no-repeat bg-center opacity-10" style={{ backgroundSize: '90%' }} />
        <ScrollSection>
          <div className="section-container relative z-10">
            <div className="max-w-7xl space-y-16 md:space-y-24">
              <div className="space-y-6 md:space-y-8">
                <h1 className="font-serif leading-none">
                  Andrea<br />
                  Yanez<br />
                  Soto
                </h1>
              </div>
              
              <div className="max-w-2xl space-y-8">
                <p className="text-2xl md:text-3xl leading-relaxed text-foreground/90">
                  CS student specializing in AI/ML and full-stack development.
                </p>
                <p className="text-lg md:text-xl leading-relaxed text-foreground/70">
                  Relentlessly building tools that solve real problems. I build AI-driven tools and full-stack products that move quickly from idea to reality.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 pt-8">
                <MagneticButton strength={0.4} distance={120}>
                  <Button asChild size="lg" className="group text-base px-8 py-6 rounded-none border-2 border-foreground text-foreground bg-transparent hover:bg-foreground hover:text-background transition-all">
                    <a href="#projects">
                      View Projects
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </MagneticButton>
                <MagneticButton strength={0.4} distance={120}>
                  <Button asChild size="lg" variant="outline" className="text-base px-8 py-6 rounded-none border-2 border-foreground text-foreground hover:bg-foreground hover:text-background transition-all">
                    <a href="/resume.pdf" download>
                      <Download className="mr-2 h-5 w-5" />
                      Download Resume
                    </a>
                  </Button>
                </MagneticButton>
              </div>
            </div>
          </div>
        </ScrollSection>
      </section>

      {/* Projects Section */}
      <section id="projects" className="snap-section bg-surface-2 flex items-center justify-center py-24">
        <ScrollSection>
          <div className="section-container w-full">
            <div className="mb-20 md:mb-32">
              <h2 className="mb-8 font-serif">Featured Projects</h2>
              <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl leading-relaxed">
                A selection of my recent work in AI/ML, full-stack development, and data analysis.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0.85, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ 
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.25, 0.1, 0.25, 1.0]
                  }}
                >
                  <ProjectCard {...project} />
                </motion.div>
              ))}
            </div>
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

      {/* Experience Section */}
      <section id="experience" className="snap-section bg-surface-3 flex items-center justify-center py-24">
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

              <Card className="border-l-4 border-l-accent bg-card/80 backdrop-blur">
                <CardHeader>
                  <div className="flex justify-between items-start flex-wrap gap-4">
                    <div>
                      <CardTitle className="text-2xl">NASA-Funded AI Solar Eruption Research</CardTitle>
                      <CardDescription className="text-base mt-1">
                        NASA MIRO Program • NJIT
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">Nov 2025 - Present</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Applying machine learning to analyze solar flare activity from NASA satellite data</li>
                    <li>• Developing prediction models for solar eruptions using advanced ML techniques</li>
                    <li>• Contributing to NASA's mission to understand and predict space weather events</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Technical Skills */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-8">
                <Code className="h-6 w-6 text-accent" />
                <h3 className="text-3xl font-bold">Technical Skills</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-card/80 backdrop-blur">
                  <CardHeader>
                    <CardTitle>Languages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {["Python", "JavaScript", "TypeScript", "SQL", "C++", "Java"].map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/80 backdrop-blur">
                  <CardHeader>
                    <CardTitle>AI/ML Specializations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {["TensorFlow", "PyTorch", "OpenCV", "NLP", "Computer Vision", "Deep Learning"].map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
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

      {/* Contact Section */}
      <section id="contact" className="snap-section bg-surface-1 flex items-center justify-center py-24">
        <ScrollSection>
          <div className="section-container w-full max-w-4xl">
            <div className="mb-20">
              <h2 className="mb-8 font-serif">Get in Touch</h2>
              <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl leading-relaxed">
                I'm always interested in discussing new opportunities, collaborations, or interesting projects.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <Card className="hover-lift hover:shadow-lg transition-all bg-card/80 backdrop-blur">
                <CardHeader>
                  <Mail className="h-8 w-8 text-accent mb-2" />
                  <CardTitle>Email</CardTitle>
                  <CardDescription>Send me a message</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full" variant="default">
                    <a href="mailto:andreayanez11@outlook.com">
                      andreayanez11@outlook.com
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover-lift hover:shadow-lg transition-all bg-card/80 backdrop-blur">
                <CardHeader>
                  <Linkedin className="h-8 w-8 text-accent mb-2" />
                  <CardTitle>LinkedIn</CardTitle>
                  <CardDescription>Connect professionally</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full" variant="default">
                    <a href="https://linkedin.com/in/andreayanezsoto" target="_blank" rel="noopener noreferrer">
                      View Profile
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover-lift hover:shadow-lg transition-all bg-card/80 backdrop-blur">
                <CardHeader>
                  <Github className="h-8 w-8 text-accent mb-2" />
                  <CardTitle>GitHub</CardTitle>
                  <CardDescription>Check out my code</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full" variant="default">
                    <a href="https://github.com/andreayanez" target="_blank" rel="noopener noreferrer">
                      View Repositories
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover-lift hover:shadow-lg transition-all bg-card/80 backdrop-blur">
                <CardHeader>
                  <FileText className="h-8 w-8 text-accent mb-2" />
                  <CardTitle>Resume</CardTitle>
                  <CardDescription>Download my CV</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full" variant="default">
                    <a href="/resume.pdf" download>
                      Download PDF
                      <Download className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
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
    </main>
  );
};

// Scroll animation wrapper component
const ScrollSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0.85, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.85, y: 20 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0]
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export default Home;
