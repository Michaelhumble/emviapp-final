
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobFormSchema } from './jobFormSchema';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ClipboardList, Pencil, Camera, Phone, Sparkles } from 'lucide-react';

// Ensure this type is exported so other components can use it
export type JobFormValues = {
  title: string;
  description: string;
  location: string;
  salary?: string;
  contactEmail: string;
  phoneNumber: string;
  jobType: "full-time" | "part-time" | "contract" | "temporary";
  requirements?: string[];
  jobSummary?: string;
};

export interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  isSubmitting: boolean;
  defaultValues?: JobFormValues;
  industry?: string;
  userProfile?: any;
}

const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  photoUploads,
  setPhotoUploads,
  isSubmitting,
  defaultValues,
  industry = "nails",
  userProfile
}) => {
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: defaultValues || {
      title: '',
      description: '',
      location: '',
      salary: '',
      contactEmail: userProfile?.email || '',
      phoneNumber: userProfile?.phoneNumber || '',
      jobType: 'full-time',
      jobSummary: ''
    }
  });

  const handleSubmit = (values: JobFormValues) => {
    onSubmit(values);
  };

  // Required field indicator component
  const RequiredIndicator = () => <span className="text-red-500 ml-1">*</span>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 p-6">
        {/* SECTION 1: Basic Job Information */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <ClipboardList className="h-6 w-6" />
            <h2 className="text-2xl font-semibold">Basic Job Information</h2>
          </div>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-medium text-base">
                  Job Title<RequiredIndicator />
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. Nail Technician, Hair Stylist" className="w-full" />
                </FormControl>
                <p className="text-sm text-muted-foreground mt-1">
                  Be clear and specific. Ex: Nail Tech – Full Time (Dip/Gel Experience)
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="jobType"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-medium text-base">
                  Job Type<RequiredIndicator />
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
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
            name="location"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-medium text-base">
                  Location<RequiredIndicator />
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="City, State" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-medium text-base">
                  Salary / Compensation
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g., $25-30/hr or $50,000-60,000/year" />
                </FormControl>
                <p className="text-sm text-muted-foreground mt-1">
                  Adding a salary range increases application rates by 30%
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* SECTION 2: Job Details */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Pencil className="h-6 w-6" />
            <h2 className="text-2xl font-semibold">Job Details</h2>
          </div>

          <FormField
            control={form.control}
            name="jobSummary"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-medium text-base">
                  Job Summary
                </FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="A brief summary of the role" 
                    className="min-h-[80px]" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-medium text-base">
                  Job Description<RequiredIndicator />
                </FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Describe responsibilities, benefits, and other important details" 
                    className="min-h-[120px]" 
                  />
                </FormControl>
                <p className="text-sm text-muted-foreground mt-1">
                  Describe responsibilities, benefits, and other important details.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* SECTION 3: Photos */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Camera className="h-6 w-6" />
            <h2 className="text-2xl font-semibold">Photos (Optional)</h2>
          </div>

          <div className="border border-dashed border-gray-300 bg-muted/20 py-8 px-4 rounded-md text-center">
            <p className="text-sm text-muted-foreground">
              Photo upload functionality will be available soon. Adding photos can increase applications by up to 35%.
            </p>
          </div>
        </div>

        {/* SECTION 4: Contact Info */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Phone className="h-6 w-6" />
            <h2 className="text-2xl font-semibold">Contact Info</h2>
          </div>

          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-medium text-base">
                  Contact Email<RequiredIndicator />
                </FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="your@email.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-medium text-base">
                  Phone Number<RequiredIndicator />
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="(123) 456-7890" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* SECTION 5: Get Better Results */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-purple-600" />
            <h2 className="text-2xl font-semibold">Get Better Results</h2>
          </div>

          <div className="space-y-3 bg-purple-50 p-4 rounded-md">
            <div className="flex items-start">
              <input type="checkbox" checked disabled className="mt-1" />
              <div className="ml-2">
                <p className="font-medium">Highlight your listing</p>
                <p className="text-sm text-muted-foreground">Make your job stand out with premium placement</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <input type="checkbox" checked disabled className="mt-1" />
              <div className="ml-2">
                <p className="font-medium">Extended visibility</p>
                <p className="text-sm text-muted-foreground">Your job will be visible longer to attract more candidates</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <input type="checkbox" checked disabled className="mt-1" />
              <div className="ml-2">
                <p className="font-medium">Smart matching</p>
                <p className="text-sm text-muted-foreground">We'll match your job with qualified candidates in your area</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm font-medium text-gray-600 mb-3">✨ You're almost done — one more step to attract your perfect candidate!</p>
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="mt-6 w-full px-6 py-3 text-base md:text-lg font-semibold bg-purple-600 hover:opacity-90"
        >
          {isSubmitting ? 'Processing...' : 'Continue to Pricing'}
        </Button>
      </form>
    </Form>
  );
};

export default JobForm;
