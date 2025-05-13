
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import SectionHeader from '@/components/posting/SectionHeader';

// Define the form schema
const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  jobType: z.enum(["full-time", "part-time", "contract", "temporary"]),
  location: z.string().min(2, "Location is required"),
  salary: z.string().optional(),
  jobSummary: z.string().optional(),
  description: z.string().min(20, "Please provide a detailed description"),
  contactEmail: z.string().email("Please enter a valid email"),
  phoneNumber: z.string().min(7, "Please enter a valid phone number"),
});

export type JobFormValues = z.infer<typeof formSchema>;

interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads?: File[];
  setPhotoUploads?: React.Dispatch<React.SetStateAction<File[]>>;
  isSubmitting?: boolean;
}

const JobForm: React.FC<JobFormProps> = ({ 
  onSubmit, 
  photoUploads = [], 
  setPhotoUploads = () => {}, 
  isSubmitting = false 
}) => {
  const form = useForm<JobFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      jobType: "full-time",
      location: "",
      salary: "",
      jobSummary: "",
      description: "",
      contactEmail: "",
      phoneNumber: "",
    },
  });

  const handleSubmit = (values: JobFormValues) => {
    console.log("Form submitted with values:", values);
    onSubmit(values);
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            {/* Basic Job Information Section */}
            <SectionHeader title="Basic Job Information" emoji="📋" />
            <div className="space-y-4 mb-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Nail Technician, Hair Stylist" {...field} />
                    </FormControl>
                    <FormDescription className="text-muted-foreground text-sm">
                      Be clear and specific. Ex: Nail Tech – Full Time (Dip/Gel Experience)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Type</FormLabel>
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
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Chicago, IL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      Salary/Compensation
                      <span className="text-muted-foreground text-sm">(Optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., $20-25/hr or $50k-60k/year" {...field} />
                    </FormControl>
                    <FormDescription className="text-muted-foreground text-sm">
                      Being transparent about compensation attracts more qualified candidates
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Job Details Section */}
            <SectionHeader title="Job Details" emoji="🧾" />
            <div className="space-y-4 mb-6">
              <FormField
                control={form.control}
                name="jobSummary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      Job Summary
                      <span className="text-muted-foreground text-sm">(Optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Brief one-sentence overview of the position" 
                        {...field} 
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
                  <FormItem>
                    <FormLabel>Job Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe responsibilities, requirements, benefits, and any other details" 
                        {...field} 
                        className="min-h-32"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Photos Section (Placeholder) */}
            <SectionHeader title="Photos (Optional)" emoji="📸" />
            <div className="p-6 border border-dashed rounded-md bg-gray-50 mb-6 text-center">
              <p className="text-muted-foreground">
                Photo upload functionality will be available soon.
                Adding photos can increase applications by up to 35%.
              </p>
            </div>

            {/* Contact Information Section */}
            <SectionHeader title="Contact Information" emoji="📞" />
            <div className="space-y-4 mb-6">
              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="e.g., hiring@yoursalon.com" 
                        {...field} 
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
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input 
                        type="tel" 
                        placeholder="e.g., (555) 123-4567" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Better Results Box (Visual Only) */}
            <div className="mb-6 border rounded-lg overflow-hidden">
              <div className="bg-primary/10 p-4 border-b">
                <h3 className="font-medium text-primary">Get Better Results</h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <input type="checkbox" checked className="mt-1" readOnly />
                  <div>
                    <p className="font-medium">Highlight your listing</p>
                    <p className="text-sm text-muted-foreground">
                      Make your job stand out with premium placement
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <input type="checkbox" checked className="mt-1" readOnly />
                  <div>
                    <p className="font-medium">Extended visibility</p>
                    <p className="text-sm text-muted-foreground">
                      Your job will be visible for longer to attract more candidates
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <input type="checkbox" checked className="mt-1" readOnly />
                  <div>
                    <p className="font-medium">Smart matching</p>
                    <p className="text-sm text-muted-foreground">
                      We'll match your job with qualified candidates in your area
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="px-6"
              size="lg"
            >
              Continue to Pricing
            </Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
};

export default JobForm;
