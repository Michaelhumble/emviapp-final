import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Stars } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SunshineButtonProps {
  onClick: () => void;
  hasUnreadMessages?: boolean;
}

export const SunshineButton = ({ onClick, hasUnreadMessages = false }: SunshineButtonProps) => {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-[9998]"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Floating sparkles animation */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            x: [0, 10, -10, 0],
            y: [0, -15, -5, 0],
            rotate: [0, 180, 360],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-8 -right-2"
        >
          <Sparkles className="w-4 h-4 text-yellow-400" />
        </motion.div>
        
        <motion.div
          animate={{
            x: [0, -15, 10, 0],
            y: [0, -10, -20, 0],
            rotate: [0, -180, -360],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute -top-4 -left-6"
        >
          <Stars className="w-3 h-3 text-pink-400" />
        </motion.div>

        <motion.div
          animate={{
            x: [0, 8, -12, 0],
            y: [0, -8, -12, 0],
            scale: [1, 1.3, 0.8, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute -top-6 right-4"
        >
          <Heart className="w-3 h-3 text-red-400" />
        </motion.div>
      </div>

      {/* Main sunshine button */}
      <Button
        onClick={onClick}
        className="relative w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 via-orange-400 to-pink-400 hover:from-yellow-400 hover:via-orange-500 hover:to-pink-500 shadow-2xl border-3 border-white/30 overflow-hidden group"
        aria-label="Chat with Little Sunshine"
      >
        {/* Pulsing background effect */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full"
        />

        {/* Sunshine emoji with animation */}
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
          className="relative z-10 text-2xl"
        >
          ☀️
        </motion.div>

        {/* Unread message indicator */}
        {hasUnreadMessages && (
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.7, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center"
          >
            <span className="text-white text-xs font-bold">!</span>
          </motion.div>
        )}

        {/* Radial glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300/20 to-pink-300/20 blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Button>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="absolute right-20 top-1/2 -translate-y-1/2 bg-black/80 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap pointer-events-none"
      >
        Chat with Little Sunshine ✨
      </motion.div>
    </motion.div>
  );
};