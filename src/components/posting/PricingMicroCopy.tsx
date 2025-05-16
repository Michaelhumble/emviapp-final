
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface PricingMicroCopyProps {
  children?: React.ReactNode;
}

const PricingMicroCopy: React.FC<PricingMicroCopyProps> = ({ children }) => {
  const { t } = useTranslation();
  
  return (
    <p className="text-sm text-gray-500 mt-1">
      {children || t({ english: '100% free during our launch period', vietnamese: 'Miễn phí 100% trong thời gian ra mắt' })}
    </p>
  );
};

export default PricingMicroCopy;
