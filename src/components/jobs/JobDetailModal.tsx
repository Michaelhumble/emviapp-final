
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, Building, Calendar, BriefcaseBusiness, CircleDollarSign, Home, Sparkles, Check, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Job } from '@/types/job';
import { formatDistanceToNow } from 'date-fns';
import { useTranslation } from '@/hooks/useTranslation';

interface JobDetailModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
  onApply?: () => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  job,
  isOpen,
  onClose,
  onApply
}) => {
  const { t } = useTranslation();
  
  // Format date to show posting time
  const getPostedDate = () => {
    try {
      return formatDistanceToNow(new Date(job.created_at), { addSuffix: true });
    } catch (error) {
      return t({
        english: "Recently posted",
        vietnamese: "Mới đăng gần đây"
      });
    }
  };
  
  // Display salon name with fallback
  const displaySalonName = job.salonName || job.company || t({
    english: "Unknown Salon",
    vietnamese: "Tiệm không xác định"
  });

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{job.title}</DialogTitle>
        </DialogHeader>
        
        <div className="mt-2 space-y-6">
          <div className="flex items-center">
            <Building className="w-5 h-5 mr-2 text-gray-500" />
            <span className="font-medium">{displaySalonName}</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-gray-500" />
              <span>{job.location}</span>
            </div>
            
            {job.employment_type && (
              <div className="flex items-center">
                <BriefcaseBusiness className="w-4 h-4 mr-2 text-gray-500" />
                <span>{job.employment_type}</span>
              </div>
            )}
            
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-gray-500" />
              <span>{getPostedDate()}</span>
            </div>
            
            {(job.compensation_details || job.compensation_type) && (
              <div className="flex items-center">
                <CircleDollarSign className="w-4 h-4 mr-2 text-gray-500" />
                <span>{job.compensation_details || job.compensation_type}</span>
              </div>
            )}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">{t({
              english: "Description",
              vietnamese: "Mô tả"
            })}</h3>
            <p className="whitespace-pre-line">
              {job.vietnamese_description || job.description}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {job.has_housing && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Home className="w-3 h-3" />
                <span>{t({
                  english: "Housing Available",
                  vietnamese: "Có chỗ ở"
                })}</span>
              </Badge>
            )}
            
            {job.weekly_pay && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                <span>{t({
                  english: "Weekly Pay",
                  vietnamese: "Trả lương hàng tuần"
                })}</span>
              </Badge>
            )}
            
            {job.has_wax_room && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                <span>{t({
                  english: "Wax Room",
                  vietnamese: "Phòng wax"
                })}</span>
              </Badge>
            )}
            
            {job.owner_will_train && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>{t({
                  english: "Will Train",
                  vietnamese: "Có đào tạo"
                })}</span>
              </Badge>
            )}
          </div>
          
          {job.contact_info && (
            <div className="border-t pt-4 mt-4">
              <h3 className="font-semibold mb-2">{t({
                english: "Contact Information",
                vietnamese: "Thông tin liên hệ"
              })}</h3>
              <div className="space-y-1">
                {job.contact_info.owner_name && <p><strong>{t({
                  english: "Contact:",
                  vietnamese: "Liên hệ:"
                })}</strong> {job.contact_info.owner_name}</p>}
                {job.contact_info.phone && <p><strong>{t({
                  english: "Phone:",
                  vietnamese: "Điện thoại:"
                })}</strong> {job.contact_info.phone}</p>}
                {job.contact_info.email && <p><strong>{t({
                  english: "Email:",
                  vietnamese: "Email:"
                })}</strong> {job.contact_info.email}</p>}
              </div>
            </div>
          )}
          
          <div className="border-t pt-4 mt-4 flex justify-end">
            <Button onClick={onClose} variant="outline" className="mr-2">
              {t({
                english: "Close",
                vietnamese: "Đóng"
              })}
            </Button>
            {onApply && (
              <Button onClick={onApply}>
                {t({
                  english: "Apply Now",
                  vietnamese: "Ứng tuyển ngay"
                })}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
