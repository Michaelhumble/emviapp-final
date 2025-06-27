
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import JobDetailsSection from '@/components/posting/sections/JobDetailsSection';
import RequirementsSection from '@/components/posting/sections/RequirementsSection';
import CompensationSection from '@/components/posting/sections/CompensationSection';
import ContactInfoSection from '@/components/posting/sections/ContactInfoSection';
import PhotoUploadSection from '@/components/posting/sections/PhotoUploadSection';

const enhancedJobFormSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  company: z.string().optional(),
  salonName: z.string().min(1, "Salon name is required"),
  location: z.string().min(1, "Location is required"),
  employmentType: z.string().min(1, "Employment type is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  vietnameseDescription: z.string().optional(),
  requirements: z.array(z.string()).default([]),
  benefits: z.array(z.string()).default([]),
  compensationType: z.string().default("hourly"),
  compensationDetails: z.string().optional(),
  salary: z.string().optional(),
  contactName: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().optional(),
  contactNotes: z.string().optional(),
});

type EnhancedJobFormValues = z.infer<typeof enhancedJobFormSchema>;

interface EnhancedJobFormProps {
  initialValues?: Partial<EnhancedJobFormValues>;
  onSubmit: (data: EnhancedJobFormValues & { photoUploads: File[] }) => void;
}

const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({ initialValues, onSubmit }) => {
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  
  console.log('🎯 EnhancedJobForm received initialValues:', initialValues);
  
  const form = useForm<EnhancedJobFormValues>({
    resolver: zodResolver(enhancedJobFormSchema),
    defaultValues: {
      title: '',
      company: '',
      salonName: '',
      location: '',
      employmentType: '',
      description: '',
      vietnameseDescription: '',
      requirements: [],
      benefits: [],
      compensationType: 'hourly',
      compensationDetails: '',
      salary: '',
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
        company: initialValues.company || '',
        salonName: initialValues.company || initialValues.salonName || '',
        location: initialValues.location || '',
        employmentType: initialValues.employmentType || '',
        description: initialValues.description || '',
        vietnameseDescription: initialValues.vietnameseDescription || '',
        requirements: Array.isArray(initialValues.requirements) ? initialValues.requirements : [],
        benefits: Array.isArray(initialValues.benefits) ? initialValues.benefits : [],
        compensationType: initialValues.compensationType || 'hourly',
        compensationDetails: initialValues.compensationDetails || '',
        salary: initialValues.salary || '',
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
    console.log('📷 Photos attached:', photoUploads.length);
    onSubmit({ ...data, photoUploads });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      <div className="max-w-4xl mx-auto p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-12">
            <JobDetailsSection control={form.control} />
            <RequirementsSection form={form} />
            <CompensationSection control={form.control} />
            <PhotoUploadSection 
              photoUploads={photoUploads}
              setPhotoUploads={setPhotoUploads}
              maxPhotos={5}
            />
            <ContactInfoSection control={form.control} />
            
            <div className="flex justify-end pt-8">
              <Button 
                type="submit" 
                className="px-12 py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl shadow-lg"
              >
                Continue to Pricing ✨
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EnhancedJobForm;
