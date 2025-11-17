import { useEffect, useRef, useState } from 'react';

interface Line {
  angle: number;
  length: number;
  hasLabel: boolean;
  label?: string;
}

export const AIHeroBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
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

      // Calculate mouse influence (subtle parallax)
      let offsetX = 0;
      let offsetY = 0;

      if (!isMobile && mousePosition.x !== 0 && mousePosition.y !== 0) {
        const mouseX = mousePosition.x - centerX;
        const mouseY = mousePosition.y - centerY;
        offsetX = (mouseX / rect.width) * 15; // Max 15px shift
        offsetY = (mouseY / rect.height) * 15;
      }

      const actualCenterX = centerX + offsetX;
      const actualCenterY = centerY + offsetY;

      // Draw lines
      lines.forEach((line) => {
        const endX = actualCenterX + Math.cos(line.angle) * line.length;
        const endY = actualCenterY + Math.sin(line.angle) * line.length;

        ctx.beginPath();
        ctx.moveTo(actualCenterX, actualCenterY);
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
      ctx.fillRect(actualCenterX - 4, actualCenterY - 4, 8, 8);

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePosition, isMobile]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isMobile) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
};
