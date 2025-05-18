
import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { JobFormValues } from './jobFormSchema';
import ContactInfoSection from '../sections/ContactInfoSection';
import EmploymentDetailsSection from '../sections/EmploymentDetailsSection';
import { useTranslation } from '@/hooks/useTranslation';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';

// Define the form schema using Zod
const formSchema = z.object({
  title: z.string().min(3, { message: 'Job title is required' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  vietnameseDescription: z.string().optional(),
  location: z.string().min(2, { message: 'Location is required' }),
  compensation_details: z.string().optional(),
  salary_range: z.string().optional(),
  employment_type: z.string(),
  experience_level: z.string(),
  contactEmail: z.string().email({ message: 'Valid email address is required' }),
  contactPhone: z.string().optional(),
  requirements: z.array(z.string()).optional(),
  specialties: z.array(z.string()).optional(),
  contact_info: z.object({
    email: z.string().email().optional(),
    phone: z.string().optional(),
    name: z.string().optional(),
  }).optional(),
});

// Define the component props
interface JobFormProps {
  onSubmit: (data: any) => void;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  isSubmitting?: boolean;
  initialValues?: JobFormValues;
  onBack?: () => void;
}

export const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  photoUploads,
  setPhotoUploads,
  isSubmitting = false,
  initialValues,
  onBack
}) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);

  // Setup form with default values
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialValues?.title || '',
      description: initialValues?.description || '',
      vietnameseDescription: initialValues?.vietnameseDescription || '',
      location: initialValues?.location || '',
      compensation_details: initialValues?.compensation_details || '',
      salary_range: initialValues?.salary_range || '',
      employment_type: initialValues?.jobType || 'full-time',
      experience_level: initialValues?.experience_level || 'experienced',
      contactEmail: initialValues?.contactEmail || '',
      requirements: initialValues?.requirements || [],
      specialties: initialValues?.specialties || [],
      contact_info: {
        email: initialValues?.contactEmail || '',
        phone: '',
        name: '',
      },
    }
  });

  // Handle form submission
  const handleFormSubmit = (data: any) => {
    // Convert form data to proper structure
    const formattedData = {
      ...data,
      requirements: Array.isArray(data.requirements) ? data.requirements : [],
      specialties: Array.isArray(data.specialties) ? data.specialties : [],
    };
    
    onSubmit(formattedData);
  };

  const [basicInfoComplete, setBasicInfoComplete] = useState(false);
  const [detailsComplete, setDetailsComplete] = useState(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold font-playfair bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent mb-1">
              Customize Your Job Post
            </h2>
            <p className="text-gray-500 text-sm">
              We've pre-filled everything for you, but feel free to make any changes
            </p>
          </div>
          {onBack && (
            <Button 
              type="button" 
              variant="ghost" 
              onClick={onBack} 
              className="flex items-center gap-1"
              size="sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Templates
            </Button>
          )}
        </div>
        
        {/* Basic Info Section */}
        <Card className="p-6 bg-white/50 shadow-sm">
          <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-purple-500" />
            Basic Job Information
          </h3>
          
          <div className="grid gap-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Job Title
                </label>
                <input
                  id="title"
                  {...form.register('title')}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g. Nail Technician, Hair Stylist"
                />
                {form.formState.errors.title && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.title.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  id="location"
                  {...form.register('location')}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="City, State e.g. Miami, FL"
                />
                {form.formState.errors.location && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.location.message}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Job Description (English)
              </label>
              <textarea
                id="description"
                {...form.register('description')}
                rows={5}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Describe the position, responsibilities, and what makes your salon special..."
              />
              {form.formState.errors.description && (
                <p className="text-red-500 text-xs mt-1">{form.formState.errors.description.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="vietnameseDescription" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                Vietnamese Description 
                <span className="text-xs text-gray-500 font-normal">(Optional but recommended)</span>
              </label>
              <textarea
                id="vietnameseDescription"
                {...form.register('vietnameseDescription')}
                rows={5}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Add description in Vietnamese to reach more candidates..."
              />
            </div>
          </div>
        </Card>

        {/* Compensation Section */}
        <Card className="p-6 bg-white/50 shadow-sm">
          <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-purple-500" />
            Compensation & Benefits
          </h3>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="salary_range" className="block text-sm font-medium text-gray-700">
                Salary/Pay Range
              </label>
              <input
                id="salary_range"
                {...form.register('salary_range')}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g. $20-25/hr or $800-1200/week"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="compensation_details" className="block text-sm font-medium text-gray-700">
                Additional Compensation Details
              </label>
              <input
                id="compensation_details"
                {...form.register('compensation_details')}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g. Tips average $200/day, Performance bonuses"
              />
            </div>
          </div>
        </Card>
        
        {/* Employment Details Section */}
        <EmploymentDetailsSection form={form} />
        
        {/* Contact Information Section */}
        <ContactInfoSection form={form} />
        
        {/* Form Action Buttons */}
        <div className="flex justify-end">
          <Button 
            type="submit"
            disabled={isSubmitting} 
            className="px-8 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
          >
            Continue to Pricing
          </Button>
        </div>
      </form>
    </Form>
  );
};

