
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
import SectionHeader from '../SectionHeader';
import { Briefcase, ClipboardList } from 'lucide-react';

interface JobDetailsSectionProps {
  details: Partial<Job>;
  onChange: (details: Partial<Job>) => void;
}

const JobDetailsSection = ({ details, onChange }: JobDetailsSectionProps) => {
  const { t, isVietnamese } = useTranslation();
  
  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border">
      <SectionHeader 
        emoji="📝" 
        title={t('Job Description', 'Chi tiết công việc')}
        description={t('Basic information about the job position', 'Thông tin cơ bản về vị trí tuyển dụng')}
      />
      
      <div className="grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="title" className="text-base font-medium">{t('Job Title', 'Chức danh')}</Label>
          <div className="relative">
            <Input 
              id="title"
              value={details.title || ''}
              onChange={(e) => onChange({ ...details, title: e.target.value })}
              placeholder={t('e.g. Nail Technician, Hair Stylist', 'VD: Thợ nail, Thợ tóc')}
              required
              className="pl-9 h-12"
            />
            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="location" className="text-base font-medium">{t('Location', 'Địa điểm')}</Label>
          <Input 
            id="location"
            value={details.location || ''}
            onChange={(e) => onChange({ ...details, location: e.target.value })}
            placeholder={t('e.g. Los Angeles, CA', 'VD: Houston, TX')}
            required
            className="h-12"
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="employment-type" className="text-base font-medium">{t('Employment Type', 'Loại việc làm')}</Label>
          <Select 
            value={details.employment_type || 'full-time'}
            onValueChange={(value) => onChange({ ...details, employment_type: value })}
          >
            <SelectTrigger id="employment-type" className="h-12">
              <SelectValue placeholder={t('Select employment type', 'Chọn loại việc làm')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">{t('Full-time', 'Toàn thời gian')}</SelectItem>
              <SelectItem value="part-time">{t('Part-time', 'Bán thời gian')}</SelectItem>
              <SelectItem value="contractor">{t('Contractor', 'Hợp đồng')}</SelectItem>
              <SelectItem value="temporary">{t('Temporary', 'Tạm thời')}</SelectItem>
              <SelectItem value="internship">{t('Internship', 'Thực tập')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="description" className="text-base font-medium">{t('Job Description', 'Mô tả công việc')}</Label>
          <div className="relative">
            <textarea
              id="description"
              className="min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-3 pl-9 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              value={details.description || ''}
              onChange={(e) => onChange({ ...details, description: e.target.value })}
              placeholder={t('Describe the job position, responsibilities, and benefits', 'Mô tả vị trí công việc, trách nhiệm và quyền lợi')}
              required
            />
            <ClipboardList className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsSection;
