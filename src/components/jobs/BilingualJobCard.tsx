
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Job } from "@/types/job";
import { useTranslation } from "@/hooks/useTranslation";
import { Verified, MapPin, Calendar, Lock, DollarSign, Clock } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { cn } from "@/lib/utils";
import { getNailJobImage } from "@/utils/nailSalonImages";
import { getBarberJobImage } from "@/utils/barberShopImages";
import { getMassageJobImage } from "@/utils/massageSalonImages";
import { getLashBrowJobImage } from "@/utils/lashBrowSalonImages";

interface BilingualJobCardProps {
  job: Job;
  onViewDetails: () => void;
  onRenew?: () => void;
  isRenewing?: boolean;
}

const BilingualJobCard = ({ job, onViewDetails, onRenew, isRenewing = false }: BilingualJobCardProps) => {
  const { t, isVietnamese, toggleLanguage } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const isExpired = job.status === "expired";

  // IMPORTANT: Determine appropriate job image based on category
  let jobImage = job.imageUrl || job.image || '';
  
  if (!jobImage) {
    if (job.title?.toLowerCase().includes('nail') || (job.specialties?.some(s => ['acrylic', 'gel', 'manicure', 'pedicure', 'nail art'].includes(s.toLowerCase())))) {
      jobImage = getNailJobImage();
    } 
    else if (job.title?.toLowerCase().includes('lash') || job.title?.toLowerCase().includes('brow') || 
            (job.specialties?.some(s => ['lash', 'brow', 'eyelash', 'eyebrow'].includes(s.toLowerCase())))) {
      jobImage = getLashBrowJobImage();
    }
    else if (job.title?.toLowerCase().includes('massage') || job.title?.toLowerCase().includes('spa') || 
            job.title?.toLowerCase().includes('facial') || 
            (job.specialties?.some(s => ['massage', 'facial', 'spa', 'skin'].includes(s.toLowerCase())))) {
      jobImage = getMassageJobImage();
    }
    else if (job.title?.toLowerCase().includes('hair') || job.title?.toLowerCase().includes('barber') || 
            (job.specialties?.some(s => ['hair', 'cut', 'color', 'barber'].includes(s.toLowerCase())))) {
      jobImage = getBarberJobImage();
    }
    else if (job.title?.toLowerCase().includes('tattoo') || 
            (job.specialties?.some(s => ['tattoo', 'ink'].includes(s.toLowerCase())))) {
      // Use a default image for tattoo artists
      jobImage = "https://images.unsplash.com/photo-1598128558393-70ff21bdee64?q=80&w=2089&auto=format&fit=crop";
    }
    else {
      // Default to nail salon image as fallback
      jobImage = getNailJobImage();
    }
  }

  // Format the posted date
  const getPostedDate = () => {
    try {
      if (isExpired) {
        return isVietnamese ? "Đã đăng 30 ngày trước" : "Posted 30 days ago";
      }
      
      const date = new Date(job.created_at);
      const distance = formatDistanceToNow(date, { addSuffix: false });
      return `${isVietnamese ? "Đã đăng" : "Posted"} ${distance} ${isVietnamese ? "trước" : "ago"}`;
    } catch (error) {
      return isVietnamese ? "Đã đăng gần đây" : "Recently posted";
    }
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-200 h-full flex flex-col",
        isHovered ? "shadow-lg transform translate-y-[-2px]" : "shadow-md",
        isExpired ? "bg-gray-50/80" : ""
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-video w-full overflow-hidden relative">
        <ImageWithFallback
          src={jobImage}
          alt={job.title || job.company || "Job Listing"}
          className="w-full h-full object-cover"
          fallbackImage={jobImage}
        />
        
        {job.trust_indicators?.verified && (
          <Badge className="absolute top-3 right-3 bg-blue-600 text-white">
            <Verified className="h-3 w-3 mr-1" /> Verified
          </Badge>
        )}
        
        {isExpired && (
          <div className="absolute top-3 left-3">
            <Badge variant="destructive" className="flex items-center gap-1">
              <Lock size={12} /> {isVietnamese ? "Đã hết hạn" : "Expired"}
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-5 flex flex-col h-full">
        {/* Header section with title, company, and badges */}
        <div className="mb-3">
          <h3 className="font-playfair font-semibold text-lg leading-tight truncate">
            {job.title}
          </h3>
          <p className="text-gray-600 truncate">{job.company}</p>
          <div className="flex items-center text-gray-500 text-sm mt-1">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            <span>{job.location}</span>
          </div>
        </div>

        {/* Job type and posted date */}
        <div className="flex flex-wrap gap-2 mb-3 text-sm">
          {job.employment_type && (
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              {job.employment_type}
            </Badge>
          )}
          
          <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200 flex items-center">
            <Calendar className="h-3 w-3 mr-1" /> {getPostedDate()}
          </Badge>
          
          {job.salary_range && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center">
              <DollarSign className="h-3 w-3 mr-1" /> {job.salary_range}
            </Badge>
          )}
        </div>

        {/* Feature badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          {job.weekly_pay && (
            <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
              💰 {isVietnamese ? "Trả Lương Tuần" : "Weekly Pay"}
            </Badge>
          )}
          
          {job.owner_will_train && (
            <Badge className="bg-amber-50 text-amber-700 border border-amber-200 font-medium">
              ✨ {isVietnamese ? "Có Đào Tạo" : "Owner Will Train"}
            </Badge>
          )}
          
          {job.has_housing && (
            <Badge className="bg-indigo-50 text-indigo-700 border border-indigo-200 font-medium">
              🏠 {isVietnamese ? "Có Chỗ Ở" : "Housing Available"}
            </Badge>
          )}
          
          {job.no_supply_deduction && (
            <Badge className="bg-teal-50 text-teal-700 border border-teal-200 font-medium">
              ✅ {isVietnamese ? "Không Trừ Tiền Vật Liệu" : "No Supply Fee"}
            </Badge>
          )}
        </div>
        
        {/* Specialties */}
        {job.specialties && job.specialties.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1.5">
              {job.specialties.slice(0, 4).map((specialty, index) => (
                <Badge 
                  key={index} 
                  className="bg-pink-100 text-pink-800 border-pink-200 text-xs"
                >
                  {specialty}
                </Badge>
              ))}
              {job.specialties.length > 4 && (
                <Badge className="bg-gray-100 text-gray-700 border-gray-200 text-xs">
                  +{job.specialties.length - 4}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Description */}
        <div className="mb-4 flex-grow">
          {job.vietnamese_description && job.description ? (
            <div>
              <p className="text-gray-600 line-clamp-3">
                {isVietnamese ? job.vietnamese_description : job.description}
              </p>
              <button 
                onClick={toggleLanguage} 
                className="text-xs text-purple-600 hover:text-purple-800 mt-1 flex items-center"
              >
                {isVietnamese ? "Switch to English" : "Chuyển sang tiếng Việt"} 
                <Clock className="h-3 w-3 ml-1" />
              </button>
            </div>
          ) : (
            <p className="text-gray-600 line-clamp-3">
              {job.description}
            </p>
          )}
        </div>

        {/* Tips info if available */}
        {job.tip_range && (
          <div className="mb-3 flex items-center text-sm">
            <Badge className="bg-amber-50 text-amber-700 border-amber-100">
              💸 Tips: {job.tip_range}
            </Badge>
          </div>
        )}

        {/* Contact information for expired jobs */}
        {isExpired && (
          <div className="text-sm text-gray-500 italic mb-3 flex items-center">
            <Lock className="h-3.5 w-3.5 mr-1" />
            {isVietnamese ? "Thông tin liên hệ bị ẩn cho đến khi được gia hạn" : "Contact information hidden until renewed"}
          </div>
        )}
        
        {/* Actions */}
        <div className="mt-auto pt-3 flex gap-2">
          <Button 
            className="flex-grow"
            variant={isExpired ? "outline" : "default"}
            onClick={onViewDetails}
          >
            {isVietnamese ? "Xem Chi Tiết" : "View Details"}
          </Button>
          
          {isExpired && onRenew && (
            <Button 
              variant="secondary"
              onClick={onRenew}
              disabled={isRenewing}
              className="min-w-[80px]"
            >
              {isRenewing ? 
                (isVietnamese ? "Đang xử lý..." : "Processing...") : 
                (isVietnamese ? "Gia Hạn" : "Renew")}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BilingualJobCard;
