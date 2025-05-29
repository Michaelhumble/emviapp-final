
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { DollarSign, Users, Building, FileText, TrendingUp, Star } from 'lucide-react';

interface SalonDetailsStepProps {
  salonDetails: any;
  setSalonDetails: React.Dispatch<React.SetStateAction<any>>;
}

export const SalonDetailsStep: React.FC<SalonDetailsStepProps> = ({ 
  salonDetails, 
  setSalonDetails 
}) => {
  const handleInputChange = (field: string, value: string) => {
    setSalonDetails((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setSalonDetails((prev: any) => ({
      ...prev,
      [field]: checked
    }));
  };

  return (
    <div className="space-y-8">
      {/* Show Your Value Section */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              💰 Show Your Value / Thể hiện giá trị của bạn
            </h2>
          </div>
          <p className="text-gray-700 mb-2">
            Detailed financials and business metrics attract serious buyers willing to pay premium prices!
          </p>
          <p className="text-green-600 font-medium">
            Tài chính chi tiết và số liệu kinh doanh thu hút người mua nghiêm túc sẵn sàng trả giá cao!
          </p>
        </CardContent>
      </Card>

      {/* Business Details Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <Building className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              Business Details / Chi tiết kinh doanh
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Asking Price */}
            <div>
              <Label htmlFor="askingPrice" className="flex items-center gap-2 text-sm font-medium mb-2">
                <DollarSign className="w-4 h-4 text-green-500" />
                Asking Price / Giá yêu cầu *
              </Label>
              <Input
                id="askingPrice"
                value={salonDetails.askingPrice || ''}
                onChange={(e) => handleInputChange('askingPrice', e.target.value)}
                placeholder="200,000"
                className="text-lg"
              />
            </div>

            {/* Monthly Rent */}
            <div>
              <Label htmlFor="monthlyRent" className="text-sm font-medium mb-2">
                Monthly Rent / Tiền thuê hàng tháng *
              </Label>
              <Input
                id="monthlyRent"
                value={salonDetails.monthlyRent || ''}
                onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
                placeholder="50000"
              />
            </div>

            {/* Monthly Profit */}
            <div>
              <Label htmlFor="monthlyProfit" className="text-sm font-medium mb-2">
                Monthly Profit / Lợi nhuận hàng tháng
              </Label>
              <Input
                id="monthlyProfit"
                value={salonDetails.monthlyProfit || ''}
                onChange={(e) => handleInputChange('monthlyProfit', e.target.value)}
                placeholder="$8,000 / 8.000$"
              />
            </div>

            {/* Monthly Revenue */}
            <div>
              <Label htmlFor="monthlyRevenue" className="text-sm font-medium mb-2">
                Monthly Revenue / Doanh thu hàng tháng
              </Label>
              <Input
                id="monthlyRevenue"
                value={salonDetails.monthlyRevenue || ''}
                onChange={(e) => handleInputChange('monthlyRevenue', e.target.value)}
                placeholder="$25,000 / 25.000$"
              />
            </div>

            {/* Employee Count */}
            <div>
              <Label htmlFor="employeeCount" className="flex items-center gap-2 text-sm font-medium mb-2">
                <Users className="w-4 h-4 text-blue-500" />
                Employee Count / Số nhân viên
              </Label>
              <Input
                id="employeeCount"
                value={salonDetails.employeeCount || ''}
                onChange={(e) => handleInputChange('employeeCount', e.target.value)}
                placeholder="8"
              />
            </div>

            {/* Number of Tables */}
            <div>
              <Label htmlFor="numberOfTables" className="text-sm font-medium mb-2">
                Number of Tables / Số bàn
              </Label>
              <Input
                id="numberOfTables"
                value={salonDetails.numberOfTables || ''}
                onChange={(e) => handleInputChange('numberOfTables', e.target.value)}
                placeholder="12"
              />
            </div>

            {/* Square Feet */}
            <div className="md:col-span-1">
              <Label htmlFor="squareFeet" className="text-sm font-medium mb-2">
                Square Feet / Diện tích (ft²)
              </Label>
              <Input
                id="squareFeet"
                value={salonDetails.squareFeet || ''}
                onChange={(e) => handleInputChange('squareFeet', e.target.value)}
                placeholder="2,500 ft²"
              />
            </div>
          </div>

          {/* Descriptions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <Label htmlFor="englishDescription" className="flex items-center gap-2 text-sm font-medium mb-2">
                <FileText className="w-4 h-4 text-purple-500" />
                English Description
              </Label>
              <Textarea
                id="englishDescription"
                value={salonDetails.englishDescription || ''}
                onChange={(e) => handleInputChange('englishDescription', e.target.value)}
                placeholder="Describe your salon's unique features, services, and what makes it special..."
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="vietnameseDescription" className="flex items-center gap-2 text-sm font-medium mb-2">
                <FileText className="w-4 h-4 text-purple-500" />
                Vietnamese Description / Mô tả tiếng Việt
              </Label>
              <Textarea
                id="vietnameseDescription"
                value={salonDetails.vietnameseDescription || ''}
                onChange={(e) => handleInputChange('vietnameseDescription', e.target.value)}
                placeholder="Mô tả các tính năng độc đáo, dịch vụ của salon và điều gì làm cho nó đặc biệt..."
                rows={4}
              />
            </div>
          </div>

          {/* Reason for Selling */}
          <div className="mt-6">
            <Label htmlFor="reasonForSelling" className="text-sm font-medium mb-2">
              Reason for Selling / Lý do bán
            </Label>
            <Textarea
              id="reasonForSelling"
              value={salonDetails.reasonForSelling || ''}
              onChange={(e) => handleInputChange('reasonForSelling', e.target.value)}
              placeholder="Retirement, relocation, new business venture... / Nghỉ hưu, chuyển chỗ ở, khởi nghiệp mới..."
              rows={3}
            />
          </div>

          {/* Features & Amenities */}
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold">Features & Amenities / Tính năng & Tiện ích</h3>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="willTrain"
                    checked={salonDetails.willTrain || false}
                    onCheckedChange={(checked) => handleCheckboxChange('willTrain', checked)}
                  />
                  <Label htmlFor="willTrain" className="text-sm">
                    Will Train / Sẽ đào tạo
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="waxRoom"
                    checked={salonDetails.waxRoom || false}
                    onCheckedChange={(checked) => handleCheckboxChange('waxRoom', checked)}
                  />
                  <Label htmlFor="waxRoom" className="text-sm">
                    Wax Room / Phòng wax
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="parking"
                    checked={salonDetails.parking || false}
                    onCheckedChange={(checked) => handleCheckboxChange('parking', checked)}
                  />
                  <Label htmlFor="parking" className="text-sm">
                    Parking / Bãi đỗ xe
                  </Label>
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-800 mb-1">💡 Value Tip:</h4>
                  <p className="text-sm text-green-700">
                    Salons with detailed financials sell 60% faster than those without!
                  </p>
                  <p className="text-sm text-green-600 italic">
                    Salon có tài chính chi tiết bán nhanh hơn 60% so với những salon không có!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Star className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-800 mb-1">🌟 Success Factor:</h4>
                  <p className="text-sm text-blue-700">
                    High monthly profit margins attract premium buyers instantly.
                  </p>
                  <p className="text-sm text-blue-600 italic">
                    Tỷ suất lợi nhuận hàng tháng cao thu hút người mua cao cấp ngay lập tức.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
