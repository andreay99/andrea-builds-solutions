import { ReactNode, forwardRef } from "react";
import { useMagnetic } from "@/hooks/use-magnetic";

interface MagneticButtonProps {
  children: ReactNode;
  strength?: number;
  distance?: number;
  className?: string;
}

export const MagneticButton = forwardRef<HTMLDivElement, MagneticButtonProps>(
  ({ children, strength = 0.3, distance = 100, className = "" }, forwardedRef) => {
    const magneticRef = useMagnetic({ strength, distance });

    return (
      <div 
        ref={magneticRef as any}
        className={`inline-block transition-transform duration-200 ease-out ${className}`}
      >
        {children}
      </div>
    );
  }
);

MagneticButton.displayName = "MagneticButton";
