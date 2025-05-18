
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil, MapPin, Clock, Sparkles, Briefcase, DollarSign, Mail, Phone, User } from 'lucide-react';
import { JobFormValues } from './jobFormSchema';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface JobPostPreviewProps {
  jobData: JobFormValues | null;
  photoUploads: File[];
  onBack?: () => void;
}

export const JobPostPreview: React.FC<JobPostPreviewProps> = ({
  jobData,
  photoUploads,
  onBack
}) => {
  if (!jobData) return null;

  // Create URL for preview images
  const imageUrls = photoUploads.map(file => URL.createObjectURL(file));
  
  // Helper to get a job type label that's more readable
  const getJobTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      'full-time': 'Full Time',
      'part-time': 'Part Time',
      'contract': 'Contract',
      'temporary': 'Temporary',
      'commission': 'Commission'
    };
    return labels[type] || type;
  };
  
  // Helper to get experience level label
  const getExperienceLabel = (level: string): string => {
    const labels: Record<string, string> = {
      'entry': 'Entry Level',
      'intermediate': 'Intermediate',
      'experienced': 'Experienced',
      'senior': 'Senior'
    };
    return labels[level] || level;
  };

  return (
    <Card className="overflow-hidden border shadow-lg rounded-xl">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-playfair">{jobData.title || 'Job Title'}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <MapPin className="h-4 w-4 mr-1 text-gray-500" />
              <span>{jobData.location || 'Location'}</span>
            </CardDescription>
          </div>
          {onBack && (
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="flex items-center gap-1 text-xs"
            >
              <Pencil className="h-3 w-3" />
              Edit
            </Button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3">
          {jobData.jobType && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Briefcase className="h-3 w-3" />
              {getJobTypeLabel(jobData.jobType)}
            </Badge>
          )}
          
          {jobData.experience_level && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              {getExperienceLabel(jobData.experience_level)}
            </Badge>
          )}
          
          {jobData.salary_range && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <DollarSign className="h-3 w-3" />
              {jobData.salary_range}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-5">
        {/* Photo Gallery */}
        {imageUrls.length > 0 && (
          <div className="mb-5">
            <h3 className="text-md font-medium mb-2">Photos</h3>
            <div className="grid grid-cols-3 gap-2">
              {imageUrls.map((url, index) => (
                <div 
                  key={`image-${index}`} 
                  className="aspect-square rounded-md overflow-hidden border bg-gray-50"
                >
                  <img 
                    src={url} 
                    alt={`Job image ${index + 1}`}
                    className="w-full h-full object-cover" 
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* No Photos Placeholder */}
        {imageUrls.length === 0 && (
          <div className="mb-5 border rounded-md bg-gray-50 p-4 text-center">
            <p className="text-gray-500 text-sm">No photos uploaded</p>
          </div>
        )}
        
        {/* Description */}
        <div className="space-y-4">
          <div>
            <h3 className="text-md font-medium">Job Description</h3>
            <p className="text-sm text-gray-700 whitespace-pre-line mt-1">
              {jobData.description || 'No description provided.'}
            </p>
          </div>
          
          {/* Vietnamese Description if available */}
          {jobData.vietnameseDescription && (
            <div className="pt-2">
              <h3 className="text-md font-medium flex items-center">
                Vietnamese Description
                <Badge className="ml-2 bg-indigo-100 text-indigo-800 border-indigo-200">Tiếng Việt</Badge>
              </h3>
              <p className="text-sm text-gray-700 whitespace-pre-line mt-1">
                {jobData.vietnameseDescription}
              </p>
            </div>
          )}
        </div>
        
        <Separator className="my-4" />
        
        {/* Compensation */}
        {jobData.compensation_details && (
          <div className="mb-4">
            <h3 className="text-md font-medium">Compensation Details</h3>
            <p className="text-sm text-gray-700 mt-1">
              {jobData.compensation_details}
            </p>
          </div>
        )}
        
        {/* Requirements */}
        {jobData.requirements && jobData.requirements.length > 0 && (
          <div className="mb-4">
            <h3 className="text-md font-medium mb-2">Requirements</h3>
            <div className="flex flex-wrap gap-1">
              {jobData.requirements.map((req, index) => (
                <Badge key={`req-${index}`} variant="outline" className="bg-gray-50">
                  {req}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {/* Specialties */}
        {jobData.specialties && jobData.specialties.length > 0 && (
          <div className="mb-4">
            <h3 className="text-md font-medium mb-2">Specialties</h3>
            <div className="flex flex-wrap gap-1">
              {jobData.specialties.map((specialty, index) => (
                <Badge key={`spec-${index}`} variant="outline" className="bg-gray-50">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <Separator className="my-4" />
        
        {/* Contact Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-md font-medium mb-3">Contact Information</h3>
          
          <div className="space-y-2">
            {jobData.contactName && (
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm">{jobData.contactName}</span>
              </div>
            )}
            
            {jobData.contactEmail && (
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm">{jobData.contactEmail}</span>
              </div>
            )}
            
            {jobData.contactPhone && (
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm">{jobData.contactPhone}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
