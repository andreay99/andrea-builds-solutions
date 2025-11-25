import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  bgImage?: string;
  bgOpacity?: number;
}

export const ParallaxSection = ({ 
  children, 
  className = "", 
  speed = 0.5,
  bgImage,
  bgOpacity = 0.15
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Create parallax effect - slower movement creates depth
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Parallax background layer */}
      {bgImage && (
        <motion.div
          style={{ y, scale }}
          className="absolute inset-0 -z-10 w-full h-full"
        >
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${bgImage})`,
              opacity: bgOpacity,
              filter: 'blur(0px)',
            }}
          />
        </motion.div>
      )}
      
      {/* Content */}
      {children}
    </div>
  );
};
