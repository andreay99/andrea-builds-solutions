import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/MagneticButton";

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  awards?: string[];
  link: string;
}

export const ProjectCard = ({ title, description, techStack, awards, link }: ProjectCardProps) => {
  return (
    <Card className="h-full hover:shadow-2xl transition-all duration-500 border-2 border-foreground/10 rounded-none bg-card">
      <CardHeader className="space-y-6 pb-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-4">
            <CardTitle className="text-3xl md:text-4xl font-serif">{title}</CardTitle>
            {awards && awards.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {awards.map((award, index) => (
                  <Badge key={index} variant="secondary" className="rounded-none border border-foreground/20 bg-transparent text-foreground/80 text-xs uppercase tracking-wider">
                    <Award className="h-3 w-3 mr-1" />
                    {award}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
        <CardDescription className="text-base md:text-lg leading-relaxed text-foreground/70">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech, index) => (
            <Badge key={index} variant="outline" className="text-xs rounded-none border-foreground/20">
              {tech}
            </Badge>
          ))}
        </div>
        <MagneticButton strength={0.3} distance={100}>
          <Button asChild variant="default" className="w-full group rounded-none border-2 border-foreground text-foreground bg-transparent hover:bg-foreground hover:text-background transition-all">
            <Link to={link}>
              View Full Case Study
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </MagneticButton>
      </CardContent>
    </Card>
  );
};
