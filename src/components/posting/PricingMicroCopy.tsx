
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface PricingMicroCopyProps {
  selectedPlan: string;
}

const PricingMicroCopy: React.FC<PricingMicroCopyProps> = ({ selectedPlan }) => {
  const { t } = useTranslation();
  
  if (selectedPlan === 'free' || selectedPlan === 'basic') {
    return (
      <p className="text-xs text-gray-400 mt-1 italic">
        {t(
          'Your post will expire in 30 days. Upgrade anytime to extend visibility and reach more artists.',
          'Tin đăng của bạn sẽ hết hạn trong 30 ngày. Nâng cấp bất kỳ lúc nào để mở rộng khả năng hiển thị và tiếp cận nhiều nghệ sĩ hơn.'
        )}
      </p>
    );
  }
  
  if (selectedPlan === 'standard') {
    return (
      <p className="text-xs text-gray-400 mt-1 italic">
        {t(
          'Boost your post for just $5 to appear on the homepage and get seen faster.',
          'Tăng cường tin đăng của bạn với chỉ $5 để xuất hiện trên trang chủ và được nhìn thấy nhanh hơn.'
        )}
      </p>
    );
  }
  
  return null;
};

export default PricingMicroCopy;
