
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import JobSummary from './card-sections/JobSummary';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Job } from '@/types/job';

interface JobListingCardProps {
  job: Job;
  onClick: (job: Job) => void;
  compact?: boolean;
  isExpired?: boolean;
  currentUserId?: string;
  onViewDetails?: () => void;
  onRenew?: () => void;
  isRenewing?: boolean;
}

const JobListingCard: React.FC<JobListingCardProps> = ({ 
  job, 
  onClick, 
  compact = false,
  isExpired,
  currentUserId,
  onViewDetails,
  onRenew,
  isRenewing 
}) => {
  const handleClick = () => {
    onClick(job);
    if (onViewDetails) onViewDetails();
  };

  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all bg-white hover:shadow-md cursor-pointer",
        job.featured && "border-yellow-300 shadow-md",
        compact ? "p-4" : "p-5"
      )}
      onClick={handleClick}
    >
      {job.featured && (
        <div className="absolute top-0 right-0 p-1 px-2 bg-yellow-400 text-yellow-900 text-xs font-medium rounded-bl-md">
          Featured
        </div>
      )}
      
      {compact ? (
        <div className="space-y-2">
          <div className="flex justify-between">
            <h3 className="font-medium text-lg truncate mr-2">{job.title}</h3>
            {job.is_urgent && <Badge className="bg-red-500">Urgent</Badge>}
          </div>
          <p className="text-sm text-gray-500 truncate">{job.salonName || job.company || "Unknown Salon"}</p>
          <p className="text-sm text-gray-500">{job.location}</p>
        </div>
      ) : (
        <JobSummary
          title={job.title || ""}
          description={job.description?.substring(0, 120) + (job.description && job.description.length > 120 ? "..." : "")}
          location={job.location || ""}
          contactEmail={job.contactEmail || job.contact_info?.email || ""}
          contactPhone={job.contactPhone || job.contact_info?.phone || ""}
          salonName={job.salonName || job.company || ""}
        />
      )}
      
      <div className="mt-4 flex justify-end">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-primary hover:text-primary/70"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          View Details <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      {isExpired && onRenew && (
        <div className="mt-2 flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              if (onRenew) onRenew();
            }}
            disabled={isRenewing}
          >
            {isRenewing ? 'Renewing...' : 'Renew Listing'}
          </Button>
        </div>
      )}
    </Card>
  );
};

export default JobListingCard;
