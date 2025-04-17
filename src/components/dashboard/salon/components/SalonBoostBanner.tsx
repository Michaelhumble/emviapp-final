
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SalonBoostBannerProps {
  onBoostClick: () => void;
}

const SalonBoostBanner: React.FC<SalonBoostBannerProps> = ({ onBoostClick }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 mb-6 border border-purple-100 relative"
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 h-6 w-6 text-gray-400 hover:text-gray-600"
        onClick={() => setDismissed(true)}
      >
        <X className="h-4 w-4" />
      </Button>
      
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-3 md:mb-0">
          <div className="bg-amber-400 p-1.5 rounded-full mr-3">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <h3 className="font-medium text-gray-800">
            Boost Your Reach — promote your listing for more views
          </h3>
        </div>
        
        <Button 
          onClick={onBoostClick}
          className="bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white border-none"
        >
          <Zap className="mr-2 h-4 w-4" />
          Boost My Salon
        </Button>
      </div>
    </motion.div>
  );
};

export default SalonBoostBanner;
