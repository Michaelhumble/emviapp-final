
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Share2, Crown, Zap, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ArtistStickyFooter = () => {
  const handleInvite = () => {
    navigator.clipboard.writeText('https://emviapp.com/invite/artist123');
    toast.success('🚀 Invite link copied! Time to build your empire!', {
      style: {
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        color: 'white',
        border: 'none'
      }
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText('https://emviapp.com/artist/profile123');
    toast.success('✨ Profile link copied! Share your masterpiece!', {
      style: {
        background: 'linear-gradient(135deg, #ec4899, #f59e0b)',
        color: 'white',
        border: 'none'
      }
    });
  };

  const handleUpgrade = () => {
    toast.success('👑 Premium features unlocking soon! Stay tuned!', {
      style: {
        background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
        color: 'white',
        border: 'none'
      }
    });
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-md border-t border-purple-500/30 p-4"
    >
      {/* Animated Border */}
      <motion.div
        animate={{ 
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent"
        style={{
          backgroundSize: '200% 100%'
        }}
      />

      <div className="max-w-md mx-auto">
        <div className="grid grid-cols-3 gap-3 mb-3">
          {/* Invite Button */}
          <motion.div 
            whileHover={{ scale: 1.05, y: -2 }} 
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleInvite}
              className="w-full h-14 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 hover:from-purple-600 hover:via-pink-600 hover:to-purple-700 text-white border-0 rounded-xl shadow-2xl flex flex-col items-center justify-center gap-1 relative overflow-hidden"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Users className="h-5 w-5" />
              </motion.div>
              <span className="text-xs font-bold">Invite</span>
              
              {/* Sparkle Effect */}
              <motion.div
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  delay: 0.5
                }}
                className="absolute top-1 right-1 w-2 h-2 bg-yellow-300 rounded-full"
              />
            </Button>
          </motion.div>

          {/* Share Button */}
          <motion.div 
            whileHover={{ scale: 1.05, y: -2 }} 
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleShare}
              className="w-full h-14 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 hover:from-blue-600 hover:via-cyan-600 hover:to-blue-700 text-white border-0 rounded-xl shadow-2xl flex flex-col items-center justify-center gap-1 relative overflow-hidden"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Share2 className="h-5 w-5" />
              </motion.div>
              <span className="text-xs font-bold">Share</span>
              
              {/* Pulse Effect */}
              <motion.div
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity
                }}
                className="absolute inset-0 bg-white/20 rounded-xl"
              />
            </Button>
          </motion.div>

          {/* Upgrade Button */}
          <motion.div 
            whileHover={{ scale: 1.05, y: -2 }} 
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleUpgrade}
              className="w-full h-14 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-white border-0 rounded-xl shadow-2xl flex flex-col items-center justify-center gap-1 relative overflow-hidden"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 15, -15, 0]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Crown className="h-5 w-5" />
              </motion.div>
              <span className="text-xs font-bold">Pro</span>
              
              {/* Golden Glow */}
              <motion.div
                animate={{ 
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity
                }}
                className="absolute inset-0 bg-yellow-300/30 rounded-xl blur-sm"
              />
            </Button>
          </motion.div>
        </div>

        {/* Live Activity Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-2 text-xs text-purple-200 bg-gradient-to-r from-purple-800/50 to-pink-800/50 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-500/30"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity
              }}
              className="w-2 h-2 bg-green-400 rounded-full"
            />
            <TrendingUp className="h-3 w-3" />
            <span className="font-medium">Maria just earned $147 in 2 hours!</span>
            <Zap className="h-3 w-3 text-yellow-400" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ArtistStickyFooter;
