
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { SalonPricingOptions } from "@/utils/posting/salonPricing";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, MapPin, Building2, DollarSign, Camera } from "lucide-react";
import SalonPaymentFeatures from "../SalonPaymentFeatures";

interface SalonReviewStepProps {
  form: UseFormReturn<SalonFormValues>;
  formData: SalonFormValues;
  selectedOptions: SalonPricingOptions;
  photoUploads: File[];
  onPayment: () => void;
}

export const SalonReviewStep = ({ form, formData, selectedOptions, photoUploads, onPayment }: SalonReviewStepProps) => {
  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-medium">Xem Lại & Thanh Toán / Review & Payment</h2>
        <p className="text-gray-600 mt-2">
          Xem lại thông tin và hoàn tất thanh toán / Review your information and complete payment
        </p>
      </div>

      {/* Complete Form Summary */}
      <div className="space-y-6">
        {/* Identity Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Thông Tin Salon / Salon Identity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Tên Salon / Salon Name</p>
                <p className="font-medium">{formData.salonName || "Not specified"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Loại Hình / Business Type</p>
                <p className="font-medium">{formData.businessType || "Not specified"}</p>
              </div>
              {formData.establishedYear && (
                <div>
                  <p className="text-sm text-gray-500">Năm Thành Lập / Established</p>
                  <p className="font-medium">{formData.establishedYear}</p>
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
                <p className="text-sm text-gray-500">Địa Chỉ / Address</p>
                <p className="font-medium">{formData.address || "Not specified"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Thành Phố, Bang / City, State</p>
                <p className="font-medium">{formData.city}, {formData.state}</p>
              </div>
              {formData.zipCode && (
                <div>
                  <p className="text-sm text-gray-500">Mã Bưu Điện / ZIP Code</p>
                  <p className="font-medium">{formData.zipCode}</p>
                </div>
              )}
              {formData.neighborhood && (
                <div>
                  <p className="text-sm text-gray-500">Khu Vực / Neighborhood</p>
                  <p className="font-medium">{formData.neighborhood}</p>
                </div>
              )}
            </div>
            {formData.hideExactAddress && (
              <Badge variant="outline" className="mt-2">
                Ẩn địa chỉ chính xác / Hide exact address
              </Badge>
            )}
          </CardContent>
        </Card>

        {/* Details Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Chi Tiết Salon / Salon Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Giá Yêu Cầu / Asking Price</p>
                <p className="font-medium text-lg">{formData.askingPrice || "Not specified"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tiền Thuê Hàng Tháng / Monthly Rent</p>
                <p className="font-medium">{formData.monthlyRent || "Not specified"}</p>
              </div>
              {formData.monthlyRevenue && (
                <div>
                  <p className="text-sm text-gray-500">Doanh Thu Hàng Tháng / Monthly Revenue</p>
                  <p className="font-medium">{formData.monthlyRevenue}</p>
                </div>
              )}
              {formData.numberOfTables && (
                <div>
                  <p className="text-sm text-gray-500">Số Bàn / Tables</p>
                  <p className="font-medium">{formData.numberOfTables}</p>
                </div>
              )}
              {formData.numberOfChairs && (
                <div>
                  <p className="text-sm text-gray-500">Số Ghế / Chairs</p>
                  <p className="font-medium">{formData.numberOfChairs}</p>
                </div>
              )}
              {formData.squareFeet && (
                <div>
                  <p className="text-sm text-gray-500">Diện Tích / Square Feet</p>
                  <p className="font-medium">{formData.squareFeet}</p>
                </div>
              )}
            </div>

            {/* Amenities */}
            {(formData.hasParking || formData.hasLaundry || formData.hasWaxRoom || formData.hasDiningRoom) && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Tiện Nghi / Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {formData.hasParking && <Badge variant="secondary">Bãi đậu xe / Parking</Badge>}
                  {formData.hasLaundry && <Badge variant="secondary">Giặt ủi / Laundry</Badge>}
                  {formData.hasWaxRoom && <Badge variant="secondary">Phòng wax / Wax Room</Badge>}
                  {formData.hasDiningRoom && <Badge variant="secondary">Phòng ăn / Dining Room</Badge>}
                </div>
              </div>
            )}

            {/* Photos */}
            {photoUploads.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  Hình Ảnh / Photos ({photoUploads.length})
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {photoUploads.slice(0, 4).map((file, index) => (
                    <div key={index} className="aspect-square bg-gray-100 rounded border flex items-center justify-center text-xs">
                      {file.name.substring(0, 10)}...
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pricing Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Gói Đăng Tin / Selected Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Gói / Plan:</span>
                <span className="font-medium capitalize">{selectedOptions.selectedPricingTier}</span>
              </div>
              {selectedOptions.autoRenew && (
                <div className="flex justify-between">
                  <span>Tự động gia hạn / Auto-renew:</span>
                  <Badge variant="outline">Có / Yes (10% discount)</Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Terms Acceptance */}
      <div className="bg-gray-50 p-6 rounded-lg">
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
                <FormLabel>
                  Tôi đồng ý với các điều khoản và điều kiện / I agree to the terms and conditions *
                </FormLabel>
                <p className="text-sm text-gray-600">
                  Bằng cách đánh dấu vào ô này, bạn xác nhận rằng tất cả thông tin được cung cấp là chính xác và bạn đồng ý với các điều khoản dịch vụ của EmviApp.
                  / By checking this box, you confirm that all information provided is accurate and you agree to EmviApp's terms of service.
                </p>
              </div>
            </FormItem>
          )}
        />
        <FormMessage />
      </div>

      {/* Payment Component */}
      <SalonPaymentFeatures
        formData={formData}
        selectedOptions={selectedOptions}
        onPayment={onPayment}
        onBack={() => {}} // Will be handled by parent wizard
      />
    </div>
  );
};
