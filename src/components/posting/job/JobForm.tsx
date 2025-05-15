
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Magic } from 'lucide-react';
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import JobPostPhotoUpload from './JobPostPhotoUpload';
import PolishedDescriptionsModal from './PolishedDescriptionsModal';
import { usePolishedDescriptions } from '@/hooks/usePolishedDescriptions';
import { useTranslation } from '@/hooks/useTranslation';
import { jobFormEn } from '@/constants/jobForm.en';
import { jobFormVi } from '@/constants/jobForm.vi';

interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  isSubmitting: boolean;
  defaultValues?: Partial<JobFormValues>;
}

const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  photoUploads,
  setPhotoUploads,
  isSubmitting,
  defaultValues = {},
}) => {
  const { t, isVietnamese } = useTranslation();
  const formText = isVietnamese ? jobFormVi : jobFormEn;
  const { polishedDescriptions, isLoading, fetchPolishedDescriptions } = usePolishedDescriptions();
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Initialize the form with default values
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      type: '',
      contactEmail: '',
      contactPhone: '',
      isUrgent: false,
      ...defaultValues,
    },
  });

  const description = form.watch('description');
  const selectedJobType = form.watch('type');

  const openAiModal = () => {
    setIsAiModalOpen(true);
  };

  const closeAiModal = () => {
    setIsAiModalOpen(false);
  };

  const handleSelectTemplate = (template: string) => {
    form.setValue('description', template, { shouldValidate: true });
    closeAiModal();
  };

  const handleClickPolish = () => {
    if (description.trim().length > 0) {
      fetchPolishedDescriptions(description);
    }
    openAiModal();
  };

  const handleFormSubmit = (values: JobFormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{formText.titleLabel}</FormLabel>
              <FormControl>
                <Input placeholder={formText.titlePlaceholder} {...field} />
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
              <FormLabel>{formText.typeLabel}</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={formText.typePlaceholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {formText.jobTypes.map((type) => (
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

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>{formText.descriptionLabel}</FormLabel>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={handleClickPolish}
                  className="flex items-center gap-1 text-xs"
                >
                  <Magic className="h-3 w-3" />
                  {isVietnamese ? "Gợi ý AI" : "AI Polish"}
                </Button>
              </div>
              <FormControl>
                <Textarea 
                  placeholder={formText.descriptionPlaceholder} 
                  className="min-h-32" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formText.locationLabel}</FormLabel>
                <FormControl>
                  <Input placeholder={formText.locationPlaceholder} {...field} />
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
                <FormLabel>{formText.compensationLabel}</FormLabel>
                <FormControl>
                  <Input placeholder={formText.compensationPlaceholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formText.emailLabel}</FormLabel>
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
                <FormLabel>{formText.phoneLabel}</FormLabel>
                <FormControl>
                  <Input placeholder={formText.phonePlaceholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="isUrgent"
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
                  {formText.urgentLabel}
                </FormLabel>
                <p className="text-sm text-muted-foreground">
                  {formText.urgentDescription}
                </p>
              </div>
            </FormItem>
          )}
        />

        <JobPostPhotoUpload
          photoUploads={photoUploads}
          setPhotoUploads={setPhotoUploads}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>{isVietnamese ? "Đang xử lý..." : "Processing..."}</>
            ) : (
              <>{isVietnamese ? "Tiếp tục đến thanh toán" : "Continue to payment"}</>
            )}
          </Button>
        </div>

        <PolishedDescriptionsModal
          isOpen={isAiModalOpen}
          onClose={closeAiModal}
          onSelectTemplate={handleSelectTemplate}
          jobType={selectedJobType}
        />
      </form>
    </Form>
  );
};

export default JobForm;
