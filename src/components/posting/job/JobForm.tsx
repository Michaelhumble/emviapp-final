
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { JobFormValues, jobFormSchema } from './jobFormSchema';
import { Button } from '@/components/ui/button';

interface JobFormProps {
  onSubmit: (data: JobFormValues, uploads: File[]) => Promise<boolean>;
  initialValues?: JobFormValues;
  isLoading?: boolean;
}

export const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  initialValues,
  isLoading = false
}) => {
  const [photoUploads, setPhotoUploads] = React.useState<File[]>([]);
  
  // Create default values with proper types
  const defaultValues: JobFormValues = {
    title: "",
    description: "",
    location: "",
    jobType: "",
    compensation_type: "",
    compensation_details: "",
    salary_range: "",
    experience_level: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    salonName: "",
    weekly_pay: false,
    has_housing: false,
    has_wax_room: false,
    owner_will_train: false,
    no_supply_deduction: false,
    vietnameseDescription: "",
    specialties: [],
    requirements: [],
    templateType: "",
    image: "",
    ...initialValues
  };
  
  const methods = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues,
  });
  
  const handleSubmit = async (data: JobFormValues) => {
    const success = await onSubmit(data, photoUploads);
    if (success) {
      methods.reset();
      setPhotoUploads([]);
    }
  };
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Form fields go here, removed for brevity */}
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit Job Posting'}
        </Button>
      </form>
    </FormProvider>
  );
};

export default JobForm;
