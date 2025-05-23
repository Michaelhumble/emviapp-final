
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { JobDetailsSubmission } from '@/types/job';

interface JobPostPreviewProps {
  jobDetails: JobDetailsSubmission;
}

const JobPostPreview: React.FC<JobPostPreviewProps> = ({ jobDetails }) => {
  return (
    <Card className="border rounded-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold">{jobDetails.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {jobDetails.salonName} • {jobDetails.location}
            </p>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {jobDetails.jobType}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Posted {formatDate(new Date())}</p>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium">Description</h3>
          <p className="whitespace-pre-wrap text-sm">{jobDetails.description}</p>
        </div>
        
        {jobDetails.vietnamese_description && (
          <div className="space-y-2">
            <h3 className="font-medium">Vietnamese Description</h3>
            <p className="whitespace-pre-wrap text-sm">{jobDetails.vietnamese_description}</p>
          </div>
        )}
        
        {jobDetails.compensation_type && (
          <div className="space-y-2">
            <h3 className="font-medium">Compensation</h3>
            <p className="text-sm">
              <span className="font-medium">{jobDetails.compensation_type.charAt(0).toUpperCase() + jobDetails.compensation_type.slice(1)}</span>
              {jobDetails.compensation_details && `: ${jobDetails.compensation_details}`}
            </p>
          </div>
        )}
        
        {(jobDetails.weekly_pay || jobDetails.has_housing || jobDetails.has_wax_room || 
          jobDetails.owner_will_train || jobDetails.no_supply_deduction) && (
          <div className="space-y-2">
            <h3 className="font-medium">Benefits</h3>
            <div className="flex flex-wrap gap-2">
              {jobDetails.weekly_pay && <Badge variant="secondary">Weekly Pay</Badge>}
              {jobDetails.has_housing && <Badge variant="secondary">Housing Provided</Badge>}
              {jobDetails.has_wax_room && <Badge variant="secondary">Wax Room Available</Badge>}
              {jobDetails.owner_will_train && <Badge variant="secondary">Owner Will Train</Badge>}
              {jobDetails.no_supply_deduction && <Badge variant="secondary">No Supply Deduction</Badge>}
            </div>
          </div>
        )}
        
        {jobDetails.specialties && jobDetails.specialties.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-medium">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {jobDetails.specialties.map((specialty, index) => (
                <Badge key={index} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {jobDetails.requirements && (
          Array.isArray(jobDetails.requirements) ? jobDetails.requirements.length > 0 : jobDetails.requirements
        ) && (
          <div className="space-y-2">
            <h3 className="font-medium">Requirements</h3>
            {Array.isArray(jobDetails.requirements) ? (
              <ul className="list-disc pl-5 text-sm space-y-1">
                {jobDetails.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm">{jobDetails.requirements}</p>
            )}
          </div>
        )}
        
        <div className="space-y-2 border-t pt-3">
          <h3 className="font-medium">Contact Information</h3>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="font-medium">Name:</span> {jobDetails.contact_info.owner_name}
            </p>
            <p className="text-sm">
              <span className="font-medium">Email:</span> {jobDetails.contact_info.email}
            </p>
            <p className="text-sm">
              <span className="font-medium">Phone:</span> {jobDetails.contact_info.phone}
            </p>
            {jobDetails.contact_info.notes && (
              <p className="text-sm">
                <span className="font-medium">Notes:</span> {jobDetails.contact_info.notes}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobPostPreview;
