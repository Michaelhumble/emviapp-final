
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  MapPin,
  Phone,
  Rocket,
  DollarSign,
  Home,
  Lock,
  CheckCircle
} from "lucide-react";
import { Job } from "@/types/job";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/context/auth";
import { Link } from "react-router-dom";
import AuthAction from "@/components/common/AuthAction";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

interface VietnameseJobDetailModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

const VietnameseJobDetailModal = ({
  job,
  isOpen,
  onClose,
}: VietnameseJobDetailModalProps) => {
  const { isSignedIn, user } = useAuth();

  if (!job) return null;

  const getPostedDate = () => {
    try {
      const date = new Date(job.created_at);
      const distanceText = formatDistanceToNow(date, { addSuffix: true });
      return distanceText;
    } catch (error) {
      return "Mới đăng";
    }
  };

  const isExpired = () => {
    if (job.status === "expired") return true;
    const createdDate = new Date(job.created_at);
    const now = new Date();
    const diffDays = Math.ceil(
      (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diffDays >= 30;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] p-0 max-h-[calc(100vh-2rem)] overflow-y-auto">
        <div className="aspect-video relative">
          <ImageWithFallback
            src={job.image || ""}
            alt={job.title || "Tin tuyển dụng"}
            className="w-full h-full object-cover"
            businessName={job.title || "Tin tuyển dụng"}
            priority={true}
          />
          {job.is_featured && (
            <Badge className="absolute top-3 left-3 bg-amber-500 text-white border-0">
              Nổi Bật
            </Badge>
          )}
          {job.is_urgent && (
            <Badge className="absolute top-3 right-3 bg-red-500 text-white border-0">
              Gấp
            </Badge>
          )}
          {isExpired() && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <Badge className="bg-red-500 text-white text-base px-4 py-2">
                Tin Đã Hết Hạn
              </Badge>
            </div>
          )}
        </div>

        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{job.title}</DialogTitle>
            <DialogDescription className="flex items-center text-sm mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {job.location}
            </DialogDescription>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <Clock className="h-3 w-3 mr-1" />
              <span>{getPostedDate()}</span>
            </div>
          </DialogHeader>

          <div className="mt-6 space-y-4">
            {/* Benefits section */}
            <div className="grid grid-cols-2 gap-3">
              {job.weekly_pay && (
                <div className="flex items-center text-sm">
                  <DollarSign className="h-4 w-4 mr-1 text-green-500" />
                  <span>Trả lương tuần</span>
                </div>
              )}
              {job.has_housing && (
                <div className="flex items-center text-sm">
                  <Home className="h-4 w-4 mr-1 text-blue-500" />
                  <span>Có chỗ ở</span>
                </div>
              )}
              {job.owner_will_train && (
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 mr-1 text-purple-500" />
                  <span>Bao đào tạo</span>
                </div>
              )}
              {job.no_supply_deduction && (
                <div className="flex items-center text-sm">
                  <Rocket className="h-4 w-4 mr-1 text-amber-500" />
                  <span>Không trừ supplies</span>
                </div>
              )}
            </div>

            {/* Job description */}
            <div className="py-3 border-t border-b border-gray-100">
              <h3 className="font-medium text-sm mb-2">Mô Tả Công Việc</h3>
              <div className="whitespace-pre-wrap text-sm text-gray-700">
                {job.vietnamese_description || job.description}
              </div>
            </div>

            {/* Contact information section */}
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-medium text-sm mb-3">Thông Tin Liên Hệ</h3>
              {!isSignedIn ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-3 rounded-md flex items-start gap-2">
                    <Lock className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-gray-600">
                      Đăng nhập để xem thông tin liên hệ đầy đủ và dễ dàng liên hệ với nhà tuyển dụng.
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <AuthAction
                      onAction={() => true}
                      customTitle="Đăng Nhập"
                      buttonText="Đăng Nhập"
                      buttonClassNames="w-full sm:w-auto"
                    />
                    <Link to="/auth/signup">
                      <Button 
                        variant="outline" 
                        className="w-full sm:w-auto"
                      >
                        Đăng Ký Mới
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {job.contact_info?.owner_name && (
                    <div className="flex items-center text-sm">
                      <span className="font-medium w-24">Tên chủ:</span>
                      <span>{job.contact_info.owner_name}</span>
                    </div>
                  )}
                  {job.contact_info?.phone && (
                    <div className="flex items-center text-sm">
                      <span className="font-medium w-24">Số điện thoại:</span>
                      <a
                        href={`tel:${job.contact_info.phone}`}
                        className="text-primary hover:underline flex items-center"
                      >
                        <Phone className="h-3 w-3 mr-1" />
                        {job.contact_info.phone}
                      </a>
                    </div>
                  )}
                  {job.contact_info?.email && (
                    <div className="flex items-center text-sm">
                      <span className="font-medium w-24">Email:</span>
                      <a
                        href={`mailto:${job.contact_info.email}`}
                        className="text-primary hover:underline"
                      >
                        {job.contact_info.email}
                      </a>
                    </div>
                  )}
                  {job.contact_info?.notes && (
                    <div className="flex items-start text-sm">
                      <span className="font-medium w-24">Ghi chú:</span>
                      <span>{job.contact_info.notes}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="outline" onClick={onClose}>
                Đóng
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VietnameseJobDetailModal;
