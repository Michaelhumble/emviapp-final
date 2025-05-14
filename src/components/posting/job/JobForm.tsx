
import React, { useState, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { JobFormValues, jobFormSchema } from './jobFormSchema';
import { JOB_TEMPLATES, JOB_TYPES } from './jobFormConstants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { FormField, FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form';
import { Form } from '@/components/ui/form';
import { Loader2, SparkleIcon } from 'lucide-react';
import JobPostPhotoUpload from './JobPostPhotoUpload';
import SectionHeader from '@/components/posting/SectionHeader';
import { useTranslation } from '@/hooks/useTranslation';
import { jobFormEn } from '@/constants/jobForm.en';
import { jobFormVi } from '@/constants/jobForm.vi';
import PolishedDescriptionsModal from './PolishedDescriptionsModal';
import { usePolishedDescriptions } from '@/hooks/usePolishedDescriptions';

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
  const t = isVietnamese ? jobFormVi : jobFormEn;
  
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: '',
      template: '',
      type: '',
      description: '',
      location: '',
      contactEmail: '',
      contactPhone: '',
      compensation: '',
      isUrgent: false,
      ...defaultValues
    }
  });

  const { 
    control, 
    handleSubmit, 
    watch, 
    setValue, 
    formState: { errors } 
  } = form;
  
  const watchTemplate = watch('template');
  const watchDescription = watch('description');
  
  // Polish description functionality
  const [isPolishModalOpen, setIsPolishModalOpen] = useState(false);
  const { polishedDescriptions, isLoading: isPolishing, fetchPolishedDescriptions } = usePolishedDescriptions();

  const handlePolishClick = async () => {
    if (watchDescription?.trim()) {
      await fetchPolishedDescriptions(watchDescription);
      setIsPolishModalOpen(true);
    }
  };

  const handleSelectPolishedDescription = (description: string) => {
    setValue('description', description, { shouldValidate: true });
    setIsPolishModalOpen(false);
  };

  // When template changes, update the default values
  useEffect(() => {
    if (watchTemplate) {
      const selectedTemplate = JOB_TEMPLATES.find(template => template.id === watchTemplate);
      if (selectedTemplate) {
        if (!watch('title') || watch('title') === '') {
          setValue('title', isVietnamese ? selectedTemplate.titleVi || selectedTemplate.title : selectedTemplate.title);
        }
        
        if (!watch('type') || watch('type') === '') {
          setValue('type', selectedTemplate.type);
        }
        
        if (!watch('description') || watch('description') === '') {
          setValue('description', selectedTemplate.description);
        }
      }
    }
  }, [watchTemplate, setValue, watch, isVietnamese]);

  const processFormSubmit: SubmitHandler<JobFormValues> = (values) => {
    // Add photos to form data
    const formData = {
      ...values,
      images: photoUploads
    };
    
    onSubmit(formData);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-playfair mb-2">{t.title}</h1>
        <p className="text-gray-600">
          {isVietnamese 
            ? "Hãy cho chúng tôi biết về công việc bạn cần tuyển, chúng tôi sẽ tìm ứng viên phù hợp cho bạn."
            : "Tell us about the job you're hiring for, and we'll help you find the perfect candidates."}
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={handleSubmit(processFormSubmit)} className="space-y-8">
          {/* Job Details Section */}
          <div className="space-y-6 bg-white p-6 rounded-xl shadow-sm border">
            <SectionHeader 
              title={isVietnamese ? "Chi tiết công việc" : "Job Details"} 
              emoji="💼"
            />
            
            {/* Template Selection */}
            <FormField
              control={control}
              name="template"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary font-semibold text-sm">
                    {t.templateLabel}
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t.templatePlaceholder} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {JOB_TEMPLATES.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {isVietnamese ? template.titleVi || template.title : template.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            
            {/* Job Title */}
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary font-semibold text-sm">
                    {t.titleLabel} <span className="text-red-500">{t.requiredLabel}</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={t.titlePlaceholder}
                      {...field} 
                    />
                  </FormControl>
                  {errors.title && (
                    <FormMessage>{t.errors.title}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            
            {/* Job Location */}
            <FormField
              control={control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary font-semibold text-sm">
                    {t.locationLabel} <span className="text-red-500">{t.requiredLabel}</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={t.locationPlaceholder}
                      {...field} 
                    />
                  </FormControl>
                  {errors.location && (
                    <FormMessage>{t.errors.location}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            
            {/* Job Type */}
            <FormField
              control={control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary font-semibold text-sm">
                    {t.jobTypeLabel} <span className="text-red-500">{t.requiredLabel}</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t.jobTypePlaceholder} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(JOB_TYPES).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {isVietnamese ? value.vi : value.en}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.type && <FormMessage>{errors.type.message}</FormMessage>}
                </FormItem>
              )}
            />
            
            {/* Job Description */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="description" className="text-primary font-semibold text-sm">
                  {t.descriptionLabel} <span className="text-red-500">{t.requiredLabel}</span>
                </Label>
                <Button 
                  type="button" 
                  size="sm"
                  variant="outline"
                  onClick={handlePolishClick}
                  className="h-8 text-xs"
                  disabled={!watchDescription?.trim()}
                >
                  <SparkleIcon className="w-3 h-3 mr-1" />
                  {t.aiPolishButton}
                </Button>
              </div>
              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea 
                        placeholder={t.descriptionPlaceholder}
                        className="min-h-[150px]"
                        {...field} 
                      />
                    </FormControl>
                    {errors.description && (
                      <FormMessage>{t.errors.description}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>
            
            {/* Compensation */}
            <FormField
              control={control}
              name="compensation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary font-semibold text-sm">
                    {t.compensationLabel} {t.optionalLabel}
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={t.compensationPlaceholder}
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            {/* Benefits checkboxes */}
            <div className="space-y-3">
              <Label className="text-primary font-semibold text-sm">
                {isVietnamese ? "Phúc lợi" : "Benefits"} {t.optionalLabel}
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Controller
                  name="payWeekly"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="payWeekly"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="payWeekly" className="text-sm font-normal cursor-pointer">
                        {isVietnamese ? "Trả lương hàng tuần" : "Weekly Pay"}
                      </Label>
                    </div>
                  )}
                />
                <Controller
                  name="provideLunch"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="provideLunch"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="provideLunch" className="text-sm font-normal cursor-pointer">
                        {isVietnamese ? "Có cung cấp bữa trưa" : "Lunch Provided"}
                      </Label>
                    </div>
                  )}
                />
                <Controller
                  name="qualityProducts"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="qualityProducts"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="qualityProducts" className="text-sm font-normal cursor-pointer">
                        {isVietnamese ? "Sản phẩm chất lượng cao" : "Quality Products"}
                      </Label>
                    </div>
                  )}
                />
                <Controller
                  name="reviewBonuses"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="reviewBonuses"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="reviewBonuses" className="text-sm font-normal cursor-pointer">
                        {isVietnamese ? "Thưởng theo đánh giá" : "Review Bonuses"}
                      </Label>
                    </div>
                  )}
                />
                <Controller
                  name="flexibleHours"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="flexibleHours"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="flexibleHours" className="text-sm font-normal cursor-pointer">
                        {isVietnamese ? "Giờ làm việc linh hoạt" : "Flexible Hours"}
                      </Label>
                    </div>
                  )}
                />
                <Controller
                  name="growthOpportunities"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="growthOpportunities"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="growthOpportunities" className="text-sm font-normal cursor-pointer">
                        {isVietnamese ? "Cơ hội thăng tiến" : "Growth Opportunities"}
                      </Label>
                    </div>
                  )}
                />
              </div>
            </div>
            
            {/* Photo Upload Section */}
            <div className="space-y-3 mb-4">
              <Label className="text-primary font-semibold text-sm">
                {t.photosLabel}
              </Label>
              <JobPostPhotoUpload
                photoUploads={photoUploads}
                setPhotoUploads={setPhotoUploads}
              />
            </div>
          </div>
          
          {/* Contact Section */}
          <div className="space-y-6 bg-white p-6 rounded-xl shadow-sm border">
            <SectionHeader 
              title={t.contactInfoLabel} 
              emoji="📞"
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email */}
              <FormField
                control={control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary font-semibold text-sm">
                      {t.contactInfoEmail} <span className="text-red-500">{t.requiredLabel}</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="email"
                        placeholder={t.contactInfoEmailPlaceholder}
                        {...field} 
                      />
                    </FormControl>
                    {errors.contactEmail && (
                      <FormMessage>{t.errors.email}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              
              {/* Phone */}
              <FormField
                control={control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary font-semibold text-sm">
                      {t.contactInfoPhone} <span className="text-red-500">{t.requiredLabel}</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="tel"
                        placeholder={t.contactInfoPhonePlaceholder}
                        {...field} 
                      />
                    </FormControl>
                    {errors.contactPhone && (
                      <FormMessage>{t.errors.phone}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* Urgent Flag */}
          <div className="bg-white p-6 rounded-xl shadow-sm border flex items-center justify-between flex-wrap gap-4">
            <div>
              <Label htmlFor="isUrgent" className="text-primary font-semibold text-sm block">{t.urgentLabel}</Label>
              <p className="text-muted-foreground text-xs mt-1">{t.urgentHelpText}</p>
            </div>
            <FormField
              control={control}
              name="isUrgent"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center h-6">
                      <Checkbox 
                        id="isUrgent"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="px-8 py-6 text-base"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.submitting}
                </>
              ) : t.continue}
            </Button>
          </div>
        </form>
      </Form>
      
      {/* AI Polish Modal */}
      <PolishedDescriptionsModal
        isOpen={isPolishModalOpen}
        onClose={() => setIsPolishModalOpen(false)}
        descriptions={polishedDescriptions}
        onSelect={handleSelectPolishedDescription}
        isLoading={isPolishing}
      />
    </div>
  );
};

export default JobForm;
