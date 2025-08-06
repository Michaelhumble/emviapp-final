import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChatIcon } from './ChatIcon';

interface ChatButtonProps {
  onClick: () => void;
  isOpen?: boolean;
}

export const ChatButton = ({ onClick, isOpen = false }: ChatButtonProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('🌟 Chat button clicked successfully!');
        onClick();
      }}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 shadow-2xl text-white cursor-pointer z-[9999] flex items-center justify-center"
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
      <ChatIcon size={isMobile ? 28 : 32} />
      
      {/* Notification dot when closed */}
      {!isOpen && (
        <motion.div
          className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full border-1 sm:border-2 border-white"
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