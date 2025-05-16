
import React from 'react';
import { Job } from '@/types/job';
import { Shield, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface JobCardHeaderProps {
  job: Job;
  showCompany?: boolean;
}

const JobCardHeader = ({ job, showCompany = true }: JobCardHeaderProps) => {
  const trustIndicators = job.trust_indicators || [];
  
  return (
    <div className="flex items-start justify-between">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold line-clamp-2">
          {job.title}
        </h3>
        
        {showCompany && job.company && (
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-600">{job.company}</span>
            
            {/* Only render verified badge if the job has verified status */}
            {job.verified && (
              <Badge variant="outline" className="h-5 bg-green-50 text-green-700 text-xs border-green-200">
                <CheckCircle className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>
        )}
        
        <div className="text-sm text-gray-500">
          {job.location}
        </div>
      </div>
      
      {job.pricingTier && job.pricingTier !== 'free' && (
        <Badge 
          className={`
            ${job.pricingTier === 'premium' ? 'bg-purple-500' : ''}
            ${job.pricingTier === 'gold' ? 'bg-amber-500' : ''}
            ${job.pricingTier === 'diamond' ? 'bg-blue-600' : ''}
          `}
        >
          {job.pricingTier.charAt(0).toUpperCase() + job.pricingTier.slice(1)}
        </Badge>
      )}
    </div>
  );
};

export default JobCardHeader;
