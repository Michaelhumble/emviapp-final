
import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Users, Crown, Sparkles } from 'lucide-react';

const ArtistActionFooter = () => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-2xl lg:hidden"
    >
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="grid grid-cols-3 gap-3">
          {/* Invite Friends */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-4 rounded-xl flex flex-col items-center gap-1 shadow-lg"
          >
            <Users className="h-5 w-5" />
            <span className="text-xs font-inter font-medium">Invite</span>
          </motion.button>

          {/* Share Profile */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-xl flex flex-col items-center gap-1 shadow-lg"
          >
            <Share2 className="h-5 w-5" />
            <span className="text-xs font-inter font-medium">Share</span>
          </motion.button>

          {/* Upgrade to Pro */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white py-3 px-4 rounded-xl flex flex-col items-center gap-1 shadow-lg relative overflow-hidden"
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
            <span className="text-xs font-inter font-medium relative z-10">Pro</span>
          </motion.button>
        </div>

        {/* FOMO Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="mt-3 text-center"
        >
          <div className="text-xs text-gray-600 font-inter">
            🔥 <span className="font-semibold text-gray-900">Artists who invite 3 friends unlock Pro features!</span>
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
              <Sparkles className="h-3 w-3 text-yellow-400/60" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ArtistActionFooter;
