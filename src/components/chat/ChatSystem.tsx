import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X, Sparkles } from 'lucide-react';
import ChatWindow from './ChatWindow';
import { useIsMobile } from '@/hooks/use-mobile';
import { ActionSuggestion, MessageType } from './types';

// Use the 'export type' syntax for re-exporting types
export type { ActionSuggestion, MessageType };

export const ChatSystem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Load chat system after page is ready
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  if (!isLoaded) return null;

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`fixed ${isMobile ? 'inset-4' : 'bottom-24 right-6 w-96 h-[500px]'} z-[9998]`}
          >
            <ChatWindow onClose={toggleChat} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Persistent Chat Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className={`fixed ${isMobile ? 'bottom-6 right-6' : 'bottom-6 right-6'} z-[9999]`}
      >
        {/* Notification Pulse (only when closed) */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.4, 1] }}
              exit={{ scale: 0 }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatDelay: 3,
                ease: "easeInOut"
              }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-400 to-red-400 rounded-full z-10"
            >
              <motion.div
                animate={{ scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full bg-white rounded-full opacity-60"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Chat Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleChat}
          className={`relative ${
            isOpen 
              ? 'bg-gray-600 hover:bg-gray-700' 
              : 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600'
          } text-white rounded-full shadow-lg transition-all duration-300 ${
            isMobile ? 'w-14 h-14' : 'w-12 h-12'
          } flex items-center justify-center group`}
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {/* Glow Effect */}
          <div className={`absolute inset-0 rounded-full ${
            isOpen 
              ? 'bg-gray-500' 
              : 'bg-gradient-to-br from-blue-400 to-pink-400'
          } opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-300`} />
          
          {/* Icon with smooth transition */}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative z-10"
          >
            {isOpen ? (
              <X size={isMobile ? 24 : 20} />
            ) : (
              <MessageCircle size={isMobile ? 24 : 20} />
            )}
          </motion.div>
          
          {/* Sparkle Effect - only when closed */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0.5, 1, 0.5], 
                  scale: [0.8, 1.2, 0.8],
                  rotate: [0, 180, 360]
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  repeatDelay: 2
                }}
                className="absolute -top-1 -right-1"
              >
                <Sparkles size={12} className="text-yellow-300" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
        
        {/* Welcome Message - only shows first time */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              transition={{ duration: 0.4, delay: 1 }}
              className={`absolute ${isMobile ? 'right-16 top-0' : 'right-14 top-0'} bg-white rounded-lg shadow-lg p-3 max-w-xs pointer-events-none`}
            >
              <div className="text-sm text-gray-800 font-medium">
                👋 Hi! Need help? Click to chat!
              </div>
              <div className="absolute top-3 -left-2 w-0 h-0 border-t-4 border-b-4 border-r-8 border-transparent border-r-white"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};
