
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';

interface UpsellSidebarProps {
  onUpgrade?: () => void;
  selectedPlan?: string;
}

const UpsellSidebar: React.FC<UpsellSidebarProps> = ({ 
  onUpgrade,
  selectedPlan = 'basic'
}) => {
  const { t } = useTranslation();
  const isVietnamese = false; // This should be linked to your language detection

  // Only show for Basic or Standard plans
  const shouldShow = selectedPlan === 'basic' || selectedPlan === 'standard';
  
  if (!shouldShow) {
    return null;
  }
  
  return (
    <div className="rounded-lg bg-yellow-50 p-4 border border-yellow-300 shadow-sm mt-6">
      <h3 className="text-md font-semibold text-yellow-800 mb-2">
        {t('Want to double your reach?', 'Bạn muốn tăng gấp đôi phạm vi tiếp cận?')}
      </h3>
      <p className="text-sm text-yellow-700 mb-4">
        {t(
          'Just $5 more boosts your listing to the homepage and premium spots.',
          'Chỉ thêm $5 để đăng tin của bạn lên trang chủ và vị trí cao cấp.'
        )}
      </p>
      <Button 
        onClick={onUpgrade} 
        className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
      >
        {t('Upgrade for $5', 'Nâng cấp với $5')}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default UpsellSidebar;
