
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SalonFormValues } from '../salonFormSchema';
import { DollarSign, Users, FileText, TrendingUp, Star, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface SalonDetailsStepProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonDetailsStep: React.FC<SalonDetailsStepProps> = ({ form }) => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-0 shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-playfair font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">
            Showcase Your Success / Khoe Thành Công
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto mb-4">
            Share the numbers and story that make your salon irresistible to investors
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-emerald-600 bg-emerald-100 px-4 py-2 rounded-full">
            <Star className="h-4 w-4" />
            <span className="font-medium">Detailed listings get 5x more serious inquiries!</span>
          </div>
        </CardContent>
      </Card>

      {/* Financial & Business Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="askingPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-base font-medium">
                <DollarSign className="h-4 w-4 text-emerald-500" />
                Asking Price / Giá Yêu Cầu *
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="$150,000 - Price to attract serious buyers"
                  type="number"
                  min="0"
                  className="h-12 text-base border-2 border-gray-200 focus:border-emerald-500 transition-colors"
                  {...field} 
                />
              </FormControl>
              <p className="text-sm text-gray-500 mt-1">
                Set a competitive price based on location, revenue, and equipment value
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="monthlyRevenue"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-base font-medium">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                Monthly Revenue / Doanh Thu Tháng
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="$25,000 - Shows income potential to buyers"
                  type="number"
                  min="0"
                  className="h-12 text-base border-2 border-gray-200 focus:border-emerald-500 transition-colors"
                  {...field} 
                />
              </FormControl>
              <p className="text-sm text-gray-500 mt-1">
                Optional: Demonstrates earning potential and business viability
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="monthlyProfit"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-base font-medium">
                <Zap className="h-4 w-4 text-emerald-500" />
                Monthly Profit / Lợi Nhuận Tháng
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="$12,000 - Key metric buyers want to see"
                  type="number"
                  min="0"
                  className="h-12 text-base border-2 border-gray-200 focus:border-emerald-500 transition-colors"
                  {...field} 
                />
              </FormControl>
              <p className="text-sm text-gray-500 mt-1">
                Optional: Show net income after expenses to justify your asking price
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="employeeCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-base font-medium">
                <Users className="h-4 w-4 text-emerald-500" />
                Number of Employees / Số Nhân Viên
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="8 - Shows established team and capacity"
                  type="number"
                  min="0"
                  className="h-12 text-base border-2 border-gray-200 focus:border-emerald-500 transition-colors"
                  {...field} 
                />
              </FormControl>
              <p className="text-sm text-gray-500 mt-1">
                Optional: Indicates business scale and operational capacity
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Descriptions */}
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="englishDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-base font-medium">
                <FileText className="h-4 w-4 text-emerald-500" />
                English Description *
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your salon's unique advantages: prime location with high foot traffic, loyal customer base of 500+ regulars, modern equipment worth $50K, established for 5 years with consistent growth. Perfect turnkey opportunity for serious investor looking for immediate income..."
                  className="min-h-32 resize-y text-base border-2 border-gray-200 focus:border-emerald-500 transition-colors"
                  {...field}
                />
              </FormControl>
              <p className="text-sm text-gray-500 mt-1">
                Paint a compelling picture: location advantages, customer loyalty, equipment value, growth potential
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vietnameseDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-base font-medium">
                <FileText className="h-4 w-4 text-emerald-500" />
                Vietnamese Description / Mô Tả Tiếng Việt
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Salon có vị trí đắc địa, khách hàng thân thiết, trang thiết bị hiện đại. Cơ hội tuyệt vời cho người muốn đầu tư vào ngành làm đẹp với doanh thu ổn định..."
                  className="min-h-32 resize-y text-base border-2 border-gray-200 focus:border-emerald-500 transition-colors"
                  {...field}
                />
              </FormControl>
              <p className="text-sm text-gray-500 mt-1">
                Optional: Reach Vietnamese-speaking buyers with native language description
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reasonForSelling"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-base font-medium">
                <FileText className="h-4 w-4 text-emerald-500" />
                Reason for Selling / Lý Do Bán
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Retirement after 15 successful years, relocating to be closer to family, pursuing new business opportunity - share your honest story to build trust with buyers"
                  className="resize-y text-base border-2 border-gray-200 focus:border-emerald-500 transition-colors"
                  {...field}
                />
              </FormControl>
              <p className="text-sm text-gray-500 mt-1">
                Optional: Honest reasons build trust and eliminate buyer concerns
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Success Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">What Buyers Want to See</h3>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Consistent revenue and profit trends</li>
                  <li>• Loyal customer base and repeat business</li>
                  <li>• Modern equipment and clean facilities</li>
                  <li>• Growth opportunities and expansion potential</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-800 mb-2">Maximize Your Value</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Include all equipment and inventory in price</li>
                  <li>• Highlight unique competitive advantages</li>
                  <li>• Show 2-3 years of financial records</li>
                  <li>• Emphasize turnkey operation benefits</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
