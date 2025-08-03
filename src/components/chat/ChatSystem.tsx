import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sun, X } from 'lucide-react';
import ChatWindow from './ChatWindow';
import { useIsMobile } from '@/hooks/use-mobile';
import { ActionSuggestion, MessageType } from './types';

// Use the 'export type' syntax for re-exporting types
export type { ActionSuggestion, MessageType };

export const ChatSystem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Delay appearance of chat icon to improve initial page load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  // Mobile adjustments for layout
  const mobilePosition = 'bottom-6 right-6';
  const desktopPosition = 'bottom-8 right-8';
  const position = isMobile ? mobilePosition : desktopPosition;
  
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            key="chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={`fixed ${isMobile ? 'inset-0 m-4' : 'bottom-24 right-8 w-[400px]'}`}
            style={{ zIndex: 9998 }}
          >
            <ChatWindow onClose={toggleChat} />
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {isVisible && !isOpen && (
          <motion.button
            key="chat-button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleChat}
            className={`fixed ${position} bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center focus:outline-none transition-all duration-200`}
            style={{ zIndex: 9999 }}
            aria-label="Chat with Sunshine AI"
          >
            <Sun size={24} />
          </motion.button>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.button
            key="close-button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-6 right-6 bg-gray-800 text-white p-2 rounded-full shadow-lg"
            style={{ zIndex: 9999 }}
            onClick={toggleChat}
            aria-label="Close chat"
          >
            <X size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};
