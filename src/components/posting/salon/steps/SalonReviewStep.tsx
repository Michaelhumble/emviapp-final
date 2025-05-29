
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SalonFormValues } from '../salonFormSchema';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';
import { CheckCircle, MapPin, DollarSign, Camera, Star, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SalonReviewStepProps {
  form: UseFormReturn<SalonFormValues>;
  photoUploads: File[];
  pricingOptions: SalonPricingOptions;
  onSubmit: () => void;
}

export const SalonReviewStep = ({ form, photoUploads, pricingOptions, onSubmit }: SalonReviewStepProps) => {
  const formData = form.getValues();

  const selectedPlan = {
    1: { price: 19.99, original: 24.99 },
    3: { price: 54.99, original: 74.99 },
    6: { price: 99.99, original: 149.99 },
    12: { price: 145.99, original: 300.00 }
  }[pricingOptions.durationMonths || 3] || { price: 54.99, original: 74.99 };

  const featuredCost = pricingOptions.featuredAddOn ? (pricingOptions.durationMonths || 3) * 10 : 0;
  const totalPrice = selectedPlan.price + featuredCost;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-green-100 p-3 rounded-full">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <span className="ml-3 text-xl font-medium">✅ Review & Publish / Xem lại & Đăng tin</span>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Almost there! Review your salon listing details before publishing to potential buyers.
          <br />
          <span className="text-green-600 font-medium">
          Gần xong rồi! Xem lại chi tiết tin đăng salon trước khi đăng cho người mua tiềm năng.
          </span>
        </p>
      </div>

      {/* Review Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Salon Details */}
        <div className="bg-white border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-purple-900">Salon Identity / Danh tính salon</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div><strong>Name:</strong> {formData.salonName || 'Not provided'}</div>
            <div><strong>Type:</strong> {formData.businessType || 'Not provided'}</div>
            <div><strong>Established:</strong> {formData.establishedYear || 'Not provided'}</div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-green-900">Location / Vị trí</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div><strong>Address:</strong> {formData.address || 'Not provided'}</div>
            <div><strong>City:</strong> {formData.city || 'Not provided'}</div>
            <div><strong>State:</strong> {formData.state || 'Not provided'}</div>
            {formData.hideExactAddress && (
              <div className="text-orange-600">🔒 Exact address will be hidden</div>
            )}
          </div>
        </div>

        {/* Financial Details */}
        <div className="bg-white border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5 text-teal-600" />
            <h3 className="font-semibold text-teal-900">Business Details / Chi tiết kinh doanh</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div><strong>Asking Price:</strong> ${formData.askingPrice || 'Not provided'}</div>
            <div><strong>Monthly Rent:</strong> ${formData.monthlyRent || 'Not provided'}</div>
            <div><strong>Monthly Profit:</strong> {formData.monthlyProfit || 'Not provided'}</div>
            <div><strong>Employees:</strong> {formData.employeeCount || 'Not provided'}</div>
          </div>
        </div>

        {/* Photos */}
        <div className="bg-white border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Camera className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Photos / Hình ảnh</h3>
          </div>
          <div className="text-sm">
            <div><strong>Uploaded:</strong> {photoUploads.length} photos</div>
            {photoUploads.length > 0 && (
              <div className="text-green-600">✓ Ready to showcase your salon</div>
            )}
            {photoUploads.length === 0 && (
              <div className="text-orange-600">⚠ Consider adding photos for better results</div>
            )}
          </div>
        </div>
      </div>

      {/* Pricing Summary */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-purple-900">Listing Plan / Gói đăng tin</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Duration / Thời gian: {pricingOptions.durationMonths} month{(pricingOptions.durationMonths || 0) > 1 ? 's' : ''}</span>
            <span>${selectedPlan.price}</span>
          </div>
          
          {pricingOptions.featuredAddOn && (
            <div className="flex justify-between text-orange-600">
              <span>🌟 Featured Placement</span>
              <span>+${featuredCost}</span>
            </div>
          )}
          
          <hr className="border-purple-200" />
          
          <div className="flex justify-between font-bold text-lg text-purple-900">
            <span>Total / Tổng cộng</span>
            <span>${totalPrice}</span>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <h3 className="font-bold text-lg text-green-900 mb-2">
          🚀 Ready to Connect with Buyers? / Sẵn sàng kết nối với người mua?
        </h3>
        <p className="text-green-800 mb-4">
          Your salon listing will be live immediately after payment confirmation.
          <br />
          <span className="text-green-600">
          Tin đăng salon của bạn sẽ được phát hành ngay sau khi xác nhận thanh toán.
          </span>
        </p>
        
        <Button
          onClick={onSubmit}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
        >
          💳 Proceed to Payment / Tiến hành thanh toán
        </Button>
        
        <p className="text-xs text-green-700 mt-2">
          Secure payment powered by Stripe / Thanh toán bảo mật bởi Stripe
        </p>
      </div>
    </div>
  );
};
