
import React from 'react';
import { motion } from 'framer-motion';
import { Info, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AutoRenewSuggestionCardProps {
  onUpgrade?: () => void;
}

const AutoRenewSuggestionCard: React.FC<AutoRenewSuggestionCardProps> = ({ onUpgrade }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-r from-amber-50 to-white border border-amber-200 rounded-lg p-4 shadow-sm mt-3"
    >
      <div className="flex items-start">
        <div className="mr-3 mt-0.5">
          <Info className="h-5 w-5 text-amber-500" />
        </div>
        <div>
          <h4 className="font-medium text-amber-800 mb-1">Want to double your chances?</h4>
          <p className="text-sm text-gray-600 mb-3">
            For just $10 more, get front-page exposure for 30 days and hire up to 3x faster.
          </p>
          {onUpgrade && (
            <Button 
              onClick={onUpgrade}
              variant="outline" 
              className="bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200 hover:text-amber-900"
              size="sm"
            >
              <span>Upgrade for $10 more</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AutoRenewSuggestionCard;
