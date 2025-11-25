import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, GraduationCap, Code, Award } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";
import { AnimatedSkillBar } from "@/components/AnimatedSkillBar";

const Experience = () => {
  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-20">
      <div className="section-container max-w-5xl">
        <div className="mb-12">
          <h1 className="mb-4">Experience</h1>
          <p className="text-lg text-muted-foreground">
            My journey in technology, from research to industry experience.
          </p>
        </div>

        {/* Work Experience */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className="h-6 w-6 text-accent" />
            <h2 className="text-3xl font-bold">Work Experience</h2>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              <Card className="border-l-4 border-l-accent">
                <CardHeader>
                  <div className="flex justify-between items-start">
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
                  <p className="text-muted-foreground mb-4">
                    Selected for prestigious NASA-funded research program conducting AI-powered solar eruption analysis using satellite data.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Applying machine learning to analyze solar flare activity from NASA satellite data</li>
                    <li>• Developing prediction models for solar eruptions using advanced ML techniques</li>
                    <li>• Working under Dr. Qin Li's guidance on cutting-edge space weather research</li>
                    <li>• Contributing to NASA's mission to understand and predict space weather events</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">Training Lead</CardTitle>
                      <CardDescription className="text-base mt-1">
                        Apple • Edison, NJ
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">Jul 2025 - Present</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Lead technical training programs and mentor team members on Apple products and services.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Led technical training program that improved launch sales performance</li>
                    <li>• Delivered performance metrics to leadership, accelerating tool adoption</li>
                    <li>• Provided structured mentorship to new technicians</li>
                    <li>• Fostered supportive and productive work environment</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">Technical Specialist</CardTitle>
                      <CardDescription className="text-base mt-1">
                        Apple • Edison, NJ
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">Aug 2024 - Present</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Provide expert technical support across Apple's ecosystem, troubleshooting complex issues and mentoring team members.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Troubleshot software and hardware issues across macOS, iPadOS, and iOS</li>
                    <li>• Raised customer satisfaction by 15% through effective problem resolution</li>
                    <li>• Collaborated with engineers to resolve escalated technical issues</li>
                    <li>• Mentored peers in structured problem-solving, increasing team efficiency by 40%</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Education */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="h-6 w-6 text-accent" />
            <h2 className="text-3xl font-bold">Education</h2>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">B.S. in Computer Science</CardTitle>
                      <CardDescription className="text-base mt-1">
                        New Jersey Institute of Technology
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">Expected Aug 2027</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Transfer student specializing in AI/ML and full-stack development.
                  </p>
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Relevant Coursework:</h4>
                    <p className="text-muted-foreground">
                      Python CS100, User Experience, Self-Directed Coding Projects
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">Associate of Computer Science</CardTitle>
                      <CardDescription className="text-base mt-1">
                        Middlesex County College
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">Graduated Aug 2025</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mt-2">
                    <h4 className="font-semibold mb-2">Relevant Coursework:</h4>
                    <p className="text-muted-foreground">
                      Data Structures, Database Systems
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Code className="h-6 w-6 text-accent" />
            <h2 className="text-3xl font-bold">Technical Skills</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Languages</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <AnimatedSkillBar skill="Python" level={95} delay={0} />
                  <AnimatedSkillBar skill="JavaScript/TypeScript" level={90} delay={0.1} />
                  <AnimatedSkillBar skill="Java" level={85} delay={0.2} />
                  <AnimatedSkillBar skill="SQL" level={85} delay={0.3} />
                  <AnimatedSkillBar skill="Node.js" level={88} delay={0.4} />
                  <AnimatedSkillBar skill="C++" level={75} delay={0.5} />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Frameworks & Tools</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <AnimatedSkillBar skill="PyTorch" level={92} delay={0} />
                  <AnimatedSkillBar skill="TensorFlow" level={88} delay={0.1} />
                  <AnimatedSkillBar skill="Flask/FastAPI" level={90} delay={0.2} />
                  <AnimatedSkillBar skill="Next.js/React" level={85} delay={0.3} />
                  <AnimatedSkillBar skill="HuggingFace" level={87} delay={0.4} />
                  <AnimatedSkillBar skill="MongoDB" level={82} delay={0.5} />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Cloud & DevOps</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <AnimatedSkillBar skill="Azure" level={85} delay={0} />
                  <AnimatedSkillBar skill="AWS" level={83} delay={0.1} />
                  <AnimatedSkillBar skill="Docker" level={88} delay={0.2} />
                  <AnimatedSkillBar skill="CI/CD" level={86} delay={0.3} />
                  <AnimatedSkillBar skill="GitHub Actions" level={87} delay={0.4} />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>AI/ML Specializations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <AnimatedSkillBar skill="Facial Recognition" level={90} delay={0} />
                  <AnimatedSkillBar skill="NLP" level={88} delay={0.1} />
                  <AnimatedSkillBar skill="Real-Time Processing" level={85} delay={0.2} />
                  <AnimatedSkillBar skill="ML Pipelines" level={92} delay={0.3} />
                  <AnimatedSkillBar skill="Agentic Systems" level={87} delay={0.4} />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Hackathons */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Award className="h-6 w-6 text-accent" />
            <h2 className="text-3xl font-bold">Hackathon Experience</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              <Card className="border-l-4 border-l-accent">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-accent" />
                    HackPrinceton 2025
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold mb-2">Recall - Assistive Memory System</p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>🏆 Best Use of Grok (xAI)</p>
                    <p>🏆 Best Use of Arm (MLH)</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>HackHarvard 2025</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold mb-2">OffScript - AI Interview Simulator</p>
                  <p className="text-sm text-muted-foreground">
                    Led team of 3 engineers to build full-stack MVP in 36 hours
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Languages */}
        <section className="mt-16">
          <h3 className="text-2xl font-bold mb-4">Languages</h3>
          <p className="text-muted-foreground">
            <span className="font-semibold">Spoken Languages:</span> English, Spanish, Portuguese, Korean
          </p>
        </section>
      </div>
      </div>
    </PageTransition>
  );
};

export default Experience;
