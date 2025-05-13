
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent } from '@/components/ui/card';

interface JobContactInfoProps {
  form: any;
}

export const JobContactInfo: React.FC<JobContactInfoProps> = ({ form }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{t('Contact Information', 'Thông tin liên lạc')}</h2>
      
      <Card className="bg-blue-50/50 border border-blue-100 shadow-sm">
        <CardContent className="pt-4">
          <p className="text-sm text-blue-700">
            {t('Your contact information is essential for candidates to reach you. We protect your data and only share it with verified applicants.', 'Thông tin liên lạc của bạn rất cần thiết để ứng viên liên hệ với bạn. Chúng tôi bảo vệ dữ liệu của bạn và chỉ chia sẻ với các ứng viên đã xác minh.')}
          </p>
        </CardContent>
      </Card>

      <FormField
        control={form.control}
        name="contactName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('Contact Name', 'Tên liên hệ')}</FormLabel>
            <FormControl>
              <Input placeholder={t('Your name or salon manager\'s name', 'Tên của bạn hoặc tên quản lý tiệm')} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('Phone Number', 'Số điện thoại')}</FormLabel>
              <FormControl>
                <Input placeholder={t('e.g. (123) 456-7890', 'VD: (123) 456-7890')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('Email Address (Optional)', 'Địa chỉ Email (Tùy chọn)')}</FormLabel>
              <FormControl>
                <Input placeholder={t('Your email address', 'Địa chỉ email của bạn')} {...field} />
              </FormControl>
              <FormDescription>
                {t('We will send job inquiries to this email', 'Chúng tôi sẽ gửi thông báo việc làm đến email này')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
