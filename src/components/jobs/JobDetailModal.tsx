
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Job } from "@/types/job";
import { MapPin, Phone, Mail, Calendar, DollarSign, Briefcase, Verified } from "lucide-react";
import { format } from "date-fns";
import { useTranslation } from "@/hooks/useTranslation";

interface JobDetailModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
}

const JobDetailModal = ({ job, isOpen, onClose }: JobDetailModalProps) => {
  const { isVietnamese, toggleLanguage } = useTranslation();
  
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'MMMM d, yyyy');
    } catch (error) {
      return "Recent";
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-playfair flex items-center gap-2">
              {job.title}
              {job.trust_indicators?.verified && (
                <Badge className="bg-blue-100 text-blue-800 inline-flex items-center">
                  <Verified className="h-3.5 w-3.5 mr-1" /> Verified
                </Badge>
              )}
            </DialogTitle>
            
            {job.is_featured && (
              <Badge className="bg-purple-100 text-purple-800">
                Featured
              </Badge>
            )}
          </div>
          <div className="text-lg text-gray-700">{job.company}</div>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Language Toggle */}
            {job.vietnamese_description && (
              <div className="flex items-center justify-end mb-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleLanguage}
                  className="text-xs"
                >
                  {isVietnamese ? "Switch to English" : "Chuyển sang Tiếng Việt"}
                </Button>
              </div>
            )}
            
            {/* Job Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {isVietnamese ? "Mô Tả Công Việc" : "Job Description"}
              </h3>
              <div className="space-y-4">
                <p className="text-gray-700 whitespace-pre-line">
                  {isVietnamese && job.vietnamese_description 
                    ? job.vietnamese_description 
                    : job.description}
                </p>
                
                {/* Show both languages if both exist */}
                {job.vietnamese_description && !isVietnamese && (
                  <div className="mt-6 pt-4 border-t">
                    <h4 className="font-medium mb-2">
                      Tiếng Việt / Vietnamese Description
                    </h4>
                    <p className="text-gray-600">
                      {job.vietnamese_description}
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Specialties */}
            {job.specialties && job.specialties.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {isVietnamese ? "Chuyên Môn" : "Specialties"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {job.specialties.map((specialty, index) => (
                    <Badge 
                      key={index} 
                      className="bg-pink-50 text-pink-700 border border-pink-200"
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Details Sidebar */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">
                {isVietnamese ? "Chi Tiết" : "Details"}
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{job.location}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Posted {formatDate(job.created_at)}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Briefcase className="h-4 w-4 mr-2" />
                  <span>{job.employment_type}</span>
                </div>
                
                {job.salary_range && (
                  <div className="flex items-center font-medium text-green-700">
                    <DollarSign className="h-4 w-4 mr-2" />
                    <span>{job.salary_range}</span>
                  </div>
                )}
                
                {job.tip_range && (
                  <div className="flex items-start text-gray-600">
                    <DollarSign className="h-4 w-4 mr-2 mt-0.5" />
                    <div>
                      <span className="block font-medium">
                        {isVietnamese ? "Típ" : "Tips"}
                      </span>
                      <span>{job.tip_range}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Special Features */}
            <div>
              <h3 className="text-lg font-semibold mb-3">
                {isVietnamese ? "Đặc Điểm" : "Features"}
              </h3>
              <div className="space-y-2">
                {job.weekly_pay && (
                  <div className="flex items-center">
                    <span className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 mr-2">
                      <Check className="h-3 w-3" />
                    </span>
                    <span>
                      {isVietnamese ? "Trả lương hàng tuần" : "Weekly Pay"}
                    </span>
                  </div>
                )}
                
                {job.owner_will_train && (
                  <div className="flex items-center">
                    <span className="w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 mr-2">
                      <Check className="h-3 w-3" />
                    </span>
                    <span>
                      {isVietnamese ? "Chủ tiệm sẽ đào tạo" : "Owner Will Train"}
                    </span>
                  </div>
                )}
                
                {job.has_housing && (
                  <div className="flex items-center">
                    <span className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 mr-2">
                      <Check className="h-3 w-3" />
                    </span>
                    <span>
                      {isVietnamese ? "Có chỗ ở" : "Housing Available"}
                    </span>
                  </div>
                )}
                
                {job.no_supply_deduction && (
                  <div className="flex items-center">
                    <span className="w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 mr-2">
                      <Check className="h-3 w-3" />
                    </span>
                    <span>
                      {isVietnamese ? "Không trừ tiền vật liệu" : "No Supply Fee"}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Contact Information */}
            {job.contact_info && (
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  {isVietnamese ? "Thông Tin Liên Hệ" : "Contact Information"}
                </h3>
                <div className="space-y-3">
                  {job.contact_info.owner_name && (
                    <div className="text-gray-700">
                      {job.contact_info.owner_name}
                    </div>
                  )}
                  
                  {job.contact_info.phone && (
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      <a href={`tel:${job.contact_info.phone}`} className="hover:text-primary">
                        {job.contact_info.phone}
                      </a>
                    </div>
                  )}
                  
                  {job.contact_info.email && (
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      <a href={`mailto:${job.contact_info.email}`} className="hover:text-primary">
                        {job.contact_info.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            {isVietnamese ? "Đóng" : "Close"}
          </Button>
          <div className="flex gap-2">
            <Button>
              {isVietnamese ? "Liên hệ ngay" : "Contact Now"}
            </Button>
            <Button variant="secondary">
              {isVietnamese ? "Lưu công việc" : "Save Job"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailModal;
