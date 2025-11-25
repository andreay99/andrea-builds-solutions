import { motion } from "framer-motion";
import { useState } from "react";

interface GlitchTextProps {
  children: React.ReactNode;
  className?: string;
}

export const GlitchText = ({ children, className = "" }: GlitchTextProps) => {
  const [isGlitching, setIsGlitching] = useState(false);

  const handleHover = () => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 400);
  };

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      onHoverStart={handleHover}
      style={{ cursor: "none" }}
    >
      {/* Main text */}
      <motion.span
        className="relative z-10"
        animate={isGlitching ? {
          x: [0, -2, 2, -2, 2, 0],
          y: [0, 2, -2, 2, -2, 0],
        } : {}}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {children}
      </motion.span>

      {/* Glitch layer 1 */}
      {isGlitching && (
        <motion.span
          className="absolute inset-0 text-accent opacity-70 mix-blend-screen"
          initial={{ x: 0, y: 0 }}
          animate={{
            x: [-2, 2, -2, 2, 0],
            y: [2, -2, 2, -2, 0],
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {children}
        </motion.span>
      )}

      {/* Glitch layer 2 */}
      {isGlitching && (
        <motion.span
          className="absolute inset-0 text-foreground opacity-50 mix-blend-multiply"
          initial={{ x: 0, y: 0 }}
          animate={{
            x: [2, -2, 2, -2, 0],
            y: [-2, 2, -2, 2, 0],
          }}
          transition={{ duration: 0.4, ease: "easeInOut", delay: 0.05 }}
        >
          {children}
        </motion.span>
      )}
    </motion.div>
  );
};
