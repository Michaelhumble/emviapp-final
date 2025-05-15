
import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobFormSchema, JobFormValues } from "./jobFormSchema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useTranslation } from "@/hooks/useTranslation";
import { getPrefillContent, PROFESSIONAL_TYPES_EN, PROFESSIONAL_TYPES_VI, JOB_TYPES_EN, JOB_TYPES_VI } from "./jobFormConstants";
import JobTemplateSelector from "./JobTemplateSelector";
import YesLadder from "./YesLadder";
import JobPostHeader from "./JobPostHeader";
import LanguageSelector from "./LanguageSelector";
import { Loader2 } from "lucide-react";

// Form fields
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  isSubmitting?: boolean;
  defaultValues?: Partial<JobFormValues>;
}

const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  photoUploads,
  setPhotoUploads,
  isSubmitting = false,
  defaultValues = {}
}) => {
  const { isVietnamese } = useTranslation();
  const [professionalType, setProfessionalType] = useState<string>("");
  const [enhancementOptions, setEnhancementOptions] = useState<Record<string, boolean>>({});
  
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      type: "",
      compensation: "",
      contactEmail: "",
      contactPhone: "",
      isUrgent: false,
      ...defaultValues
    }
  });

  const handleProfessionalTypeChange = (value: string) => {
    setProfessionalType(value);
    
    // Get prefilled content based on professional type
    const content = getPrefillContent(value, isVietnamese);
    
    if (content) {
      form.setValue("title", content.title);
      form.setValue("description", content.description);
      form.setValue("type", content.type);
    }
  };
  
  const handleTemplateSelect = (templateValues: Partial<JobFormValues>) => {
    Object.entries(templateValues).forEach(([key, value]) => {
      if (value !== undefined) {
        form.setValue(key as any, value);
      }
    });
  };
  
  const handleYesLadderChange = (questionId: string, value: boolean) => {
    setEnhancementOptions(prev => ({
      ...prev,
      [questionId]: value
    }));
    
    // Update the form values accordingly
    if (questionId === 'urgent_tag' && value !== undefined) {
      form.setValue('isUrgent', value);
    }
  };

  const formSubmit = (values: JobFormValues) => {
    // Combine form values with enhancement options
    const enhancedValues = {
      ...values,
      enhancementOptions
    };
    
    onSubmit(enhancedValues);
  };

  useEffect(() => {
    // Update form when language changes
    if (professionalType) {
      const content = getPrefillContent(professionalType, isVietnamese);
      if (content) {
        form.setValue("title", content.title);
        form.setValue("description", content.description);
        form.setValue("type", content.type);
      }
    }
  }, [isVietnamese]);

  return (
    <div className="max-w-3xl mx-auto">
      <JobPostHeader />
      
      <LanguageSelector />
      
      <JobTemplateSelector onSelectTemplate={handleTemplateSelect} />
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(formSubmit)} className="space-y-6">
            <div className="space-y-4">
              {/* Professional Type */}
              <div className="space-y-2">
                <Label htmlFor="professionalType" className="text-base">
                  {isVietnamese ? "Loại Thợ" : "Professional Type"} *
                </Label>
                <Select
                  value={professionalType}
                  onValueChange={handleProfessionalTypeChange}
                >
                  <SelectTrigger id="professionalType" className="w-full">
                    <SelectValue placeholder={isVietnamese ? "Chọn loại thợ" : "Select professional type"} />
                  </SelectTrigger>
                  <SelectContent>
                    {(isVietnamese ? PROFESSIONAL_TYPES_VI : PROFESSIONAL_TYPES_EN).map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Job Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base">
                  {isVietnamese ? "Tiêu Đề Công Việc" : "Job Title"} *
                </Label>
                <Input
                  id="title"
                  {...form.register("title")}
                  className="w-full"
                  placeholder={isVietnamese ? "Nhập tiêu đề công việc" : "Enter job title"}
                />
                {form.formState.errors.title && (
                  <p className="text-red-500 text-sm">{form.formState.errors.title.message}</p>
                )}
              </div>

              {/* Job Type */}
              <div className="space-y-2">
                <Label htmlFor="type" className="text-base">
                  {isVietnamese ? "Loại Công Việc" : "Job Type"} *
                </Label>
                <Select
                  value={form.watch("type")}
                  onValueChange={(value) => form.setValue("type", value)}
                >
                  <SelectTrigger id="type" className="w-full">
                    <SelectValue placeholder={isVietnamese ? "Chọn loại công việc" : "Select job type"} />
                  </SelectTrigger>
                  <SelectContent>
                    {(isVietnamese ? JOB_TYPES_VI : JOB_TYPES_EN).map((type) => (
                      <SelectItem key={type.value} value={type.label}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.type && (
                  <p className="text-red-500 text-sm">{form.formState.errors.type.message}</p>
                )}
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-base">
                  {isVietnamese ? "Địa Điểm" : "Location"} *
                </Label>
                <Input
                  id="location"
                  {...form.register("location")}
                  className="w-full"
                  placeholder={isVietnamese ? "Nhập địa chỉ" : "Enter location"}
                />
                {form.formState.errors.location && (
                  <p className="text-red-500 text-sm">{form.formState.errors.location.message}</p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-base">
                  {isVietnamese ? "Mô Tả Công Việc" : "Job Description"} *
                </Label>
                <Textarea
                  id="description"
                  {...form.register("description")}
                  className="w-full min-h-[150px]"
                  placeholder={isVietnamese ? "Mô tả chi tiết về công việc" : "Describe the job in detail"}
                />
                {form.formState.errors.description && (
                  <p className="text-red-500 text-sm">{form.formState.errors.description.message}</p>
                )}
              </div>

              {/* Compensation */}
              <div className="space-y-2">
                <Label htmlFor="compensation" className="text-base">
                  {isVietnamese ? "Lương/Hoa Hồng" : "Compensation"} 
                  <span className="text-gray-500 ml-1 text-sm">
                    ({isVietnamese ? "Tùy chọn" : "Optional"})
                  </span>
                </Label>
                <Input
                  id="compensation"
                  {...form.register("compensation")}
                  className="w-full"
                  placeholder={isVietnamese ? "Ví dụ: $20-25/giờ hoặc 60% hoa hồng" : "E.g., $20-25/hr or 60% commission"}
                />
              </div>

              {/* Contact Information */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h3 className="font-medium text-lg">
                  {isVietnamese ? "Thông Tin Liên Hệ" : "Contact Information"}
                </h3>
                
                {/* Contact Email */}
                <div className="space-y-2">
                  <Label htmlFor="contactEmail" className="text-base">
                    {isVietnamese ? "Email" : "Email"} *
                  </Label>
                  <Input
                    id="contactEmail"
                    {...form.register("contactEmail")}
                    className="w-full"
                    placeholder={isVietnamese ? "Nhập email liên hệ" : "Enter contact email"}
                    type="email"
                  />
                  {form.formState.errors.contactEmail && (
                    <p className="text-red-500 text-sm">{form.formState.errors.contactEmail.message}</p>
                  )}
                </div>
                
                {/* Contact Phone */}
                <div className="space-y-2">
                  <Label htmlFor="contactPhone" className="text-base">
                    {isVietnamese ? "Số Điện Thoại" : "Phone Number"} *
                  </Label>
                  <Input
                    id="contactPhone"
                    {...form.register("contactPhone")}
                    className="w-full"
                    placeholder={isVietnamese ? "Nhập số điện thoại" : "Enter contact phone"}
                    type="tel"
                  />
                  {form.formState.errors.contactPhone && (
                    <p className="text-red-500 text-sm">{form.formState.errors.contactPhone.message}</p>
                  )}
                </div>
              </div>
              
              {/* Photos section would go here - placeholder for now */}
              <div className="space-y-2">
                <Label className="text-base flex items-center gap-2">
                  <span>{isVietnamese ? "Thêm Hình Ảnh" : "Add Photos"}</span>
                  <span className="text-gray-500 text-sm">
                    ({isVietnamese ? "Tùy chọn" : "Optional"})
                  </span>
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <p className="text-gray-500">
                    {isVietnamese 
                      ? "Kéo và thả hình ảnh vào đây hoặc nhấp để chọn" 
                      : "Drag and drop images here or click to select"}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Yes Ladder Section */}
            <YesLadder onYesAnswered={handleYesLadderChange} />
            
            {/* Submit Button */}
            <div>
              <Button 
                type="submit" 
                className="w-full py-6 text-lg shadow-sm"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {isVietnamese ? "Đang Gửi..." : "Submitting..."}
                  </>
                ) : (
                  isVietnamese ? "Tiếp Tục Để Chọn Giá" : "Continue to Pricing"
                )}
              </Button>
              
              <p className="text-center text-sm text-gray-500 mt-4">
                {isVietnamese 
                  ? "Bằng cách gửi, bạn đồng ý với Điều khoản Dịch vụ của chúng tôi" 
                  : "By submitting, you agree to our Terms of Service"}
              </p>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default JobForm;
