
import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Star, TrendingUp, Sparkles } from 'lucide-react';

const ArtistWelcomeHero = () => {
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden bg-gradient-to-r from-white via-[#FDFDFD] to-rose-50 rounded-3xl border border-gray-100 shadow-xl p-8 lg:p-12"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-200/30 to-rose-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Welcome Content */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="p-4 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl border border-yellow-200/50 shadow-lg"
              >
                <Crown className="h-8 w-8 text-yellow-600" />
              </motion.div>
              <div>
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl lg:text-4xl font-playfair font-bold text-gray-900 mb-2"
                >
                  {getTimeBasedGreeting()}, Superstar! ✨
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-lg text-gray-600 font-inter"
                >
                  You're building something extraordinary
                </motion.p>
              </div>
            </div>
            
            {/* Achievement Badges */}
            <div className="flex flex-wrap gap-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                className="bg-gradient-to-r from-emerald-100 to-green-100 px-4 py-2 rounded-full border border-emerald-200/50 shadow-md"
              >
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-inter font-semibold text-emerald-800">Top 1% Artist</span>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
                className="bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full border border-purple-200/50 shadow-md"
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-inter font-semibold text-purple-800">Rising Star</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
                className="bg-gradient-to-r from-blue-100 to-cyan-100 px-4 py-2 rounded-full border border-blue-200/50 shadow-md"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-inter font-semibold text-blue-800">Viral Creator</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Streak Counter */}
          <div className="lg:text-right">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="bg-gradient-to-br from-rose-100 to-pink-100 p-8 rounded-2xl border border-rose-200/50 shadow-xl"
            >
              <div className="text-center lg:text-right">
                <motion.div 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-2"
                >
                  21
                </motion.div>
                <div className="text-sm font-inter text-gray-600 mb-3">Day Streak 🔥</div>
                <div className="flex justify-center lg:justify-end gap-1 mb-2">
                  {[...Array(7)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.2 + i * 0.1 }}
                      className={`w-3 h-3 rounded-full ${
                        i < 6 ? 'bg-rose-500' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-xs text-gray-500 font-inter">Keep it going!</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="mt-8 pt-6 border-t border-gray-200/50"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Star, label: "Add Work", color: "from-yellow-400 to-orange-400" },
              { icon: TrendingUp, label: "Share Profile", color: "from-blue-400 to-cyan-400" },
              { icon: Crown, label: "Invite Friends", color: "from-purple-400 to-pink-400" },
              { icon: Sparkles, label: "Go Pro", color: "from-emerald-400 to-green-400" }
            ].map((action, index) => (
              <motion.button
                key={action.label}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1 }}
                className="flex items-center gap-3 p-4 bg-white/80 hover:bg-white border border-gray-200/50 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color}`}>
                  <action.icon className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-inter font-medium text-gray-700">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ArtistWelcomeHero;
