
import React from 'react';
import { useForm, FormProvider, Controller, useFormContext } from 'react-hook-form';
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { UserProfile } from '@/context/auth/types';

interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  isSubmitting: boolean;
  defaultValues?: JobFormValues;
  industry?: string;
  userProfile?: UserProfile | null;
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
      phoneNumber: userProfile?.phoneNumber || '',
      jobType: 'full-time',
      requirements: [],
      jobSummary: ''
    },
  });

  const handleFormSubmit = (data: JobFormValues) => {
    onSubmit(data);
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6 p-6">
          {/* Basic Job Information Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Basic Job Information</h2>
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Nail Technician needed" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jobType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Type</FormLabel>
                  <FormControl>
                    <select 
                      className="w-full p-2 border rounded-md" 
                      {...field}
                    >
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="temporary">Temporary</option>
                    </select>
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
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="City, State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Compensation (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. $20-25/hour or $60K-70K/year" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Job Details Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Job Details</h2>
            
            <FormField
              control={form.control}
              name="jobSummary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Summary (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Brief summary of the position" {...field} />
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
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the job responsibilities and requirements"
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Contact Information Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Contact Information</h2>
            
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="contact@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="(123) 456-7890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Photo Upload Section - Placeholder */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Upload Photos (Optional)</h2>
            <p className="text-sm text-gray-500">
              Add photos of your salon or workplace to attract more applicants.
            </p>

            <div className="border-2 border-dashed rounded-lg p-6 text-center bg-gray-50">
              <p className="text-sm text-gray-500">
                Drop your images here or click to browse
              </p>
              <input 
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  if (e.target.files) {
                    setPhotoUploads(Array.from(e.target.files));
                  }
                }}
                className="mt-2"
              />
            </div>

            {photoUploads.length > 0 && (
              <div>
                <h3 className="font-medium text-sm mb-2">Uploaded Photos: {photoUploads.length}</h3>
                <div className="flex gap-2 flex-wrap">
                  {photoUploads.map((file, index) => (
                    <div key={index} className="relative">
                      <div className="border rounded-md p-2">
                        {file.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="px-6"
            >
              {isSubmitting ? 'Submitting...' : 'Continue to Pricing'}
            </Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
};

export default JobForm;
