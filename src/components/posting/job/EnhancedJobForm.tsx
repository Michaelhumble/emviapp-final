
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

const enhancedJobSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  company: z.string().min(1, 'Company name is required'),
  location: z.string().min(1, 'Location is required'),
});

type EnhancedJobFormData = z.infer<typeof enhancedJobSchema>;

const EnhancedJobForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<EnhancedJobFormData>({
    resolver: zodResolver(enhancedJobSchema),
    defaultValues: {
      title: '',
      company: '',
      location: '',
    },
  });

  const onSubmit = async (data: EnhancedJobFormData) => {
    setIsSubmitting(true);
    console.log('Enhanced job form data:', data);
    setIsSubmitting(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enhanced Job Posting</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Job'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EnhancedJobForm;
