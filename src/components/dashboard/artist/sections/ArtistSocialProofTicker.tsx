
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Heart, Star, Zap, TrendingUp, Crown } from 'lucide-react';

const ArtistSocialProofTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const activities = [
    { icon: Users, text: "Sarah just joined EmviApp in your city! 🎉", color: "text-blue-400", bg: "bg-blue-500/10" },
    { icon: Heart, text: "Maria got 5 new bookings in the last hour! 💕", color: "text-pink-400", bg: "bg-pink-500/10" },
    { icon: Star, text: "Jessica earned her 50th ⭐⭐⭐⭐⭐ review!", color: "text-yellow-400", bg: "bg-yellow-500/10" },
    { icon: Zap, text: "Alex reached $5,000 monthly revenue! ⚡", color: "text-purple-400", bg: "bg-purple-500/10" },
    { icon: TrendingUp, text: "127 new artists joined EmviApp this week! 🌟", color: "text-green-400", bg: "bg-green-500/10" },
    { icon: Crown, text: "You moved up to #3 in city rankings! 👑", color: "text-yellow-300", bg: "bg-yellow-500/10" },
    { icon: Users, text: "1,247 bookings made citywide today! 🔥", color: "text-orange-400", bg: "bg-orange-500/10" },
    { icon: Heart, text: "Premium artists earn 5x more on average! 💎", color: "text-cyan-400", bg: "bg-cyan-500/10" }
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
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 lg:p-6 overflow-hidden shadow-2xl"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center gap-2">
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-3 h-3 bg-green-500 rounded-full"
          />
          <span className="text-sm font-bold text-white uppercase tracking-wide">Live Activity</span>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent"></div>
        <span className="text-xs text-gray-400">Real-time updates</span>
      </div>

      <div className="h-12 lg:h-14 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`absolute inset-0 flex items-center gap-3 p-3 rounded-xl ${currentActivity.bg} border border-white/10`}
          >
            <motion.div
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <currentActivity.icon 
                className={`h-5 w-5 lg:h-6 lg:w-6 ${currentActivity.color} flex-shrink-0`} 
              />
            </motion.div>
            <motion.span 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-sm lg:text-base text-white font-medium truncate"
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
              index === currentIndex ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Desktop: Additional FOMO messaging */}
      <div className="hidden lg:block mt-4 pt-4 border-t border-white/10">
        <div className="text-center">
          <motion.div
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-sm text-purple-200 font-medium"
          >
            🚀 Join 12,847 artists building their empire on EmviApp
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtistSocialProofTicker;
