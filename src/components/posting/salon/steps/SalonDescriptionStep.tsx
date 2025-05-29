
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SalonFormValues } from '../salonFormSchema';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

interface SalonDescriptionStepProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonDescriptionStep = ({ form }: SalonDescriptionStepProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t({
            english: 'Description & Details',
            vietnamese: 'Mô Tả & Chi Tiết'
          })}
        </h2>
        <p className="text-gray-600 mt-2">
          {t({
            english: 'Provide detailed information about your salon to attract serious buyers',
            vietnamese: 'Cung cấp thông tin chi tiết về salon của bạn để thu hút người mua nghiêm túc'
          })}
        </p>
      </div>

      <div className="space-y-6">
        <FormField
          control={form.control}
          name="englishDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">
                {t({
                  english: 'English Description',
                  vietnamese: 'Mô Tả Tiếng Anh'
                })}
              </FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={t({
                    english: 'Describe your salon in English...',
                    vietnamese: 'Mô tả salon của bạn bằng tiếng Anh...'
                  })}
                  className="min-h-[120px] border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all"
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
              <FormLabel className="text-gray-700">
                {t({
                  english: 'Vietnamese Description',
                  vietnamese: 'Mô Tả Tiếng Việt'
                })}
              </FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={t({
                    english: 'Mô tả salon của bạn bằng tiếng Việt...',
                    vietnamese: 'Mô tả salon của bạn bằng tiếng Việt...'
                  })}
                  className="min-h-[120px] border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="monthlyRent"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">
                  {t({
                    english: 'Monthly Rent',
                    vietnamese: 'Tiền Thuê Tháng'
                  })} *
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder={t({
                      english: '$0',
                      vietnamese: '$0'
                    })}
                    className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all"
                    {...field} 
                  />
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
                <FormLabel className="text-gray-700">
                  {t({
                    english: 'Monthly Revenue',
                    vietnamese: 'Doanh Thu Tháng'
                  })}
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder={t({
                      english: '$0',
                      vietnamese: '$0'
                    })}
                    className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numberOfChairs"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">
                  {t({
                    english: 'Number of Chairs',
                    vietnamese: 'Số Ghế'
                  })}
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder={t({
                      english: '0',
                      vietnamese: '0'
                    })}
                    className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all"
                    {...field} 
                  />
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
                <FormLabel className="text-gray-700">
                  {t({
                    english: 'Square Feet',
                    vietnamese: 'Diện Tích'
                  })}
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder={t({
                      english: '0 sq ft',
                      vietnamese: '0 sq ft'
                    })}
                    className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800">
            {t({
              english: 'Features & Amenities',
              vietnamese: 'Tiện Ích & Đặc Điểm'
            })}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="willTrain"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 bg-white p-3 rounded-md border hover:shadow-sm transition-shadow">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-blue-600"
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal cursor-pointer">
                    {t({
                      english: 'Will Train',
                      vietnamese: 'Sẽ Đào Tạo'
                    })}
                  </FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hasHousing"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 bg-white p-3 rounded-md border hover:shadow-sm transition-shadow">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-blue-600"
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal cursor-pointer">
                    {t({
                      english: 'Housing Available',
                      vietnamese: 'Có Chỗ Ở'
                    })}
                  </FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hasParking"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 bg-white p-3 rounded-md border hover:shadow-sm transition-shadow">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-blue-600"
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal cursor-pointer">
                    {t({
                      english: 'Parking Available',
                      vietnamese: 'Có Chỗ Đậu Xe'
                    })}
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>

      <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-100 mt-6">
        <CardContent className="p-4 flex gap-3">
          <Lightbulb className="h-5 w-5 text-amber-600 flex-shrink-0 mt-1" />
          <p className="text-sm text-amber-800">
            <span className="font-semibold">{t({
              english: 'Seller Tip:',
              vietnamese: 'Lời Khuyên:'
            })}</span> {t({
              english: 'Salons with detailed financial information receive 6x more inquiries. Including your revenue, profit margins, and rental costs builds buyer trust and speeds up the sales process.',
              vietnamese: 'Các salon có thông tin tài chính chi tiết nhận được gấp 6 lần số lượt hỏi mua. Việc cung cấp doanh thu, lợi nhuận và chi phí thuê của bạn sẽ tạo niềm tin cho người mua và đẩy nhanh quá trình bán hàng.'
            })}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
