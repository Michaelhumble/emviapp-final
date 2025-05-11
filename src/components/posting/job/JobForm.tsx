
import React from 'react';
import { JobFormValues } from './jobFormSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

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
    <form onSubmit={handleFormSubmit} className="space-y-8">
      {/* Greeting Header */}
      <div className="bg-gradient-to-r from-purple-100 to-white p-6 rounded-lg mb-6">
        <h2 className="text-2xl font-semibold text-purple-800">💫 Let's help you find your next amazing artist.</h2>
        <p className="text-gray-600 mt-2 italic">"Every great salon starts with one perfect hire."</p>
      </div>
      
      {/* Job Details Section */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-purple-700 mb-4">Job Basics</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-purple-900">Job Title</Label>
            <Input 
              id="title" 
              className="mt-1 rounded-md focus:ring-purple-500"
              placeholder="e.g., Nail Tech – Full time, good pay, great vibes"
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <Label htmlFor="location" className="text-purple-900">Location</Label>
            <Input 
              id="location" 
              className="mt-1 rounded-md focus:ring-purple-500"
              placeholder="e.g., Houston, TX (near Bellaire)"
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <Label htmlFor="jobType" className="text-purple-900">Employment Type</Label>
            <Select>
              <SelectTrigger className="mt-1 rounded-md">
                <SelectValue placeholder="Select employment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-Time (busy salon)</SelectItem>
                <SelectItem value="part-time">Part-Time (flexible)</SelectItem>
                <SelectItem value="booth-rental">Booth Rental (your own space)</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="description" className="text-purple-900">Job Description</Label>
            <textarea 
              id="description" 
              rows={5}
              className="w-full mt-1 rounded-md border-gray-300 shadow-sm 
                        focus:border-purple-500 focus:ring focus:ring-purple-500 
                        focus:ring-opacity-50 p-3"
              placeholder="Describe your salon, team, pay style, and what kind of artist you're looking for. Be honest and friendly!"
              disabled={isSubmitting}
            />
          </div>
        </div>
      </div>
      
      {/* Requirements Section */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-purple-700 mb-4">Requirements & Benefits</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="requirements" className="text-purple-900">Experience Level</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
              <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md">
                <input type="radio" id="entry-level" name="experience" className="text-purple-600" />
                <label htmlFor="entry-level">Entry Level</label>
              </div>
              <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md">
                <input type="radio" id="mid-level" name="experience" className="text-purple-600" />
                <label htmlFor="mid-level">Experienced</label>
              </div>
              <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md">
                <input type="radio" id="senior" name="experience" className="text-purple-600" />
                <label htmlFor="senior">Senior</label>
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="benefits" className="text-purple-900">Benefits</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md">
                <input type="checkbox" id="housing" className="text-purple-600" />
                <label htmlFor="housing">Housing Available</label>
              </div>
              <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md">
                <input type="checkbox" id="wax-room" className="text-purple-600" />
                <label htmlFor="wax-room">Wax Room Available</label>
              </div>
              <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md">
                <input type="checkbox" id="no-deduction" className="text-purple-600" />
                <label htmlFor="no-deduction">No Supply Deduction</label>
              </div>
              <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md">
                <input type="checkbox" id="training" className="text-purple-600" />
                <label htmlFor="training">Owner Will Train</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 font-medium rounded-md"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Continue to Select Pricing Plan"}
      </Button>
    </form>
  );
};
