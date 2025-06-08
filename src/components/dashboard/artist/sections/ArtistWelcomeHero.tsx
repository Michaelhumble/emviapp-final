
import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Zap, Star, Trophy, Sparkles } from 'lucide-react';

const ArtistWelcomeHero = () => {
  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour < 12) return "Good morning";
    if (currentHour < 17) return "Good afternoon";
    return "Good evening";
  };

  const badges = [
    { icon: Crown, label: "Top 3% Artist", color: "text-yellow-300", bg: "bg-yellow-500/20" },
    { icon: Zap, label: "5-Star Streak", color: "text-purple-300", bg: "bg-purple-500/20" },
    { icon: Trophy, label: "Rising Star", color: "text-blue-300", bg: "bg-blue-500/20" }
  ];

  return (
    <motion.div 
      className="relative bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-pink-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-12 overflow-hidden shadow-2xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-20, -40, -20],
              x: [0, 15, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
            className="absolute"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`
            }}
          >
            <Sparkles className="h-4 w-4 text-white/30" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10">
        {/* Header with Crown */}
        <div className="flex items-center justify-between mb-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex items-center gap-4"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg"
            >
              <Crown className="h-8 w-8 text-white" />
            </motion.div>
            <div>
              <motion.h1 
                className="text-3xl lg:text-5xl font-bold text-white leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {getGreeting()}, <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Maria!</span>
              </motion.h1>
              <motion.p 
                className="text-lg text-purple-200 mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Ready to build your empire today? ✨
              </motion.p>
            </div>
          </motion.div>

          {/* Streak Counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="hidden lg:block text-center"
          >
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-3xl font-bold text-yellow-300"
              >
                27
              </motion.div>
              <div className="text-sm text-white/80">Day Streak</div>
            </div>
          </motion.div>
        </div>

        {/* Achievement Badges */}
        <div className="flex flex-wrap gap-3 mb-6">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className={`${badge.bg} backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 flex items-center gap-2`}
            >
              <badge.icon className={`h-4 w-4 ${badge.color}`} />
              <span className="text-sm font-medium text-white">{badge.label}</span>
            </motion.div>
          ))}
        </div>

        {/* FOMO Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-3 h-3 bg-emerald-400 rounded-full"
            />
            <span className="text-emerald-200 font-medium">
              🔥 You're trending! 3 new clients saved your profile in the last hour
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ArtistWelcomeHero;
