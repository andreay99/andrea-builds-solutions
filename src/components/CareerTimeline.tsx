import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';

interface TimelineItem {
  id: string;
  title: string;
  organization: string;
  location?: string;
  period: string;
  type: 'work' | 'education';
  description?: string;
  highlights?: string[];
}

interface CareerTimelineProps {
  items: TimelineItem[];
}

export const CareerTimeline = ({ items }: CareerTimelineProps) => {
  return (
    <div className="relative">
      {items.map((item, index) => (
        <TimelineNode 
          key={item.id} 
          item={item} 
          index={index}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  );
};

interface TimelineNodeProps {
  item: TimelineItem;
  index: number;
  isLast: boolean;
}

const TimelineNode = ({ item, index, isLast }: TimelineNodeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative pb-12 last:pb-0">
      {/* Vertical Line */}
      {!isLast && (
        <motion.div
          className="absolute left-1/2 top-12 w-0.5 h-full bg-gradient-to-b from-accent to-muted -translate-x-1/2 hidden md:block"
          initial={{ scaleY: 0, originY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        />
      )}

      <div className="flex items-center justify-between gap-8">
        {/* Left Content (Desktop) */}
        <motion.div
          className={`flex-1 ${isLeft ? 'text-right' : 'text-left md:text-right'} hidden md:block`}
          initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          {isLeft && (
            <div className="pr-8">
              <h3 className="text-xl font-bold text-foreground mb-1">{item.title}</h3>
              <p className="text-base text-accent font-semibold mb-1">
                {item.organization}
              </p>
              {item.location && (
                <p className="text-sm text-muted-foreground mb-2">{item.location}</p>
              )}
              <p className="text-sm text-muted-foreground font-medium">{item.period}</p>
              {item.description && (
                <p className="text-sm text-muted-foreground mt-3">{item.description}</p>
              )}
            </div>
          )}
        </motion.div>

        {/* Center Node */}
        <motion.div
          className="relative z-10 flex-shrink-0"
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.2 + 0.2,
            type: "spring",
            stiffness: 200
          }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center border-4 border-background shadow-lg">
            {item.type === 'work' ? (
              <Briefcase className="h-5 w-5 text-background" />
            ) : (
              <GraduationCap className="h-5 w-5 text-background" />
            )}
          </div>
        </motion.div>

        {/* Right Content (Desktop) / Main Content (Mobile) */}
        <motion.div
          className={`flex-1 ${!isLeft ? 'text-left' : 'text-right md:text-left'}`}
          initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          <div className={`${!isLeft ? 'pl-8' : 'md:pl-8'}`}>
            {/* Mobile Layout */}
            <div className="md:hidden">
              <h3 className="text-xl font-bold text-foreground mb-1">{item.title}</h3>
              <p className="text-base text-accent font-semibold mb-1">
                {item.organization}
              </p>
              {item.location && (
                <p className="text-sm text-muted-foreground mb-2">{item.location}</p>
              )}
              <p className="text-sm text-muted-foreground font-medium">{item.period}</p>
              {item.description && (
                <p className="text-sm text-muted-foreground mt-3">{item.description}</p>
              )}
              {item.highlights && item.highlights.length > 0 && (
                <ul className="mt-3 space-y-1">
                  {item.highlights.map((highlight, i) => (
                    <li key={i} className="text-sm text-muted-foreground">
                      • {highlight}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Desktop Layout */}
            {!isLeft && (
              <div className="hidden md:block">
                <h3 className="text-xl font-bold text-foreground mb-1">{item.title}</h3>
                <p className="text-base text-accent font-semibold mb-1">
                  {item.organization}
                </p>
                {item.location && (
                  <p className="text-sm text-muted-foreground mb-2">{item.location}</p>
                )}
                <p className="text-sm text-muted-foreground font-medium">{item.period}</p>
                {item.description && (
                  <p className="text-sm text-muted-foreground mt-3">{item.description}</p>
                )}
                {item.highlights && item.highlights.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {item.highlights.map((highlight, i) => (
                      <li key={i} className="text-sm text-muted-foreground">
                        • {highlight}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
