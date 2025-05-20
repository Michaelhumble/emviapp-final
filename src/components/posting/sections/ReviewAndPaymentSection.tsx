
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Separator } from '@/components/ui/separator';
import { Check, CreditCard } from 'lucide-react';
import { formatDistance } from 'date-fns';
import { usePricing } from '@/context/pricing/PricingContext';
import { PaymentSummary, PriceData } from '@/components/posting/PaymentSummary';

interface ReviewAndPaymentSectionProps {
  onSubmit: () => void;
  isLoading?: boolean;
  priceData: PriceData;
}

const ReviewAndPaymentSection: React.FC<ReviewAndPaymentSectionProps> = ({
  onSubmit,
  isLoading,
  priceData
}) => {
  const { pricingOptions } = usePricing();
  
  const expiryDate = new Date();
  expiryDate.setMonth(expiryDate.getMonth() + pricingOptions.durationMonths);
  
  return (
    <Card className="border rounded-xl overflow-hidden">
      <CardContent className="p-6 space-y-5">
        <div>
          <h3 className="text-lg font-medium mb-2">Review Your Job Post</h3>
          <p className="text-sm text-gray-500">
            Please review all details before submitting your job post.
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-3">
              <CreditCard size={20} />
            </div>
            <div>
              <p className="font-medium">
                {pricingOptions.selectedPricingTier.charAt(0).toUpperCase() + pricingOptions.selectedPricingTier.slice(1)} Plan
              </p>
              <p className="text-sm text-gray-500">
                Expires in {formatDistance(expiryDate, new Date(), { addSuffix: true })}
              </p>
            </div>
          </div>
          
          <ul className="mt-3 space-y-2">
            <li className="flex items-center text-sm text-gray-600">
              <Check size={16} className="text-green-500 mr-2" />
              Premium placement in search results
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <Check size={16} className="text-green-500 mr-2" />
              Email alerts to qualified candidates
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <Check size={16} className="text-green-500 mr-2" />
              {pricingOptions.durationMonths} month{pricingOptions.durationMonths > 1 ? 's' : ''} of visibility
            </li>
          </ul>
        </div>
        
        <Separator />
        
        <PaymentSummary priceData={priceData} />
        
        <div className="pt-4">
          <Button 
            onClick={onSubmit} 
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            size="lg"
          >
            {isLoading ? 'Processing...' : 'Submit and Proceed to Payment'}
          </Button>
          <p className="text-xs text-gray-500 text-center mt-2">
            By clicking submit, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewAndPaymentSection;
