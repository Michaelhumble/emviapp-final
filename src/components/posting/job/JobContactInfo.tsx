
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/hooks/useTranslation';

interface JobContactInfoProps {
  form: any;
}

export const JobContactInfo: React.FC<JobContactInfoProps> = ({ form }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{t('Contact Information', 'Thông tin liên hệ')}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="contactName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('Contact Name', 'Tên người liên hệ')}</FormLabel>
              <FormControl>
                <Input placeholder={t('e.g. Jane Smith', 'VD: Nguyễn Văn A')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('Phone Number', 'Số điện thoại')}</FormLabel>
              <FormControl>
                <Input type="tel" placeholder={t('e.g. (555) 123-4567', 'VD: 0123 456 789')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="contactEmail"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('Email (Optional)', 'Email (Tùy chọn)')}</FormLabel>
            <FormControl>
              <Input type="email" placeholder={t('e.g. jobs@yoursalon.com', 'VD: jobs@yoursalon.com')} {...field} />
            </FormControl>
            <FormDescription>
              {t('Providing an email gives candidates an additional way to reach you', 'Cung cấp email cho ứng viên thêm cách để liên hệ với bạn')}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
