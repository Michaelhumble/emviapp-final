
import React from 'react';
import { Job } from '@/types/job';
import { JobCardHeader } from './card-sections/JobCardHeader';
import { JobCardActions } from './card-sections/JobCardActions';
import { JobSummary } from './card-sections/JobSummary';
import { MapPin, Calendar, DollarSign, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';

interface BilingualJobCardProps {
  job: Job;
  onViewDetails: () => void;
  onRenew: () => void;
  isRenewing: boolean;
}

const BilingualJobCard: React.FC<BilingualJobCardProps> = ({
  job,
  onViewDetails,
  onRenew,
  isRenewing
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isOwner = user?.id === job.user_id;
  const isExpired = job.expires_at ? new Date(job.expires_at) < new Date() : false;

  const handleEditJob = () => {
    navigate(`/jobs/edit/${job.id}`);
  };

  // Format salary/compensation display
  const formatCompensation = () => {
    if (job.compensation_details) {
      return job.compensation_details;
    }
    if (job.employment_type) {
      return job.employment_type;
    }
    return 'Contact for details';
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200 p-6 ${isExpired ? 'opacity-70' : ''}`}>
      {/* Header Section with Premium Badge */}
      <JobCardHeader job={job} />
      
      {/* Location and Date */}
      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
        {job.location && (
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{job.location}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>{new Date(job.created_at).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Compensation */}
      <div className="flex items-center gap-1 text-sm font-medium text-emerald-600 mb-3">
        <DollarSign className="h-4 w-4" />
        <span>{formatCompensation()}</span>
      </div>

      {/* Description Preview */}
      {job.description && (
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {job.description}
        </p>
      )}

      {/* Requirements Preview */}
      {job.requirements && (
        <p className="text-gray-500 text-xs mb-4 line-clamp-1">
          Requirements: {typeof job.requirements === 'string' ? job.requirements : job.requirements.join(', ')}
        </p>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2 pt-4 border-t border-gray-100">
        <Button 
          onClick={onViewDetails}
          className="flex-1"
          variant={isExpired ? "outline" : "default"}
        >
          View Details
        </Button>
        
        {isOwner && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleEditJob}
            title="Edit Job"
            className="px-3"
          >
            <Edit className="h-4 w-4" />
          </Button>
        )}
        
        {isOwner && isExpired && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={onRenew}
            disabled={isRenewing}
            className="px-3"
          >
            {isRenewing ? "Renewing..." : "Renew"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default BilingualJobCard;
