
// COMMUNITY PAGE UPDATE - FOMO banner for premium launch
import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Clock, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CTAButton from './CTAButton';

const FOMOBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white shadow-xl"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Crown className="h-5 w-5 text-yellow-300" />
            </motion.div>
            <div className="text-sm md:text-base font-medium">
              <span className="hidden sm:inline">🎉 Early members get lifetime perks! </span>
              <span className="font-bold">Limited-time only!</span>
            </div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Gift className="h-4 w-4 text-yellow-300" />
            </motion.div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-sm">
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">Premium launching soon</span>
            </div>
            <CTAButton
              type="join_waitlist"
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 text-xs px-3 py-1"
            >
              Join VIP List
            </CTAButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FOMOBanner;
