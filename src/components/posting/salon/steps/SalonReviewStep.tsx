
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, DollarSign, MapPin, Building, Users } from 'lucide-react';
import { SalonFormValues } from '../salonFormSchema';
import { SalonPricingOptions, calculateSalonPostPrice } from '@/utils/posting/salonPricing';
import { useStripe } from '@/hooks/useStripe';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

interface SalonReviewStepProps {
  form: UseFormReturn<SalonFormValues>;
  formData: SalonFormValues;
  selectedOptions: SalonPricingOptions;
  photoUploads: File[];
  onPayment: () => void;
}

export const SalonReviewStep: React.FC<SalonReviewStepProps> = ({
  form,
  formData,
  selectedOptions,
  photoUploads,
  onPayment
}) => {
  const { user } = useAuth();
  const { initiatePayment, isLoading } = useStripe();
  const totalPrice = calculateSalonPostPrice(selectedOptions);

  const handlePayment = async () => {
    if (!user) {
      toast.error("Please sign in to post a salon listing");
      return;
    }

    try {
      const success = await initiatePayment(selectedOptions, formData);
      if (success) {
        onPayment();
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error("Payment failed. Please try again.");
    }
  };

  const getPlanName = () => {
    const tierNames = {
      basic: 'Basic Plan',
      standard: 'Standard Plan', 
      featured: 'Featured Plan'
    };
    return tierNames[selectedOptions.selectedPricingTier] || 'Basic Plan';
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-medium">Review & Payment / Xem Lại & Thanh Toán</h2>
        <p className="text-gray-600 mt-2">
          Review your salon listing details before payment / Xem lại thông tin salon trước khi thanh toán
        </p>
      </div>

      {/* Salon Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-purple-500" />
            Salon Information / Thông Tin Salon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-lg">{formData.salonName}</h3>
              <div className="flex items-center gap-1 text-gray-600 mt-1">
                <MapPin className="h-4 w-4" />
                <span>{formData.city}, {formData.state}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-500" />
                <span className="text-sm">Asking Price: ${formData.askingPrice}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Monthly Rent: ${formData.monthlyRent}</span>
              </div>
            </div>
          </div>
          
          {formData.vietnameseDescription && (
            <div className="mt-4">
              <h4 className="font-medium text-sm text-gray-700 mb-1">Vietnamese Description:</h4>
              <p className="text-sm text-gray-600">{formData.vietnameseDescription}</p>
            </div>
          )}
          
          {formData.englishDescription && (
            <div className="mt-4">
              <h4 className="font-medium text-sm text-gray-700 mb-1">English Description:</h4>
              <p className="text-sm text-gray-600">{formData.englishDescription}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pricing Summary */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-700">
            <CheckCircle className="h-5 w-5" />
            Selected Plan / Gói Đã Chọn
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{getPlanName()}</h3>
                <p className="text-sm text-gray-600">
                  Duration: {selectedOptions.durationMonths} month{selectedOptions.durationMonths > 1 ? 's' : ''}
                </p>
              </div>
              <Badge variant="outline" className="text-purple-600 text-lg font-semibold">
                ${totalPrice.toFixed(2)}
              </Badge>
            </div>

            {selectedOptions.autoRenew && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span>Auto-renewal enabled (5% discount applied)</span>
              </div>
            )}

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total Amount:</span>
                <span className="text-purple-600">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Photos Summary */}
      {photoUploads.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Photos Uploaded / Hình Ảnh Đã Tải</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              {photoUploads.length} photo{photoUploads.length > 1 ? 's' : ''} ready to upload
            </p>
          </CardContent>
        </Card>
      )}

      {/* Terms and Payment */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="terms"
            checked={formData.termsAccepted}
            onChange={(e) => form.setValue('termsAccepted', e.target.checked)}
            className="rounded border-gray-300"
          />
          <label htmlFor="terms" className="text-sm text-gray-700">
            I agree to the terms and conditions / Tôi đồng ý với các điều khoản và điều kiện
          </label>
        </div>

        <Button
          onClick={handlePayment}
          disabled={!formData.termsAccepted || isLoading || !user}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold"
        >
          {isLoading 
            ? "Processing Payment... / Đang xử lý thanh toán..." 
            : `Pay ${totalPrice.toFixed(2)} & Publish Listing / Thanh toán ${totalPrice.toFixed(2)} & Đăng tin`
          }
        </Button>

        {!user && (
          <p className="text-sm text-red-600 text-center">
            Please sign in to complete your salon listing / Vui lòng đăng nhập để hoàn thành đăng tin
          </p>
        )}
      </div>
    </div>
  );
};
