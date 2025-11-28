import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

const techBadges = [
  { label: "AI/ML", x: "10%", y: "20%", delay: 0 },
  { label: "React", x: "85%", y: "15%", delay: 0.2 },
  { label: "Python", x: "15%", y: "75%", delay: 0.4 },
  { label: "TypeScript", x: "80%", y: "70%", delay: 0.6 },
  { label: "Cloud", x: "50%", y: "10%", delay: 0.8 },
];

export const FloatingTechBadges = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {techBadges.map((badge, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: badge.x, top: badge.y }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isDark ? [0.1, 0.2, 0.1] : [0.15, 0.25, 0.15],
            scale: [0.8, 1, 0.8],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 4,
            delay: badge.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Badge 
            variant="secondary" 
            className="glass text-xs md:text-sm px-3 py-1"
          >
            {badge.label}
          </Badge>
        </motion.div>
      ))}
    </div>
  );
};
