
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

const jobFormSchema = z.object({
  title: z.string().min(2, 'Job title must be at least 2 characters'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  location: z.string().min(2, 'Location must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  employmentType: z.enum(['Full-time', 'Part-time', 'Contract', 'Temporary']),
  compensationType: z.enum(['hourly', 'commission', 'salary', 'per_service']),
  compensationDetails: z.string().min(1, 'Compensation details are required'),
  requirements: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  contactEmail: z.string().email('Valid email is required'),
  contactPhone: z.string().min(10, 'Valid phone number is required'),
});

type JobFormData = z.infer<typeof jobFormSchema>;

interface EnhancedJobFormProps {
  initialValues?: Partial<JobFormData>;
  onSubmit: (data: JobFormData) => void;
}

const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({ 
  initialValues, 
  onSubmit 
}) => {
  const { user, isSignedIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<JobFormData>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: '',
      company: '',
      location: '',
      description: '',
      employmentType: 'Full-time',
      compensationType: 'hourly',
      compensationDetails: '',
      requirements: [],
      benefits: [],
      contactEmail: user?.email || '',
      contactPhone: '',
      ...initialValues
    }
  });

  // Set initial values when they change
  useEffect(() => {
    if (initialValues) {
      Object.entries(initialValues).forEach(([key, value]) => {
        if (value !== undefined) {
          setValue(key as keyof JobFormData, value);
        }
      });
    }
  }, [initialValues, setValue]);

  // Ensure user is authenticated
  useEffect(() => {
    if (!isSignedIn) {
      toast.error('Please sign in to post a job');
      return;
    }
  }, [isSignedIn]);

  const handleFormSubmit = async (data: JobFormData) => {
    if (!isSignedIn || !user) {
      toast.error('Please sign in to continue');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Failed to submit job posting');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isSignedIn) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
        <p className="text-gray-600 mb-4">Please sign in to post a job.</p>
        <Button onClick={() => window.location.href = '/sign-in'}>
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Post a Job</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Job Title</label>
                <Input
                  {...register('title')}
                  placeholder="e.g. Nail Technician"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Company Name</label>
                <Input
                  {...register('company')}
                  placeholder="e.g. Beautiful Nails Salon"
                />
                {errors.company && (
                  <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <Input
                {...register('location')}
                placeholder="e.g. San Francisco, CA"
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Job Description</label>
              <Textarea
                {...register('description')}
                placeholder="Describe the job responsibilities, requirements, and what makes this opportunity special..."
                rows={6}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Employment Type</label>
                <Select onValueChange={(value) => setValue('employmentType', value as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Temporary">Temporary</SelectItem>
                  </SelectContent>
                </Select>
                {errors.employmentType && (
                  <p className="text-red-500 text-sm mt-1">{errors.employmentType.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Compensation Type</label>
                <Select onValueChange={(value) => setValue('compensationType', value as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select compensation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="commission">Commission</SelectItem>
                    <SelectItem value="salary">Salary</SelectItem>
                    <SelectItem value="per_service">Per Service</SelectItem>
                  </SelectContent>
                </Select>
                {errors.compensationType && (
                  <p className="text-red-500 text-sm mt-1">{errors.compensationType.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Compensation Details</label>
              <Input
                {...register('compensationDetails')}
                placeholder="e.g. $20-25/hour, 50% commission, $40,000-50,000/year"
              />
              {errors.compensationDetails && (
                <p className="text-red-500 text-sm mt-1">{errors.compensationDetails.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Contact Email</label>
                <Input
                  {...register('contactEmail')}
                  type="email"
                  placeholder="hiring@salon.com"
                />
                {errors.contactEmail && (
                  <p className="text-red-500 text-sm mt-1">{errors.contactEmail.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Contact Phone</label>
                <Input
                  {...register('contactPhone')}
                  placeholder="(555) 123-4567"
                />
                {errors.contactPhone && (
                  <p className="text-red-500 text-sm mt-1">{errors.contactPhone.message}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => window.history.back()}>
                Back
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Continue to Pricing'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedJobForm;
