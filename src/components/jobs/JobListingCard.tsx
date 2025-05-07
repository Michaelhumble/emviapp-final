
import React from 'react';
import BilingualJobCard from './BilingualJobCard';
import { Job } from '@/types/job';

interface JobListingCardProps {
  job: Job;
  isExpired: boolean;
  currentUserId?: string;
  onViewDetails: () => void;
  onRenew?: () => void;
  isRenewing?: boolean;
}

const JobListingCard: React.FC<JobListingCardProps> = ({ 
  job, 
  isExpired,
  currentUserId,
  onViewDetails,
  onRenew,
  isRenewing
}) => {
  // Check if listing is the premium featured Magic Nails
  const isPremiumFeatured = job.id === 'vn-job-premium';
  
  // Check if job has Vietnamese description
  const isVietnameseListing = !!job.vietnamese_description;
  
  // Return bilingual card for Vietnamese listings
  if (isVietnameseListing) {
    return (
      <BilingualJobCard
        job={job}
        onViewDetails={onViewDetails}
        onRenew={isExpired ? onRenew : undefined}
        isRenewing={isRenewing}
      />
    );
  }
  
  // For English listings, we'd have a different component here
  // For now, just render the bilingual card for all listings
  return (
    <BilingualJobCard
      job={job}
      onViewDetails={onViewDetails}
      onRenew={isExpired ? onRenew : undefined}
      isRenewing={isRenewing}
    />
  );
};

export default JobListingCard;
