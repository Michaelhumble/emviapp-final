import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import JobDetailsSection from '@/components/posting/sections/JobDetailsSection';
import RequirementsSection from '@/components/posting/sections/RequirementsSection';
import CompensationSection from '@/components/posting/sections/CompensationSection';
import ContactInfoSection from '@/components/posting/sections/ContactInfoSection';
import PhotoUploadSection from '@/components/posting/sections/PhotoUploadSection';

// Job categories - locked choices
const JOB_CATEGORIES = [
  'Nail Tech',
  'Hair Stylist', 
  'Lash Tech',
  'Barber',
  'Spa',
  'Tattoo',
  'Esthetician',
  'Makeup',
  'Other'
] as const;

const enhancedJobFormSchema = z.object({
  category: z.enum(JOB_CATEGORIES, { 
    required_error: "Please select a beauty industry category" 
  }),
  otherCategoryDescription: z.string().optional(),
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
      category: 'Nail Tech', // Default to first option
      otherCategoryDescription: '',
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

  const selectedCategory = form.watch('category');

  // Update form values when initialValues change
  useEffect(() => {
    if (initialValues) {
      console.log('🔄 Updating form with initialValues:', initialValues);
      
      // Reset form with new values
      form.reset({
        category: initialValues.category || 'Nail Tech',
        otherCategoryDescription: initialValues.otherCategoryDescription || '',
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
            
            {/* Category Selection - Required First Step */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200/60">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Beauty Industry Category</h2>
                <p className="text-slate-600">Select the primary category for this job posting</p>
              </div>
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold text-slate-700">
                      Job Category *
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full h-12 text-base">
                          <SelectValue placeholder="Select a beauty industry category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {JOB_CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Other Category Description Field */}
              {selectedCategory === 'Other' && (
                <div className="mt-4">
                  <FormField
                    control={form.control}
                    name="otherCategoryDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold text-slate-700">
                          Please specify the job category
                        </FormLabel>
                        <FormControl>
                          <input
                            {...field}
                            className="w-full h-12 px-4 text-base border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="e.g., Massage Therapist, Receptionist, etc."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>

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
