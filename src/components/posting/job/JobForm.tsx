
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { JobFormValues } from './jobFormSchema';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { SectionHeader } from '@/components/posting/SectionHeader';

interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  isSubmitting: boolean;
  defaultValues?: JobFormValues;
  industry?: string;
  userProfile?: any;
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
    resolver: zodResolver(z.object({
      title: z.string().min(5, "Title must be at least 5 characters"),
      description: z.string().min(20, "Description must be at least 20 characters"),
      location: z.string().min(3, "Location is required"),
      salary: z.string().optional(),
      contactEmail: z.string().email("Invalid email").optional().or(z.literal("")),
      phoneNumber: z.string().optional(),
      jobType: z.string().optional(),
      requirements: z.string().optional(),
      jobSummary: z.string().optional(),
    })),
    defaultValues: defaultValues || {
      title: '',
      description: '',
      location: '',
      salary: '',
      contactEmail: userProfile?.email || '',
      phoneNumber: userProfile?.phone || '',
      jobType: 'full-time',
      requirements: '',
      jobSummary: '',
    },
  });

  const handleSubmit = (values: JobFormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 p-6">
        <div className="space-y-4">
          <SectionHeader title="Basic Job Details" subtitle="Tell artists what you're looking for" />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">Job Title</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., Nail Technician Needed" 
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
                <FormLabel className="font-medium">Job Type</FormLabel>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="full-time"
                      checked={field.value === 'full-time'}
                      onCheckedChange={() => field.onChange('full-time')}
                    />
                    <label htmlFor="full-time" className="text-sm">Full-time</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="part-time"
                      checked={field.value === 'part-time'}
                      onCheckedChange={() => field.onChange('part-time')}
                    />
                    <label htmlFor="part-time" className="text-sm">Part-time</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="contract"
                      checked={field.value === 'contract'}
                      onCheckedChange={() => field.onChange('contract')}
                    />
                    <label htmlFor="contract" className="text-sm">Contract</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="temporary"
                      checked={field.value === 'temporary'}
                      onCheckedChange={() => field.onChange('temporary')}
                    />
                    <label htmlFor="temporary" className="text-sm">Temporary</label>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">Location</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., Boston, MA" 
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
                <FormLabel className="font-medium">Salary Range (optional)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., $25-30/hr or $50k-60k/year" 
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
                <FormLabel className="font-medium">Job Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe the position, responsibilities, and what you're looking for in a candidate..." 
                    className="min-h-[150px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Contact Information Section */}
          <SectionHeader title="Contact Information" subtitle="How can applicants reach you?" />

          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">Contact Email (optional)</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="your@email.com" 
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
                <FormLabel className="font-medium">Phone Number (optional)</FormLabel>
                <FormControl>
                  <Input 
                    type="tel" 
                    placeholder="(123) 456-7890" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end pt-6">
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
  );
};

export default JobForm;
