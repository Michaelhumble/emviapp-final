
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, MapPin, Mail, Phone } from 'lucide-react';
import { JobFormValues } from '../jobFormSchema';
import { cn } from '@/lib/utils';

interface JobPreviewFormProps {
  formData: JobFormValues;
  photoUploads: File[];
}

const JobPreviewForm: React.FC<JobPreviewFormProps> = ({ formData, photoUploads }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-base font-semibold">Preview Your Job Posting</h3>
        <p className="text-sm text-gray-600">
          Review your job posting before finalizing. This is how your job will appear to potential candidates.
        </p>
      </div>

      <Card className="overflow-hidden border-0 shadow-md">
        <div className="relative bg-gradient-to-r from-purple-600 to-indigo-700 h-20">
          <div className="absolute -bottom-12 left-6">
            <div className="bg-white rounded-full h-24 w-24 flex items-center justify-center shadow-md border-4 border-white">
              {photoUploads.length > 0 ? (
                <img 
                  src={URL.createObjectURL(photoUploads[0])} 
                  alt="Salon" 
                  className="h-full w-full object-cover rounded-full"
                />
              ) : (
                <div className="text-3xl text-gray-400 font-bold">
                  {formData.salonName?.substring(0, 2).toUpperCase() || "JD"}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <CardContent className="pt-16 pb-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{formData.title || "Job Title"}</h2>
              <div className="flex items-center mt-1 text-gray-600">
                <span className="font-medium">{formData.salonName || "Salon Name"}</span>
                {formData.location && (
                  <>
                    <span className="mx-2">•</span>
                    <span className="flex items-center text-sm">
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      {formData.location}
                    </span>
                  </>
                )}
              </div>
            </div>
            
            {/* Job Type & Compensation */}
            <div className="flex flex-wrap gap-2">
              {formData.jobType && (
                <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
                  {formData.jobType}
                </Badge>
              )}
              {formData.compensation_type && (
                <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                  {formData.compensation_type}
                </Badge>
              )}
              {formData.weekly_pay && (
                <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                  Weekly Pay
                </Badge>
              )}
              {formData.has_housing && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  Housing Available
                </Badge>
              )}
            </div>
            
            {/* Description */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-700 whitespace-pre-line">{formData.description}</p>
              </div>
              
              {formData.vietnameseDescription && (
                <div>
                  <h3 className="font-semibold mb-2">Vietnamese Description</h3>
                  <p className="text-gray-700 whitespace-pre-line">{formData.vietnameseDescription}</p>
                </div>
              )}
            </div>
            
            {/* Requirements */}
            {formData.requirements && formData.requirements.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Requirements</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {formData.requirements.map((req, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-4 w-4 text-green-600 mr-2" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Specialties */}
            {formData.specialties && formData.specialties.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Required Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {formData.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline" className="bg-purple-50 text-purple-800 border-purple-200">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {/* Contact */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Contact Information</h3>
              <div className="space-y-2">
                {formData.contactName && (
                  <div className="text-gray-700">
                    <span className="font-medium">Name:</span> {formData.contactName}
                  </div>
                )}
                {formData.contactEmail && (
                  <div className="flex items-center text-gray-700">
                    <Mail className="h-4 w-4 mr-2" /> 
                    {formData.contactEmail}
                  </div>
                )}
                {formData.contactPhone && (
                  <div className="flex items-center text-gray-700">
                    <Phone className="h-4 w-4 mr-2" /> 
                    {formData.contactPhone}
                  </div>
                )}
              </div>
            </div>

            {/* Photo Gallery */}
            {photoUploads.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Salon Photos</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {photoUploads.map((photo, index) => (
                    <div 
                      key={index} 
                      className="aspect-square rounded-md overflow-hidden"
                    >
                      <img 
                        src={URL.createObjectURL(photo)} 
                        alt={`Salon ${index + 1}`} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="rounded-lg bg-green-50 border border-green-200 p-4">
        <h4 className="text-green-800 font-medium">Ready to submit?</h4>
        <p className="text-sm text-green-700 mt-2">
          Select your pricing plan on the next step to publish your job posting and start receiving applications from qualified candidates!
        </p>
      </div>
    </div>
  );
};

export default JobPreviewForm;
