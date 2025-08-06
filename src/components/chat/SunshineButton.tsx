import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Sparkles, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SunshineButtonProps {
  onClick: () => void;
  hasUnreadMessages?: boolean;
}

export const SunshineButton = ({ onClick, hasUnreadMessages = false }: SunshineButtonProps) => {
  return (
    <motion.div
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9998]"
      initial={{ scale: 0, rotate: -180, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", damping: 15, stiffness: 300 }}
    >
      {/* Floating elements animation */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Premium floating sparkles */}
        <motion.div
          animate={{
            x: [0, 20, -15, 0],
            y: [0, -25, -15, 0],
            rotate: [0, 360, 720],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-10 -right-6"
        >
          <Sparkles className="w-5 h-5 text-orange-400 drop-shadow-lg" />
        </motion.div>
        
        <motion.div
          animate={{
            x: [0, -18, 12, 0],
            y: [0, -20, -30, 0],
            rotate: [0, -360, -720],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2
          }}
          className="absolute -top-8 -left-10"
        >
          <Heart className="w-4 h-4 text-red-400 drop-shadow-lg" />
        </motion.div>

        <motion.div
          animate={{
            x: [0, 15, -12, 0],
            y: [0, -18, -25, 0],
            scale: [1, 1.5, 0.8, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.4
          }}
          className="absolute -top-12 right-8"
        >
          <Star className="w-4 h-4 text-yellow-400 drop-shadow-lg" />
        </motion.div>
      </div>

      {/* Premium gradient glow background */}
      <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-orange-400/30 via-amber-400/30 to-yellow-400/30 blur-xl animate-pulse" />

      {/* Main button */}
      <Button
        onClick={onClick}
        className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:via-amber-600 hover:to-orange-700 shadow-2xl shadow-orange-500/60 border-2 border-orange-300/50 overflow-hidden group transition-all duration-300"
        aria-label="Chat with Little Sunshine"
      >
        {/* Dynamic background pulse */}
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.4, 0.8, 0.4],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-br from-orange-300 to-yellow-300 rounded-full"
        />

        {/* Premium sunshine icon with advanced animation */}
        <motion.div
          animate={{
            rotate: [0, 360, 720],
            scale: [1, 1.3, 1],
            x: [0, 8, -8, 0],
            y: [0, -5, 5, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative z-10"
        >
          <Sun className="w-7 h-7 md:w-9 md:h-9 text-white drop-shadow-lg" />
        </motion.div>

        {/* Unread message indicator */}
        {hasUnreadMessages && (
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.7, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-2 -right-2 w-6 h-6 md:w-7 md:h-7 bg-gradient-to-br from-red-500 to-pink-500 rounded-full border-3 border-white flex items-center justify-center shadow-lg"
          >
            <span className="text-white text-xs font-bold">!</span>
          </motion.div>
        )}

        {/* Premium radial glow on hover */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-300/60 to-yellow-300/60 blur-2xl scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500" />
        
        {/* Extra premium outer glow */}
        <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-orange-400/20 to-yellow-400/20 blur-3xl animate-pulse" />
      </Button>

      {/* Premium tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 15, scale: 0.9 }}
        whileHover={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="absolute right-20 md:right-24 top-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-900/95 to-amber-900/95 text-orange-100 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap pointer-events-none backdrop-blur-md border border-orange-300/20 shadow-xl"
      >
        💬 Chat with Little Sunshine
        <div className="absolute left-full top-1/2 -translate-y-1/2 border-8 border-transparent border-l-orange-900/95"></div>
      </motion.div>
    </motion.div>
  );
};