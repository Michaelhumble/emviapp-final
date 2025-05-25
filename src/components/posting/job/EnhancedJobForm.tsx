
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import JobDetailsSection from '@/components/posting/sections/JobDetailsSection';
import RequirementsSection from '@/components/posting/sections/RequirementsSection';
import CompensationSection from '@/components/posting/sections/CompensationSection';
import ContactInfoSection from '@/components/posting/sections/ContactInfoSection';

const enhancedJobFormSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  salonName: z.string().min(1, "Salon name is required"),
  location: z.string().min(1, "Location is required"),
  employmentType: z.string().min(1, "Employment type is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  vietnameseDescription: z.string().optional(),
  requirements: z.array(z.string()).default([]),
  benefits: z.array(z.string()).default([]),
  compensationType: z.string().default("hourly"),
  compensationDetails: z.string().optional(),
  contactName: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().optional(),
  contactNotes: z.string().optional(),
});

type EnhancedJobFormValues = z.infer<typeof enhancedJobFormSchema>;

interface EnhancedJobFormProps {
  initialValues?: Partial<EnhancedJobFormValues>;
  onSubmit: (data: EnhancedJobFormValues) => void;
}

const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({ initialValues, onSubmit }) => {
  console.log('🎯 EnhancedJobForm received initialValues:', initialValues);
  
  const form = useForm<EnhancedJobFormValues>({
    resolver: zodResolver(enhancedJobFormSchema),
    defaultValues: {
      title: '',
      salonName: '',
      location: '',
      employmentType: '',
      description: '',
      vietnameseDescription: '',
      requirements: [],
      benefits: [],
      compensationType: 'hourly',
      compensationDetails: '',
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      contactNotes: '',
      ...initialValues
    }
  });

  // Update form values when initialValues change
  useEffect(() => {
    if (initialValues) {
      console.log('🔄 Updating form with initialValues:', initialValues);
      
      // Reset form with new values
      form.reset({
        title: initialValues.title || '',
        salonName: initialValues.company || initialValues.salonName || '',
        location: initialValues.location || '',
        employmentType: initialValues.employmentType || '',
        description: initialValues.description || '',
        vietnameseDescription: initialValues.vietnameseDescription || '',
        requirements: Array.isArray(initialValues.requirements) ? initialValues.requirements : [],
        benefits: Array.isArray(initialValues.benefits) ? initialValues.benefits : [],
        compensationType: initialValues.compensationType || 'hourly',
        compensationDetails: initialValues.salary || initialValues.compensationDetails || '',
        contactName: initialValues.contactName || '',
        contactPhone: initialValues.contactPhone || '',
        contactEmail: initialValues.contactEmail || '',
        contactNotes: initialValues.contactNotes || '',
      });
      
      console.log('✅ Form reset complete. Current values:', form.getValues());
    }
  }, [initialValues, form]);

  const handleSubmit = (data: EnhancedJobFormValues) => {
    console.log('📤 Form submitted with data:', data);
    onSubmit(data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <JobDetailsSection control={form.control} />
          <RequirementsSection form={form} />
          <CompensationSection control={form.control} />
          <ContactInfoSection control={form.control} />
          
          <div className="flex justify-end pt-6">
            <Button type="submit" className="px-8">
              Continue to Pricing
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EnhancedJobForm;
