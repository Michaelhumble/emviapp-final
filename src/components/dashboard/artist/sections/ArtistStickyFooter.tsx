
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Share2, Crown, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ArtistStickyFooter = () => {
  const handleInvite = () => {
    navigator.clipboard.writeText('https://emviapp.com/invite/artist123');
    toast.success('Invite link copied! Share it everywhere! 🚀');
  };

  const handleShare = () => {
    navigator.clipboard.writeText('https://emviapp.com/artist/profile123');
    toast.success('Profile link copied! Time to go viral! ✨');
  };

  const handleUpgrade = () => {
    toast.info('Premium features coming soon! 👑');
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 safe-area-pb"
    >
      <div className="max-w-md mx-auto">
        <div className="grid grid-cols-3 gap-3">
          {/* Invite Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleInvite}
              className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 rounded-xl shadow-lg flex items-center justify-center gap-2"
            >
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">Invite</span>
            </Button>
          </motion.div>

          {/* Share Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleShare}
              variant="outline"
              className="w-full h-12 border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 rounded-xl shadow-lg flex items-center justify-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              <span className="text-sm font-medium">Share</span>
            </Button>
          </motion.div>

          {/* Upgrade Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleUpgrade}
              className="w-full h-12 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white border-0 rounded-xl shadow-lg flex items-center justify-center gap-2"
            >
              <Crown className="h-4 w-4" />
              <span className="text-sm font-medium">Pro</span>
            </Button>
          </motion.div>
        </div>

        {/* Live Activity Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-3 text-center"
        >
          <div className="inline-flex items-center gap-2 text-xs text-gray-600 bg-gray-100 rounded-full px-3 py-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Sarah just invited 3 friends! 🔥</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ArtistStickyFooter;
