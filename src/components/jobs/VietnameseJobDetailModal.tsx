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
  
  // Get job image based on job ID - ensuring each job has a unique image in the detail view
  const getJobDetailImage = () => {
    // If it's Magic Nails (pinned showcase), keep its specific image
    if (isMagicNails) {
      return "/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png";
    }
    
    // For other jobs, assign a unique image based on job ID or index
    const jobId = job.id;
    
    // Map specific job IDs to unique nail salon images
    switch(jobId) {
      // Active jobs with unique images
      case "job-001": return "/lovable-uploads/c1533abd-8de5-4ec3-8ee5-868538a5d6dd.png";
      case "job-002": return "/lovable-uploads/11925359-6327-46e7-b52e-79b4a4111e34.png";
      case "job-003": return "/lovable-uploads/1575b88f-f835-4d89-9109-bf518fc4cfb1.png";
      case "job-004": return "/lovable-uploads/7a729a53-192a-40cd-a28f-e28023529d8f.png";
      case "job-005": return "/lovable-uploads/19f9a395-4b4e-4e60-bd13-e0cde9064550.png";
      
      // Expired jobs with unique images
      case "job-006": return "/lovable-uploads/8283328c-3a93-4562-be8b-32c35c31a600.png";
      case "job-007": return "/lovable-uploads/8858fff4-1fa3-4803-86b1-beadca5fd1df.png";
      case "job-008": return "/lovable-uploads/2542d0a3-5117-433d-baee-5c0fe2bfeca2.png";
      case "job-009": return "/lovable-uploads/89855878-2908-47b5-98b0-1935d73cdd71.png";
      
      // Default in case of any other job ID
      default: return job.image || "/lovable-uploads/fa1b4f95-ebc9-452c-a18b-9d4e78db84bb.png";
    }
  };
  
  const jobImage = getJobDetailImage();
  
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
