
import React from 'react';
import { JobFormValues } from './jobFormSchema';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Calendar,
  BriefcaseBusiness, 
  GraduationCap, 
  BanknoteIcon
} from 'lucide-react';

interface JobPostPreviewProps {
  jobData: JobFormValues;
  photoUrls?: string[];
}

export const JobPostPreview: React.FC<JobPostPreviewProps> = ({
  jobData,
  photoUrls = []
}) => {
  // Helper function to check if a value exists
  const hasValue = (value: any): boolean => {
    if (Array.isArray(value)) return value.length > 0;
    return value !== undefined && value !== null && value !== '';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header with job title and location */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold mb-1">{jobData.title || 'Job Title'}</h2>
        <div className="flex items-center text-gray-500 text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{jobData.location || 'Location'}</span>
        </div>
      </div>

      {/* Photos if available */}
      {photoUrls.length > 0 && (
        <div className="flex overflow-x-auto gap-2 p-3 border-b border-gray-200">
          {photoUrls.map((url, index) => (
            <img 
              key={index}
              src={url} 
              alt={`Job image ${index + 1}`} 
              className="h-24 w-32 object-cover rounded-md" 
            />
          ))}
        </div>
      )}

      {/* Main job details */}
      <div className="p-4">
        {/* Description section */}
        {hasValue(jobData.description) && (
          <div className="mb-4">
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">
              {jobData.description}
            </p>
          </div>
        )}

        {/* Vietnamese description if available */}
        {hasValue(jobData.vietnameseDescription) && (
          <div className="mb-4">
            <h3 className="font-medium mb-2">Mô tả (Vietnamese)</h3>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">
              {jobData.vietnameseDescription}
            </p>
          </div>
        )}

        {/* Job Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Job Type */}
          {hasValue(jobData.jobType) && (
            <div className="flex items-start">
              <BriefcaseBusiness className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Job Type</p>
                <p className="text-sm text-gray-600">
                  {jobData.jobType === 'full-time' ? 'Full-time' :
                   jobData.jobType === 'part-time' ? 'Part-time' :
                   jobData.jobType === 'contract' ? 'Contract' :
                   jobData.jobType === 'temporary' ? 'Temporary' :
                   jobData.jobType === 'commission' ? 'Commission' : 
                   jobData.jobType}
                </p>
              </div>
            </div>
          )}

          {/* Experience Level */}
          {hasValue(jobData.experience_level) && (
            <div className="flex items-start">
              <GraduationCap className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Experience Level</p>
                <p className="text-sm text-gray-600">
                  {jobData.experience_level === 'entry' ? 'Entry Level' :
                   jobData.experience_level === 'intermediate' ? 'Intermediate' :
                   jobData.experience_level === 'experienced' ? 'Experienced' :
                   jobData.experience_level === 'senior' ? 'Senior' : 
                   jobData.experience_level}
                </p>
              </div>
            </div>
          )}

          {/* Salary Range */}
          {hasValue(jobData.salary_range) && (
            <div className="flex items-start">
              <BanknoteIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Salary Range</p>
                <p className="text-sm text-gray-600">{jobData.salary_range}</p>
              </div>
            </div>
          )}

          {/* Compensation Details */}
          {hasValue(jobData.compensation_details) && (
            <div className="flex items-start">
              <Calendar className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Compensation Details</p>
                <p className="text-sm text-gray-600">{jobData.compensation_details}</p>
              </div>
            </div>
          )}
        </div>

        {/* Requirements section */}
        {hasValue(jobData.requirements) && (
          <div className="mb-4">
            <h3 className="font-medium mb-2">Requirements</h3>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {Array.isArray(jobData.requirements) ? (
                jobData.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))
              ) : (
                <li>{String(jobData.requirements)}</li>
              )}
            </ul>
          </div>
        )}

        {/* Specialties section */}
        {hasValue(jobData.specialties) && (
          <div className="mb-4">
            <h3 className="font-medium mb-2">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {jobData.specialties.map((specialty, index) => (
                <Badge key={index} variant="outline" className="bg-gray-100">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Contact Information */}
        {(hasValue(jobData.contactName) || hasValue(jobData.contactEmail) || hasValue(jobData.contactPhone)) && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h3 className="font-medium mb-2">Contact Information</h3>
            {hasValue(jobData.contactName) && (
              <p className="text-sm"><span className="font-medium">Name:</span> {jobData.contactName}</p>
            )}
            {hasValue(jobData.contactEmail) && (
              <p className="text-sm"><span className="font-medium">Email:</span> {jobData.contactEmail}</p>
            )}
            {hasValue(jobData.contactPhone) && (
              <p className="text-sm"><span className="font-medium">Phone:</span> {jobData.contactPhone}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobPostPreview;
