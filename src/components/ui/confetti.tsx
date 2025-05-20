
import React, { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

interface ConfettiProps {
  trigger: boolean;
  onDone?: () => void;
  colors?: string[];
}

const Confetti: React.FC<ConfettiProps> = ({ 
  trigger, 
  onDone,
  colors = ["#9b87f5", "#1EAEDB", "#8B5CF6", "#ea384c", "#33C3F0", "#FFD700", "#FF69B4"]
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trigger) return;
    const rect = containerRef.current?.getBoundingClientRect();
    let cancelled = false;

    function fireConfetti() {
      // Confetti starts from the center or specified container
      confetti({
        particleCount: 100,
        spread: 70,
        origin: rect
          ? { x: rect.left / window.innerWidth + 0.2, y: rect.top / window.innerHeight + 0.1 }
          : { x: 0.5, y: 0.3 },
        zIndex: 40,
        colors: colors,
        scalar: 1.2,
        disableForReducedMotion: true,
      });
      
      setTimeout(() => {
        if (!cancelled) onDone?.();
      }, 1500);
    }

    fireConfetti();
    
    // Clean up
    return () => {
      cancelled = true;
      confetti.reset();
    };
  }, [trigger, colors, onDone]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style={{ zIndex: 40 }}
      tabIndex={-1}
    />
  );
};

export default Confetti;
