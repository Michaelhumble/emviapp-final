
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { ArrowRight } from 'lucide-react';

interface PostConfirmationUpsellProps {
  selectedPlan?: string;
  onUpgrade?: () => void;
}

const PostConfirmationUpsell: React.FC<PostConfirmationUpsellProps> = ({
  selectedPlan = 'basic',
  onUpgrade
}) => {
  const { t } = useTranslation();
  
  // Only show for Basic or Standard plans
  const shouldShow = selectedPlan === 'basic' || selectedPlan === 'standard';
  
  if (!shouldShow) {
    return null;
  }
  
  return (
    <div className="rounded-md border p-4 bg-purple-50 text-purple-800 mt-8">
      <h4 className="font-semibold mb-2">✨ {t('Your job is live!', 'Công việc của bạn đã được đăng!')}</h4>
      <p className="text-sm mb-3">
        {t(
          'Want to get seen by more artists? Consider upgrading to Premium placement.',
          'Muốn được nhiều nghệ sĩ nhìn thấy hơn? Hãy nâng cấp lên gói Premium.'
        )}
      </p>
      <Button 
        onClick={onUpgrade} 
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        {t('Feature This Listing', 'Đặc sắc tin đăng này')}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default PostConfirmationUpsell;
