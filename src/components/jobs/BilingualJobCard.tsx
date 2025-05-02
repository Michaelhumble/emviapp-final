
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Job } from "@/types/job";
import { MapPin, Clock, DollarSign, Briefcase, Check, Verified } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { useTranslation } from "@/hooks/useTranslation";
import { GradientBackground } from "@/components/ui/gradient-background";

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
  const { isVietnamese } = useTranslation();

  // Function to get nail salon-specific image
  const getNailSalonImage = (jobId: string): string => {
    // Use a predictable pattern based on job ID to always get the same image for the same job
    const imageNumber = parseInt(jobId.replace(/\D/g, '').slice(0, 2), 10) % 10;
    
    const nailSalonImages = [
      "/lovable-uploads/73fbb40f-3412-4ad6-9ec1-ac336a339acf.png", // Nail salon 1
      "/lovable-uploads/1f97f5e0-6b52-4ac6-925b-396bc0a1e585.png", // Nail salon 2
      "/lovable-uploads/52b943aa-d9b3-46ce-9f7f-94f3b223cb28.png", // Nail salon 3
      "/lovable-uploads/72f0f6c8-5793-4750-993d-f250b495146d.png", // Nail salon 4
      "/lovable-uploads/78b629b2-e8fc-45ba-9955-fe9d0e1266f7.png", // Nail salon 5
      "/lovable-uploads/c288ca24-3a79-470f-8bc8-c3abf5371fc1.png", // Nail salon 6
      "/lovable-uploads/9a7898e7-739c-4a79-8705-70090e25c10b.png", // Nail salon 7
      "/lovable-uploads/f7a3749b-6384-4899-a706-0aeb8685f51b.png", // Nail salon 8
      "/lovable-uploads/4e47f970-963a-483f-8356-eb64235bc2db.png", // Nail salon 9
      "/lovable-uploads/89bafcff-30b0-441e-b557-6b5a6126cbdb.png", // Nail salon 10
    ];
    
    return nailSalonImages[imageNumber];
  };

  // Format posted date
  const formatPostedDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'MM/dd/yyyy');
    } catch (error) {
      return "Recently posted";
    }
  };

  // Only show Vietnamese if available, otherwise show English
  const displayDescription = isVietnamese && job.vietnamese_description 
    ? job.vietnamese_description 
    : job.description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card 
        className={`overflow-hidden transition-all duration-200 h-full flex flex-col ${
          isHovered ? 'shadow-lg transform translate-y-[-2px]' : 'shadow-md'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image section */}
        <div className="aspect-video w-full overflow-hidden">
          <ImageWithFallback
            src={getNailSalonImage(job.id)}
            alt={job.title || "Nail Salon Job"}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02]"
            priority={true}
            businessName={job.company || "Nail Salon"}
          />
        </div>
        
        <CardContent className="p-5 flex-grow flex flex-col">
          {/* Job Header with Title & Verification */}
          <div className="mb-3">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-playfair font-medium text-lg leading-tight flex items-center gap-1">
                {job.title}
                {job.trust_indicators?.verified && (
                  <Badge variant="outline" className="ml-1 bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-0.5 py-0">
                    <Verified className="h-3 w-3" />
                  </Badge>
                )}
              </h3>
              
              {job.is_urgent && (
                <Badge className="bg-red-100 text-red-800 border-red-200">
                  Urgent
                </Badge>
              )}
            </div>
            
            <div className="mt-1">
              <p className="text-gray-700">
                {job.company}
              </p>
            </div>
          </div>
          
          {/* Job Details */}
          <div className="space-y-2 mb-3 text-sm">
            <div className="flex items-center text-gray-600">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              <span>{job.location}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <Clock className="h-3.5 w-3.5 mr-1" />
              <span>Posted {formatPostedDate(job.created_at)}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <Briefcase className="h-3.5 w-3.5 mr-1" />
              <span>{job.employment_type}</span>
            </div>
            
            {job.salary_range && (
              <div className="flex items-center font-medium text-green-700">
                <DollarSign className="h-3.5 w-3.5 mr-1" />
                <span>{job.salary_range}</span>
              </div>
            )}
          </div>
          
          {/* Special Features */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {job.weekly_pay && (
              <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200">
                Weekly Pay 💰
              </Badge>
            )}
            {job.owner_will_train && (
              <Badge className="bg-amber-50 text-amber-700 border border-amber-200">
                Owner Will Train ✨
              </Badge>
            )}
            {job.has_housing && (
              <Badge className="bg-indigo-50 text-indigo-700 border border-indigo-200">
                Housing 🏠
              </Badge>
            )}
            {job.no_supply_deduction && (
              <Badge className="bg-teal-50 text-teal-700 border border-teal-200">
                No Supply Fee ✅
              </Badge>
            )}
          </div>
          
          {/* Specialties */}
          {job.specialties && job.specialties.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1.5">
                {job.specialties.map((specialty, index) => (
                  <Badge 
                    key={index} 
                    className="bg-pink-50 text-pink-700 border border-pink-200"
                  >
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {/* Bilingual Description */}
          <div className="mb-4 flex-grow text-sm">
            <p className="text-gray-600 line-clamp-3">
              {displayDescription}
            </p>
            {job.vietnamese_description && !isVietnamese && (
              <p className="text-xs text-violet-500 mt-1">
                Bài đăng có sẵn bằng tiếng Việt / Vietnamese description available
              </p>
            )}
          </div>
          
          {/* Tip Range */}
          {job.tip_range && (
            <div className="mt-auto pt-2 mb-3 border-t border-gray-100">
              <div className="flex items-center text-sm">
                <span className="text-gray-500">Tips:</span>
                <span className="ml-1.5 font-medium text-gray-700">{job.tip_range}</span>
              </div>
            </div>
          )}
          
          {/* Actions */}
          <div className="flex gap-2 mt-3">
            <Button 
              className="flex-1 bg-violet-600 hover:bg-violet-700"
              onClick={onViewDetails}
            >
              Xem Chi Tiết
            </Button>
            
            <Button 
              variant="outline" 
              onClick={onRenew}
              disabled={isRenewing}
              className="whitespace-nowrap"
            >
              {isRenewing ? "Đang xử lý..." : "Gia Hạn"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BilingualJobCard;
