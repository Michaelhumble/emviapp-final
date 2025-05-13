
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { JobFormValues, jobFormSchema } from './jobFormSchema';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import SectionHeader from '@/components/posting/SectionHeader';

interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads?: File[];
  setPhotoUploads?: (files: File[]) => void;
  isSubmitting?: boolean;
}

const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  photoUploads = [],
  setPhotoUploads = () => {},
  isSubmitting = false
}) => {
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: '',
      location: '',
      salary: '',
      jobType: 'full-time',
      description: '',
      contactEmail: '',
      phoneNumber: '',
      jobSummary: '',
      requirements: []
    }
  });

  const handleSubmit = (values: JobFormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {/* Basic Job Information */}
        <div className="space-y-6">
          <SectionHeader 
            title="Basic Job Information" 
            emoji="📝" 
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., Nail Technician, Hair Stylist" 
                    {...field} 
                  />
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
                <FormLabel>Job Type *</FormLabel>
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

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location *</FormLabel>
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

          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salary (Optional)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., $20-25/hr or $60k-70k/year" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Adding salary information can increase application rates.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Job Details */}
        <div className="space-y-6">
          <SectionHeader 
            title="Job Details" 
            emoji="📄" 
          />
          
          <FormField
            control={form.control}
            name="jobSummary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Summary (Optional)</FormLabel>
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

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Description *</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe responsibilities, benefits, and other important details." 
                    className="min-h-[150px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Photos Section */}
        <div className="space-y-6">
          <SectionHeader 
            title="Photos" 
            emoji="📷" 
            description="(Optional)" 
          />
          
          <div className="border border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 text-center">
            <p className="text-muted-foreground">
              Photo upload functionality will be available soon. Adding photos can increase applications by up to 35%.
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <SectionHeader 
            title="Contact Information" 
            emoji="☎️" 
          />
          
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Email *</FormLabel>
                <FormControl>
                  <Input 
                    type="email"
                    placeholder="e.g., hiring@yoursalon.com" 
                    {...field} 
                  />
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
                <FormLabel>Phone Number *</FormLabel>
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

        {/* Get Better Results Box */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-medium text-purple-800 mb-4">Get Better Results</h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                <div className="bg-purple-100 border border-purple-300 rounded w-5 h-5 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-purple-800" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">Highlight your listing — Make your job stand out with premium placement</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                <div className="bg-purple-100 border border-purple-300 rounded w-5 h-5 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-purple-800" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">Extended visibility — Your job will be visible longer to attract more candidates</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                <div className="bg-purple-100 border border-purple-300 rounded w-5 h-5 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-purple-800" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">Smart matching — We'll match your job with qualified candidates in your area</p>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <Button
            type="submit"
            className="w-full md:w-auto bg-purple-600 hover:bg-purple-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Continue to Pricing'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default JobForm;
