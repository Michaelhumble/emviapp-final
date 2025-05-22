
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { Badge } from '@/components/ui/badge';
import { Share2, PenLine, CheckCircle, MapPin, Briefcase, DollarSign, User, Mail, Phone, TrendingUp } from 'lucide-react';
import { MobileButton } from '@/components/ui/mobile-button';
import { JobSpecialties } from '@/components/jobs/card-sections/JobSpecialties';
import { JobFeatures } from '@/components/jobs/card-sections/JobFeatures';
import { cn } from '@/lib/utils';

interface JobPreviewProps {
  jobData: JobFormValues;
  onEdit: (section?: string) => void;
  onPublish: () => void;
  isPublishing?: boolean;
}

const JobPreview: React.FC<JobPreviewProps> = ({
  jobData,
  onEdit,
  onPublish,
  isPublishing = false,
}) => {
  // Define sections for quick editing
  const sections = [
    { id: 'title', label: 'Job Title & Description', icon: <PenLine className="h-4 w-4 mr-2" /> },
    { id: 'location', label: 'Location', icon: <MapPin className="h-4 w-4 mr-2" /> },
    { id: 'compensation', label: 'Compensation', icon: <DollarSign className="h-4 w-4 mr-2" /> },
    { id: 'contact', label: 'Contact Info', icon: <Mail className="h-4 w-4 mr-2" /> },
  ];

  return (
    <div className="space-y-4">
      <Card className="bg-white shadow-md rounded-lg overflow-hidden border-t-4 border-t-primary">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 pb-2">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-700">Preview Your Job Post</h2>
            <Badge className="bg-blue-100 text-blue-700">Preview</Badge>
          </div>
          <p className="text-sm text-gray-600">
            This is how your job post will appear to potential applicants.
            Tap any section to edit.
          </p>
        </CardHeader>
        
        <CardContent className="p-0">
          {/* The job preview */}
          <div className="p-5 border-b">
            <div 
              className="mb-5 hover:bg-gray-50 p-2 rounded-md cursor-pointer transition-colors"
              onClick={() => onEdit('title')}
            >
              <div className="flex justify-between">
                <h3 className="text-xl font-semibold text-gray-800">{jobData.title || "Job Title"}</h3>
                <PenLine className="h-4 w-4 text-gray-400" />
              </div>
              <div className="flex items-center gap-2 mt-1 mb-3">
                <Briefcase className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">{jobData.jobType || "Full-time"}</span>
              </div>
              <p className="text-gray-700">
                {jobData.description || "No description provided."}
              </p>
            </div>
            
            <div 
              className="mb-5 hover:bg-gray-50 p-2 rounded-md cursor-pointer transition-colors"
              onClick={() => onEdit('location')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-gray-700">{jobData.location || "Location"}</span>
                </div>
                <PenLine className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            {/* Job Features */}
            <div 
              className="mb-5 hover:bg-gray-50 p-2 rounded-md cursor-pointer transition-colors"
              onClick={() => onEdit('features')}
            >
              <JobFeatures 
                weeklyPay={!!jobData.weekly_pay} 
                ownerWillTrain={!!jobData.owner_will_train}
                hasHousing={!!jobData.has_housing}
                noSupplyDeduction={!!jobData.no_supply_deduction}
              />
            </div>
            
            {/* Specialties */}
            {jobData.specialties && jobData.specialties.length > 0 && (
              <div 
                className="mb-5 hover:bg-gray-50 p-2 rounded-md cursor-pointer transition-colors"
                onClick={() => onEdit('specialties')}
              >
                <JobSpecialties specialties={jobData.specialties} />
              </div>
            )}
            
            {/* Compensation */}
            <div 
              className="mb-5 hover:bg-gray-50 p-2 rounded-md cursor-pointer transition-colors"
              onClick={() => onEdit('compensation')}
            >
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-gray-700">Compensation</h4>
                <PenLine className="h-4 w-4 text-gray-400" />
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-500" />
                <span className="text-gray-700">
                  {jobData.compensation_details || jobData.salary_range || "Not specified"}
                </span>
              </div>
            </div>
            
            {/* Contact Info */}
            <div 
              className="mb-2 hover:bg-gray-50 p-2 rounded-md cursor-pointer transition-colors"
              onClick={() => onEdit('contact')}
            >
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-gray-700">Contact Information</h4>
                <PenLine className="h-4 w-4 text-gray-400" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">{jobData.contactName || "No name provided"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">{jobData.contactEmail || "No email provided"}</span>
                </div>
                {jobData.contactPhone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">{jobData.contactPhone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Quick Edit Sections */}
          <div className="bg-gray-50 p-4 space-y-3">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Edit</h4>
            <div className="grid grid-cols-2 gap-2">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant="outline"
                  className="h-auto py-2 px-3 text-left flex items-center justify-start"
                  onClick={() => onEdit(section.id)}
                >
                  {section.icon}
                  <span className="text-xs">{section.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Action Buttons */}
      <div className="grid grid-cols-1 gap-4 mt-6 mb-8">
        <MobileButton 
          onClick={onPublish} 
          disabled={isPublishing}
          className={cn(
            "w-full bg-gradient-to-r from-primary to-indigo-600 text-white font-medium",
            "h-12 flex items-center justify-center gap-2"
          )}
        >
          {isPublishing ? (
            <>Processing...</>
          ) : (
            <>
              <CheckCircle className="h-5 w-5" />
              Publish Job
            </>
          )}
        </MobileButton>
        
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2"
          onClick={() => onEdit()}
        >
          <PenLine className="h-4 w-4" />
          Edit Job Details
        </Button>
      </div>
    </div>
  );
};

export default JobPreview;
