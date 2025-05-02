
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Job } from '@/types/job';
import { MapPin, Calendar, DollarSign, Mail, Phone, ExternalLink, Verified, Lock } from 'lucide-react';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { format } from 'date-fns';
import { useTranslation } from '@/hooks/useTranslation';
import { Separator } from '@/components/ui/separator';

interface JobDetailModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
}

const JobDetailModal = ({ job, isOpen, onClose }: JobDetailModalProps) => {
  const { t, isVietnamese, toggleLanguage } = useTranslation();
  const isExpired = job.status === "expired";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-playfair">{job.title}</DialogTitle>
            {job.trust_indicators?.verified && (
              <Badge className="bg-blue-600 text-white">
                <Verified className="h-3.5 w-3.5 mr-1" /> {isVietnamese ? "Đã Xác Minh" : "Verified"}
              </Badge>
            )}
          </div>
          <DialogDescription>
            <div className="flex items-center">
              <span className="font-medium text-gray-800">{job.company}</span>
              <span className="mx-2">•</span>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                <span>{job.location}</span>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        {/* Image with potential status badge */}
        <div className="relative rounded-md overflow-hidden">
          <ImageWithFallback
            src={job.image || job.imageUrl || '/default-job.jpg'}
            alt={job.title || "Job listing"}
            className="w-full h-56 object-cover"
          />
          
          {isExpired && (
            <Badge variant="destructive" className="absolute top-3 left-3">
              <Lock className="h-3.5 w-3.5 mr-1" /> {isVietnamese ? "Đã Hết Hạn" : "Expired"}
            </Badge>
          )}
        </div>
        
        {/* Job Details */}
        <div className="space-y-4">
          {/* Basic Info */}
          <div className="flex flex-wrap gap-3">
            {job.employment_type && (
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                {job.employment_type}
              </Badge>
            )}
            
            <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200 flex items-center">
              <Calendar className="h-3.5 w-3.5 mr-1" /> 
              {isExpired 
                ? (isVietnamese ? "Đã hết hạn (30 ngày trước)" : "Expired (30 days ago)") 
                : `${isVietnamese ? "Đăng ngày" : "Posted on"} ${format(new Date(job.created_at), 'MM/dd/yyyy')}`
              }
            </Badge>
            
            {job.salary_range && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center">
                <DollarSign className="h-3.5 w-3.5 mr-1" /> {job.salary_range}
              </Badge>
            )}
          </div>
          
          {/* Features */}
          <div className="flex flex-wrap gap-2">
            {job.weekly_pay && (
              <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                💰 {isVietnamese ? "Trả Lương Tuần" : "Weekly Pay"}
              </Badge>
            )}
            
            {job.owner_will_train && (
              <Badge className="bg-amber-50 text-amber-700 border border-amber-200 font-medium">
                ✨ {isVietnamese ? "Có Đào Tạo" : "Owner Will Train"}
              </Badge>
            )}
            
            {job.has_housing && (
              <Badge className="bg-indigo-50 text-indigo-700 border border-indigo-200 font-medium">
                🏠 {isVietnamese ? "Có Chỗ Ở" : "Housing Available"}
              </Badge>
            )}
            
            {job.no_supply_deduction && (
              <Badge className="bg-teal-50 text-teal-700 border border-teal-200 font-medium">
                ✅ {isVietnamese ? "Không Trừ Tiền Vật Liệu" : "No Supply Fee"}
              </Badge>
            )}
            
            {job.tip_range && (
              <Badge className="bg-amber-50 text-amber-700 border-amber-100">
                💸 {isVietnamese ? "Tip" : "Tips"}: {job.tip_range}
              </Badge>
            )}
          </div>
          
          {/* Specialties */}
          {job.specialties && job.specialties.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-1.5">
                {isVietnamese ? "Chuyên môn:" : "Specialties:"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {job.specialties.map((specialty, index) => (
                  <Badge 
                    key={index} 
                    className="bg-pink-100 text-pink-800 border-pink-200"
                  >
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <Separator />
          
          {/* Description */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">
                {isVietnamese ? "Mô Tả Công Việc" : "Job Description"}
              </h3>
              
              {job.vietnamese_description && job.description && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={toggleLanguage} 
                  className="text-purple-600 hover:text-purple-800 hover:bg-purple-50"
                >
                  {isVietnamese ? "Switch to English" : "Chuyển sang tiếng Việt"}
                </Button>
              )}
            </div>
            
            <div className="prose prose-sm max-w-none">
              {job.vietnamese_description && job.description ? (
                <p>{isVietnamese ? job.vietnamese_description : job.description}</p>
              ) : (
                <p>{job.description}</p>
              )}
            </div>
          </div>
          
          <Separator />
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium mb-3">
              {isVietnamese ? "Thông Tin Liên Hệ" : "Contact Information"}
            </h3>
            
            {isExpired ? (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                <Lock className="h-10 w-10 mx-auto text-red-500 mb-2" />
                <h4 className="font-semibold text-lg mb-1">{isVietnamese ? "Thông Tin Bị Khóa" : "Information Locked"}</h4>
                <p className="text-gray-500 mb-3">
                  {isVietnamese 
                    ? "Bài đăng công việc này đã hết hạn. Đăng ký để nhận thông báo về các cơ hội mới."
                    : "This job posting has expired. Sign up to get notified about new opportunities."}
                </p>
                <Button 
                  className="w-full sm:w-auto" 
                  onClick={() => window.location.href = "/sign-up"}
                >
                  {isVietnamese ? "Đăng Ký Ngay" : "Sign Up Now"}
                </Button>
              </div>
            ) : job.contact_info ? (
              <div className="space-y-2">
                {job.contact_info.owner_name && (
                  <p className="flex items-start">
                    <span className="font-medium min-w-[100px]">{isVietnamese ? "Liên hệ:" : "Contact:"}</span>
                    <span>{job.contact_info.owner_name}</span>
                  </p>
                )}
                
                {job.contact_info.phone && (
                  <p className="flex items-start">
                    <span className="font-medium min-w-[100px]">{isVietnamese ? "Điện thoại:" : "Phone:"}</span>
                    <a 
                      href={`tel:${job.contact_info.phone}`} 
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      <Phone className="h-3.5 w-3.5 mr-1" /> {job.contact_info.phone}
                    </a>
                  </p>
                )}
                
                {job.contact_info.email && (
                  <p className="flex items-start">
                    <span className="font-medium min-w-[100px]">{isVietnamese ? "Email:" : "Email:"}</span>
                    <a 
                      href={`mailto:${job.contact_info.email}`}
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      <Mail className="h-3.5 w-3.5 mr-1" /> {job.contact_info.email}
                    </a>
                  </p>
                )}
                
                {job.contact_info.notes && (
                  <p className="flex items-start">
                    <span className="font-medium min-w-[100px]">{isVietnamese ? "Ghi chú:" : "Notes:"}</span>
                    <span>{job.contact_info.notes}</span>
                  </p>
                )}
              </div>
            ) : (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
                <p className="text-amber-700">
                  {isVietnamese 
                    ? "Đăng nhập để xem thông tin liên hệ đầy đủ"
                    : "Sign in to view complete contact information"}
                </p>
                <Button 
                  variant="outline" 
                  className="mt-2 border-amber-300 text-amber-800 hover:bg-amber-100"
                  onClick={() => window.location.href = "/sign-in"}
                >
                  {isVietnamese ? "Đăng Nhập" : "Sign In"}
                </Button>
              </div>
            )}
          </div>
          
          {/* Apply button */}
          {!isExpired && (
            <div className="flex justify-end pt-4">
              <Button 
                size="lg" 
                className="gap-2"
                onClick={isExpired ? () => window.location.href = "/sign-up" : onClose}
              >
                {isExpired 
                  ? (isVietnamese ? "Đăng Ký Tài Khoản" : "Create Account") 
                  : (isVietnamese ? "Liên Hệ Ngay" : "Contact Now")}
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailModal;
