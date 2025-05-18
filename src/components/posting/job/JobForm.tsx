import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form';
import { JobFormValues } from './jobFormSchema';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
        <div className="space-y-8">
          {/* Back button */}
          {onBack && (
            <div>
              <Button 
                type="button" 
                variant="outline" 
                onClick={onBack}
                className="mb-4"
              >
                Back to Templates
              </Button>
            </div>
          )}
          
          {/* Job Details Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Job Details</h2>
            <p className="text-sm text-muted-foreground">Basic information about the position</p>
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Master Nail Technician, Hair Stylist" 
                      {...field} 
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
                  <FormLabel>Location *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="City, State or Full Address" 
                      {...field} 
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
                  <FormLabel>Job Description *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the role, responsibilities, and ideal candidate..." 
                      className="min-h-[150px]"
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
                    <FormLabel>Vietnamese Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Mô tả công việc bằng tiếng Việt..." 
                        className="min-h-[150px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          
          {/* Employment Details Section */}
          <EmploymentDetailsSection form={form} />
          
          {/* Contact Info Section */}
          <ContactInfoSection form={form} />
        </div>
        
        <div className="pt-4">
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Continue to Review'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default JobForm;
