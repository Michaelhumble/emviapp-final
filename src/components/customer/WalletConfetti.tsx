
import React, { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

interface WalletConfettiProps {
  trigger: boolean;
  onDone?: () => void;
}

const CONFETTI_COLORS = [
  "#9b87f5", "#1EAEDB", "#8B5CF6", "#ea384c", "#33C3F0", "#FFD700", "#FF69B4"
];

const WalletConfetti: React.FC<WalletConfettiProps> = ({ trigger, onDone }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trigger) return;
    const rect = containerRef.current?.getBoundingClientRect();
    let cancelled = false;

    function fireConfetti() {
      // Confetti starts from the wallet zone
      confetti({
        particleCount: 80,
        spread: 70,
        origin: rect
          ? { x: rect.left / window.innerWidth + 0.2, y: rect.top / window.innerHeight + 0.1 }
          : { x: 0.5, y: 0.3 },
        zIndex: 40,
        colors: CONFETTI_COLORS,
        scalar: 1,
        disableForReducedMotion: true,
      });
      setTimeout(() => {
        if (!cancelled) onDone?.();
      }, 1200); // End after ~animation
    }

    fireConfetti();
    // Clean up
    return () => {
      cancelled = true;
      confetti.reset();
    };
    // eslint-disable-next-line
  }, [trigger]);

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

export default WalletConfetti;
