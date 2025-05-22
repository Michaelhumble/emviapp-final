
import React from 'react';
import { JobFormValues } from './job/jobFormSchema';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface JobPreviewProps {
  values: Partial<JobFormValues>;
  className?: string;
}

export const JobPreview: React.FC<JobPreviewProps> = ({ values, className = "" }) => {
  if (!values || !values.title) {
    return (
      <Card className={`${className} h-full flex items-center justify-center`}>
        <CardContent className="p-6 text-center text-gray-500">
          <p>Preview will appear here as you fill out the form</p>
        </CardContent>
      </Card>
    );
  }

  // Format job type for display
  const formatJobType = (type?: string): string => {
    if (!type) return '';
    return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-');
  };

  return (
    <Card className={`${className} h-full overflow-auto`}>
      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold">{values.title}</h3>
          
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
            <span>{values.salonName}</span>
            <span>•</span>
            <span>{values.location}</span>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-2">
            {values.jobType && (
              <Badge variant="outline" className="text-xs">
                {formatJobType(values.jobType)}
              </Badge>
            )}
          </div>
        </div>

        {values.description && (
          <div>
            <h4 className="text-sm font-medium mb-1 text-gray-700">Job Description</h4>
            <p className="text-sm whitespace-pre-wrap">{values.description}</p>
          </div>
        )}

        {values.vietnamese_description && (
          <div>
            <h4 className="text-sm font-medium mb-1 text-gray-700">Vietnamese Description</h4>
            <p className="text-sm whitespace-pre-wrap">{values.vietnamese_description}</p>
          </div>
        )}

        {(values.compensation_type || values.compensation_details) && (
          <div>
            <h4 className="text-sm font-medium mb-1 text-gray-700">Compensation</h4>
            <div className="text-sm">
              {values.compensation_type && <div>Type: {values.compensation_type}</div>}
              {values.compensation_details && <div>Details: {values.compensation_details}</div>}
            </div>
          </div>
        )}

        {/* Benefits */}
        <div>
          <h4 className="text-sm font-medium mb-1 text-gray-700">Benefits</h4>
          <div className="grid grid-cols-2 gap-1 text-xs">
            {values.weekly_pay && <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>Weekly Pay</div>}
            {values.has_housing && <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>Housing Available</div>}
            {values.has_wax_room && <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>Wax Room</div>}
            {values.owner_will_train && <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>Owner Will Train</div>}
            {values.no_supply_deduction && <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>No Supply Deduction</div>}
          </div>
        </div>

        {/* Contact Info - only shown if available */}
        {(values.contactName || values.contactEmail || values.contactPhone) && (
          <div>
            <h4 className="text-sm font-medium mb-1 text-gray-700">Contact Information</h4>
            <div className="text-sm">
              {values.contactName && <div>Name: {values.contactName}</div>}
              {values.contactPhone && <div>Phone: {values.contactPhone}</div>}
              {values.contactEmail && <div>Email: {values.contactEmail}</div>}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
