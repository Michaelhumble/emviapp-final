
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Calendar, DollarSign, LockIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { Job } from '@/types/job';
import { useAuth } from '@/context/auth';
import { format } from 'date-fns';

interface VietnameseJobDetailModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

const VietnameseJobDetailModal = ({ job, isOpen, onClose }: VietnameseJobDetailModalProps) => {
  const { isSignedIn } = useAuth();
  
  if (!job) return null;

  // Format the posted date for display
  const getPostedDate = () => {
    try {
      const date = new Date(job.created_at);
      return formatDistanceToNow(date, { addSuffix: true, locale: vi });
    } catch (error) {
      return "Gần đây";
    }
  };

  // Format contact information based on job status and login status
  const renderContactInfo = () => {
    if (job.status === 'expired') {
      return (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-md my-4">
          <p className="text-gray-700">This opportunity has expired. Want to get new job leads like this? Sign up to post or find your next opportunity on EmviApp.</p>
        </div>
      );
    }
    
    if (!isSignedIn) {
      return (
        <div className="flex items-center gap-2 text-gray-500 italic my-4">
          <LockIcon size={16} />
          <span>Sign in to see contact details</span>
        </div>
      );
    }

    return (
      <div className="my-4">
        {job.contact_info?.phone && (
          <div className="flex items-center gap-2 mb-2">
            <Phone className="h-4 w-4 text-gray-500" />
            <span>{job.contact_info.phone}</span>
          </div>
        )}
        {job.contact_info?.owner_name && (
          <div className="text-sm text-gray-600">
            Liên hệ: {job.contact_info.owner_name}
          </div>
        )}
      </div>
    );
  };

  const isExpired = job.status === 'expired';

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl pr-4">{job.title}</DialogTitle>
            {isExpired && (
              <Badge variant="outline" className="border-red-200 text-red-600">
                Đã hết hạn
              </Badge>
            )}
            {job.is_urgent && !isExpired && (
              <Badge className="bg-red-500">URGENT</Badge>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative h-48 rounded-md overflow-hidden">
            <ImageWithFallback
              src={job.image || ''}
              alt={job.title || 'Nail job listing'}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{job.location}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{getPostedDate()}</span>
          </div>
          
          {job.compensation_details && (
            <div className="flex items-center text-sm font-medium text-green-700">
              <DollarSign className="h-4 w-4 mr-1" />
              <span>{job.compensation_details}</span>
            </div>
          )}

          {renderContactInfo()}
          
          {job.vietnamese_description && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Chi tiết:</h4>
              <div className="text-sm text-gray-700 whitespace-pre-line">
                {job.vietnamese_description}
              </div>
            </div>
          )}

          {job.specialties && job.specialties.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Chuyên môn:</h4>
              <div className="flex flex-wrap gap-2">
                {job.specialties.map((specialty, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="w-full">
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VietnameseJobDetailModal;
