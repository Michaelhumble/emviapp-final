
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Job } from "@/types/job";
import { formatDistanceToNow } from "date-fns";
import { Clock, MapPin, Building, Lock, CheckCircle, AlertCircle, ListRestart } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { useAuth } from "@/context/auth";
import { cn } from "@/lib/utils";
import { determineSalonCategory, getDefaultSalonImage } from "@/utils/salonImageFallbacks";
import { isNailJob, getNailJobImage } from "@/utils/nailSalonImages";
import { isBarberJob, getBarberJobImage } from "@/utils/barberShopImages";
import { isMassageJob, getMassageJobImage } from "@/utils/massageSalonImages";

interface BilingualJobCardProps {
  job: Job;
  onViewDetails: () => void;
  onRenew: () => void;
  isRenewing: boolean;
}

const BilingualJobCard = ({
  job,
  onViewDetails,
  onRenew,
  isRenewing
}: BilingualJobCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isSignedIn } = useAuth();
  const { t, isVietnamese } = useTranslation();

  // Get a job image based on the job type
  const getJobImage = () => {
    // First check if this job already has an assigned image
    if (job.imageUrl || job.image) {
      return job.imageUrl || job.image;
    }

    // Determine job type and get appropriate image
    if (isNailJob(job.title || '', job.description || '')) {
      return getNailJobImage();
    } else if (isBarberJob(job.title || '', job.description || '')) {
      return getBarberJobImage();
    } else if (isMassageJob(job.title || '', job.description || '')) {
      return getMassageJobImage();
    }

    // Fallback to a category-based image
    const category = determineSalonCategory(job.description || '', job.title || job.company || '');
    return getDefaultSalonImage(category);
  };

  // Format the posted date
  const getPostedDate = () => {
    try {
      return formatDistanceToNow(new Date(job.created_at), { addSuffix: true });
    } catch (error) {
      return "30 days ago";
    }
  };

  // Determine if a job is expired (30+ days)
  const isExpired = job.status === 'expired';
  
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-200 h-full flex flex-col",
        isHovered ? 'shadow-lg transform translate-y-[-2px]' : 'shadow-md',
        isExpired ? 'bg-gray-50/80 border-gray-200' : ''
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image section - Use appropriate industry images */}
      <div className="aspect-video w-full overflow-hidden relative">
        <ImageWithFallback
          src={getJobImage()}
          alt={job.title || job.company || "Job Listing"}
          className="w-full h-full object-cover"
          fallbackImage="/lovable-uploads/4c3f751f-3631-43c1-b95d-c6521663f366.png"
          category={job.salon_type || job.type}
        />
        
        {/* Expired badge overlay */}
        {isExpired && (
          <div className="absolute top-0 right-0 m-2">
            <Badge variant="destructive" className="px-2 py-1 font-medium flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>{isVietnamese ? "Đã Hết Hạn" : "Expired"}</span>
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-6 flex-grow flex flex-col justify-between">
        <div>
          {/* Job title */}
          <h3 className="font-medium text-xl mb-1">{job.title}</h3>
          
          {/* Company name */}
          <div className="flex items-center text-gray-600 mb-1">
            <Building className="h-4 w-4 mr-1.5 flex-shrink-0" />
            <span>{job.company}</span>
          </div>
          
          {/* Location */}
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0" />
            <span>{job.location}</span>
          </div>
          
          {/* Posted date */}
          <div className="flex items-center text-gray-500 text-sm mb-4">
            <Clock className="h-3.5 w-3.5 mr-1.5" />
            <span>{getPostedDate()}</span>
          </div>
          
          {/* Job features/benefits */}
          <div className="flex flex-wrap gap-2 mb-4">
            {job.weekly_pay && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                💸 {isVietnamese ? "Trả Lương Tuần" : "Weekly Pay"}
              </Badge>
            )}
            
            {job.owner_will_train && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                ✨ {isVietnamese ? "Đào Tạo" : "Will Train"}
              </Badge>
            )}
            
            {job.has_housing && (
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                🏠 {isVietnamese ? "Có Nhà" : "Housing"}
              </Badge>
            )}
            
            {job.no_supply_deduction && (
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                ✅ {isVietnamese ? "Không Trừ Supplies" : "No Supply Fee"}
              </Badge>
            )}
          </div>
          
          {/* Specialties */}
          {job.specialties && job.specialties.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {job.specialties.map((specialty, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-pink-50 text-pink-600 border-pink-200"
                >
                  {specialty}
                </Badge>
              ))}
            </div>
          )}

          {/* Salary/Tip range/Compensation */}
          {(job.salary_range || job.compensation_details) && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-1">
                {isVietnamese ? "Lương:" : "Compensation:"}
              </h4>
              <p className="text-green-600 font-semibold">
                {job.salary_range || job.compensation_details}
                {job.tip_range && <span className="text-gray-500 font-normal"> + {job.tip_range} tips</span>}
              </p>
            </div>
          )}
          
          {/* Description - truncated and bilingual */}
          <div className="mb-4">
            <p className="text-gray-700 line-clamp-2">
              {isVietnamese && job.vietnamese_description 
                ? job.vietnamese_description 
                : job.description}
            </p>
            
            {job.vietnamese_description && !isVietnamese && (
              <p className="text-xs text-gray-400 mt-1">
                (Vietnamese description available)
              </p>
            )}
          </div>
        </div>
        
        {/* Contact info or sign-up prompt */}
        {isExpired ? (
          <div>
            <div className="mb-4 text-sm">
              <p className="text-red-500 font-medium">
                {isVietnamese 
                  ? "Bài đăng này đã quá 30 ngày và đã hết hạn." 
                  : "This job post has expired (over 30 days old)."}
              </p>
              <p className="text-gray-500 italic">
                {isVietnamese 
                  ? "Thông tin liên lạc không còn hiển thị." 
                  : "Contact information is no longer visible."}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                className="flex-1"
                onClick={onViewDetails}
                variant="outline"
              >
                {isVietnamese ? "Xem Chi Tiết" : "View Details"}
              </Button>
              
              <Button 
                className="flex-1"
                onClick={onRenew}
                disabled={isRenewing}
              >
                {isRenewing ? (
                  <span className="flex items-center">
                    <span className="animate-spin mr-1">⏳</span>
                    {isVietnamese ? "Đang Xử Lý..." : "Processing..."}
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <ListRestart className="h-4 w-4" />
                    {isVietnamese ? "Gia Hạn" : "Renew"}
                  </span>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <Button 
            onClick={onViewDetails}
            className="w-full"
          >
            {!isSignedIn ? (
              <span className="flex items-center gap-1.5">
                <Lock className="h-4 w-4" /> 
                {isVietnamese ? "Đăng Ký Để Xem" : "Sign Up To View"}
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                {isVietnamese ? "Xem Chi Tiết" : "View Details"}
              </span>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default BilingualJobCard;
