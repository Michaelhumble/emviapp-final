
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SalonFormValues } from '../salonFormSchema';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from '@/hooks/useTranslation';

interface SalonBasicInfoStepProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonBasicInfoStep = ({ form }: SalonBasicInfoStepProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t({
            english: 'Basic Information',
            vietnamese: 'Thông Tin Cơ Bản'
          })}
        </h2>
        <p className="text-gray-600 mt-2">
          {t({
            english: 'Tell us about your salon to attract qualified buyers',
            vietnamese: 'Cho chúng tôi biết về salon của bạn để thu hút người mua tiềm năng'
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="salonName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">
                {t({
                  english: 'Salon Name',
                  vietnamese: 'Tên Salon'
                })} *
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder={t({
                    english: 'Enter salon name',
                    vietnamese: 'Nhập tên salon'
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
          name="businessType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">
                {t({
                  english: 'Business Type',
                  vietnamese: 'Loại Hình Kinh Doanh'
                })} *
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all">
                    <SelectValue placeholder={t({
                      english: 'Select business type',
                      vietnamese: 'Chọn loại hình kinh doanh'
                    })} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="nail-salon">
                    {t({
                      english: 'Nail Salon',
                      vietnamese: 'Tiệm Nail'
                    })}
                  </SelectItem>
                  <SelectItem value="hair-salon">
                    {t({
                      english: 'Hair Salon',
                      vietnamese: 'Tiệm Tóc'
                    })}
                  </SelectItem>
                  <SelectItem value="spa">
                    {t({
                      english: 'Spa',
                      vietnamese: 'Spa'
                    })}
                  </SelectItem>
                  <SelectItem value="beauty-salon">
                    {t({
                      english: 'Beauty Salon',
                      vietnamese: 'Tiệm Làm Đẹp'
                    })}
                  </SelectItem>
                  <SelectItem value="barbershop">
                    {t({
                      english: 'Barbershop',
                      vietnamese: 'Tiệm Cắt Tóc Nam'
                    })}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">
                {t({
                  english: 'Address',
                  vietnamese: 'Địa Chỉ'
                })} *
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder={t({
                    english: 'Enter full address',
                    vietnamese: 'Nhập địa chỉ đầy đủ'
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
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">
                {t({
                  english: 'City',
                  vietnamese: 'Thành Phố'
                })} *
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder={t({
                    english: 'Enter city',
                    vietnamese: 'Nhập thành phố'
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
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">
                {t({
                  english: 'State',
                  vietnamese: 'Bang'
                })} *
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder={t({
                    english: 'Enter state',
                    vietnamese: 'Nhập bang'
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
          name="askingPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">
                {t({
                  english: 'Asking Price',
                  vietnamese: 'Giá Yêu Cầu'
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
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-6">
        <p className="text-sm text-blue-700 font-medium">
          <span className="font-semibold">💡 {t({
            english: 'Pro Tip:',
            vietnamese: 'Mẹo Hay:'
          })}</span> {t({
            english: 'Be specific about your location to attract local buyers - 85% of salon buyers look within 20 miles of where they live.',
            vietnamese: 'Hãy cụ thể về vị trí của bạn để thu hút người mua địa phương - 85% người mua salon tìm kiếm trong phạm vi 20 dặm từ nơi họ sống.'
          })}
        </p>
      </div>
    </div>
  );
};
