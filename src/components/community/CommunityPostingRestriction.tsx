
import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const CommunityPostingRestriction = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4 mb-6"
    >
      <div className="flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="font-semibold text-blue-900 mb-2 font-playfair">
            Community Guidelines
          </h4>
          <p className="text-blue-800 text-sm mb-3">
            This space is dedicated to sharing inspiring beauty stories, transformations, 
            and personal journeys. Help us maintain a supportive environment for all members.
          </p>
          <div className="flex items-center gap-2 text-xs text-blue-700">
            <AlertTriangle className="h-3 w-3" />
            <span>For job postings or salon listings, please use the dedicated Jobs or Salons sections.</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityPostingRestriction;
