
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

  const isPaidJob = job.pricing_tier && job.pricing_tier !== 'free';
  
  const getPricingTierBadge = (tier?: string) => {
    switch (tier) {
      case 'diamond':
        return <span className="bg-gradient-to-r from-purple-200 to-purple-300 text-purple-900 text-xs px-3 py-1.5 rounded-full font-bold shadow-md border border-purple-400">💎 Featured Diamond</span>;
      case 'premium':
        return <span className="bg-gradient-to-r from-blue-200 to-blue-300 text-blue-900 text-xs px-3 py-1.5 rounded-full font-bold shadow-md border border-blue-400">⭐ Featured Premium</span>;
      case 'gold':
        return <span className="bg-gradient-to-r from-yellow-200 to-yellow-300 text-yellow-900 text-xs px-3 py-1.5 rounded-full font-bold shadow-md border border-yellow-400">🏆 Featured Gold</span>;
      default:
        return <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full font-medium border border-gray-300">Free</span>;
    }
  };
  
  return (
    <div className={`border rounded-lg overflow-hidden bg-white ${isExpired ? 'opacity-60' : ''} ${
      isPaidJob ? 'border-blue-200 shadow-lg ring-1 ring-blue-100' : 'border-gray-200'
    }`}>
      <div className={`p-4 ${isPaidJob ? 'bg-gradient-to-br from-blue-50/30 to-purple-50/30' : ''}`}>
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
        
        {/* Job Image - Only show for paid jobs */}
        {isPaidJob && job.image && (
          <div className="mt-3 mb-3">
            <img
              src={job.image}
              alt={job.title}
              className="w-full h-32 object-cover rounded-lg shadow-sm border border-gray-200"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}
        
        {/* Placeholder for free jobs - subtle visual hint */}
        {!isPaidJob && (
          <div className="mt-3 mb-3 h-24 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-400">
              <p className="text-xs font-medium">📸 Photo available with</p>
              <p className="text-xs font-medium">Featured listings</p>
            </div>
          </div>
        )}
        
        {/* Description with Vietnamese support */}
        {(job.vietnamese_description || job.description) && (
          <div className="text-gray-600 text-sm mt-2 line-clamp-2">
            {job.category === 'Nail Tech' && job.vietnamese_description ? (
              <div>
                <p className="mb-1">{job.vietnamese_description}</p>
                {job.description && (
                  <p className="text-gray-500 text-xs">{job.description}</p>
                )}
              </div>
            ) : (
              <div>
                {job.description && <p className="mb-1">{job.description}</p>}
                {job.vietnamese_description && (
                  <p className="text-gray-500 text-xs">{job.vietnamese_description}</p>
                )}
              </div>
            )}
          </div>
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
