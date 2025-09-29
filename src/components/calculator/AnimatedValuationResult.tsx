import React, { useEffect, useState } from 'react';
import { formatCurrency } from '@/lib/valuation';
import confetti from 'canvas-confetti';
import { TrendingUp, Sparkles } from 'lucide-react';

interface AnimatedValuationResultProps {
  low: number;
  high: number;
  base: number;
}

export const AnimatedValuationResult: React.FC<AnimatedValuationResultProps> = ({ low, high, base }) => {
  const [displayLow, setDisplayLow] = useState(0);
  const [displayHigh, setDisplayHigh] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger confetti celebration
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const colors = ['#8B5CF6', '#EC4899', '#F59E0B'];

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: colors
      });
    }, 100);

    // Animate numbers counting up
    setIsVisible(true);
    const duration_counter = 2000;
    const steps = 60;
    const stepTime = duration_counter / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setDisplayLow(Math.floor(low * progress));
      setDisplayHigh(Math.floor(high * progress));

      if (currentStep >= steps) {
        clearInterval(timer);
        setDisplayLow(low);
        setDisplayHigh(high);
      }
    }, stepTime);

    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, [low, high]);

  return (
    <div className={`p-8 md:p-12 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 rounded-2xl border-2 border-purple-200 text-center relative overflow-hidden transition-all duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
      {/* Animated background sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Sparkles className="absolute top-4 left-4 w-6 h-6 text-purple-400 animate-pulse" />
        <Sparkles className="absolute top-8 right-8 w-5 h-5 text-pink-400 animate-pulse delay-150" />
        <Sparkles className="absolute bottom-6 left-12 w-4 h-4 text-orange-400 animate-pulse delay-300" />
        <Sparkles className="absolute bottom-8 right-6 w-5 h-5 text-purple-400 animate-pulse delay-500" />
      </div>

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-900 text-sm font-bold rounded-full mb-4 shadow-sm animate-bounce">
          <TrendingUp className="w-4 h-4" />
          Step 2 of 2: Your Estimate
        </div>
        
        <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">
          🎉 Your Salon is Worth
        </h3>
        
        <div className="mb-4">
          <p className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent animate-pulse leading-tight py-2">
            {formatCurrency(displayLow)} – {formatCurrency(displayHigh)}
          </p>
        </div>
        
        <div className="inline-block px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-purple-200">
          <p className="text-lg font-semibold text-foreground">
            Mid-point: <span className="text-purple-600">{formatCurrency(base)}</span>
          </p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>Based on real market data</span>
        </div>
      </div>
    </div>
  );
};
