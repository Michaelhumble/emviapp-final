import React, { useCallback, useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { ImageIcon, Plus, Trash } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { UserProfile } from '@/types/user';

interface JobFormProps {
  onSubmit: SubmitHandler<JobFormValues>;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  isSubmitting: boolean;
  defaultValues?: JobFormValues;
  industry?: string;
  userProfile?: UserProfile | null;
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
  const { t, isVietnamese } = useTranslation();
  
  // Define the schema for file uploads
  const MAX_UPLOAD_SIZE = 5 * 1024 * 1024; // 5MB
  const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  
  const imageSchema = z.instanceof(File)
    .refine((file) => file.size <= MAX_UPLOAD_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    );
  
  const uploadSchema = z.array(imageSchema).max(3, "You can only upload up to 3 images");
  
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: defaultValues || {
      title: "",
      description: "",
      location: "",
      salary: "",
      contactEmail: userProfile?.email || "",
      phoneNumber: userProfile?.phone_number || "",
      jobType: "full-time",
      requirements: [],
      jobSummary: "",
      weeklyPay: false
    },
    mode: "onChange"
  });
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = form;
  
  const watchAllFields = watch(); // This will watch all fields
  
  // Handle file uploads
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null); // Clear previous errors
    
    const files = Array.from(e.target.files || []);
    
    try {
      uploadSchema.parse(files);
      setPhotoUploads(files);
    } catch (error: any) {
      setUploadError(error.message);
      toast.error(error.message);
    }
  };
  
  // Handle removing a specific photo
  const handleRemovePhoto = (indexToRemove: number) => {
    setPhotoUploads(prevUploads => prevUploads.filter((_, index) => index !== indexToRemove));
  };
  
  // Function to display file upload previews
  const PhotoPreviews = () => {
    return (
      <div className="flex flex-wrap gap-3 mt-4">
        {photoUploads.map((file, index) => (
          <div key={index} className="relative">
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="w-32 h-32 rounded-md object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemovePhoto(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
            >
              <Trash className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
      {/* Job Title */}
      <div>
        <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
          {t("Job Title", "Tiêu đề công việc")}
        </Label>
        <Input
          type="text"
          id="title"
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          placeholder={t("e.g., Nail Technician", "Ví dụ: Thợ làm móng")}
          {...register('title')}
        />
        {errors.title && (
          <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>
      
      {/* Job Description */}
      <div>
        <Label htmlFor="description" className="block text-sm font-medium text-gray-700">
          {t("Job Description", "Mô tả công việc")}
        </Label>
        <Textarea
          id="description"
          rows={4}
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          placeholder={t("Describe the job responsibilities and requirements", "Mô tả trách nhiệm và yêu cầu công việc")}
          {...register('description')}
        />
        {errors.description && (
          <p className="mt-2 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>
      
      {/* Location */}
      <div>
        <Label htmlFor="location" className="block text-sm font-medium text-gray-700">
          {t("Location", "Địa điểm")}
        </Label>
        <Input
          type="text"
          id="location"
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          placeholder={t("City, State", "Thành phố, Tiểu bang")}
          {...register('location')}
        />
        {errors.location && (
          <p className="mt-2 text-sm text-red-600">{errors.location.message}</p>
        )}
      </div>
      
      {/* Salary */}
      <div>
        <Label htmlFor="salary" className="block text-sm font-medium text-gray-700">
          {t("Salary (Optional)", "Mức lương (Tùy chọn)")}
        </Label>
        <Input
          type="text"
          id="salary"
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          placeholder={t("e.g., $15 - $25 per hour", "Ví dụ: $15 - $25 mỗi giờ")}
          {...register('salary')}
        />
        {errors.salary && (
          <p className="mt-2 text-sm text-red-600">{errors.salary.message}</p>
        )}
      </div>
      
      {/* Contact Email */}
      <div>
        <Label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
          {t("Contact Email (Optional)", "Email liên hệ (Tùy chọn)")}
        </Label>
        <Input 
          type="email" 
          placeholder={t("Your email for applicants", "Email của bạn cho ứng viên")} 
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          {...register('contactEmail')}
        />
        {errors.contactEmail && (
          <p className="mt-2 text-sm text-red-600">{errors.contactEmail.message}</p>
        )}
      </div>
      
      {/* Phone Number */}
      <div>
        <Label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
          {t("Phone Number (Optional)", "Số điện thoại (Tùy chọn)")}
        </Label>
        <Input 
          type="tel" 
          placeholder={t("Your phone number for applicants", "Số điện thoại của bạn cho ứng viên")} 
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          {...register('phoneNumber')}
        />
        {errors.phoneNumber && (
          <p className="mt-2 text-sm text-red-600">{errors.phoneNumber.message}</p>
        )}
      </div>
      
      {/* Job Type */}
      <div>
        <Label htmlFor="jobType" className="block text-sm font-medium text-gray-700">
          {t("Job Type", "Loại công việc")}
        </Label>
        <Select onValueChange={(value) => setValue('jobType', value)}>
          <SelectTrigger className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary">
            <SelectValue placeholder={t("Select a job type", "Chọn một loại công việc")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full-time">{t("Full-time", "Toàn thời gian")}</SelectItem>
            <SelectItem value="part-time">{t("Part-time", "Bán thời gian")}</SelectItem>
            <SelectItem value="contract">{t("Contract", "Hợp đồng")}</SelectItem>
            <SelectItem value="temporary">{t("Temporary", "Tạm thời")}</SelectItem>
          </SelectContent>
        </Select>
        {errors.jobType && (
          <p className="mt-2 text-sm text-red-600">{errors.jobType.message}</p>
        )}
      </div>
      
      {/* Requirements */}
      <div>
        <Label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
          {t("Requirements (Optional)", "Yêu cầu (Tùy chọn)")}
        </Label>
        <Input
          type="text"
          id="requirements"
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          placeholder={t("e.g., 2 years experience, license", "Ví dụ: 2 năm kinh nghiệm, bằng cấp")}
          {...register('requirements')}
        />
        {errors.requirements && (
          <p className="mt-2 text-sm text-red-600">{errors.requirements.message}</p>
        )}
      </div>
      
      {/* Job Summary */}
      <div>
        <Label htmlFor="jobSummary" className="block text-sm font-medium text-gray-700">
          {t("Job Summary (Optional)", "Tóm tắt công việc (Tùy chọn)")}
        </Label>
        <Textarea
          id="jobSummary"
          rows={2}
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          placeholder={t("Summarize the job in a few sentences", "Tóm tắt công việc trong vài câu")}
          {...register('jobSummary')}
        />
        {errors.jobSummary && (
          <p className="mt-2 text-sm text-red-600">{errors.jobSummary.message}</p>
        )}
      </div>
      
      {/* Photo Uploads */}
      <div>
        <Label className="block text-sm font-medium text-gray-700">
          {t("Upload Photos (Optional)", "Tải ảnh lên (Tùy chọn)")}
        </Label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md border-gray-300">
          <div className="space-y-1 text-center">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
              >
                <span>{t("Upload a file", "Tải lên một tệp")}</span>
                <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleFileChange} accept="image/*" />
              </label>
              <p className="pl-1">{t("or drag and drop", "hoặc kéo và thả")}</p>
            </div>
            <p className="text-xs text-gray-500">
              {t("PNG, JPG, GIF up to 5MB", "PNG, JPG, GIF tối đa 5MB")}
            </p>
          </div>
        </div>
        
        {/* Display photo previews */}
        <PhotoPreviews />
        
        {uploadError && (
          <p className="mt-2 text-sm text-red-600">{uploadError}</p>
        )}
      </div>
      
      {/* Submit Button */}
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? t("Submitting...", "Đang gửi...") : t("Submit", "Gửi")}
      </Button>
    </form>
  );
};
