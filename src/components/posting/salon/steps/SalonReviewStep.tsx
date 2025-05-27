
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { SalonPricingOptions, getSalonPostPricingSummary } from "@/utils/posting/salonPricing";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MapPin, Building, DollarSign, Image, CreditCard } from "lucide-react";

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
  const pricingSummary = getSalonPostPricingSummary(selectedOptions);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Eye className="w-5 h-5 text-purple-600" />
        <h2 className="text-2xl font-playfair font-medium">Xem Lại & Thanh Toán / Review & Payment</h2>
      </div>
      <p className="text-gray-600 mb-6">
        Vui lòng xem lại tất cả thông tin trước khi thanh toán / Please review all information before payment
      </p>

      {/* Identity Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Thông Tin Salon / Salon Identity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-medium">Tên Salon / Salon Name:</span>
              <p>{formData.salonName || "Chưa nhập / Not provided"}</p>
            </div>
            <div>
              <span className="font-medium">Loại Hình / Business Type:</span>
              <p>{formData.businessType || "Chưa nhập / Not provided"}</p>
            </div>
            {formData.establishedYear && (
              <div>
                <span className="font-medium">Năm Thành Lập / Established:</span>
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
            <MapPin className="w-5 h-5" />
            Địa Chỉ / Location
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-medium">Địa chỉ / Address:</span>
              <p>{formData.address || "Chưa nhập / Not provided"}</p>
            </div>
            <div>
              <span className="font-medium">Thành phố / City:</span>
              <p>{formData.city || "Chưa nhập / Not provided"}</p>
            </div>
            <div>
              <span className="font-medium">Bang / State:</span>
              <p>{formData.state || "Chưa nhập / Not provided"}</p>
            </div>
            {formData.zipCode && (
              <div>
                <span className="font-medium">Mã bưu điện / ZIP:</span>
                <p>{formData.zipCode}</p>
              </div>
            )}
            {formData.neighborhood && (
              <div>
                <span className="font-medium">Khu vực / Neighborhood:</span>
                <p>{formData.neighborhood}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Details Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Chi Tiết / Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div>
              <span className="font-medium">Tiền thuê / Monthly Rent:</span>
              <p>{formData.monthlyRent || "Chưa nhập / Not provided"}</p>
            </div>
            {formData.monthlyRevenue && (
              <div>
                <span className="font-medium">Doanh thu / Monthly Revenue:</span>
                <p>{formData.monthlyRevenue}</p>
              </div>
            )}
            {formData.squareFeet && (
              <div>
                <span className="font-medium">Diện tích / Square Feet:</span>
                <p>{formData.squareFeet}</p>
              </div>
            )}
            {formData.numberOfStaff && (
              <div>
                <span className="font-medium">Số nhân viên / Staff:</span>
                <p>{formData.numberOfStaff}</p>
              </div>
            )}
          </div>

          {/* Amenities */}
          <div className="mt-4">
            <span className="font-medium">Tiện ích / Amenities:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.hasParking && <Badge variant="secondary">Bãi đậu xe / Parking</Badge>}
              {formData.hasLaundry && <Badge variant="secondary">Giặt ủi / Laundry</Badge>}
              {formData.hasWaxRoom && <Badge variant="secondary">Phòng wax / Wax Room</Badge>}
              {formData.hasDiningRoom && <Badge variant="secondary">Phòng ăn / Dining Room</Badge>}
              {formData.willTrain && <Badge variant="secondary">Sẽ đào tạo / Will Train</Badge>}
            </div>
          </div>

          {/* Photos */}
          {photoUploads.length > 0 && (
            <div className="mt-4">
              <span className="font-medium flex items-center gap-2">
                <Image className="w-4 h-4" />
                Hình ảnh / Photos: {photoUploads.length} ảnh
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pricing Summary */}
      <Card className="bg-purple-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Tóm Tắt Thanh Toán / Payment Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span>Gói đã chọn / Selected Plan:</span>
            <span className="font-medium capitalize">{selectedOptions.selectedPricingTier}</span>
          </div>
          <div className="flex justify-between">
            <span>Thời hạn / Duration:</span>
            <span className="font-medium">{selectedOptions.durationMonths} tháng / months</span>
          </div>
          <div className="flex justify-between">
            <span>Tự động gia hạn / Auto-renew:</span>
            <span className="font-medium">{selectedOptions.autoRenew ? "Có / Yes" : "Không / No"}</span>
          </div>
          
          <hr className="my-3" />
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Tổng phụ / Subtotal:</span>
              <span>${pricingSummary.subtotal.toFixed(2)}</span>
            </div>
            {pricingSummary.durationDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Giảm giá thời hạn / Duration discount:</span>
                <span>-${pricingSummary.durationDiscount.toFixed(2)}</span>
              </div>
            )}
            {pricingSummary.autoRenewDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Giảm giá tự động gia hạn / Auto-renew discount:</span>
                <span>-${pricingSummary.autoRenewDiscount.toFixed(2)}</span>
              </div>
            )}
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <span>Tổng cộng / Total:</span>
              <span className="text-purple-600">${pricingSummary.finalPrice.toFixed(2)}</span>
            </div>
            {pricingSummary.discountPercentage > 0 && (
              <div className="text-center text-green-600 font-medium">
                Bạn tiết kiệm được {pricingSummary.discountPercentage}% / You save {pricingSummary.discountPercentage}%
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Terms Acceptance */}
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
              <label className="text-sm">
                Tôi đồng ý với các điều khoản và điều kiện / I agree to the terms and conditions *
              </label>
            </div>
          </FormItem>
        )}
      />

      {/* Payment Button */}
      <div className="pt-4">
        <Button 
          onClick={onPayment}
          disabled={!form.watch('termsAccepted')}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
        >
          Thanh Toán ${pricingSummary.finalPrice.toFixed(2)} / Pay ${pricingSummary.finalPrice.toFixed(2)}
        </Button>
      </div>
    </div>
  );
};
