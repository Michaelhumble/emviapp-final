
import React from 'react';
import { Job } from '@/types/job';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from '@/hooks/useTranslation';

interface CompensationSectionProps {
  details: Partial<Job>;
  onChange: (details: Partial<Job>) => void;
}

const CompensationSection = ({ details, onChange }: CompensationSectionProps) => {
  const { t, isVietnamese } = useTranslation();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('Compensation Details', 'Chi tiết lương thưởng')}</h2>
      <p className="text-muted-foreground">{t('Provide compensation information to attract qualified candidates', 'Cung cấp thông tin lương thưởng để thu hút ứng viên phù hợp')}</p>
      
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="compensation-type">{t('Compensation Type', 'Hình thức trả lương')}</Label>
          <Select 
            value={details.compensation_type || 'hourly'}
            onValueChange={(value) => onChange({ ...details, compensation_type: value })}
          >
            <SelectTrigger id="compensation-type">
              <SelectValue placeholder={t('Select compensation type', 'Chọn hình thức trả lương')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hourly">{t('Hourly', 'Theo giờ')}</SelectItem>
              <SelectItem value="commission">{t('Commission', 'Hoa hồng')}</SelectItem>
              <SelectItem value="salary">{t('Salary', 'Lương')}</SelectItem>
              <SelectItem value="mixed">{t('Mixed (Salary + Commission)', 'Hỗn hợp (Lương + Hoa hồng)')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="compensation-details">{t('Compensation Details', 'Chi tiết lương')}</Label>
          <Input 
            id="compensation-details"
            value={details.compensation_details || ''}
            onChange={(e) => onChange({ ...details, compensation_details: e.target.value })}
            placeholder={t('e.g. $25-35/hr or 60% commission', 'VD: $25-35/giờ hoặc 60% hoa hồng')}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="weekly-pay">
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="weekly-pay"
                checked={details.weekly_pay || false}
                onChange={(e) => onChange({ ...details, weekly_pay: e.target.checked })}
                className="rounded border-gray-300"
              />
              <span>{t('Weekly Pay Available', 'Trả lương hàng tuần')}</span>
            </div>
          </Label>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="tip-range">{t('Expected Tip Range (Optional)', 'Khoảng tip dự kiến (Không bắt buộc)')}</Label>
          <Input 
            id="tip-range"
            value={details.tip_range || ''}
            onChange={(e) => onChange({ ...details, tip_range: e.target.value })}
            placeholder={t('e.g. $100-200/day', 'VD: $100-200/ngày')}
          />
        </div>
      </div>
    </div>
  );
};

export default CompensationSection;
