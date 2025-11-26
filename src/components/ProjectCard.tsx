import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Award, Github, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/MagneticButton";

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  awards?: string[];
  link: string;
  githubLink?: string;
  liveLink?: string;
}

export const ProjectCard = ({ title, description, techStack, awards, link, githubLink, liveLink }: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Card className="h-full border-2 border-foreground/10 rounded-lg bg-card/95 backdrop-blur-sm hover:border-accent/30 hover:shadow-2xl transition-all duration-500 overflow-hidden group">
        <CardHeader className="space-y-4 pb-6">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <CardTitle className="text-3xl md:text-4xl font-serif leading-tight">{title}</CardTitle>
              <div className="flex items-center gap-1">
                {awards && awards.length > 0 && (
                  <div className="text-2xl" title="Award winner">🏆</div>
                )}
              </div>
            </div>
            {awards && awards.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {awards.map((award, index) => (
                  <Badge 
                    key={index} 
                    className="rounded-full border border-foreground/20 bg-foreground/5 text-accent text-xs font-semibold px-3 py-1 uppercase tracking-wider hover:bg-foreground/10 transition-colors"
                  >
                    <Award className="h-3 w-3 mr-1" />
                    {award}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <CardDescription className="text-base md:text-lg leading-relaxed text-foreground/80 font-normal">{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, index) => (
              <Badge 
                key={index} 
                className="text-xs rounded-full border-0 bg-foreground/10 text-foreground/70 hover:bg-foreground/20 transition-colors px-3 py-1"
              >
                {tech}
              </Badge>
            ))}
          </div>
          
          <div className="space-y-3 pt-2">
            <MagneticButton strength={0.3} distance={100}>
              <Button asChild className="w-full group rounded-lg bg-gradient-to-r from-accent to-accent/80 text-background hover:from-accent hover:to-accent shadow-md hover:shadow-lg transition-all">
                <Link to={link} className="flex items-center justify-center">
                  <span>View Case Study</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </MagneticButton>
            
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {githubLink && (
                <Button asChild variant="outline" size="sm" className="flex-1 rounded-lg border-foreground/20 hover:border-accent hover:bg-accent/5">
                  <a href={githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1">
                    <Github className="h-4 w-4" />
                    <span className="text-xs">GitHub</span>
                  </a>
                </Button>
              )}
              {liveLink && (
                <Button asChild variant="outline" size="sm" className="flex-1 rounded-lg border-foreground/20 hover:border-accent hover:bg-accent/5">
                  <a href={liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1">
                    <ExternalLink className="h-4 w-4" />
                    <span className="text-xs">Live</span>
                  </a>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
