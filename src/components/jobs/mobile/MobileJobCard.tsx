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
  const getPricingTierDisplay = () => {
    const tier = job.pricing_tier?.toLowerCase() || 'free';
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

  // Format salary display
  const getSalary = () => {
    if (job.salary) return job.salary;
    if (job.compensation_details) return job.compensation_details;
    return 'Contact for details';
  };

  // Safe job image handling - only show fallbacks for paid jobs
  const getJobImage = () => {
    // Check for actual uploaded image first
    const uploadedImage = job.image_url || job.imageUrl || job.image;
    if (uploadedImage && uploadedImage.trim() && uploadedImage !== '') {
      return uploadedImage;
    }
    
    // Only show fallback images for paid jobs (premium, gold, diamond)
    const isPaidJob = job.pricing_tier && !['free', 'starter'].includes(job.pricing_tier.toLowerCase());
    if (!isPaidJob) {
      return null; // Free jobs get no fallback image
    }
    
    // Fallback to category-based default for paid jobs only
    const category = job.category?.toLowerCase() || '';
    if (category.includes('nail')) {
      return 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/generated(27).png';
    }
    if (category.includes('hair')) {
      return 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/hair/modern-hair-salon-1.png';
    }
    if (category.includes('barber')) {
      return 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/barber/premium-barbershop-1.png';
    }
    if (category.includes('massage')) {
      return 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/massage/luxury-spa-1.png';
    }
    if (category.includes('makeup')) {
      return 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/makeup/makeup-studio-1.png';
    }
    if (category.includes('lash') || category.includes('brow')) {
      return 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/brow-lashes/generated-11.png';
    }
    if (category.includes('tattoo')) {
      return 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/tattoo/tattoo-studio-1.png';
    }
    if (category.includes('esthetic') || category.includes('skin')) {
      return 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/facial-skincare/premium-facial-spa-1.png';
    }
    
    // Fallback for paid jobs without specific category
    return 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/generated(27).png';
  };

  const jobImage = getJobImage();
  const isPaidJob = job.pricing_tier && !['free', 'starter'].includes(job.pricing_tier.toLowerCase());

  return (
    <div className={`card-luxury bg-white rounded-2xl overflow-hidden ${isExpired ? 'opacity-75' : ''} ${expanded ? 'w-full' : 'w-full max-w-sm'}`}>
      {/* Image Section - Only show if image exists */}
      {jobImage && (
        <div className="relative">
          <img 
            src={jobImage}
            alt={job.title || job.company || 'Job image'}
            className={`w-full object-cover ${expanded ? 'h-48' : 'h-40'} ${isExpired ? 'grayscale' : ''}`}
            onError={(e) => {
              console.log('Mobile card image failed to load:', jobImage);
              e.currentTarget.style.display = 'none';
            }}
          />
          
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
      {!jobImage && !isPaidJob && (
        <div className="px-6 pt-4">
          <Badge className={`${pricingDisplay.color} ${pricingDisplay.glow} flex items-center gap-2 text-sm font-inter font-bold px-3 py-1 rounded-full w-fit`}>
            {pricingDisplay.icon}
            {pricingDisplay.text}
          </Badge>
        </div>
      )}

      {/* Content Section */}
      <div className={`p-6 ${!jobImage ? 'pt-4' : ''}`}>
        {/* Title and Company */}
        <div className="mb-4">
          <h3 className={`font-playfair font-black text-foreground mb-2 ${expanded ? 'text-xl' : 'text-lg'} line-clamp-2 leading-tight`}>
            {job.vietnamese_title || job.title || 'Untitled Job'}
          </h3>
          <p className={`font-inter font-bold text-muted-foreground ${expanded ? 'text-base' : 'text-sm'}`}>
            {job.company || 'Company Name'}
          </p>
        </div>

        {/* Job details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 mr-3 text-muted-foreground" />
            <span className="text-sm font-inter font-bold text-foreground">{job.location || 'Location TBD'}</span>
          </div>
          
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 mr-3 text-emerald-600" />
            <span className="text-sm font-inter font-black text-emerald-600">{getSalary()}</span>
          </div>
          
          {job.employment_type && (
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
              {job.vietnamese_description || job.description || 'Job description not available.'}
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