import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Sparkles, Heart, Star, Zap, Diamond } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UltimateSunshineButtonProps {
  onClick: () => void;
  hasUnreadMessages?: boolean;
}

export const UltimateSunshineButton = ({ onClick, hasUnreadMessages = false }: UltimateSunshineButtonProps) => {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-[9999]"
      initial={{ scale: 0, rotate: -360, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      whileHover={{ scale: 1.15, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", damping: 12, stiffness: 400 }}
    >
      {/* Ultra Premium Orbital Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Diamond sparkles */}
        <motion.div
          animate={{
            x: [0, 25, -20, 0],
            y: [0, -30, -20, 0],
            rotate: [0, 720, 1440],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-12 -right-8"
        >
          <Diamond className="w-6 h-6 text-orange-400 drop-shadow-2xl" />
        </motion.div>
        
        <motion.div
          animate={{
            x: [0, -22, 18, 0],
            y: [0, -25, -35, 0],
            rotate: [0, -720, -1440],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
          className="absolute -top-10 -left-12"
        >
          <Heart className="w-5 h-5 text-red-400 drop-shadow-2xl" />
        </motion.div>

        <motion.div
          animate={{
            x: [0, 20, -15, 0],
            y: [0, -22, -30, 0],
            scale: [1, 1.8, 0.6, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5
          }}
          className="absolute -top-14 right-10"
        >
          <Star className="w-5 h-5 text-yellow-400 drop-shadow-2xl" />
        </motion.div>

        <motion.div
          animate={{
            x: [0, 18, -12, 0],
            y: [0, -18, -28, 0],
            rotate: [0, 360, 720],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8
          }}
          className="absolute -top-8 right-12"
        >
          <Zap className="w-4 h-4 text-amber-400 drop-shadow-2xl" />
        </motion.div>

        <motion.div
          animate={{
            x: [0, -15, 10, 0],
            y: [0, -20, -25, 0],
            rotate: [0, 180, 360],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3.2
          }}
          className="absolute -top-6 -left-8"
        >
          <Sparkles className="w-5 h-5 text-orange-300 drop-shadow-2xl" />
        </motion.div>
      </div>

      {/* Ultra Premium Multi-Layer Glow */}
      <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-orange-400/40 via-amber-400/40 to-yellow-400/40 blur-3xl animate-pulse" />
      <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-orange-500/30 via-amber-500/30 to-yellow-500/30 blur-2xl" />
      <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-orange-600/20 via-amber-600/20 to-yellow-600/20 blur-xl" />

      {/* Ultra Premium Main Button */}
      <Button
        onClick={onClick}
        className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-orange-500 via-amber-500 via-yellow-500 to-orange-600 hover:from-orange-600 hover:via-amber-600 hover:via-yellow-600 hover:to-orange-700 shadow-2xl shadow-orange-500/70 border-4 border-orange-200/60 overflow-hidden group transition-all duration-500"
        aria-label="Chat with Little Sunshine - Premium Beauty Assistant"
      >
        {/* Ultra Premium Animated Background Layers */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-br from-orange-300 via-amber-300 to-yellow-300 rounded-full"
        />

        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-orange-300 to-amber-300 rounded-full"
        />

        {/* Ultra Premium Sunshine Icon */}
        <motion.div
          animate={{
            rotate: [0, 360, 720, 1080],
            scale: [1, 1.4, 1.2, 1],
            x: [0, 10, -10, 0],
            y: [0, -8, 8, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative z-10"
        >
          <Sun className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-2xl" />
        </motion.div>

        {/* Ultra Premium Unread Indicator */}
        {hasUnreadMessages && (
          <motion.div
            animate={{
              scale: [1, 1.6, 1],
              opacity: [1, 0.8, 1]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-3 -right-3 w-8 h-8 md:w-9 md:h-9 bg-gradient-to-br from-red-500 via-pink-500 to-red-600 rounded-full border-4 border-white flex items-center justify-center shadow-2xl shadow-red-500/50"
          >
            <span className="text-white text-sm font-bold">!</span>
          </motion.div>
        )}

        {/* Ultra Premium Hover Effects */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-300/70 to-yellow-300/70 blur-3xl scale-150 opacity-0 group-hover:opacity-100 transition-all duration-700" />
        <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-orange-400/30 to-yellow-400/30 blur-4xl animate-pulse" />
      </Button>

      {/* Ultra Premium Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 20, scale: 0.8 }}
        whileHover={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ type: "spring", damping: 15, stiffness: 400 }}
        className="absolute right-24 md:right-28 top-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-900/98 via-amber-900/98 to-orange-900/98 text-orange-50 px-6 py-4 rounded-2xl text-base font-semibold whitespace-nowrap pointer-events-none backdrop-blur-xl border-2 border-orange-300/30 shadow-2xl shadow-orange-900/50"
      >
        ✨ Chat with Little Sunshine
        <div className="text-xs text-orange-200 mt-1">Premium Beauty Assistant</div>
        <div className="absolute left-full top-1/2 -translate-y-1/2 border-[12px] border-transparent border-l-orange-900/98"></div>
      </motion.div>
    </motion.div>
  );
};