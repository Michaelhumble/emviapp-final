
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
import SectionHeader from '../SectionHeader';
import { DollarSign, Calendar, RefreshCw } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface CompensationSectionProps {
  details: Partial<Job>;
  onChange: (details: Partial<Job>) => void;
}

const CompensationSection = ({ details, onChange }: CompensationSectionProps) => {
  const { t, isVietnamese } = useTranslation();
  
  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border mt-8">
      <SectionHeader 
        emoji="💰" 
        title={t('Compensation Details', 'Chi tiết lương thưởng')}
        description={t('Provide compensation information to attract qualified candidates', 'Cung cấp thông tin lương thưởng để thu hút ứng viên phù hợp')}
      />
      
      <div className="grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="compensation-type" className="text-base font-medium">{t('Compensation Type', 'Hình thức trả lương')}</Label>
          <Select 
            value={details.compensation_type || 'hourly'}
            onValueChange={(value) => onChange({ ...details, compensation_type: value })}
          >
            <SelectTrigger id="compensation-type" className="h-12">
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
          <Label htmlFor="compensation-details" className="text-base font-medium">{t('Compensation Details', 'Chi tiết lương')}</Label>
          <div className="relative">
            <Input 
              id="compensation-details"
              value={details.compensation_details || ''}
              onChange={(e) => onChange({ ...details, compensation_details: e.target.value })}
              placeholder={t('e.g. $25-35/hr or 60% commission', 'VD: $25-35/giờ hoặc 60% hoa hồng')}
              className="pl-9 h-12"
            />
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
        </div>
        
        <Separator className="my-2" />
        
        <div className="grid gap-4">
          <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-md">
            <input 
              type="checkbox" 
              id="weekly-pay"
              checked={details.weekly_pay || false}
              onChange={(e) => onChange({ ...details, weekly_pay: e.target.checked })}
              className="rounded border-gray-300 h-5 w-5"
            />
            <div className="flex gap-3 items-center">
              <Calendar className="text-gray-500 h-4 w-4" />
              <Label htmlFor="weekly-pay" className="text-base cursor-pointer">
                {t('Weekly Pay Available', 'Trả lương hàng tuần')}
              </Label>
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="tip-range" className="text-base font-medium">{t('Expected Tip Range (Optional)', 'Khoảng tip dự kiến (Không bắt buộc)')}</Label>
            <Input 
              id="tip-range"
              value={details.tip_range || ''}
              onChange={(e) => onChange({ ...details, tip_range: e.target.value })}
              placeholder={t('e.g. $100-200/day', 'VD: $100-200/ngày')}
              className="h-12"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompensationSection;
