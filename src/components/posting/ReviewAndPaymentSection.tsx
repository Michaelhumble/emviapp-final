
import React from 'react';
import { Button } from '@/components/ui/button';

interface ReviewAndPaymentSectionProps {
  pricingTier: string;
  onProceedToPayment: () => void;
  isFreePlan?: boolean;
  isLoading?: boolean;
}

const ReviewAndPaymentSection: React.FC<ReviewAndPaymentSectionProps> = ({
  pricingTier,
  onProceedToPayment,
  isFreePlan = false,
  isLoading = false
}) => {
  return (
    <div className="space-y-6 border p-6 rounded-lg bg-white shadow-sm">
      <h3 className="text-lg font-semibold">
        {isFreePlan ? 'Complete Free Job Posting' : 'Review and Payment'}
      </h3>
      
      <div className="py-4 text-sm text-gray-600">
        {isFreePlan ? (
          <p>Your job will be posted for 30 days with basic visibility.</p>
        ) : (
          <p>You've selected the <span className="font-medium capitalize">{pricingTier}</span> plan.</p>
        )}
      </div>
      
      <Button
        onClick={onProceedToPayment}
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? 'Processing...' : isFreePlan ? 'Post Job' : 'Proceed to Payment'}
      </Button>
    </div>
  );
};

export default ReviewAndPaymentSection;
