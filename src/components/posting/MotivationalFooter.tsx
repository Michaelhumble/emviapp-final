
import React from 'react';

interface MotivationalFooterProps {
  icon: string;
  message: string;
  subMessage?: string;
}

const MotivationalFooter: React.FC<MotivationalFooterProps> = ({ 
  icon, 
  message, 
  subMessage 
}) => {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-white border border-purple-100 rounded-xl p-4 mb-6 shadow-sm">
      <div className="flex items-start">
        <span className="text-2xl mr-3">{icon}</span>
        <div>
          <p className="text-gray-800 font-medium">{message}</p>
          {subMessage && (
            <p className="text-gray-600 text-sm mt-1">{subMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MotivationalFooter;
