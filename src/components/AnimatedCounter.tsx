import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon?: React.ReactNode;
}

export const AnimatedCounter = ({ 
  end, 
  duration = 2000, 
  delay = 0,
  suffix = '',
  prefix = '',
  label,
  icon
}: AnimatedCounterProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        const steps = 60;
        const increment = end / steps;
        const stepDuration = duration / steps;
        let current = 0;

        const interval = setInterval(() => {
          current += increment;
          if (current >= end) {
            setCount(end);
            clearInterval(interval);
          } else {
            setCount(Math.floor(current));
          }
        }, stepDuration);

        return () => clearInterval(interval);
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [isInView, end, duration, delay]);

  return (
    <motion.div 
      ref={ref}
      className="flex flex-col items-center text-center gap-3 p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {icon && (
        <div className="text-accent mb-2">
          {icon}
        </div>
      )}
      <div className="flex items-baseline gap-1">
        {prefix && <span className="text-3xl md:text-4xl font-bold text-foreground">{prefix}</span>}
        <span className="text-4xl md:text-5xl font-bold text-accent">
          {count}
        </span>
        {suffix && <span className="text-3xl md:text-4xl font-bold text-foreground">{suffix}</span>}
      </div>
      <p className="text-sm md:text-base text-muted-foreground font-medium">
        {label}
      </p>
    </motion.div>
  );
};
