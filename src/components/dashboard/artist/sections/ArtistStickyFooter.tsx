
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Share2, Users, Crown, Zap } from 'lucide-react';

const ArtistStickyFooter = () => {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-200 p-4 shadow-2xl"
    >
      <div className="max-w-lg mx-auto">
        <div className="grid grid-cols-3 gap-3">
          <Button
            className="h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold shadow-lg"
            onClick={() => {
              // Handle invite action
              console.log("Invite clicked");
            }}
          >
            <Users className="h-4 w-4 mr-1" />
            Invite
          </Button>
          
          <Button
            className="h-12 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold shadow-lg"
            onClick={() => {
              // Handle share action
              console.log("Share clicked");
            }}
          >
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
          
          <Button
            className="h-12 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold shadow-lg relative overflow-hidden"
            onClick={() => {
              // Handle upgrade action
              console.log("Upgrade clicked");
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-white/20 rounded-md"
            />
            <Crown className="h-4 w-4 mr-1 relative z-10" />
            <span className="relative z-10">Pro</span>
          </Button>
        </div>
        
        {/* Pulsing indicator */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center justify-center mt-2 gap-1 text-xs text-gray-500"
        >
          <Zap className="h-3 w-3 text-yellow-500" />
          <span>Tap any button to level up your business!</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ArtistStickyFooter;
