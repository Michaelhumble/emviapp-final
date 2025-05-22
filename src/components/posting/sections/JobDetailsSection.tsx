
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { JobFormValues, IndustryType } from '@/components/posting/job/jobFormSchema';

interface JobDetailsSectionProps {
  form: UseFormReturn<JobFormValues>;
  industry?: IndustryType;
}

const JobDetailsSection: React.FC<JobDetailsSectionProps> = ({ form, industry }) => {
  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">Salon Information</h2>
        <p className="text-sm text-muted-foreground mt-1">Basic information about your business and job</p>
      </div>

      <FormField
        control={form.control}
        name="salonName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Salon or Business Name</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter your salon name"
                className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Job Title</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g., Experienced Nail Technician"
                className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                {...field}
              />
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
            <FormLabel className="text-gray-900 font-medium">Location</FormLabel>
            <FormControl>
              <Input
                placeholder="City, State"
                className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
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
            <FormLabel className="text-gray-900 font-medium">Job Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500">
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
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Job Description (English)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe the position, responsibilities, and requirements"
                className="min-h-[120px] border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="vietnameseDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Vietnamese Description (Optional)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Optional Vietnamese version of the job description"
                className="min-h-[120px] border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="experience_level"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Experience Level Required</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500">
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="entry-level">Entry Level</SelectItem>
                <SelectItem value="experienced">Experienced (1+ years)</SelectItem>
                <SelectItem value="mid-level">Mid-Level (2-4 years)</SelectItem>
                <SelectItem value="senior">Senior (5+ years)</SelectItem>
                <SelectItem value="any">Any Experience Level</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="salary_range"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Salary Range (Optional)</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g., $40,000 - $60,000 per year"
                className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default JobDetailsSection;
