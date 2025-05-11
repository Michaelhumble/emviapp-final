
import React from 'react';
import { JobFormValues } from './jobFormSchema';
import SectionHeader from '../SectionHeader';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import { Loader2, Briefcase, MapPin, DollarSign, Clock } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  isSubmitting: boolean;
}

export const JobForm: React.FC<JobFormProps> = ({ 
  onSubmit, 
  photoUploads, 
  setPhotoUploads, 
  isSubmitting 
}) => {
  const { t } = useTranslation();
  
  // This is just a placeholder implementation
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a simple mock form values object
    const mockValues: JobFormValues = {
      title: "Job Title",
      description: "Job Description",
      location: "City, State",
      salary: "$15-20/hr",
      contactEmail: "contact@example.com",
      jobType: "full-time",
      requirements: ["Requirement 1", "Requirement 2"]
    };
    
    onSubmit(mockValues);
  };
  
  return (
    <form onSubmit={handleFormSubmit} className="space-y-8">
      <Card className="p-6 shadow-sm">
        <SectionHeader 
          title={t("Salon Details", "Chi tiết về salon")}
          emoji="💼" 
        />
        
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-gray-700">
              {t("Job Title", "Tiêu đề công việc")}
            </Label>
            <div className="mt-1 relative">
              <Briefcase className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input 
                className="pl-10"
                placeholder={t("e.g., Nail Tech – Full time, great pay, great vibes", "Ví dụ: Kỹ thuật viên móng - Toàn thời gian, lương cao, không khí tuyệt vời")}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>
      </Card>
      
      <Card className="p-6 shadow-sm">
        <SectionHeader 
          title={t("Job Description", "Mô tả công việc")} 
          emoji="📝"
        />
        
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-gray-700">
              {t("Description", "Mô tả")}
            </Label>
            <Textarea 
              className="mt-1 min-h-[150px]"
              placeholder={t("Describe the position, required skills, and ideal candidate...", "Mô tả vị trí, kỹ năng yêu cầu và ứng viên lý tưởng...")}
              rows={6}
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <Label className="text-sm font-medium text-gray-700">
              {t("Job Type", "Loại công việc")}
            </Label>
            <RadioGroup defaultValue="full-time" className="mt-2 gap-4 flex flex-col sm:flex-row">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="full-time" id="full-time" />
                <Label htmlFor="full-time">{t("Full-time", "Toàn thời gian")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="part-time" id="part-time" />
                <Label htmlFor="part-time">{t("Part-time", "Bán thời gian")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="contract" id="contract" />
                <Label htmlFor="contract">{t("Contract", "Hợp đồng")}</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </Card>
      
      <Card className="p-6 shadow-sm">
        <SectionHeader 
          title={t("Location & Pay", "Địa điểm & Lương")} 
          emoji="📍"
        />
        
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-gray-700">
              {t("Location", "Địa điểm")}
            </Label>
            <div className="mt-1 relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input 
                className="pl-10" 
                placeholder={t("e.g., Houston, TX near Bellaire", "Ví dụ: Houston, TX gần Bellaire")}
                disabled={isSubmitting}
              />
            </div>
          </div>
          
          <div>
            <Label className="text-sm font-medium text-gray-700">
              {t("Salary Range", "Phạm vi lương")}
            </Label>
            <div className="mt-1 relative">
              <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input 
                className="pl-10" 
                placeholder={t("e.g., $15-20/hr or $3,000-4,000/month", "Ví dụ: $15-20/giờ hoặc $3,000-4,000/tháng")}
                disabled={isSubmitting}
              />
            </div>
          </div>
          
          <div>
            <Label className="text-sm font-medium text-gray-700">
              {t("Working Hours", "Giờ làm việc")}
            </Label>
            <div className="mt-1 relative">
              <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input 
                className="pl-10" 
                placeholder={t("e.g., Mon-Fri, 9am-5pm", "Ví dụ: Thứ 2-Thứ 6, 9 giờ sáng - 5 giờ chiều")}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>
      </Card>
      
      <Card className="p-6 shadow-sm">
        <SectionHeader 
          title={t("Extra Notes (Optional)", "Ghi chú thêm (Tùy chọn)")} 
          emoji="🔮"
        />
        
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-gray-700">
              {t("Additional Benefits", "Phúc lợi thêm")}
            </Label>
            <Textarea 
              className="mt-1" 
              placeholder={t("e.g., Health insurance, paid vacation, flexible schedule...", "Ví dụ: Bảo hiểm y tế, nghỉ phép có lương, lịch làm việc linh hoạt...")}
              rows={3}
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <Label className="text-sm font-medium text-gray-700">
              {t("Contact Email", "Email liên hệ")}
            </Label>
            <Input 
              type="email" 
              placeholder={t("Where candidates can reach you", "Nơi ứng viên có thể liên hệ với bạn")} 
              disabled={isSubmitting}
            />
          </div>
        </div>
      </Card>
      
      <div className="pt-4">
        <Button 
          type="submit" 
          className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3 text-white font-medium hover:shadow-lg transition-all duration-200 hover:from-purple-700 hover:to-indigo-700"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              {t("Submitting...", "Đang gửi...")}
            </>
          ) : (
            t("Continue to Pricing", "Tiếp tục đến Báo giá")
          )}
        </Button>
        <p className="text-center text-muted-foreground text-sm mt-2">
          {t("Your job post will reach thousands of talented artists — let's make it count.", "Bài đăng công việc của bạn sẽ tiếp cận hàng nghìn nghệ sĩ tài năng — hãy tận dụng điều đó.")}
        </p>
      </div>
    </form>
  );
};
