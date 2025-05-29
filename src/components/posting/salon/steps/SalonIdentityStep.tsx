
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SalonFormValues } from '../salonFormSchema';

interface SalonIdentityStepProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonIdentityStep: React.FC<SalonIdentityStepProps> = ({ form }) => {
  const businessTypes = [
    'Hair Salon / Salon Tóc',
    'Nail Salon / Salon Nails', 
    'Spa / Spa',
    'Barbershop / Tiệm cắt tóc nam',
    'Beauty Salon / Salon làm đẹp',
    'Massage / Massage',
    'Eyebrow/Lash / Chân mày/Mi',
    'Mixed Services / Dịch vụ hỗn hợp'
  ];

  const beautyIndustries = [
    'Nails',
    'Hair', 
    'Spa',
    'Massage',
    'Eyebrows',
    'Eyelashes',
    'Facials',
    'Waxing',
    'Other'
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-medium">Salon Information / Thông Tin Salon</h2>
        <p className="text-gray-600 mt-2">
          Tell us about your salon business / Cho chúng tôi biết về doanh nghiệp salon của bạn
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="salonName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salon Name / Tên Salon *</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter your salon name / Nhập tên salon"
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
              <FormLabel>Business Type / Loại Hình Kinh Doanh *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type / Chọn loại hình" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {businessTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="beautyIndustry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Service / Dịch Vụ Chính</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select primary service / Chọn dịch vụ chính" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {beautyIndustries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="establishedYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Established Year / Năm Thành Lập</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., 2020"
                  type="number"
                  min="1900"
                  max={new Date().getFullYear()}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
