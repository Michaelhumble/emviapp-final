import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Sparkles, Heart, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NewChatButtonProps {
  onClick: () => void;
  hasUnreadMessages?: boolean;
}

export const NewChatButton = ({ onClick, hasUnreadMessages = false }: NewChatButtonProps) => {
  return (
    <motion.div
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9998]"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Floating elements animation */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Sparkles */}
        <motion.div
          animate={{
            x: [0, 15, -10, 0],
            y: [0, -20, -10, 0],
            rotate: [0, 180, 360],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-8 -right-4"
        >
          <Sparkles className="w-4 h-4 text-orange-400" />
        </motion.div>
        
        <motion.div
          animate={{
            x: [0, -12, 8, 0],
            y: [0, -15, -25, 0],
            rotate: [0, -180, -360],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute -top-6 -left-8"
        >
          <Heart className="w-3 h-3 text-red-400" />
        </motion.div>

        <motion.div
          animate={{
            x: [0, 10, -8, 0],
            y: [0, -12, -18, 0],
            scale: [1, 1.4, 0.8, 1],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute -top-10 right-6"
        >
          <Sun className="w-3 h-3 text-amber-400" />
        </motion.div>
      </div>

      {/* Main button */}
      <Button
        onClick={onClick}
        className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 shadow-2xl shadow-orange-500/50 border-2 border-white/20 overflow-hidden group animate-pulse"
        aria-label="Open Chat with Little Sunshine"
      >
        {/* Pulsing background effect */}
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-br from-orange-300 to-red-300 rounded-full"
        />

        {/* Chat icon with animation */}
        <motion.div
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative z-10"
        >
          <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </motion.div>

        {/* Unread message indicator */}
        {hasUnreadMessages && (
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              opacity: [1, 0.6, 1]
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center"
          >
            <span className="text-white text-xs font-bold">!</span>
          </motion.div>
        )}

        {/* Radial glow effect on hover */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-300/50 to-red-300/50 blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Extra attention-grabbing glow */}
        <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-orange-400/20 to-red-400/20 blur-2xl animate-pulse" />
      </Button>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="absolute right-16 md:right-20 top-1/2 -translate-y-1/2 bg-black/90 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap pointer-events-none backdrop-blur-sm"
      >
        Chat with Little Sunshine 💬
        <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-black/90"></div>
      </motion.div>
    </motion.div>
  );
};