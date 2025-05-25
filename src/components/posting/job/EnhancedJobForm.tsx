
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const jobFormSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  company: z.string().min(1, 'Company name is required'),
  location: z.string().min(1, 'Location is required'),
  employmentType: z.string().min(1, 'Employment type is required'),
  description: z.string().min(1, 'Job description is required'),
  requirements: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  salary: z.string().optional(),
  compensationType: z.string().optional(),
});

type JobFormData = z.infer<typeof jobFormSchema>;

interface EnhancedJobFormProps {
  initialValues?: Partial<JobFormData>;
  onSubmit: (data: JobFormData) => void;
}

const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({ initialValues, onSubmit }) => {
  console.log('🎯 EnhancedJobForm rendered with initialValues:', initialValues);
  console.log('📋 Initial values keys:', initialValues ? Object.keys(initialValues) : 'No initial values');
  
  const form = useForm<JobFormData>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: initialValues?.title || '',
      company: initialValues?.company || '',
      location: initialValues?.location || '',
      employmentType: initialValues?.employmentType || 'full-time',
      description: initialValues?.description || '',
      salary: initialValues?.salary || '',
      compensationType: 'hourly',
      requirements: initialValues?.requirements || [],
      benefits: initialValues?.benefits || [],
    },
  });

  console.log('✅ Form default values set:', form.getValues());

  const handleSubmit = (data: JobFormData) => {
    console.log('📤 Form submission data:', data);
    onSubmit(data);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-playfair">Job Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., Senior Nail Technician" 
                          {...field}
                          className="bg-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company/Salon Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your salon name" 
                          {...field}
                          className="bg-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="City, State" 
                          {...field}
                          className="bg-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="employmentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employment Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white">
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="compensationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Compensation Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Select compensation type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="salary">Salary</SelectItem>
                          <SelectItem value="commission">Commission</SelectItem>
                          <SelectItem value="hourly-commission">Hourly + Commission</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Compensation Details</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., $15-20/hour, 40-60% commission" 
                          {...field}
                          className="bg-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Description (English)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the position, responsibilities, requirements, and what makes your salon special..."
                        className="min-h-[150px] bg-white"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Benefits & Perks</h3>
                <div className="border rounded-lg p-4 bg-gray-50">
                  <Input 
                    placeholder="Add a benefit (e.g. Health insurance, Paid vacation)"
                    className="bg-white"
                  />
                  <Button type="button" variant="outline" className="mt-2">
                    Add
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                  Continue to Pricing
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedJobForm;
