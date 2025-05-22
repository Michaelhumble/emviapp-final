
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import JobDetailsSection from './JobDetailsSection';
import ContactInfoSection from '../sections/ContactInfoSection';
import { JobFormValues, jobFormSchema } from './jobFormSchema';

interface EnhancedJobFormProps {
  onSubmit: (data: JobFormValues) => void;
  defaultValues?: Partial<JobFormValues>;
  expressMode?: boolean;
}

const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({ 
  onSubmit, 
  defaultValues,
  expressMode = false 
}) => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: '',
      salonName: '',
      description: '',
      vietnamese_description: '',
      location: '',
      jobType: 'full-time',
      compensation_type: undefined,
      compensation_details: '',
      weekly_pay: false,
      has_housing: false,
      has_wax_room: false,
      owner_will_train: false,
      no_supply_deduction: false,
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      ...defaultValues
    }
  });
  
  const handleFormSubmit = async (data: JobFormValues) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        {currentStep === 0 ? (
          <JobDetailsSection 
            form={form} 
            onNext={() => setCurrentStep(1)}
            expressMode={expressMode}
          />
        ) : (
          <ContactInfoSection
            form={form}
            onPrevious={() => setCurrentStep(0)}
            expressMode={expressMode}
          />
        )}
        
        {currentStep === 1 && (
          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Job Posting'}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};

export default EnhancedJobForm;
