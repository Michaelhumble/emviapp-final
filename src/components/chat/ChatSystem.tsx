import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, X } from 'lucide-react';
import ChatWindow from './ChatWindow';
import { useIsMobile } from '@/hooks/use-mobile';
import { ActionSuggestion, MessageType } from './types';

export type { ActionSuggestion, MessageType };

export const ChatSystem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Show smart engagement after user has been on page for a bit
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const openChat = () => {
    setIsOpen(true);
    setShowButton(false);
  };
  
  const closeChat = () => {
    setIsOpen(false);
  };
  
  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={`fixed ${isMobile ? 'top-4 left-4 right-4 bottom-20' : 'top-20 right-6 w-80 h-96'} z-[9999] bg-white rounded-lg shadow-2xl border`}
          >
            <ChatWindow onClose={closeChat} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Smart Engagement Tab - Top Right Corner */}
      {showButton && !isOpen && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className={`fixed ${isMobile ? 'top-20 right-0' : 'top-32 right-0'} z-[9998]`}
        >
          <motion.button
            onClick={openChat}
            whileHover={{ x: -5 }}
            className="bg-gradient-to-l from-blue-600 to-purple-600 text-white px-4 py-3 rounded-l-lg shadow-lg flex items-center gap-2 font-medium"
            style={{ 
              writingMode: isMobile ? 'horizontal-tb' : 'vertical-rl',
              textOrientation: isMobile ? 'mixed' : 'mixed'
            }}
          >
            <Bot size={20} />
            <span className={isMobile ? '' : 'rotate-180'}>
              AI Help
            </span>
          </motion.button>
        </motion.div>
      )}
    </>
  );
};
