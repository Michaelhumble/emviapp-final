import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X, Sparkles, Zap } from 'lucide-react';
import ChatWindow from './ChatWindow';
import { useIsMobile } from '@/hooks/use-mobile';
import { ActionSuggestion, MessageType } from './types';

// Use the 'export type' syntax for re-exporting types
export type { ActionSuggestion, MessageType };

export const ChatSystem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Load chat system after page is ready
    const timer = setTimeout(() => {
      setIsLoaded(true);
      // Show welcome message after button appears
      setTimeout(() => setShowWelcome(true), 1000);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowWelcome(false); // Hide welcome when opening chat
    }
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
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`fixed ${isMobile ? 'inset-4' : 'bottom-28 right-6 w-96 h-[500px]'} z-[9998]`}
          >
            <ChatWindow onClose={toggleChat} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Chat Bubble Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className={`fixed ${isMobile ? 'bottom-6 right-6' : 'bottom-6 right-6'} z-[9999] group`}
      >
        {/* Ambient Glow Background */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 blur-xl opacity-30"
          style={{ transform: 'scale(1.5)' }}
        />

        {/* Welcome Tooltip */}
        <AnimatePresence>
          {showWelcome && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className={`absolute ${isMobile ? 'right-20 top-2' : 'right-20 top-2'} pointer-events-none`}
            >
              <div className="relative bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 max-w-xs border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                    <Sparkles size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">
                      AI Assistant Ready! ✨
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Click to start chatting
                    </div>
                  </div>
                </div>
                
                {/* Tooltip Arrow */}
                <div className="absolute top-4 -right-2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-white/95"></div>
              </div>
              
              {/* Floating Sparkles around tooltip */}
              <motion.div
                animate={{ 
                  y: [0, -8, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-2 -left-2 text-yellow-400"
              >
                ✨
              </motion.div>
              <motion.div
                animate={{ 
                  y: [0, -6, 0],
                  rotate: [0, -180, -360]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-1 -right-3 text-purple-400"
              >
                💫
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Chat Button */}
        <motion.button
          whileHover={{ 
            scale: 1.05,
            rotate: isOpen ? 0 : 5
          }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleChat}
          className={`relative ${
            isMobile ? 'w-16 h-16' : 'w-14 h-14'
          } rounded-full shadow-2xl transition-all duration-500 flex items-center justify-center overflow-hidden border-2 border-white/20`}
          style={{
            background: isOpen 
              ? 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)'
              : 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 25%, #a855f7 50%, #c084fc 75%, #e879f9 100%)'
          }}
          aria-label={isOpen ? "Close AI Chat" : "Open AI Chat"}
        >
          {/* Inner Glow Effect */}
          <div className={`absolute inset-0 rounded-full ${
            isOpen 
              ? 'bg-gray-500' 
              : 'bg-gradient-to-br from-violet-400/30 to-pink-400/30'
          } blur-sm opacity-70`} />
          
          {/* Animated Icon Container */}
          <motion.div
            animate={{ 
              rotate: isOpen ? 180 : 0,
              scale: isOpen ? 0.9 : 1
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative z-10 flex items-center justify-center"
          >
            {isOpen ? (
              <X size={isMobile ? 24 : 20} className="text-white" />
            ) : (
              <MessageCircle size={isMobile ? 24 : 20} className="text-white fill-white/20" />
            )}
          </motion.div>
          
          {/* Ripple Effect on Click */}
          <motion.div
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 rounded-full bg-white"
            key={isOpen ? 'open' : 'closed'} // Key changes trigger new animation
          />
          
          {/* Magic Sparkle Effects - Only when closed */}
          <AnimatePresence>
            {!isOpen && (
              <>
                {/* Orbiting Sparkles */}
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity, 
                    ease: "linear"
                  }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <Sparkles 
                    size={8} 
                    className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-yellow-300" 
                  />
                  <Zap 
                    size={6} 
                    className="absolute top-1/2 -right-2 transform -translate-y-1/2 text-pink-300" 
                  />
                  <Sparkles 
                    size={6} 
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-blue-300" 
                  />
                  <Zap 
                    size={8} 
                    className="absolute top-1/2 -left-2 transform -translate-y-1/2 text-purple-300" 
                  />
                </motion.div>

                {/* Pulsing Ring */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.4, 1],
                    opacity: [0.5, 0.2, 0.5]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 rounded-full border-2 border-white/30"
                />
              </>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Status Indicator Dot */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.3 }}
          className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 border-2 border-white shadow-lg"
        >
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full rounded-full bg-white/30"
          />
        </motion.div>
      </motion.div>
    </>
  );
};
