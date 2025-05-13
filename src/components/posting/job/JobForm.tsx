
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobFormSchema } from './jobFormSchema';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

// Export the type for use in other components
export type JobFormValues = z.infer<typeof jobFormSchema>;

// Define props for JobForm component
export interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  isSubmitting: boolean;
  defaultValues?: JobFormValues;
  industry?: string; // Add industry prop to match EnhancedJobForm usage
  userProfile?: any; // Add userProfile prop
}

const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  photoUploads,
  setPhotoUploads,
  isSubmitting,
  defaultValues,
  industry = "nails",
  userProfile,
}) => {
  // Initialize the form with react-hook-form
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: defaultValues || {
      title: '',
      description: '',
      location: userProfile?.location || '',
      salary: '',
      contactEmail: userProfile?.email || '',
      phoneNumber: userProfile?.phone || '',
      jobType: 'full-time',
      requirements: [],
      jobSummary: ''
    },
  });

  // Handle form submission
  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Basic Job Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-medium mb-4 flex items-center">
            <span className="mr-2">📝</span>
            Basic Job Information
          </h2>
          
          {/* Job Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Job Title <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Nail Technician, Hair Stylist"
                    {...field}
                  />
                </FormControl>
                <p className="text-sm text-muted-foreground">
                  Be clear and specific. Ex: Nail Tech – Full Time (Dip/Gel Experience)
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Job Type */}
          <FormField
            control={form.control}
            name="jobType"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Job Type <span className="text-red-500">*</span></FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="temporary">Temporary</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Location */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Location <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., San Jose, CA"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Salary */}
          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salary / Compensation</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., $20-25/hr or $60k-70k/year"
                    {...field}
                  />
                </FormControl>
                <p className="text-sm text-muted-foreground">
                  Adding a salary range increases application rates by 30%
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Section 2: Job Details */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-medium mb-4 flex items-center">
            <span className="mr-2">📄</span>
            Job Details
          </h2>
          
          {/* Job Summary */}
          <FormField
            control={form.control}
            name="jobSummary"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Job Summary</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Brief one-line summary of the position"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Job Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Description <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe responsibilities, benefits, and other important details."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Section 3: Photos (Optional) */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-medium mb-4 flex items-center">
            <span className="mr-2">📷</span>
            Photos (Optional)
          </h2>
          
          <div className="border border-dashed border-gray-300 rounded-md p-6 text-center bg-gray-50">
            <p className="text-muted-foreground">
              Photo upload functionality will be available soon. Adding photos can increase applications by up to 35%.
            </p>
          </div>
        </div>

        {/* Section 4: Contact Info */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-medium mb-4 flex items-center">
            <span className="mr-2">📞</span>
            Contact Info
          </h2>
          
          {/* Contact Email */}
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Contact Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., hiring@yoursalon.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., (555) 123-4567"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Section 5: Get Better Results */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-medium mb-4 flex items-center text-purple-700">
            <span className="mr-2">💜</span>
            Get Better Results
          </h2>
          
          <div className="space-y-3 bg-purple-50 p-4 rounded-md">
            <div className="flex items-start">
              <div className="h-5 w-5 rounded border border-purple-400 bg-purple-100 flex items-center justify-center mr-3 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-purple-700" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">Highlight your listing</p>
                <p className="text-xs text-gray-600">Make your job stand out with premium placement</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="h-5 w-5 rounded border border-purple-400 bg-purple-100 flex items-center justify-center mr-3 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-purple-700" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">Extended visibility</p>
                <p className="text-xs text-gray-600">Your job will be visible longer to attract more candidates</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="h-5 w-5 rounded border border-purple-400 bg-purple-100 flex items-center justify-center mr-3 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-purple-700" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">Smart matching</p>
                <p className="text-xs text-gray-600">We'll match your job with qualified candidates in your area</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Submit Button */}
        <Button 
          type="submit" 
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 rounded-md font-medium text-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'Continue to Pricing'}
        </Button>
      </form>
    </Form>
  );
};

export default JobForm;
