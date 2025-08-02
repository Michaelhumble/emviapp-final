import React, { useState, useEffect } from 'react';
import { useFunnelTranslation } from '@/hooks/useFunnelTranslation';

interface CountdownTimerProps {
  endTime?: Date;
  className?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  endTime = new Date(Date.now() + 24 * 60 * 60 * 1000), // Default 24 hours
  className = ""
}) => {
  const { t } = useFunnelTranslation();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className={`text-center ${className}`}>
      <p className="text-sm font-medium text-white/90 mb-3">
        {t.urgencyElements.countdown.title}
      </p>
      <div className="flex justify-center gap-2 text-white">
        <div className="bg-white/20 rounded-lg px-2 py-1 min-w-[40px]">
          <div className="text-lg font-bold">{formatNumber(timeLeft.days)}</div>
          <div className="text-xs opacity-80">{t.urgencyElements.countdown.days}</div>
        </div>
        <div className="text-lg font-bold self-center">:</div>
        <div className="bg-white/20 rounded-lg px-2 py-1 min-w-[40px]">
          <div className="text-lg font-bold">{formatNumber(timeLeft.hours)}</div>
          <div className="text-xs opacity-80">{t.urgencyElements.countdown.hours}</div>
        </div>
        <div className="text-lg font-bold self-center">:</div>
        <div className="bg-white/20 rounded-lg px-2 py-1 min-w-[40px]">
          <div className="text-lg font-bold">{formatNumber(timeLeft.minutes)}</div>
          <div className="text-xs opacity-80">{t.urgencyElements.countdown.minutes}</div>
        </div>
        <div className="text-lg font-bold self-center">:</div>
        <div className="bg-white/20 rounded-lg px-2 py-1 min-w-[40px]">
          <div className="text-lg font-bold">{formatNumber(timeLeft.seconds)}</div>
          <div className="text-xs opacity-80">{t.urgencyElements.countdown.seconds}</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;