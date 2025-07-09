import React from 'react';
import { Job } from '@/types/job';
import { MapPin, DollarSign, Clock, Star, Crown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface MobileJobCardProps {
  job: Job | any; // Allow expired job type too
  onViewDetails: () => void;
  onRenew: () => void;
  isRenewing: boolean;
  isExpired?: boolean;
  expanded?: boolean;
}

const MobileJobCard: React.FC<MobileJobCardProps> = ({
  job,
  onViewDetails,
  onRenew,
  isRenewing,
  isExpired = false,
  expanded = false
}) => {
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
      default:
        return { 
          color: 'bg-green-100 text-green-800 border-green-200', 
          icon: null,
          text: 'Free'
        };
    }
  };

  const pricingDisplay = getPricingTierDisplay();

  // Format salary display
  const getSalary = () => {
    if (job.salary) return job.salary;
    if (job.compensation_details) return job.compensation_details;
    return 'Contact for details';
  };

  // Get job image - use correct bucket based on category
  const getJobImage = () => {
    if (job.image) return job.image;
    
    // Fallback to category-based default
    const category = job.category?.toLowerCase() || '';
    if (category.includes('nail')) {
      return 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//generated%20(003).png';
    }
    if (category.includes('hair')) {
      return 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/hair//generated%20(1).png';
    }
    if (category.includes('barber')) {
      return 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/barber//generated%20(1).png';
    }
    if (category.includes('massage')) {
      return 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/massage//generated%20(1).png';
    }
    if (category.includes('makeup')) {
      return 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/makeup//generated-45.png';
    }
    if (category.includes('lash') || category.includes('brow')) {
      return 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/brow-lashes//generated-11.png';
    }
    if (category.includes('tattoo')) {
      return 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/tattoo//generated%20(1).png';
    }
    if (category.includes('esthetic') || category.includes('skin')) {
      return 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/facial-skincare//generated%20(1).png';
    }
    
    return '/placeholder-salon.jpg'; // Final fallback
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${isExpired ? 'opacity-75' : ''} ${expanded ? 'w-full' : 'w-64'}`}>
      {/* Image Section */}
      <div className="relative">
        <img 
          src={getJobImage()}
          alt={job.title || job.company}
          className={`w-full object-cover ${expanded ? 'h-48' : 'h-36'} ${isExpired ? 'grayscale' : ''}`}
          onError={(e) => {
            e.currentTarget.src = '/placeholder-salon.jpg';
          }}
        />
        
        {/* Expired overlay */}
        {isExpired && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
              Position Filled
            </div>
          </div>
        )}

        {/* Pricing tier badge */}
        {!isExpired && (
          <div className="absolute top-2 right-2">
            <Badge className={`${pricingDisplay.color} flex items-center gap-1 text-xs`}>
              {pricingDisplay.icon}
              {pricingDisplay.text}
            </Badge>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title and Company */}
        <div className="mb-3">
          <h3 className={`font-bold text-gray-900 mb-1 ${expanded ? 'text-lg' : 'text-sm'} line-clamp-2`}>
            {job.vietnamese_title || job.title || 'Untitled Job'}
          </h3>
          <p className={`font-medium text-gray-800 ${expanded ? 'text-base' : 'text-xs'}`}>
            {job.company || 'Company Name'}
          </p>
        </div>

        {/* Job details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center">
            <MapPin className="h-3 w-3 mr-1 text-gray-600" />
            <span className="text-xs font-medium text-gray-800">{job.location || 'Location TBD'}</span>
          </div>
          
          <div className="flex items-center">
            <DollarSign className="h-3 w-3 mr-1 text-green-600" />
            <span className="text-xs font-bold text-green-600">{getSalary()}</span>
          </div>
          
          {job.employment_type && (
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1 text-gray-600" />
              <span className="text-xs font-medium text-gray-800">{job.employment_type}</span>
            </div>
          )}
        </div>

        {/* Description - only in expanded mode */}
        {expanded && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-800 line-clamp-3">
              {job.vietnamese_description || job.description || 'Job description not available.'}
            </p>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          {isExpired ? (
            <Button 
              variant="outline" 
              size="sm" 
              disabled 
              className="w-full text-xs"
            >
              Position Filled
            </Button>
          ) : (
            <Button 
              onClick={expanded ? () => {} : onViewDetails}
              size="sm"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs"
            >
              {expanded ? 'Apply Now' : 'View Details'}
            </Button>
          )}
        </div>

        {/* Filled date for expired jobs */}
        {isExpired && job.filled_date && (
          <div className="mt-2 text-xs font-medium text-gray-700 text-center">
            Filled on {new Date(job.filled_date).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileJobCard;