
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

// Clean schema for job details only
const jobDetailsSchema = z.object({
  salonName: z.string().min(1, { message: 'Salon name is required' }),
  jobTitle: z.string().min(1, { message: 'Job title is required' }),
  location: z.string().min(1, { message: 'Location is required' }),
  employmentType: z.enum(['full-time', 'part-time', 'contract', 'temporary'], {
    required_error: 'Employment type is required'
  }),
  compensationType: z.enum(['hourly', 'weekly', 'monthly'], {
    required_error: 'Compensation type is required'
  }),
  salary: z.string().min(1, { message: 'Salary is required' })
});

type JobDetailsFormValues = z.infer<typeof jobDetailsSchema>;

interface JobDetailsFormProps {
  onSubmit: (data: JobDetailsFormValues) => void;
}

const JobDetailsForm: React.FC<JobDetailsFormProps> = ({ onSubmit }) => {
  const form = useForm<JobDetailsFormValues>({
    resolver: zodResolver(jobDetailsSchema),
    defaultValues: {
      salonName: '',
      jobTitle: '',
      location: '',
      employmentType: undefined,
      compensationType: undefined,
      salary: ''
    }
  });

  const handleSubmit = (data: JobDetailsFormValues) => {
    onSubmit(data);
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">Job Details</h2>
        <p className="text-sm text-muted-foreground mt-1">Fill in the basic information about your job posting</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="salonName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 font-medium">Salon Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter salon name"
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
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 font-medium">Job Title *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter job title"
                      className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-900 font-medium">Location *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter location (city, state)"
                    className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="employmentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 font-medium">Employment Type *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500">
                        <SelectValue placeholder="Select employment type" />
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
              name="compensationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 font-medium">Compensation Type *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500">
                        <SelectValue placeholder="Select compensation type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-900 font-medium">Salary *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter salary range (e.g., $15-20/hour, $800-1200/week)"
                    className="border-gray-300 bg-white hover:border-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end pt-6 border-t">
            <Button
              type="submit"
              className="px-8 py-2"
            >
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default JobDetailsForm;
