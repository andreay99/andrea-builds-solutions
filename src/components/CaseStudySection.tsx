import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface CaseStudySectionProps {
  title: string;
  children: React.ReactNode;
}

export const CaseStudySection = ({ title, children }: CaseStudySectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="mb-16"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="h-0.5 w-12 bg-accent"></div>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div className="text-muted-foreground leading-relaxed space-y-4">
        {children}
      </div>
    </motion.section>
  );
};
