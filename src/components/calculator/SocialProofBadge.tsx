import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const SocialProofBadge: React.FC = () => {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full text-sm font-semibold text-green-900 shadow-sm">
      <CheckCircle2 className="w-4 h-4 text-green-600" />
      Based on 500+ actual salon sales
    </div>
  );
};
