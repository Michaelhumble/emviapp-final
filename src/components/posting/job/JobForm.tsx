
import React from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea'; 
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import { UserProfile } from '@/context/auth/types';
import SmartAdOptions from '@/components/posting/SmartAdOptions';
import SectionHeader from '@/components/posting/SectionHeader';

interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  isSubmitting: boolean;
  defaultValues?: JobFormValues;
  industry?: string;
  userProfile?: UserProfile | null;
}

const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  photoUploads,
  setPhotoUploads,
  isSubmitting,
  defaultValues,
  industry = 'nails',
  userProfile
}) => {
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: defaultValues || {
      jobTitle: '',
      jobType: 'full-time',
      location: '',
      zipCode: '',
      summary: '',
      description: '',
      minCompensation: '',
      maxCompensation: '',
      compensationType: 'hourly',
      contactEmail: userProfile?.email || '',
      contactPhone: userProfile?.phone || '',
      salonName: userProfile?.salon_name || '',
      showPhoneNumber: true,
      isNationwide: false,
      images: []
    },
  });

  const handleFormSubmit = (values: JobFormValues) => {
    onSubmit(values);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFiles = Array.from(event.target.files);
      setPhotoUploads([...photoUploads, ...newFiles]);
    }
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="space-y-8">
            {/* Basic Job Info Section */}
            <div className="space-y-4">
              <SectionHeader 
                title="Basic Job Info" 
                emoji="📋"
                description="Let's start with the essentials"
              />
              
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Nail Tech - Full Time" {...field} />
                    </FormControl>
                    <p className="text-sm text-muted-foreground mt-1">
                      Be clear and specific. Ex: Nail Tech – Full Time (Dip/Gel Experience)
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="jobType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Type *</FormLabel>
                      <FormControl>
                        <select
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          {...field}
                        >
                          <option value="full-time">Full Time</option>
                          <option value="part-time">Part Time</option>
                          <option value="contract">Contract</option>
                          <option value="temporary">Temporary</option>
                          <option value="booth-rental">Booth Rental</option>
                        </select>
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
                        <Input placeholder="City, State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip Code *</FormLabel>
                      <FormControl>
                        <Input placeholder="12345" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="salonName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salon Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Your salon's name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="minCompensation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Min Compensation *</FormLabel>
                      <FormControl>
                        <Input placeholder="Minimum" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maxCompensation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Compensation</FormLabel>
                      <FormControl>
                        <Input placeholder="Maximum (optional)" {...field} />
                      </FormControl>
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
                      <FormControl>
                        <select
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          {...field}
                        >
                          <option value="hourly">Hourly</option>
                          <option value="commission">Commission</option>
                          <option value="salary">Salary</option>
                          <option value="booth-rental">Booth Rental</option>
                          <option value="hybrid">Hybrid</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Job Details Section */}
            <div className="space-y-4">
              <SectionHeader 
                title="Job Details" 
                emoji="🧾"
                description="Tell artists what makes this role special"
              />

              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Summary *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Briefly describe the position in 1-2 sentences"
                        className="min-h-[60px]"
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
                    <FormLabel>Detailed Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the responsibilities, requirements, and what makes this job special"
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Photos Section */}
            <div className="space-y-4">
              <SectionHeader 
                title="Photos (Optional)" 
                emoji="📸"
                description="Showcase your salon and attract top talent"
              />

              <div className="border-2 border-dashed rounded-md p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  Upload Photos
                </label>
                <p className="mt-2 text-sm text-muted-foreground">
                  Uploads: {photoUploads.length} photos selected
                </p>
              </div>
            </div>

            {/* Contact Info Section */}
            <div className="space-y-4">
              <SectionHeader 
                title="Contact Info" 
                emoji="📞"
                description="How artists will reach you"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Email *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Phone *</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="(123) 456-7890"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="showPhoneNumber"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="!m-0">Show phone number in listing</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Boost Visibility Section */}
            <div className="space-y-4">
              <SectionHeader 
                title="Boost Visibility" 
                emoji="💎"
                description="Options to help your posting stand out"
              />
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <SmartAdOptions 
                  postType="job"
                  isFirstPost={true}
                  onNationwideChange={(checked) => {
                    form.setValue('isNationwide', checked);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="pt-6">
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Continue to Pricing'}
            </Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
};

export default JobForm;
