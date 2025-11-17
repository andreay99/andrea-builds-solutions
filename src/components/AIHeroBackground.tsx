import { useEffect, useRef, useState } from 'react';

interface Line {
  angle: number;
  length: number;
  hasLabel: boolean;
  label?: string;
}

export const AIHeroBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ nx: 0, ny: 0 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    // Detect mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Generate lines
    const lines: Line[] = [];
    const numLines = 40;
    const labeledLines = ['AI', 'ML', 'SYSTEMS', 'BUILDER'];
    
    for (let i = 0; i < numLines; i++) {
      const angle = (Math.PI * 2 * i) / numLines;
      const length = 150 + Math.random() * 100;
      const hasLabel = i < labeledLines.length;
      
      lines.push({
        angle,
        length,
        hasLabel,
        label: hasLabel ? labeledLines[i] : undefined,
      });
    }

    // Draw pixel-art style icon (8-bit square pattern)
    const drawPixelIcon = (x: number, y: number, label: string) => {
      const iconSize = 16;
      const pixelSize = 2;
      
      // Different patterns for different labels
      let pattern: number[][] = [];
      
      switch(label) {
        case 'AI':
          pattern = [
            [0,1,1,1,0],
            [1,0,0,0,1],
            [1,1,1,1,1],
            [1,0,0,0,1],
            [1,0,0,0,1]
          ];
          break;
        case 'ML':
          pattern = [
            [1,0,0,0,1],
            [1,1,0,1,1],
            [1,0,1,0,1],
            [1,0,0,0,1],
            [1,0,0,0,1]
          ];
          break;
        case 'SYSTEMS':
          pattern = [
            [0,1,1,1,0],
            [1,0,0,0,0],
            [0,1,1,1,0],
            [0,0,0,0,1],
            [0,1,1,1,0]
          ];
          break;
        case 'BUILDER':
          pattern = [
            [1,1,1,1,0],
            [1,0,0,0,1],
            [1,1,1,1,0],
            [1,0,0,0,1],
            [1,1,1,1,0]
          ];
          break;
      }

      ctx.fillStyle = '#000000';
      pattern.forEach((row, i) => {
        row.forEach((pixel, j) => {
          if (pixel === 1) {
            ctx.fillRect(
              x - (pattern[0].length * pixelSize) / 2 + j * pixelSize,
              y - (pattern.length * pixelSize) / 2 + i * pixelSize,
              pixelSize,
              pixelSize
            );
          }
        });
      });

      // Draw label text
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(label, x, y + 12);
    };

    // Animation loop
    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Clear canvas
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Draw lines
      lines.forEach((line) => {
        let angle = line.angle;
        let length = line.length;

        // Apply mouse influence only to labeled lines
        if (!isMobile && line.hasLabel) {
          // Subtle rotation based on horizontal mouse position
          const rotationInfluence = mousePosition.nx * 0.08; // ~4-5 degrees max
          angle += rotationInfluence;
          
          // Subtle radial extension based on vertical mouse position
          const lengthInfluence = mousePosition.ny * 15; // ~15px max
          length += lengthInfluence;
        }

        const endX = centerX + Math.cos(angle) * length;
        const endY = centerY + Math.sin(angle) * length;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(endX, endY);
        
        if (line.hasLabel) {
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 1.5;
        } else {
          ctx.strokeStyle = '#d1d5db';
          ctx.lineWidth = 0.5;
        }
        
        ctx.stroke();

        // Draw icon and label for labeled lines
        if (line.hasLabel && line.label) {
          drawPixelIcon(endX, endY, line.label);
        }
      });

      // Draw center node
      ctx.fillStyle = '#000000';
      ctx.fillRect(centerX - 4, centerY - 4, 8, 8);

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isMobile, mousePosition]);

  useEffect(() => {
    if (isMobile || !containerRef.current) return;

    const heroSection = containerRef.current.parentElement;
    if (!heroSection) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroSection.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;

      setMousePosition({ nx, ny });
    };

    const handleMouseLeave = () => {
      setMousePosition({ nx: 0, ny: 0 });
    };

    heroSection.addEventListener('mousemove', handleMouseMove);
    heroSection.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      heroSection.removeEventListener('mousemove', handleMouseMove);
      heroSection.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMobile]);

  return (
    <div 
      ref={containerRef}
      id="hero-orbit"
      className="absolute inset-0 w-full h-full pointer-events-none"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};
