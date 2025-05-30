
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPinIcon, DollarSign, LockIcon, ShieldCheck } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { Job } from '@/types/job';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { useAuth } from '@/context/auth';
import AuthAction from '@/components/common/AuthAction';

interface BilingualJobCardProps {
  job: Job;
  onViewDetails: () => void;
  onRenew?: () => void;
  isRenewing?: boolean;
}

const BilingualJobCard: React.FC<BilingualJobCardProps> = ({ 
  job, 
  onViewDetails,
  onRenew,
  isRenewing = false,
}) => {
  const { isSignedIn } = useAuth();
  
  // For displaying the posted date
  const getPostedDate = () => {
    try {
      const date = new Date(job.created_at);
      const distanceText = formatDistanceToNow(date, { addSuffix: true });
      return distanceText;
    } catch (error) {
      return "Recently posted";
    }
  };
  
  // Check if job is expired (30+ days old)
  const isExpired = () => {
    return job.status === 'expired' || (() => {
      const createdDate = new Date(job.created_at);
      const now = new Date();
      const diffDays = Math.ceil(
        (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      return diffDays >= 30;
    })();
  };

  // Extract teaser from description (first 2-3 compelling details)
  const getTeaserText = () => {
    const description = job.vietnamese_description || job.description || '';
    if (!description) return null;
    
    // Take first 120 characters for teaser
    const teaser = description.length > 120 
      ? description.substring(0, 120) + '...' 
      : description;
    
    return teaser;
  };

  // Get city/state from location
  const getLocationTeaser = () => {
    if (!job.location) return 'Location available after sign-in';
    
    // Show only city and state, hide full address
    const locationParts = job.location.split(',');
    if (locationParts.length >= 2) {
      return `${locationParts[0].trim()}, ${locationParts[1].trim()}`;
    }
    return job.location;
  };

  // Get pricing tier badge styling
  const getTierBadgeStyle = () => {
    switch (job.pricingTier) {
      case 'diamond':
        return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0';
      case 'premium':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0';
      case 'gold':
        return 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-0';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Get tier display name
  const getTierName = () => {
    switch (job.pricingTier) {
      case 'diamond': return '💎 Premium';
      case 'premium': return '⭐ Featured';
      case 'gold': return '🥇 Popular';
      default: return '📝 Standard';
    }
  };

  return (
    <Card className={`overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300 ${isExpired() ? 'opacity-80' : 'hover:-translate-y-1'}`}>
      {/* Hero Image */}
      <div className="aspect-video relative">
        <ImageWithFallback
          src={job.image || ''}
          alt={job.title || 'Job opportunity'}
          className="w-full h-full object-cover"
        />
        
        {/* Tier Badge - Top Left */}
        <Badge className={`absolute top-3 left-3 font-medium ${getTierBadgeStyle()}`}>
          {getTierName()}
        </Badge>
        
        {/* Verified Badge - Top Right */}
        <Badge className="absolute top-3 right-3 bg-green-500 text-white border-0 flex items-center gap-1">
          <ShieldCheck className="h-3 w-3" />
          Verified by EmviApp
        </Badge>
        
        {/* Expired Overlay */}
        {isExpired() && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Badge variant="outline" className="border-red-200 text-red-600 bg-white">
              Opportunity Expired
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-5 flex flex-col flex-grow">
        {/* Job Title & Company */}
        <div className="mb-4">
          <h3 className="font-bold text-lg line-clamp-2 mb-1">{job.title}</h3>
          <p className="text-gray-600 font-medium">{job.company}</p>
        </div>
        
        {/* Location */}
        <div className="flex items-center text-gray-600 mb-3">
          <MapPinIcon className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="text-sm">{getLocationTeaser()}</span>
        </div>
        
        {/* Compensation (if available) */}
        {job.salary_range && (
          <div className="flex items-center text-green-600 mb-3">
            <DollarSign className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="text-sm font-medium">{job.salary_range}</span>
          </div>
        )}
        
        {/* Teaser Description */}
        {getTeaserText() && (
          <div className="mb-4">
            <p className="text-sm text-gray-700 leading-relaxed">
              {getTeaserText()}
            </p>
          </div>
        )}
        
        {/* Posted Date */}
        <div className="flex items-center text-xs text-gray-500 mb-4">
          <CalendarIcon className="h-3 w-3 mr-1" />
          <span>{getPostedDate()}</span>
        </div>
        
        {/* CTA Section */}
        <div className="mt-auto space-y-3">
          {/* Contact Gating Message */}
          {!isExpired() && (
            <div className="text-xs text-gray-500 italic flex items-center gap-2 p-3 bg-gray-50 rounded-lg border">
              <LockIcon className="h-3 w-3 flex-shrink-0" />
              <span>Full details, contact info, and location available after sign-in</span>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            {isExpired() && onRenew ? (
              <Button 
                size="sm" 
                variant="outline" 
                onClick={(e) => {
                  e.stopPropagation();
                  onRenew();
                }}
                disabled={isRenewing}
                className="text-xs"
              >
                {isRenewing ? 'Renewing...' : 'Renew Listing'}
              </Button>
            ) : (
              <span></span>
            )}
            
            {isSignedIn ? (
              <Button 
                size="sm" 
                onClick={onViewDetails}
                className="text-xs bg-blue-600 hover:bg-blue-700"
              >
                View Full Details
              </Button>
            ) : (
              <AuthAction
                customTitle="Sign in to view full details"
                onAction={() => true}
                fallbackContent={
                  <Button 
                    size="sm" 
                    onClick={onViewDetails}
                    className="text-xs bg-blue-600 hover:bg-blue-700"
                  >
                    Sign In to View Details
                  </Button>
                }
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BilingualJobCard;
