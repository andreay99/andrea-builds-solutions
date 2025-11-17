import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Award } from "lucide-react";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  awards?: string[];
  link: string;
}

export const ProjectCard = ({ title, description, techStack, awards, link }: ProjectCardProps) => {
  return (
    <Card className="hover-lift hover:shadow-lg transition-all duration-300 border-border">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-2xl mb-2">{title}</CardTitle>
            {awards && awards.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {awards.map((award, index) => (
                  <Badge key={index} variant="secondary" className="bg-orange-light text-orange-dark">
                    <Award className="h-3 w-3 mr-1" />
                    {award}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
        <CardDescription className="text-base leading-relaxed">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {techStack.map((tech, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
        <Button asChild variant="default" className="w-full group">
          <Link to={link}>
            View Full Case Study
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};
