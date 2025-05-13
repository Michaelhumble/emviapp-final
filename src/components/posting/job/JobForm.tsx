
import React from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { JobFormValues, jobFormSchema } from './jobFormSchema';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import SectionHeader from '@/components/posting/SectionHeader';
import HelperTip from '@/components/posting/HelperTip';
import { UserProfile } from '@/context/auth';

interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  isSubmitting: boolean;
  defaultValues?: JobFormValues;
  industry?: string;
  userProfile?: UserProfile | null;
}

const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  photoUploads,
  setPhotoUploads,
  isSubmitting,
  defaultValues = {
    title: '',
    description: '',
    location: '',
    salary: '',
    contactEmail: '',
    phoneNumber: '',
    jobType: 'full-time',
    requirements: [],
    jobSummary: '',
  },
  industry = 'nails',
  userProfile,
}) => {
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues,
  });

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit} className="p-6 space-y-8">
        {/* Basic Job Info Section */}
        <div className="mb-6">
          <SectionHeader
            title="Basic Job Info"
            emoji="📋"
            description="Let's start with essential information about the position"
          />
          
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="E.g., Nail Technician - Full Time"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-muted-foreground text-xs">
                    Be clear and specific. Ex: Nail Tech – Full Time (Dip/Gel Experience)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City & State</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="E.g., Los Angeles, CA"
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
                    <FormLabel>Job Type</FormLabel>
                    <FormControl>
                      <select
                        className="w-full h-12 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 md:text-sm"
                        {...field}
                      >
                        <option value="full-time">Full-Time</option>
                        <option value="part-time">Part-Time</option>
                        <option value="contract">Contract</option>
                        <option value="temporary">Temporary</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Compensation Fields */}
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Compensation</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="E.g., $25-35/hr plus tips"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Job Details Section */}
        <div className="mb-6">
          <SectionHeader
            title="Job Details"
            emoji="🧾"
            description="Add details that make your job stand out"
          />
          
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="jobSummary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Summary</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Short summary or tagline for the job"
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
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the position, responsibilities, and ideal candidate"
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <HelperTip icon="💡">
                    Be detailed about expectations, hours, and what makes your salon special. This helps attract the right candidates.
                  </HelperTip>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Photos Section */}
        <div className="mb-6">
          <SectionHeader
            title="Photos (Optional)"
            emoji="📸"
            description="Show off your salon and work environment"
          />
          
          <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-6 text-center">
            <p className="text-muted-foreground">
              Image upload currently disabled. Coming soon!
            </p>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="mb-6">
          <SectionHeader
            title="Contact Info"
            emoji="📞"
            description="How candidates can reach you"
          />
          
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="salon@example.com"
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
                  <FormLabel>Contact Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(123) 456-7890"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Boost Visibility Section */}
        <div className="mb-6">
          <SectionHeader
            title="Boost Visibility"
            emoji="💎"
            description="Options to increase your post's reach"
          />
          
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
            <p className="text-blue-800 text-sm">
              You'll be able to select premium visibility options after reviewing your post.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t flex justify-end">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="px-8"
          >
            {isSubmitting ? 'Submitting...' : 'Continue to Pricing'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default JobForm;
