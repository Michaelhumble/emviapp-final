
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
  
  // Add comprehensive defensive checks for job object
  if (!job || typeof job !== 'object') {
    console.warn('⚠️ [BILINGUAL-JOB-CARD] Invalid job object:', job);
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <p className="text-gray-500">Invalid job data</p>
      </div>
    );
  }

  // Ensure job has minimum required fields
  if (!job.id) {
    console.warn('⚠️ [BILINGUAL-JOB-CARD] Job missing ID:', job);
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <p className="text-gray-500">Job data missing ID</p>
      </div>
    );
  }
  
  const isOwner = user?.id === job.user_id;
  const isExpired = job.expires_at ? new Date(job.expires_at) < new Date() : false;
  
  // Safe image and paid job logic with null checks
  const isPaidJob = job.pricing_tier && typeof job.pricing_tier === 'string' && job.pricing_tier !== 'free';
  const imageUrl = job.image_url || job.imageUrl || job.image || null;
  const hasImage = !!(imageUrl && typeof imageUrl === 'string' && imageUrl.trim() && imageUrl !== '');
  
  const renderJobImage = () => {
    if (hasImage && imageUrl) {
      return (
        <div className="mb-4 -mx-6 -mt-6">
          <img
            src={imageUrl}
            alt={job.title || 'Job image'}
            className="w-full h-48 object-cover"
            onError={(e) => {
              console.log('Image failed to load:', imageUrl);
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      );
    }
    
    // Show placeholder for paid jobs without images
    if (isPaidJob) {
      return (
        <div className="mb-4 -mx-6 -mt-6 h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-400 mb-2">📸</div>
            <p className="text-xs text-gray-500">Premium listing</p>
            <p className="text-xs text-gray-400">Contact for photos</p>
          </div>
        </div>
      );
    }
    
    // For free jobs without images, return null (no image section)
    return null;
  };

  const handleEditJob = () => {
    navigate(`/jobs/edit/${job.id}`);
  };

  // Format salary/compensation display with null safety and Vietnamese formatting for nail jobs
  const formatCompensation = () => {
    let compensation = '';
    
    if (job.compensation_details && typeof job.compensation_details === 'string') {
      compensation = job.compensation_details;
    } else if (job.employment_type && typeof job.employment_type === 'string') {
      compensation = job.employment_type;
    } else {
      compensation = 'Contact for details';
    }
    
    // For nail jobs, format salary with /tuần if not already present
    const isNailJob = job.category?.toLowerCase().includes('nail') || 
                      job.title?.toLowerCase().includes('nail');
    
    if (isNailJob && compensation !== 'Contact for details') {
      // If it already has /tuần, return as is
      if (compensation.includes('/tuần')) return compensation;
      
      // If it looks like a salary range ($X-$Y), add /tuần
      if (compensation.match(/\$[\d,]+-?\$?[\d,]*/) || compensation.match(/\$[\d,]+/)) {
        return `${compensation}/tuần`;
      }
    }
    
    return compensation;
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
          {/* For nail jobs, show Vietnamese title first if available */}
          {(() => {
            const isNailJob = job.category?.toLowerCase().includes('nail') || 
                              job.title?.toLowerCase().includes('nail');
            
            if (isNailJob && job.vietnamese_title) {
              return (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.vietnamese_title}</h3>
                  {job.title && job.title !== job.vietnamese_title && (
                    <p className="text-sm text-gray-500 mb-1">{job.title}</p>
                  )}
                </div>
              );
            } else {
              return (
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title || 'Untitled Job'}</h3>
              );
            }
          })()}
          <p className="text-sm text-gray-600">{job.company || job.title || 'Company Name'}</p>
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
          <span>{job.created_at ? new Date(job.created_at).toLocaleDateString() : 'Recently posted'}</span>
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

      {/* Job Image - Required for paid posts, optional for free */}
      {renderJobImage()}

      {/* FOMO message for paid jobs without images */}
      {isPaidJob && !hasImage && (
        <div className="mb-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-3">
          <p className="text-xs text-amber-700 font-medium text-center">
            ⚠️ Premium listing missing photos - Contact salon directly for visual details
          </p>
        </div>
      )}

      {/* Description Preview - Show Vietnamese content for nail jobs */}
      {(job.vietnamese_description || job.description) && (
        <div className="text-gray-600 text-sm line-clamp-2 mb-4">
          {/* Check if this is a nail-related job and prioritize Vietnamese content */}
          {(job.category?.toLowerCase().includes('nail') || 
            job.title?.toLowerCase().includes('nail')) && job.vietnamese_description ? (
            <div>
              <p className="mb-1 text-gray-800">{job.vietnamese_description}</p>
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

      {/* Requirements Preview */}
      {job.requirements && (
        <p className="text-gray-500 text-xs mb-4 line-clamp-1">
          Requirements: {job.requirements}
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
