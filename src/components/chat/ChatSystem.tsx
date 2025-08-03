import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sun, X, Sparkles } from 'lucide-react';
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
    console.log('Before toggle - isOpen:', isOpen, 'isVisible:', isVisible);
    setIsOpen(!isOpen);
    console.log('After toggle - isOpen will be:', !isOpen);
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
            className={`fixed ${isMobile ? 'inset-0 m-4' : 'bottom-20 right-4 w-[400px] max-h-[500px]'}`}
            style={{ zIndex: 9998 }}
          >
            <ChatWindow onClose={toggleChat} />
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {isVisible && !isOpen && (
          <motion.div
            key="chat-button"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              boxShadow: [
                "0 10px 30px rgba(251, 146, 60, 0.3)",
                "0 10px 40px rgba(251, 146, 60, 0.5)",
                "0 10px 30px rgba(251, 146, 60, 0.3)"
              ]
            }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ 
              duration: 0.5,
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className={`fixed ${position} group ${isOpen ? 'hidden' : ''}`}
            style={{ zIndex: 9999, display: isOpen ? 'none' : 'block' }}
          >
            {/* Floating emojis */}
            <motion.div
              animate={{ y: [-10, -20, -10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 -left-2 text-xl"
            >
              ✨
            </motion.div>
            <motion.div
              animate={{ y: [-15, -25, -15] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -top-6 -right-3 text-lg"
            >
              🧡
            </motion.div>
            <motion.div
              animate={{ y: [-8, -18, -8] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-10 left-1/2 text-lg"
            >
              👋
            </motion.div>
            
            {/* Main chat button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleChat}
              className="relative bg-gradient-to-br from-orange-400 via-yellow-400 to-orange-500 hover:from-orange-500 hover:via-yellow-500 hover:to-orange-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center focus:outline-none transition-all duration-300 w-16 h-16 group-hover:shadow-orange-500/50"
              aria-label="Chat with Sunshine AI"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-300" />
              
              {/* Sun icon with subtle animation */}
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sun size={28} className="relative z-10" />
              </motion.div>
              
              {/* Sparkle effect */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1 right-1"
              >
                <Sparkles size={12} className="text-yellow-200" />
              </motion.div>
            </motion.button>
          </motion.div>
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
