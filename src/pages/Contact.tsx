import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Linkedin, Github, FileText, ExternalLink } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";

const Contact = () => {
  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-20">
      <div className="section-container max-w-4xl">
        <div className="mb-12">
          <h1 className="mb-4">Get in Touch</h1>
          <p className="text-lg text-muted-foreground mb-4">
            I'm a Computer Science student at Stevens Institute of Technology specializing in AI/ML and full-stack development. 
            With expertise in facial recognition, natural language processing, and computer vision, I build intelligent systems 
            that solve real-world problems.
          </p>
          <p className="text-lg text-muted-foreground">
            I'm passionate about leveraging cutting-edge AI technologies and cloud platforms to create innovative solutions. 
            Whether you're looking to collaborate on an exciting project, discuss emerging technologies, or explore opportunities 
            in software engineering and AI, I'd love to connect!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="hover-lift hover:shadow-lg transition-all">
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
        </div>

        <Card className="bg-secondary/30">
          <CardHeader>
            <CardTitle>Additional Links</CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
