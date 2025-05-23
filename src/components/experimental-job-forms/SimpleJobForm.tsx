
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { billionDollarJobFormSchema, type BillionDollarJobFormData } from './simpleJobFormSchema';
import JobDetailsSection from './sections/JobDetailsSection';

const SimpleJobForm = () => {
  const form = useForm<BillionDollarJobFormData>({
    resolver: zodResolver(billionDollarJobFormSchema),
    defaultValues: {
      salonName: '',
      jobTitle: '',
      location: '',
      jobDescription: '',
      vietnameseDescription: '',
      employmentType: 'Full-time',
    },
  });

  const onSubmit = (data: BillionDollarJobFormData) => {
    console.log('Experimental form submitted:', data);
    // Handle form submission for experimental testing
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Experimental Job Posting Form
          </CardTitle>
          <p className="text-center text-gray-600">
            Testing simplified job posting experience
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <JobDetailsSection control={form.control} />
              
              <div className="flex justify-end">
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                  Test Submit
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimpleJobForm;
