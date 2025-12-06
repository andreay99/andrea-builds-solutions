import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Linkedin, Github, FileText, ExternalLink, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://formspree.io/f/xzzbyrqk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setStatusMessage("Thanks for reaching out! I'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setStatusMessage("Something went wrong. Please try again.");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      setStatus("error");
      setStatusMessage("Failed to send message. Please try again or email me directly.");
      setTimeout(() => setStatus("idle"), 5000);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-20">
        <div className="section-container max-w-4xl">
          <div className="mb-12">
            <h1 className="mb-4">Get in Touch</h1>
            <p className="text-lg text-muted-foreground mb-4">
              I'm a Computer Science student at New Jersey Institute of Technology specializing in AI/ML and full-stack development. 
              With expertise in facial recognition, natural language processing, and computer vision, I build intelligent systems 
              that solve real-world problems.
            </p>
            <p className="text-lg text-muted-foreground">
              I'm passionate about leveraging cutting-edge AI technologies and cloud platforms to create innovative solutions. 
              Whether you're looking to collaborate on an exciting project, discuss emerging technologies, or explore opportunities 
              in software engineering and AI, I'd love to connect!
            </p>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <Card className="backdrop-blur-sm bg-card/80 border-border/50">
              <CardHeader>
                <CardTitle>Send me a Message</CardTitle>
                <CardDescription>Fill out the form below and I'll get back to you as soon as possible.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        className="rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="What is this about?"
                      className="rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Your message..."
                      className="min-h-[150px] rounded-lg resize-none"
                    />
                  </div>

                  {/* Status Messages */}
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-600"
                    >
                      <CheckCircle2 className="h-5 w-5" />
                      <p className="text-sm">{statusMessage}</p>
                    </motion.div>
                  )}

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600"
                    >
                      <AlertCircle className="h-5 w-5" />
                      <p className="text-sm">{statusMessage}</p>
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg"
                  >
                    {loading ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Contact Methods */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          >
            <motion.div variants={itemVariants}>
              <Card className="hover-lift hover:shadow-lg transition-all">
                <CardHeader>
                  <Mail className="h-8 w-8 text-accent mb-2" />
                  <CardTitle>Email</CardTitle>
                  <CardDescription>Direct email contact</CardDescription>
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
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="hover-lift hover:shadow-lg transition-all">
                <CardHeader>
                  <Linkedin className="h-8 w-8 text-accent mb-2" />
                  <CardTitle>LinkedIn</CardTitle>
                  <CardDescription>Connect professionally</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full" variant="default">
                    <a href="https://www.linkedin.com/in/andrea-yanez-soto-8b4653218" target="_blank" rel="noopener noreferrer">
                      View Profile
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="hover-lift hover:shadow-lg transition-all">
                <CardHeader>
                  <Github className="h-8 w-8 text-accent mb-2" />
                  <CardTitle>GitHub</CardTitle>
                  <CardDescription>Explore my code</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full" variant="default">
                    <a href="https://github.com/andreay99" target="_blank" rel="noopener noreferrer">
                      View Repositories
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="hover-lift hover:shadow-lg transition-all">
                <CardHeader>
                  <FileText className="h-8 w-8 text-accent mb-2" />
                  <CardTitle>Resume</CardTitle>
                  <CardDescription>Download my CV</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full" variant="default">
                    <a href="/resume.pdf" download>
                      Download PDF
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-secondary/30 rounded-lg p-6 border border-border/50"
          >
            <CardTitle className="mb-4">Additional Links</CardTitle>
            <div className="flex flex-col gap-3">
              <Button asChild variant="outline" className="justify-start">
                <a href="https://devpost.com/andreay99" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Devpost Profile
                </a>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <a href="tel:7325200494">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  (732) 520-0494
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
