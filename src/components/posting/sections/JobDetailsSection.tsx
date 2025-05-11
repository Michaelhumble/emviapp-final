
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

interface JobDetailsSectionProps {
  details: Partial<Job>;
  onChange: (details: Partial<Job>) => void;
}

const JobDetailsSection = ({ details, onChange }: JobDetailsSectionProps) => {
  const { t, isVietnamese } = useTranslation();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('Job Details', 'Chi tiết công việc')}</h2>
      <p className="text-muted-foreground">{t('Basic information about the job position', 'Thông tin cơ bản về vị trí tuyển dụng')}</p>
      
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="title">{t('Job Title', 'Chức danh')}</Label>
          <Input 
            id="title"
            value={details.title || ''}
            onChange={(e) => onChange({ ...details, title: e.target.value })}
            placeholder={t('e.g. Nail Technician, Hair Stylist', 'VD: Thợ nail, Thợ tóc')}
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="location">{t('Location', 'Địa điểm')}</Label>
          <Input 
            id="location"
            value={details.location || ''}
            onChange={(e) => onChange({ ...details, location: e.target.value })}
            placeholder={t('e.g. Los Angeles, CA', 'VD: Houston, TX')}
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="employment-type">{t('Employment Type', 'Loại việc làm')}</Label>
          <Select 
            value={details.employment_type || 'full-time'}
            onValueChange={(value) => onChange({ ...details, employment_type: value })}
          >
            <SelectTrigger id="employment-type">
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
          <Label htmlFor="description">{t('Job Description', 'Mô tả công việc')}</Label>
          <textarea
            id="description"
            className="min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            value={details.description || ''}
            onChange={(e) => onChange({ ...details, description: e.target.value })}
            placeholder={t('Describe the job position, responsibilities, and benefits', 'Mô tả vị trí công việc, trách nhiệm và quyền lợi')}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default JobDetailsSection;
