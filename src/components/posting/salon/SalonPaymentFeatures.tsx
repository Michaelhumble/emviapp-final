
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, CreditCard, AlertTriangle } from 'lucide-react';
import { SalonFormValues } from './salonFormSchema';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';
import { Alert, AlertDescription } from '@/components/ui/alert';
import StripeCheckout from '@/components/payments/StripeCheckout';

interface SalonPaymentFeaturesProps {
  formData: SalonFormValues;
  selectedOptions: SalonPricingOptions;
  onPayment: () => void;
  onPaymentSuccess?: () => void;
  onBack: () => void;
  paymentCompleted?: boolean;
}

const SalonPaymentFeatures: React.FC<SalonPaymentFeaturesProps> = ({
  formData,
  selectedOptions,
  onPayment,
  onPaymentSuccess,
  onBack,
  paymentCompleted = false
}) => {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const calculatePrice = () => {
    let basePrice = 49;
    if (selectedOptions.selectedPricingTier === 'premium') basePrice = 99;
    if (selectedOptions.selectedPricingTier === 'platinum') basePrice = 199;
    
    if (selectedOptions.fastSalePackage) basePrice += 50;
    if (selectedOptions.featuredBoost) basePrice += 30;
    
    return basePrice * selectedOptions.durationMonths;
  };

  const totalPrice = calculatePrice();

  const handleStripePayment = async () => {
    setIsProcessingPayment(true);
    
    try {
      // Simulate Stripe payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (onPaymentSuccess) {
        onPaymentSuccess();
      }
      
      console.log('Payment completed successfully');
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handlePublishListing = () => {
    if (!paymentCompleted) {
      console.error('Cannot publish listing without payment');
      return;
    }
    onPayment();
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-900">Payment & Review</h2>
        <p className="text-gray-600 mt-1">Complete payment to publish your salon listing</p>
      </div>

      {/* Listing Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>Salon Listing Summary</span>
            {paymentCompleted && <Badge variant="secondary" className="bg-green-100 text-green-800">Payment Completed</Badge>}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{formData.salonName}</h3>
              <p className="text-gray-600">{formData.city}, {formData.state}</p>
              <p className="text-gray-600">{formData.numberOfTables} bàn, {formData.numberOfChairs} ghế</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Asking Price:</span> {formData.askingPrice}
              </div>
              <div>
                <span className="font-medium">Monthly Rent:</span> {formData.monthlyRent}
              </div>
              <div>
                <span className="font-medium">Business Type:</span> {formData.businessType}
              </div>
              <div>
                <span className="font-medium">Staff Count:</span> {formData.numberOfStaff}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Payment Required
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Listing Package ({selectedOptions.selectedPricingTier})</span>
              <span className="font-bold text-lg">${totalPrice}</span>
            </div>
            
            {!paymentCompleted ? (
              <>
                <Alert className="border-red-200 bg-red-50">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    <strong>Payment Required:</strong> Your salon listing will only be published after successful payment via Stripe.
                  </AlertDescription>
                </Alert>
                
                <StripeCheckout
                  amount={totalPrice * 100} // Convert to cents
                  productName={`Salon Listing - ${formData.salonName}`}
                  buttonText={isProcessingPayment ? "Processing Payment..." : "Pay with Stripe"}
                  onSuccess={handleStripePayment}
                />
              </>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-green-800">
                  <Check className="w-5 h-5" />
                  <span className="font-medium">Payment Completed Successfully!</span>
                </div>
                <p className="text-green-700 text-sm mt-1">
                  Your payment has been processed. You can now publish your salon listing.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back to Pricing
        </Button>
        
        <Button 
          onClick={handlePublishListing}
          disabled={!paymentCompleted}
          className={paymentCompleted ? "bg-green-600 hover:bg-green-700" : ""}
        >
          {paymentCompleted ? "Publish Salon Listing" : "Complete Payment First"}
        </Button>
      </div>
    </div>
  );
};

export default SalonPaymentFeatures;
