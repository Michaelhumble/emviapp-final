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
    setShowButton(false); // Hide button immediately when chat opens
  };
  
  const closeChat = () => {
    setIsOpen(false);
    // Don't show button again - user has discovered the chat
  };
  
  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            key="chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={`fixed ${isMobile ? 'inset-0 m-4' : 'bottom-20 right-4 w-[400px] max-h-[500px]'} z-[9998]`}
          >
            <ChatWindow onClose={closeChat} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Floating Chat Button - Only shows once, disappears forever when clicked */}
      <AnimatePresence>
        {showButton && (
          <motion.div
            key="floating-button"
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
            className={`fixed ${isMobile ? 'bottom-6 right-6' : 'bottom-8 right-8'} z-[9999] group`}
          >
            {/* Floating Emojis */}
            <motion.div
              animate={{ y: [-10, -20, -10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 -left-2 text-xl pointer-events-none"
            >
              ✨
            </motion.div>
            <motion.div
              animate={{ y: [-15, -25, -15] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -top-6 -right-3 text-lg pointer-events-none"
            >
              🧡
            </motion.div>
            <motion.div
              animate={{ y: [-8, -18, -8] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-10 left-1/2 text-lg pointer-events-none"
            >
              👋
            </motion.div>
            
            {/* Main Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={openChat}
              className="relative bg-gradient-to-br from-orange-400 via-yellow-400 to-orange-500 hover:from-orange-500 hover:via-yellow-500 hover:to-orange-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center focus:outline-none transition-all duration-300 w-16 h-16"
              aria-label="Chat with Sunshine AI"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-300" />
              
              {/* Sun Icon */}
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sun size={28} className="relative z-10" />
              </motion.div>
              
              {/* Sparkle Effect */}
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
      
      {/* Mobile Close Button */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.button
            key="close-button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-6 right-6 bg-gray-800 text-white p-2 rounded-full shadow-lg z-[9999]"
            onClick={closeChat}
            aria-label="Close chat"
          >
            <X size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};
