
import React from 'react';
import { SalonFormValues } from '../salonFormSchema';
import { SalonPricingOptions, getSalonPostPricingSummary } from '@/utils/posting/salonPricing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SalonReviewStepProps {
  formData: SalonFormValues;
  photos: File[];
  pricingOptions: SalonPricingOptions;
  onComplete: () => void;
}

export const SalonReviewStep = ({ 
  formData, 
  photos, 
  pricingOptions, 
  onComplete 
}: SalonReviewStepProps) => {
  const pricingSummary = getSalonPostPricingSummary(pricingOptions);

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-medium">Review & Submit / Xem Lại & Gửi</h2>
        <p className="text-gray-600 mt-2">
          Please review your listing before submitting / Vui lòng xem lại tin đăng trước khi gửi
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Salon Information / Thông Tin Salon</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium">{formData.salonName}</h4>
              <p className="text-sm text-gray-600">{formData.businessType}</p>
            </div>
            <div>
              <p className="text-sm">
                <strong>Address:</strong> {formData.address}, {formData.city}, {formData.state}
              </p>
              <p className="text-sm">
                <strong>Asking Price:</strong> {formData.askingPrice}
              </p>
              <p className="text-sm">
                <strong>Monthly Rent:</strong> {formData.monthlyRent}
              </p>
            </div>
            {formData.englishDescription && (
              <div>
                <h5 className="font-medium text-sm">Description:</h5>
                <p className="text-sm text-gray-600">{formData.englishDescription}</p>
              </div>
            )}
            <div>
              <p className="text-sm"><strong>Photos:</strong> {photos.length} uploaded</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pricing Summary / Tổng Kết Giá</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium">{pricingSummary.planName}</p>
              <p className="text-sm text-gray-600">
                ${pricingSummary.perMonthPrice?.toFixed(2)}/month × {pricingSummary.duration} months
              </p>
            </div>
            
            <div className="space-y-2 border-t pt-4">
              <div className="flex justify-between">
                <span>Base Price:</span>
                <span>${pricingSummary.basePrice.toFixed(2)}</span>
              </div>
              
              {pricingSummary.addOns.featured > 0 && (
                <div className="flex justify-between">
                  <span>Featured Add-On:</span>
                  <span>+${pricingSummary.addOns.featured.toFixed(2)}</span>
                </div>
              )}
              
              {pricingSummary.autoRenewDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Auto-Renew Discount:</span>
                  <span>-${pricingSummary.autoRenewDiscount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between font-bold border-t pt-2">
                <span>Total:</span>
                <span>${pricingSummary.finalPrice.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center pt-6">
        <Button 
          onClick={onComplete}
          size="lg"
          className="px-8"
        >
          Submit Listing / Gửi Tin Đăng
        </Button>
      </div>
    </div>
  );
};
