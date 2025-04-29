
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Job } from "@/types/job";
import { JobCardHeader } from "./card-sections/JobCardHeader";
import { JobSummary } from "./card-sections/JobSummary";
import { JobFeatures } from "./card-sections/JobFeatures";
import { JobSpecialties } from "./card-sections/JobSpecialties";
import { JobTipInfo } from "./card-sections/JobTipInfo";
import { JobExpirationInfo } from "./card-sections/JobExpirationInfo";
import { JobCardActions } from "./card-sections/JobCardActions";
import { useTranslation } from "@/hooks/useTranslation";
import { Lock, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import { isNailJob, getNailJobImage } from "@/utils/nailSalonImages";
import { isBarberJob, getBarberJobImage } from "@/utils/barberShopImages";
import { isMassageJob, getMassageJobImage } from "@/utils/massageSalonImages";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

interface JobListingCardProps {
  job: Job;
  isExpired: boolean;
  currentUserId?: string;
  onViewDetails: () => void;
  onRenew: () => void;
  isRenewing: boolean;
}

const JobListingCard = ({
  job,
  isExpired,
  currentUserId,
  onViewDetails,
  onRenew,
  isRenewing
}: JobListingCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isSignedIn } = useAuth();
  const { t, isVietnamese } = useTranslation();
  const isOwner = currentUserId === job.user_id;
  const navigate = useNavigate();

  // First check if this is a massage job (PRIORITIZE massage detection)
  const isMassage = isMassageJob(job.title || '', job.description || '');
  
  // Then check if this is a barber job
  const isBarber = !isMassage && isBarberJob(job.title || '', job.description || '');
  
  // Then check if this is a nail job
  const isNail = !isMassage && !isBarber && isNailJob(job.title || '', job.description || '');
  
  // Get the appropriate image for this job
  let jobImage = '';
  if (isMassage) {
    jobImage = getMassageJobImage(true); // Force randomization for variety
  } else if (isBarber) {
    jobImage = getBarberJobImage();
  } else if (isNail) {
    jobImage = getNailJobImage();
  }
      
  // Store the image URL in the job object for detail view consistency
  if ((isMassage || isBarber || isNail) && jobImage && !job.imageUrl) {
    job.imageUrl = jobImage;
  }

  const getContactMessage = () => {
    return isVietnamese 
      ? "🔒 Đăng ký để xem chi tiết liên hệ"
      : "🔒 Sign up to view contact details";
  };

  const handleViewDetails = () => {
    if (isOwner || isSignedIn) {
      onViewDetails();
    } else {
      navigate(`/sign-in?redirect=${encodeURIComponent(`/opportunities/${job.id}`)}`);
    }
  };

  const getCtaButton = () => {
    if (isOwner) {
      return (
        <Button 
          variant="default"
          className="w-full" 
          onClick={onViewDetails}
        >
          {isVietnamese ? "Xem Chi Tiết" : "View Full Details"}
        </Button>
      );
    }
    
    if (isSignedIn) {
      return (
        <Button 
          variant="default"
          className="w-full" 
          onClick={onViewDetails}
        >
          {isVietnamese ? "Xem Chi Tiết" : "View Full Details"}
        </Button>
      );
    }
    
    return (
      <Button 
        variant="default"
        className="w-full" 
        onClick={handleViewDetails}
      >
        <Lock className="h-4 w-4 mr-1" /> 
        {isVietnamese ? "Đăng Ký Để Xem" : "Sign Up To View"}
      </Button>
    );
  };

  return (
    <Card 
      className={`overflow-hidden transition-all duration-200 ${
        isHovered ? 'shadow-lg transform translate-y-[-2px]' : 'shadow-md'
      } h-full flex flex-col ${isExpired ? 'bg-gray-50/80' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image section - Use appropriate industry images */}
      <div className="aspect-video w-full overflow-hidden">
        {isMassage || isBarber || isNail ? (
          <ImageWithFallback
            src={job.imageUrl || jobImage}
            alt={job.title || (
              isMassage ? "Massage Therapist Job" :
              isBarber ? "Barber Job" : 
              "Nail Technician Job"
            )}
            className="w-full h-full object-cover"
            priority={true}
            fallbackImage={jobImage} // Add fallback for reliability
          />
        ) : (
          <div className="bg-gray-100 h-full w-full flex items-center justify-center">
            <Building className="h-12 w-12 text-gray-200" />
          </div>
        )}
      </div>
      
      <CardContent className="p-6 flex flex-col h-full">
        <JobCardHeader job={job} />
        
        <JobSummary 
          employmentType={job.employment_type}
          salaryRange={job.salary_range}
          createdAt={job.created_at}
        />
        
        <JobFeatures 
          weeklyPay={job.weekly_pay} 
          ownerWillTrain={job.owner_will_train}
          hasHousing={job.has_housing}
          noSupplyDeduction={job.no_supply_deduction}
        />
        
        <JobSpecialties specialties={job.specialties} />
        
        {job.vietnamese_description ? (
          <div className="mb-4 flex-grow">
            <p className="text-gray-600 line-clamp-2 mb-1">
              {isVietnamese ? job.vietnamese_description : job.description}
            </p>
            <p className="text-xs text-gray-400">
              {!isVietnamese && job.vietnamese_description ? "(Vietnamese description available)" : ""}
            </p>
          </div>
        ) : (
          <p className="text-gray-600 line-clamp-3 mb-4 flex-grow">
            {job.description}
          </p>
        )}
        
        <JobTipInfo tipRange={job.tip_range} />
        
        {!isExpired && !isSignedIn && !isOwner && (
          <div className="text-sm text-gray-500 italic mb-4">
            {getContactMessage()}
          </div>
        )}
        
        <JobExpirationInfo 
          isExpired={isExpired}
          createdAt={job.created_at}
          contactInfo={isSignedIn && !isExpired ? job.contact_info : undefined}
        />
        
        {isExpired ? (
          <JobCardActions 
            isExpired={isExpired}
            isOwner={isOwner}
            onViewDetails={onViewDetails}
            onRenew={onRenew}
            isRenewing={isRenewing}
          />
        ) : (
          <div className="mt-4">
            {getCtaButton()}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JobListingCard;
