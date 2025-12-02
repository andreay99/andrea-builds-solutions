import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Award, Github, ExternalLink, Zap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/MagneticButton";
import { useState } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  awards?: string[];
  link: string;
  githubLink?: string;
  liveLink?: string;
  featured?: boolean;
}

export const ProjectCard = ({ 
  title, 
  description, 
  techStack, 
  awards, 
  link, 
  githubLink, 
  liveLink,
  featured 
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on buttons/links inside the card
    if ((e.target as HTMLElement).closest('a, button')) {
      return;
    }
    navigate(link);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card 
        className="h-full border-2 border-foreground/10 rounded-lg bg-card/95 backdrop-blur-sm hover:border-accent/30 hover:shadow-2xl transition-all duration-500 overflow-hidden group relative cursor-pointer"
        onClick={handleCardClick}
      >
        {/* Hover Overlay Glow Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.15 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-accent/20 pointer-events-none"
        />

        <CardHeader className="space-y-4 pb-6 relative z-10">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <CardTitle className="text-3xl md:text-4xl font-serif leading-tight">{title}</CardTitle>
              <div className="flex items-center gap-1">
                {featured && (
                  <motion.div 
                    animate={{ scale: isHovered ? 1.1 : 1 }}
                    className="text-2xl" 
                    title="Featured project"
                  >
                    ⭐
                  </motion.div>
                )}
                {awards && awards.length > 0 && (
                  <motion.div 
                    animate={{ scale: isHovered ? 1.1 : 1 }}
                    className="text-2xl" 
                    title="Award winner"
                  >
                    🏆
                  </motion.div>
                )}
              </div>
            </div>
            {awards && awards.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {awards.map((award, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: isHovered ? 1 : 0.7 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Badge 
                      className="rounded-full border border-foreground/20 bg-foreground/5 text-accent text-xs font-semibold px-3 py-1 uppercase tracking-wider hover:bg-foreground/10 transition-colors"
                    >
                      <Award className="h-3 w-3 mr-1" />
                      {award}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
          <CardDescription className="text-base md:text-lg leading-relaxed text-foreground/80 font-normal">{description}</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6 relative z-10">
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0.6 }}
                animate={{ opacity: isHovered ? 0.9 : 0.6 }}
                transition={{ delay: index * 0.03 }}
              >
                <Badge 
                  className="text-xs md:text-sm rounded-full border-0 bg-foreground/10 text-foreground/70 hover:bg-foreground/20 transition-colors px-2 md:px-3 py-1 whitespace-nowrap"
                >
                  {tech}
                </Badge>
              </motion.div>
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
            
            <motion.div 
              className="flex gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.3 }}
              style={{ pointerEvents: isHovered ? "auto" : "none" }}
            >
              {githubLink && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: isHovered ? 1 : 0.8, opacity: isHovered ? 1 : 0 }}
                  transition={{ delay: 0.05 }}
                  className="flex-1"
                >
                  <Button asChild variant="outline" size="sm" className="w-full rounded-lg border-foreground/20 hover:border-accent hover:bg-accent/10 transition-all">
                    <a href={githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1">
                      <Github className="h-4 w-4" />
                      <span className="text-xs font-medium">GitHub</span>
                    </a>
                  </Button>
                </motion.div>
              )}
              {liveLink && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: isHovered ? 1 : 0.8, opacity: isHovered ? 1 : 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex-1"
                >
                  <Button asChild variant="outline" size="sm" className="w-full rounded-lg border-foreground/20 hover:border-accent hover:bg-accent/10 transition-all">
                    <a href={liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1">
                      <ExternalLink className="h-4 w-4" />
                      <span className="text-xs font-medium">Live Demo</span>
                    </a>
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
