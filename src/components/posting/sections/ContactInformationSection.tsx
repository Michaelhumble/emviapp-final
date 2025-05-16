
import React from 'react';
import { Control } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from '@/hooks/useTranslation';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export interface ContactInformationSectionProps {
  control?: Control<any>;
  form?: any;
}

const ContactInformationSection: React.FC<ContactInformationSectionProps> = ({ control, form }) => {
  const { t } = useTranslation();
  const formContext = useFormContext();
  
  // Use either passed control or get it from form context
  const formControl = control || form?.control || (formContext && formContext.control);

  if (!formControl) {
    console.error('ContactInformationSection: No form control available');
    return null;
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">{t('Contact Information', 'Thông tin liên hệ')}</h2>
      
      <FormField
        control={formControl}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('Phone Number', 'Số điện thoại')}</FormLabel>
            <FormControl>
              <Input 
                placeholder={t('Contact phone number', 'Số điện thoại liên hệ')} 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={formControl}
        name="contactEmail"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('Email', 'Email')}</FormLabel>
            <FormControl>
              <Input 
                type="email"
                placeholder={t('Contact email address', 'Địa chỉ email liên hệ')} 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="bg-blue-50 p-4 rounded-md">
        <h3 className="text-sm font-medium mb-2 text-blue-800">
          {t('Contact Information Privacy', 'Quyền riêng tư thông tin liên hệ')}
        </h3>
        <p className="text-sm text-blue-700">
          {t(
            'Your contact information will only be visible to logged-in users who are interested in your job listing.',
            'Thông tin liên hệ của bạn sẽ chỉ hiển thị với người dùng đã đăng nhập và quan tâm đến tin tuyển dụng của bạn.'
          )}
        </p>
      </div>
    </div>
  );
};

export default ContactInformationSection;
