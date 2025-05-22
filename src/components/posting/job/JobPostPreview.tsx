
import React from 'react';
import { JobDetailsSubmission } from '@/types/job';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';

interface JobPostPreviewProps {
  jobDetails: JobDetailsSubmission;
}

export const JobPostPreview: React.FC<JobPostPreviewProps> = ({ jobDetails }) => {
  // Format job type for display
  const formatJobType = (type: string): string => {
    return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{jobDetails.title}</h1>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs bg-gray-100 text-gray-800">
            {formatJobType(jobDetails.jobType)}
          </Badge>
          {jobDetails.is_urgent && (
            <Badge className="text-xs bg-red-500 text-white">
              Urgent
            </Badge>
          )}
          {jobDetails.has_housing && (
            <Badge variant="outline" className="text-xs bg-blue-100 text-blue-800">
              Housing Available
            </Badge>
          )}
        </div>
        
        <div className="text-sm text-gray-600">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium">{jobDetails.salonName || jobDetails.company}</span>
          </div>
          <div>
            {jobDetails.location}
          </div>
          <div className="mt-1">
            Posted: {formatDate(new Date())}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Job Description</h2>
          <div className="whitespace-pre-wrap">{jobDetails.description}</div>
        </div>

        {jobDetails.vietnamese_description && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Vietnamese Description</h2>
            <div className="whitespace-pre-wrap">{jobDetails.vietnamese_description}</div>
          </div>
        )}

        <div>
          <h2 className="text-lg font-semibold mb-2">Compensation</h2>
          <div className="space-y-1">
            {jobDetails.compensation_type && (
              <div>
                <span className="font-medium">Type: </span>
                {jobDetails.compensation_type.charAt(0).toUpperCase() + jobDetails.compensation_type.slice(1)}
              </div>
            )}
            {jobDetails.compensation_details && (
              <div>
                <span className="font-medium">Details: </span>
                {jobDetails.compensation_details}
              </div>
            )}
            {jobDetails.salary_range && (
              <div>
                <span className="font-medium">Salary Range: </span>
                {jobDetails.salary_range}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(jobDetails.requirements && jobDetails.requirements.length > 0) && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Requirements</h2>
              <ul className="list-disc pl-5 space-y-1">
                {Array.isArray(jobDetails.requirements) ? (
                  jobDetails.requirements.map((req, i) => <li key={i}>{req}</li>)
                ) : (
                  <li>{jobDetails.requirements}</li>
                )}
              </ul>
            </div>
          )}

          {(jobDetails.specialties && jobDetails.specialties.length > 0) && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Specialties</h2>
              <div className="flex flex-wrap gap-1">
                {jobDetails.specialties.map((specialty, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Benefits</h2>
          <div className="grid grid-cols-2 gap-2">
            {jobDetails.weekly_pay && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Weekly Pay</span>
              </div>
            )}
            {jobDetails.has_housing && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Housing Available</span>
              </div>
            )}
            {jobDetails.has_wax_room && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Wax Room</span>
              </div>
            )}
            {jobDetails.owner_will_train && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Owner Will Train</span>
              </div>
            )}
            {jobDetails.no_supply_deduction && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>No Supply Deduction</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
          <div className="space-y-1">
            <div>
              <span className="font-medium">Name: </span>
              {jobDetails.contact_info.owner_name}
            </div>
            <div>
              <span className="font-medium">Phone: </span>
              {jobDetails.contact_info.phone}
            </div>
            <div>
              <span className="font-medium">Email: </span>
              {jobDetails.contact_info.email}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
