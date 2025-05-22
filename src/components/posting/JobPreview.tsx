
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { JobFormValues } from './job/jobFormSchema';
import { Button } from '@/components/ui/button';
import { MobileButton } from '@/components/ui/mobile-button';
import { Calendar, MapPin, Banknote, BadgeCheck, Clock, Home, Paintbrush, Phone, Mail, User, PenSquare } from 'lucide-react';

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
  isPublishing = false 
}) => {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-gray-200">
        <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">{jobData.title}</h2>
              <p className="text-gray-700 mt-1">{jobData.salonName}</p>
              
              <div className="flex items-center mt-3 text-gray-600">
                <MapPin size={16} className="mr-1" />
                <span>{jobData.location}</span>
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onEdit('basic')}
              className="bg-white/80 hover:bg-white"
            >
              <PenSquare size={16} className="mr-1" />
              Edit
            </Button>
          </div>
        </div>

        <CardContent className="p-0">
          {/* Job Details Section */}
          <div className="p-6 border-b">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">Job Details</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onEdit('details')}
              >
                <PenSquare size={14} className="mr-1" />
                Edit
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Clock size={18} className="mr-3 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Job Type</p>
                  <p className="font-medium">{jobData.jobType?.replace('-', ' ')}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Banknote size={18} className="mr-3 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Compensation</p>
                  <p className="font-medium">{jobData.compensation_type} {jobData.compensation_details}</p>
                </div>
              </div>
              
              {jobData.salary_range && (
                <div className="flex items-center">
                  <Banknote size={18} className="mr-3 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Salary Range</p>
                    <p className="font-medium">{jobData.salary_range}</p>
                  </div>
                </div>
              )}
              
              {jobData.experience_level && (
                <div className="flex items-center">
                  <BadgeCheck size={18} className="mr-3 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Experience</p>
                    <p className="font-medium">{jobData.experience_level}</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Benefits */}
            {(jobData.weekly_pay || jobData.has_housing || jobData.has_wax_room || jobData.owner_will_train || jobData.no_supply_deduction) && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Benefits</p>
                <div className="flex flex-wrap gap-2">
                  {jobData.weekly_pay && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200">
                      Weekly Pay
                    </Badge>
                  )}
                  {jobData.has_housing && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200">
                      Housing Provided
                    </Badge>
                  )}
                  {jobData.has_wax_room && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200">
                      Wax Room
                    </Badge>
                  )}
                  {jobData.owner_will_train && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200">
                      Training Provided
                    </Badge>
                  )}
                  {jobData.no_supply_deduction && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200">
                      No Supply Deduction
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Description Section */}
          <div className="p-6 border-b">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">Description</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onEdit('description')}
              >
                <PenSquare size={14} className="mr-1" />
                Edit
              </Button>
            </div>
            
            <div className="prose max-w-none">
              <p className="whitespace-pre-line">{jobData.description}</p>
              
              {jobData.vietnameseDescription && (
                <>
                  <div className="my-4 border-t border-dashed"></div>
                  <h4 className="text-md font-medium mt-4">Tiếng Việt</h4>
                  <p className="whitespace-pre-line">{jobData.vietnameseDescription}</p>
                </>
              )}
            </div>
          </div>
          
          {/* Requirements Section */}
          {(Array.isArray(jobData.requirements) && jobData.requirements.length > 0) && (
            <div className="p-6 border-b">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">Requirements</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onEdit('requirements')}
                >
                  <PenSquare size={14} className="mr-1" />
                  Edit
                </Button>
              </div>
              
              <ul className="list-disc pl-5 space-y-1">
                {jobData.requirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Specialties Section */}
          {(Array.isArray(jobData.specialties) && jobData.specialties.length > 0) && (
            <div className="p-6 border-b">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">Specialties</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onEdit('specialties')}
                >
                  <PenSquare size={14} className="mr-1" />
                  Edit
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {jobData.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary" className="bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200">
                    <Paintbrush size={12} className="mr-1" />
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {/* Contact Information */}
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onEdit('contact')}
              >
                <PenSquare size={14} className="mr-1" />
                Edit
              </Button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <User size={18} className="mr-3 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Contact Name</p>
                  <p className="font-medium">{jobData.contactName}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Phone size={18} className="mr-3 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{jobData.contactPhone}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Mail size={18} className="mr-3 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{jobData.contactEmail}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-col space-y-4">
        <MobileButton
          onClick={onPublish}
          disabled={isPublishing}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          {isPublishing ? "Publishing..." : "Publish Job Listing"}
        </MobileButton>
        
        <Button
          variant="outline"
          onClick={() => onEdit()}
        >
          Go Back and Edit
        </Button>
      </div>
    </div>
  );
};

export default JobPreview;
