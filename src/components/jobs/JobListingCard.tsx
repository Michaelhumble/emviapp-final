
import React from 'react';
import { Job } from '@/types/job';
import { JobSummary } from './card-sections/JobSummary';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';

interface JobListingCardProps {
  job: Job;
  isExpired?: boolean;
  onViewDetails: () => void;
  onRenew?: () => void;
  onDelete?: () => void;
  isRenewing?: boolean;
  currentUserId?: string;
  showOwnerActions?: boolean;
}

const JobListingCard: React.FC<JobListingCardProps> = ({
  job,
  isExpired,
  onViewDetails,
  onRenew,
  onDelete,
  isRenewing,
  showOwnerActions = false
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isOwner = user?.id === job.user_id;
  
  const jobCreatedAt = job.created_at ? String(job.created_at) : '';
  const jobCompensation = 'salary' in job ? job.salary as string : 
                   job.compensation_details || job.compensation_type || '';

  const handleEditJob = () => {
    navigate(`/jobs/edit/${job.id}`);
  };

  const getPricingTierBadge = (tier?: string) => {
    switch (tier) {
      case 'diamond':
        return <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium">💎 Diamond</span>;
      case 'premium':
        return <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">⭐ Premium</span>;
      case 'gold':
        return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">🏆 Gold</span>;
      default:
        return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Free</span>;
    }
  };
  
  return (
    <div className={`border rounded-lg overflow-hidden bg-white ${isExpired ? 'opacity-60' : ''}`}>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{job.title}</h3>
          {getPricingTierBadge(job.pricing_tier)}
        </div>
        
        {job.company && <p className="text-gray-600 mb-2">{job.company}</p>}
        {job.location && <p className="text-gray-500 text-sm mb-2">{job.location}</p>}
        
        <JobSummary 
          employmentType={job.employment_type} 
          salaryRange={jobCompensation} 
          createdAt={jobCreatedAt} 
        />
        
        {job.description && (
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">{job.description}</p>
        )}
        
        <div className="mt-4 flex gap-2">
          <button 
            onClick={onViewDetails}
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            View Details
          </button>
          
          {isOwner && (
            <Button
              variant="outline"
              size="sm"
              className="px-3"
              onClick={handleEditJob}
              title="Edit Job"
            >
              <Edit size={16} />
            </Button>
          )}
          
          {(showOwnerActions || isOwner) && onDelete && (
            <Button
              variant="outline"
              size="sm"
              className="px-3 text-red-600 hover:text-red-700 hover:border-red-300"
              onClick={onDelete}
              title="Delete Job"
            >
              <Trash2 size={16} />
            </Button>
          )}
          
          {isExpired && onRenew && (
            <button
              onClick={onRenew}
              disabled={isRenewing}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
            >
              {isRenewing ? 'Processing...' : 'Renew'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobListingCard;
