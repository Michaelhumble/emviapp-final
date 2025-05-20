
import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiExplosionProps {
  duration?: number;
  particleCount?: number;
  spread?: number;
  colors?: string[];
}

const ConfettiExplosion: React.FC<ConfettiExplosionProps> = ({
  duration = 3000,
  particleCount = 100,
  spread = 70,
  colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']
}) => {
  const [fired, setFired] = useState(false);
  
  useEffect(() => {
    if (fired) return;
    
    const end = Date.now() + duration;
    
    // Launch confetti
    const launchConfetti = () => {
      confetti({
        particleCount: particleCount / 10,
        spread: spread,
        origin: { x: Math.random(), y: Math.random() * 0.5 },
        colors: colors,
        disableForReducedMotion: true
      });
      
      if (Date.now() < end) {
        requestAnimationFrame(launchConfetti);
      }
    };
    
    launchConfetti();
    setFired(true);
    
    return () => {
      setFired(false);
    };
  }, [duration, particleCount, spread, colors, fired]);
  
  // This component doesn't render anything visible
  return null;
};

export default ConfettiExplosion;
