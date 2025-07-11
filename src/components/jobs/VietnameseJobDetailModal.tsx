import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Calendar, Lock, DollarSign, FileText } from "lucide-react";
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
        
        {/* Salary and Location - EXACT Reference Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Weekly Salary */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <DollarSign className="h-5 w-5 text-green-600 mr-2" />
              <h3 className="font-semibold text-green-800">Weekly Salary</h3>
            </div>
            <p className="text-2xl font-bold text-green-700">
              {job.salary_range || job.compensation_details || "$1,200–$1,800/tuần"}
            </p>
          </div>

          {/* Location */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <MapPin className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="font-semibold text-blue-800">Location</h3>
            </div>
            <p className="text-2xl font-bold text-blue-700">{job.location}</p>
          </div>
        </div>

        {/* Contact Information - EXACT Reference Position */}
        <div className={`rounded-lg p-4 mb-6 ${user ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <div className="flex items-center mb-3">
            <Phone className={`h-5 w-5 mr-2 ${user ? 'text-green-600' : 'text-red-600'}`} />
            <h3 className={`font-semibold ${user ? 'text-green-800' : 'text-red-800'}`}>
              Contact Information
            </h3>
          </div>
          
          {user ? (
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-green-600 mr-2" />
                <span className="text-lg font-semibold text-green-800">{job.contact_info?.phone}</span>
              </div>
              <div className="flex items-center mt-3 text-green-700">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-sm font-medium">Contact details unlocked! Call now to apply.</span>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="font-bold text-red-600">🔒 Contact details are locked</p>
              <p className="text-sm text-red-700">
                Đăng nhập để xem số điện thoại liên hệ
              </p>
            </div>
          )}
        </div>
        
        {/* Add FOMO line below salary for Magic Nails */}
        {isPinned && isMagicNails && (
          <div className="mt-2 mb-4 text-red-500 font-medium flex items-center">
            🔥 Most Viewed Listing of the Month
          </div>
        )}
        
        {/* Job Description - EXACT Reference Position */}
        <div className="border-t pt-6 mb-6">
          <div className="flex items-center mb-4">
            <FileText className="h-5 w-5 text-gray-600 mr-2" />
            <h3 className="text-lg font-semibold">Mô tả công việc</h3>
          </div>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{job.description}</p>
          </div>
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
