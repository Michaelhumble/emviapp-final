
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { SalonPricingOptions, getSalonPostPricingSummary } from "@/utils/posting/salonPricing";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Eye, DollarSign, MapPin, Users, CheckCircle } from "lucide-react";
import StripeCheckout from "@/components/payments/StripeCheckout";

interface SalonReviewStepProps {
  form: UseFormReturn<SalonFormValues>;
  formData: SalonFormValues;
  selectedOptions: SalonPricingOptions;
  photoUploads: File[];
}

export const SalonReviewStep = ({ 
  form, 
  formData, 
  selectedOptions, 
  photoUploads 
}: SalonReviewStepProps) => {
  const pricingSummary = getSalonPostPricingSummary(selectedOptions);

  const handlePaymentSuccess = () => {
    window.location.href = "/salon-listing-success";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Eye className="w-5 h-5 text-purple-600" />
        <h2 className="text-2xl font-playfair font-medium">Review & Payment / Xem Lại & Thanh Toán</h2>
      </div>
      <p className="text-gray-600 mb-6">
        Review your listing details and complete payment / Xem lại thông tin và hoàn tất thanh toán
      </p>

      {/* Salon Overview */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
        <h3 className="font-medium flex items-center gap-2">
          <Users className="w-4 h-4" />
          Salon Overview / Tổng Quan Salon
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div><span className="font-medium">Name / Tên:</span> {formData.salonName}</div>
          <div><span className="font-medium">Type / Loại:</span> {formData.businessType}</div>
          {formData.establishedYear && (
            <div><span className="font-medium">Established / Thành lập:</span> {formData.establishedYear}</div>
          )}
        </div>
      </div>

      {/* Location */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
        <h3 className="font-medium flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Location / Địa Chỉ
        </h3>
        <div className="text-sm">
          <div>{formData.address}</div>
          <div>{formData.city}, {formData.state} {formData.zipCode}</div>
          {formData.neighborhood && <div>Area / Khu vực: {formData.neighborhood}</div>}
        </div>
      </div>

      {/* Financial Details */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
        <h3 className="font-medium flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          Financial Information / Thông Tin Tài Chính
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div><span className="font-medium">Asking Price / Giá yêu cầu:</span> {formData.askingPrice}</div>
          <div><span className="font-medium">Monthly Rent / Tiền thuê hàng tháng:</span> {formData.monthlyRent}</div>
          {formData.monthlyRevenue && (
            <div><span className="font-medium">Monthly Revenue / Doanh thu hàng tháng:</span> {formData.monthlyRevenue}</div>
          )}
        </div>
      </div>

      {/* Photos */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
        <h3 className="font-medium">Photos / Hình Ảnh</h3>
        <div className="text-sm text-gray-600">
          {photoUploads.length} photo{photoUploads.length !== 1 ? 's' : ''} uploaded / 
          {photoUploads.length} hình ảnh đã tải lên
        </div>
      </div>

      <Separator />

      {/* Pricing Summary */}
      <div className="bg-blue-50 rounded-lg p-6 space-y-4">
        <h3 className="font-medium text-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-blue-600" />
          Pricing Summary / Tóm Tắt Giá
        </h3>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Plan / Gói:</span>
            <span className="font-medium capitalize">{selectedOptions.selectedPricingTier}</span>
          </div>
          <div className="flex justify-between">
            <span>Duration / Thời hạn:</span>
            <span className="font-medium">{selectedOptions.durationMonths} month{selectedOptions.durationMonths > 1 ? 's' : ''}</span>
          </div>
          <div className="flex justify-between">
            <span>Base Price / Giá gốc:</span>
            <span>${pricingSummary.basePrice.toFixed(2)}/month</span>
          </div>
          <div className="flex justify-between">
            <span>Subtotal / Tạm tính:</span>
            <span>${pricingSummary.subtotal.toFixed(2)}</span>
          </div>
          
          {pricingSummary.discountAmount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount / Giảm giá ({pricingSummary.discountPercentage}%):</span>
              <span>-${pricingSummary.discountAmount.toFixed(2)}</span>
            </div>
          )}
          
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span>Total / Tổng cộng:</span>
            <span className="text-blue-600">${pricingSummary.finalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Terms & Conditions */}
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
              <label className="text-sm font-medium">
                I agree to the terms and conditions / Tôi đồng ý với các điều khoản và điều kiện *
              </label>
              <p className="text-xs text-gray-500">
                By checking this box, you agree to our listing terms and payment policy / 
                Bằng cách đánh dấu vào ô này, bạn đồng ý với các điều khoản đăng tin và chính sách thanh toán của chúng tôi
              </p>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Payment Button */}
      <div className="pt-4">
        <StripeCheckout
          amount={Math.round(pricingSummary.finalPrice * 100)}
          productName={`${selectedOptions.selectedPricingTier.charAt(0).toUpperCase() + selectedOptions.selectedPricingTier.slice(1)} Salon Listing`}
          buttonText="Pay Now & Publish Listing / Thanh Toán & Đăng Tin"
          onSuccess={handlePaymentSuccess}
          pricingOptions={selectedOptions}
          formData={formData}
        />
      </div>
    </div>
  );
};
