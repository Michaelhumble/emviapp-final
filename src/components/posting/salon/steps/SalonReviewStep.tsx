
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FormField, FormItem, FormControl } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle, MapPin, DollarSign, Users, Image } from 'lucide-react';
import { SalonFormValues } from '../salonFormSchema';
import { SalonPricingOptions, getSalonPostPricingSummary } from '@/utils/posting/salonPricing';

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
  const pricingSummary = getSalonPostPricingSummary(selectedOptions);

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-medium">Xem Lại & Thanh Toán / Review & Payment</h2>
        <p className="text-gray-600 mt-2">
          Kiểm tra lại thông tin trước khi thanh toán / Review your information before payment
        </p>
      </div>

      {/* Salon Identity Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Thông Tin Salon / Salon Identity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Tên salon / Salon name:</span>
              <p>{formData.salonName}</p>
            </div>
            <div>
              <span className="font-medium">Loại hình kinh doanh / Business type:</span>
              <p>{formData.businessType}</p>
            </div>
            {formData.establishedYear && (
              <div>
                <span className="font-medium">Năm thành lập / Established:</span>
                <p>{formData.establishedYear}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Location Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-500" />
            Địa Chỉ / Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Địa chỉ / Address:</span> {formData.address}</p>
            <p><span className="font-medium">Thành phố / City:</span> {formData.city}, {formData.state}</p>
            {formData.zipCode && <p><span className="font-medium">Mã zip / Zip:</span> {formData.zipCode}</p>}
            {formData.neighborhood && <p><span className="font-medium">Khu vực / Neighborhood:</span> {formData.neighborhood}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Business Details Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-500" />
            Chi Tiết Kinh Doanh / Business Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Giá bán / Asking price:</span>
              <p>${formData.askingPrice}</p>
            </div>
            <div>
              <span className="font-medium">Tiền thuê hàng tháng / Monthly rent:</span>
              <p>${formData.monthlyRent}</p>
            </div>
            {formData.monthlyRevenue && (
              <div>
                <span className="font-medium">Doanh thu hàng tháng / Monthly revenue:</span>
                <p>${formData.monthlyRevenue}</p>
              </div>
            )}
            {formData.numberOfTables && (
              <div>
                <span className="font-medium">Số bàn / Tables:</span>
                <p>{formData.numberOfTables}</p>
              </div>
            )}
            {formData.numberOfChairs && (
              <div>
                <span className="font-medium">Số ghế / Chairs:</span>
                <p>{formData.numberOfChairs}</p>
              </div>
            )}
            {formData.numberOfStaff && (
              <div>
                <span className="font-medium">Số nhân viên / Staff:</span>
                <p>{formData.numberOfStaff}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Photos Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5 text-purple-500" />
            Hình Ảnh / Photos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            <span className="font-medium">Số lượng ảnh / Number of photos:</span> {photoUploads.length}
          </p>
          {photoUploads.length > 0 && (
            <div className="mt-2 grid grid-cols-4 gap-2">
              {photoUploads.slice(0, 4).map((file, index) => (
                <div key={index} className="aspect-square bg-gray-100 rounded border flex items-center justify-center">
                  <Image className="h-6 w-6 text-gray-400" />
                </div>
              ))}
              {photoUploads.length > 4 && (
                <div className="aspect-square bg-gray-100 rounded border flex items-center justify-center text-xs text-gray-500">
                  +{photoUploads.length - 4} more
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pricing Summary */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="text-purple-700">
            Tóm Tắt Thanh Toán / Payment Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Gói đã chọn / Selected plan:</span>
              <Badge variant="outline">{selectedOptions.selectedPricingTier}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Thời hạn / Duration:</span>
              <span>{selectedOptions.durationMonths} tháng / {selectedOptions.durationMonths} months</span>
            </div>
            {selectedOptions.autoRenew && (
              <div className="flex justify-between items-center text-green-600">
                <span>Tự động gia hạn / Auto-renew:</span>
                <span>✓ Enabled (-5%)</span>
              </div>
            )}
            <div className="border-t pt-3 flex justify-between items-center font-semibold text-lg">
              <span>Tổng cộng / Total:</span>
              <span className="text-purple-600">${pricingSummary.finalPrice.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <Card>
        <CardContent className="pt-6">
          <FormField
            control={form.control}
            name="termsAccepted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Tôi đồng ý với các điều khoản và điều kiện / I agree to the terms and conditions
                  </label>
                  <p className="text-xs text-gray-600">
                    Bằng cách tiếp tục, bạn đồng ý với chính sách của chúng tôi / By proceeding, you agree to our policies
                  </p>
                </div>
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Payment Button */}
      <div className="flex justify-center pt-6">
        <Button 
          onClick={onPayment}
          disabled={!form.watch('termsAccepted')}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg font-semibold"
          size="lg"
        >
          Thanh Toán ${pricingSummary.finalPrice.toFixed(2)} / Pay ${pricingSummary.finalPrice.toFixed(2)}
        </Button>
      </div>
    </div>
  );
};
