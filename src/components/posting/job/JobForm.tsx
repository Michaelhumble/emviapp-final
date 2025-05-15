import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Loader2, Wand2 } from "lucide-react";
import { useTranslation } from '@/hooks/useTranslation';
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import JobPostPhotoUpload from './JobPostPhotoUpload';
import PolishedDescriptionsModal from './PolishedDescriptionsModal';

interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  isSubmitting: boolean;
  defaultValues?: Partial<JobFormValues>;
}

const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  photoUploads,
  setPhotoUploads,
  isSubmitting,
  defaultValues = {}
}) => {
  const { isVietnamese } = useTranslation();

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues,
    mode: "onChange"
  })

  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const handleAiPolish = () => {
    setIsAiModalOpen(true);
  };

  const handleTemplateSelect = (template: string) => {
    form.setValue("description", template, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isVietnamese ? "Tiêu đề công việc" : "Job Title"}</FormLabel>
                  <FormControl>
                    <Input placeholder={isVietnamese ? "Tuyển thợ nail..." : "Nail Technician Wanted..."} {...field} />
                  </FormControl>
                  <FormDescription>
                    {isVietnamese ? "Đặt tiêu đề hấp dẫn để thu hút ứng viên." : "Give your job posting a catchy title."}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isVietnamese ? "Địa điểm làm việc" : "Location"}</FormLabel>
                  <FormControl>
                    <Input placeholder={isVietnamese ? "Địa chỉ tiệm..." : "Shop Address..."} {...field} />
                  </FormControl>
                  <FormDescription>
                    {isVietnamese ? "Nhập địa chỉ chính xác để ứng viên dễ tìm." : "Enter the exact shop address for easy navigation."}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isVietnamese ? "Loại công việc" : "Job Type"}</FormLabel>
                  <FormControl>
                    <Input placeholder={isVietnamese ? "Ví dụ: Thợ Nail..." : "e.g., Nail Technician..."} {...field} />
                  </FormControl>
                  <FormDescription>
                    {isVietnamese ? "Ví dụ: thợ nail, thợ mi, ..." : "e.g., nail technician, lash artist, ..."}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel>{isVietnamese ? "Mô tả công việc" : "Job Description"}</FormLabel>
                    <Button 
                      type="button"
                      variant="outline"
                      size="sm"
                      className="text-xs flex items-center gap-1"
                      onClick={handleAiPolish}
                    >
                      <Wand2 size={14} />
                      {isVietnamese ? "Làm đẹp bằng AI" : "Polish with AI"}
                    </Button>
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder={isVietnamese ? "Mô tả chi tiết về công việc..." : "Describe the job in detail..."}
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div>
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isVietnamese ? "Email liên hệ" : "Contact Email"}</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" type="email" {...field} />
                  </FormControl>
                  <FormDescription>
                    {isVietnamese ? "Địa chỉ email để ứng viên liên hệ." : "Email address for applicants to contact."}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div>
            <FormField
              control={form.control}
              name="contactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isVietnamese ? "Số điện thoại liên hệ" : "Contact Phone"}</FormLabel>
                  <FormControl>
                    <Input placeholder="123-456-7890" type="tel" {...field} />
                  </FormControl>
                  <FormDescription>
                    {isVietnamese ? "Số điện thoại để ứng viên liên hệ." : "Phone number for applicants to contact."}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormLabel>{isVietnamese ? "Hình ảnh" : "Photos"}</FormLabel>
            <FormDescription>
              {isVietnamese ? "Thêm hình ảnh về tiệm của bạn (tùy chọn)." : "Add photos of your shop (optional)."}
            </FormDescription>
            <JobPostPhotoUpload
              photoUploads={photoUploads}
              setPhotoUploads={setPhotoUploads}
            />
          </div>
          
          <div className="pt-4 border-t">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isVietnamese ? "Đang xử lý..." : "Processing..."}
                </>
              ) : (
                isVietnamese ? "Tiếp tục để chọn gói đăng tin" : "Continue to Pricing"
              )}
            </Button>
          </div>
        </form>
      </Form>
      
      <PolishedDescriptionsModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onSelectTemplate={handleTemplateSelect}
        jobType={form.watch("type")} // Pass the current job type
      />
    </>
  );
};

export default JobForm;
