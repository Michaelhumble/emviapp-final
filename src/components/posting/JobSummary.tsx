
import React from 'react';
import { JobFormValues } from './job/jobFormSchema';

export interface JobSummaryProps {
  formValues: JobFormValues;
  photos: File[];
}

const JobSummary: React.FC<JobSummaryProps> = ({ formValues, photos }) => {
  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">Job Summary</h2>
        <p className="text-sm text-muted-foreground mt-1">Preview your job posting before publishing</p>
      </div>
      
      <div className="space-y-4">
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">{formValues.title || 'No title provided'}</h3>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Salon:</span> {formValues.salonName || 'N/A'}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Location:</span> {formValues.location || 'N/A'}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Job Type:</span> {formValues.jobType || 'N/A'}
          </p>
          <p className="text-sm text-gray-600 mb-4">
            <span className="font-medium">Compensation:</span> {formValues.compensation_type || 'N/A'}{formValues.compensation_details ? ` - ${formValues.compensation_details}` : ''}
          </p>
          
          <div className="mb-4">
            <h4 className="text-md font-medium mb-2">Description:</h4>
            <p className="text-sm">{formValues.description || 'No description provided'}</p>
          </div>
          
          {formValues.vietnameseDescription && (
            <div className="mb-4">
              <h4 className="text-md font-medium mb-2">Vietnamese Description:</h4>
              <p className="text-sm">{formValues.vietnameseDescription}</p>
            </div>
          )}

          {formValues.requirements && formValues.requirements.length > 0 && (
            <div className="mb-4">
              <h4 className="text-md font-medium mb-2">Requirements:</h4>
              <ul className="list-disc pl-5 text-sm">
                {Array.isArray(formValues.requirements) && formValues.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          )}
          
          {formValues.specialties && formValues.specialties.length > 0 && (
            <div className="mb-4">
              <h4 className="text-md font-medium mb-2">Specialties:</h4>
              <ul className="list-disc pl-5 text-sm">
                {formValues.specialties.map((specialty, index) => (
                  <li key={index}>{specialty}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="mb-4">
            <h4 className="text-md font-medium mb-2">Contact Information:</h4>
            <p className="text-sm mb-1">
              <span className="font-medium">Name:</span> {formValues.contactName || 'N/A'}
            </p>
            <p className="text-sm mb-1">
              <span className="font-medium">Email:</span> {formValues.contactEmail || 'N/A'}
            </p>
            <p className="text-sm mb-1">
              <span className="font-medium">Phone:</span> {formValues.contactPhone || 'N/A'}
            </p>
          </div>
          
          {photos.length > 0 && (
            <div>
              <h4 className="text-md font-medium mb-2">Photos:</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {photos.map((photo, index) => (
                  <div key={index} className="aspect-square rounded-md bg-gray-100 relative overflow-hidden">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Job photo ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSummary;
