
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { MapPin, Shield, TrendingUp, Info } from 'lucide-react';

interface SalonLocationStepProps {
  salonLocation: any;
  setSalonLocation: React.Dispatch<React.SetStateAction<any>>;
}

export const SalonLocationStep: React.FC<SalonLocationStepProps> = ({ 
  salonLocation, 
  setSalonLocation 
}) => {
  const handleInputChange = (field: string, value: string) => {
    setSalonLocation((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setSalonLocation((prev: any) => ({
      ...prev,
      hideExactAddress: checked
    }));
  };

  return (
    <div className="space-y-8">
      {/* Location Matters Header */}
      <Card className="bg-gradient-to-r from-green-50 to-teal-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              🗺️ Location Matters / Vị trí quan trọng
            </h2>
          </div>
          <p className="text-gray-700 mb-2">
            Prime location listings get 3x more buyer inquiries! Show what makes your spot special.
          </p>
          <p className="text-green-600 font-medium">
            Tin đăng vị trí đắc địa nhận được nhiều hơn 3 lần yêu cầu từ người mua! Cho thấy điều gì làm cho địa điểm của bạn đặc biệt.
          </p>
        </CardContent>
      </Card>

      {/* Location Details */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              Location Details / Chi tiết vị trí
            </h2>
          </div>

          <div className="space-y-6">
            {/* Street Address */}
            <div>
              <Label htmlFor="address" className="text-sm font-medium mb-2">
                Street Address / Địa chỉ đường phố *
              </Label>
              <Input
                id="address"
                value={salonLocation.address || ''}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="2345 Mather Dr"
                className="text-lg"
              />
            </div>

            {/* City, State, ZIP */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city" className="text-sm font-medium mb-2">
                  City / Thành phố *
                </Label>
                <Input
                  id="city"
                  value={salonLocation.city || ''}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="SAN JOSE"
                />
              </div>

              <div>
                <Label htmlFor="state" className="text-sm font-medium mb-2">
                  State / Tỉnh/Thành *
                </Label>
                <Input
                  id="state"
                  value={salonLocation.state || ''}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="CA"
                />
              </div>

              <div>
                <Label htmlFor="zipCode" className="text-sm font-medium mb-2">
                  ZIP Code / Mã bưu điện
                </Label>
                <Input
                  id="zipCode"
                  value={salonLocation.zipCode || ''}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  placeholder="95116"
                />
              </div>
            </div>

            {/* Neighborhood */}
            <div>
              <Label htmlFor="neighborhood" className="text-sm font-medium mb-2">
                Neighborhood / Khu vực
              </Label>
              <Input
                id="neighborhood"
                value={salonLocation.neighborhood || ''}
                onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                placeholder="Downtown, Near shopping center / Trung tâm thành phố, Gần trung tâm mua sắm"
              />
            </div>

            {/* Privacy Option */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="hideAddress"
                  checked={salonLocation.hideExactAddress || false}
                  onCheckedChange={handleCheckboxChange}
                />
                <div className="flex-1">
                  <Label 
                    htmlFor="hideAddress" 
                    className="flex items-center gap-2 text-sm font-medium cursor-pointer"
                  >
                    <Shield className="w-4 h-4 text-amber-600" />
                    🔒 Hide exact address in listing / Ẩn địa chỉ chính xác trong tin đăng
                  </Label>
                  <p className="text-sm text-amber-700 mt-1">
                    Only show general area to protect your privacy
                  </p>
                  <p className="text-sm text-amber-600 italic">
                    Chỉ hiển thị khu vực chung để bảo vệ quyền riêng tư của bạn
                  </p>
                </div>
              </div>
            </div>

            {/* Location Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">🌍</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-800 mb-1">Location Advantage:</h4>
                    <p className="text-sm text-green-700 mb-1">
                      High-traffic areas and shopping centers increase salon value by 25%!
                    </p>
                    <p className="text-sm text-green-600 italic">
                      Khu vực đông đúc và trung tâm mua sắm tăng giá trị salon lên 25%!
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Info className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-1">📊 Privacy Tip:</h4>
                    <p className="text-sm text-blue-700 mb-1">
                      70% of sellers hide exact address until serious buyer contact.
                    </p>
                    <p className="text-sm text-blue-600 italic">
                      70% người bán ẩn địa chỉ chính xác cho đến khi người mua nghiêm túc liên hệ.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
