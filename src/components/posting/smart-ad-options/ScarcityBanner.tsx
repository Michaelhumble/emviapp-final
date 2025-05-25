
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

interface ScarcityBannerProps {
  slotsLeft?: number;
  timeLeft?: number;
  addonType?: 'nationwide' | 'premium' | 'boost';
}

const ScarcityBanner: React.FC<ScarcityBannerProps> = ({ 
  slotsLeft = 12, 
  timeLeft = 3600,
  addonType = 'nationwide' 
}) => {
  const [currentTime, setCurrentTime] = useState(timeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-3 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-3"
    >
      <div className="flex items-center gap-2">
        <Flame className="h-4 w-4 text-red-500" />
        <Badge variant="outline" className="bg-red-100 text-red-700 border-red-300 animate-pulse">
          {slotsLeft} slots left
        </Badge>
      </div>
      
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-orange-500" />
        <span className="text-sm font-mono font-bold text-orange-700">
          {formatTime(currentTime)}
        </span>
      </div>
      
      <div className="flex items-center gap-1 text-xs text-gray-600">
        <Users className="h-3 w-3" />
        <span>High demand</span>
      </div>
    </motion.div>
  );
};

export default ScarcityBanner;
