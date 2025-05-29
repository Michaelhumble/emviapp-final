
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Crown, Zap, CheckCircle } from 'lucide-react';
import { SalonPricingOptions, DURATION_OPTIONS } from '@/utils/posting/salonPricing';

interface SalonPlanSelectionWithoutPricesProps {
  selectedOptions: SalonPricingOptions;
  onOptionsChange: (options: SalonPricingOptions) => void;
}

const SalonPlanSelectionWithoutPrices: React.FC<SalonPlanSelectionWithoutPricesProps> = ({
  selectedOptions,
  onOptionsChange
}) => {
  const pricingPlans = [
    {
      id: 'basic',
      name: 'Basic / Cơ bản',
      icon: <Zap className="h-6 w-6" />,
      features: [
        'Standard listing visibility / Hiển thị tiêu chuẩn',
        'Basic search placement / Vị trí tìm kiếm cơ bản',
        'Standard support / Hỗ trợ tiêu chuẩn'
      ],
      color: 'border-gray-200',
      buttonColor: 'bg-gray-600 hover:bg-gray-700'
    },
    {
      id: 'standard',
      name: 'Standard / Tiêu chuẩn',
      icon: <Star className="h-6 w-6" />,
      popular: true,
      features: [
        'Enhanced visibility / Tăng cường hiển thị',
        'Priority search placement / Ưu tiên vị trí tìm kiếm',
        'Featured badge / Huy hiệu nổi bật',
        'Priority support / Hỗ trợ ưu tiên'
      ],
      color: 'border-yellow-300',
      buttonColor: 'bg-yellow-600 hover:bg-yellow-700'
    },
    {
      id: 'featured',
      name: 'Featured / Nổi bật',
      icon: <Crown className="h-6 w-6" />,
      features: [
        'Maximum visibility / Hiển thị tối đa',
        'Top search results / Kết quả tìm kiếm hàng đầu',
        'Premium badge / Huy hiệu cao cấp',
        'Social media promotion / Quảng bá mạng xã hội',
        'Dedicated support / Hỗ trợ chuyên biệt'
      ],
      color: 'border-purple-300',
      buttonColor: 'bg-purple-600 hover:bg-purple-700'
    }
  ];

  const handlePlanSelect = (planId: string) => {
    onOptionsChange({
      ...selectedOptions,
      selectedPricingTier: planId as any
    });
  };

  const handleDurationChange = (months: string) => {
    onOptionsChange({
      ...selectedOptions,
      durationMonths: parseInt(months)
    });
  };

  const handleOptionChange = (option: keyof SalonPricingOptions, value: boolean) => {
    onOptionsChange({
      ...selectedOptions,
      [option]: value
    });
  };

  return (
    <div className="space-y-6">
      {/* Plan Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricingPlans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative ${plan.color} ${
              selectedOptions.selectedPricingTier === plan.id ? 'ring-2 ring-purple-500' : ''
            } hover:shadow-lg transition-shadow cursor-pointer`}
            onClick={() => handlePlanSelect(plan.id)}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-purple-600 text-white">Most Popular / Phổ biến nhất</Badge>
              </div>
            )}
            
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-2">
                {plan.icon}
              </div>
              <CardTitle className="text-lg font-bold">{plan.name}</CardTitle>
            </CardHeader>

            <CardContent className="pt-0">
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${plan.buttonColor} text-white`}
                variant={selectedOptions.selectedPricingTier === plan.id ? "default" : "outline"}
              >
                {selectedOptions.selectedPricingTier === plan.id ? 'Selected / Đã chọn' : 'Select Plan / Chọn gói'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Duration Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Duration / Thời hạn</CardTitle>
        </CardHeader>
        <CardContent>
          <Select 
            value={selectedOptions.durationMonths?.toString()} 
            onValueChange={handleDurationChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select duration / Chọn thời hạn" />
            </SelectTrigger>
            <SelectContent>
              {DURATION_OPTIONS.map((option) => (
                <SelectItem key={option.months} value={option.months.toString()}>
                  {option.label}
                  {option.discount > 0 && (
                    <span className="text-green-600 ml-2">({option.discount}% off)</span>
                  )}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Add-ons */}
      <Card>
        <CardHeader>
          <CardTitle>Add-ons / Tùy chọn thêm</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="nationwide"
              checked={selectedOptions.isNationwide || false}
              onCheckedChange={(checked) => handleOptionChange('isNationwide', checked as boolean)}
            />
            <label htmlFor="nationwide" className="text-sm text-gray-700">
              Nationwide visibility / Hiển thị toàn quốc (+$10/month)
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="fastSale"
              checked={selectedOptions.fastSalePackage || false}
              onCheckedChange={(checked) => handleOptionChange('fastSalePackage', checked as boolean)}
            />
            <label htmlFor="fastSale" className="text-sm text-gray-700">
              Fast sale package / Gói bán nhanh (+$20/month)
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="autoRenew"
              checked={selectedOptions.autoRenew || false}
              onCheckedChange={(checked) => handleOptionChange('autoRenew', checked as boolean)}
            />
            <label htmlFor="autoRenew" className="text-sm text-gray-700">
              Auto-renewal (5% discount) / Gia hạn tự động (giảm 5%)
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonPlanSelectionWithoutPrices;
