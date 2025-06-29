
import React from 'react';
import { Job } from '@/types/job';
import { JobCardHeader } from './card-sections/JobCardHeader';
import { JobCardActions } from './card-sections/JobCardActions';
import { JobSummary } from './card-sections/JobSummary';
import { MapPin, Calendar, DollarSign, Edit, Crown, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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

  // Get pricing tier badge color and icon
  const getPricingTierDisplay = () => {
    const tier = job.pricing_tier?.toLowerCase() || 'free';
    switch (tier) {
      case 'premium':
        return { 
          color: 'bg-purple-100 text-purple-800 border-purple-200', 
          icon: <Star className="h-3 w-3" />,
          text: 'Premium'
        };
      case 'diamond':
        return { 
          color: 'bg-blue-100 text-blue-800 border-blue-200', 
          icon: <Crown className="h-3 w-3" />,
          text: 'Diamond'
        };
      case 'free':
      default:
        return { 
          color: 'bg-green-100 text-green-800 border-green-200', 
          icon: null,
          text: 'Free'
        };
    }
  };

  const pricingDisplay = getPricingTierDisplay();

  return (
    <div className={`bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200 p-6 ${isExpired ? 'opacity-70' : ''}`}>
      {/* Header Section with Premium Badge */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
          <p className="text-sm text-gray-600">{job.company || 'Company Name'}</p>
        </div>
        
        {/* Pricing Tier Badge - CLEARLY VISIBLE */}
        <Badge className={`${pricingDisplay.color} flex items-center gap-1`}>
          {pricingDisplay.icon}
          {pricingDisplay.text}
        </Badge>
      </div>
      
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

      {/* Category Badge */}
      {job.category && (
        <div className="mb-3">
          <Badge variant="outline" className="text-xs">
            {job.category}
          </Badge>
        </div>
      )}

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
