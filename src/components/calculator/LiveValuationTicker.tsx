import React, { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';

const sampleValuations = [
  { location: 'Orange County, CA', value: '$145K', time: '2 mins ago' },
  { location: 'San Jose, CA', value: '$198K', time: '5 mins ago' },
  { location: 'Houston, TX', value: '$132K', time: '8 mins ago' },
  { location: 'Miami, FL', value: '$156K', time: '12 mins ago' },
  { location: 'Atlanta, GA', value: '$121K', time: '15 mins ago' },
];

export const LiveValuationTicker: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sampleValuations.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const current = sampleValuations[currentIndex];

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs text-muted-foreground mb-0.5">Recent valuation</div>
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-lg text-foreground truncate">{current.location}</span>
            <span className="font-bold text-purple-600">{current.value}</span>
          </div>
          <div className="text-xs text-muted-foreground">{current.time}</div>
        </div>
      </div>
    </div>
  );
};
