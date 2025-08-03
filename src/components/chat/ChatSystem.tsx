import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import ChatWindow from './ChatWindow';
import { useIsMobile } from '@/hooks/use-mobile';
import { ActionSuggestion, MessageType } from './types';

export type { ActionSuggestion, MessageType };

export const ChatSystem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Show button after 3 seconds
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const openChat = () => {
    setIsOpen(true);
    setShowButton(false); // Hide button completely when chat opens
  };
  
  const closeChat = () => {
    setIsOpen(false);
    // Button stays hidden - cleaner UX
  };
  
  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed ${isMobile ? 'inset-4' : 'bottom-6 right-6 w-96 h-[500px]'} z-[9998]`}
          >
            <ChatWindow onClose={closeChat} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Simple Chat Button - ONLY shows when showButton is true */}
      {showButton && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={openChat}
          className={`fixed ${isMobile ? 'bottom-6 left-6' : 'bottom-6 left-6'} z-[9999] bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 ${isMobile ? 'w-14 h-14' : 'w-12 h-12'} flex items-center justify-center`}
          aria-label="Open chat"
        >
          <MessageCircle size={isMobile ? 24 : 20} />
        </motion.button>
      )}
    </>
  );
};
