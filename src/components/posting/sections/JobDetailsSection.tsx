
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from '@/hooks/useTranslation';
import { JobDetailsSubmission } from '@/types/job';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const JobDetailsSection = () => {
  const { t } = useTranslation();
  const { control } = useFormContext<Partial<JobDetailsSubmission>>();

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">{t("Job Details", "Chi tiết công việc")}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("Job Title", "Tiêu đề công việc")}</FormLabel>
              <FormControl>
                <Input 
                  placeholder={t("e.g. Experienced Nail Technician", "VD: Thợ nails lành nghề")} 
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("Location", "Vị trí")}</FormLabel>
              <FormControl>
                <Input 
                  placeholder={t("e.g. Chicago, IL", "VD: Chicago, IL")} 
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={control}
        name="jobType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("Job Type", "Loại công việc")}</FormLabel>
            <Select 
              onValueChange={field.onChange}
              defaultValue={field.value}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t("Select job type", "Chọn loại công việc")} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="full-time">{t("Full-time", "Toàn thời gian")}</SelectItem>
                <SelectItem value="part-time">{t("Part-time", "Bán thời gian")}</SelectItem>
                <SelectItem value="contract">{t("Contract", "Hợp đồng")}</SelectItem>
                <SelectItem value="temporary">{t("Temporary", "Tạm thời")}</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="jobSummary"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("Job Summary", "Tóm tắt công việc")}</FormLabel>
            <FormControl>
              <Input 
                placeholder={t("Brief summary of the position", "Tóm tắt ngắn gọn về vị trí")} 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("Job Description", "Mô tả công việc")}</FormLabel>
            <FormControl>
              <Textarea 
                placeholder={t("Detailed job description and responsibilities", "Mô tả chi tiết công việc và trách nhiệm")} 
                className="min-h-[150px]" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default JobDetailsSection;
