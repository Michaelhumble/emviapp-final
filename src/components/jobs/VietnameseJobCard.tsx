
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Calendar, ExternalLink, Lock } from 'lucide-react';
import { Job } from '@/types/job';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { useAuth } from '@/context/auth';

interface VietnameseJobCardProps {
  job: Job;
  onViewDetails: () => void;
}

const VietnameseJobCard = ({ job, onViewDetails }: VietnameseJobCardProps) => {
  const { isSignedIn } = useAuth();
  
  // Format the posted date for display
  const getPostedDate = () => {
    try {
      const date = new Date(job.created_at);
      return formatDistanceToNow(date, { addSuffix: true, locale: vi });
    } catch (error) {
      return "Gần đây";
    }
  };

  // Check if the job listing is expired
  const isExpired = job.status === 'expired';

  return (
    <Card className={`overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col ${isExpired ? 'opacity-75' : ''}`}>
      <div className="relative h-48">
        <ImageWithFallback
          src={job.image || ''}
          alt={job.title || 'Nail job listing'}
          className="w-full h-full object-cover"
        />
        {job.is_urgent && (
          <Badge className="absolute top-3 left-3 bg-red-500 text-white">
            URGENT
          </Badge>
        )}
        {isExpired && (
          <Badge className="absolute top-3 left-3 bg-gray-500 text-white">
            Đã hết hạn
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-lg mb-1 line-clamp-2">{job.title}</h3>
        
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{job.location}</span>
        </div>
        
        {job.compensation_details && (
          <div className="text-sm font-medium text-green-700 mb-3">
            {job.compensation_details}
          </div>
        )}
        
        {job.vietnamese_description && (
          <p className="text-sm text-gray-600 line-clamp-3 mb-3">
            {job.vietnamese_description.split('\n')[0]}
          </p>
        )}
        
        <div className="flex flex-wrap gap-1.5 mb-3">
          {job.specialties?.slice(0, 3).map((specialty, idx) => (
            <Badge key={idx} variant="outline" className="text-xs font-normal">
              {specialty}
            </Badge>
          ))}
        </div>
        
        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="text-xs text-gray-500 flex items-center">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            {getPostedDate()}
          </div>
          
          <Button 
            size="sm" 
            onClick={onViewDetails}
            className="text-xs px-2 h-8 gap-1"
          >
            Xem chi tiết
            <ExternalLink className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VietnameseJobCard;
