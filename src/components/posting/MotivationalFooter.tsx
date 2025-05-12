
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface MotivationalFooterProps {
  icon?: string;
  message: string;
  subMessage?: string;
}

const MotivationalFooter: React.FC<MotivationalFooterProps> = ({ 
  icon, 
  message, 
  subMessage 
}) => {
  const { t } = useTranslation();
  
  return (
    <div className="text-center px-4 py-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
      {icon && <div className="text-3xl mb-3">{icon}</div>}
      <p className="text-xl font-medium text-gray-800 mb-2">
        {t(message)}
      </p>
      {subMessage && (
        <p className="text-gray-600">
          {t(subMessage)}
        </p>
      )}
    </div>
  );
};

export default MotivationalFooter;
