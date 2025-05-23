
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { billionDollarJobFormSchema, type BillionDollarJobFormData } from './billionDollarJobFormSchema';

const BillionDollarJobForm = () => {
  const form = useForm<BillionDollarJobFormData>({
    resolver: zodResolver(billionDollarJobFormSchema),
    defaultValues: {
      salonName: '',
      jobTitle: '',
      location: '',
      jobDescription: '',
      vietnameseDescription: '',
      employmentType: undefined,
    },
  });

  const onSubmit = (data: BillionDollarJobFormData) => {
    console.log('Billion Dollar Job Form Data:', data);
    toast.success('Job posting submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Billion Dollar Job Posting
          </h1>
          <p className="text-gray-600 text-lg">
            Create your premium job listing with our advanced form
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-gray-800">
              Post Your Dream Job
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Salon Name */}
                <FormField
                  control={form.control}
                  name="salonName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium text-gray-700">
                        Salon Name
                      </FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          placeholder="Enter your salon or business name"
                          className="h-12 text-lg border-gray-300 focus:border-purple-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Job Title */}
                <FormField
                  control={form.control}
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium text-gray-700">
                        Job Title
                      </FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          placeholder="e.g., Senior Nail Technician, Hair Stylist"
                          className="h-12 text-lg border-gray-300 focus:border-purple-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Location */}
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium text-gray-700">
                        Location
                      </FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          placeholder="City, State or Full Address"
                          className="h-12 text-lg border-gray-300 focus:border-purple-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Employment Type */}
                <FormField
                  control={form.control}
                  name="employmentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium text-gray-700">
                        Employment Type
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 text-lg border-gray-300 focus:border-purple-500">
                            <SelectValue placeholder="Select employment type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Full-time">Full-time</SelectItem>
                          <SelectItem value="Part-time">Part-time</SelectItem>
                          <SelectItem value="Contract">Contract</SelectItem>
                          <SelectItem value="Temporary">Temporary</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Job Description (English) */}
                <FormField
                  control={form.control}
                  name="jobDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium text-gray-700">
                        Job Description (English)
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field}
                          placeholder="Describe the role, responsibilities, requirements, and benefits..."
                          className="min-h-32 text-lg border-gray-300 focus:border-purple-500 resize-y"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Vietnamese Description */}
                <FormField
                  control={form.control}
                  name="vietnameseDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium text-gray-700">
                        Vietnamese Description
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field}
                          placeholder="Mô tả công việc, trách nhiệm, yêu cầu và quyền lợi bằng tiếng Việt..."
                          className="min-h-32 text-lg border-gray-300 focus:border-purple-500 resize-y"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <div className="pt-6">
                  <Button 
                    type="submit" 
                    className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg"
                  >
                    Post Your Billion Dollar Job
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BillionDollarJobForm;
