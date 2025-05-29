
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SalonFormValues } from '../salonFormSchema';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DollarSign, Users, Building, TrendingUp, Star } from 'lucide-react';

interface FinancialDetailsStepProps {
  form: UseFormReturn<SalonFormValues>;
}

const FinancialDetailsStep = ({ form }: FinancialDetailsStepProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-teal-100 p-3 rounded-full">
            <DollarSign className="w-6 h-6 text-teal-600" />
          </div>
          <span className="ml-3 text-xl font-medium">💰 Show Your Value / Thể hiện giá trị của bạn</span>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Detailed financials and business metrics attract serious buyers willing to pay premium prices!
          <br />
          <span className="text-teal-600 font-medium">
          Tài chính chi tiết và số liệu kinh doanh thu hút người mua nghiêm túc sẵn sàng trả giá cao!
          </span>
        </p>
      </div>

      {/* Business Details Section */}
      <div className="bg-white border rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Building className="w-5 h-5 text-teal-600" />
          <h3 className="text-lg font-medium text-teal-900">Business Details / Chi tiết kinh doanh</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="askingPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  Asking Price / Giá yêu cầu *
                </FormLabel>
                <FormControl>
                  <Input placeholder="200,000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="monthlyRent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monthly Rent / Tiền thuê hàng tháng *</FormLabel>
                <FormControl>
                  <Input placeholder="50000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="monthlyProfit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monthly Profit / Lợi nhuận hàng tháng</FormLabel>
                <FormControl>
                  <Input placeholder="$8,000 / 8.000$" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="monthlyRevenue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monthly Revenue / Doanh thu hàng tháng</FormLabel>
                <FormControl>
                  <Input placeholder="$25,000 / 25.000$" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="employeeCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Employee Count / Số nhân viên
                </FormLabel>
                <FormControl>
                  <Input placeholder="8" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numberOfTables"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Tables / Số bàn</FormLabel>
                <FormControl>
                  <Input placeholder="12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="squareFeet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Square Feet / Diện tích (ft²)</FormLabel>
                <FormControl>
                  <Input placeholder="2,500 ft²" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Descriptions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="englishDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                📝 English Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your salon's unique features, services, and what makes it special..."
                  className="min-h-32 resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vietnameseDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                📝 Vietnamese Description / Mô tả tiếng Việt
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Mô tả các tính năng độc đáo, dịch vụ của salon và điều gì làm cho nó đặc biệt..."
                  className="min-h-32 resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Reason for Selling */}
      <FormField
        control={form.control}
        name="reasonForSelling"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Reason for Selling / Lý do bán</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Retirement, relocation, new business venture... / Nghỉ hưu, chuyển chỗ ở, khởi nghiệp mới..."
                className="min-h-16 resize-y"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

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

export default FinancialDetailsStep;
