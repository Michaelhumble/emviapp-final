
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ClipboardList, Pencil, Camera, Phone, Sparkles } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { UserProfile } from '@/context/auth';

// Define the job form schema
export const jobFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Please provide a detailed description"),
  location: z.string().min(2, "Location is required"),
  salary: z.string().optional(),
  contactEmail: z.string().email("Please enter a valid email"),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
  jobType: z.enum(["full-time", "part-time", "contract", "temporary"]),
  jobSummary: z.string().optional(),
  highlightListing: z.boolean().default(true),
  extendedVisibility: z.boolean().default(true),
  smartMatching: z.boolean().default(true)
});

// Export the type for use in other components
export type JobFormValues = z.infer<typeof jobFormSchema>;

interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  isSubmitting: boolean;
  defaultValues?: Partial<JobFormValues>;
  industry?: string;
  userProfile?: UserProfile;
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
      jobSummary: '',
      highlightListing: true,
      extendedVisibility: true,
      smartMatching: true
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Section 1: Basic Job Info */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <ClipboardList className="h-6 w-6 text-gray-700" />
            <h2 className="text-2xl font-semibold">Basic Job Info</h2>
          </div>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-base">
                  Job Title <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g. Nail Tech – Full Time (Dip/Gel Experience)" 
                    {...field} 
                    className="h-12"
                  />
                </FormControl>
                <p className="text-sm text-muted-foreground mt-1">
                  Clear titles attract more qualified candidates
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <FormField
              control={form.control}
              name="jobType"
              render={({ field }) => (
                <FormItem>
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
                    Be clear about commitment expectations
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-base">
                    Location <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g. San Jose, CA" 
                      {...field} 
                      className="h-12"
                    />
                  </FormControl>
                  <p className="text-sm text-muted-foreground mt-1">
                    Adding the neighborhood helps attract local talent
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-6">
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-base">
                    Salary/Compensation
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="$25–30/hr or $60,000–70,000/year" 
                      {...field} 
                      className="h-12"
                    />
                  </FormControl>
                  <p className="text-sm text-muted-foreground mt-1">
                    Posts with salary info receive 30% more applications
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Section 2: Job Details */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Pencil className="h-6 w-6 text-gray-700" />
            <h2 className="text-2xl font-semibold">Job Details</h2>
          </div>
          
          <FormField
            control={form.control}
            name="jobSummary"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-base">
                  Job Summary
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="One-line overview of the job" 
                    {...field} 
                    className="h-12"
                  />
                </FormControl>
                <p className="text-sm text-muted-foreground mt-1">
                  A short summary helps candidates quickly understand the role
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-6">
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
                      placeholder="Describe responsibilities, benefits, and other important details" 
                      className="min-h-[150px] resize-y" 
                      {...field} 
                    />
                  </FormControl>
                  <p className="text-sm text-muted-foreground mt-1">
                    Detailed descriptions help attract qualified candidates. Include responsibilities, 
                    requirements, benefits, and work environment.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Section 3: Photos */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Camera className="h-6 w-6 text-gray-700" />
            <h2 className="text-2xl font-semibold">Photos (Optional)</h2>
          </div>
          
          <div className="border border-dashed border-gray-300 bg-muted/20 py-8 px-4 rounded-md text-center">
            <p className="text-sm text-muted-foreground">
              Drop photos here or click to upload
            </p>
            <p className="text-sm text-purple-600 font-medium mt-2">
              Adding photos can increase applications by up to 35%
            </p>
          </div>
        </div>

        {/* Section 4: Contact Info */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Phone className="h-6 w-6 text-gray-700" />
            <h2 className="text-2xl font-semibold">Contact Info</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-base">
                    Email <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="hiring@yoursalon.com" 
                      type="email" 
                      {...field} 
                      className="h-12"
                    />
                  </FormControl>
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
                    Phone <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="(555) 123-4567" 
                      {...field} 
                      className="h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Section 5: Emotional Yes Ladder */}
        <div className="mb-8 bg-purple-50 p-6 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-purple-600" />
            <h2 className="text-2xl font-semibold">Get Better Results</h2>
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="highlightListing"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox 
                      checked={field.value} 
                      onCheckedChange={field.onChange} 
                      className="data-[state=checked]:bg-purple-600"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Highlight your listing
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Make your job stand out with premium placement
                    </p>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="extendedVisibility"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox 
                      checked={field.value} 
                      onCheckedChange={field.onChange} 
                      className="data-[state=checked]:bg-purple-600"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Extended visibility
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Your job will stay active longer
                    </p>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="smartMatching"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox 
                      checked={field.value} 
                      onCheckedChange={field.onChange} 
                      className="data-[state=checked]:bg-purple-600"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Smart matching
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      AI will help match with qualified artists in your area
                    </p>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Final Emotional Push */}
        <div className="text-center mb-6">
          <p className="text-base">
            ✨ You're almost done — one more step to attract your perfect candidate!
          </p>
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="mt-6 w-full px-6 py-3 text-base md:text-lg font-semibold bg-purple-600 hover:opacity-90 h-auto"
        >
          {isSubmitting ? "Processing..." : "Continue to Pricing"}
        </Button>
      </form>
    </Form>
  );
};

export default JobForm;
