
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Sparkles } from "lucide-react";
import JobPostPhotoUpload from "./JobPostPhotoUpload";
import { jobFormSchema, JobFormValues } from "./jobFormSchema";
import { useTranslation } from "@/hooks/useTranslation";
import PolishedDescriptionsModal from "./PolishedDescriptionsModal";
import { 
  JOB_TEMPLATES_EN, 
  JOB_TEMPLATES_VI, 
  JOB_TYPES_EN, 
  JOB_TYPES_VI,
  POLISHED_DESCRIPTIONS_EN,
  POLISHED_DESCRIPTIONS_VI
} from "./jobFormConstants";

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
  const { isVietnamese, t } = useTranslation();
  
  // Use language-specific templates and job types
  const jobTemplates = isVietnamese ? JOB_TEMPLATES_VI : JOB_TEMPLATES_EN;
  const jobTypes = isVietnamese ? JOB_TYPES_VI : JOB_TYPES_EN;
  
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: defaultValues.title || "",
      description: defaultValues.description || "",
      location: defaultValues.location || "",
      type: defaultValues.type || "",
      compensation: defaultValues.compensation || "",
      contactEmail: defaultValues.contactEmail || "",
      contactPhone: defaultValues.contactPhone || "",
      isUrgent: defaultValues.isUrgent || false,
      template: defaultValues.template || "",
      ...defaultValues
    }
  });

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    const selectedTemplate = jobTemplates.find(t => t.id === templateId);
    
    if (selectedTemplate) {
      form.setValue("title", selectedTemplate.defaultTitle);
      form.setValue("description", selectedTemplate.defaultDescription);
      if (selectedTemplate.defaultType) {
        form.setValue("type", selectedTemplate.defaultType);
      }
    }
  };

  const handleSubmitForm = (values: JobFormValues) => {
    onSubmit(values);
  };

  const openAIModal = () => {
    setIsAIModalOpen(true);
  };

  const closeAIModal = () => {
    setIsAIModalOpen(false);
  };

  const handleSelectDescription = (description: string) => {
    form.setValue("description", description);
    closeAIModal();
  };

  // Prepare translations
  const formText = isVietnamese 
    ? {
        title: "Đăng Công Việc",
        template: "Chọn mẫu",
        templatePlaceholder: "Chọn mẫu công việc",
        jobTitle: "Tiêu đề công việc",
        jobTitlePlaceholder: "Nhập tiêu đề công việc",
        location: "Địa điểm",
        locationPlaceholder: "Nhập địa điểm làm việc",
        jobType: "Loại công việc",
        jobTypePlaceholder: "Chọn loại công việc",
        description: "Mô tả công việc",
        descriptionPlaceholder: "Nhập mô tả công việc",
        compensation: "Lương thưởng",
        compensationPlaceholder: "Ví dụ: $20-25/giờ hoặc $50k-60k/năm",
        contactInfo: "Thông tin liên hệ",
        email: "Email",
        emailPlaceholder: "Nhập email liên hệ",
        phone: "Số điện thoại",
        phonePlaceholder: "Nhập số điện thoại",
        photos: "Thêm ảnh (Không bắt buộc)",
        dragDropText: "Kéo thả hình ảnh hoặc bấm để chọn",
        photoCountText: "{count} / {max} ảnh được thêm",
        urgent: "Đánh dấu là khẩn cấp",
        urgentHelp: "Làm nổi bật bài đăng của bạn",
        aiPolish: "✨ Trợ Giúp Từ AI",
        submit: "Tiếp tục đến Bảng giá",
        submitting: "Đang gửi...",
        required: "*",
        optional: "(Không bắt buộc)"
      }
    : {
        title: "Post a Job",
        template: "Choose a Template",
        templatePlaceholder: "Select a job template",
        jobTitle: "Job Title",
        jobTitlePlaceholder: "Enter job title",
        location: "Location",
        locationPlaceholder: "Enter job location",
        jobType: "Job Type",
        jobTypePlaceholder: "Select job type",
        description: "Job Description",
        descriptionPlaceholder: "Enter job description",
        compensation: "Compensation",
        compensationPlaceholder: "E.g., $20-25/hr or $50k-60k/year",
        contactInfo: "Contact Information",
        email: "Email",
        emailPlaceholder: "Enter contact email",
        phone: "Phone Number",
        phonePlaceholder: "Enter contact phone number",
        photos: "Add Photos (Optional)",
        dragDropText: "Drag and drop images or click to select",
        photoCountText: "{count} / {max} photos added",
        urgent: "Mark as Urgent",
        urgentHelp: "Highlights your post",
        aiPolish: "Polish with AI ✨",
        submit: "Continue to Pricing",
        submitting: "Submitting...",
        required: "*",
        optional: "(Optional)"
      };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-6">
        {/* Template Selector */}
        <FormField
          control={form.control}
          name="template"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {formText.template}
              </FormLabel>
              <Select 
                onValueChange={(value) => {
                  field.onChange(value);
                  handleTemplateChange(value);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={formText.templatePlaceholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {jobTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Job Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {formText.jobTitle} <span className="text-red-500">{formText.required}</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={formText.jobTitlePlaceholder}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {formText.location} <span className="text-red-500">{formText.required}</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={formText.locationPlaceholder}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Job Type */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {formText.jobType}
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={formText.jobTypePlaceholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {jobTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Job Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>
                  {formText.description} <span className="text-red-500">{formText.required}</span>
                </FormLabel>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={openAIModal}
                  className="text-xs flex items-center gap-1 h-7 px-2"
                >
                  <Sparkles className="w-3 h-3" />
                  {formText.aiPolish}
                </Button>
              </div>
              <FormControl>
                <Textarea
                  placeholder={formText.descriptionPlaceholder}
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Compensation */}
        <FormField
          control={form.control}
          name="compensation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {formText.compensation} <span className="text-gray-500 text-sm">{formText.optional}</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={formText.compensationPlaceholder}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Contact Information */}
        <div>
          <h3 className="text-base font-medium mb-4">{formText.contactInfo}</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {formText.email} <span className="text-red-500">{formText.required}</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={formText.emailPlaceholder}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {formText.phone} <span className="text-red-500">{formText.required}</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder={formText.phonePlaceholder}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Photo Upload */}
        <FormItem>
          <FormLabel>{formText.photos}</FormLabel>
          <JobPostPhotoUpload 
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
            maxPhotos={5}
            translations={{
              dragDropText: formText.dragDropText,
              photoCount: (count, max) => formText.photoCountText.replace("{count}", count.toString()).replace("{max}", max.toString())
            }}
          />
        </FormItem>

        {/* Urgent Checkbox */}
        <FormField
          control={form.control}
          name="isUrgent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>{formText.urgent}</FormLabel>
                <p className="text-sm text-gray-500">{formText.urgentHelp}</p>
              </div>
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {formText.submitting}
            </>
          ) : (
            formText.submit
          )}
        </Button>
      </form>

      {/* AI Polish Modal */}
      <PolishedDescriptionsModal
        isOpen={isAIModalOpen}
        onClose={closeAIModal}
        onSelectDescription={handleSelectDescription}
        jobType={form.getValues("title") || ""}
        aiPolishButton={formText.aiPolish}
      />
    </Form>
  );
};

export default JobForm;
