
import React, { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from '@/components/ui/checkbox';
import { Sparkles, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { JobFormValues, jobFormSchema } from './jobFormSchema';
import JobPostPhotoUpload from './JobPostPhotoUpload';
import PolishedDescriptionsModal from './PolishedDescriptionsModal';
import { usePolishedDescriptions } from '@/hooks/usePolishedDescriptions';
import { useTranslation } from '@/hooks/useTranslation';
import { jobFormEn } from '@/constants/jobForm.en';
import { jobFormVi } from '@/constants/jobForm.vi';

// Define props for the component
interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  isSubmitting?: boolean;
  defaultValues?: Partial<JobFormValues>;
}

// Main component
const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  photoUploads,
  setPhotoUploads,
  isSubmitting = false,
  defaultValues = {},
}) => {
  const { toast } = useToast();
  const { isVietnamese } = useTranslation();
  const t = isVietnamese ? jobFormVi : jobFormEn;
  
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      summary: "",
      template: "",
      title: "",
      type: "",
      location: "",
      compensation: "",
      isUrgent: false,
      description: "",
      contactEmail: "",
      contactPhone: "",
      payWeekly: false,
      provideLunch: false,
      qualityProducts: false,
      flexibleHours: false,
      reviewBonuses: false, 
      growthOpportunities: false,
      ...defaultValues,
    },
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { polishedDescriptions, isLoading, fetchPolishedDescriptions } = usePolishedDescriptions();
  
  // Validate photo uploads
  const validateUpload = (files: File[]) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    
    for (const file of files) {
      if (file.size > maxSize) {
        return { 
          valid: false, 
          message: 'One or more images exceed the 5MB size limit' 
        };
      }
      
      if (!allowedTypes.includes(file.type)) {
        return { 
          valid: false, 
          message: 'Only JPG, PNG, and WebP images are allowed' 
        };
      }
    }
    
    return { valid: true, message: '' };
  };
  
  // Handle AI polish click
  const handlePolishClick = async () => {
    const description = form.getValues('description');
    
    if (!description || description.length < 10) {
      toast({
        title: isVietnamese ? "Mô tả quá ngắn" : "Description too short",
        description: isVietnamese 
          ? "Vui lòng viết ít nhất 10 ký tự trước khi sử dụng AI" 
          : "Please write at least 10 characters before using AI polish",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await fetchPolishedDescriptions(description);
      setIsModalOpen(true);
    } catch (error) {
      toast({
        title: isVietnamese ? "Đã xảy ra lỗi" : "An error occurred",
        description: isVietnamese 
          ? "Không thể tạo gợi ý. Vui lòng thử lại sau." 
          : "Could not generate suggestions. Please try again later.",
        variant: "destructive"
      });
    }
  };
  
  // Handle selecting a polished description
  const handleSelectPolishedDescription = (description: string) => {
    form.setValue('description', description);
    setIsModalOpen(false);
  };

  // Function to handle template selection
  const handleTemplateChange = (value: string) => {
    form.setValue('template', value);
    
    // Apply template presets based on selection
    switch(value) {
      case 'Nail Technician':
      case 'Thợ Nail':
        form.setValue('title', isVietnamese ? 'Cần Thợ Nail' : 'Nail Technician Needed');
        form.setValue('description', isVietnamese 
          ? 'Tiệm nail khu sang cần thợ làm đủ thứ hoặc một trong các loại: bột, chân tay nước, wax lông, hoặc lash. Bao lương hoặc chia phần trăm tùy khả năng và kinh nghiệm. Tiệm đông khách, thu nhập tốt, giờ giấc thoải mái, môi trường làm việc vui vẻ.' 
          : 'Nail salon in upscale area looking for nail technicians skilled in all services or specialists in acrylics, pedicures, waxing, or lashes. Guaranteed salary or commission based on experience. Busy salon with great income, flexible hours, and friendly working environment.');
        form.setValue('type', 'fullTime');
        break;
        
      case 'Hair Stylist':
      case 'Thợ Tóc':
        form.setValue('title', isVietnamese ? 'Cần Thợ Tóc' : 'Hair Stylist Wanted');
        form.setValue('description', isVietnamese 
          ? 'Tiệm tóc đông khách cần thợ biết làm tóc nam/nữ. Thợ có kinh nghiệm làm được: uốn, nhuộm, balayage, và cắt tạo kiểu. Bao lương hoặc chia % tùy theo khả năng. Môi trường làm việc vui vẻ, thân thiện.' 
          : 'Busy hair salon seeking stylist for men/women\'s services. Experience in perms, color, balayage, and cutting required. Guaranteed salary or commission based on skills. Fun, friendly work environment.');
        form.setValue('type', 'fullTime');
        break;
        
      case 'Spa Technician':
      case 'Kỹ Thuật Viên Spa':
        form.setValue('title', isVietnamese ? 'Cần Thợ Spa' : 'Spa Technician Position');
        form.setValue('description', isVietnamese 
          ? 'Spa cao cấp cần tuyển kỹ thuật viên có kinh nghiệm facial, massage body, và các dịch vụ spa khác. Yêu cầu có bằng thẩm mỹ hoặc massage therapist. Lương cao + tips, môi trường làm việc chuyên nghiệp.' 
          : 'Upscale spa hiring experienced technicians skilled in facials, body massage, and other spa services. Esthetician or massage therapist license required. Great pay + tips in a professional environment.');
        form.setValue('type', 'fullTime');
        form.setValue('flexibleHours', true);
        form.setValue('reviewBonuses', true);
        break;
        
      // Add other cases for remaining templates
      
      case 'Receptionist':  
      case 'Lễ Tân Tiệm':
        form.setValue('title', isVietnamese ? 'Tuyển Lễ Tân' : 'Receptionist Position Available');
        form.setValue('description', isVietnamese 
          ? 'Tiệm cần người lễ tân tiếp khách, trả lời điện thoại, book appointment, tính tiền, và quản lý schedules. Ưu tiên người biết tiếng Anh, có kinh nghiệm làm trong tiệm nail/tóc/spa. Lương tốt, giờ làm cố định.' 
          : 'Salon needs receptionist to greet customers, answer phones, book appointments, handle payments, and manage schedules. English proficiency required, experience in nail/hair/spa environment preferred. Good salary with stable hours.');
        form.setValue('type', 'fullTime');
        form.setValue('payWeekly', true);
        break;
        
      case 'Manager':
      case 'Quản Lý Tiệm':
        form.setValue('title', isVietnamese ? 'Tuyển Quản Lý Tiệm' : 'Salon Manager Position');
        form.setValue('description', isVietnamese 
          ? 'Cần người quản lý tiệm có kinh nghiệm điều hành, giám sát nhân viên, quản lý lịch làm việc, và giải quyết vấn đề khách hàng. Yêu cầu tiếng Anh thành thạo, kỹ năng giao tiếp tốt, có kinh nghiệm quản lý trong ngành làm đẹp.' 
          : 'Seeking experienced salon manager to oversee operations, supervise staff, manage schedules, and handle customer concerns. Fluent English, strong communication skills, and previous management experience in beauty industry required.');
        form.setValue('type', 'fullTime');
        form.setValue('growthOpportunities', true);
        break;
        
      case 'Massage Therapist':
      case 'Thợ Massage':
        form.setValue('title', isVietnamese ? 'Cần Thợ Massage' : 'Massage Therapist Wanted');
        form.setValue('description', isVietnamese 
          ? 'Spa cần thợ massage có bằng, biết nhiều loại massage như Swedish, deep tissue, hot stone, và reflexology. Có kinh nghiệm là một lợi thế. Thu nhập tốt bao gồm lương + tips.' 
          : 'Spa seeking licensed massage therapists skilled in Swedish, deep tissue, hot stone, and reflexology. Experience preferred. Great income including base pay + tips.');
        form.setValue('type', 'fullTime');
        form.setValue('flexibleHours', true);
        form.setValue('qualityProducts', true);
        break;
        
      case 'Lash Technician':
      case 'Thợ Nối Mi':
        form.setValue('title', isVietnamese ? 'Cần Thợ Mi' : 'Lash Technician Position');
        form.setValue('description', isVietnamese 
          ? 'Beauty studio cần thợ nối mi có kinh nghiệm, thành thạo classic, volume, và hybrid sets. Phải có certificate và portfolio. Môi trường làm việc sang trọng, khách hàng ổn định, thu nhập cao.' 
          : 'Beauty studio seeking experienced lash artists proficient in classic, volume, and hybrid sets. Certification and portfolio required. Luxurious work environment with established clientele and high earning potential.');
        form.setValue('type', 'fullTime');
        form.setValue('flexibleHours', true);
        break;

      case 'Tattoo Artist':  
      case 'Thợ Xăm':
        form.setValue('title', isVietnamese ? 'Tuyển Thợ Xăm' : 'Tattoo Artist Wanted');
        form.setValue('description', isVietnamese 
          ? 'Studio xăm cần thợ có kinh nghiệm, có portfolio đẹp. Phải thành thạo nhiều phong cách xăm và biết vẽ. Ưu tiên người đã có khách hàng. Chia % theo thỏa thuận.' 
          : 'Tattoo studio seeking experienced artist with strong portfolio. Must be proficient in multiple styles and have drawing skills. Established clientele preferred. Commission split negotiable.');
        form.setValue('type', 'fullTime');
        form.setValue('flexibleHours', true);
        break;
        
      case 'Makeup Artist':
      case 'Thợ Makeup':
        form.setValue('title', isVietnamese ? 'Cần Thợ Makeup' : 'Makeup Artist Position');
        form.setValue('description', isVietnamese 
          ? 'Salon cần thợ makeup chuyên nghiệp cho các dịp đặc biệt, tiệc cưới, và photoshoots. Yêu cầu có kinh nghiệm, kit đầy đủ, và portfolio đẹp. Thu nhập hấp dẫn với tiềm năng phát triển lớn.' 
          : 'Salon hiring professional makeup artists for special events, weddings, and photoshoots. Experience, full kit, and impressive portfolio required. Attractive compensation with significant growth potential.');
        form.setValue('type', 'partTime');
        form.setValue('flexibleHours', true);
        break;
        
      case 'Permanent Makeup Artist':
      case 'Thợ Phun Xăm':
        form.setValue('title', isVietnamese ? 'Cần Thợ Phun Xăm' : 'Permanent Makeup Artist Needed');
        form.setValue('description', isVietnamese 
          ? 'Beauty center cần thợ phun xăm chuyên nghiệp, thành thạo phun mày, môi, mí, và scalp micropigmentation. Yêu cầu có chứng chỉ, portfolio, và ít nhất 2 năm kinh nghiệm. Thu nhập cao, môi trường chuyên nghiệp.' 
          : 'Beauty center seeking professional PMU artist skilled in microblading, lip blush, eyeliner, and scalp micropigmentation. Certification, portfolio, and minimum 2 years experience required. High income potential in a professional setting.');
        form.setValue('type', 'fullTime');
        form.setValue('qualityProducts', true);
        form.setValue('reviewBonuses', true);
        break;
    }
  };

  // Form submission handler
  const handleFormSubmit = (data: JobFormValues) => {
    onSubmit(data);
  };

  // JSX rendering
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Job template selection */}
          <div className="space-y-6">
            <div>
              <FormField
                control={form.control}
                name="template"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.templatePlaceholder}</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleTemplateChange(value);
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={t.templatePlaceholder} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {t.templates.map((template) => (
                            <SelectItem key={template} value={template}>
                              {template}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Job title and type */}
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {isVietnamese ? "Tiêu Đề Công Việc *" : "Job Title *"}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={isVietnamese ? "VD: Cần Thợ Nail" : "Ex: Nail Technician Needed"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.jobTypeLabel}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={isVietnamese ? "Chọn loại công việc" : "Select job type"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="fullTime">{t.jobTypeOptions.fullTime}</SelectItem>
                        <SelectItem value="partTime">{t.jobTypeOptions.partTime}</SelectItem>
                        <SelectItem value="contract">{t.jobTypeOptions.contract}</SelectItem>
                        <SelectItem value="freelance">{t.jobTypeOptions.freelance}</SelectItem>
                        <SelectItem value="other">{t.jobTypeOptions.other}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Location and Compensation */}
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.locationLabel} *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={isVietnamese ? "VD: Charlotte, NC" : "Ex: Charlotte, NC"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="compensation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t.compensationLabel} {t.optionalLabel}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={t.compensationPlaceholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Job Description */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{t.descriptionLabel}</FormLabel>
                      <div className="flex items-center justify-between">
                        <FormControl>
                          <div className="relative w-full">
                            <Textarea
                              placeholder={t.descriptionPlaceholder}
                              className="min-h-32 resize-y"
                              {...field}
                            />

                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="absolute right-2 bottom-2 flex items-center gap-1 text-xs"
                              onClick={handlePolishClick}
                            >
                              {isLoading ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                <Sparkles className="h-3 w-3" />
                              )}
                              {isVietnamese 
                                ? "✨ Trợ Giúp Từ AI" 
                                : "✨ Polish with AI"}
                            </Button>
                          </div>
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Short Summary */}
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t.summaryLabel} {t.optionalLabel}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={t.summaryPlaceholder} {...field} />
                  </FormControl>
                  <FormDescription>
                    {isVietnamese
                      ? "Tiêu đề ngắn gọn giúp thu hút nhiều ứng viên hơn."
                      : "A catchy headline helps attract more candidates."}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Contact Information */}
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.emailLabel}</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
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
                    <FormLabel>{t.phoneLabel}</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder={t.phonePlaceholder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Workplace Perks */}
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-medium mb-2">{t.perksLabel}</h3>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                <FormField
                  control={form.control}
                  name="flexibleHours"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal text-sm">
                        {t.perks.flexibleHours}
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="payWeekly"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal text-sm">
                        {t.perks.weeklyPay}
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="provideLunch"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal text-sm">
                        {t.perks.provideLunch}
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="qualityProducts"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal text-sm">
                        {t.perks.qualityProducts}
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reviewBonuses"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal text-sm">
                        {t.perks.reviewBonuses}
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="growthOpportunities"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal text-sm">
                        {t.perks.growthOpportunities}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Urgent Badge */}
            <FormField
              control={form.control}
              name="isUrgent"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-base">
                      {t.urgentLabel}
                    </FormLabel>
                    <FormDescription>
                      {t.urgentHint}
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            {/* Image Upload */}
            <div className="space-y-2">
              <Label>{t.uploadLabel}</Label>
              <JobPostPhotoUpload
                photoUploads={photoUploads}
                setPhotoUploads={setPhotoUploads}
                maxFiles={5}
                validateUpload={validateUpload}
                placeholder={t.uploadPlaceholder}
                uploadLimitText={t.uploadLimitText}
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isVietnamese ? "Đang xử lý..." : "Processing..."}
              </>
            ) : (
              t.continue
            )}
          </Button>
        </form>
      </Form>

      {/* Modal for displaying polished descriptions */}
      <PolishedDescriptionsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        descriptions={polishedDescriptions}
        onSelect={handleSelectPolishedDescription}
        isLoading={isLoading}
      />
    </>
  );
};

export default JobForm;
