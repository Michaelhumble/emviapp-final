
import React from 'react';
import { Repeat } from 'lucide-react';

const AutoRenewSuggestionCard: React.FC = () => {
  return (
    <div className="flex items-start p-4 bg-purple-50 border-l-4 border-purple-500 rounded-lg shadow-sm mb-4">
      <div className="text-purple-600 mr-3 flex-shrink-0">
        <Repeat className="h-5 w-5" />
      </div>
      <div className="text-sm text-gray-800">
        <strong className="text-base font-semibold">Enable Auto-Renew & Save 5%</strong><br />
        Set it and forget it — we'll keep your listing live every month. Cancel anytime.  
        <span className="text-xs block text-gray-500 mt-1 italic">Coming soon</span>
      </div>
    </div>
  );
};

export default AutoRenewSuggestionCard;
