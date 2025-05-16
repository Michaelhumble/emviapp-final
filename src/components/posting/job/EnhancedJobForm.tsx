
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { JobDetailsSubmission } from '@/types/job';
import { Card, CardContent } from '@/components/ui/card';
import JobDetailsSection from '../sections/JobDetailsSection';
import RequirementsSection from '../sections/RequirementsSection';
import CompensationSection from '../sections/CompensationSection';
import ContactInformationSection from '../sections/ContactInformationSection';
import { Button } from '@/components/ui/button';

// Define a schema that matches JobDetailsSubmission
const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description is required" }),
  location: z.string().min(2, { message: "Location is required" }),
  jobType: z.string({ required_error: "Job type is required" }),
  salary: z.string().optional(),
  contactEmail: z.string().email("Invalid email").optional().or(z.literal("")),
  phoneNumber: z.string().optional(),
  requirements: z.array(z.string()).optional(),
  jobSummary: z.string().optional(),
  startDate: z.date().optional(),
  language: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

interface EnhancedJobFormProps {
  onSubmit: (data: JobDetailsSubmission) => void;
  initialData?: Partial<JobDetailsSubmission>;
  isSubmitting?: boolean;
}

const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({
  onSubmit,
  initialData = {},
  isSubmitting = false
}) => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData.title || '',
      description: initialData.description || '',
      location: initialData.location || '',
      jobType: initialData.jobType || '',
      salary: initialData.salary || '',
      contactEmail: initialData.contactEmail || '',
      phoneNumber: initialData.phoneNumber || '',
      requirements: initialData.requirements || [],
      jobSummary: initialData.jobSummary || '',
      startDate: initialData.startDate,
      language: initialData.language || 'en'
    }
  });

  const handleFormSubmit = (values: FormValues) => {
    // Convert FormValues to JobDetailsSubmission - they have the same shape
    onSubmit(values as unknown as JobDetailsSubmission);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-0">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleFormSubmit)} className="space-y-8">
            <JobDetailsSection />
            <RequirementsSection />
            <CompensationSection form={methods.control} />
            <ContactInformationSection form={methods.control} />
            
            <div className="p-6 flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Post Job'}
              </Button>
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default EnhancedJobForm;
