import { motion, useInView } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { useRef, useState, useEffect } from "react";

interface AnimatedSkillBarProps {
  skill: string;
  level: number;
  delay?: number;
}

export const AnimatedSkillBar = ({ skill, level, delay = 0 }: AnimatedSkillBarProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [animatedLevel, setAnimatedLevel] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        setAnimatedLevel(level);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isInView, level, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5, delay }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{skill}</span>
        <motion.span
          className="text-xs text-muted-foreground font-mono"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: delay + 0.5 }}
        >
          {animatedLevel}%
        </motion.span>
      </div>
      <Progress
        value={animatedLevel}
        className="h-2 transition-all duration-1000 ease-out"
      />
    </motion.div>
  );
};
