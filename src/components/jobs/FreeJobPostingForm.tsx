
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useJobPosting } from '@/hooks/jobs/useJobPosting';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const freeJobSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  category: z.string().min(1, 'Category is required'),
  location: z.string().min(1, 'Location is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  compensation_type: z.string().optional(),
  compensation_details: z.string().optional(),
  requirements: z.string().optional(),
  contact_phone: z.string().optional(),
  contact_email: z.string().optional(),
});

type FreeJobFormData = z.infer<typeof freeJobSchema>;

const categories = [
  'Nail Technician',
  'Hair Stylist',
  'Esthetician',
  'Massage Therapist',
  'Makeup Artist',
  'Barber',
  'Other'
];

const FreeJobPostingForm = () => {
  const { user } = useAuth();
  const { postFreeJob, isPosting } = useJobPosting();
  const navigate = useNavigate();
  const [debugInfo, setDebugInfo] = useState('');

  const form = useForm<FreeJobFormData>({
    resolver: zodResolver(freeJobSchema),
    defaultValues: {
      title: '',
      category: '',
      location: '',
      description: '',
      compensation_type: '',
      compensation_details: '',
      requirements: '',
      contact_phone: '',
      contact_email: '',
    },
  });

  const onSubmit = async (data: FreeJobFormData) => {
    console.log('📝 [FREE-FORM] Form submitted with data:', data);
    setDebugInfo(`Form data: ${JSON.stringify(data, null, 2)}\nUser: ${user?.id}`);

    if (!user) {
      toast.error('Please sign in to post a job');
      return;
    }

    // Prepare contact info
    const contactInfo: any = {};
    if (data.contact_phone) contactInfo.phone = data.contact_phone;
    if (data.contact_email) contactInfo.email = data.contact_email;
    if (user.email) contactInfo.email = user.email; // Use user's email as fallback

    const jobData = {
      ...data,
      contact_info: contactInfo
    };

    console.log('📋 [FREE-FORM] Prepared job data:', jobData);
    setDebugInfo(prev => prev + `\nPrepared job data: ${JSON.stringify(jobData, null, 2)}`);

    const result = await postFreeJob(jobData);
    
    console.log('📊 [FREE-FORM] Post result:', result);
    setDebugInfo(prev => prev + `\nPost result: ${JSON.stringify(result, null, 2)}`);

    if (result.success) {
      toast.success('Free job posted successfully! Redirecting...');
      // Wait a moment for the user to see the success message, then navigate
      setTimeout(() => {
        navigate('/jobs');
      }, 2000);
    } else {
      toast.error(`Failed to post job: ${result.error}`);
      setDebugInfo(prev => prev + `\nERROR: ${result.error}`);
    }
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-gray-600">Please sign in to post a job.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Post a Free Job</CardTitle>
        <CardDescription>
          Post your job listing for free. It will be visible to all users immediately.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Senior Nail Technician" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                    <Input placeholder="e.g. Los Angeles, CA" {...field} />
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
                  <FormLabel>Job Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the position, responsibilities, and what you're looking for..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="compensation_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Compensation Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Hourly, Weekly, Commission" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="compensation_details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Compensation Details</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. $15-20/hour, $800-1200/week" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requirements</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List any specific requirements, qualifications, or experience needed..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contact_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="(555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contact_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Email</FormLabel>
                    <FormControl>
                      <Input placeholder="hiring@company.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" disabled={isPosting} className="w-full">
              {isPosting ? 'Posting Job...' : 'Post Free Job'}
            </Button>
          </form>
        </Form>

        {/* Debug Panel - Remove this after testing */}
        {debugInfo && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-bold mb-2">Debug Info:</h3>
            <pre className="text-xs whitespace-pre-wrap">{debugInfo}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FreeJobPostingForm;
