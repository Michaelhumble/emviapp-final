
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ArrowRight, ImagePlus } from 'lucide-react';
import { UserProfile } from '@/context/auth/types';

interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  isSubmitting: boolean;
  defaultValues?: JobFormValues;
  industry?: string;
  userProfile?: UserProfile | null;
}

export const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  photoUploads,
  setPhotoUploads,
  isSubmitting,
  defaultValues,
  industry = 'nails',
  userProfile,
}) => {
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: defaultValues || {
      title: '',
      description: '',
      location: '',
      salary: '',
      contactEmail: userProfile?.email || '',
      phoneNumber: userProfile?.phone_number || '',
      jobType: 'full-time',
      requirements: [],
      jobSummary: '',
    },
  });

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setPhotoUploads([...photoUploads, ...newFiles]);
    }
  };

  const removePhoto = (index: number) => {
    const newUploads = [...photoUploads];
    newUploads.splice(index, 1);
    setPhotoUploads(newUploads);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-6 py-8">
        <div className="space-y-8">
          {/* Job Title Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Job Details</h2>
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="E.g., Nail Technician, Hair Stylist, etc."
                      {...field}
                    />
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
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
          </div>

          {/* Location Section */}
          <div className="space-y-4 pt-6 border-t border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Job Location</h2>
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salon Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the salon address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Compensation Section */}
          <div className="space-y-4 pt-6 border-t border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Compensation</h2>
            
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary or Hourly Rate</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="E.g., $20-25/hr, $50K-65K/year, etc."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Job Description Section */}
          <div className="space-y-4 pt-6 border-t border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Job Description</h2>
            
            <FormField
              control={form.control}
              name="jobSummary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Summary</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write a short summary of the position"
                      className="min-h-[80px]"
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
                  <FormLabel>Detailed Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the role, responsibilities, and ideal candidate"
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Contact Information Section */}
          <div className="space-y-4 p-6 bg-blue-50 rounded-lg border border-blue-100 mt-8">
            <h2 className="text-xl font-semibold text-gray-800">Contact Information</h2>
            <p className="text-sm text-gray-600">This is how applicants will reach you.</p>
            
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter contact email" {...field} />
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
                  <FormLabel>Phone Number (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Photo Upload Section */}
          <div className="space-y-4 p-6 bg-gray-50 rounded-lg border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Upload Photos</h2>
            <p className="text-sm text-gray-600">
              Add photos of your salon to attract the best candidates.
            </p>
            
            <div className="mt-2">
              <Label htmlFor="photos" className="block text-sm font-medium text-gray-700">
                Photo Upload (Max 5)
              </Label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Upload files</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        multiple
                        onChange={handlePhotoChange}
                        disabled={photoUploads.length >= 5}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

            {photoUploads.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700">Uploaded Photos</h3>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                  {photoUploads.map((file, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Upload ${index + 1}`}
                          className="object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <span className="sr-only">Remove</span>
                        <svg
                          className="h-4 w-4 text-red-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Submitting...' : 'Continue to Review'}
            {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </form>
    </Form>
  );
};
