
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Job } from '@/types/job';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { LockIcon } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import JobCardHeader from './card-sections/JobCardHeader';
import { JobExpirationInfo } from './card-sections/JobExpirationInfo';
import { JobFeatures } from './card-sections/JobFeatures';
import { JobSpecialties } from './card-sections/JobSpecialties';
import { JobTipInfo } from './card-sections/JobTipInfo';
import { JobSummary } from './card-sections/JobSummary';
import { JobCardActions } from './card-sections/JobCardActions';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { formatDistanceToNow } from 'date-fns';

// Helper functions for job types
const isNail = (job: Job) => job.title?.toLowerCase().includes('nail') || 
                           job.specialties?.some(spec => spec.toLowerCase().includes('nail'));

const isLashBrow = (job: Job) => job.title?.toLowerCase().includes('lash') || 
                               job.title?.toLowerCase().includes('brow') ||
                               job.specialties?.some(spec => spec.toLowerCase().includes('lash') || spec.toLowerCase().includes('brow'));

const isMassage = (job: Job) => job.title?.toLowerCase().includes('massage') || 
                              job.specialties?.some(spec => spec.toLowerCase().includes('massage'));

const isBarber = (job: Job) => job.title?.toLowerCase().includes('barber') || 
                             job.specialties?.some(spec => spec.toLowerCase().includes('barber'));

// Image helper functions
const NAIL_SALON_IMAGES = [
  '/lovable-uploads/nail-salon-1.jpg',
  '/lovable-uploads/nail-salon-2.jpg',
  '/lovable-uploads/nail-salon-3.jpg',
];

const getRandomNailImage = () => {
  return NAIL_SALON_IMAGES[Math.floor(Math.random() * NAIL_SALON_IMAGES.length)];
};

const getLashBrowJobImage = () => '/lovable-uploads/lash-brow-salon.jpg';
const getMassageJobImage = () => '/lovable-uploads/massage-salon.jpg';
const getBarberJobImage = () => '/lovable-uploads/barber-salon.jpg';

const determineSalonCategory = (job: Job) => {
  if (isNail(job)) return 'nail';
  if (isLashBrow(job)) return 'lash-brow';
  if (isMassage(job)) return 'massage';
  if (isBarber(job)) return 'barber';
  return 'general';
};

const getDefaultSalonImage = (job: Job) => {
  if (isNail(job)) return getRandomNailImage();
  if (isLashBrow(job)) return getLashBrowJobImage();
  if (isMassage(job)) return getMassageJobImage();
  if (isBarber(job)) return getBarberJobImage();
  return '/lovable-uploads/default-salon.jpg';
};

interface JobListingCardProps {
  job: Job;
  isExpired: boolean;
  currentUserId?: string;
  onViewDetails: () => void;
  onRenew: () => void;
  isRenewing: boolean;
}

const JobListingCard: React.FC<JobListingCardProps> = ({ 
  job, 
  isExpired, 
  currentUserId,
  onViewDetails,
  onRenew,
  isRenewing
}) => {
  const { t, language } = useTranslation();
  const isVietnamese = language === 'vietnamese';
  const isOwner = currentUserId === job.user_id;
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  
  const handleViewDetails = () => {
    if (isSignedIn || !isExpired) {
      onViewDetails();
    } else {
      navigate('/login', { state: { from: window.location.pathname, message: "Sign in to view expired listings" } });
    }
  };
  
  const handleApply = () => {
    if (isSignedIn) {
      onViewDetails();
    } else {
      navigate('/login', { state: { from: window.location.pathname } });
    }
  };
  
  const handleRenew = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRenew();
  };
  
  const getPrimaryAction = () => {
    if (isExpired) {
      if (isOwner) {
        return (
          <Button 
            onClick={handleRenew}
            disabled={isRenewing}
            className="w-full"
          >
            {isRenewing ? "Renewing..." : "Renew Listing"}
          </Button>
        );
      } else {
        return (
          <Button 
            onClick={handleViewDetails}
            variant="secondary"
            className="w-full"
          >
            View Expired Listing
          </Button>
        );
      }
    }
    
    if (!isSignedIn) {
      return (
        <Button onClick={handleApply} className="w-full">
          Sign In to View
        </Button>
      );
    }
    
    return (
      <Button onClick={handleViewDetails} className="w-full">
        View Details
      </Button>
    );
  };

  return (
    <Card 
      className={`overflow-hidden transition-all duration-200 h-full flex flex-col ${
        isExpired ? 'opacity-80 bg-gray-50' : 'hover:shadow-md'
      }`}
    >
      <div className="aspect-video relative overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={job.imageUrl || job.image || getDefaultSalonImage(job)}
          alt={job.title}
          className="w-full h-full object-cover"
          businessName={job.title}
          category={job.salon_type}
        />
        
        {job.pricingTier && job.pricingTier !== 'free' && (
          <div className="absolute top-2 right-2">
            <div className={`
              px-2 py-1 rounded text-xs text-white font-medium
              ${job.pricingTier === 'premium' ? 'bg-purple-500' : ''}
              ${job.pricingTier === 'gold' ? 'bg-amber-500' : ''}
              ${job.pricingTier === 'diamond' ? 'bg-blue-600' : ''}
              ${job.pricingTier === 'starter' ? 'bg-green-500' : ''}
            `}>
              {job.pricingTier.charAt(0).toUpperCase() + job.pricingTier.slice(1)}
            </div>
          </div>
        )}
      </div>
      
      <CardContent className="flex-grow flex flex-col p-4">
        <JobCardHeader job={job} />
        
        <JobSummary 
          employmentType={job.employment_type || 'Full-time'}
          salaryRange={job.salary_range || job.compensation || job.price}
          createdAt={job.created_at}
          jobSummary={isVietnamese ? job.vietnamese_description : job.description}
          phoneNumber={isSignedIn ? job.contact_info?.phone : undefined}
          contactEmail={isSignedIn ? job.contact_info?.email : undefined}
        />
        
        <JobFeatures 
          weeklyPay={Boolean(job.weekly_pay)} 
          ownerWillTrain={Boolean(job.owner_will_train)} 
          hasHousing={Boolean(job.has_housing)}
          noSupplyDeduction={Boolean(job.no_supply_deduction)} 
        />
        
        <JobSpecialties 
          specialties={job.specialties} 
        />

        {/* Only show for Vietnamese language or when we have a tip range */}
        {isVietnamese && job.tip_range && (
          <JobTipInfo 
            tipRange={job.tip_range}
          />
        )}
        
        <JobExpirationInfo
          isExpired={isExpired}
          createdAt={job.created_at}
          contactInfo={job.contact_info}
          pricingTier={job.pricingTier}
        />
                
        <div className="mt-auto pt-4">
          <JobCardActions
            isExpired={isExpired}
            isOwner={isOwner}
            onViewDetails={handleViewDetails}
            onRenew={handleRenew}
            isRenewing={isRenewing}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default JobListingCard;
