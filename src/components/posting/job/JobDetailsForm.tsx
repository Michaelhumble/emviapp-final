
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { JobDetailsSubmission } from '@/types/job';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from '@/components/ui/separator';
import UploadSection from '@/components/posting/sections/UploadSection';

// Simple job submission schema
const jobFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  location: z.string().min(3, "Location is required"),
  salary: z.string().optional(),
  jobType: z.string(),
  company: z.string().min(2, "Company name is required")
});

interface JobDetailsFormProps {
  onSubmit: (data: JobDetailsSubmission) => void;
}

const JobDetailsForm: React.FC<JobDetailsFormProps> = ({ onSubmit }) => {
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  
  const form = useForm<z.infer<typeof jobFormSchema>>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      salary: '',
      jobType: 'full-time',
      company: ''
    }
  });

  const handleFormSubmit = (values: z.infer<typeof jobFormSchema>) => {
    // Convert form data to JobDetailsSubmission format
    const jobDetails: JobDetailsSubmission = {
      ...values,
      photos: photoUploads,
      // Note: removed createdAt as it's not in the JobDetailsSubmission type
    };
    
    onSubmit(jobDetails);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Post a Job</h1>
        <p className="text-gray-600 mt-2">Fill out the details below to create your job listing</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
          <div className="bg-white rounded-lg border shadow-sm p-6">
            {/* Form fields would go here - simplified for this fix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Job Title</label>
                <input 
                  type="text"
                  className="w-full border rounded-md p-2"
                  {...form.register('title')}
                  placeholder="e.g. Nail Technician"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Company</label>
                <input 
                  type="text"
                  className="w-full border rounded-md p-2"
                  {...form.register('company')}
                  placeholder="Your salon name"
                />
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <label className="text-sm font-medium">Job Description</label>
              <textarea
                className="w-full border rounded-md p-2 min-h-[150px]"
                {...form.register('description')}
                placeholder="Describe the position, requirements, and benefits"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <input 
                  type="text"
                  className="w-full border rounded-md p-2"
                  {...form.register('location')}
                  placeholder="City, State"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Salary (Optional)</label>
                <input 
                  type="text"
                  className="w-full border rounded-md p-2"
                  {...form.register('salary')}
                  placeholder="e.g. $20-25/hr or Competitive"
                />
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <label className="text-sm font-medium">Job Type</label>
              <select 
                className="w-full border rounded-md p-2"
                {...form.register('jobType')}
              >
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="temporary">Temporary</option>
              </select>
            </div>
          </div>
          
          <Separator />
          
          <UploadSection
            uploads={photoUploads}
            setUploads={setPhotoUploads}
            maxPhotos={5}
          />
          
          <div className="flex justify-end">
            <Button type="submit" size="lg">
              Continue to Pricing
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default JobDetailsForm;
