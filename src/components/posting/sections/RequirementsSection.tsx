
import React from 'react';
import { Job } from '@/types/job';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card,
  CardContent
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTranslation } from '@/hooks/useTranslation';
import SectionHeader from '../SectionHeader';
import { Check, X, Clock, Home, Sparkles } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface RequirementsSectionProps {
  details: Partial<Job>;
  onChange: (details: Partial<Job>) => void;
}

const RequirementsSection = ({ details, onChange }: RequirementsSectionProps) => {
  const { t, isVietnamese } = useTranslation();
  
  // Handle adding a requirement
  const addRequirement = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      e.preventDefault();
      const requirements = Array.isArray(details.requirements) 
        ? [...details.requirements, e.currentTarget.value] 
        : [e.currentTarget.value];
      onChange({ ...details, requirements });
      e.currentTarget.value = '';
    }
  };

  // Handle removing a requirement
  const removeRequirement = (index: number) => {
    if (Array.isArray(details.requirements)) {
      const requirements = [...details.requirements];
      requirements.splice(index, 1);
      onChange({ ...details, requirements });
    }
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border mt-8">
      <SectionHeader 
        emoji="✨" 
        title={t('Job Requirements', 'Yêu cầu công việc')}
        description={t('Specify what you\'re looking for in candidates', 'Chỉ rõ bạn đang tìm kiếm ứng viên như thế nào')}
      />
      
      <div className="grid gap-5">
        <div className="grid gap-3">
          <Label htmlFor="experience-level" className="text-base font-medium">{t('Experience Level', 'Kinh nghiệm')}</Label>
          <RadioGroup 
            value={details.experience_level || 'any'} 
            onValueChange={(value) => onChange({ ...details, experience_level: value })}
            className="grid grid-cols-1 md:grid-cols-3 gap-3"
          >
            <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md hover:bg-gray-100 transition-colors">
              <RadioGroupItem value="any" id="any" />
              <Label htmlFor="any" className="cursor-pointer">{t('Any Experience', 'Bất kỳ kinh nghiệm nào')}</Label>
            </div>
            <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md hover:bg-gray-100 transition-colors">
              <RadioGroupItem value="entry" id="entry" />
              <Label htmlFor="entry" className="cursor-pointer">{t('Entry Level', 'Mới vào nghề')}</Label>
            </div>
            <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md hover:bg-gray-100 transition-colors">
              <RadioGroupItem value="experienced" id="experienced" />
              <Label htmlFor="experienced" className="cursor-pointer">{t('Experienced', 'Có kinh nghiệm')}</Label>
            </div>
          </RadioGroup>
        </div>
        
        <Separator className="my-2" />
        
        <div className="grid gap-3">
          <Label className="text-base font-medium">{t('Requirements', 'Yêu cầu')}</Label>
          <div className="space-y-3">
            <div className="relative">
              <Input
                placeholder={t('Add requirement and press Enter', 'Thêm yêu cầu và nhấn Enter')}
                onKeyDown={addRequirement}
                className="pl-9 h-12"
              />
              <Check className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
            
            {Array.isArray(details.requirements) && details.requirements.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {details.requirements.map((req, index) => (
                  <Card key={index} className="bg-gray-50 border-gray-200">
                    <CardContent className="p-2 py-1 flex items-center">
                      <span className="mr-2 text-sm">{req}</span>
                      <button 
                        type="button"
                        onClick={() => removeRequirement(index)}
                        className="text-gray-500 hover:text-red-500 ml-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="grid gap-3 mt-2">
          <Label className="text-base font-medium">{t('Additional Benefits', 'Phúc lợi bổ sung')}</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md">
              <input 
                type="checkbox" 
                id="has-housing"
                checked={details.has_housing || false}
                onChange={(e) => onChange({ ...details, has_housing: e.target.checked })}
                className="rounded border-gray-300 h-5 w-5"
              />
              <div className="flex gap-2 items-center">
                <Home className="text-gray-500 h-4 w-4" />
                <Label htmlFor="has-housing" className="cursor-pointer">{t('Housing Available', 'Có nhà ở')}</Label>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md">
              <input 
                type="checkbox" 
                id="has-wax-room"
                checked={details.has_wax_room || false}
                onChange={(e) => onChange({ ...details, has_wax_room: e.target.checked })}
                className="rounded border-gray-300 h-5 w-5"
              />
              <div className="flex gap-2 items-center">
                <Sparkles className="text-gray-500 h-4 w-4" />
                <Label htmlFor="has-wax-room" className="cursor-pointer">{t('Wax Room Available', 'Có phòng wax')}</Label>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md">
              <input 
                type="checkbox" 
                id="no-supply-deduction"
                checked={details.no_supply_deduction || false}
                onChange={(e) => onChange({ ...details, no_supply_deduction: e.target.checked })}
                className="rounded border-gray-300 h-5 w-5"
              />
              <Label htmlFor="no-supply-deduction" className="cursor-pointer">{t('No Supply Deduction', 'Không trừ tiền vật tư')}</Label>
            </div>
            
            <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md">
              <input 
                type="checkbox" 
                id="owner-will-train"
                checked={details.owner_will_train || false}
                onChange={(e) => onChange({ ...details, owner_will_train: e.target.checked })}
                className="rounded border-gray-300 h-5 w-5"
              />
              <div className="flex gap-2 items-center">
                <Clock className="text-gray-500 h-4 w-4" />
                <Label htmlFor="owner-will-train" className="cursor-pointer">{t('Owner Will Train', 'Chủ sẽ đào tạo')}</Label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequirementsSection;
