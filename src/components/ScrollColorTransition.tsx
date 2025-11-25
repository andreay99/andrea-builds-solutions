import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

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

  // Transform scroll progress to background color
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [fromColor, toColor, toColor, fromColor]
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
