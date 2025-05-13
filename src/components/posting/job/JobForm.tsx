import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import { Input } from '@/components/ui/input';
import { FormLabel } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import SectionHeader from '@/components/posting/SectionHeader';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';

interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  isSubmitting: boolean;
  defaultValues?: JobFormValues;
  industry?: string;
  userProfile?: any; // User profile with contact info
}

export const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  photoUploads,
  setPhotoUploads,
  isSubmitting,
  defaultValues,
  industry = "nails",
  userProfile
}) => {
  
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: defaultValues || {
      title: '',
      description: '',
      location: '',
      salary: '',
      contactEmail: userProfile?.email || '',
      phoneNumber: userProfile?.phone || '',
      jobType: 'full-time',
      requirements: [],
      jobSummary: ''
    }
  });

  const { register, handleSubmit, formState, watch } = form;
  const { errors } = formState;

  const handleFormSubmit = (data: JobFormValues) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8 pb-10">
      {/* Job Details Section */}
      <div className="space-y-6">
        <SectionHeader 
          title="Job Details" 
          emoji="💼" 
          description="Provide the essential information about the job opening"
        />
        
        {/* Job Title */}
        <div className="space-y-2">
          <FormLabel htmlFor="title">Job Title *</FormLabel>
          <Input
            id="title"
            placeholder="e.g., Experienced Nail Technician"
            {...register('title')}
            className={errors.title ? 'border-red-500' : ''}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>
        
        {/* Job Description */}
        <div className="space-y-2">
          <FormLabel htmlFor="description">Job Description *</FormLabel>
          <Textarea
            id="description"
            placeholder="Describe the role, responsibilities, and your salon environment..."
            rows={6}
            {...register('description')}
            className={errors.description ? 'border-red-500' : ''}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>
      </div>
      
      <Separator />
      
      {/* Location & Salary */}
      <div className="space-y-6">
        <SectionHeader 
          title="Location & Salary" 
          emoji="📍" 
          description="Help artists find this job by location and compensation"
        />
        
        {/* Location */}
        <div className="space-y-2">
          <FormLabel htmlFor="location">Location *</FormLabel>
          <Input
            id="location"
            placeholder="e.g., Miami, FL"
            {...register('location')}
            className={errors.location ? 'border-red-500' : ''}
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location.message}</p>
          )}
        </div>
        
        {/* Salary Range */}
        <div className="space-y-2">
          <FormLabel htmlFor="salary">Salary Range</FormLabel>
          <Input
            id="salary"
            placeholder="e.g., $50,000-$70,000/year or $25-35/hour"
            {...register('salary')}
          />
        </div>
      </div>
      
      <Separator />
      
      {/* Job Type */}
      <div className="space-y-6">
        <SectionHeader 
          title="Employment Type" 
          emoji="⏱️" 
          description="Select the type of employment being offered"
        />
        
        <div className="space-y-4">
          <RadioGroup defaultValue="full-time">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="full-time" id="full-time" {...register('jobType')} />
              <FormLabel htmlFor="full-time" className="font-normal">Full-time</FormLabel>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="part-time" id="part-time" {...register('jobType')} />
              <FormLabel htmlFor="part-time" className="font-normal">Part-time</FormLabel>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="contract" id="contract" {...register('jobType')} />
              <FormLabel htmlFor="contract" className="font-normal">Contract</FormLabel>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="temporary" id="temporary" {...register('jobType')} />
              <FormLabel htmlFor="temporary" className="font-normal">Temporary</FormLabel>
            </div>
          </RadioGroup>
        </div>
      </div>
      
      <Separator />
      
      {/* Contact Information */}
      <div className="space-y-6">
        <SectionHeader 
          title="Contact Information" 
          emoji="📞" 
          description="How should candidates contact you about this position?"
        />
        
        {/* Contact Email */}
        <div className="space-y-2">
          <FormLabel htmlFor="contactEmail">Email</FormLabel>
          <Input
            id="contactEmail"
            type="email"
            placeholder="your@email.com"
            {...register('contactEmail')}
            className={errors.contactEmail ? 'border-red-500' : ''}
          />
          {errors.contactEmail && (
            <p className="text-red-500 text-sm">{errors.contactEmail.message}</p>
          )}
        </div>
        
        {/* Phone Number */}
        <div className="space-y-2">
          <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
          <Input
            id="phoneNumber"
            placeholder="(123) 456-7890"
            {...register('phoneNumber')}
          />
        </div>
        
        {/* Photo Upload */}
        <div className="space-y-3">
          <FormLabel>Photos (optional)</FormLabel>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <p className="text-gray-500">Drag & drop photos here or click to browse</p>
            <p className="text-sm text-gray-400 mt-1">Upload up to 3 photos of your salon or workspace</p>
          </div>
          <p className="text-sm text-gray-500">You can add up to 3 photos</p>
        </div>
      </div>
      
      <div className="pt-4">
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Submitting...' : 'Post Job'}
        </Button>
      </div>
    </form>
  );
};

export default JobForm;
