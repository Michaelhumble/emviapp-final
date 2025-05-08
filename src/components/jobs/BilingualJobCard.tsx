
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPinIcon, Phone, LockIcon } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { Job } from '@/types/job';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { useAuth } from '@/context/auth';
import AuthAction from '@/components/common/AuthAction';
import { JobCardActions } from './card-sections/JobCardActions';

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

  // Check if this is a free or starter tier listing to show contact info without login
  const isFreeOrStarterListing = job.pricingTier === 'free' || job.pricingTier === 'starter';

  return (
    <Card className={`overflow-hidden h-full flex flex-col ${isExpired() ? 'opacity-80' : ''}`}>
      <div className="aspect-video relative">
        <ImageWithFallback
          src={job.image || ''}
          alt={job.title || 'Job listing'}
          className="w-full h-full object-cover"
        />
        {job.is_featured && (
          <Badge className="absolute top-2 left-2 bg-amber-500 text-white border-0">
            Featured
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4 flex flex-col flex-grow">
        <div className="mb-3">
          <h3 className="font-bold text-lg line-clamp-2">{job.title}</h3>
          
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <MapPinIcon className="h-3.5 w-3.5 mr-1" />
            <span className="truncate">{job.location}</span>
          </div>
        </div>
        
        {(job.vietnamese_description || job.description) && (
          <p className="text-sm text-gray-600 line-clamp-3 mb-3">
            {job.vietnamese_description || job.description}
          </p>
        )}
        
        <div className="mt-auto space-y-3">
          <div className="flex items-center text-xs text-gray-500">
            <CalendarIcon className="h-3 w-3 mr-1" />
            <span>{getPostedDate()}</span>
            {isExpired() && (
              <Badge variant="outline" className="ml-2 text-xs border-red-200 text-red-600">
                Expired
              </Badge>
            )}
          </div>
          
          {job.contact_info?.phone && (
            <div className="border-t border-gray-100 pt-3">
              {isExpired() ? (
                <div className="text-xs text-gray-500 italic flex items-center gap-1 p-2 bg-gray-50 rounded-md">
                  <LockIcon className="h-3 w-3" />
                  <span>This opportunity has expired. Want to get new job leads like this? Sign up to post or find your next opportunity on EmviApp.</span>
                </div>
              ) : isSignedIn || isFreeOrStarterListing ? (
                <div className="flex items-center">
                  <Phone className="h-3.5 w-3.5 mr-1 text-gray-500" />
                  <span className="text-sm">{job.contact_info.phone}</span>
                </div>
              ) : (
                <AuthAction
                  customTitle="Sign in to see contact details"
                  onAction={() => true}
                  fallbackContent={
                    <div className="text-xs text-gray-500 italic flex items-center gap-1">
                      <LockIcon className="h-3 w-3" />
                      <span>Sign in to see contact details</span>
                    </div>
                  }
                />
              )}
            </div>
          )}
          
          <JobCardActions
            isExpired={isExpired()}
            isOwner={false}
            onViewDetails={onViewDetails}
            onRenew={onRenew || (() => {})}
            isRenewing={isRenewing}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BilingualJobCard;
