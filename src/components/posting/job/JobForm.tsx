
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '@/components/ui/card';
import { JobDetailsSubmission } from '@/types/job';
import { useTranslation } from '@/hooks/useTranslation';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import JobDetailsSection from '../sections/JobDetailsSection';
import CompensationSection from '../sections/CompensationSection';
import RequirementsSection from '../sections/RequirementsSection';
import ContactInformationSection from '../sections/ContactInformationSection';

// Define the form schema
const formSchema = z.object({
  title: z.string().min(3, { message: "Job title must be at least 3 characters." }),
  location: z.string().min(3, { message: "Location is required." }),
  jobType: z.string({ required_error: "Please select a job type." }),
  description: z.string().min(10, { message: "Please provide a job description." }),
  salary: z.string().optional(),
  requirements: z.array(z.string()).optional(),
  contactEmail: z.string().email({ message: "Please enter a valid email." }).optional(),
  phoneNumber: z.string().optional(),
  jobSummary: z.string().optional(),
  startDate: z.date().optional(),
  language: z.string().default('english')
});

export type JobFormData = z.infer<typeof formSchema>;

interface JobFormProps {
  onSubmit: (data: JobDetailsSubmission) => void;
  initialData?: Partial<JobDetailsSubmission>;
  isSubmitting?: boolean;
}

export const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  initialData = {},
  isSubmitting = false
}) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const form = useForm<JobFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData.title || '',
      location: initialData.location || '',
      jobType: initialData.jobType || '',
      description: initialData.description || '',
      salary: initialData.salary || '',
      requirements: initialData.requirements || [],
      contactEmail: initialData.contactEmail || '',
      phoneNumber: initialData.phoneNumber || '',
      jobSummary: initialData.jobSummary || '',
      startDate: initialData.startDate,
      language: initialData.language || 'english'
    }
  });

  const handleSubmit = (data: JobFormData) => {
    onSubmit(data as JobDetailsSubmission);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Card className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          {currentStep === 1 && (
            <JobDetailsSection />
          )}
          
          {currentStep === 2 && (
            <CompensationSection form={form} />
          )}
          
          {currentStep === 3 && (
            <RequirementsSection form={form} />
          )}
          
          {currentStep === 4 && (
            <ContactInformationSection form={form} />
          )}
          
          <div className="flex justify-between p-6">
            {currentStep > 1 && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={prevStep}
              >
                {t('Previous', 'Quay lại')}
              </Button>
            )}
            
            <div className="flex-1" />
            
            {currentStep < totalSteps ? (
              <Button 
                type="button" 
                onClick={nextStep}
              >
                {t('Next', 'Tiếp theo')}
              </Button>
            ) : (
              <Button 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? t('Submitting...', 'Đang gửi...') : t('Submit Job Listing', 'Đăng tin tuyển dụng')}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </Card>
  );
};
