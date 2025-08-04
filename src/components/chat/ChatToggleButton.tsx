
import { Sun, Heart, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";

interface ChatToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
  hasUnreadMessages?: boolean;
  userName?: string;
}

export function ChatToggleButton({ isOpen, onClick, hasUnreadMessages = false, userName }: ChatToggleButtonProps) {
  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [sparkleKey, setSparkleKey] = useState(0);

  // Auto-show tooltip for new users to boost engagement
  useEffect(() => {
    if (!userName && !isOpen) {
      const timer = setTimeout(() => setShowTooltip(true), 3000);
      const hideTimer = setTimeout(() => setShowTooltip(false), 8000);
      return () => {
        clearTimeout(timer);
        clearTimeout(hideTimer);
      };
    }
  }, [userName, isOpen]);

  // Refresh sparkle animations
  useEffect(() => {
    const interval = setInterval(() => {
      setSparkleKey(prev => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Don't show the toggle button if the chat is already open on mobile
  if (isOpen && isMobile) return null;

  const handleClick = () => {
    setShowTooltip(false);
    onClick();
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{
            duration: 0.4,
            ease: "easeOut"
          }}
          className="fixed bottom-6 right-6 z-[1000] chat-toggle-safe-bottom"
          style={{
            ...(isMobile && { bottom: '140px' })
          }}
          onMouseEnter={() => {
            setIsHovered(true);
            setShowTooltip(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            if (userName) setShowTooltip(false); // Hide tooltip faster for returning users
          }}
        >
          {/* Magical glow aura - always present, intensifies on hover */}
          <motion.div
            animate={{
              scale: isHovered ? [1, 1.1, 1] : [1, 1.05, 1],
              opacity: isHovered ? [0.6, 0.8, 0.6] : [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: isHovered ? 2 : 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`absolute inset-0 ${isMobile ? '-m-3' : '-m-2'} rounded-full`}
            style={{
              background: 'radial-gradient(circle, rgba(255,204,0,0.4) 0%, rgba(255,154,0,0.3) 30%, rgba(255,94,77,0.2) 60%, transparent 100%)',
              filter: 'blur(8px)'
            }}
          />

          {/* Orbiting sparkles - premium touch */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`${sparkleKey}-${i}`}
                initial={{
                  rotate: i * 60,
                  scale: 0,
                  opacity: 0
                }}
                animate={{
                  rotate: i * 60 + 360,
                  scale: [0, 1, 0],
                  opacity: [0, 0.8, 0]
                }}
                transition={{
                  duration: 4,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className={`absolute ${isMobile ? 'w-20 h-20' : 'w-16 h-16'} flex items-center justify-center`}
                style={{
                  left: '50%',
                  top: '50%',
                  marginLeft: isMobile ? '-10px' : '-8px',
                  marginTop: isMobile ? '-10px' : '-8px'
                }}
              >
                <motion.div
                  animate={{ rotate: -(i * 60 + 360) }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="w-1 h-1 bg-yellow-300 rounded-full shadow-sm"
                  style={{
                    transform: `translateY(-${isMobile ? '32px' : '28px'})`
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Main sunshine button */}
          <motion.div
            animate={{
              scale: isHovered ? 1.08 : 1,
              rotate: isHovered ? [0, 5, -5, 0] : 0
            }}
            transition={{
              scale: { duration: 0.3, ease: "easeOut" },
              rotate: { duration: 0.6, ease: "easeInOut" }
            }}
            className="relative"
          >
            <Button
              onClick={handleClick}
              className={`relative ${isMobile ? 'h-16 w-16' : 'h-14 w-14'} rounded-full border-3 border-white/30 shadow-2xl overflow-hidden group`}
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 25%, #FF6347 50%, #FF1493 75%, #FFD700 100%)',
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 4s ease infinite',
                boxShadow: `
                  0 8px 32px rgba(255, 215, 0, 0.4),
                  0 4px 16px rgba(255, 165, 0, 0.3),
                  0 2px 8px rgba(255, 99, 71, 0.2),
                  inset 0 2px 4px rgba(255, 255, 255, 0.3)
                `
              }}
              aria-label={`Open Sunshine Chat${userName ? ` - Welcome back ${userName}!` : ' - Your Free Beauty Assistant'}`}
            >
              {/* Shimmer effect on hover */}
              <motion.div
                initial={{ x: '-150%', opacity: 0 }}
                animate={isHovered ? { x: '150%', opacity: [0, 1, 0] } : {}}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform skew-x-12"
              />
              
              {/* Sunshine icon with micro-interactions */}
              <motion.div
                animate={{
                  rotate: isHovered ? 360 : 0,
                  scale: isHovered ? [1, 1.1, 1] : 1
                }}
                transition={{
                  rotate: { duration: 0.8, ease: "easeInOut" },
                  scale: { duration: 0.4, ease: "easeInOut" }
                }}
                className="relative z-10"
              >
                <Sun 
                  size={isMobile ? 28 : 24} 
                  className="text-white drop-shadow-md" 
                  fill="rgba(255,255,255,0.8)"
                />
              </motion.div>

              {/* Pulsing inner glow */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-2 rounded-full bg-white/20"
              />

              {/* Unread message indicator */}
              <AnimatePresence>
                {hasUnreadMessages && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute -top-1 -right-1"
                  >
                    <motion.div
                      animate={{ 
                        scale: [1, 1.3, 1],
                        boxShadow: [
                          '0 0 0 0 rgba(239, 68, 68, 0.7)',
                          '0 0 0 8px rgba(239, 68, 68, 0)',
                          '0 0 0 0 rgba(239, 68, 68, 0)'
                        ]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center"
                    >
                      <Heart size={8} className="text-white" fill="white" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>

          {/* Enhanced tooltip with personality */}
          <AnimatePresence>
            {(showTooltip || isHovered) && !isMobile && (
              <motion.div
                initial={{ opacity: 0, x: 12, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 12, scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute right-full top-1/2 -translate-y-1/2 mr-3"
              >
                <div className="relative">
                  {/* Tooltip bubble */}
                  <div className="bg-gradient-to-r from-orange-400 to-pink-400 text-white px-4 py-2 rounded-2xl shadow-lg max-w-xs relative">
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: [0, 20, -20, 0] }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      >
                        ☀️
                      </motion.div>
                      <div className="text-sm font-medium">
                        {userName 
                          ? `Welcome back ${userName}! 👋` 
                          : hasUnreadMessages 
                            ? "New message waiting! 💌"
                            : "Meet Sunshine – Your Free Beauty Assistant!"
                        }
                      </div>
                    </div>
                    {!userName && (
                      <div className="text-xs opacity-90 mt-1">
                        Ask anything about beauty, jobs & salons! ✨
                      </div>
                    )}
                  </div>
                  
                  {/* Tooltip arrow */}
                  <div 
                    className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0"
                    style={{
                      borderLeft: '8px solid #fb7185',
                      borderTop: '8px solid transparent',
                      borderBottom: '8px solid transparent'
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile tap hint */}
          {isMobile && showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -top-16 left-1/2 -translate-x-1/2 bg-black/80 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap"
            >
              👆 Tap for instant help!
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
