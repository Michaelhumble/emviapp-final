
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const enhancedJobSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  company: z.string().min(1, 'Company name is required'),
  location: z.string().min(1, 'Location is required'),
  description: z.string().optional(),
  requirements: z.string().optional(),
  benefits: z.string().optional(),
  salary: z.string().optional(),
});

type EnhancedJobFormData = z.infer<typeof enhancedJobSchema>;

interface EnhancedJobFormProps {
  initialValues?: Partial<EnhancedJobFormData>;
  onSubmit?: (data: EnhancedJobFormData) => void;
}

const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({ initialValues, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<EnhancedJobFormData>({
    resolver: zodResolver(enhancedJobSchema),
    defaultValues: {
      title: initialValues?.title || '',
      company: initialValues?.company || '',
      location: initialValues?.location || '',
      description: initialValues?.description || '',
      requirements: initialValues?.requirements || '',
      benefits: initialValues?.benefits || '',
      salary: initialValues?.salary || '',
    },
  });

  const handleSubmit = async (data: EnhancedJobFormData) => {
    setIsSubmitting(true);
    console.log('Enhanced job form data:', data);
    
    if (onSubmit) {
      onSubmit(data);
    }
    
    setIsSubmitting(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Nail Technician" {...field} />
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
                    <Input placeholder="e.g. Beautiful Nails Salon" {...field} />
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
                    <Input placeholder="e.g. Boston, MA" {...field} />
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
                      placeholder="Describe the position, responsibilities, and what makes your workplace great..."
                      className="min-h-32"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requirements</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="List the required skills, experience, and qualifications..."
                      className="min-h-24"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="benefits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Benefits & Perks</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="What benefits and perks do you offer?"
                      className="min-h-24"
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
                  <FormLabel>Salary/Compensation</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. $800-1200/week commission" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Submitting...' : 'Continue to Pricing'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EnhancedJobForm;
