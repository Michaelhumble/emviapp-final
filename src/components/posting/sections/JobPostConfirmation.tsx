
import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { Alert, AlertDescription } from '@/components/ui/alert';
import confetti from 'canvas-confetti';

interface JobPostConfirmationProps {
  jobTitle: string;
  autoRenew: boolean;
  pricingTier: string;
}

const JobPostConfirmation: React.FC<JobPostConfirmationProps> = ({ 
  jobTitle, 
  autoRenew,
  pricingTier 
}) => {
  const { t, isVietnamese } = useTranslation();
  
  // Trigger confetti effect on component mount
  React.useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <div className="text-center space-y-6 py-6 max-w-lg mx-auto">
      <div className="flex justify-center">
        <CheckCircle size={64} className="text-green-500" />
      </div>
      
      <h1 className="text-2xl font-bold">
        {t(
          '🎉 Your job is live for 30 days!',
          '🎉 Tin tuyển dụng của bạn đã hoạt động trong 30 ngày!'
        )}
      </h1>
      
      <p className="text-gray-600">
        {t(
          `"${jobTitle}" has been successfully posted.`,
          `"${jobTitle}" đã được đăng thành công.`
        )}
      </p>
      
      <Alert className="bg-blue-50 border-blue-200">
        <AlertDescription className="flex items-center justify-center gap-2">
          {autoRenew ? (
            <span className="text-green-600">
              {t(
                '🔁 Auto-renew is ON (${pricingTier} plan)',
                '🔁 Tự động gia hạn đang BẬT (gói ${pricingTier})'
              ).replace('${pricingTier}', pricingTier)}
            </span>
          ) : (
            <span>
              {t(
                '🔁 Auto-renew is OFF (you can turn it on in your dashboard for a discount).',
                '🔁 Tự động gia hạn đang TẮT (bạn có thể bật trong bảng điều khiển để được giảm giá).'
              )}
            </span>
          )}
        </AlertDescription>
      </Alert>
      
      <p className="text-gray-600">
        {t(
          'You can manage, renew, or upgrade at any time.',
          'Bạn có thể quản lý, gia hạn hoặc nâng cấp bất kỳ lúc nào.'
        )}
      </p>
      
      <div className="mt-8">
        {t(
          '☀️ Thank you for helping build EmviApp.',
          '☀️ Cảm ơn bạn đã giúp xây dựng EmviApp.'
        )}
      </div>
      
      <div className="flex justify-center gap-4 mt-8">
        <Button asChild>
          <Link to="/dashboard">
            {t('Go to Dashboard', 'Đến Bảng điều khiển')}
          </Link>
        </Button>
        
        <Button variant="outline" asChild>
          <Link to="/jobs">
            {t('View All Jobs', 'Xem tất cả việc làm')}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default JobPostConfirmation;
