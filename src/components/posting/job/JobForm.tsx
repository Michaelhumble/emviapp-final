
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobFormSchema, JobFormValues } from '../../../components/posting/job/jobFormSchema';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SectionHeader from '@/components/posting/SectionHeader';
import { FileText, List, Camera, Phone } from 'lucide-react';

export interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads?: File[];
  setPhotoUploads?: React.Dispatch<React.SetStateAction<File[]>>;
  isSubmitting?: boolean;
  defaultValues?: Partial<JobFormValues>;
}

// Re-export the JobFormValues type for convenience
export type { JobFormValues };

const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  photoUploads,
  setPhotoUploads,
  isSubmitting = false,
  defaultValues,
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

  const handleSubmit = (values: JobFormValues) => {
    onSubmit(values);
  };

  return (
    <FormProvider {...form}>
      <Form>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-10">
          {/* Section 1: Basic Job Information */}
          <div className="space-y-6">
            <SectionHeader
              title="Basic Job Information"
              emoji="📝"
              description="Tell potential applicants about your position"
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title*</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="e.g., Nail Technician, Hair Stylist"
                      className="w-full"
                    />
                  </FormControl>
                  <FormDescription>
                    Be clear and specific. Ex: Nail Tech – Full Time (Dip/Gel Experience)
                  </FormDescription>
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
                      <SelectTrigger className="w-full">
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
                      {...field} 
                      placeholder="e.g., San Jose, CA"
                      className="w-full"
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
                  <FormLabel>Salary / Compensation (Optional)</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="e.g., $20-25/hr or $60k-70k/year"
                      className="w-full"
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

          {/* Section 2: Job Details */}
          <div className="space-y-6">
            <SectionHeader
              title="Job Details"
              emoji="📄"
              description="Provide more information about the position"
            />

            <FormField
              control={form.control}
              name="jobSummary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Summary (Optional)</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="Brief one-line summary of the position"
                      className="w-full"
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
                      {...field} 
                      placeholder="Describe responsibilities, benefits, and other important details."
                      className="w-full min-h-[150px]"
                    />
                  </FormControl>
                  <FormDescription>
                    Describe responsibilities, benefits, and other important details.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Section 3: Photos (Optional) */}
          <div className="space-y-6">
            <SectionHeader
              title="Photos (Optional)"
              emoji="📷"
              description="Add photos to attract more applicants"
            />

            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 bg-gray-50">
              <p className="text-center text-muted-foreground">
                Photo upload functionality will be available soon. Adding photos can increase applications by up to 35%.
              </p>
            </div>
          </div>

          {/* Section 4: Contact Info */}
          <div className="space-y-6">
            <SectionHeader
              title="Contact Info"
              emoji="📞"
              description="How applicants can reach you"
            />

            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email*</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="e.g., hiring@yoursalon.com"
                      className="w-full"
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
                      {...field} 
                      placeholder="e.g., (555) 123-4567"
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Section 5: Get Better Results */}
          <div className="space-y-4 bg-violet-50 p-6 rounded-lg border border-violet-100">
            <h3 className="font-medium text-lg text-violet-700 flex items-center gap-2">
              💜 Get Better Results
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-violet-600 text-white rounded-sm flex items-center justify-center w-5 h-5 text-xs">✓</div>
                <div>
                  <p className="font-medium">Highlight your listing</p>
                  <p className="text-sm text-muted-foreground">Make your job stand out with premium placement</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-violet-600 text-white rounded-sm flex items-center justify-center w-5 h-5 text-xs">✓</div>
                <div>
                  <p className="font-medium">Extended visibility</p>
                  <p className="text-sm text-muted-foreground">Your job will be visible longer to attract more candidates</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-violet-600 text-white rounded-sm flex items-center justify-center w-5 h-5 text-xs">✓</div>
                <div>
                  <p className="font-medium">Smart matching</p>
                  <p className="text-sm text-muted-foreground">We'll match your job with qualified candidates in your area</p>
                </div>
              </div>
            </div>
          </div>

          {/* Final Step Button */}
          <div className="pt-4">
            <Button 
              type="submit"
              className="w-full bg-primary text-white hover:bg-primary/90 h-12"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Continue to Pricing'}
            </Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
};

export default JobForm;
