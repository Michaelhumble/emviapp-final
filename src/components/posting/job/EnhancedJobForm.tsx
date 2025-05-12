
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useTranslation } from '@/hooks/useTranslation';
import { PricingOptions } from '@/types/job';

interface EnhancedJobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  isSubmitting: boolean;
  pricingOptions?: PricingOptions;
  setPricingOptions?: React.Dispatch<React.SetStateAction<PricingOptions>>;
}

const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({ 
  onSubmit, 
  photoUploads, 
  setPhotoUploads, 
  isSubmitting,
  pricingOptions,
  setPricingOptions
}) => {
  const { t, isVietnamese } = useTranslation();
  
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      salary: '',
      contactEmail: '',
      phoneNumber: '',
      jobType: 'full-time',
      requirements: [],
      jobSummary: '',
      weeklyPay: false
    }
  });

  const handleSubmit = (values: JobFormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("Job Title", "Tiêu Đề Công Việc")}</FormLabel>
              <FormControl>
                <Input placeholder={t("Enter job title", "Nhập tiêu đề công việc")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("Location", "Địa Điểm")}</FormLabel>
              <FormControl>
                <Input placeholder={t("Enter location", "Nhập địa điểm")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="jobType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("Employment Type", "Loại Công Việc")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value as string}>
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
          control={form.control}
          name="salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("Salary", "Lương")}</FormLabel>
              <FormControl>
                <Input placeholder={t("Enter salary", "Nhập lương")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("Job Description", "Mô Tả Công Việc")}</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={t(
                    "Enter detailed job description", 
                    "Nhập mô tả chi tiết công việc"
                  )}
                  rows={5}
                  {...field} 
                />
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
              <FormLabel>{t("Contact Email", "Email Liên Hệ")}</FormLabel>
              <FormControl>
                <Input type="email" placeholder={t("Enter contact email", "Nhập email liên hệ")} {...field} />
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
              <FormLabel>{t("Contact Phone", "Số Điện Thoại Liên Hệ")}</FormLabel>
              <FormControl>
                <Input type="tel" placeholder={t("Enter phone number", "Nhập số điện thoại")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="weeklyPay"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  {t("Weekly Pay Available", "Có Trả Lương Hàng Tuần")}
                </FormLabel>
                <p className="text-sm text-muted-foreground">
                  {t(
                    "Check if you offer weekly payment options", 
                    "Đánh dấu nếu bạn cung cấp tùy chọn thanh toán hàng tuần"
                  )}
                </p>
              </div>
            </FormItem>
          )}
        />
        
        {/* Visibility Options */}
        <div className="border rounded-md p-4 space-y-4">
          <h3 className="font-medium">{t("Visibility Options", "Tùy Chọn Hiển Thị")}</h3>
          
          <div className="flex items-start space-x-3">
            <Checkbox
              id="nationwide"
              checked={pricingOptions?.isNationwide}
              onCheckedChange={(checked) => 
                setPricingOptions && setPricingOptions(prev => ({...prev, isNationwide: !!checked}))
              }
            />
            <div className="space-y-1 leading-none">
              <label htmlFor="nationwide" className="font-medium cursor-pointer">
                {t("Nationwide Visibility", "Hiển Thị Toàn Quốc")}
              </label>
              <p className="text-sm text-muted-foreground">
                {t(
                  "Add $5.00 to show your job nationwide", 
                  "Thêm $5.00 để hiển thị công việc của bạn toàn quốc"
                )}
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Checkbox
              id="fastSale"
              checked={pricingOptions?.fastSalePackage}
              onCheckedChange={(checked) => 
                setPricingOptions && setPricingOptions(prev => ({...prev, fastSalePackage: !!checked}))
              }
            />
            <div className="space-y-1 leading-none">
              <label htmlFor="fastSale" className="font-medium cursor-pointer">
                {t("Fast Sale Package", "Gói Bán Nhanh")}
              </label>
              <p className="text-sm text-muted-foreground">
                {t(
                  "Add $5.00 for featured placement and promotion", 
                  "Thêm $5.00 cho vị trí nổi bật và khuyến mãi"
                )}
              </p>
            </div>
          </div>
        </div>
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? t("Submitting...", "Đang gửi...") : t("Submit Job Posting", "Gửi Đăng Tin Việc Làm")}
        </Button>
      </form>
    </Form>
  );
};

export default EnhancedJobForm;
