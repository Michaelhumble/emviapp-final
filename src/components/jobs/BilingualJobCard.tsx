
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Job } from "@/types/job";
import { MapPin, Briefcase, Calendar, LockIcon } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback'; 

interface BilingualJobCardProps {
  job: Job;
  onViewDetails: () => void;
  onRenew: () => void;
  isRenewing: boolean;
  isExpired?: boolean;
}

const BilingualJobCard: React.FC<BilingualJobCardProps> = ({
  job,
  onViewDetails,
  onRenew,
  isRenewing,
  isExpired = false
}) => {
  // Format date for display
  const getPostedDate = () => {
    try {
      const date = new Date(job.created_at);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return "Recently";
    }
  };

  // Get image with fallback
  const getJobImage = () => {
    return job.image || job.imageUrl || "/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png";
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 h-full flex flex-col">
      {/* Apply semi-transparent overlay for expired jobs */}
      <div className="relative">
        {isExpired && (
          <div className="absolute inset-0 z-10 bg-gray-100/80 flex items-center justify-center">
            <div className="text-center">
              <Badge variant="destructive" className="mb-2 flex items-center justify-center gap-1">
                <LockIcon size={12} /> Đã hết hạn
              </Badge>
              <Button size="sm" onClick={onRenew} disabled={isRenewing}>
                {isRenewing ? 'Đang gia hạn...' : 'Gia hạn 30 ngày'}
              </Button>
            </div>
          </div>
        )}
        
        <div className="aspect-video w-full overflow-hidden">
          <ImageWithFallback 
            src={getJobImage()}
            alt={job.title || 'Job listing'}
            className="w-full h-full object-cover"
            businessName={job.title || 'Job'}
          />
        </div>

        <div className="absolute top-2 right-2 flex gap-1">
          {job.is_featured && !isExpired && (
            <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
              Featured
            </Badge>
          )}
        </div>
      </div>
      
      <CardContent className="p-5 flex flex-col flex-1">
        <div className="mb-2">
          <h3 className="font-semibold text-lg line-clamp-2">{job.title}</h3>
          <p className="text-gray-600 text-sm">{job.company}</p>
        </div>

        <div className="flex items-center text-gray-500 text-sm mb-1">
          <MapPin className="h-3.5 w-3.5 mr-1.5" />
          <span>{job.location}</span>
        </div>
        
        {job.employment_type && (
          <div className="flex items-center text-gray-500 text-sm mb-1">
            <Briefcase className="h-3.5 w-3.5 mr-1.5" />
            <span>{job.employment_type}</span>
          </div>
        )}
        
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <Calendar className="h-3.5 w-3.5 mr-1.5" />
          <span>{getPostedDate()}</span>
        </div>
        
        <div className="flex-grow mt-1">
          <p className={`text-sm ${isExpired ? 'text-gray-400' : 'text-gray-600'} line-clamp-3`}>
            {job.vietnamese_description || job.description}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-3">
          {(job.weekly_pay) && (
            <Badge variant="outline" className={`text-xs ${isExpired ? 'text-gray-400 border-gray-200' : ''}`}>
              Trả lương theo tuần
            </Badge>
          )}
          
          {(job.has_housing) && (
            <Badge variant="outline" className={`text-xs ${isExpired ? 'text-gray-400 border-gray-200' : ''}`}>
              Có nhà ở
            </Badge>
          )}
          
          {(job.owner_will_train) && (
            <Badge variant="outline" className={`text-xs ${isExpired ? 'text-gray-400 border-gray-200' : ''}`}>
              Có đào tạo
            </Badge>
          )}
        </div>
        
        <div className="mt-4">
          <Button 
            onClick={onViewDetails} 
            className="w-full"
            variant={isExpired ? "outline" : "default"}
            disabled={isExpired}
          >
            {isExpired ? 'Expired' : 'View Details'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BilingualJobCard;
