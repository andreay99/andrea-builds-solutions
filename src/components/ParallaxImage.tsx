import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const ParallaxImage = ({ src, alt, className = "" }: ParallaxImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 0.95]);

  return (
    <div ref={ref} className="overflow-hidden rounded-lg border border-border">
      <motion.img
        src={src}
        alt={alt}
        className={className}
        style={{ y, scale }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};
