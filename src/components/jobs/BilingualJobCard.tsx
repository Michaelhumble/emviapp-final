
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
import PremiumContactGate from '@/components/common/PremiumContactGate';

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
  
  // ENHANCED: Debug ownership logic for ALL beauty categories
  if (user && job) {
    console.log('🔍 [BILINGUAL-JOB-CARD] Ownership check:', {
      userId: user.id,
      jobUserId: job.user_id,
      isOwner,
      jobCategory: job.category,
      jobTitle: job.title,
      jobPricingTier: job.pricing_tier
    });
  }
  const isExpired = job.expires_at ? new Date(job.expires_at) < new Date() : false;
  
  // Safe image and paid job logic with null checks
  const isPaidJob = job.pricing_tier && typeof job.pricing_tier === 'string' && job.pricing_tier !== 'free';
  
  // Enhanced image detection with fallback support for ALL beauty categories
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

    // Priority 3: Check direct image_urls field (direct upload)
    if (jobAny.image_urls && Array.isArray(jobAny.image_urls)) {
      const validUrls = jobAny.image_urls.filter((url: any) => 
        url && typeof url === 'string' && url.trim() && url !== 'photos-uploaded'
      );
      if (validUrls.length > 0) return validUrls;
    }

    // Priority 4: Check photos field (direct upload)
    if (jobAny.photos && Array.isArray(jobAny.photos)) {
      const validUrls = jobAny.photos.filter((url: any) => 
        url && typeof url === 'string' && url.trim() && url !== 'photos-uploaded'
      );
      if (validUrls.length > 0) return validUrls;
    }

    // Priority 5: Single image_url fallback
    if (job.image_url && typeof job.image_url === 'string' && job.image_url.trim()) {
      return [job.image_url];
    }
    
    return [];
  };

  const jobImages = getJobImages();
  const hasImages = jobImages.length > 0;
  
  const renderJobImage = () => {
    if (hasImages) {
      // For multiple photos, show main photo + thumbnail row underneath
      if (jobImages.length > 1) {
        const additionalPhotos = jobImages.slice(1, 4); // Show up to 3 additional (total 4)
        const remainingCount = jobImages.length - 4;
        
        return (
          <div className="mb-4 -mx-6 -mt-6">
            {/* Main photo */}
            <div className="relative">
              <img
                src={jobImages[0]}
                alt={job.title || 'Job image'}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  console.error('❌ [BILINGUAL-JOB-CARD] Image failed to load:', jobImages[0]);
                  e.currentTarget.style.display = 'none';
                }}
              />
              
              {/* Photo count badge */}
              <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-md text-xs font-medium">
                📸 {jobImages.length} photos
              </div>
            </div>
            
            {/* Thumbnail row underneath */}
            <div className="px-6 py-2 bg-gray-50 flex gap-2">
              {additionalPhotos.map((imageUrl, index) => (
                <div 
                  key={index}
                  className="relative w-12 h-12 rounded border overflow-hidden bg-white shadow-sm"
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
              {remainingCount > 0 && (
                <div className="w-12 h-12 rounded border bg-gray-200 flex items-center justify-center shadow-sm">
                  <span className="text-gray-600 text-xs font-medium">+{remainingCount}</span>
                </div>
              )}
            </div>
          </div>
        );
      }
      
      // For single photo, show as before
      return (
        <div className="mb-4 -mx-6 -mt-6 relative">
          <img
            src={jobImages[0]}
            alt={job.title || 'Job image'}
            className="w-full h-48 object-cover"
            onError={(e) => {
              console.error('❌ [BILINGUAL-JOB-CARD] Image failed to load:', jobImages[0]);
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

  // UNIVERSAL: Format salary/compensation display - EXACT user input priority
  const formatCompensation = () => {
    // Priority 1: compensation_details (exact user input)
    if (job.compensation_details && typeof job.compensation_details === 'string' && job.compensation_details.trim()) {
      return job.compensation_details;
    }
    
    // Priority 2: salary_range (fallback)
    if (job.salary_range && typeof job.salary_range === 'string' && job.salary_range.trim()) {
      return job.salary_range;
    }
    
    // Priority 3: Check for any other salary field (legacy)
    const jobAny = job as any;
    if (jobAny.salary && typeof jobAny.salary === 'string' && jobAny.salary.trim()) {
      return jobAny.salary;
    }
    
    // Only show placeholder if ALL compensation fields are empty
    return 'Contact for details';
  };

  // Get pricing tier badge color and icon - FIXED: Added Gold tier support
  const getPricingTierDisplay = () => {
    const tier = job.pricing_tier?.toLowerCase() || 'free';
    switch (tier) {
      case 'diamond':
        return { 
          color: 'bg-blue-100 text-blue-800 border-blue-200', 
          icon: <Crown className="h-3 w-3" />,
          text: 'Diamond'
        };
      case 'gold':
        return { 
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
          icon: <Crown className="h-3 w-3" />,
          text: 'Gold'
        };
      case 'premium':
        return { 
          color: 'bg-purple-100 text-purple-800 border-purple-200', 
          icon: <Star className="h-3 w-3" />,
          text: 'Premium'
        };
      case 'featured':
        return { 
          color: 'bg-orange-100 text-orange-800 border-orange-200', 
          icon: <Star className="h-3 w-3" />,
          text: 'Featured'
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
      {isPaidJob && !hasImages && (
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

      {/* FIXED: Contact Info for Paid Jobs - Enhanced with metadata support */}
      {(() => {
        if (!isPaidJob) return null;

        const jobAny = job as any;
        let contactInfo = null;

        // Check metadata for contact_info (webhook processed jobs)
        if (jobAny.metadata?.contact_info && typeof jobAny.metadata.contact_info === 'object') {
          contactInfo = jobAny.metadata.contact_info;
          console.log('🔍 [BILINGUAL-JOB-CARD-DEBUG] Using metadata contact_info:', contactInfo);
        }
        // Check for direct contact_info in job object
        else if (job.contact_info && typeof job.contact_info === 'object') {
          contactInfo = job.contact_info;
          console.log('🔍 [BILINGUAL-JOB-CARD-DEBUG] Using direct contact_info:', contactInfo);
        }
        // Check for legacy contact fields
        else if (jobAny.contactPhone || jobAny.contactName || jobAny.contactEmail) {
          contactInfo = {
            phone: jobAny.contactPhone,
            owner_name: jobAny.contactName,
            email: jobAny.contactEmail,
            notes: jobAny.contactNotes
          };
          console.log('🔍 [BILINGUAL-JOB-CARD-DEBUG] Using legacy contact fields:', contactInfo);
        }

        if (!contactInfo) {
          console.log('🔍 [BILINGUAL-JOB-CARD-DEBUG] No contact info found for paid job');
          return null;
        }

        return (
          <div className="border-t border-gray-100 pt-3 mb-4">
            <PremiumContactGate
              contactName={contactInfo.owner_name}
              contactPhone={contactInfo.phone}
              contactEmail={contactInfo.email}
              className="text-sm"
            />
          </div>
        );
      })()}

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
