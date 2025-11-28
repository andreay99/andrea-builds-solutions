import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef, useMemo } from "react";

interface ScrollColorTransitionProps {
  children: ReactNode;
  fromColor: string;
  toColor: string;
  className?: string;
}

export const ScrollColorTransition = ({ 
  children, 
  fromColor, 
  toColor,
  className = "" 
}: ScrollColorTransitionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Detect if dark mode is enabled
  const isDarkMode = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  }, []);

  // Use appropriate colors based on theme
  const finalFromColor = isDarkMode ? 'hsl(240, 10%, 7%)' : fromColor;
  const finalToColor = isDarkMode ? 'hsl(240, 10%, 14%)' : toColor;

  // Transform scroll progress to background color
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [finalFromColor, finalToColor, finalToColor, finalFromColor]
  );

  return (
    <motion.div
      ref={ref}
      style={{ backgroundColor }}
      className={`transition-colors duration-700 ${className}`}
    >
      {children}
    </motion.div>
  );
};
