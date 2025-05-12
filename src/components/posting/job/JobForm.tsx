
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import { useTranslation } from '@/hooks/useTranslation';
import { getJobTemplate, getVietnameseTemplate } from '@/utils/jobTemplates';
import { UserProfile } from '@/types/user';

interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  isSubmitting: boolean;
  defaultValues?: Partial<JobFormValues>;
  industry?: string;
  userProfile?: UserProfile;
}

export const JobForm: React.FC<JobFormProps> = ({ 
  onSubmit,
  photoUploads,
  setPhotoUploads,
  isSubmitting,
  defaultValues,
  industry = "nails",
  userProfile
}) => {
  const { t, isVietnamese, toggleLanguage } = useTranslation();
  const [showVietnameseForm, setShowVietnameseForm] = useState(isVietnamese);
  
  // Setup form with default values
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      salary: "",
      contactEmail: userProfile?.email || "",
      phoneNumber: "",
      jobType: "full-time",
      requirements: [],
      jobSummary: "",
      ...defaultValues
    }
  });
  
  // Toggle between English and Vietnamese templates
  useEffect(() => {
    if (industry === "nails") {
      const template = showVietnameseForm 
        ? getVietnameseTemplate(industry)
        : getJobTemplate(industry, { 
            phoneNumber: userProfile?.phone,
            email: userProfile?.email
          });
          
      if (template) {
        Object.entries(template).forEach(([key, value]) => {
          if (value && !form.getValues(key as keyof JobFormValues)) {
            form.setValue(key as keyof JobFormValues, value as any);
          }
        });
      }
    }
  }, [showVietnameseForm, industry, form, userProfile]);
  
  // Handle file input changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setPhotoUploads((prevUploads: File[]) => [...prevUploads, ...newFiles]);
    }
  };
  
  // Remove a file from uploads
  const removeFile = (index: number) => {
    setPhotoUploads((prevUploads: File[]) => {
      const newUploads = [...prevUploads];
      newUploads.splice(index, 1);
      return newUploads;
    });
  };
  
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6">
      {/* Form Title */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-medium text-gray-900">
          {t("Job Details", "Chi tiết công việc")}
        </h3>
        <p className="text-gray-500 mt-1">
          {t("Tell us about the position you're hiring for", "Cho chúng tôi biết về vị trí bạn đang tuyển dụng")}
        </p>
      </div>
      
      {/* Job Title */}
      <div className="space-y-2">
        <Label htmlFor="title">
          {t("Job Title", "Tiêu đề công việc")} *
        </Label>
        <Input
          id="title"
          placeholder={t("e.g. Nail Technician - Full Time", "VD: Thợ Nail - Toàn thời gian")}
          {...form.register("title")}
          className="w-full"
        />
        {form.formState.errors.title && (
          <p className="text-red-500 text-sm">{form.formState.errors.title.message}</p>
        )}
      </div>
      
      {/* Job Summary */}
      <div className="space-y-2">
        <Label htmlFor="jobSummary">
          {t("Job Summary", "Tóm tắt công việc")}
        </Label>
        <Input
          id="jobSummary"
          placeholder={t("Brief overview of the position (1-2 sentences)", "Mô tả ngắn về vị trí (1-2 câu)")}
          {...form.register("jobSummary")}
          className="w-full"
        />
      </div>
      
      {/* Job Description */}
      <div className="space-y-2">
        <Label htmlFor="description">
          {t("Job Description", "Mô tả công việc")} *
        </Label>
        <Textarea
          id="description"
          placeholder={t("Describe the job responsibilities, work environment, etc.", "Mô tả trách nhiệm công việc, môi trường làm việc, v.v.")}
          {...form.register("description")}
          rows={6}
        />
        {form.formState.errors.description && (
          <p className="text-red-500 text-sm">{form.formState.errors.description.message}</p>
        )}
      </div>
      
      {/* Job Type */}
      <div className="space-y-2">
        <Label htmlFor="jobType">
          {t("Job Type", "Loại công việc")}
        </Label>
        <Select
          defaultValue={form.getValues("jobType") || "full-time"}
          onValueChange={(value) => {
            form.setValue("jobType", value as "full-time" | "part-time" | "contract" | "temporary");
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("Select job type", "Chọn loại công việc")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full-time">{t("Full Time", "Toàn thời gian")}</SelectItem>
            <SelectItem value="part-time">{t("Part Time", "Bán thời gian")}</SelectItem>
            <SelectItem value="contract">{t("Contract", "Hợp đồng")}</SelectItem>
            <SelectItem value="temporary">{t("Temporary", "Tạm thời")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="location">
          {t("Location", "Địa điểm")} *
        </Label>
        <Input
          id="location"
          placeholder={t("e.g. San Jose, CA", "VD: San Jose, CA")}
          {...form.register("location")}
          className="w-full"
        />
        {form.formState.errors.location && (
          <p className="text-red-500 text-sm">{form.formState.errors.location.message}</p>
        )}
      </div>
      
      {/* Salary */}
      <div className="space-y-2">
        <Label htmlFor="salary">
          {t("Salary", "Lương")}
        </Label>
        <Input
          id="salary"
          placeholder={t("e.g. $1200/week or $25-30/hour", "VD: $1200/tuần hoặc $25-30/giờ")}
          {...form.register("salary")}
          className="w-full"
        />
      </div>
      
      {/* Contact Information */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900">
          {t("Contact Information", "Thông tin liên hệ")}
        </h4>
        
        <div className="space-y-2">
          <Label htmlFor="contactEmail">
            {t("Contact Email", "Email liên hệ")}
          </Label>
          <Input
            id="contactEmail"
            type="email"
            placeholder={t("Email where applications will be sent", "Email nhận đơn ứng tuyển")}
            {...form.register("contactEmail")}
            className="w-full"
          />
          {form.formState.errors.contactEmail && (
            <p className="text-red-500 text-sm">{form.formState.errors.contactEmail.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phoneNumber">
            {t("Phone Number", "Số điện thoại")}
          </Label>
          <Input
            id="phoneNumber"
            placeholder={t("e.g. (408) 555-1234", "VD: (408) 555-1234")}
            {...form.register("phoneNumber")}
            className="w-full"
          />
        </div>
      </div>
      
      {/* Photo Upload */}
      <div className="space-y-3">
        <Label>
          {t("Add Nail Photos (Optional)", "Thêm hình ảnh (Tùy chọn)")}
        </Label>
        <div className="border border-gray-200 rounded-lg p-4 bg-gradient-to-r from-purple-50 to-pink-50">
          <label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg bg-white/80 hover:bg-white transition-colors">
            <div className="flex flex-col items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-medium text-gray-600">{t("Upload photos", "Tải hình lên")}</span>
              <span className="text-xs text-gray-500 mt-1">
                {t("JPG, PNG or GIF, up to 10MB", "JPG, PNG hoặc GIF, tối đa 10MB")}
              </span>
              {photoUploads.length === 0 && (
                <div className="text-primary text-sm mt-1">✨ {t("Add photos to attract more applicants!", "Thêm hình để thu hút nhiều ứng viên hơn!")} ✨</div>
              )}
            </div>
            <input
              id="photo-upload"
              type="file"
              multiple
              accept="image/jpeg, image/png, image/gif"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          
          {photoUploads.length > 0 && (
            <div className="mt-4">
              <div className="text-sm font-medium mb-2">{t("Uploaded Photos", "Hình đã tải lên")} ({photoUploads.length})</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {photoUploads.map((file, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-md overflow-hidden border border-gray-200">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Language Toggle if industry is nails */}
      {industry === "nails" && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => {
              setShowVietnameseForm(!showVietnameseForm);
              toggleLanguage();
            }}
            className="inline-flex items-center px-4 py-2 border border-purple-200 rounded-full text-sm font-medium text-purple-700 bg-purple-50 hover:bg-purple-100"
          >
            {showVietnameseForm ? "Switch to English" : "Chuyển sang tiếng Việt"}
            <span className="ml-2">{showVietnameseForm ? "🇺🇸" : "🇻🇳"}</span>
          </button>
        </div>
      )}
    </form>
  );
};

export default JobForm;
