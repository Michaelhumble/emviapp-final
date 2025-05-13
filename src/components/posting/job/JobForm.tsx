
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import { ClipboardList, Pencil, Camera, Phone, Sparkles } from 'lucide-react';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { UserProfile } from '@/context/auth';

export interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  isSubmitting: boolean;
  defaultValues?: Partial<JobFormValues>;
  industry?: string;
  userProfile?: UserProfile;
}

export const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  photoUploads,
  setPhotoUploads,
  isSubmitting,
  defaultValues = {},
  industry = 'nails',
  userProfile,
}) => {
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: defaultValues.title || '',
      jobType: defaultValues.jobType || 'full-time',
      location: defaultValues.location || '',
      salary: defaultValues.salary || '',
      jobSummary: defaultValues.jobSummary || '',
      description: defaultValues.description || '',
      contactEmail: defaultValues.contactEmail || userProfile?.email || '',
      phoneNumber: defaultValues.phoneNumber || userProfile?.phoneNumber || '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6">
        {/* Section 1: Basic Job Info */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <ClipboardList className="h-6 w-6 text-purple-600" />
            <h2 className="text-2xl font-semibold">Basic Job Info</h2>
          </div>
          
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-medium text-base">
                  Job Title <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g. Nail Tech – Full Time (Dip/Gel Experience)" 
                    className="h-12"
                    {...field} 
                  />
                </FormControl>
                <p className="text-sm text-muted-foreground mt-1">
                  Be clear and specific to attract qualified candidates.
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
                  Job Type <span className="text-red-500">*</span>
                </FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-12">
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
                <p className="text-sm text-muted-foreground mt-1">
                  Specify employment terms to set clear expectations.
                </p>
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
                  Location <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g. San Jose, CA" 
                    className="h-12"
                    {...field} 
                  />
                </FormControl>
                <p className="text-sm text-muted-foreground mt-1">
                  Include city and state for better local matches.
                </p>
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
                  Salary/Compensation
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="$25–30/hr or $60,000–70,000/year" 
                    className="h-12"
                    {...field} 
                  />
                </FormControl>
                <p className="text-sm text-muted-foreground mt-1">
                  Adding a salary range increases application rates by 30%.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Section 2: Job Details */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Pencil className="h-6 w-6 text-purple-600" />
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
                  <Input 
                    placeholder="One-line overview of the job" 
                    className="h-12"
                    {...field} 
                  />
                </FormControl>
                <p className="text-sm text-muted-foreground mt-1">
                  A compelling summary helps your job stand out in search results.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-base">
                  Job Description <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe responsibilities, benefits, and other important details." 
                    className="min-h-[150px] resize-y"
                    {...field} 
                  />
                </FormControl>
                <p className="text-sm text-muted-foreground mt-1">
                  Be specific about duties, requirements, and what makes your salon special.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Section 3: Photos (Optional) */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Camera className="h-6 w-6 text-purple-600" />
            <h2 className="text-2xl font-semibold">Photos (Optional)</h2>
          </div>
          
          <div className="border border-dashed border-gray-300 bg-muted/20 py-8 px-4 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">
              Photo upload functionality will be available soon.<br />
              Adding photos can increase applications by up to 35%.
            </p>
          </div>
        </div>

        {/* Section 4: Contact Info */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Phone className="h-6 w-6 text-purple-600" />
            <h2 className="text-2xl font-semibold">Contact Info</h2>
          </div>
          
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-medium text-base">
                  Contact Email <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="hiring@yoursalon.com" 
                    className="h-12"
                    {...field} 
                  />
                </FormControl>
                <p className="text-sm text-muted-foreground mt-1">
                  Candidates will use this email to apply and ask questions.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-base">
                  Phone Number <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="(555) 123-4567" 
                    className="h-12"
                    {...field} 
                  />
                </FormControl>
                <p className="text-sm text-muted-foreground mt-1">
                  A direct number helps qualified candidates connect faster.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Section 5: Emotional Yes Ladder */}
        <div className="mb-8 bg-purple-50 p-6 rounded-lg border border-purple-100">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-purple-600" />
            <h2 className="text-2xl font-semibold">Get Better Results</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <Checkbox id="highlight" defaultChecked className="mt-1" />
              <div>
                <label htmlFor="highlight" className="font-medium text-base cursor-pointer">
                  Highlight your listing
                </label>
                <p className="text-sm text-muted-foreground">
                  Make your job stand out with premium placement
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox id="visibility" defaultChecked className="mt-1" />
              <div>
                <label htmlFor="visibility" className="font-medium text-base cursor-pointer">
                  Extended visibility
                </label>
                <p className="text-sm text-muted-foreground">
                  Your job will stay active longer to attract more candidates
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox id="matching" defaultChecked className="mt-1" />
              <div>
                <label htmlFor="matching" className="font-medium text-base cursor-pointer">
                  Smart matching
                </label>
                <p className="text-sm text-muted-foreground">
                  AI will help match with qualified artists in your area
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: Final Emotional Push */}
        <div className="text-center mt-8 mb-6">
          <p className="text-lg text-purple-700">
            ✨ You're almost done — one more step to attract your perfect candidate!
          </p>
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="mt-6 w-full px-6 py-3 text-base md:text-lg font-semibold bg-purple-600 hover:opacity-90 h-auto"
        >
          {isSubmitting ? 'Processing...' : 'Continue to Pricing'}
        </Button>
      </form>
    </Form>
  );
};

export default JobForm;
