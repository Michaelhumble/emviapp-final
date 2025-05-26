
import React from 'react';
import { motion } from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

interface BillingToggleProps {
  isAnnual: boolean;
  onToggle: (annual: boolean) => void;
}

const BillingToggle: React.FC<BillingToggleProps> = ({ isAnnual, onToggle }) => {
  return (
    <div className="flex items-center justify-center mb-12">
      <div className="flex items-center gap-4 bg-white/80 backdrop-blur-md rounded-full p-2 shadow-lg border border-gray-200">
        <span className={`text-sm font-medium px-3 py-1 rounded-full transition-colors ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
          Monthly
        </span>
        
        <Switch
          checked={isAnnual}
          onCheckedChange={onToggle}
          className="data-[state=checked]:bg-purple-600"
        />
        
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium px-3 py-1 rounded-full transition-colors ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
            Annual
          </span>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: isAnnual ? 1 : 0.8, 
              opacity: isAnnual ? 1 : 0.7 
            }}
            transition={{ duration: 0.3 }}
          >
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 text-xs">
              Save 20%
            </Badge>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BillingToggle;
