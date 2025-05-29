
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SalonFormValues } from '../salonFormSchema';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Star, TrendingUp, Sparkles } from 'lucide-react';

interface FeaturesDetailsStepProps {
  form: UseFormReturn<SalonFormValues>;
}

const FeaturesDetailsStep = ({ form }: FeaturesDetailsStepProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Star className="w-6 h-6 text-blue-600" />
          </div>
          <span className="ml-3 text-xl font-medium">✨ Highlight What Makes You Special / Làm nổi bật điều đặc biệt</span>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Premium features and amenities help justify higher asking prices and attract quality buyers.
          <br />
          <span className="text-blue-600 font-medium">
            Các tính năng và tiện ích cao cấp giúp biện minh cho giá yêu cầu cao hơn và thu hút người mua chất lượng.
          </span>
        </p>
      </div>

      {/* Reason for Selling */}
      <div className="bg-white border rounded-lg p-6 mb-6">
        <FormField
          control={form.control}
          name="reasonForSelling"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-medium">Reason for Selling / Lý do bán</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Retirement, relocation, new business venture... / Nghỉ hưu, chuyển chỗ ở, khởi nghiệp mới..."
                  className="min-h-16 resize-y"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      {/* Features & Amenities Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Star className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-medium text-blue-900">Features & Amenities / Tính năng & Tiện ích</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="willTrain"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-blue-800">
                  Will Train / Sẽ đào tạo
                </FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hasWaxRoom"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-blue-800">
                  Wax Room / Phòng wax
                </FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hasParking"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-blue-800">
                  Parking / Bãi đỗ xe
                </FormLabel>
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Success Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <TrendingUp className="w-4 h-4 text-green-600 mr-2" />
            <span className="font-medium text-green-900">💰 Value Tip:</span>
          </div>
          <p className="text-green-800 text-sm">
            Salons with detailed financials sell 60% faster than those without!
            <br />
            <span className="text-green-600">
            Salon có tài chính chi tiết bán nhanh hơn 60% so với những salon không có!
            </span>
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Star className="w-4 h-4 text-blue-600 mr-2" />
            <span className="font-medium text-blue-900">🌟 Success Factor:</span>
          </div>
          <p className="text-blue-800 text-sm">
            High monthly profit margins attract premium buyers instantly.
            <br />
            <span className="text-blue-600">
            Tỷ suất lợi nhuận hàng tháng cao thu hút người mua cao cấp ngay lập tức.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesDetailsStep;
