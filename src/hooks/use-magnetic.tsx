import { useRef, useEffect } from "react";

interface MagneticOptions {
  strength?: number;
  distance?: number;
}

export const useMagnetic = ({ strength = 0.3, distance = 100 }: MagneticOptions = {}) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distanceFromCenter = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      if (distanceFromCenter < distance) {
        const pull = 1 - distanceFromCenter / distance;
        const x = distanceX * strength * pull;
        const y = distanceY * strength * pull;
        
        element.style.transform = `translate(${x}px, ${y}px)`;
      } else {
        element.style.transform = "translate(0px, 0px)";
      }
    };

    const handleMouseLeave = () => {
      element.style.transform = "translate(0px, 0px)";
    };

    document.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength, distance]);

  return ref;
};
