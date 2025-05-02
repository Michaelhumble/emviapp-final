
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Job } from "@/types/job";
import { formatDistanceToNow } from "date-fns";
import { 
  MapPin, Building, Phone, Mail, User, Calendar, ListRestart, 
  Clock, CheckCircle, X, AlertTriangle, Check, ExternalLink 
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/auth";

interface JobDetailModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
}

const JobDetailModal = ({
  job,
  isOpen,
  onClose
}: JobDetailModalProps) => {
  const { isSignedIn } = useAuth();
  const { t, isVietnamese, toggleLanguage } = useTranslation();
  
  // Format the posted date
  const getPostedDate = () => {
    try {
      return formatDistanceToNow(new Date(job.created_at), { addSuffix: true });
    } catch (error) {
      return "30 days ago";
    }
  };
  
  // Check if job is expired
  const isExpired = job.status === 'expired';
  
  // Show blurred contact info for expired jobs or non-signed in users
  const showBlurredContact = isExpired || !isSignedIn;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {job.title}
            
            {/* Verified badge if job has trust indicators */}
            {job.trust_indicators && (
              <Badge className="ml-2 bg-blue-500 text-white flex items-center gap-1">
                <Check className="h-3 w-3" /> Verified
              </Badge>
            )}
            
            {/* Expired badge */}
            {isExpired && (
              <Badge variant="destructive" className="ml-2 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" /> 
                {isVietnamese ? "Đã Hết Hạn" : "Expired"}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>
        
        {/* Job image */}
        <div className="mb-5 rounded-md overflow-hidden">
          <ImageWithFallback
            src={job.imageUrl || job.image || ''}
            alt={job.title || job.company || "Job Listing"}
            className="w-full aspect-video object-cover"
            fallbackImage="/lovable-uploads/4c3f751f-3631-43c1-b95d-c6521663f366.png"
          />
        </div>
        
        <div className="space-y-6">
          {/* Job metadata */}
          <div className="space-y-2">
            <div className="flex items-center text-gray-700">
              <Building className="h-5 w-5 mr-2" />
              <span className="font-medium">{job.company}</span>
            </div>
            
            <div className="flex items-center text-gray-700">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{job.location}</span>
            </div>
            
            <div className="flex items-center text-gray-700">
              <Calendar className="h-5 w-5 mr-2" />
              <span>Posted {getPostedDate()}</span>
            </div>
          </div>
          
          {/* Salary/compensation */}
          {(job.salary_range || job.compensation_details) && (
            <div className="border-t border-b py-4">
              <h3 className="font-medium text-gray-800 mb-2">
                {isVietnamese ? "Thông Tin Lương:" : "Compensation Details:"}
              </h3>
              <p className="text-green-600 font-semibold text-lg">
                {job.salary_range || job.compensation_details}
              </p>
              
              {job.tip_range && (
                <p className="text-gray-700">
                  <span className="font-medium">Tips:</span> {job.tip_range}
                </p>
              )}
              
              {job.employment_type && (
                <p className="text-gray-700 mt-1">
                  <span className="font-medium">
                    {isVietnamese ? "Hình Thức Làm:" : "Employment Type:"}
                  </span> {job.employment_type}
                </p>
              )}
            </div>
          )}
          
          {/* Features section */}
          <div>
            <h3 className="font-medium text-gray-800 mb-3">
              {isVietnamese ? "Đặc Điểm Công Việc:" : "Job Features:"}
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {job.weekly_pay && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  💸 {isVietnamese ? "Trả Lương Tuần" : "Weekly Pay"}
                </Badge>
              )}
              
              {job.owner_will_train && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  ✨ {isVietnamese ? "Chủ Sẽ Đào Tạo" : "Owner Will Train"}
                </Badge>
              )}
              
              {job.has_housing && (
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  🏠 {isVietnamese ? "Có Chỗ Ở" : "Housing Available"}
                </Badge>
              )}
              
              {job.no_supply_deduction && (
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                  ✅ {isVietnamese ? "Không Trừ Tiền Supplies" : "No Supply Deduction"}
                </Badge>
              )}
            </div>
          </div>
          
          {/* Specialties section */}
          {job.specialties && job.specialties.length > 0 && (
            <div>
              <h3 className="font-medium text-gray-800 mb-3">
                {isVietnamese ? "Chuyên Môn:" : "Specialties:"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {job.specialties.map((specialty, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-pink-50 text-pink-600 border-pink-200"
                  >
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {/* Description section */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-800">
                {isVietnamese ? "Mô Tả Công Việc:" : "Job Description:"}
              </h3>
              
              {job.vietnamese_description && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={toggleLanguage} 
                  className="text-xs"
                >
                  {isVietnamese ? "View in English" : "Xem Tiếng Việt"}
                </Button>
              )}
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              {isVietnamese && job.vietnamese_description ? (
                <p className="whitespace-pre-line">{job.vietnamese_description}</p>
              ) : (
                <p className="whitespace-pre-line">{job.description}</p>
              )}
            </div>
            
            {isExpired && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 flex items-center gap-1.5 font-medium">
                  <AlertTriangle className="h-4 w-4" />
                  {isVietnamese 
                    ? "Mã tin này đã hết hạn (quá 30 ngày)" 
                    : "This job post has expired (over 30 days old)"}
                </p>
              </div>
            )}
          </div>
          
          {/* Contact information section - blurred for non-logged in users or expired jobs */}
          <div>
            <h3 className="font-medium text-gray-800 mb-3">
              {isVietnamese ? "Thông Tin Liên Hệ:" : "Contact Information:"}
            </h3>
            
            {showBlurredContact ? (
              <div className="bg-gray-50 p-4 rounded-md relative">
                {/* Blurred content */}
                <div className="blur-sm">
                  <div className="flex items-center mb-2">
                    <User className="h-4 w-4 mr-2" />
                    <span>Jane Doe</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>(123) 456-7890</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>contact@example.com</span>
                  </div>
                </div>
                
                {/* Overlay with sign-up prompt */}
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-md">
                  {isExpired ? (
                    <div className="text-center p-4">
                      <AlertTriangle className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                      <p className="text-gray-800 font-medium">
                        {isVietnamese 
                          ? "Thông tin liên hệ không còn hiển thị cho mã tin đã hết hạn" 
                          : "Contact information is hidden for expired listings"}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center p-4">
                      <Link to="/sign-up">
                        <Button>
                          {isVietnamese 
                            ? "Đăng Ký Để Xem Thông Tin Liên Hệ" 
                            : "Sign Up To View Contact Info"}
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-md">
                {job.contact_info?.owner_name && (
                  <div className="flex items-center mb-2">
                    <User className="h-4 w-4 mr-2" />
                    <span>{job.contact_info.owner_name}</span>
                  </div>
                )}
                
                {job.contact_info?.phone && (
                  <div className="flex items-center mb-2">
                    <Phone className="h-4 w-4 mr-2" />
                    <a href={`tel:${job.contact_info.phone}`} className="text-blue-600 hover:underline">
                      {job.contact_info.phone}
                    </a>
                  </div>
                )}
                
                {job.contact_info?.email && (
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    <a href={`mailto:${job.contact_info.email}`} className="text-blue-600 hover:underline">
                      {job.contact_info.email}
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter className="mt-6 flex sm:justify-between gap-4 flex-col sm:flex-row">
          <Button variant="outline" onClick={onClose}>
            {isVietnamese ? "Đóng" : "Close"}
          </Button>
          
          <div className="flex gap-2">
            {isExpired ? (
              <Button className="flex items-center gap-1.5">
                <ListRestart className="h-4 w-4" />
                {isVietnamese ? "Gia Hạn Tin" : "Renew Listing"}
              </Button>
            ) : (
              <Link to="/sign-up">
                <Button className="flex items-center gap-1.5">
                  <ExternalLink className="h-4 w-4" />
                  {isVietnamese ? "Ứng Tuyển Ngay" : "Apply Now"}
                </Button>
              </Link>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailModal;
