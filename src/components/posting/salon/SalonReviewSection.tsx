
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { MapPin, DollarSign, Users, Home, Star, Check, X } from 'lucide-react';
import { SalonFormValues } from './salonFormSchema';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';
import { useTranslation } from '@/hooks/useTranslation';

interface SalonReviewSectionProps {
  formData: SalonFormValues;
  pricingOptions: SalonPricingOptions;
  photoUploads: File[];
  onConfirm: (termsAccepted: boolean) => void;
  isSubmitting?: boolean;
}

const SalonReviewSection: React.FC<SalonReviewSectionProps> = ({
  formData,
  pricingOptions,
  photoUploads,
  onConfirm,
  isSubmitting = false
}) => {
  const { t } = useTranslation();
  const [termsAccepted, setTermsAccepted] = useState(false);

  const formatCurrency = (amount: string) => {
    const num = parseFloat(amount);
    return isNaN(num) ? amount : `$${num.toLocaleString()}`;
  };

  const handleConfirm = () => {
    onConfirm(termsAccepted);
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">
          {t({ english: "Review Your Listing", vietnamese: "Xem lại tin đăng" })}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {t({ english: "Please review all details before proceeding to payment", vietnamese: "Vui lòng xem lại tất cả thông tin trước khi thanh toán" })}
        </p>
      </div>

      {/* Vietnamese Salon Details - Tables and Chairs First */}
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Home className="w-5 h-5 text-purple-600" />
            {t({ english: "Vietnamese Salon Details", vietnamese: "Thông tin tiệm nail Việt" })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              <div className="text-sm font-medium text-yellow-800 mb-1">
                Số bàn / Tables
              </div>
              <div className="text-xl font-bold text-yellow-900">
                {formData.numberOfTables} bàn
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <div className="text-sm font-medium text-blue-800 mb-1">
                Số ghế / Chairs
              </div>
              <div className="text-xl font-bold text-blue-900">
                {formData.numberOfChairs} ghế
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-medium">
                {t({ english: "Number of Staff", vietnamese: "Số nhân viên" })}:
              </span>
              <span className="ml-2">{formData.numberOfStaff}</span>
            </div>
            <div>
              <span className="font-medium">
                {t({ english: "Monthly Rent", vietnamese: "Tiền thuê hàng tháng" })}:
              </span>
              <span className="ml-2">{formatCurrency(formData.monthlyRent)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Star className="w-5 h-5 text-blue-600" />
            {t({ english: "Basic Information", vietnamese: "Thông tin cơ bản" })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <span className="font-medium">{t({ english: "Salon Name", vietnamese: "Tên tiệm" })}:</span>
              <span className="ml-2">{formData.salonName}</span>
            </div>
            <div>
              <span className="font-medium">{t({ english: "Business Type", vietnamese: "Loại hình kinh doanh" })}:</span>
              <span className="ml-2">{formData.businessType}</span>
            </div>
            {formData.establishedYear && (
              <div>
                <span className="font-medium">{t({ english: "Established", vietnamese: "Thành lập" })}:</span>
                <span className="ml-2">{formData.establishedYear}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Location */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-600" />
            {t({ english: "Location", vietnamese: "Địa điểm" })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>{formData.address}</div>
            <div>{formData.city}, {formData.state} {formData.zipCode}</div>
            {formData.neighborhood && (
              <div className="text-sm text-gray-600">
                {t({ english: "Neighborhood", vietnamese: "Khu vực" })}: {formData.neighborhood}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Financial Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            {t({ english: "Financial Details", vietnamese: "Thông tin tài chính" })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-medium">{t({ english: "Asking Price", vietnamese: "Giá yêu cầu" })}:</span>
              <span className="ml-2 text-lg font-bold text-green-600">{formatCurrency(formData.askingPrice)}</span>
            </div>
            <div>
              <span className="font-medium">{t({ english: "Monthly Rent", vietnamese: "Tiền thuê" })}:</span>
              <span className="ml-2">{formatCurrency(formData.monthlyRent)}</span>
            </div>
            {formData.revenue && (
              <div>
                <span className="font-medium">{t({ english: "Monthly Revenue", vietnamese: "Doanh thu tháng" })}:</span>
                <span className="ml-2">{formatCurrency(formData.revenue)}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Photos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {t({ english: "Photos", vietnamese: "Hình ảnh" })} ({photoUploads.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {photoUploads.length > 0 ? (
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
              {photoUploads.map((file, index) => (
                <div key={index} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-600">
                  {file.name.substring(0, 20)}...
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-center py-4">
              {t({ english: "No photos uploaded", vietnamese: "Chưa có hình ảnh" })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Special Features */}
      {(formData.hasWaxRoom || formData.hasDiningRoom || formData.hasLaundry || formData.hasHousing) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {t({ english: "Special Features", vietnamese: "Tiện ích đặc biệt" })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {formData.hasWaxRoom && (
                <Badge variant="secondary">
                  {t({ english: "Wax Room", vietnamese: "Phòng wax" })}
                </Badge>
              )}
              {formData.hasDiningRoom && (
                <Badge variant="secondary">
                  {t({ english: "Dining Room", vietnamese: "Phòng ăn" })}
                </Badge>
              )}
              {formData.hasLaundry && (
                <Badge variant="secondary">
                  {t({ english: "Laundry", vietnamese: "Giặt ủi" })}
                </Badge>
              )}
              {formData.hasHousing && (
                <Badge variant="secondary">
                  {t({ english: "Housing Available", vietnamese: "Có chỗ ở" })}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Terms and Conditions */}
      <Card className="border-2 border-dashed border-gray-300">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked === true)}
              className="mt-1"
            />
            <label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
              {t({ 
                english: "I agree to the Terms of Service and Privacy Policy. I confirm that all information provided is accurate and I have the right to sell this salon.",
                vietnamese: "Tôi đồng ý với Điều khoản Dịch vụ và Chính sách Bảo mật. Tôi xác nhận rằng tất cả thông tin được cung cấp là chính xác và tôi có quyền bán tiệm này."
              })}
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between pt-6">
        <div className="text-sm text-gray-600">
          {t({ 
            english: "After clicking continue, you'll be redirected to secure payment processing.",
            vietnamese: "Sau khi nhấn tiếp tục, bạn sẽ được chuyển đến trang thanh toán bảo mật."
          })}
        </div>
        <Button
          onClick={handleConfirm}
          disabled={!termsAccepted || isSubmitting}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              {t({ english: "Processing...", vietnamese: "Đang xử lý..." })}
            </>
          ) : (
            t({ english: "Continue to Payment", vietnamese: "Tiếp tục thanh toán" })
          )}
        </Button>
      </div>
    </div>
  );
};

export default SalonReviewSection;
