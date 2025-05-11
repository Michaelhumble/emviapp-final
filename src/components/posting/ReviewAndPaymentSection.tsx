
import React from 'react';
import { Button } from '@/components/ui/button';

interface ReviewAndPaymentSectionProps {
  priceTier: string;
  priceInCents: number;
  onProceedToPayment: () => void;
  isFreePlan?: boolean;
  isLoading?: boolean;
}

const ReviewAndPaymentSection: React.FC<ReviewAndPaymentSectionProps> = ({
  priceTier,
  priceInCents,
  onProceedToPayment,
  isFreePlan = false,
  isLoading = false
}) => {
  const formattedPrice = (priceInCents / 100).toFixed(2);
  
  return (
    <div className="space-y-6 border p-6 rounded-lg bg-white shadow-sm">
      <h3 className="text-lg font-semibold">
        {isFreePlan ? 'Complete Free Job Posting' : 'Review and Payment'}
      </h3>
      
      <div className="py-4 text-sm text-gray-600">
        {isFreePlan ? (
          <p>Your job will be posted for 30 days with basic visibility.</p>
        ) : (
          <div>
            <p>You've selected the <span className="font-medium capitalize">{priceTier}</span> plan.</p>
            <p className="mt-2">Total: ${formattedPrice}</p>
          </div>
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
