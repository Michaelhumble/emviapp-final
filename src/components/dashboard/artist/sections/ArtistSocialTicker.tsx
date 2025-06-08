
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Heart, Star, Zap } from 'lucide-react';

const ArtistSocialTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const activities = [
    { icon: Users, text: "Sarah just joined EmviApp! 🎉", color: "text-blue-600" },
    { icon: Heart, text: "Maria got 5 new bookings today! 💕", color: "text-pink-600" },
    { icon: Star, text: "Jessica earned ⭐⭐⭐⭐⭐ review!", color: "text-yellow-600" },
    { icon: Zap, text: "Alex reached 100 clients milestone! ⚡", color: "text-purple-600" },
    { icon: Users, text: "3 new artists joined in your city! 🌟", color: "text-green-600" },
    { icon: Heart, text: "1,247 bookings made today citywide! 🔥", color: "text-orange-600" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activities.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-4 overflow-hidden"
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">Live Activity</span>
      </div>

      <div className="h-8 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex items-center gap-2"
          >
            <activities[currentIndex].icon 
              className={`h-4 w-4 ${activities[currentIndex].color} flex-shrink-0`} 
            />
            <span className="text-sm text-gray-700 truncate">
              {activities[currentIndex].text}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-1 mt-3">
        {activities.map((_, index) => (
          <div
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-purple-500 scale-125' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ArtistSocialTicker;
