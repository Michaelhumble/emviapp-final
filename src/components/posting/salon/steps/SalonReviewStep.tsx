
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SalonFormValues } from '../salonFormSchema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, DollarSign, Star, Camera, CheckCircle } from 'lucide-react';

interface SalonReviewStepProps {
  form: UseFormReturn<SalonFormValues>;
  selectedDuration: number;
  featuredAddOn: boolean;
  photoUploads: File[];
}

const DURATION_OPTIONS = [
  { months: 1, discountPrice: 19.99, originalPrice: 24.99 },
  { months: 3, discountPrice: 54.99, originalPrice: 74.99 },
  { months: 6, discountPrice: 99.99, originalPrice: 149.99 },
  { months: 12, discountPrice: 145.99, originalPrice: 300.00 }
];

const SalonReviewStep = ({ form, selectedDuration, featuredAddOn, photoUploads }: SalonReviewStepProps) => {
  const formData = form.getValues();
  const selectedOption = DURATION_OPTIONS.find(option => option.months === selectedDuration);
  const basePrice = selectedOption?.discountPrice || 19.99;
  const featuredFee = featuredAddOn ? 10 : 0; // One-time $10 fee
  const totalPrice = basePrice + featuredFee;

  return (
    <div className="space-y-6 bg-gradient-to-br from-pink-50 to-rose-50 min-h-screen p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <CheckCircle className="w-6 h-6 text-blue-600" />
          </div>
          <span className="ml-3 text-xl font-medium">📋 Review Your Listing / Xem lại tin đăng</span>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Please review all details before submitting your salon listing for payment.
          <br />
          <span className="text-blue-600 font-medium">
            Vui lòng xem lại tất cả chi tiết trước khi gửi tin đăng salon để thanh toán.
          </span>
        </p>
      </div>

      {/* Salon Overview */}
      <Card className="bg-white/80 backdrop-blur border-pink-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="w-5 h-5 text-yellow-500 mr-2" />
            Salon Overview / Tổng quan salon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">{formData.salonName || 'Salon Name'}</h3>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{formData.address}, {formData.city}, {formData.state}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <DollarSign className="w-4 h-4 mr-1" />
                <span>Asking: {formData.askingPrice}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                <strong>Business Type:</strong> {formData.businessType}<br />
                <strong>Monthly Rent:</strong> {formData.monthlyRent}<br />
                <strong>Square Feet:</strong> {formData.squareFeet || 'Not specified'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Photos */}
      <Card className="bg-white/80 backdrop-blur border-pink-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Camera className="w-5 h-5 text-purple-500 mr-2" />
            Photos ({photoUploads.length}) / Hình ảnh ({photoUploads.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {photoUploads.length > 0 ? (
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
              {photoUploads.slice(0, 8).map((photo, index) => (
                <div key={index} className="relative">
                  <img 
                    src={URL.createObjectURL(photo)} 
                    alt={`Photo ${index + 1}`}
                    className="w-full h-20 object-cover rounded border"
                  />
                  {index === 0 && (
                    <Badge className="absolute top-1 left-1 text-xs bg-purple-500">Main</Badge>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No photos uploaded</p>
          )}
        </CardContent>
      </Card>

      {/* Features */}
      <Card className="bg-white/80 backdrop-blur border-pink-200">
        <CardHeader>
          <CardTitle>Features & Amenities / Tính năng & Tiện ích</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {formData.willTrain && (
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-sm">Will Train</span>
              </div>
            )}
            {formData.hasWaxRoom && (
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-sm">Wax Room</span>
              </div>
            )}
            {formData.hasParking && (
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-sm">Parking</span>
              </div>
            )}
          </div>
          {formData.reasonForSelling && (
            <div className="mt-4 p-3 bg-gray-50 rounded">
              <p className="text-sm"><strong>Reason for Selling:</strong> {formData.reasonForSelling}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pricing Summary */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">Final Pricing Summary / Tóm tắt giá cuối cùng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Listing Duration / Thời hạn đăng tin</span>
              <span className="font-medium">{selectedDuration} months</span>
            </div>
            <div className="flex justify-between">
              <span>Base Price / Giá cơ bản</span>
              <span>${basePrice.toFixed(2)}</span>
            </div>
            {featuredAddOn && (
              <div className="flex justify-between text-yellow-600">
                <span>Featured Placement (one-time) / Nổi bật (một lần)</span>
                <span>+$10.00</span>
              </div>
            )}
            <div className="border-t pt-3 flex justify-between font-bold text-lg">
              <span>Total Amount / Tổng tiền</span>
              <span className="text-green-600">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Payment:</strong> Stripe payment required before publishing listing.
              <br />
              <strong>Thanh toán:</strong> Cần thanh toán Stripe trước khi xuất bản tin đăng.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Final Note */}
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <p className="text-sm text-yellow-800">
          <strong>EN:</strong> All listings expire after chosen duration unless renewed. First-time discounts apply only once per account.
          <br />
          <strong>VI:</strong> Tất cả tin đăng hết hạn sau thời gian đã chọn trừ khi gia hạn. Giá ưu đãi lần đầu chỉ áp dụng 1 lần cho mỗi tài khoản.
        </p>
      </div>
    </div>
  );
};

export default SalonReviewStep;
