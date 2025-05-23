
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { JobFormValues } from './job/jobFormSchema';
import { Button } from '@/components/ui/button';
import { Edit, MapPin, Clock, DollarSign, Award, CheckCircle, House, BadgeDollarSign, School } from 'lucide-react';

interface JobPreviewProps {
  formData: JobFormValues;
  photoUploads: File[];
  onEdit: (section: string) => void;
}

const JobPreview: React.FC<JobPreviewProps> = ({ formData, photoUploads, onEdit }) => {
  // Function to render the preview section with an edit button
  const renderSection = (title: string, content: React.ReactNode, section: string) => {
    return (
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">{title}</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(section)}
              className="flex items-center gap-1 text-sm"
            >
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          </div>
          {content}
        </CardContent>
      </Card>
    );
  };

  // Create URLs for photo previews
  const photoUrls = photoUploads.map(file => URL.createObjectURL(file));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6">Preview Your Job Posting</h2>
      <p className="text-center text-gray-600 mb-6">
        Review your job posting below. Click "Edit" on any section to make changes.
      </p>

      {/* Main Job Details Section */}
      {renderSection(
        "Job Details",
        <div className="space-y-4">
          <h1 className="text-xl font-bold">{formData.title || "Job Title"}</h1>
          <div className="text-lg font-semibold">{formData.salonName || "Salon Name"}</div>
          
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{formData.location || "Location"}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-1" />
            <span>{formData.jobType === 'full-time' ? 'Full-time' : 
                  formData.jobType === 'part-time' ? 'Part-time' : 
                  formData.jobType === 'contract' ? 'Contract' : 'Temporary'}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <DollarSign className="h-4 w-4 mr-1" />
            <span>{formData.compensation_type === 'hourly' ? 'Hourly' : 
                  formData.compensation_type === 'commission' ? 'Commission' : 
                  formData.compensation_type === 'salary' ? 'Salary' : 'Hybrid'}</span>
            {formData.salary_range && <span className="ml-1">• {formData.salary_range}</span>}
          </div>
          
          <div className="mt-4">
            <h4 className="font-medium mb-2">Description</h4>
            <p className="whitespace-pre-wrap">{formData.description || "No description provided."}</p>
          </div>
          
          {formData.vietnameseDescription && (
            <div className="mt-4 p-3 bg-gray-50 rounded-md">
              <h4 className="font-medium mb-2">Vietnamese Description</h4>
              <p className="whitespace-pre-wrap">{formData.vietnameseDescription}</p>
            </div>
          )}
        </div>,
        "details"
      )}

      {/* Specialties & Requirements Section */}
      {renderSection(
        "Specialties & Requirements",
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Specialties</h4>
            {Array.isArray(formData.specialties) && formData.specialties.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {formData.specialties.map((specialty, index) => (
                  <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {specialty}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No specialties specified.</p>
            )}
          </div>

          <div>
            <h4 className="font-medium mb-2">Requirements</h4>
            {Array.isArray(formData.requirements) && formData.requirements.length > 0 ? (
              <ul className="list-disc pl-5 space-y-1">
                {formData.requirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No requirements specified.</p>
            )}
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Benefits</h4>
            <div className="grid grid-cols-2 gap-2">
              {formData.weekly_pay && (
                <div className="flex items-center">
                  <BadgeDollarSign className="h-4 w-4 mr-1 text-green-600" />
                  <span>Weekly Pay</span>
                </div>
              )}
              
              {formData.has_housing && (
                <div className="flex items-center">
                  <House className="h-4 w-4 mr-1 text-green-600" />
                  <span>Housing Available</span>
                </div>
              )}
              
              {formData.has_wax_room && (
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                  <span>Wax Room Available</span>
                </div>
              )}
              
              {formData.owner_will_train && (
                <div className="flex items-center">
                  <School className="h-4 w-4 mr-1 text-green-600" />
                  <span>Owner Will Train</span>
                </div>
              )}
              
              {formData.no_supply_deduction && (
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-1 text-green-600" />
                  <span>No Supply Deduction</span>
                </div>
              )}
            </div>
          </div>
        </div>,
        "specialties"
      )}

      {/* Contact Information Section */}
      {renderSection(
        "Contact Information",
        <div className="space-y-3">
          <div>
            <span className="font-medium">Contact Name:</span> {formData.contactName || "Not provided"}
          </div>
          <div>
            <span className="font-medium">Phone:</span> {formData.contactPhone || "Not provided"}
          </div>
          <div>
            <span className="font-medium">Email:</span> {formData.contactEmail || "Not provided"}
          </div>
        </div>,
        "contact"
      )}

      {/* Photos Section */}
      {renderSection(
        "Photos",
        <div>
          {photoUrls.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {photoUrls.map((url, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={url}
                    alt={`Job photo ${index + 1}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No photos uploaded.</p>
          )}
        </div>,
        "photos"
      )}
    </div>
  );
};

export default JobPreview;
