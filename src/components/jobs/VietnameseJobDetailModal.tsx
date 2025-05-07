
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Calendar, Lock } from "lucide-react";
import { Job } from "@/types/job";
import { useAuth } from "@/context/auth";
import { formatDistanceToNow } from "date-fns";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

interface VietnameseJobDetailModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

const VietnameseJobDetailModal = ({ job, isOpen, onClose }: VietnameseJobDetailModalProps) => {
  const { user } = useAuth();
  
  if (!job) return null;

  // Format the posted date
  const formatPostedDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return "Recently";
    }
  };

  const isPinned = job.isPinned === true;
  const isMagicNails = job.title?.includes('Magic Nails') || job.company?.includes('Magic Nails');
  const isExpired = job.status === 'expired';
  
  // Get a specific image for Magic Nails
  const magicNailsImage = isMagicNails ? 
    "/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png" : 
    job.image;
  
  // Get a nail salon image from our collection if the job doesn't have one
  const jobImage = job.image || 
    isMagicNails ? 
      "/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png" : 
      "/lovable-uploads/fa1b4f95-ebc9-452c-a18b-9d4e78db84bb.png";
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={`sm:max-w-[600px] max-h-[85vh] overflow-y-auto rounded-2xl border-0 shadow-xl
                   ${isPinned && isMagicNails ? 'bg-[#FAF3E0]' : 'bg-white'}`}
      >
        <DialogHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-xl font-semibold font-playfair">{job.title}</DialogTitle>
              {isPinned && isMagicNails && (
                <p className="text-emerald-700 text-sm mt-1 italic">
                  ✨ Featured by EmviApp. Our most loved salon this month.
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {isPinned && isMagicNails && (
                <Badge className="bg-[#FFD700] text-black px-3 py-1 rounded-full text-xs shadow-md hover:animate-pulse">
                  🏆 EmviApp Premium Showcase
                </Badge>
              )}
              
              {isExpired && (
                <Badge className="bg-red-100 text-red-800 font-medium">
                  Đã hết hạn
                </Badge>
              )}
              
              {isPinned && !isMagicNails && !isExpired && (
                <Badge className="bg-amber-100 text-amber-800 font-medium">
                  Tin Gấp
                </Badge>
              )}
              
              {job.is_urgent && !isPinned && !isExpired && (
                <Badge className="bg-rose-100 text-rose-800 font-medium">
                  Gấp
                </Badge>
              )}
              
              {job.is_featured && !job.is_urgent && !isPinned && !isExpired && (
                <Badge className="bg-blue-100 text-blue-800 font-medium">
                  Nổi Bật
                </Badge>
              )}
            </div>
          </div>
          <DialogDescription className="text-base font-medium text-foreground">
            {job.company}
          </DialogDescription>
        </DialogHeader>
        
        {jobImage && (
          <div className="h-52 w-full overflow-hidden rounded-lg my-3">
            <ImageWithFallback 
              src={jobImage} 
              alt={job.title || "Job listing"}
              className="w-full h-full object-cover"
              fallbackImage="/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png"
            />
          </div>
        )}
        
        <div className="space-y-4 my-3">
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="font-medium">{job.location}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>Đăng {formatPostedDate(job.created_at)}</span>
          </div>
          
          {user ? (
            <div className="flex items-center text-gray-600">
              <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="font-medium">{job.contact_info?.phone}</span>
            </div>
          ) : (
            <div className="flex items-center bg-gray-50 p-4 rounded-md border border-gray-200">
              <Lock className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
              <span className="text-gray-700">🔒 Đăng nhập để xem số điện thoại liên hệ</span>
            </div>
          )}
        </div>
        
        <div className="font-medium text-xl text-emerald-700 my-3">
          {job.salary_range || job.compensation_details}
        </div>
        
        {/* Add FOMO line below salary for Magic Nails */}
        {isPinned && isMagicNails && (
          <div className="mt-2 mb-4 text-red-500 font-medium flex items-center">
            🔥 Most Viewed Listing of the Month
          </div>
        )}
        
        <div className="space-y-3">
          <h3 className="font-medium text-lg">Mô tả công việc:</h3>
          <p className="whitespace-pre-line text-gray-800">{job.description}</p>
        </div>
        
        {job.specialties && job.specialties.length > 0 && (
          <div className="space-y-2 mt-4">
            <h3 className="font-medium">Yêu cầu kỹ năng:</h3>
            <div className="flex flex-wrap gap-2">
              {job.specialties.map((specialty, index) => (
                <Badge key={index} variant="outline" className="bg-gray-50 px-2.5 py-1">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-end mt-6 pt-2 border-t border-gray-100">
          <Button 
            onClick={onClose} 
            className="bg-[#9B51E0] hover:bg-[#8A3FD1] text-white transition-all duration-200 
                     hover:shadow-md hover:shadow-purple-200 transform hover:scale-105"
          >
            Đóng
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VietnameseJobDetailModal;
