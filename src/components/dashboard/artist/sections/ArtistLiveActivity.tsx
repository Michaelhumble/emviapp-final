
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Heart, Star, TrendingUp, Calendar, Crown, Zap, DollarSign } from 'lucide-react';

const ArtistLiveActivity = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const activities = [
    { 
      icon: Users, 
      text: "Another artist just joined EmviApp in your city!", 
      color: "text-blue-600", 
      bg: "bg-blue-50", 
      border: "border-blue-100" 
    },
    { 
      icon: Heart, 
      text: "Top artist just got 5 new bookings in the last hour!", 
      color: "text-rose-600", 
      bg: "bg-rose-50", 
      border: "border-rose-100" 
    },
    { 
      icon: Star, 
      text: "Rising star earned their 50th five-star review!", 
      color: "text-amber-600", 
      bg: "bg-amber-50", 
      border: "border-amber-100" 
    },
    { 
      icon: TrendingUp, 
      text: "Elite professional reached $5,000 monthly revenue!", 
      color: "text-purple-600", 
      bg: "bg-purple-50", 
      border: "border-purple-100" 
    },
    { 
      icon: Calendar, 
      text: "127 new artists joined EmviApp this week!", 
      color: "text-emerald-600", 
      bg: "bg-emerald-50", 
      border: "border-emerald-100" 
    },
    { 
      icon: Crown, 
      text: "You moved up in city rankings!", 
      color: "text-orange-600", 
      bg: "bg-orange-50", 
      border: "border-orange-100" 
    },
    { 
      icon: DollarSign, 
      text: "1,247 bookings made citywide today!", 
      color: "text-red-600", 
      bg: "bg-red-50", 
      border: "border-red-100" 
    },
    { 
      icon: Zap, 
      text: "Pro artists earn 5x more on average!", 
      color: "text-cyan-600", 
      bg: "bg-cyan-50", 
      border: "border-cyan-100" 
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activities.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  const currentActivity = activities[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl overflow-hidden"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2">
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-3 h-3 bg-emerald-500 rounded-full"
          />
          <span className="text-sm font-inter font-bold text-slate-900 uppercase tracking-wide">Live Activity</span>
        </div>
        <div className="flex-1 h-px bg-slate-200"></div>
        <span className="text-xs text-slate-500 font-inter">Real-time updates</span>
      </div>

      <div className="h-16 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`absolute inset-0 flex items-center gap-3 p-4 rounded-xl ${currentActivity.bg} border ${currentActivity.border}`}
          >
            <motion.div
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <currentActivity.icon 
                className={`h-6 w-6 ${currentActivity.color} flex-shrink-0`} 
              />
            </motion.div>
            <motion.span 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-slate-900 font-inter font-medium"
            >
              {currentActivity.text}
            </motion.span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress indicators */}
      <div className="flex justify-center gap-1 mt-4">
        {activities.map((_, index) => (
          <motion.div
            key={index}
            animate={{
              scale: index === currentIndex ? 1.2 : 1,
              opacity: index === currentIndex ? 1 : 0.4
            }}
            transition={{ duration: 0.3 }}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-slate-900' : 'bg-slate-300'
            }`}
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-6 pt-4 border-t border-slate-100">
        <div className="text-center">
          <motion.div
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-sm text-purple-600 font-inter font-medium"
          >
            Join 12,847 artists building their empire on EmviApp
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtistLiveActivity;
