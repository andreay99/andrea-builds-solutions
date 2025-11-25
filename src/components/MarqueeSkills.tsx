import { Badge } from "@/components/ui/badge";

interface MarqueeSkillsProps {
  skills: string[];
}

export const MarqueeSkills = ({ skills }: MarqueeSkillsProps) => {
  // Duplicate skills for seamless loop
  const duplicatedSkills = [...skills, ...skills];

  return (
    <div className="relative w-full overflow-hidden py-6">
      <div className="flex gap-4 marquee">
        {duplicatedSkills.map((skill, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="glass text-sm px-4 py-2 whitespace-nowrap flex-shrink-0"
          >
            {skill}
          </Badge>
        ))}
      </div>
      
      {/* Gradient fade edges */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-surface-3 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-surface-3 to-transparent pointer-events-none" />
    </div>
  );
};
