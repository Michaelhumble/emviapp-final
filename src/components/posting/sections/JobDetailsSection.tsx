
import React from 'react';
import { 
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IndustryType } from '@/components/posting/job/jobFormSchema';
import { useForm, UseFormReturn } from 'react-hook-form';
import { useTranslation } from '@/hooks/useTranslation';

interface JobDetailsSectionProps {
  form: UseFormReturn<any>;
  showVietnameseByDefault?: boolean;
}

const JobDetailsSection: React.FC<JobDetailsSectionProps> = ({ form, showVietnameseByDefault = false }) => {
  const { t } = useTranslation();
  
  // Make sure we have a valid form context
  if (!form) {
    console.error("JobDetailsSection requires a valid form from react-hook-form");
    return null;
  }

  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t({
              english: "Job Title",
              vietnamese: "Tiêu đề công việc"
            })}</FormLabel>
            <FormControl>
              <Input placeholder={t({
                english: "e.g., Senior Nail Technician",
                vietnamese: "vd., Thợ làm móng cao cấp"
              })} {...field} />
            </FormControl>
            <FormDescription>
              {t({
                english: "What is the position you're hiring for?",
                vietnamese: "Vị trí bạn đang tuyển dụng là gì?"
              })}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="salonName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t({
              english: "Salon Name",
              vietnamese: "Tên Tiệm"
            })}</FormLabel>
            <FormControl>
              <Input placeholder={t({
                english: "e.g., Luxury Nails & Spa",
                vietnamese: "vd., Luxury Nails & Spa"
              })} {...field} />
            </FormControl>
            <FormDescription>
              {t({
                english: "Enter the name of your salon or business",
                vietnamese: "Nhập tên tiệm hoặc doanh nghiệp của bạn"
              })}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t({
              english: "Description",
              vietnamese: "Mô tả"
            })}</FormLabel>
            <FormControl>
              <Textarea placeholder={t({
                english: "Describe the job requirements and responsibilities",
                vietnamese: "Mô tả yêu cầu và trách nhiệm công việc"
              })} className="resize-none" {...field} />
            </FormControl>
            <FormDescription>
              {t({
                english: "Include details about the role, responsibilities, and what makes it a great opportunity.",
                vietnamese: "Bao gồm chi tiết về vai trò, trách nhiệm và điều gì làm cho đây là một cơ hội tốt."
              })}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="vietnameseDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t({
              english: "Vietnamese Description (Optional)",
              vietnamese: "Mô tả tiếng Việt (Tùy chọn)"
            })}</FormLabel>
            <FormControl>
              <Textarea placeholder={t({
                english: "Mô tả công việc bằng tiếng Việt",
                vietnamese: "Mô tả công việc bằng tiếng Việt"
              })} className="resize-none" {...field} />
            </FormControl>
            <FormDescription>
              {t({
                english: "Provide a description in Vietnamese to attract more candidates.",
                vietnamese: "Cung cấp mô tả bằng tiếng Việt để thu hút thêm ứng viên."
              })}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t({
              english: "Location",
              vietnamese: "Địa điểm"
            })}</FormLabel>
            <FormControl>
              <Input placeholder={t({
                english: "e.g., Ho Chi Minh City",
                vietnamese: "vd., Thành phố Hồ Chí Minh"
              })} {...field} />
            </FormControl>
            <FormDescription>
              {t({
                english: "Where is the job located?",
                vietnamese: "Công việc ở đâu?"
              })}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default JobDetailsSection;
