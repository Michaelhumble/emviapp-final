
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { JobDetailsSubmission } from '@/types/job';
import { useTranslation } from '@/hooks/useTranslation';

interface JobPostFormProps {
  onSubmit: (data: JobDetailsSubmission) => void;
}

const JobPostForm: React.FC<JobPostFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation();
  const [isUrgent, setIsUrgent] = useState(false);
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<JobDetailsSubmission>({
    defaultValues: {
      title: '',
      description: '',
      vietnamese_description: '',
      location: '',
      compensation_type: 'hourly',
      compensation_details: '',
      employment_type: 'full-time',
      contact_info: {
        owner_name: '',
        phone: '',
        email: ''
      }
    }
  });

  const handleFormSubmit = (data: JobDetailsSubmission) => {
    // Add the urgent flag
    const enhancedData = {
      ...data,
      is_urgent: isUrgent
    };
    
    onSubmit(enhancedData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{t("Job Details", "Chi tiết công việc")}</h2>
        
        <div className="space-y-3">
          <div>
            <Label htmlFor="title">{t("Job Title", "Tiêu đề công việc")} *</Label>
            <Input 
              id="title"
              {...register('title', { required: true })}
              placeholder={t("e.g. Nail Technician, Nail Artist", "vd: Thợ nail, Nghệ sĩ nail")}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{t("Job title is required", "Vui lòng nhập tiêu đề công việc")}</p>}
          </div>

          <div>
            <Label htmlFor="location">{t("Location", "Địa điểm")} *</Label>
            <Input 
              id="location"
              {...register('location', { required: true })}
              placeholder={t("e.g. San Jose, CA", "vd: San Jose, CA")}
              className={errors.location ? "border-red-500" : ""}
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{t("Location is required", "Vui lòng nhập địa điểm")}</p>}
          </div>

          <div>
            <Label htmlFor="employment_type">{t("Employment Type", "Loại việc làm")}</Label>
            <Select 
              defaultValue="full-time" 
              onValueChange={(value) => setValue('employment_type', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("Select employment type", "Chọn loại việc làm")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">{t("Full-time", "Toàn thời gian")}</SelectItem>
                <SelectItem value="part-time">{t("Part-time", "Bán thời gian")}</SelectItem>
                <SelectItem value="contract">{t("Contract", "Hợp đồng")}</SelectItem>
                <SelectItem value="temporary">{t("Temporary", "Tạm thời")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="compensation_type">{t("Compensation Type", "Hình thức trả lương")}</Label>
            <Select 
              defaultValue="hourly" 
              onValueChange={(value) => setValue('compensation_type', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("Select compensation type", "Chọn hình thức trả lương")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">{t("Hourly", "Theo giờ")}</SelectItem>
                <SelectItem value="commission">{t("Commission", "Hoa hồng")}</SelectItem>
                <SelectItem value="salary">{t("Salary", "Lương")}</SelectItem>
                <SelectItem value="mixed">{t("Mixed", "Kết hợp")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="compensation_details">{t("Compensation Details", "Chi tiết lương")}</Label>
            <Input 
              id="compensation_details"
              {...register('compensation_details')}
              placeholder={t("e.g. $25-35/hr plus tips", "vd: $25-35/giờ cộng tiền típ")}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{t("Job Description", "Mô tả công việc")}</h2>
        
        <div>
          <Label htmlFor="description">{t("English Description", "Mô tả bằng tiếng Anh")}</Label>
          <Textarea 
            id="description"
            {...register('description')}
            placeholder={t("Describe the job, responsibilities, and requirements", "Mô tả công việc, trách nhiệm và yêu cầu")}
            rows={5}
          />
        </div>

        <div>
          <Label htmlFor="vietnamese_description">{t("Vietnamese Description (Optional)", "Mô tả bằng tiếng Việt (Tùy chọn)")}</Label>
          <Textarea 
            id="vietnamese_description"
            {...register('vietnamese_description')}
            placeholder={t("Provide a Vietnamese translation to reach more candidates", "Cung cấp bản dịch tiếng Việt để tiếp cận nhiều ứng viên hơn")}
            rows={5}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{t("Contact Information", "Thông tin liên hệ")}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="owner_name">{t("Contact Name", "Tên liên hệ")}</Label>
            <Input 
              id="owner_name"
              {...register('contact_info.owner_name')}
              placeholder={t("e.g. John Smith", "vd: Nguyễn Văn A")}
            />
          </div>

          <div>
            <Label htmlFor="email">{t("Email", "Email")}</Label>
            <Input 
              id="email"
              type="email"
              {...register('contact_info.email')}
              placeholder={t("e.g. contact@yourcompany.com", "vd: lienhe@congty.com")}
            />
          </div>

          <div>
            <Label htmlFor="phone">{t("Phone Number", "Số điện thoại")}</Label>
            <Input 
              id="phone"
              type="tel"
              {...register('contact_info.phone')}
              placeholder={t("e.g. (123) 456-7890", "vd: (123) 456-7890")}
            />
          </div>
        </div>
      </div>

      <div className="pt-2">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="is_urgent" 
            checked={isUrgent} 
            onCheckedChange={(checked) => setIsUrgent(checked as boolean)} 
          />
          <Label htmlFor="is_urgent" className="font-normal cursor-pointer">
            {t("Mark as urgent hiring", "Đánh dấu là tuyển dụng khẩn cấp")}
          </Label>
        </div>
      </div>

      <div className="pt-4 border-t">
        <Button type="submit" className="w-full md:w-auto">
          {t("Continue to Select Plan", "Tiếp tục chọn gói đăng tin")}
        </Button>
      </div>
    </form>
  );
};

export default JobPostForm;
