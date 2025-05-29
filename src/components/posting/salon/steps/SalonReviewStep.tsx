
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SalonFormValues } from '../salonFormSchema';
import { SalonPricingOptions, getSalonPostPricingSummary } from '@/utils/posting/salonPricing';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, MapPin, DollarSign, Star, Camera } from 'lucide-react';

interface SalonReviewStepProps {
  form: UseFormReturn<SalonFormValues>;
  pricingOptions: SalonPricingOptions;
  photoUploads: File[];
}

const SalonReviewStep = ({ form, pricingOptions, photoUploads }: SalonReviewStepProps) => {
  const formData = form.getValues();
  const pricingSummary = getSalonPostPricingSummary(pricingOptions);

  // Format price to always show 2 decimal places
  const formatPrice = (price: number): string => {
    return price.toFixed(2);
  };

  return (
    <div className="space-y-6 bg-gradient-to-br from-pink-50 to-purple-50 min-h-screen p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-green-100 p-3 rounded-full">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <span className="ml-3 text-xl font-medium">✅ Final Review / Xem lại cuối cùng</span>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Please review all details before submitting your salon listing.
          <br />
          <span className="text-green-600 font-medium">
            Vui lòng xem lại tất cả thông tin trước khi đăng tin salon của bạn.
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Salon Details */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="w-5 h-5 text-purple-600 mr-2" />
              Salon Information / Thông tin Salon
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Salon Name / Tên Salon</label>
              <p className="text-lg font-semibold">{formData.salonName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Business Type / Loại hình kinh doanh</label>
              <p>{formData.businessType}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Industry / Ngành nghề</label>
              <p>{formData.beautyIndustry}</p>
            </div>
            {formData.establishedYear && (
              <div>
                <label className="text-sm font-medium text-gray-600">Established / Thành lập</label>
                <p>{formData.establishedYear}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Location */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="w-5 h-5 text-blue-600 mr-2" />
              Location / Địa điểm
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Address / Địa chỉ</label>
              <p>{formData.address}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">City / Thành phố</label>
                <p>{formData.city}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">State / Bang</label>
                <p>{formData.state}</p>
              </div>
            </div>
            {formData.zipCode && (
              <div>
                <label className="text-sm font-medium text-gray-600">ZIP Code</label>
                <p>{formData.zipCode}</p>
              </div>
            )}
            {formData.neighborhood && (
              <div>
                <label className="text-sm font-medium text-gray-600">Neighborhood / Khu vực</label>
                <p>{formData.neighborhood}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Financial Details */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="w-5 h-5 text-green-600 mr-2" />
              Financial Details / Chi tiết tài chính
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Asking Price / Giá yêu cầu</label>
              <p className="text-xl font-bold text-green-600">${formData.askingPrice}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Monthly Rent / Tiền thuê hàng tháng</label>
              <p className="text-lg">${formData.monthlyRent}/month</p>
            </div>
            {formData.monthlyProfit && (
              <div>
                <label className="text-sm font-medium text-gray-600">Monthly Profit / Lợi nhuận hàng tháng</label>
                <p className="text-lg text-green-600">${formData.monthlyProfit}</p>
              </div>
            )}
            {formData.numberOfTables && (
              <div>
                <label className="text-sm font-medium text-gray-600">Number of Tables / Số bàn</label>
                <p>{formData.numberOfTables}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Photos */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Camera className="w-5 h-5 text-purple-600 mr-2" />
              Photos / Hình ảnh ({photoUploads.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {photoUploads.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {photoUploads.slice(0, 6).map((photo, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Salon photo ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    {index === 0 && (
                      <Badge className="absolute top-1 left-1 bg-purple-600">
                        Main / Chính
                      </Badge>
                    )}
                  </div>
                ))}
                {photoUploads.length > 6 && (
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm text-gray-600">+{photoUploads.length - 6} more</span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No photos uploaded</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Features */}
      {(formData.willTrain || formData.hasWaxRoom || formData.hasParking) && (
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Features & Amenities / Tính năng & Tiện ích</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {formData.willTrain && (
                <Badge variant="secondary">Will Train / Sẽ đào tạo</Badge>
              )}
              {formData.hasWaxRoom && (
                <Badge variant="secondary">Wax Room / Phòng wax</Badge>
              )}
              {formData.hasParking && (
                <Badge variant="secondary">Parking / Bãi đỗ xe</Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pricing Summary */}
      <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-800">Pricing Summary / Tóm tắt giá</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">{pricingSummary.planName}</span>
            <span className="font-bold">${formatPrice(pricingSummary.basePrice)}</span>
          </div>
          
          {pricingOptions.featuredAddOn && (
            <div className="flex justify-between items-center">
              <span className="text-purple-600">Featured Placement (one-time)</span>
              <span className="font-bold text-purple-600">+$10.00</span>
            </div>
          )}
          
          {pricingSummary.discounts.autoRenew > 0 && (
            <div className="flex justify-between items-center text-green-600">
              <span>Auto-renew discount (5%)</span>
              <span>-${formatPrice(pricingSummary.discounts.autoRenew)}</span>
            </div>
          )}
          
          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total / Tổng cộng</span>
              <span className="text-purple-600">${formatPrice(pricingSummary.finalPrice)}</span>
            </div>
          </div>
          
          <div className="text-sm text-gray-600 mt-4">
            <p>
              All listings expire after chosen duration unless renewed. First-time discounts apply only once per account.
            </p>
            <p className="text-purple-600 mt-1">
              Tất cả tin đăng hết hạn sau thời gian đã chọn trừ khi gia hạn. Giá ưu đãi lần đầu chỉ áp dụng 1 lần cho mỗi tài khoản.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonReviewStep;
