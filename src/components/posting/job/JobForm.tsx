import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { JobFormValues, jobFormSchema } from './jobFormSchema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '@/components/ui/form';
import { UserProfile } from '@/context/auth/types';
import { getJobTemplate } from '@/utils/jobTemplates';
import BetterResultsBox from './BetterResultsBox';
import YesLadderSection from './YesLadderSection';

interface JobFormProps {
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
  defaultValues,
  industry = "nails",
  userProfile
}) => {
  // Use industry-specific templates merged with any user data
  const templateValues = getJobTemplate(industry, {
    email: userProfile?.email,
    phoneNumber: userProfile?.phone
  });

  // Merge passed defaultValues with template values
  const initialValues = {
    ...templateValues,
    ...defaultValues,
  };

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: initialValues,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Convert FileList to Array and add to existing uploads
      const newFiles = Array.from(files);
      setPhotoUploads([...photoUploads, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...photoUploads];
    newFiles.splice(index, 1);
    setPhotoUploads(newFiles);
  };

  return (
    <div className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Job Details</h2>
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Experienced Nail Technician" {...field} />
                  </FormControl>
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
                    <Input placeholder="City, State or Zip Code" {...field} />
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
                  <FormLabel>Compensation</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. $25-35/hr, $1,000/week, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jobSummary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Summary</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Brief summary of the position (1-2 sentences)" 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Job Description field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the job in detail. What does a typical day look like? What are the responsibilities? What type of person would be a good fit?"
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Insert BetterResultsBox right after job description and before contact info */}
            <BetterResultsBox />
            
            {/* Insert YesLadderSection after BetterResultsBox */}
            <YesLadderSection />

          </div>

          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 space-y-4">
            <h2 className="font-medium">Contact Information</h2>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="contact@yoursalon.com" {...field} />
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
                      <Input placeholder="(123) 456-7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Photo Upload Section */}
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h2 className="font-medium mb-4">Attract More Candidates with Photos</h2>
            
            <div className="mb-4">
              <Label htmlFor="photoUpload" className="block mb-2">
                Upload Photos (optional)
              </Label>
              <Input 
                id="photoUpload" 
                type="file" 
                accept="image/*" 
                multiple
                onChange={handleFileChange}
                className="cursor-pointer"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Add photos of your salon to attract more qualified candidates.
              </p>
            </div>

            {/* Display uploaded photos */}
            {photoUploads.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Uploaded Photos ({photoUploads.length})</h3>
                <div className="flex flex-wrap gap-2">
                  {photoUploads.map((file, index) => (
                    <div key={index} className="relative">
                      <div className="h-16 w-16 rounded overflow-hidden">
                        <img 
                          src={URL.createObjectURL(file)} 
                          alt={`Upload ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="text-right">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Continue to Pricing'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default JobForm;
