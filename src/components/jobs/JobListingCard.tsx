
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Briefcase, LockIcon, CheckCircle, Users, MessageSquare, Home, Shield, Coffee } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Job } from "@/types/job";

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

  const formatPostedDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return `Posted ${formatDistanceToNow(date, { addSuffix: false })} ago`;
    } catch (error) {
      return "Recently posted";
    }
  };

  const getJobTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "full-time":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "part-time":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "contract":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "internship":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  
  const specialtyBadges = job.specialties?.map((specialty, index) => (
    <Badge key={index} className="bg-pink-100 text-pink-800 border-pink-200">
      {specialty}
    </Badge>
  ));

  return (
    <Card 
      className={`overflow-hidden transition-all duration-200 ${
        isHovered ? 'shadow-lg transform translate-y-[-2px]' : 'shadow-md'
      } h-full flex flex-col ${isExpired ? 'bg-gray-50/80' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6 flex flex-col h-full">
        {/* Header with title and trust indicators */}
        <div className="mb-4 flex justify-between">
          <div>
            <h2 className="text-xl font-serif font-semibold line-clamp-2 leading-tight mb-1">
              {job.title} – {job.location}
            </h2>
            <p className="text-gray-700">{job.company}</p>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap gap-2 mt-2">
              {job.trust_indicators?.verified && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" /> Verified Salon
                </Badge>
              )}
              
              {job.trust_indicators?.activelyHiring && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
                  <Users className="h-3 w-3" /> Hiring Actively
                </Badge>
              )}
              
              {job.trust_indicators?.chatAvailable && (
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" /> Chat Available
                </Badge>
              )}
            </div>
          </div>
          
          {job.is_nationwide && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Nationwide
            </Badge>
          )}
        </div>
        
        {/* Job summary section */}
        <div className="flex flex-wrap gap-4 mb-4 text-gray-700">
          <div className="flex items-center gap-1">
            <Briefcase className="h-4 w-4 text-gray-500" />
            <Badge variant="outline" className={getJobTypeColor(job.employment_type)}>
              {job.employment_type}
            </Badge>
          </div>
          
          {job.salary_range && (
            <div className="flex items-center gap-1">
              <span className="font-medium">{job.salary_range}</span>
            </div>
          )}
          
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{formatPostedDate(job.created_at)}</span>
          </div>
        </div>
        
        {/* Special tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {job.weekly_pay && (
            <Badge className="bg-green-100 text-green-800 border-green-200">
              Weekly Pay 💰
            </Badge>
          )}
          {job.owner_will_train && (
            <Badge className="bg-amber-100 text-amber-800 border-amber-200">
              Owner Will Train ✨
            </Badge>
          )}
          {job.has_housing && (
            <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200 flex items-center gap-1">
              <Home className="h-3 w-3" /> Housing 🏠
            </Badge>
          )}
          {job.no_supply_deduction && (
            <Badge className="bg-teal-100 text-teal-800 border-teal-200 flex items-center gap-1">
              <Shield className="h-3 w-3" /> No Supply Fee ✅
            </Badge>
          )}
        </div>
        
        {/* Specialties */}
        {job.specialties && job.specialties.length > 0 && (
          <div className="mb-4">
            <div className="text-sm font-medium mb-2">Specialties:</div>
            <div className="flex flex-wrap gap-2">
              {specialtyBadges}
            </div>
          </div>
        )}
        
        {/* Job description - truncated */}
        <p className="text-gray-600 line-clamp-3 mb-4 flex-grow">
          {job.vietnamese_description || job.description}
        </p>
        
        {/* Tip range */}
        {job.tip_range && (
          <div className="mb-4 flex items-center gap-2">
            <Coffee className="h-4 w-4 text-amber-600" />
            <span className="text-sm text-amber-700 font-medium">Tips: {job.tip_range}</span>
          </div>
        )}
        
        {/* Contact info */}
        {job.contact_info?.owner_name && !isExpired && (
          <div className="mb-4 text-sm">
            <span className="font-medium">Contact: </span>
            {job.contact_info.owner_name}
            {job.contact_info?.phone && ` - ${job.contact_info.phone}`}
          </div>
        )}
        
        {/* Expired warning */}
        {isExpired && (
          <div className="mt-2 mb-4 flex flex-col gap-2">
            <Badge variant="destructive" className="flex items-center justify-center gap-1 w-fit">
              <LockIcon size={12} /> Đã hết hạn
            </Badge>
            <p className="text-xs text-gray-500">Thông tin liên hệ bị ẩn cho đến khi được gia hạn</p>
          </div>
        )}
        
        {/* Action buttons */}
        <div className="mt-auto pt-4 flex justify-between items-center">
          <Button 
            onClick={onViewDetails}
            className={`flex-grow mr-2 ${isExpired ? 'opacity-90' : ''}`}
          >
            Xem Chi Tiết
          </Button>
          
          {currentUserId === job.user_id && isExpired && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={onRenew}
              disabled={isRenewing}
              className="whitespace-nowrap"
            >
              {isRenewing ? "Đang gia hạn..." : "Gia Hạn"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default JobListingCard;
