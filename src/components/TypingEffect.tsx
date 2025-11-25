import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypingEffectProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export const TypingEffect = ({ text, className = "", delay = 0, speed = 100 }: TypingEffectProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setShowCursor(false);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay, speed]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
    >
      {displayedText}
      {showCursor && <span className="typing-cursor">|</span>}
    </motion.span>
  );
};
