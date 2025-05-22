
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { JobDetailsSubmission } from '@/types/job';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PhotoUpload from '@/components/posting/PhotoUpload';
import { toast } from 'sonner';
import { AlertCircle } from 'lucide-react';

// Define validation schema for job form
const jobFormSchema = z.object({
  title: z.string().min(1, { message: "Job title is required" }),
  salonName: z.string().min(1, { message: "Salon name is required" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  location: z.string().min(1, { message: "Location is required" }),
  jobType: z.string().min(1, { message: "Job type is required" }),
  ownerName: z.string().min(1, { message: "Contact name is required" }),
  phone: z.string().min(1, { message: "Contact phone is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  compensation_type: z.string().optional(),
  compensation_details: z.string().optional(),
  vietnamese_description: z.string().optional(),
  weekly_pay: z.boolean().optional(),
  has_housing: z.boolean().optional(),
  has_wax_room: z.boolean().optional(),
  no_supply_deduction: z.boolean().optional(),
  owner_will_train: z.boolean().optional(),
  specialties: z.array(z.string()).optional(),
  requirements: z.array(z.string()).or(z.string()).optional(),
});

type FormValues = z.infer<typeof jobFormSchema>;

interface JobDetailsFormProps {
  onSubmit: (data: JobDetailsSubmission) => void;
  initialValues?: Partial<JobDetailsSubmission>;
}

const JobDetailsForm: React.FC<JobDetailsFormProps> = ({ onSubmit, initialValues = {} }) => {
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize form with React Hook Form + zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: initialValues.title || '',
      salonName: initialValues.salonName || initialValues.company || '',
      description: initialValues.description || '',
      vietnamese_description: initialValues.vietnamese_description || '',
      location: initialValues.location || '',
      jobType: initialValues.jobType || 'full-time',
      compensation_type: initialValues.compensation_type || 'hourly',
      compensation_details: initialValues.compensation_details || '',
      ownerName: initialValues.contact_info?.owner_name || '',
      phone: initialValues.contact_info?.phone || '',
      email: initialValues.contact_info?.email || '',
      weekly_pay: initialValues.weekly_pay || false,
      has_housing: initialValues.has_housing || false,
      has_wax_room: initialValues.has_wax_room || false,
      no_supply_deduction: initialValues.no_supply_deduction || false,
      owner_will_train: initialValues.owner_will_train || false,
      specialties: initialValues.specialties || [],
      requirements: initialValues.requirements || [],
    },
  });

  const handleFormSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);

      // Map form values to JobDetailsSubmission structure
      const jobDetails: JobDetailsSubmission = {
        title: data.title,
        salonName: data.salonName,
        company: data.salonName, // For backward compatibility
        description: data.description,
        vietnamese_description: data.vietnamese_description,
        location: data.location,
        jobType: data.jobType,
        compensation_type: data.compensation_type,
        compensation_details: data.compensation_details,
        weekly_pay: data.weekly_pay,
        has_housing: data.has_housing,
        has_wax_room: data.has_wax_room,
        no_supply_deduction: data.no_supply_deduction,
        owner_will_train: data.owner_will_train,
        specialties: data.specialties,
        requirements: data.requirements,
        contact_info: {
          owner_name: data.ownerName,
          phone: data.phone,
          email: data.email,
        },
        photos: photoUploads,
      };
      
      console.log("Submitting job details:", jobDetails);
      onSubmit(jobDetails);
    } catch (error) {
      console.error("Error submitting job form:", error);
      toast.error("There was a problem submitting your job posting");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Job Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Nail Technician, Hair Stylist" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Salon Name */}
            <FormField
              control={form.control}
              name="salonName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salon Name <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Your salon name" {...field} />
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
                  <FormLabel>Location <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. San Francisco, CA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Job Type */}
            <FormField
              control={form.control}
              name="jobType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Type <span className="text-red-500">*</span></FormLabel>
                  <Select 
                    value={field.value} 
                    onValueChange={field.onChange}
                  >
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

            {/* Compensation Type */}
            <FormField
              control={form.control}
              name="compensation_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Compensation Type</FormLabel>
                  <Select 
                    value={field.value} 
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select compensation type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="commission">Commission</SelectItem>
                      <SelectItem value="salary">Salary</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Compensation Details */}
            <FormField
              control={form.control}
              name="compensation_details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Compensation Details</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. $20-25/hr + tips" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the position, requirements, and benefits" 
                      className="min-h-[150px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Vietnamese Description (optional) */}
            <FormField
              control={form.control}
              name="vietnamese_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vietnamese Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Mô tả công việc bằng tiếng Việt (tùy chọn)" 
                      className="min-h-[150px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Contact Information Card */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Owner Name */}
            <FormField
              control={form.control}
              name="ownerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Name <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Contact person's name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Contact Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="(123) 456-7890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Contact Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="contact@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Photos Section */}
        <Card>
          <CardHeader>
            <CardTitle>Photos (Optional)</CardTitle>
          </CardHeader>
          <CardContent>
            <PhotoUpload 
              photoUploads={photoUploads} 
              setPhotoUploads={setPhotoUploads} 
            />
          </CardContent>
        </Card>

        {/* Form submission error message */}
        {form.formState.errors && Object.keys(form.formState.errors).length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-800">
                Please fix the following errors:
              </p>
              <ul className="mt-1 text-xs text-red-700 list-disc list-inside">
                {Object.entries(form.formState.errors).map(([key, error]) => (
                  <li key={key}>{error.message}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={isSubmitting || Object.keys(form.formState.errors).length > 0}
            className="w-full md:w-auto"
          >
            {isSubmitting ? "Processing..." : "Continue to Pricing"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default JobDetailsForm;
