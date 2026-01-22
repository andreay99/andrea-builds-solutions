import { useRef, useEffect } from 'react';

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
    <div 
      className="relative"
      style={{ position: 'relative' }}
    >
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isLeft = index % 2 === 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size (56px = 14 * 4 for Tailwind size)
    canvas.width = 56;
    canvas.height = 56;

    // Get accent color from CSS variable
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--background').trim();

    // Draw circle background
    ctx.fillStyle = accentColor || '#0891b2';
    ctx.beginPath();
    ctx.arc(28, 28, 26, 0, Math.PI * 2);
    ctx.fill();

    // Draw border
    ctx.strokeStyle = bgColor || '#ffffff';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Draw emoji (larger, more visible)
    ctx.font = 'bold 32px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = bgColor || '#ffffff';
    ctx.fillText(item.type === 'work' ? '💼' : '🎓', 28, 28);
  }, [item.type]);

  return (
    <div ref={ref} className="relative pb-12 last:pb-0">
      {/* Vertical Line */}
      {!isLast && (
        <div
          className="absolute left-1/2 top-12 w-0.5 h-full bg-gradient-to-b from-accent to-muted -translate-x-1/2 hidden md:block"
        />
      )}

      <div className="flex items-center justify-between gap-8" style={{ position: 'relative' }}>
        {/* Left Content (Desktop) */}
        <div
          className={`flex-1 ${isLeft ? 'text-right' : 'text-left md:text-right'} hidden md:block`}
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
        </div>

        {/* Center Node - Canvas Based */}
        <canvas
          ref={canvasRef}
          className="flex-shrink-0"
          style={{ 
            zIndex: 50,
            pointerEvents: 'auto',
            position: 'relative',
            display: 'block'
          }}
        />

        {/* Right Content (Desktop) / Main Content (Mobile) */}
        <div
          className={`flex-1 ${!isLeft ? 'text-left' : 'text-right md:text-left'}`}
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
        </div>
      </div>
    </div>
  );
};
