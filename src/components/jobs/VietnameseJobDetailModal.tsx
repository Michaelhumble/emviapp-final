
import React from "react";
import { useAuth } from "@/context/auth";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Job } from "@/types/job";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Phone, DollarSign } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import AuthAction from "@/components/common/AuthAction";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

interface VietnameseJobDetailModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

const VietnameseJobDetailModal: React.FC<VietnameseJobDetailModalProps> = ({ job, isOpen, onClose }) => {
  const { isSignedIn } = useAuth();
  
  if (!job) return null;
  
  // Format the date
  const getPostedDate = () => {
    try {
      const date = new Date(job.created_at);
      const distanceText = formatDistanceToNow(date, { addSuffix: true });
      return distanceText;
    } catch (error) {
      return "Mới đăng";
    }
  };
  
  // Get image based on job ID for display
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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <div>
          <div className="relative mb-4 aspect-video">
            <ImageWithFallback 
              src={getJobImage(job.id)}
              alt={job.title || "Tin tuyển dụng"}
              className="w-full h-full object-cover rounded-md"
              businessName={job.title || "Tin tuyển dụng"}
              priority={true}
            />
            {isExpired() && (
              <Badge 
                variant="outline" 
                className="absolute top-3 right-3 bg-white/80 text-red-600 border-red-200 backdrop-blur-sm"
              >
                Hết Hạn
              </Badge>
            )}
          </div>
          
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">{job.title}</h2>
              {job.company && <p className="text-gray-700 mt-1">{job.company}</p>}
            </div>
            <div>
              {job.is_featured && (
                <Badge className="bg-amber-500 text-white border-0 mr-2">
                  Nổi Bật
                </Badge>
              )}
              {job.is_urgent && (
                <Badge className="bg-red-500 text-white border-0">
                  Gấp
                </Badge>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-gray-500" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-gray-500" />
              <span>{getPostedDate()}</span>
            </div>
            {job.salary_range && (
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-gray-500" />
                <span>{job.salary_range}</span>
              </div>
            )}
          </div>
          
          {job.vietnamese_description && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Chi tiết công việc</h3>
              <div className="text-gray-700 whitespace-pre-line">
                {job.vietnamese_description}
              </div>
            </div>
          )}
          
          <div className="border-t pt-4 mt-4">
            {isExpired() ? (
              <div className="text-sm text-gray-500 italic p-3 bg-gray-50 rounded-md">
                Tin đã hết hạn. Đăng ký để xem tin mới và đăng tin dễ dàng.
              </div>
            ) : job.contact_info?.phone ? (
              isSignedIn ? (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Thông tin liên hệ</h3>
                  <div className="flex items-center mb-2">
                    <Phone className="h-5 w-5 mr-2 text-gray-500" />
                    <span className="text-lg">{job.contact_info.phone}</span>
                  </div>
                  {job.contact_info.notes && (
                    <p className="text-sm text-gray-600 mt-2">{job.contact_info.notes}</p>
                  )}
                </div>
              ) : (
                <AuthAction
                  customTitle="Đăng nhập để xem thông tin liên hệ"
                  onAction={() => true}
                  buttonClassNames="w-full"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Phone className="h-5 w-5" />
                    <span>Đăng nhập để xem thông tin liên hệ</span>
                  </div>
                </AuthAction>
              )
            ) : (
              <p className="text-gray-500 italic">Không có thông tin liên hệ.</p>
            )}
          </div>
          
          <div className="flex justify-end mt-6">
            <Button variant="outline" onClick={onClose}>
              Đóng
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VietnameseJobDetailModal;
