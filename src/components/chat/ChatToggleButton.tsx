
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
  const [pulsePhase, setPulsePhase] = useState(0);

  // Don't show the toggle button if the chat is already open on mobile
  if (isOpen && isMobile) return null;

  // Magical pulsing animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPulsePhase(prev => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const sparkleVariants = {
    hidden: { opacity: 0, scale: 0, rotate: 0 },
    visible: { 
      opacity: [0, 1, 0], 
      scale: [0, 1.5, 0], 
      rotate: [0, 180, 360],
      transition: { 
        duration: 1.5, 
        repeat: Infinity, 
        repeatDelay: 3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 25,
          }}
          className="fixed bottom-4 right-4 z-[1000] chat-toggle-safe-bottom"
          style={{
            ...(isMobile && { bottom: '140px' })
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Magical glow rings */}
          <div className="absolute inset-0 -m-2">
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/30 via-pink-400/30 to-orange-400/30"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20"
              animate={{
                scale: [1.1, 1.3, 1.1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
          </div>

          {/* Floating sparkles around the button */}
          <motion.div
            className="absolute -top-2 -right-2 w-3 h-3 text-yellow-400"
            variants={sparkleVariants}
            initial="hidden"
            animate="visible"
          >
            <Sparkles size={12} />
          </motion.div>
          <motion.div
            className="absolute -bottom-1 -left-1 w-2 h-2 text-pink-400"
            variants={sparkleVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            <Zap size={8} />
          </motion.div>
          <motion.div
            className="absolute top-0 -left-3 w-2 h-2 text-blue-400"
            variants={sparkleVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1 }}
          >
            <Sparkles size={8} />
          </motion.div>

          {/* Main button */}
          <motion.div
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 5 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 17,
            }}
          >
            <Button
              onClick={onClick}
              className={`relative ${isMobile ? 'h-16 w-16' : 'h-14 w-14'} rounded-full border-0 overflow-hidden group`}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              }}
              aria-label="Chat with Little Sunshine AI ✨"
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut",
                }}
                style={{
                  transform: 'skewX(-20deg)',
                }}
              />
              
              {/* Button content */}
              <div className="relative z-10 flex items-center justify-center">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: pulsePhase === 0 ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                    scale: { duration: 0.6, ease: "easeInOut" }
                  }}
                >
                  <Sparkles 
                    size={isMobile ? 28 : 24} 
                    className="text-white drop-shadow-lg" 
                  />
                </motion.div>
              </div>

              {/* Hover overlay */}
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              />
            </Button>
          </motion.div>

          {/* Curious tooltip */}
          <AnimatePresence>
            {isHovered && !isMobile && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="absolute right-full top-1/2 -translate-y-1/2 mr-3 bg-black/80 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap backdrop-blur-sm"
                style={{
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                }}
              >
                ✨ Ask me anything
                <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-black/80 border-t-4 border-t-transparent border-b-4 border-b-transparent" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
