
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { JobDetailsSubmission } from '@/types/job';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from '@/components/ui/separator';
import UploadSection from '@/components/posting/sections/UploadSection';
import { toast } from 'sonner';

// Define a schema that matches the required fields in JobDetailsSubmission
const jobFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  location: z.string().min(3, "Location is required"),
  company: z.string().min(2, "Company name is required"),
  jobType: z.string().min(1, "Job type is required"),
  salary: z.string().optional(),
});

// Define the type for our form values based on the schema
type JobFormValues = z.infer<typeof jobFormSchema>;

interface JobDetailsFormProps {
  onSubmit: (data: JobDetailsSubmission) => void;
}

const JobDetailsForm: React.FC<JobDetailsFormProps> = ({ onSubmit }) => {
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      company: '',
      jobType: 'full-time',
      salary: '',
    }
  });

  const handleFormSubmit = (values: JobFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Create a properly typed JobDetailsSubmission object with explicit field mapping
      const jobDetails: JobDetailsSubmission = {
        // Required fields
        title: values.title,
        description: values.description,
        location: values.location,
        company: values.company,
        jobType: values.jobType,
        
        // Optional fields
        salary: values.salary || undefined,
        photos: photoUploads.length > 0 ? photoUploads : undefined,
      };
      
      // Type assertion to ensure our object matches JobDetailsSubmission
      const isValidSubmission = (submission: JobDetailsSubmission): submission is JobDetailsSubmission => {
        const requiredFields = ['title', 'description', 'location', 'company', 'jobType'];
        return requiredFields.every(field => field in submission && !!submission[field as keyof JobDetailsSubmission]);
      };
      
      if (!isValidSubmission(jobDetails)) {
        toast.error("Missing required fields in job submission");
        setIsSubmitting(false);
        return;
      }
      
      // Submit the validated job details
      onSubmit(jobDetails);
    } catch (error) {
      console.error("Error processing form submission:", error);
      toast.error("There was an issue submitting your job posting");
      setIsSubmitting(false);
    }
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
                {form.formState.errors.title && (
                  <p className="text-sm text-red-500">{form.formState.errors.title.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Company</label>
                <input 
                  type="text"
                  className="w-full border rounded-md p-2"
                  {...form.register('company')}
                  placeholder="Your salon name"
                />
                {form.formState.errors.company && (
                  <p className="text-sm text-red-500">{form.formState.errors.company.message}</p>
                )}
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <label className="text-sm font-medium">Job Description</label>
              <textarea
                className="w-full border rounded-md p-2 min-h-[150px]"
                {...form.register('description')}
                placeholder="Describe the position, requirements, and benefits"
              />
              {form.formState.errors.description && (
                <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
              )}
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
                {form.formState.errors.location && (
                  <p className="text-sm text-red-500">{form.formState.errors.location.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Salary (Optional)</label>
                <input 
                  type="text"
                  className="w-full border rounded-md p-2"
                  {...form.register('salary')}
                  placeholder="e.g. $20-25/hr or Competitive"
                />
                {form.formState.errors.salary && (
                  <p className="text-sm text-red-500">{form.formState.errors.salary.message}</p>
                )}
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
              {form.formState.errors.jobType && (
                <p className="text-sm text-red-500">{form.formState.errors.jobType.message}</p>
              )}
            </div>
          </div>
          
          <Separator />
          
          <UploadSection
            uploads={photoUploads}
            setUploads={setPhotoUploads}
            maxPhotos={5}
          />
          
          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : 'Continue to Pricing'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default JobDetailsForm;
