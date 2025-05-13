
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
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
import { NotebookPen, FileText, Phone, Camera } from 'lucide-react';
import { jobFormSchema } from './jobFormSchema';

// Export the JobFormValues type
export type JobFormValues = z.infer<typeof jobFormSchema>;

export interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  isSubmitting: boolean;
  defaultValues?: Partial<JobFormValues>;
  industry?: string;
  userProfile?: any;
}

const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  photoUploads,
  setPhotoUploads,
  isSubmitting,
  defaultValues,
  industry = 'nails',
}) => {
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: defaultValues || {
      title: '',
      jobType: 'full-time',
      location: '',
      salary: '',
      jobSummary: '',
      description: '',
      contactEmail: '',
      phoneNumber: '',
    },
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Job Information Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <NotebookPen className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Basic Job Information</h2>
          </div>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title*</FormLabel>
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
                <FormLabel>Job Type*</FormLabel>
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
                <FormLabel>Location*</FormLabel>
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
                  Adding a salary range increases application rates by 30%
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Job Details Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Job Details</h2>
          </div>

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
                <FormLabel>Job Description*</FormLabel>
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

        {/* Photos Section (Placeholder) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Camera className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Photos (Optional)</h2>
          </div>
          
          <div className="bg-gray-100 border border-gray-200 rounded-md p-4">
            <p className="text-gray-600">
              Photo upload functionality will be available soon. Adding photos can increase applications by up to 35%.
            </p>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Phone className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Contact Info</h2>
          </div>

          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Email*</FormLabel>
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

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number*</FormLabel>
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
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-purple-100 border-b border-purple-200 px-4 py-3">
            <h3 className="text-lg font-semibold text-purple-800">Get Better Results</h3>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-start gap-2">
              <div className="bg-green-100 text-green-600 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
              <p>Highlight your listing — Make your job stand out with premium placement</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="bg-green-100 text-green-600 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
              <p>Extended visibility — Your job will be visible longer to attract more candidates</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="bg-green-100 text-green-600 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
              <p>Smart matching — We'll match your job with qualified candidates in your area</p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full bg-purple-600 hover:bg-purple-700" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'Continue to Pricing'}
        </Button>
      </form>
    </FormProvider>
  );
};

export default JobForm;
