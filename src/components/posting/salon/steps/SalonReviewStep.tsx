
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { SalonPricingOptions, getSalonPostPricingSummary, DURATION_OPTIONS } from "@/utils/posting/salonPricing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle, MapPin, Building, CreditCard, AlertCircle } from "lucide-react";
import { useStripe } from "@/hooks/useStripe";
import { toast } from "sonner";

interface SalonReviewStepProps {
  form: UseFormReturn<SalonFormValues>;
  formData: SalonFormValues;
  selectedOptions: SalonPricingOptions;
  photoUploads: File[];
  onPayment: () => void;
}

export const SalonReviewStep = ({ 
  form, 
  formData, 
  selectedOptions, 
  photoUploads, 
  onPayment 
}: SalonReviewStepProps) => {
  const { isLoading, initiatePayment } = useStripe();
  const pricingSummary = getSalonPostPricingSummary(selectedOptions);
  const selectedDuration = DURATION_OPTIONS.find(d => d.months === selectedOptions.durationMonths);

  const handlePaymentSubmit = async () => {
    if (!form.getValues('termsAccepted')) {
      toast.error("Vui lòng chấp nhận điều khoản / Please accept the terms and conditions");
      return;
    }

    try {
      const success = await initiatePayment(selectedOptions);
      if (success) {
        onPayment();
        toast.success("Thanh toán thành công / Payment successful");
      } else {
        toast.error("Thanh toán thất bại / Payment failed. Please try again.");
      }
    } catch (error) {
      toast.error("Lỗi thanh toán / Payment error. Please try another method.");
    }
  };

  const getPlanName = () => {
    switch (selectedOptions.selectedPricingTier) {
      case 'basic': return 'Tin đăng cơ bản / Basic Listing';
      case 'standard': return 'Tin đăng tiêu chuẩn / Standard Listing';
      case 'featured': return 'Tin đăng nổi bật / Featured Listing';
      default: return 'Unknown Plan';
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-medium flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-green-600" />
          Xem Lại & Thanh Toán / Review & Payment
        </h2>
        <p className="text-gray-600 mt-2">
          Vui lòng kiểm tra lại thông tin trước khi thanh toán / Please review your information before payment
        </p>
      </div>

      {/* Salon Information Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Thông Tin Salon / Salon Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-lg">{formData.salonName}</h3>
              <p className="text-gray-600">{formData.businessType}</p>
              {formData.establishedYear && (
                <p className="text-sm text-gray-500">Thành lập / Established: {formData.establishedYear}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <div>
                <p className="font-medium">{formData.address}</p>
                <p className="text-gray-600">{formData.city}, {formData.state} {formData.zipCode}</p>
                {formData.neighborhood && (
                  <p className="text-sm text-gray-500">{formData.neighborhood}</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Details Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Chi Tiết Kinh Doanh / Business Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">Giá bán / Asking Price</p>
              <p className="font-semibold">${formData.askingPrice}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tiền thuê / Monthly Rent</p>
              <p className="font-semibold">${formData.monthlyRent}</p>
            </div>
            {formData.numberOfTables && (
              <div>
                <p className="text-sm text-gray-500">Số bàn / Tables</p>
                <p className="font-semibold">{formData.numberOfTables}</p>
              </div>
            )}
            {formData.numberOfChairs && (
              <div>
                <p className="text-sm text-gray-500">Số ghế / Chairs</p>
                <p className="font-semibold">{formData.numberOfChairs}</p>
              </div>
            )}
          </div>

          {/* Amenities */}
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">Tiện ích / Amenities</p>
            <div className="flex flex-wrap gap-2">
              {formData.hasParking && <Badge variant="secondary">Bãi đậu xe / Parking</Badge>}
              {formData.hasLaundry && <Badge variant="secondary">Giặt ủi / Laundry</Badge>}
              {formData.hasWaxRoom && <Badge variant="secondary">Phòng wax / Wax Room</Badge>}
              {formData.hasDiningRoom && <Badge variant="secondary">Phòng ăn / Dining Room</Badge>}
            </div>
          </div>

          {/* Photos */}
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">Hình ảnh / Photos</p>
            <p className="text-gray-600">{photoUploads.length} ảnh đã tải lên / {photoUploads.length} photos uploaded</p>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Summary */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-700">
            <CreditCard className="w-5 h-5" />
            Chi Tiết Thanh Toán / Payment Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Gói / Plan:</span>
              <span className="font-medium">{getPlanName()}</span>
            </div>
            
            <div className="flex justify-between">
              <span>Thời hạn / Duration:</span>
              <span className="font-medium">{selectedDuration?.label}</span>
            </div>

            <div className="flex justify-between">
              <span>Giá cơ bản / Base Price:</span>
              <span>${pricingSummary.subtotal.toFixed(2)}</span>
            </div>

            {pricingSummary.durationDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Giảm giá theo thời hạn / Duration Discount:</span>
                <span>-${pricingSummary.durationDiscount.toFixed(2)}</span>
              </div>
            )}

            {selectedOptions.autoRenew && pricingSummary.autoRenewDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Giảm giá tự động gia hạn / Auto-renew Discount:</span>
                <span>-${pricingSummary.autoRenewDiscount.toFixed(2)}</span>
              </div>
            )}

            <div className="border-t pt-3">
              <div className="flex justify-between font-bold text-lg">
                <span>Tổng cộng / Total:</span>
                <span className="text-purple-600">${pricingSummary.finalPrice.toFixed(2)}</span>
              </div>
              {pricingSummary.discountPercentage > 0 && (
                <p className="text-sm text-green-600 text-right">
                  Tiết kiệm {pricingSummary.discountPercentage}% / Save {pricingSummary.discountPercentage}%
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms and Payment */}
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3 mb-4">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-red-900">Quan trọng / Important</h4>
              <p className="text-sm text-red-700">
                Tin đăng chỉ được tạo sau khi thanh toán thành công. Nếu thanh toán thất bại, bạn có thể thử lại hoặc chọn phương thức khác.
              </p>
              <p className="text-sm text-red-700 mt-1">
                Listing will only be created after successful payment. If payment fails, you can retry or choose another method.
              </p>
            </div>
          </div>

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
                  <label className="text-sm font-medium cursor-pointer">
                    Tôi đồng ý với điều khoản dịch vụ và chính sách bảo mật / I agree to the terms of service and privacy policy
                  </label>
                </div>
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Payment Button */}
      <div className="flex justify-center pt-4">
        <Button
          onClick={handlePaymentSubmit}
          disabled={isLoading || !form.watch('termsAccepted')}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold min-w-[300px]"
        >
          {isLoading ? (
            "Đang xử lý / Processing..."
          ) : (
            `Thanh toán $${pricingSummary.finalPrice.toFixed(2)} / Pay $${pricingSummary.finalPrice.toFixed(2)}`
          )}
        </Button>
      </div>
    </div>
  );
};
