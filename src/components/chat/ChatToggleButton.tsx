
import { Sparkles, MessageCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";

interface ChatToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function ChatToggleButton({ isOpen, onClick }: ChatToggleButtonProps) {
  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = useState(false);

  // Don't show the toggle button if the chat is already open on mobile
  if (isOpen && isMobile) return null;

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{
            duration: 0.2,
            ease: "easeOut"
          }}
          className="fixed bottom-4 right-4 z-[1000] chat-toggle-safe-bottom"
          style={{
            ...(isMobile && { bottom: '140px' })
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Subtle glow effect only on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 -m-1 rounded-full bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-orange-400/20 blur-sm"
                transition={{ duration: 0.3 }}
              />
            )}
          </AnimatePresence>

          {/* Main button */}
          <motion.div
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{
              duration: 0.2,
              ease: "easeOut"
            }}
          >
            <Button
              onClick={onClick}
              className={`relative ${isMobile ? 'h-14 w-14' : 'h-12 w-12'} rounded-full border-0 shadow-lg`}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                boxShadow: '0 4px 16px rgba(102, 126, 234, 0.25)',
              }}
              aria-label="Chat with Little Sunshine AI"
            >
              {/* Subtle shimmer effect only on hover */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ x: '-100%', opacity: 0 }}
                    animate={{ x: '100%', opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut",
                    }}
                    style={{
                      transform: 'skewX(-20deg)',
                    }}
                  />
                )}
              </AnimatePresence>
              
              {/* Button content */}
              <div className="relative z-10 flex items-center justify-center">
                <Sparkles 
                  size={isMobile ? 22 : 20} 
                  className="text-white" 
                />
              </div>
            </Button>
          </motion.div>

          {/* Simple tooltip on hover */}
          <AnimatePresence>
            {isHovered && !isMobile && (
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.2 }}
                className="absolute right-full top-1/2 -translate-y-1/2 mr-2 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap"
              >
                Ask me anything ✨
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
