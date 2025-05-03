
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, DollarSign, Calendar, Users, Briefcase } from 'lucide-react';
import { Job } from '@/types/job';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { JobExpirationInfo } from './card-sections/JobExpirationInfo';
import { useAuth } from '@/context/auth';
import AuthAction from '@/components/common/AuthAction';

interface VietnameseJobDetailModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

const VietnameseJobDetailModal = ({ job, isOpen, onClose }: VietnameseJobDetailModalProps) => {
  const { isSignedIn } = useAuth();
  
  if (!job) return null;

  const getPostedDate = () => {
    try {
      const date = new Date(job.created_at);
      return formatDistanceToNow(date, { addSuffix: true, locale: vi });
    } catch (error) {
      return "Gần đây";
    }
  };

  // Check if job is expired (over 30 days old)
  const isJobExpired = () => {
    const createdDate = new Date(job.created_at);
    const now = new Date();
    const diffDays = Math.ceil(
      (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diffDays >= 30;
  };

  // Extract contact information from description or dedicated fields
  const extractPhoneNumbers = (text: string) => {
    if (!text) return [];
    // This regex looks for patterns like: (123) 456-7890, 123-456-7890, 123.456.7890, etc.
    const phoneRegex = /(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/g;
    return text.match(phoneRegex) || [];
  };

  const phoneNumbers = job.contact_info?.phone ? 
    [job.contact_info.phone] : 
    extractPhoneNumbers(job.vietnamese_description || '');

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{job.title}</DialogTitle>
          <DialogDescription className="flex items-center gap-2 text-base text-foreground">
            <MapPin className="h-4 w-4" />
            {job.location}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Main content */}
          <div className="md:col-span-3 space-y-4">
            <div className="rounded-md overflow-hidden h-56">
              <ImageWithFallback
                src={job.image || ''}
                alt={job.title || ''}
                className="w-full h-full object-cover"
              />
            </div>

            <JobExpirationInfo
              isExpired={isJobExpired()}
              createdAt={job.created_at}
              contactInfo={isSignedIn ? job.contact_info : undefined}
            />

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Mô tả công việc</h3>
              <div className="whitespace-pre-line text-sm">
                {job.vietnamese_description}
              </div>
            </div>

            {/* Contact Information - Only displayed for signed-in users */}
            {phoneNumbers.length > 0 && (
              <div className="mt-4 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-2 flex items-center">
                  <Phone className="inline mr-2 h-4 w-4" />
                  Thông tin liên hệ
                </h3>

                {isSignedIn ? (
                  <div className="space-y-1">
                    {phoneNumbers.map((phone, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Badge variant="outline" className="font-mono">
                          {phone}
                        </Badge>
                        <a
                          href={`tel:${phone.replace(/\D/g, '')}`}
                          className="text-xs text-blue-600"
                        >
                          Gọi ngay
                        </a>
                      </div>
                    ))}
                    {job.contact_info?.email && (
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="font-mono">
                          {job.contact_info.email}
                        </Badge>
                        <a
                          href={`mailto:${job.contact_info.email}`}
                          className="text-xs text-blue-600"
                        >
                          Gửi email
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <AuthAction
                    customTitle="Đăng nhập để xem thông tin liên hệ"
                    onAction={() => true}
                    fallbackContent={
                      <div className="text-center p-2 border border-dashed border-gray-300 rounded">
                        <p className="text-sm text-gray-600 mb-2">
                          Đăng nhập để xem thông tin liên hệ
                        </p>
                        <Button size="sm" variant="outline">
                          Đăng nhập ngay
                        </Button>
                      </div>
                    }
                  />
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="md:col-span-2 space-y-4">
            {job.compensation_details && (
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                  <h3 className="font-semibold">Thu nhập</h3>
                </div>
                <p className="text-sm text-green-700 font-medium">
                  {job.compensation_details}
                </p>
              </div>
            )}

            <Accordion type="single" collapsible className="border border-gray-200 rounded-lg">
              <AccordionItem value="job-details" className="border-b-0">
                <AccordionTrigger className="px-4 py-2 hover:no-underline">
                  <span className="text-sm font-medium">Chi tiết công việc</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Calendar className="h-4 w-4 mt-0.5 text-gray-500" />
                      <div>
                        <span className="block text-gray-600">Đăng tuyển</span>
                        <span>{getPostedDate()}</span>
                      </div>
                    </div>
                    {job.employment_type && (
                      <div className="flex items-start gap-2">
                        <Briefcase className="h-4 w-4 mt-0.5 text-gray-500" />
                        <div>
                          <span className="block text-gray-600">Loại công việc</span>
                          <span>{job.employment_type}</span>
                        </div>
                      </div>
                    )}
                    {job.specialties && job.specialties.length > 0 && (
                      <div className="flex items-start gap-2">
                        <Users className="h-4 w-4 mt-0.5 text-gray-500" />
                        <div>
                          <span className="block text-gray-600">Kỹ năng yêu cầu</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {job.specialties.map((specialty, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Lưu ý quan trọng</h3>
              <ul className="text-sm list-disc pl-5 space-y-1 text-gray-600">
                <li>Kiểm tra kỹ thông tin trước khi liên hệ</li>
                <li>Không chia sẻ thông tin cá nhân trước khi phỏng vấn</li>
                <li>Thông báo ngay nếu có yêu cầu chuyển tiền đặt cọc</li>
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VietnameseJobDetailModal;
