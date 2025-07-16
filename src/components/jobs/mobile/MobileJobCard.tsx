import React from 'react';
import { Job } from '@/types/job';
import { MapPin, DollarSign, Clock, Star, Crown, Edit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';

interface MobileJobCardProps {
  job: Job | any; // Allow expired job type too
  onViewDetails: () => void;
  onRenew: () => void;
  isRenewing: boolean;
  isExpired?: boolean;
  expanded?: boolean;
  onEditJob?: () => void;
  showEditButton?: boolean;
}

const MobileJobCard: React.FC<MobileJobCardProps> = ({
  job,
  onViewDetails,
  onRenew,
  isRenewing,
  isExpired = false,
  expanded = false,
  onEditJob,
  showEditButton = false
}) => {
  // Add comprehensive defensive checks for job object
  if (!job || typeof job !== 'object') {
    console.warn('⚠️ [MOBILE-JOB-CARD] Invalid job object:', job);
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <p className="text-gray-500">Invalid job data</p>
      </div>
    );
  }

  // Ensure job has minimum required fields
  if (!job.id) {
    console.warn('⚠️ [MOBILE-JOB-CARD] Job missing ID:', job);
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <p className="text-gray-500">Job data missing ID</p>
      </div>
    );
  }
  const getPricingTierDisplay = () => {
    const tier = (job.pricing_tier && typeof job.pricing_tier === 'string' ? job.pricing_tier.toLowerCase() : 'free');
    switch (tier) {
      case 'premium':
        return { 
          color: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg', 
          icon: <Star className="h-4 w-4" />,
          text: 'Premium',
          glow: 'shadow-purple-500/50'
        };
      case 'diamond':
        return { 
          color: 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 shadow-lg', 
          icon: <Crown className="h-4 w-4" />,
          text: 'Diamond',
          glow: 'shadow-blue-500/50'
        };
      case 'gold':
        return { 
          color: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-lg', 
          icon: <Crown className="h-4 w-4" />,
          text: 'Gold',
          glow: 'shadow-yellow-500/50'
        };
      default:
        return { 
          color: 'bg-gradient-to-r from-emerald-500 to-green-500 text-white border-0 shadow-sm', 
          icon: null,
          text: 'Free',
          glow: ''
        };
    }
  };

  const pricingDisplay = getPricingTierDisplay();
  const { user } = useAuth();
  const isOwner = user?.id === job.user_id;
  
  // ENHANCED: Debug ownership logic for mobile view - ALL beauty categories
  if (user && job) {
    console.log('🔍 [MOBILE-JOB-CARD] Ownership check:', {
      userId: user.id,
      jobUserId: job.user_id,
      isOwner,
      jobCategory: job.category,
      jobTitle: job.title,
      showEditButton,
      onEditJob: !!onEditJob
    });
  }

  // Format salary display with null safety
  const getSalary = () => {
    if (job.compensation_details && typeof job.compensation_details === 'string') return job.compensation_details;
    if (job.salary_range && typeof job.salary_range === 'string') return job.salary_range;
    if (job.salary && typeof job.salary === 'string') return job.salary;
    return 'Contact for details';
  };

  // FIXED: Enhanced image detection for ALL beauty categories
  const getJobImages = () => {
    const jobAny = job as any;

    // Priority 1: Check metadata for photos (webhook processed jobs)
    if (jobAny.metadata?.photos && Array.isArray(jobAny.metadata.photos)) {
      const validUrls = jobAny.metadata.photos.filter((url: any) => 
        url && typeof url === 'string' && url.trim() && url !== 'photos-uploaded'
      );
      if (validUrls.length > 0) return validUrls;
    }

    // Priority 2: Check metadata for image_urls (webhook processed jobs)
    if (jobAny.metadata?.image_urls && Array.isArray(jobAny.metadata.image_urls)) {
      const validUrls = jobAny.metadata.image_urls.filter((url: any) => 
        url && typeof url === 'string' && url.trim() && url !== 'photos-uploaded'
      );
      if (validUrls.length > 0) return validUrls;
    }

    // Priority 3: Check direct image_urls field
    if (jobAny.image_urls && Array.isArray(jobAny.image_urls)) {
      const validUrls = jobAny.image_urls.filter((url: any) => 
        url && typeof url === 'string' && url.trim() && url !== 'photos-uploaded'
      );
      if (validUrls.length > 0) return validUrls;
    }

    // Priority 4: Check photos field
    if (jobAny.photos && Array.isArray(jobAny.photos)) {
      const validUrls = jobAny.photos.filter((url: any) => 
        url && typeof url === 'string' && url.trim() && url !== 'photos-uploaded'
      );
      if (validUrls.length > 0) return validUrls;
    }

    // Priority 5: Single image fallback
    if (job.image_url && typeof job.image_url === 'string' && job.image_url.trim()) {
      return [job.image_url];
    }
    
    return [];
  };

  const jobImages = getJobImages();
  const isPaidJob = job.pricing_tier && typeof job.pricing_tier === 'string' && !['free', 'starter'].includes(job.pricing_tier.toLowerCase());

  return (
    <div 
      data-job-id={job.id}
      className={`card-luxury bg-white rounded-2xl overflow-hidden ${isExpired ? 'opacity-75' : ''} ${expanded ? 'w-full' : 'w-full max-w-sm'}`}
    >
      {/* Enhanced Image Section - Support for multiple photos with thumbnails */}
      {jobImages && jobImages.length > 0 && (
        <div className="relative">
          {jobImages.length === 1 ? (
            // Single image display - Enhanced for paid jobs
            <img 
              src={jobImages[0]}
              alt={job.title || job.company || 'Job image'}
              className={`w-full object-cover ${expanded ? 'h-48' : isPaidJob ? 'h-48' : 'h-40'} ${isExpired ? 'grayscale' : ''}`}
              onError={(e) => {
                console.log('Mobile card image failed to load:', jobImages[0]);
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            // Multiple images with main photo + thumbnail row
            <div>
              {/* Main photo */}
              <div className="relative">
                <img 
                  src={jobImages[0]}
                  alt={job.title || job.company || 'Primary job image'}
                  className={`w-full object-cover ${expanded ? 'h-48' : isPaidJob ? 'h-48' : 'h-40'} ${isExpired ? 'grayscale' : ''}`}
                  onError={(e) => {
                    console.log('Mobile card primary image failed to load:', jobImages[0]);
                    e.currentTarget.style.display = 'none';
                  }}
                />
                {/* Photo count badge */}
                <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded-md text-xs font-medium">
                  📸 {jobImages.length} photos
                </div>
              </div>
              
              {/* Thumbnail row underneath */}
              <div className="px-4 py-2 bg-gray-50 flex gap-2">
                {jobImages.slice(1, 4).map((imageUrl, index) => (
                  <div 
                    key={index}
                    className="relative w-10 h-10 rounded border overflow-hidden bg-white shadow-sm"
                  >
                    <img
                      src={imageUrl}
                      alt={`Preview ${index + 2}`}
                      className="w-full h-full object-cover"
                      onError={(e) => e.currentTarget.style.display = 'none'}
                    />
                  </div>
                ))}
                
                {/* +X more thumbnail if there are more than 4 photos */}
                {jobImages.length > 4 && (
                  <div className="w-10 h-10 rounded border bg-gray-200 flex items-center justify-center shadow-sm">
                    <span className="text-gray-600 text-xs font-medium">+{jobImages.length - 4}</span>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Expired overlay */}
          {isExpired && (
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
              <div className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-inter font-bold shadow-lg">
                Position Filled
              </div>
            </div>
          )}

          {/* Premium Pricing tier badge */}
          {!isExpired && (
            <div className="absolute top-3 right-3">
              <Badge className={`${pricingDisplay.color} ${pricingDisplay.glow} flex items-center gap-2 text-sm font-inter font-bold px-3 py-1 rounded-full`}>
                {pricingDisplay.icon}
                {pricingDisplay.text}
              </Badge>
            </div>
          )}

          {/* Premium sparkle effect for paid tiers */}
          {!isExpired && isPaidJob && (
            <div className="absolute top-3 left-3 text-2xl sparkle-animation">✨</div>
          )}
        </div>
      )}
      
      {/* No Image Placeholder for Free Jobs */}
      {(!jobImages || jobImages.length === 0) && !isPaidJob && (
        <div className="px-6 pt-4">
          <Badge className={`${pricingDisplay.color} ${pricingDisplay.glow} flex items-center gap-2 text-sm font-inter font-bold px-3 py-1 rounded-full w-fit`}>
            {pricingDisplay.icon}
            {pricingDisplay.text}
          </Badge>
        </div>
      )}

      {/* Content Section */}
      <div className={`p-6 ${(!jobImages || jobImages.length === 0) ? 'pt-4' : ''}`}>
        {/* Title and Company */}
        <div className="mb-4">
          <h3 className={`font-playfair font-black text-foreground mb-2 ${expanded ? 'text-xl' : 'text-lg'} line-clamp-2 leading-tight`}>
            {(job.vietnamese_title && typeof job.vietnamese_title === 'string' ? job.vietnamese_title : '') || 
             (job.title && typeof job.title === 'string' ? job.title : '') || 'Untitled Job'}
          </h3>
          <p className={`font-inter font-bold text-muted-foreground ${expanded ? 'text-base' : 'text-sm'}`}>
            {(job.company && typeof job.company === 'string' ? job.company : '') || 'Company Name'}
          </p>
        </div>

        {/* Job details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 mr-3 text-muted-foreground" />
            <span className="text-sm font-inter font-bold text-foreground">{(job.location && typeof job.location === 'string' ? job.location : '') || 'Location TBD'}</span>
          </div>
          
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 mr-3 text-emerald-600" />
            <span className="text-sm font-inter font-black text-emerald-600">{getSalary()}</span>
          </div>
          
          {job.employment_type && typeof job.employment_type === 'string' && (
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-3 text-muted-foreground" />
              <span className="text-sm font-inter font-bold text-foreground">{job.employment_type}</span>
            </div>
          )}
        </div>

        {/* Description - only in expanded mode */}
        {expanded && (
          <div className="mb-6">
            <p className="text-base font-inter text-muted-foreground line-clamp-3 leading-relaxed">
              {(job.vietnamese_description && typeof job.vietnamese_description === 'string' ? job.vietnamese_description : '') ||
               (job.description && typeof job.description === 'string' ? job.description : '') || 
               'Job description not available.'}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-4 space-y-3">
          {isExpired ? (
            <Button 
              variant="outline" 
              size="default" 
              disabled 
              className="w-full text-sm font-inter font-bold border-2 py-3"
            >
              Position Filled
            </Button>
          ) : (
            <div className="flex gap-3">
              <Button 
                onClick={expanded ? () => {} : onViewDetails}
                size="default"
                className="btn-luxury flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm font-inter font-black py-3"
              >
                {expanded ? 'Apply Now ✨' : 'View Details'}
              </Button>
              
              {isOwner && onEditJob && (
                <Button
                  variant="outline"
                  size="default"
                  onClick={onEditJob}
                  className="px-4 border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-inter font-bold"
                  title="Edit Job"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Filled date for expired jobs */}
        {isExpired && job.filled_date && (
          <div className="mt-3 text-xs font-inter font-medium text-muted-foreground text-center">
            Filled on {new Date(job.filled_date).toLocaleDateString()}
          </div>
        )}

        {/* FOMO message for expired jobs */}
        {isExpired && (
          <div className="mt-2 text-xs font-inter font-medium text-red-600 text-center italic">
            Missed out? Check back daily for new opportunities! 🎯
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileJobCard;