
import React from 'react';
import { JobFormValues } from './jobFormSchema';

interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  isSubmitting: boolean;
}

export const JobForm: React.FC<JobFormProps> = ({ 
  onSubmit, 
  photoUploads, 
  setPhotoUploads, 
  isSubmitting 
}) => {
  // This is just a placeholder implementation
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a simple mock form values object
    const mockValues: JobFormValues = {
      title: "Job Title",
      description: "Job Description",
      location: "City, State",
      salary: "$15-20/hr",
      contactEmail: "contact@example.com",
      jobType: "full-time",
      requirements: ["Requirement 1", "Requirement 2"]
    };
    
    onSubmit(mockValues);
  };
  
  return (
    <form onSubmit={handleFormSubmit}>
      {/* Form fields would go here */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Title</label>
          <input 
            type="text" 
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Enter job title"
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea 
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Enter job description"
            rows={4}
            disabled={isSubmitting}
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Job Posting"}
        </button>
      </div>
    </form>
  );
};
