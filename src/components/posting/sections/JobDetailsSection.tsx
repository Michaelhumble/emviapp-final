
import React from 'react';
import { Job } from '@/types/job';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent } from "@/components/ui/card";

interface JobDetailsSectionProps {
  details: Partial<Job>;
  onChange: (details: Partial<Job>) => void;
}

const JobDetailsSection = ({ details, onChange }: JobDetailsSectionProps) => {
  const { t, isVietnamese } = useTranslation();
  
  return (
    <div className="space-y-6">
      {/* Greeting Header */}
      <div className="bg-gradient-to-r from-purple-100 to-white p-6 rounded-lg mb-2">
        <h2 className="text-2xl font-semibold text-purple-800">💫 {t('Let\'s help you find your next amazing artist.', 'Hãy giúp bạn tìm thấy nghệ sĩ tuyệt vời tiếp theo.')}</h2>
        <p className="text-gray-600 mt-2 italic">{t('"Every great salon starts with one perfect hire."', '"Mỗi salon tuyệt vời bắt đầu từ một tuyển dụng hoàn hảo."')}</p>
      </div>
      
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-purple-700 mb-4">{t('Job Details', 'Chi tiết công việc')}</h3>
          <p className="text-muted-foreground mb-4">{t('Basic information about the job position', 'Thông tin cơ bản về vị trí tuyển dụng')}</p>
          
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-purple-900">{t('Job Title', 'Chức danh')}</Label>
              <Input 
                id="title"
                value={details.title || ''}
                onChange={(e) => onChange({ ...details, title: e.target.value })}
                placeholder={t('e.g., Nail Tech – Full time, good pay, great vibes', 'VD: Thợ nail - Toàn thời gian, lương tốt, môi trường tuyệt vời')}
                className="rounded-md focus:border-purple-400"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="location" className="text-purple-900">{t('Location', 'Địa điểm')}</Label>
              <Input 
                id="location"
                value={details.location || ''}
                onChange={(e) => onChange({ ...details, location: e.target.value })}
                placeholder={t('e.g., Houston, TX (near Bellaire)', 'VD: Houston, TX (gần Bellaire)')}
                className="rounded-md focus:border-purple-400"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="employment-type" className="text-purple-900">{t('Employment Type', 'Loại việc làm')}</Label>
              <Select 
                value={details.employment_type || 'full-time'}
                onValueChange={(value) => onChange({ ...details, employment_type: value })}
              >
                <SelectTrigger id="employment-type" className="rounded-md">
                  <SelectValue placeholder={t('Select employment type', 'Chọn loại việc làm')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">{t('Full-time (busy salon)', 'Toàn thời gian (salon đông khách)')}</SelectItem>
                  <SelectItem value="part-time">{t('Part-time (flexible)', 'Bán thời gian (linh hoạt)')}</SelectItem>
                  <SelectItem value="contractor">{t('Booth Rental (your own space)', 'Thuê ghế (không gian riêng của bạn)')}</SelectItem>
                  <SelectItem value="temporary">{t('Temporary', 'Tạm thời')}</SelectItem>
                  <SelectItem value="internship">{t('Internship', 'Thực tập')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-purple-900">{t('Job Description', 'Mô tả công việc')}</Label>
              <textarea
                id="description"
                className="min-h-[140px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                value={details.description || ''}
                onChange={(e) => onChange({ ...details, description: e.target.value })}
                placeholder={t('Describe your salon, team, pay style, and what kind of artist you\'re looking for. Be honest and friendly!', 'Mô tả về salon, đội ngũ, cách trả lương và bạn đang tìm kiếm nghệ sĩ như thế nào. Hãy thật lòng và thân thiện!')}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobDetailsSection;
