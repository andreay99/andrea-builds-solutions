import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  
  // Add spring physics for smooth animation
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      style={{ scaleX, background: '#00C9D8' }}
      className="fixed top-0 left-0 right-0 h-1 origin-left z-50"
    />
  );
};
