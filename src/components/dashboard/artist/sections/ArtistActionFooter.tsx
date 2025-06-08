
import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Users, Crown, Sparkles, Zap, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ArtistActionFooter = () => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-900/95 via-indigo-900/95 to-purple-900/95 backdrop-blur-xl border-t border-white/10 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Invite Friends */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 shadow-lg px-6 py-3">
                <Users className="h-5 w-5 mr-2" />
                Invite Friends
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="ml-2"
                >
                  <Gift className="h-4 w-4" />
                </motion.div>
              </Button>
            </motion.div>

            {/* Share Profile */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 shadow-lg px-6 py-3">
                <Share2 className="h-5 w-5 mr-2" />
                Share Profile
              </Button>
            </motion.div>

            {/* FOMO Message */}
            <div className="text-sm text-purple-200">
              🔥 <span className="font-semibold text-white">Artists who invite 3 friends unlock Pro features!</span>
            </div>
          </div>

          {/* Upgrade to Pro */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-0 shadow-lg relative overflow-hidden px-8 py-3">
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
              <Crown className="h-5 w-5 mr-2 relative z-10" />
              <span className="relative z-10 font-bold">Upgrade to Pro</span>
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="ml-2 relative z-10"
              >
                <Sparkles className="h-4 w-4" />
              </motion.div>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <div className="grid grid-cols-3 gap-3 mb-3">
            {/* Invite Friends */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 shadow-lg">
                <Users className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Invite</span>
                <span className="sm:hidden">+</span>
              </Button>
            </motion.div>

            {/* Share Profile */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 shadow-lg">
                <Share2 className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Share</span>
                <span className="sm:hidden">📤</span>
              </Button>
            </motion.div>

            {/* Upgrade to Pro */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-0 shadow-lg relative overflow-hidden">
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
                <Crown className="h-4 w-4 mr-1 relative z-10" />
                <span className="hidden sm:inline relative z-10">Pro</span>
                <span className="sm:hidden relative z-10">👑</span>
              </Button>
            </motion.div>
          </div>

          {/* FOMO Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="text-center"
          >
            <div className="text-xs text-purple-200">
              🔥 <span className="font-semibold text-white">Artists who invite 3 friends unlock Pro features!</span>
            </div>
          </motion.div>
        </div>

        {/* Floating Sparkles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [-10, -30, -10],
                x: [0, 10, 0],
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
                left: `${15 + i * 12}%`,
                bottom: '10px'
              }}
            >
              <Sparkles className="h-3 w-3 text-yellow-300/60" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ArtistActionFooter;
