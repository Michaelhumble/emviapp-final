
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { JobFormValues } from './jobFormSchema';
import { JobSpecialties } from '@/components/jobs/card-sections/JobSpecialties';
import { ChevronLeft } from 'lucide-react';

interface JobPostPreviewProps {
  jobData: JobFormValues | null;
  photoUploads?: File[];
  onBack: () => void;
}

export const JobPostPreview: React.FC<JobPostPreviewProps> = ({ 
  jobData, 
  photoUploads = [], 
  onBack 
}) => {
  // If jobData is null, return null or a placeholder
  if (!jobData) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="text-center py-8">
            <p className="text-gray-500">No job data to preview</p>
            <Button onClick={onBack} className="mt-4">
              <ChevronLeft className="mr-2 h-4 w-4" /> Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Ensure requirements and specialties are arrays
  const safeRequirements = Array.isArray(jobData.requirements) ? jobData.requirements : [];
  const safeSpecialties = Array.isArray(jobData.specialties) ? jobData.specialties : [];
  
  // Preview thumbnail for uploaded image
  const previewImage = photoUploads.length > 0 ? URL.createObjectURL(photoUploads[0]) : null;
  
  return (
    <Card className="w-full border-2 border-purple-100">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image preview */}
          {previewImage && (
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <img 
                src={previewImage} 
                alt="Job preview" 
                className="w-full h-48 object-cover rounded-md"
              />
            </div>
          )}
          
          {/* Job details */}
          <div className={`w-full ${previewImage ? 'md:w-2/3' : 'md:w-full'}`}>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {jobData.title}
            </h3>
            
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                {jobData.jobType || 'Full-time'}
              </span>
              {jobData.experience_level && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {jobData.experience_level}
                </span>
              )}
              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                {jobData.location}
              </span>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-1">Description:</h4>
              <p className="text-gray-700 text-sm whitespace-pre-wrap">
                {jobData.description}
              </p>
            </div>
            
            {jobData.vietnameseDescription && (
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-1">Vietnamese Description:</h4>
                <p className="text-gray-700 text-sm whitespace-pre-wrap">
                  {jobData.vietnameseDescription}
                </p>
              </div>
            )}
            
            {safeRequirements.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-1">Requirements:</h4>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {safeRequirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Use the JobSpecialties component */}
            <JobSpecialties specialties={safeSpecialties} />
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium mb-2">Contact Information:</h4>
              <div className="text-sm text-gray-700">
                <p>{jobData.contactName}</p>
                <p>{jobData.contactEmail}</p>
                {jobData.contactPhone && <p>{jobData.contactPhone}</p>}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
