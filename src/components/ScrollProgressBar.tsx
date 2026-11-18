import { motion, useScroll, useSpring } from "framer-motion";

/* a hairline of warm light along the top edge */
export const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX, background: 'rgba(255,225,180,0.75)', height: 1 }}
      className="fixed top-0 left-0 right-0 origin-left z-[101]"
    />
  );
};
