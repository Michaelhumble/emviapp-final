
import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Users, Crown, Sparkles, Zap } from 'lucide-react';

const ArtistActionFooter = () => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-900/95 via-indigo-900/95 to-purple-900/95 backdrop-blur-xl border-t border-white/10 shadow-2xl"
    >
      {/* Desktop Version */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <motion.div
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-sm text-purple-200"
              >
                🚀 <span className="font-semibold text-white">Artists who invite friends earn 3x more!</span>
              </motion.div>
            </div>
            
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg font-semibold"
              >
                <Users className="h-5 w-5" />
                <span>Invite Friends</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-1 w-2 h-2 bg-yellow-400 rounded-full"
                />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg font-semibold"
              >
                <Share2 className="h-5 w-5" />
                <span>Share Profile</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg relative overflow-hidden font-semibold"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-orange-400/30"
                />
                <Crown className="h-5 w-5 relative z-10" />
                <span className="relative z-10">Upgrade to Pro</span>
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="ml-1 relative z-10"
                >
                  ✨
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="lg:hidden">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="grid grid-cols-3 gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 rounded-xl flex flex-col items-center gap-1 shadow-lg"
            >
              <Users className="h-5 w-5" />
              <span className="text-xs font-semibold">Invite</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-3 rounded-xl flex flex-col items-center gap-1 shadow-lg"
            >
              <Share2 className="h-5 w-5" />
              <span className="text-xs font-semibold">Share</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white py-3 rounded-xl flex flex-col items-center gap-1 shadow-lg relative overflow-hidden"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-orange-400/30"
              />
              <Crown className="h-5 w-5 relative z-10" />
              <span className="text-xs font-semibold relative z-10">Pro</span>
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="mt-3 text-center"
          >
            <div className="text-xs text-purple-200">
              🔥 <span className="font-semibold text-white">Artists who invite 3 friends unlock Pro features!</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-10, -30, -10],
              x: [0, 15, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
            className="absolute"
            style={{
              left: `${15 + i * 15}%`,
              bottom: '10px'
            }}
          >
            <Sparkles className="h-3 w-3 text-yellow-300/60" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ArtistActionFooter;
