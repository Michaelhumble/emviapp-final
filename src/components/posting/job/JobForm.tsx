
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form';
import { JobFormValues } from './jobFormSchema';
import { Switch } from '@/components/ui/switch';
import ContactInfoSection from '@/components/posting/sections/ContactInfoSection';
import EmploymentDetailsSection from '@/components/posting/sections/EmploymentDetailsSection';

interface JobFormProps {
  onSubmit: (data: JobFormValues) => void;
  onBack?: () => void;
  initialValues?: JobFormValues;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  isSubmitting: boolean;
  showVietnameseByDefault?: boolean;
}

const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  onBack,
  initialValues,
  photoUploads,
  setPhotoUploads,
  isSubmitting,
  showVietnameseByDefault = false,
}) => {
  
  const form = useForm<JobFormValues>({
    defaultValues: initialValues || {
      title: '',
      description: '',
      location: '',
      jobType: 'full-time',
      experience_level: 'experienced',
      contactEmail: '',
    },
  });
  
  const [showVietnameseDescription, setShowVietnameseDescription] = useState(showVietnameseByDefault);

  // Submit handler
  const handleSubmit = (data: JobFormValues) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="space-y-10">
          {/* Back button */}
          {onBack && (
            <div>
              <Button 
                type="button" 
                variant="outline" 
                onClick={onBack}
                className="rounded-xl border-gray-300 hover:bg-gray-100 hover:text-gray-900 transition-colors mb-4"
              >
                Back to Templates
              </Button>
            </div>
          )}
          
          {/* Job Details Section */}
          <div className="space-y-6">
            <div className="border-b pb-2">
              <h2 className="font-playfair text-2xl font-semibold text-gray-900">Job Details</h2>
              <p className="text-sm text-muted-foreground">Basic information about the position</p>
            </div>
            
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900">Job Title *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., Master Nail Technician, Hair Stylist" 
                        {...field} 
                        className="rounded-xl h-11 border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900">Location *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="City, State or Full Address" 
                        {...field} 
                        className="rounded-xl h-11 border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900">Job Description *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the role, responsibilities, and ideal candidate..." 
                        className="min-h-[200px] rounded-xl border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Vietnamese Description Toggle & Field */}
              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  checked={showVietnameseDescription}
                  onCheckedChange={setShowVietnameseDescription}
                  id="vietnamese-mode"
                />
                <label
                  htmlFor="vietnamese-mode"
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  Add Vietnamese Description
                </label>
              </div>
              
              {showVietnameseDescription && (
                <FormField
                  control={form.control}
                  name="vietnameseDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900">Vietnamese Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Mô tả công việc bằng tiếng Việt..." 
                          className="min-h-[200px] rounded-xl border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          </div>
          
          {/* Employment Details Section */}
          <EmploymentDetailsSection form={form} />
          
          {/* Contact Info Section */}
          <ContactInfoSection form={form} />
        </div>
        
        <div className="pt-6">
          <Button 
            type="submit" 
            className="w-full rounded-xl h-12 text-lg font-medium bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md transition-all duration-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Continue to Review'}
          </Button>
        </div>

        <div className="text-center pt-6 pb-2">
          <p className="text-sm italic text-gray-500">
            Inspired by Sunshine ☀️
          </p>
        </div>
      </form>
    </Form>
  );
};

export default JobForm;
