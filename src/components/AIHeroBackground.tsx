import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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
  
  // Parallax effect for the canvas
  const { scrollY } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollY, [0, 1000], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300, 500], [1, 0.5, 0.2]);
  
  // Individual rotation and translation tracking for each labeled ray
  const targetRotations = useRef([0, 0, 0, 0]); // AI, ML, SYSTEMS, BUILDER
  const currentRotations = useRef([0, 0, 0, 0]);
  const targetTranslations = useRef([0, 0, 0, 0]);
  const currentTranslations = useRef([0, 0, 0, 0]);
  const targetTranslationsY = useRef([0, 0, 0, 0]);
  const currentTranslationsY = useRef([0, 0, 0, 0]);
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

    // Generate lines with sensitivity multipliers
    const lines: Line[] = [];
    const numLines = 40;
    const labeledLines = ['AI', 'ML', 'SYSTEMS', 'BUILDER'];
    const sensitivities = [1.0, 0.8, 0.6, 0.5]; // Per-group variation
    
    // First, add the 4 labeled lines evenly spaced around the circle
    for (let i = 0; i < labeledLines.length; i++) {
      const angle = (Math.PI * 2 * i) / labeledLines.length; // Evenly distribute: 0°, 90°, 180°, 270°
      const length = 150 + Math.random() * 100;
      
      lines.push({
        angle,
        length,
        hasLabel: true,
        label: labeledLines[i],
      });
    }
    
    // Then add the remaining background lines
    for (let i = labeledLines.length; i < numLines; i++) {
      const angle = (Math.PI * 2 * i) / numLines;
      const length = 150 + Math.random() * 100;
      
      lines.push({
        angle,
        length,
        hasLabel: false,
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

      // Smooth lerp each labeled ray independently (rotation and translation)
      for (let i = 0; i < 4; i++) {
        currentRotations.current[i] += (targetRotations.current[i] - currentRotations.current[i]) * 0.12;
        currentTranslations.current[i] += (targetTranslations.current[i] - currentTranslations.current[i]) * 0.12;
        currentTranslationsY.current[i] += (targetTranslationsY.current[i] - currentTranslationsY.current[i]) * 0.12;
      }

      // Clear canvas
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Draw lines
      lines.forEach((line, index) => {
        let angle = line.angle;
        const length = line.length;
        let offsetX = 0;
        let offsetY = 0;

        // Apply mouse influence to labeled lines (both horizontal and vertical)
        if (!isMobile && line.hasLabel && index < 4) {
          // Use the current rotation and translation directly (sensitivity already applied in targets)
          angle += currentRotations.current[index];
          offsetX = currentTranslations.current[index];
          offsetY = currentTranslationsY.current[index];
        }

        const endX = centerX + Math.cos(angle) * length + offsetX;
        const endY = centerY + Math.sin(angle) * length + offsetY;

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
  }, [isMobile]);

  useEffect(() => {
    if (isMobile || !containerRef.current) return;

    const heroSection = containerRef.current.parentElement;
    if (!heroSection) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroSection.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      
      const maxRotation = 0.07;
      const maxTranslation = 10;
      const maxTranslationY = 10;
      
      // Each ray responds uniquely to mouse movement
      // AI: Strong horizontal response with slight upward on right movement
      targetRotations.current[0] = nx * maxRotation * 1.2;
      targetTranslations.current[0] = nx * maxTranslation * 1.0;
      targetTranslationsY.current[0] = -nx * maxTranslationY * 0.3;
      
      // ML: Responds to both x and y, inverted rotation and vertical
      targetRotations.current[1] = -(nx * 0.5 + ny * 0.3) * maxRotation;
      targetTranslations.current[1] = (nx * 0.6 - ny * 0.2) * maxTranslation;
      targetTranslationsY.current[1] = -ny * maxTranslationY * 0.8;
      
      // SYSTEMS: Primarily vertical influence with slight horizontal
      targetRotations.current[2] = (ny * 0.8 + nx * 0.2) * maxRotation;
      targetTranslations.current[2] = (ny * 0.4 + nx * 0.5) * maxTranslation;
      targetTranslationsY.current[2] = ny * maxTranslationY * 1.0;
      
      // BUILDER: Opposite direction from AI and SYSTEMS
      targetRotations.current[3] = -nx * maxRotation * 0.7;
      targetTranslations.current[3] = -nx * maxTranslation * 0.6;
      targetTranslationsY.current[3] = -ny * maxTranslationY * 0.6;
    };

    const handleMouseLeave = () => {
      targetRotations.current = [0, 0, 0, 0];
      targetTranslations.current = [0, 0, 0, 0];
      targetTranslationsY.current = [0, 0, 0, 0];
    };

    heroSection.addEventListener('mousemove', handleMouseMove);
    heroSection.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      heroSection.removeEventListener('mousemove', handleMouseMove);
      heroSection.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMobile]);

  return (
    <motion.div 
      ref={containerRef}
      id="hero-orbit"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ y, opacity }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
    </motion.div>
  );
};
