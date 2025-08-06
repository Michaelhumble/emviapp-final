import React from 'react';
import { motion } from 'framer-motion';
import { ChatIcon } from './ChatIcon';

interface ChatButtonProps {
  onClick: () => void;
  isOpen?: boolean;
}

export const ChatButton = ({ onClick, isOpen = false }: ChatButtonProps) => {
  return (
    <motion.button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('🌟 Chat button clicked successfully!');
        onClick();
      }}
      className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 shadow-2xl text-white cursor-pointer z-[9999] flex items-center justify-center"
      style={{ 
        pointerEvents: 'auto',
        isolation: 'isolate'
      }}
      whileHover={{ 
        scale: 1.1,
        boxShadow: "0 0 40px rgba(255, 165, 0, 0.8)",
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      <ChatIcon size={32} />
      
      {/* Notification dot when closed */}
      {!isOpen && (
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </motion.button>
  );
};