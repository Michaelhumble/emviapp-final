
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPinIcon, Phone, LockIcon } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { Job } from '@/types/job';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { useAuth } from '@/context/auth';
import AuthAction from '@/components/common/AuthAction';

interface VietnameseJobCardProps {
  job: Job;
  onViewDetails: () => void;
  onRenew?: () => void;
  isRenewing?: boolean;
}

const VietnameseJobCard: React.FC<VietnameseJobCardProps> = ({ 
  job, 
  onViewDetails,
  onRenew,
  isRenewing = false,
}) => {
  const { isSignedIn } = useAuth();
  
  // For displaying the posted date
  const getPostedDate = () => {
    try {
      const date = new Date(job.created_at);
      const distanceText = formatDistanceToNow(date, { addSuffix: true });
      return distanceText;
    } catch (error) {
      return "Mới đăng";
    }
  };
  
  // Check if job is expired (30+ days old)
  const isExpired = () => {
    return job.status === 'expired' || (() => {
      const createdDate = new Date(job.created_at);
      const now = new Date();
      const diffDays = Math.ceil(
        (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      return diffDays >= 30;
    })();
  };
  
  // Get image based on job ID for consistent display
  const getJobImage = (jobId: string) => {
    const imageMap: Record<string, string> = {
      '1': '/lovable-uploads/5f0aa367-9d6b-448b-83d8-021e4cb082af.png',
      '2': '/lovable-uploads/16e16a16-df62-4741-aec7-3364fdc958ca.png',
      '3': '/lovable-uploads/4edfaa59-6542-4bad-9e6b-1cd0d7ae9113.png',
      '4': '/lovable-uploads/89bafcff-30b0-441e-b557-6b5a6126cbdb.png',
      '5': '/lovable-uploads/90e01456-efd5-4523-8034-5c1d321949be.png',
      '101': '/lovable-uploads/55fac081-9f6d-4220-a212-94ee2720bde9.png',
      '102': '/lovable-uploads/4c4050d4-4a79-4610-8d47-bf6cc92bf8a3.png',
      '103': '/lovable-uploads/1f3cfd40-4041-4545-b71e-5a7f484f86e9.png',
      'featured': '/lovable-uploads/5a1ba245-85f7-4036-95f9-0e08ada34602.png',
    };
    
    return imageMap[jobId] || '/lovable-uploads/89ef4a43-b461-47fc-8b2d-97b07318a891.png';
  };

  return (
    <Card className={`overflow-hidden h-full flex flex-col ${isExpired() ? 'opacity-80' : ''}`}>
      <div className="aspect-video relative">
        <ImageWithFallback
          src={getJobImage(job.id)}
          alt={job.title || 'Tin tuyển dụng'}
          className="w-full h-full object-cover"
          businessName={job.title || 'Tin tuyển dụng'}
          priority={true}
        />
        {job.is_featured && (
          <Badge className="absolute top-2 left-2 bg-amber-500 text-white border-0">
            Nổi Bật
          </Badge>
        )}
        {job.is_urgent && (
          <Badge className="absolute top-2 right-2 bg-red-500 text-white border-0">
            Gấp
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4 flex flex-col flex-grow">
        <div className="mb-3">
          <h3 className="font-bold text-lg line-clamp-2">{job.title}</h3>
          
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <MapPinIcon className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
            <span className="truncate">{job.location}</span>
          </div>
        </div>
        
        {job.vietnamese_description && (
          <p className="text-sm text-gray-600 line-clamp-3 mb-3">
            {job.vietnamese_description}
          </p>
        )}
        
        <div className="mt-auto space-y-3">
          <div className="flex items-center text-xs text-gray-500">
            <CalendarIcon className="h-3 w-3 mr-1 flex-shrink-0" />
            <span>{getPostedDate()}</span>
            {isExpired() && (
              <Badge variant="outline" className="ml-2 text-xs border-red-200 text-red-600">
                Hết Hạn
              </Badge>
            )}
          </div>
          
          {job.contact_info?.phone && (
            <div className="border-t border-gray-100 pt-3">
              {isExpired() ? (
                <div className="text-xs text-gray-500 italic flex items-center gap-1 p-2 bg-gray-50 rounded-md">
                  <LockIcon className="h-3 w-3 flex-shrink-0" />
                  <span>Tin đã hết hạn. Đăng ký để xem tin mới và đăng tin dễ dàng.</span>
                </div>
              ) : isSignedIn ? (
                <div className="flex items-center">
                  <Phone className="h-3.5 w-3.5 mr-1 text-gray-500 flex-shrink-0" />
                  <span className="text-sm">{job.contact_info.phone}</span>
                </div>
              ) : (
                <AuthAction
                  customTitle="Đăng nhập để xem thông tin liên hệ"
                  onAction={() => true}
                  fallbackContent={
                    <div className="text-xs text-gray-500 italic flex items-center gap-1">
                      <LockIcon className="h-3 w-3 flex-shrink-0" />
                      <span>Đăng nhập để xem thông tin liên hệ</span>
                    </div>
                  }
                />
              )}
            </div>
          )}
          
          <div className="flex items-center justify-between pt-2">
            {isExpired() && onRenew ? (
              <Button 
                size="sm" 
                variant="outline" 
                onClick={(e) => {
                  e.stopPropagation();
                  onRenew();
                }}
                disabled={isRenewing}
                className="text-xs min-h-[32px]"
              >
                {isRenewing ? 'Đang gia hạn...' : 'Gia Hạn'}
              </Button>
            ) : (
              <span></span>
            )}
            
            <Button 
              size="sm" 
              onClick={onViewDetails}
              className="text-xs min-h-[32px]"
            >
              Xem Chi Tiết
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VietnameseJobCard;
