
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Heart, Star, TrendingUp, Calendar, Crown, Zap } from 'lucide-react';

const ArtistLiveActivity = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const activities = [
    { 
      icon: Crown, 
      text: "You're in the top 3% of artists this week! 👑", 
      color: "text-yellow-600", 
      bg: "from-yellow-50 to-orange-50", 
      border: "border-yellow-200/50",
      type: "achievement"
    },
    { 
      icon: Users, 
      text: "Linh Nguyen just joined EmviApp in your area! 🎉", 
      color: "text-blue-600", 
      bg: "from-blue-50 to-cyan-50", 
      border: "border-blue-200/50",
      type: "activity"
    },
    { 
      icon: Heart, 
      text: "Hương Trần got 7 new bookings in the last 2 hours! 💕", 
      color: "text-pink-600", 
      bg: "from-pink-50 to-rose-50", 
      border: "border-pink-200/50",
      type: "social"
    },
    { 
      icon: Star, 
      text: "Mai Phạm earned her 100th ⭐⭐⭐⭐⭐ review today!", 
      color: "text-purple-600", 
      bg: "from-purple-50 to-indigo-50", 
      border: "border-purple-200/50",
      type: "milestone"
    },
    { 
      icon: TrendingUp, 
      text: "Thảo Lê reached $8,500 monthly revenue! ⚡", 
      color: "text-emerald-600", 
      bg: "from-emerald-50 to-green-50", 
      border: "border-emerald-200/50",
      type: "earnings"
    },
    { 
      icon: Zap, 
      text: "234 new artists joined EmviApp this week! 🌟", 
      color: "text-orange-600", 
      bg: "from-orange-50 to-red-50", 
      border: "border-orange-200/50",
      type: "growth"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activities.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const currentActivity = activities[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="bg-white border border-gray-200/50 rounded-2xl p-6 shadow-xl overflow-hidden relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-blue-400 to-cyan-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full shadow-lg"
            />
            <span className="text-sm font-inter font-bold text-gray-900 uppercase tracking-wide">Live Activity</span>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
            <span className="text-xs text-gray-500 font-inter bg-gray-100 px-2 py-1 rounded-full">Real-time</span>
          </div>

          <div className="h-20 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 40, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -40, scale: 0.8 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`absolute inset-0 flex items-center gap-4 p-6 rounded-xl bg-gradient-to-r ${currentActivity.bg} border ${currentActivity.border} shadow-lg`}
              >
                <motion.div
                  initial={{ scale: 0.5, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                  className={`p-3 bg-white rounded-xl shadow-md ${currentActivity.type === 'achievement' ? 'animate-pulse' : ''}`}
                >
                  <currentActivity.icon 
                    className={`h-6 w-6 ${currentActivity.color} flex-shrink-0`} 
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="flex-1"
                >
                  <span className="text-gray-900 font-inter font-semibold text-lg">
                    {currentActivity.text}
                  </span>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {activities.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                animate={{
                  scale: index === currentIndex ? 1.2 : 1,
                  opacity: index === currentIndex ? 1 : 0.4
                }}
                transition={{ duration: 0.3 }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-gray-900' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Action CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 pt-4 border-t border-gray-200/50"
          >
            <div className="text-center">
              <motion.div
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-sm font-inter font-semibold mb-3"
              >
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  🚀 Join 15,847 artists building their empire on EmviApp
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 rounded-full font-inter font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Share Your Success Story
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtistLiveActivity;
