import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import JobPostPhotoUpload from './JobPostPhotoUpload';
import { JOB_TEMPLATES } from './jobFormConstants';
import { useToast } from '@/hooks/use-toast';
import { jobFormEn } from '@/constants/jobForm.en';
import { jobFormVi } from '@/constants/jobForm.vi';
import { PolishedDescriptionsModal } from './PolishedDescriptionsModal';

interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  isSubmitting: boolean;
  defaultValues?: Partial<JobFormValues>;
}

export const JobForm = ({ onSubmit, photoUploads, setPhotoUploads, isSubmitting, defaultValues = {} }: JobFormProps) => {
  const { t, isVietnamese } = useTranslation();
  const formText = isVietnamese ? jobFormVi : jobFormEn;
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues,
    mode: 'onChange'
  });
  
  const [showPolishModal, setShowPolishModal] = useState(false);
  const [currentDescription, setCurrentDescription] = useState('');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="template"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{formText.templateLabel} {formText.optionalLabel}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={formText.templatePlaceholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {JOB_TEMPLATES.map((template) => (
                    <SelectItem key={template.id} value={template.id}>{template.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                {isVietnamese ? "Chọn một mẫu để điền sẵn thông tin." : "Choose a template to pre-fill the form."}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {formText.titleLabel} <span className="text-red-500">{formText.requiredLabel}</span>
              </FormLabel>
              <FormControl>
                <Input placeholder={formText.titlePlaceholder} {...field} />
              </FormControl>
              <FormDescription>
                {isVietnamese ? "Nhập tiêu đề công việc." : "Enter the job title."}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {formText.locationLabel} <span className="text-red-500">{formText.requiredLabel}</span>
              </FormLabel>
              <FormControl>
                <Input placeholder={formText.locationPlaceholder} {...field} />
              </FormControl>
              <FormDescription>
                {isVietnamese ? "Nhập địa điểm làm việc." : "Enter the job location."}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{formText.jobTypeLabel} {formText.optionalLabel}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={formText.jobTypePlaceholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="fullTime">{formText.jobTypeOptions.fullTime}</SelectItem>
                  <SelectItem value="partTime">{formText.jobTypeOptions.partTime}</SelectItem>
                  <SelectItem value="contract">{formText.jobTypeOptions.contract}</SelectItem>
                  <SelectItem value="freelance">{formText.jobTypeOptions.freelance}</SelectItem>
                  <SelectItem value="other">{formText.jobTypeOptions.other}</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                {isVietnamese ? "Chọn loại công việc." : "Select the job type."}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {formText.descriptionLabel} <span className="text-red-500">{formText.requiredLabel}</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={formText.descriptionPlaceholder}
                  className="resize-none"
                  {...field}
                  onBlur={(e) => {
                    field.onBlur();
                    setCurrentDescription(e.target.value);
                  }}
                />
              </FormControl>
              <div className="flex justify-between items-center">
                <FormDescription>
                  {isVietnamese ? "Nhập mô tả công việc." : "Enter the job description."}
                </FormDescription>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowPolishModal(true)}
                >
                  {formText.aiPolishButton}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="compensation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{formText.compensationLabel} {formText.optionalLabel}</FormLabel>
              <FormControl>
                <Input placeholder={formText.compensationPlaceholder} {...field} />
              </FormControl>
              <FormDescription>
                {isVietnamese ? "Nhập mức lương hoặc hình thức trả lương." : "Enter the compensation details."}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {formText.contactInfoEmail} <span className="text-red-500">{formText.requiredLabel}</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder={formText.contactInfoEmailPlaceholder} type="email" {...field} />
                </FormControl>
                <FormDescription>
                  {isVietnamese ? "Nhập email liên hệ." : "Enter the contact email."}
                </FormDescription>
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
                  {formText.contactInfoPhone} <span className="text-red-500">{formText.requiredLabel}</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder={formText.contactInfoPhonePlaceholder} type="tel" {...field} />
                </FormControl>
                <FormDescription>
                  {isVietnamese ? "Nhập số điện thoại liên hệ." : "Enter the contact phone number."}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <JobPostPhotoUpload
          photoUploads={photoUploads}
          setPhotoUploads={setPhotoUploads}
        />

        <FormField
          control={form.control}
          name="isUrgent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-md border p-4 space-y-0">
              <div className="space-y-0.5">
                <FormLabel>{formText.urgentLabel}</FormLabel>
                <FormDescription>
                  {formText.urgentHelpText}
                </FormDescription>
              </div>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? formText.submitting : formText.continue}
        </Button>
        
        {showPolishModal && (
          <PolishedDescriptionsModal
            isOpen={showPolishModal}
            onClose={() => setShowPolishModal(false)}
            currentDescription={currentDescription}
            onSelectDescription={(description) => {
              form.setValue('description', description);
              setShowPolishModal(false);
            }}
            jobType={form.getValues('type')} // Pass the job type to the modal
          />
        )}
      </form>
    </Form>
  );
};

export default JobForm;
