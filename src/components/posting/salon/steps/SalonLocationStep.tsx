
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { MapPin, Shield, Building } from 'lucide-react';

interface SalonLocationStepProps {
  salonLocation: any;
  setSalonLocation: React.Dispatch<React.SetStateAction<any>>;
}

export const SalonLocationStep: React.FC<SalonLocationStepProps> = ({
  salonLocation,
  setSalonLocation
}) => {
  const handleInputChange = (field: string, value: string | boolean) => {
    setSalonLocation((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          📍 Location Details | Thông Tin Địa Điểm
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Provide location information to help buyers find your salon
          <br />
          <span className="text-purple-600">Cung cấp thông tin địa điểm để giúp người mua tìm thấy salon của bạn</span>
        </p>
      </div>

      {/* Address Information */}
      <Card className="border-blue-100 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Building className="w-5 h-5 text-blue-500" />
            <h3 className="text-xl font-semibold text-gray-900">
              Address Information | Thông Tin Địa Chỉ
            </h3>
          </div>

          <div className="space-y-6">
            <div>
              <Label htmlFor="address" className="text-base font-medium text-gray-900 mb-2 block">
                Street Address | Địa Chỉ <span className="text-red-500">*</span>
              </Label>
              <Input
                id="address"
                type="text"
                placeholder="123 Main Street"
                value={salonLocation.address || ''}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="h-12 rounded-xl border-gray-300"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city" className="text-base font-medium text-gray-900 mb-2 block">
                  City | Thành Phố <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="city"
                  type="text"
                  placeholder="San Jose"
                  value={salonLocation.city || ''}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="h-12 rounded-xl border-gray-300"
                />
              </div>

              <div>
                <Label htmlFor="state" className="text-base font-medium text-gray-900 mb-2 block">
                  State | Bang <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="state"
                  type="text"
                  placeholder="CA"
                  value={salonLocation.state || ''}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="h-12 rounded-xl border-gray-300"
                />
              </div>

              <div>
                <Label htmlFor="zipCode" className="text-base font-medium text-gray-900 mb-2 block">
                  ZIP Code | Mã Bưu Điện
                </Label>
                <Input
                  id="zipCode"
                  type="text"
                  placeholder="95123"
                  value={salonLocation.zipCode || ''}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  className="h-12 rounded-xl border-gray-300"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="neighborhood" className="text-base font-medium text-gray-900 mb-2 block">
                Neighborhood | Khu Phố
              </Label>
              <Input
                id="neighborhood"
                type="text"
                placeholder="Downtown, Near shopping center, etc."
                value={salonLocation.neighborhood || ''}
                onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                className="h-12 rounded-xl border-gray-300"
              />
              <p className="text-sm text-gray-500 mt-2">
                Help buyers understand the area and nearby landmarks
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card className="border-green-100 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-green-500" />
            <h3 className="text-xl font-semibold text-gray-900">
              Privacy Settings | Cài Đặt Riêng Tư
            </h3>
          </div>

          <div className="flex items-center justify-between p-6 bg-green-50 rounded-xl">
            <div className="flex-1">
              <Label className="text-base font-medium text-gray-900 block mb-2">
                Hide Exact Address | Ẩn Địa Chỉ Chính Xác
              </Label>
              <p className="text-sm text-gray-600">
                Only show general area to protect your privacy until buyers express serious interest
                <br />
                <span className="text-green-600">Chỉ hiển thị khu vực chung để bảo vệ quyền riêng tư cho đến khi có người mua nghiêm túc</span>
              </p>
            </div>
            <div className="ml-4">
              <Switch
                checked={Boolean(salonLocation.hideExactAddress)}
                onCheckedChange={(checked) => handleInputChange('hideExactAddress', checked)}
              />
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              💡 <strong>Tip:</strong> Hiding your exact address is recommended for security. 
              Serious buyers will be able to request the full address after initial contact.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
