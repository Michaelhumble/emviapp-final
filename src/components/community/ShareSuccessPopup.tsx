import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, TrendingUp, Zap, Star, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ShareSuccessPopupProps {
  isVisible: boolean;
  onClose: () => void;
  points?: number;
  newRank?: number;
  bonusMessage?: string;
}

const ShareSuccessPopup: React.FC<ShareSuccessPopupProps> = ({
  isVisible,
  onClose,
  points = 10,
  newRank,
  bonusMessage
}) => {
  useEffect(() => {
    if (isVisible) {
      // Trigger confetti when popup appears
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.8 },
          colors: ['#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#10B981']
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.8 },
          colors: ['#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#10B981']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

      // Auto close after 4 seconds
      const timeout = setTimeout(onClose, 4000);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className="bg-background/95 backdrop-blur-lg border border-border/50 rounded-3xl p-8 shadow-2xl max-w-sm w-full mx-4 overflow-hidden relative">
              {/* Background Effects */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-pink-500/10"
                animate={{ 
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Success Icon */}
              <div className="relative z-10 text-center mb-6">
                <motion.div
                  className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-lg mb-4"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, -10, 0],
                    boxShadow: [
                      "0 0 20px rgba(34, 197, 94, 0.4)",
                      "0 0 40px rgba(34, 197, 94, 0.6)",
                      "0 0 20px rgba(34, 197, 94, 0.4)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Trophy className="w-10 h-10 text-white" />
                </motion.div>

                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2"
                >
                  Awesome Share! 🎉
                </motion.h2>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-muted-foreground"
                >
                  Your story is spreading the EmviApp magic!
                </motion.p>
              </div>

              {/* Rewards */}
              <div className="relative z-10 space-y-4 mb-6">
                {/* Points Earned */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-400/20"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-foreground">Points Earned</span>
                  </div>
                  <motion.span
                    className="text-xl font-bold text-blue-600"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    +{points}
                  </motion.span>
                </motion.div>

                {/* New Rank */}
                {newRank && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl border border-yellow-400/20"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-foreground">New Rank</span>
                    </div>
                    <motion.span
                      className="text-xl font-bold text-yellow-600"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      #{newRank}
                    </motion.span>
                  </motion.div>
                )}

                {/* Bonus Message */}
                {bonusMessage && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-400/20"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                        <Gift className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-foreground text-sm">{bonusMessage}</span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Social Brag */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="relative z-10 text-center"
              >
                <motion.button
                  className="px-6 py-3 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-medium rounded-2xl shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    // This would open share modal with leaderboard position
                    console.log('Share leaderboard position');
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4" />
                    <span>Brag About Your Rank!</span>
                  </div>
                </motion.button>
                
                <p className="text-xs text-muted-foreground mt-2">
                  Show your friends how awesome you are! 🌟
                </p>
              </motion.div>

              {/* Floating sparkles */}
              <motion.div
                className="absolute top-4 right-8 w-2 h-2 bg-yellow-400 rounded-full"
                animate={{ 
                  y: [0, -10, 0],
                  opacity: [0.4, 1, 0.4],
                  scale: [1, 1.5, 1]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              <motion.div
                className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-purple-400 rounded-full"
                animate={{ 
                  y: [0, -8, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 2, 1]
                }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShareSuccessPopup;