import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import { getJobTemplate } from '@/utils/jobTemplates';
import { UserProfile } from '@/context/auth/types'; // Import the correct type

interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  isSubmitting: boolean;
  defaultValues?: JobFormValues;
  industry?: string;
  userProfile?: UserProfile; // Accept userProfile instead of User
}

export const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  photoUploads,
  setPhotoUploads,
  isSubmitting,
  defaultValues,
  industry = "nails", // Default to nails industry
  userProfile
}) => {
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: defaultValues || {}
  });

  // Apply templates when the form first loads if no existing values
  useEffect(() => {
    if (!defaultValues) {
      // Get template based on industry and user contact info
      const template = getJobTemplate(industry, {
        phoneNumber: userProfile?.phone || "",
        email: userProfile?.email || ""
      });
      
      // Set form values from template
      Object.entries(template).forEach(([field, value]) => {
        form.setValue(field as keyof JobFormValues, value as any);
      });
    }
  }, [form, defaultValues, industry, userProfile]);

  // Handler for form submission
  const handleSubmit = (values: JobFormValues) => {
    onSubmit(values);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="p-6 space-y-6">
      {/* Job Title */}
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Job Title
        </label>
        <input
          type="text"
          id="title"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="e.g. Nail Technician - Full Time"
          {...form.register('title')}
        />
        {form.formState.errors.title && (
          <p className="mt-1 text-sm text-red-600">{form.formState.errors.title.message}</p>
        )}
      </div>

      {/* Job Type */}
      <div className="space-y-2">
        <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">
          Job Type
        </label>
        <select
          id="jobType"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          {...form.register('jobType')}
        >
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="contract">Contract</option>
          <option value="temporary">Temporary</option>
        </select>
        {form.formState.errors.jobType && (
          <p className="mt-1 text-sm text-red-600">{form.formState.errors.jobType.message}</p>
        )}
      </div>

      {/* Location */}
      <div className="space-y-2">
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          id="location"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="e.g. San Francisco, CA"
          {...form.register('location')}
        />
        {form.formState.errors.location && (
          <p className="mt-1 text-sm text-red-600">{form.formState.errors.location.message}</p>
        )}
      </div>

      {/* Salary */}
      <div className="space-y-2">
        <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
          Salary/Compensation
        </label>
        <input
          type="text"
          id="salary"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="e.g. $25-30/hr or Commission-based"
          {...form.register('salary')}
        />
        {form.formState.errors.salary && (
          <p className="mt-1 text-sm text-red-600">{form.formState.errors.salary.message}</p>
        )}
      </div>

      {/* Job Summary */}
      <div className="space-y-2">
        <label htmlFor="jobSummary" className="block text-sm font-medium text-gray-700">
          Job Summary
        </label>
        <textarea
          id="jobSummary"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Brief overview of the position"
          {...form.register('jobSummary')}
        />
        {form.formState.errors.jobSummary && (
          <p className="mt-1 text-sm text-red-600">{form.formState.errors.jobSummary.message}</p>
        )}
      </div>

      {/* Full Description */}
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Full Job Description
        </label>
        <textarea
          id="description"
          rows={6}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Detailed job description, responsibilities, and requirements"
          {...form.register('description')}
        />
        {form.formState.errors.description && (
          <p className="mt-1 text-sm text-red-600">{form.formState.errors.description.message}</p>
        )}
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
        
        {/* Phone Number */}
        <div className="space-y-2">
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            id="phoneNumber"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="e.g. (555) 123-4567"
            {...form.register('phoneNumber')}
          />
          {form.formState.errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-600">{form.formState.errors.phoneNumber.message}</p>
          )}
        </div>
        
        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
            Email (Optional)
          </label>
          <input
            type="email"
            id="contactEmail"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="e.g. hiring@yoursalon.com"
            {...form.register('contactEmail')}
          />
          {form.formState.errors.contactEmail && (
            <p className="mt-1 text-sm text-red-600">{form.formState.errors.contactEmail.message}</p>
          )}
        </div>
      </div>

      {/* Photo Upload Section */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Upload Photos (Optional)
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span>Upload files</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      const filesArray = Array.from(e.target.files);
                      setPhotoUploads([...photoUploads, ...filesArray]);
                    }
                  }}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
        
        {/* Preview uploaded photos */}
        {photoUploads.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-4">
            {photoUploads.map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Upload ${index + 1}`}
                  className="h-24 w-full object-cover rounded-md"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  onClick={() => {
                    const newUploads = [...photoUploads];
                    newUploads.splice(index, 1);
                    setPhotoUploads(newUploads);
                  }}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-5">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Posting...' : 'Post Job'}
        </button>
      </div>
    </form>
  );
};
