
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { billionDollarJobFormSchema, type BillionDollarJobFormData } from './billionDollarJobFormSchema';
import { useToast } from '@/components/ui/use-toast';

const BillionDollarJobForm = () => {
  const { toast } = useToast();
  
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

  const onSubmit = async (data: BillionDollarJobFormData) => {
    try {
      console.log('Billion Dollar Job Form Data:', data);
      
      toast({
        title: "Success!",
        description: "Your premium job posting has been submitted successfully.",
        variant: "default",
      });
      
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your job posting. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
      <Container className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Billion Dollar Job Posting
          </h1>
          <p className="text-lg text-gray-600">
            Create your premium job listing with our advanced posting system
          </p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl text-center">
              Premium Job Details
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="salonName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-medium">Salon Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your salon name" 
                            className="h-12 text-lg"
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
                        <FormLabel className="text-lg font-medium">Job Title</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Senior Nail Technician" 
                            className="h-12 text-lg"
                            {...field} 
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
                        <FormLabel className="text-lg font-medium">Location</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="City, State" 
                            className="h-12 text-lg"
                            {...field} 
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
                        <FormLabel className="text-lg font-medium">Employment Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 text-lg">
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
                </div>

                <FormField
                  control={form.control}
                  name="jobDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium">Job Description (English)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the position, responsibilities, and requirements in English..."
                          className="min-h-[120px] text-lg"
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
                      <FormLabel className="text-lg font-medium">Vietnamese Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Mô tả vị trí công việc, trách nhiệm và yêu cầu bằng tiếng Việt..."
                          className="min-h-[120px] text-lg"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-6">
                  <Button 
                    type="submit" 
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                  >
                    Submit Premium Job Posting
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default BillionDollarJobForm;
