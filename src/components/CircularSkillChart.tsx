import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface CircularSkillChartProps {
  skill: string;
  level: number;
  delay?: number;
  size?: number;
}

export const CircularSkillChart = ({ 
  skill, 
  level, 
  delay = 0,
  size = 140 
}: CircularSkillChartProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayLevel, setDisplayLevel] = useState(0);

  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayLevel / 100) * circumference;

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        const duration = 1500;
        const steps = 60;
        const increment = level / steps;
        let current = 0;

        const interval = setInterval(() => {
          current += increment;
          if (current >= level) {
            setDisplayLevel(level);
            clearInterval(interval);
          } else {
            setDisplayLevel(Math.floor(current));
          }
        }, duration / steps);

        return () => clearInterval(interval);
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [isInView, level, delay]);

  return (
    <motion.div 
      ref={ref}
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background circle */}
        <svg 
          width={size} 
          height={size}
          className="transform -rotate-90"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="hsl(var(--muted))"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="hsl(var(--accent))"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: 'stroke-dashoffset 0.05s ease',
            }}
          />
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-foreground">
            {displayLevel}
          </span>
          <span className="text-sm text-muted-foreground">%</span>
        </div>
      </div>
      
      {/* Skill label */}
      <p className="text-center font-medium text-sm text-foreground">
        {skill}
      </p>
    </motion.div>
  );
};
