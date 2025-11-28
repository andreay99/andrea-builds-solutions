import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef, useState, useEffect } from "react";

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
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Check dark mode on mount and when it changes
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    
    // Watch for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

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
