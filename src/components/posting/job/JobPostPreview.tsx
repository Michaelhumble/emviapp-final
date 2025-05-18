
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { PencilIcon, BuildingOffice2Icon, BriefcaseIcon, EnvelopeIcon, PhoneIcon, MapPinIcon, UserIcon } from '@heroicons/react/24/outline';
import { JobFormValues } from './jobFormSchema';
import { specialtyOptions, requirementOptions } from '@/utils/posting/options';

interface JobPostPreviewProps {
  jobData: JobFormValues | null;
  photoUploads?: File[];
  onBack?: () => void;
}

export const JobPostPreview: React.FC<JobPostPreviewProps> = ({ 
  jobData, 
  photoUploads = [],
  onBack
}) => {
  if (!jobData) {
    return (
      <Card className="border shadow rounded-lg overflow-hidden">
        <CardContent className="p-6">
          <div className="text-center py-8">
            <p className="text-gray-500">No job data available to preview</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Helper function to find label by value from options array
  const findLabelByValue = (value: string, options: {value: string, label: string}[]) => {
    const option = options.find(opt => opt.value === value);
    return option ? option.label : value;
  };

  // Map job type to display value
  const jobTypeDisplay = {
    'full-time': 'Full Time',
    'part-time': 'Part Time',
    'contract': 'Contract',
    'temporary': 'Temporary',
    'commission': 'Commission'
  };

  // Map experience level to display value
  const experienceLevelDisplay = {
    'entry': 'Entry Level',
    'intermediate': 'Intermediate',
    'experienced': 'Experienced',
    'senior': 'Senior'
  };

  return (
    <Card className="border shadow-md rounded-lg overflow-hidden">
      <div className="relative">
        {/* Photo gallery or placeholder */}
        <div className="bg-gradient-to-r from-gray-100 to-gray-200 h-48 relative overflow-hidden">
          {photoUploads.length > 0 ? (
            <div className="flex space-x-2 p-4 h-full overflow-x-auto">
              {photoUploads.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Job photo ${index + 1}`}
                  className="h-40 w-40 object-cover rounded shadow-sm flex-shrink-0"
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <BuildingOffice2Icon className="h-16 w-16 text-gray-400" />
              <p className="text-gray-500 ml-2">No photos uploaded</p>
            </div>
          )}
        </div>
      
        {/* Edit button overlay */}
        {onBack && (
          <Button
            onClick={onBack}
            size="sm"
            variant="secondary"
            className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/80 backdrop-blur-sm hover:bg-white"
          >
            <PencilIcon className="h-4 w-4" />
            Edit
          </Button>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-playfair font-semibold">{jobData.title}</h3>
            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 border border-purple-200">
              {jobTypeDisplay[jobData.jobType as keyof typeof jobTypeDisplay] || jobData.jobType}
            </Badge>
          </div>
          
          <div className="flex items-center text-gray-500 mt-1">
            <MapPinIcon className="h-4 w-4 mr-1" />
            <span className="text-sm">{jobData.location}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Job details section */}
          <div>
            <h4 className="font-medium mb-1">Job Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <p className="text-sm text-gray-500">Experience Level</p>
                <p>{experienceLevelDisplay[jobData.experience_level as keyof typeof experienceLevelDisplay] || jobData.experience_level}</p>
              </div>
              
              {jobData.salary_range && (
                <div>
                  <p className="text-sm text-gray-500">Salary Range</p>
                  <p>{jobData.salary_range}</p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Description section */}
          <div>
            <h4 className="font-medium mb-1">Description</h4>
            <div className="whitespace-pre-line text-sm">{jobData.description}</div>
          </div>

          {/* Vietnamese Description if available */}
          {jobData.vietnameseDescription && (
            <div>
              <h4 className="font-medium mb-1">Mô tả (Vietnamese)</h4>
              <div className="whitespace-pre-line text-sm">{jobData.vietnameseDescription}</div>
            </div>
          )}

          <Separator />

          {/* Additional compensation details if available */}
          {jobData.compensation_details && (
            <>
              <div>
                <h4 className="font-medium mb-1">Compensation Details</h4>
                <div className="whitespace-pre-line text-sm">{jobData.compensation_details}</div>
              </div>
              <Separator />
            </>
          )}

          {/* Requirements section */}
          {jobData.requirements && jobData.requirements.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Requirements</h4>
              <div className="flex flex-wrap gap-2">
                {jobData.requirements.map((req) => (
                  <Badge key={req} variant="outline" className="bg-gray-50">
                    {findLabelByValue(req, requirementOptions)}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Specialties section */}
          {jobData.specialties && jobData.specialties.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Specialties</h4>
              <div className="flex flex-wrap gap-2">
                {jobData.specialties.map((specialty) => (
                  <Badge key={specialty} variant="outline" className="bg-gray-50">
                    {findLabelByValue(specialty, specialtyOptions)}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Contact information */}
          <div>
            <h4 className="font-medium mb-2">Contact Information</h4>
            <div className="space-y-2">
              {jobData.contactName && (
                <div className="flex items-center">
                  <UserIcon className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{jobData.contactName}</span>
                </div>
              )}
              
              <div className="flex items-center">
                <EnvelopeIcon className="h-4 w-4 mr-2 text-gray-500" />
                <span>{jobData.contactEmail}</span>
              </div>
              
              {jobData.contactPhone && (
                <div className="flex items-center">
                  <PhoneIcon className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{jobData.contactPhone}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

