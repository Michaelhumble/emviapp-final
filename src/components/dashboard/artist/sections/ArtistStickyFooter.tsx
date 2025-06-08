
import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Users, Crown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ArtistStickyFooter = () => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-900/95 via-indigo-900/95 to-purple-900/95 backdrop-blur-xl border-t border-white/10 shadow-2xl"
    >
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="grid grid-cols-3 gap-3">
          {/* Invite Friends */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 shadow-lg"
              size="sm"
            >
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
            <Button 
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 shadow-lg"
              size="sm"
            >
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
            <Button 
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-0 shadow-lg relative overflow-hidden"
              size="sm"
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
          className="mt-3 text-center"
        >
          <div className="text-xs text-purple-200">
            🔥 <span className="font-semibold text-white">Artists who invite 3 friends unlock Pro features!</span>
          </div>
        </motion.div>

        {/* Floating Sparkles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
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
                left: `${20 + i * 15}%`,
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

export default ArtistStickyFooter;
