
import React, { useEffect, useRef, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  duration?: number; // ms
  bounce?: boolean;
  onAnimationEnd?: () => void;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, duration = 700, bounce = true, onAnimationEnd }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValueRef = useRef(value);
  const rafRef = useRef<number>();
  const animatingRef = useRef(false);

  useEffect(() => {
    if (prevValueRef.current !== value) {
      let start: number | null = null;
      const startValue = prevValueRef.current;
      const endValue = value;
      const diff = endValue - startValue;

      animatingRef.current = true;

      const animate = (timestamp: number) => {
        if (start === null) start = timestamp;
        const progress = Math.min(1, (timestamp - start) / duration);
        const eased = bounce
          ? -0.5 * Math.cos(Math.PI * progress) + 0.5
          : progress;
        const current = Math.round(startValue + diff * eased);

        setDisplayValue(current);

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          prevValueRef.current = value;
          setDisplayValue(value);
          animatingRef.current = false;
          onAnimationEnd?.();
        }
      };

      rafRef.current = requestAnimationFrame(animate);
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }
  }, [value, bounce, duration, onAnimationEnd]);

  // Animate glow/bounce when animating
  const shouldBounce = bounce && animatingRef.current;

  return (
    <span
      className={`inline-block transition-all text-xl md:text-2xl font-bold ${
        shouldBounce ? "animate-bounce text-green-600 drop-shadow-2xl" : "text-green-600"
      }`}
      style={{ minWidth: 28 }}
      aria-live="polite"
    >
      {displayValue}
    </span>
  );
};

export default AnimatedNumber;

