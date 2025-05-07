
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Calendar, Lock } from "lucide-react";
import { Job } from "@/types/job";
import { useAuth } from "@/context/auth";
import { formatDistanceToNow } from "date-fns";

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
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <DialogTitle className="text-xl font-semibold font-playfair">{job.title}</DialogTitle>
            {isPinned && (
              <Badge className="bg-amber-100 text-amber-800 font-medium">
                Tin Gấp
              </Badge>
            )}
          </div>
          <DialogDescription className="text-base font-medium text-foreground">
            {job.company}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-2">
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{job.location}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Đăng {formatPostedDate(job.created_at)}</span>
          </div>
          
          {user ? (
            <div className="flex items-center text-gray-600">
              <Phone className="h-4 w-4 mr-2" />
              <span className="font-medium">{job.contact_info?.phone}</span>
            </div>
          ) : (
            <div className="flex items-center bg-gray-50 p-3 rounded-md border border-gray-200">
              <Lock className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-gray-700">🔒 Đăng nhập để xem số điện thoại liên hệ</span>
            </div>
          )}
        </div>
        
        <div className="font-medium text-lg text-emerald-700 my-2">
          {job.salary_range || job.compensation_details}
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium">Mô tả công việc:</h3>
          <p className="whitespace-pre-line">{job.description}</p>
        </div>
        
        {job.specialties && job.specialties.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-medium">Yêu cầu kỹ năng:</h3>
            <div className="flex flex-wrap gap-2">
              {job.specialties.map((specialty, index) => (
                <Badge key={index} variant="outline" className="bg-gray-50">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-end mt-4 pt-2 border-t border-gray-100">
          <Button onClick={onClose}>Đóng</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VietnameseJobDetailModal;
