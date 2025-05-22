
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { JobFormValues, jobFormSchema } from './jobFormSchema';
import JobDetailsSection from './JobDetailsSection';
import ContactInfoSection from '../sections/ContactInfoSection';

interface JobFormProps {
  onSubmit: (data: JobFormValues) => void;
  defaultValues?: Partial<JobFormValues>;
  expressMode?: boolean;
  isSubmitting?: boolean;
}

const JobForm: React.FC<JobFormProps> = ({ 
  onSubmit, 
  defaultValues, 
  expressMode = false,
  isSubmitting = false 
}) => {
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
      contactNotes: '',
      contactZalo: '',
      requirements: [],
      specialties: [],
      ...defaultValues
    }
  });
  
  const [currentStep, setCurrentStep] = useState(0);
  
  const handleSubmit = (data: JobFormValues) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
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
          <div className="flex justify-end mt-6">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Continue'}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};

export default JobForm;
