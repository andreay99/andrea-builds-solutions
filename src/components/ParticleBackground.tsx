import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  size: number;
  opacity: number;
}

export const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();
  
  // Parallax effect
  const { scrollY } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollY, [0, 1000], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300, 500], [1, 0.5, 0.2]);

  useEffect(() => {
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
      
      // Reinitialize particles when canvas is resized
      initParticles(rect.width, rect.height);
    };

    // Initialize particles
    const initParticles = (width: number, height: number) => {
      const numParticles = isMobile ? 25 : 60;
      particlesRef.current = [];
      
      for (let i = 0; i < numParticles; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        
        particlesRef.current.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.1,
          vy: (Math.random() - 0.5) * 0.1,
          size: Math.random() * 1.5 + 1,
          opacity: Math.random() * 0.4 + 0.2
        });
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Animation loop with time-based updates
    let lastTime = performance.now();
    const draw = (currentTime: number) => {
      const rect = canvas.getBoundingClientRect();
      const deltaTime = Math.min((currentTime - lastTime) / 16.67, 2); // Cap at 2x speed
      lastTime = currentTime;
      
      ctx.clearRect(0, 0, rect.width, rect.height);

      particlesRef.current.forEach((particle) => {
        // Mouse influence with reduced sensitivity
        if (!isMobile) {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 200;

          if (distance < maxDistance && distance > 0) {
            const force = (maxDistance - distance) / maxDistance;
            particle.vx -= (dx / distance) * force * 0.15 * deltaTime;
            particle.vy -= (dy / distance) * force * 0.15 * deltaTime;
          }
        }

        // Return to base position with gentle spring
        const returnForce = 0.008;
        particle.vx += (particle.baseX - particle.x) * returnForce * deltaTime;
        particle.vy += (particle.baseY - particle.y) * returnForce * deltaTime;

        // Apply damping
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Limit maximum velocity
        const maxVelocity = 2;
        const currentVelocity = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
        if (currentVelocity > maxVelocity) {
          particle.vx = (particle.vx / currentVelocity) * maxVelocity;
          particle.vy = (particle.vy / currentVelocity) * maxVelocity;
        }

        // Apply velocity
        particle.x += particle.vx * deltaTime;
        particle.y += particle.vy * deltaTime;

        // Keep particles within bounds with soft boundaries
        const padding = 50;
        if (particle.x < -padding) particle.x = rect.width + padding;
        if (particle.x > rect.width + padding) particle.x = -padding;
        if (particle.y < -padding) particle.y = rect.height + padding;
        if (particle.y > rect.height + padding) particle.y = -padding;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 0, ${particle.opacity})`;
        ctx.fill();

        // Draw connections to nearby particles (only check a subset to improve performance)
        particlesRef.current.forEach((otherParticle) => {
          if (particle === otherParticle) return;
          
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120 && distance > 0) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            const opacity = (1 - distance / 120) * 0.1;
            ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw(performance.now());

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
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    heroSection.addEventListener('mousemove', handleMouseMove);

    return () => {
      heroSection.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  return (
    <motion.div 
      ref={containerRef}
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
