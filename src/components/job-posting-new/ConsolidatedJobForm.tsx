
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import JobDetailsSection from '@/components/posting/sections/JobDetailsSection';

const jobFormSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  salonName: z.string().min(1, 'Salon name is required'),
  location: z.string().min(1, 'Location is required'),
  employmentType: z.string().min(1, 'Employment type is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  vietnameseDescription: z.string().optional(),
  contactName: z.string().min(1, 'Contact name is required'),
  contactPhone: z.string().min(1, 'Contact phone is required'),
  contactEmail: z.string().email('Valid email is required'),
  compensationType: z.string().optional(),
  compensationDetails: z.string().optional(),
  benefits: z.array(z.string()).optional()
});

type JobFormData = z.infer<typeof jobFormSchema>;

interface ConsolidatedJobFormProps {
  selectedProfession: string;
  onSubmit: (data: JobFormData & { profession: string }) => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

const ConsolidatedJobForm: React.FC<ConsolidatedJobFormProps> = ({
  selectedProfession,
  onSubmit,
  onBack,
  isSubmitting = false
}) => {
  const form = useForm<JobFormData>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: '',
      salonName: '',
      location: '',
      employmentType: 'full-time',
      description: '',
      vietnameseDescription: '',
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      compensationType: 'hourly',
      compensationDetails: '',
      benefits: []
    },
  });

  const handleSubmit = (data: JobFormData) => {
    onSubmit({
      ...data,
      profession: selectedProfession
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4"
            disabled={isSubmitting}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Templates
          </Button>
          
          <h1 className="text-3xl font-bold mb-2">
            Create {selectedProfession.replace('-', ' ')} Job Posting
          </h1>
          <p className="text-gray-600">
            Fill out the details for your job posting. You'll choose your pricing plan on the next step.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <div className="bg-white rounded-lg border p-6">
              <JobDetailsSection control={form.control} />
            </div>
            
            <div className="flex justify-end">
              <Button 
                type="submit" 
                className="bg-purple-600 hover:bg-purple-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Continue to Pricing'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ConsolidatedJobForm;
