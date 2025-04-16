
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
import ImageWithFallback from "@/components/ui/ImageWithFallback";

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
  const isOwner = currentUserId === job.user_id;

  // Determine appropriate fallback image based on job type
  const getFallbackImage = () => {
    if (job.employment_type?.toLowerCase().includes('sale')) {
      return "https://images.unsplash.com/photo-1613843351058-1dd06fccdc6a?q=80&w=2070&auto=format&fit=crop";
    } else if (job.employment_type?.toLowerCase().includes('part')) {
      return "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2069&auto=format&fit=crop";
    } else if (job.specialties?.some(s => s.toLowerCase().includes('nail'))) {
      return "https://images.unsplash.com/photo-1610992015732-2449b76344bc?q=80&w=2070&auto=format&fit=crop";
    } else if (job.specialties?.some(s => s.toLowerCase().includes('hair'))) {
      return "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2070&auto=format&fit=crop";
    } else if (job.specialties?.some(s => s.toLowerCase().includes('spa'))) {
      return "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop";
    } else if (job.specialties?.some(s => s.toLowerCase().includes('barber'))) {
      return "https://images.unsplash.com/photo-1587909209111-5097ee578ec3?q=80&w=2070&auto=format&fit=crop";
    }
    return "https://images.unsplash.com/photo-1607008829749-c0f284a49841?q=80&w=2070&auto=format&fit=crop";
  };

  return (
    <Card 
      className={`overflow-hidden transition-all duration-200 ${
        isHovered ? 'shadow-lg transform translate-y-[-2px]' : 'shadow-md'
      } h-full flex flex-col ${isExpired ? 'bg-gray-50/80' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-video w-full overflow-hidden">
        <ImageWithFallback
          src={job.image}
          alt={job.title || "Job listing"}
          className="w-full h-full object-cover"
          fallbackImage={getFallbackImage()}
          businessName={job.company}
        />
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
        
        {/* Job description - truncated */}
        <p className="text-gray-600 line-clamp-3 mb-4 flex-grow">
          {job.vietnamese_description || job.description}
        </p>
        
        <JobTipInfo tipRange={job.tip_range} />
        
        <JobExpirationInfo 
          isExpired={isExpired}
          createdAt={job.created_at}
          contactInfo={!isExpired ? job.contact_info : undefined}
        />
        
        <JobCardActions 
          isExpired={isExpired}
          isOwner={isOwner}
          onViewDetails={onViewDetails}
          onRenew={onRenew}
          isRenewing={isRenewing}
        />
      </CardContent>
    </Card>
  );
};

export default JobListingCard;
