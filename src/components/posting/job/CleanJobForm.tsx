
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { cleanJobFormSchema, type CleanJobFormData } from './cleanJobFormSchema';

interface CleanJobFormProps {
  onSubmit?: (data: CleanJobFormData) => void;
  isTestMode?: boolean;
}

const CleanJobForm: React.FC<CleanJobFormProps> = ({ 
  onSubmit: onSubmitProp, 
  isTestMode = false 
}) => {
  const form = useForm<CleanJobFormData>({
    resolver: zodResolver(cleanJobFormSchema),
    defaultValues: {
      salonName: '',
      jobTitle: '',
      location: '',
      employmentType: undefined,
      compensationType: undefined,
      compensationDetails: '',
    },
  });

  const onSubmit = (data: CleanJobFormData) => {
    console.log('Clean job form submitted:', data);
    
    if (onSubmitProp) {
      // External handler (like test mode)
      onSubmitProp(data);
    } else {
      // Default behavior
      toast.success('Job details saved! 🎉 Ready for next step.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-serif">Post a New Job</CardTitle>
          <p className="text-sm text-muted-foreground">Fill out the basic details for your job posting</p>
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="salonName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salon Name *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your salon name" 
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
                    <FormLabel>Job Title *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., Nail Technician, Hair Stylist" 
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
                    <FormLabel>Location *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="City, State or Full Address" 
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
                    <FormLabel>Employment Type *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
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
                    <FormLabel>Compensation Type *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select compensation type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="commission">Commission</SelectItem>
                        <SelectItem value="salary">Salary</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="compensationDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Compensation Details (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="e.g., $15-20/hour, 40-50% commission, $45,000 annually"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end pt-4">
                <Button 
                  type="submit" 
                  className="px-8 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Next Step
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CleanJobForm;
