
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Briefcase, MapPin, DollarSign, Phone,
  Calendar, CheckCircle, Users, MessageSquare,
  Home, Shield, Coffee
} from "lucide-react";
import { Job } from "@/types/job";
import { formatDistanceToNow } from "date-fns";

interface JobDetailModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
}

const JobDetailModal = ({ job, isOpen, onClose }: JobDetailModalProps) => {
  const formatPostedDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return `Posted ${formatDistanceToNow(date, { addSuffix: false })} ago`;
    } catch (error) {
      return "Recently posted";
    }
  };

  // Get color for job type badge
  const getJobTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "full-time":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "part-time":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "contract":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "internship":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">
            {job.title}
          </DialogTitle>
          <DialogDescription className="text-base">
            {job.company} • {job.location}
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-5 gap-6">
          {/* Main Content - Left 3/5 */}
          <div className="md:col-span-3 space-y-6">
            {/* Job Overview Section */}
            <div>
              <h3 className="text-lg font-medium mb-3">Tổng Quan</h3>
              <div className="flex flex-wrap gap-3 mb-4">
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4 text-gray-500" />
                  <Badge variant="outline" className={getJobTypeColor(job.employment_type)}>
                    {job.employment_type}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{job.location}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  <span>{job.salary_range}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{formatPostedDate(job.created_at)}</span>
                </div>
              </div>

              {/* Special features */}
              <div className="flex flex-wrap gap-2 mb-4">
                {job.weekly_pay && (
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    Weekly Pay 💰
                  </Badge>
                )}
                {job.owner_will_train && (
                  <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                    Owner Will Train ✨
                  </Badge>
                )}
                {job.has_housing && (
                  <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200 flex items-center gap-1">
                    <Home className="h-3 w-3" /> Housing 🏠
                  </Badge>
                )}
                {job.no_supply_deduction && (
                  <Badge className="bg-teal-100 text-teal-800 border-teal-200 flex items-center gap-1">
                    <Shield className="h-3 w-3" /> No Supply Fee ✅
                  </Badge>
                )}
              </div>

              {/* Tip range */}
              {job.tip_range && (
                <div className="mb-4 flex items-center gap-2">
                  <Coffee className="h-4 w-4 text-amber-600" />
                  <span className="text-amber-700 font-medium">Tips: {job.tip_range}</span>
                </div>
              )}
            </div>
            
            {/* Specialties section */}
            {job.specialties && job.specialties.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-3">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {job.specialties.map((specialty, index) => (
                    <Badge key={index} className="bg-pink-100 text-pink-800 border-pink-200">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Job Description Section */}
            <div>
              <h3 className="text-lg font-medium mb-3">Mô tả công việc</h3>
              <div className="space-y-4">
                {job.vietnamese_description ? (
                  <p className="text-gray-700 whitespace-pre-line">{job.vietnamese_description}</p>
                ) : (
                  <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
                )}
              </div>
            </div>

            {/* Company Description */}
            {job.company_description && (
              <div>
                <h3 className="text-lg font-medium mb-3">Về tiệm</h3>
                <p className="text-gray-700">{job.company_description}</p>
              </div>
            )}
            
            {/* Responsibilities Section */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-3">Trách nhiệm</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index} className="text-gray-700">{responsibility}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Qualifications Section */}
            {job.qualifications && job.qualifications.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-3">Yêu cầu</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {job.qualifications.map((qualification, index) => (
                    <li key={index} className="text-gray-700">{qualification}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Benefits Section */}
            {job.benefits && job.benefits.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-3">Quyền lợi</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="text-gray-700">{benefit}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar - Right 2/5 */}
          <div className="md:col-span-2 space-y-6">
            {/* Trust indicators */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-3">Tin đăng</h3>
              <div className="space-y-2">
                {job.trust_indicators?.verified && (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Salon xác thực</span>
                  </div>
                )}
                
                {job.trust_indicators?.activelyHiring && (
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span>Đang tuyển dụng</span>
                  </div>
                )}
                
                {job.trust_indicators?.chatAvailable && (
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-purple-600" />
                    <span>Có thể nhắn tin ngay</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-3">Liên hệ</h3>
              {job.contact_info ? (
                <div className="space-y-2">
                  {job.contact_info.owner_name && (
                    <div>
                      <span className="text-gray-600">Chủ tiệm:</span> {job.contact_info.owner_name}
                    </div>
                  )}
                  
                  {job.contact_info.phone && (
                    <div>
                      <span className="text-gray-600">Điện thoại:</span> {job.contact_info.phone}
                    </div>
                  )}
                  
                  {job.contact_info.email && (
                    <div>
                      <span className="text-gray-600">Email:</span> {job.contact_info.email}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500">Thông tin liên hệ không có sẵn.</p>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-3">
              {job.contact_info?.phone && (
                <Button className="w-full" variant="default">
                  <Phone className="h-4 w-4 mr-2" /> 
                  Gọi ngay
                </Button>
              )}
              
              <Button className="w-full" variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" /> 
                Nhắn tin
              </Button>
            </div>
            
            {/* Similar Jobs Teaser */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-3">Các công việc tương tự</h3>
              <p className="text-sm text-gray-600">
                Có 15+ công việc khác đang tuyển dụng trong khu vực {job.location.split(',')[0]}.
              </p>
              <Button variant="link" className="text-sm p-0 h-auto mt-2">
                Xem tất cả
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailModal;
