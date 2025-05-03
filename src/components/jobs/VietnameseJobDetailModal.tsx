
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Job } from "@/types/job";
import { MapPin, Phone, Calendar, Clock, BadgeCheck } from "lucide-react";
import { formatDistanceToNow, formatDistance } from "date-fns";
import { vi } from "date-fns/locale";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

interface VietnameseJobDetailModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

const VietnameseJobDetailModal = ({ job, isOpen, onClose }: VietnameseJobDetailModalProps) => {
  if (!job) return null;

  // Format posted date
  const getPostedDate = () => {
    try {
      const date = new Date(job.created_at);
      return formatDistanceToNow(date, { addSuffix: true, locale: vi });
    } catch (error) {
      return "Gần đây";
    }
  };

  // Format expiration date
  const getExpirationDate = () => {
    if (!job.expires_at) return "Không xác định";
    try {
      const expirationDate = new Date(job.expires_at);
      const now = new Date();
      
      // If already expired
      if (expirationDate < now) {
        return "Đã hết hạn";
      }
      
      return formatDistance(now, expirationDate, { 
        locale: vi, 
        addSuffix: true 
      }).replace("sau", "còn");
    } catch (error) {
      return "6 tháng";
    }
  };

  const hasPerks = job.has_housing || job.owner_will_train || job.weekly_pay || job.no_supply_deduction;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 max-h-[85vh] overflow-y-auto">
        {/* Job image */}
        <div className="relative h-56 sm:h-64">
          <ImageWithFallback
            src={job.image || ""}
            alt={job.title || ""}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3">
            <Badge variant="destructive" className="flex items-center gap-1">
              ⚠️ Expire in 6 months
            </Badge>
          </div>
        </div>

        <div className="p-6">
          {/* Job title and location */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
            <div className="flex items-center text-gray-500 mb-1">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{getPostedDate()}</span>
              <span className="mx-2">•</span>
              <Clock className="h-4 w-4 mr-1" />
              <span>Hết hạn: {getExpirationDate()}</span>
            </div>
          </div>

          {/* Compensation */}
          {job.compensation_details && (
            <div className="mb-4">
              <Badge className="bg-green-50 text-green-700 border border-green-200 hover:bg-green-100">
                {job.compensation_details}
              </Badge>
            </div>
          )}

          {/* Description */}
          <div className="mb-5">
            <h3 className="font-semibold text-lg mb-2">Mô tả công việc</h3>
            <div className="bg-gray-50 rounded-md p-4 text-gray-800 whitespace-pre-line">
              {job.vietnamese_description}
            </div>
          </div>

          {/* Specialties */}
          {job.specialties && job.specialties.length > 0 && (
            <div className="mb-5">
              <h3 className="font-semibold mb-2">Kỹ năng yêu cầu</h3>
              <div className="flex flex-wrap gap-2">
                {job.specialties.map((specialty, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-50">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Perks/Benefits */}
          {hasPerks && (
            <div className="mb-5">
              <h3 className="font-semibold mb-2">Phúc lợi</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {job.has_housing && (
                  <div className="flex items-center">
                    <BadgeCheck className="h-4 w-4 text-green-500 mr-2" />
                    <span>Có chỗ ở</span>
                  </div>
                )}
                {job.owner_will_train && (
                  <div className="flex items-center">
                    <BadgeCheck className="h-4 w-4 text-green-500 mr-2" />
                    <span>Có đào tạo</span>
                  </div>
                )}
                {job.weekly_pay && (
                  <div className="flex items-center">
                    <BadgeCheck className="h-4 w-4 text-green-500 mr-2" />
                    <span>Trả lương hàng tuần</span>
                  </div>
                )}
                {job.no_supply_deduction && (
                  <div className="flex items-center">
                    <BadgeCheck className="h-4 w-4 text-green-500 mr-2" />
                    <span>Không trừ supply</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Contact info */}
          {job.contact_info && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="font-semibold mb-2 flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                Thông tin liên hệ
              </h3>
              {job.contact_info.owner_name && (
                <div className="mb-1 text-sm">
                  <span className="font-medium">Liên hệ:</span> {job.contact_info.owner_name}
                </div>
              )}
              {job.contact_info.phone && (
                <div className="mb-1 text-sm">
                  <span className="font-medium">Điện thoại:</span> {job.contact_info.phone}
                </div>
              )}
              {job.contact_info.email && (
                <div className="mb-1 text-sm">
                  <span className="font-medium">Email:</span> {job.contact_info.email}
                </div>
              )}
            </div>
          )}

          {/* Action buttons */}
          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={onClose}>
              Đóng
            </Button>
            <Button>
              Liên hệ ngay
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VietnameseJobDetailModal;
