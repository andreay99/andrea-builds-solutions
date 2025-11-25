import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

interface Project {
  title: string;
  description: string;
  techStack: string[];
  awards?: string[];
  link: string;
  size: "large" | "medium" | "small";
}

interface BentoProjectGridProps {
  projects: (Omit<Project, 'size'> & { size?: never })[];
}

export const BentoProjectGrid = ({ projects }: BentoProjectGridProps) => {
  // Define sizes for bento layout
  const projectsWithSizes: Project[] = projects.map((project, index) => ({
    ...project,
    size: index === 0 ? "large" : index === 1 ? "medium" : "small"
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-8 auto-rows-[280px]">
      {projectsWithSizes.map((project, index) => (
        <BentoCard key={index} project={project} index={index} />
      ))}
    </div>
  );
};

const BentoCard = ({ project, index }: { project: Project; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    large: "md:col-span-4 md:row-span-2",
    medium: "md:col-span-2 md:row-span-2",
    small: "md:col-span-3 md:row-span-1"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ 
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 0.61, 0.36, 1],
      }}
      className={`${sizeClasses[project.size]} relative`}
    >
      <Link to={project.link}>
        <motion.div
          className="relative h-full glass-strong rounded-2xl p-6 md:p-8 overflow-hidden group gradient-border cursor-pointer"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          whileHover={{ 
            y: -8,
            transition: { duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }
          }}
        >
          {/* Gradient overlay on hover */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "radial-gradient(circle at 50% 50%, hsl(var(--accent) / 0.1) 0%, transparent 70%)"
            }}
          />

          <div className="relative h-full flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl md:text-3xl font-bold font-serif leading-tight">
                  {project.title}
                </h3>
                <motion.div
                  animate={{ 
                    x: isHovered ? 4 : 0,
                    y: isHovered ? -4 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="h-6 w-6 text-accent flex-shrink-0" />
                </motion.div>
              </div>

              {project.awards && project.awards.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.awards.map((award, i) => (
                    <Badge key={i} className="bg-accent/20 text-accent-foreground border-accent/30">
                      🏆 {award}
                    </Badge>
                  ))}
                </div>
              )}

              <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Tech stack - always visible on large cards, visible on hover for others */}
            <motion.div
              className={`flex flex-wrap gap-2 ${project.size !== 'large' ? 'opacity-0 group-hover:opacity-100' : ''}`}
              initial={false}
              transition={{ duration: 0.3 }}
            >
              {project.techStack.map((tech, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </motion.div>
          </div>

          {/* Shimmer effect on hover */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 shimmer pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </motion.div>
      </Link>
    </motion.div>
  );
};
