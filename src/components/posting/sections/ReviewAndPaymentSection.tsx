
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { formatCurrency } from '@/lib/utils';
import PaymentSummary, { PriceData } from '@/components/posting/PaymentSummary';

interface ReviewAndPaymentSectionProps {
  priceData: PriceData;
  durationMonths: number;
  autoRenew: boolean;
  onAutoRenewChange: (checked: boolean) => void;
  onProceedToPayment: () => void;
  isProcessing: boolean;
}

const ReviewAndPaymentSection: React.FC<ReviewAndPaymentSectionProps> = ({
  priceData,
  durationMonths,
  autoRenew,
  onAutoRenewChange,
  onProceedToPayment,
  isProcessing
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Review & Payment</h2>
        <p className="text-gray-600">Review your selection and proceed to payment</p>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-medium mb-4">Payment Summary</h3>
          
          <PaymentSummary 
            priceData={priceData}
            durationMonths={durationMonths}
            autoRenew={autoRenew}
          />
          
          {priceData.finalPrice > 0 && (
            <div className="mt-4 pt-2 border-t flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="auto-renew" className="cursor-pointer">Auto-renew subscription</Label>
                <p className="text-xs text-muted-foreground">Get an additional 5% discount</p>
              </div>
              <Switch 
                id="auto-renew"
                checked={autoRenew}
                onCheckedChange={onAutoRenewChange}
              />
            </div>
          )}
          
          <Button
            className="w-full mt-6"
            onClick={onProceedToPayment}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>Processing...</>
            ) : priceData.finalPrice > 0 ? (
              <>Proceed to Payment • {formatCurrency(priceData.finalPrice)}</>
            ) : (
              <>Post for Free</>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewAndPaymentSection;
