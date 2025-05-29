
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { DollarSign, Users, Briefcase, Home, TrendingUp, Star } from 'lucide-react';

interface SalonDetailsStepProps {
  salonDetails: any;
  setSalonDetails: React.Dispatch<React.SetStateAction<any>>;
}

export const SalonDetailsStep: React.FC<SalonDetailsStepProps> = ({
  salonDetails,
  setSalonDetails
}) => {
  const handleInputChange = (field: string, value: string | boolean) => {
    setSalonDetails((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Briefcase className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          💼 Business Details | Chi Tiết Kinh Doanh
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Provide detailed information about your salon business to attract serious buyers
          <br />
          <span className="text-purple-600">Cung cấp thông tin chi tiết về salon để thu hút người mua nghiêm túc</span>
        </p>
      </div>

      {/* Financial Information */}
      <Card className="border-purple-100 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5 text-green-500" />
            <h3 className="text-xl font-semibold text-gray-900">
              Financial Information | Thông Tin Tài Chính
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="askingPrice" className="text-base font-medium text-gray-900 mb-2 block">
                Asking Price | Giá Yêu Cầu <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="askingPrice"
                  type="text"
                  placeholder="$150,000"
                  value={salonDetails.askingPrice || ''}
                  onChange={(e) => handleInputChange('askingPrice', e.target.value)}
                  className="pl-8 h-12 rounded-xl border-gray-300"
                />
                <DollarSign className="w-4 h-4 text-gray-400 absolute left-3 top-4" />
              </div>
            </div>

            <div>
              <Label htmlFor="monthlyRent" className="text-base font-medium text-gray-900 mb-2 block">
                Monthly Rent | Tiền Thuê Hàng Tháng <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="monthlyRent"
                  type="text"
                  placeholder="$3,500"
                  value={salonDetails.monthlyRent || ''}
                  onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
                  className="pl-8 h-12 rounded-xl border-gray-300"
                />
                <DollarSign className="w-4 h-4 text-gray-400 absolute left-3 top-4" />
              </div>
            </div>

            <div>
              <Label htmlFor="monthlyRevenue" className="text-base font-medium text-gray-900 mb-2 block">
                Monthly Revenue | Doanh Thu Hàng Tháng
              </Label>
              <div className="relative">
                <Input
                  id="monthlyRevenue"
                  type="text"
                  placeholder="$12,000"
                  value={salonDetails.monthlyRevenue || ''}
                  onChange={(e) => handleInputChange('monthlyRevenue', e.target.value)}
                  className="pl-8 h-12 rounded-xl border-gray-300"
                />
                <TrendingUp className="w-4 h-4 text-gray-400 absolute left-3 top-4" />
              </div>
            </div>

            <div>
              <Label htmlFor="yearlyRevenue" className="text-base font-medium text-gray-900 mb-2 block">
                Yearly Revenue | Doanh Thu Hàng Năm
              </Label>
              <div className="relative">
                <Input
                  id="yearlyRevenue"
                  type="text"
                  placeholder="$144,000"
                  value={salonDetails.yearlyRevenue || ''}
                  onChange={(e) => handleInputChange('yearlyRevenue', e.target.value)}
                  className="pl-8 h-12 rounded-xl border-gray-300"
                />
                <TrendingUp className="w-4 h-4 text-gray-400 absolute left-3 top-4" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Physical Details */}
      <Card className="border-purple-100 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Home className="w-5 h-5 text-blue-500" />
            <h3 className="text-xl font-semibold text-gray-900">
              Physical Details | Chi Tiết Cơ Sở Vật Chất
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="squareFeet" className="text-base font-medium text-gray-900 mb-2 block">
                Square Feet | Diện Tích
              </Label>
              <Input
                id="squareFeet"
                type="text"
                placeholder="1,200 sq ft"
                value={salonDetails.squareFeet || ''}
                onChange={(e) => handleInputChange('squareFeet', e.target.value)}
                className="h-12 rounded-xl border-gray-300"
              />
            </div>

            <div>
              <Label htmlFor="numberOfTables" className="text-base font-medium text-gray-900 mb-2 block">
                Number of Tables | Số Bàn
              </Label>
              <Input
                id="numberOfTables"
                type="text"
                placeholder="8"
                value={salonDetails.numberOfTables || ''}
                onChange={(e) => handleInputChange('numberOfTables', e.target.value)}
                className="h-12 rounded-xl border-gray-300"
              />
            </div>

            <div>
              <Label htmlFor="numberOfChairs" className="text-base font-medium text-gray-900 mb-2 block">
                Number of Chairs | Số Ghế
              </Label>
              <Input
                id="numberOfChairs"
                type="text"
                placeholder="10"
                value={salonDetails.numberOfChairs || ''}
                onChange={(e) => handleInputChange('numberOfChairs', e.target.value)}
                className="h-12 rounded-xl border-gray-300"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Staff Information */}
      <Card className="border-purple-100 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-purple-500" />
            <h3 className="text-xl font-semibold text-gray-900">
              Staff Information | Thông Tin Nhân Viên
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="numberOfStaff" className="text-base font-medium text-gray-900 mb-2 block">
                Number of Staff | Số Nhân Viên
              </Label>
              <Input
                id="numberOfStaff"
                type="text"
                placeholder="5 employees"
                value={salonDetails.numberOfStaff || ''}
                onChange={(e) => handleInputChange('numberOfStaff', e.target.value)}
                className="h-12 rounded-xl border-gray-300"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
              <div>
                <Label className="text-base font-medium text-gray-900">
                  Will Train New Owner | Sẽ Đào Tạo Chủ Mới
                </Label>
                <p className="text-sm text-gray-600">
                  Provide training to the new owner
                </p>
              </div>
              <Switch
                checked={Boolean(salonDetails.willTrain)}
                onCheckedChange={(checked) => handleInputChange('willTrain', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Amenities */}
      <Card className="border-purple-100 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-yellow-500" />
            <h3 className="text-xl font-semibold text-gray-900">
              Amenities & Features | Tiện Ích & Tính Năng
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
              <div>
                <Label className="text-base font-medium text-gray-900">
                  Has Housing | Có Chỗ Ở
                </Label>
                <p className="text-sm text-gray-600">
                  Includes housing for employees
                </p>
              </div>
              <Switch
                checked={Boolean(salonDetails.hasHousing)}
                onCheckedChange={(checked) => handleInputChange('hasHousing', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
              <div>
                <Label className="text-base font-medium text-gray-900">
                  Has Wax Room | Có Phòng Wax
                </Label>
                <p className="text-sm text-gray-600">
                  Dedicated waxing room
                </p>
              </div>
              <Switch
                checked={Boolean(salonDetails.hasWaxRoom)}
                onCheckedChange={(checked) => handleInputChange('hasWaxRoom', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl">
              <div>
                <Label className="text-base font-medium text-gray-900">
                  Has Dining Room | Có Phòng Ăn
                </Label>
                <p className="text-sm text-gray-600">
                  Staff dining area
                </p>
              </div>
              <Switch
                checked={Boolean(salonDetails.hasDiningRoom)}
                onCheckedChange={(checked) => handleInputChange('hasDiningRoom', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-xl">
              <div>
                <Label className="text-base font-medium text-gray-900">
                  Has Parking | Có Bãi Đậu Xe
                </Label>
                <p className="text-sm text-gray-600">
                  Parking available
                </p>
              </div>
              <Switch
                checked={Boolean(salonDetails.hasParking)}
                onCheckedChange={(checked) => handleInputChange('hasParking', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Descriptions */}
      <Card className="border-purple-100 shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Descriptions | Mô Tả
          </h3>

          <div className="space-y-6">
            <div>
              <Label htmlFor="englishDescription" className="text-base font-medium text-gray-900 mb-2 block">
                English Description | Mô Tả Tiếng Anh
              </Label>
              <Textarea
                id="englishDescription"
                placeholder="Describe your salon business in English..."
                rows={4}
                value={salonDetails.englishDescription || ''}
                onChange={(e) => handleInputChange('englishDescription', e.target.value)}
                className="rounded-xl border-gray-300 resize-none"
              />
            </div>

            <div>
              <Label htmlFor="vietnameseDescription" className="text-base font-medium text-gray-900 mb-2 block">
                Vietnamese Description | Mô Tả Tiếng Việt
              </Label>
              <Textarea
                id="vietnameseDescription"
                placeholder="Mô tả salon của bạn bằng tiếng Việt..."
                rows={4}
                value={salonDetails.vietnameseDescription || ''}
                onChange={(e) => handleInputChange('vietnameseDescription', e.target.value)}
                className="rounded-xl border-gray-300 resize-none"
              />
            </div>

            <div>
              <Label htmlFor="reasonForSelling" className="text-base font-medium text-gray-900 mb-2 block">
                Reason for Selling | Lý Do Bán
              </Label>
              <Textarea
                id="reasonForSelling"
                placeholder="Why are you selling your salon?"
                rows={3}
                value={salonDetails.reasonForSelling || ''}
                onChange={(e) => handleInputChange('reasonForSelling', e.target.value)}
                className="rounded-xl border-gray-300 resize-none"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
