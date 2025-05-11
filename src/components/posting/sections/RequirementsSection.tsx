
import React from 'react';
import { Job } from '@/types/job';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card,
  CardContent
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTranslation } from '@/hooks/useTranslation';
import { Badge } from '@/components/ui/badge';

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
    <div className="space-y-6">
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-purple-700 mb-2">{t('Job Requirements', 'Yêu cầu công việc')}</h3>
          <p className="text-muted-foreground mb-4">{t('Specify what you\'re looking for in candidates', 'Chỉ rõ bạn đang tìm kiếm ứng viên như thế nào')}</p>
          
          <div className="grid gap-5">
            <div className="bg-gray-50 p-4 rounded-lg">
              <Label htmlFor="experience-level" className="text-purple-900 block mb-3">{t('Experience Level', 'Kinh nghiệm')}</Label>
              <RadioGroup 
                value={details.experience_level || 'any'} 
                onValueChange={(value) => onChange({ ...details, experience_level: value })}
                className="grid grid-cols-1 md:grid-cols-3 gap-3"
              >
                <div className="flex items-center space-x-2 bg-white p-3 rounded-md border border-gray-200">
                  <RadioGroupItem value="any" id="any" />
                  <Label htmlFor="any">{t('Any Experience', 'Bất kỳ kinh nghiệm nào')}</Label>
                </div>
                <div className="flex items-center space-x-2 bg-white p-3 rounded-md border border-gray-200">
                  <RadioGroupItem value="entry" id="entry" />
                  <Label htmlFor="entry">{t('Entry Level', 'Mới vào nghề')}</Label>
                </div>
                <div className="flex items-center space-x-2 bg-white p-3 rounded-md border border-gray-200">
                  <RadioGroupItem value="experienced" id="experienced" />
                  <Label htmlFor="experienced">{t('Experienced', 'Có kinh nghiệm')}</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <Label className="text-purple-900 block mb-3">{t('Requirements', 'Yêu cầu')}</Label>
              <div className="space-y-3">
                <Input
                  placeholder={t('Add requirement and press Enter', 'Thêm yêu cầu và nhấn Enter')}
                  onKeyDown={addRequirement}
                  className="bg-white rounded-md"
                />
                
                {Array.isArray(details.requirements) && details.requirements.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {details.requirements.map((req, index) => (
                      <Badge key={index} variant="outline" className="bg-white py-1.5 px-3 flex items-center gap-2">
                        <span>{req}</span>
                        <button 
                          type="button"
                          onClick={() => removeRequirement(index)}
                          className="text-gray-500 hover:text-red-500 ml-1 h-4 w-4 rounded-full flex items-center justify-center"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <Label className="text-purple-900 block mb-3">{t('Additional Benefits', 'Phúc lợi bổ sung')}</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center space-x-2 bg-white p-3 rounded-md border border-gray-200">
                  <input 
                    type="checkbox" 
                    id="has-housing"
                    checked={details.has_housing || false}
                    onChange={(e) => onChange({ ...details, has_housing: e.target.checked })}
                    className="rounded border-gray-300 text-purple-600"
                  />
                  <Label htmlFor="has-housing">{t('Housing Available', 'Có nhà ở')}</Label>
                </div>
                <div className="flex items-center space-x-2 bg-white p-3 rounded-md border border-gray-200">
                  <input 
                    type="checkbox" 
                    id="has-wax-room"
                    checked={details.has_wax_room || false}
                    onChange={(e) => onChange({ ...details, has_wax_room: e.target.checked })}
                    className="rounded border-gray-300 text-purple-600"
                  />
                  <Label htmlFor="has-wax-room">{t('Wax Room Available', 'Có phòng wax')}</Label>
                </div>
                <div className="flex items-center space-x-2 bg-white p-3 rounded-md border border-gray-200">
                  <input 
                    type="checkbox" 
                    id="no-supply-deduction"
                    checked={details.no_supply_deduction || false}
                    onChange={(e) => onChange({ ...details, no_supply_deduction: e.target.checked })}
                    className="rounded border-gray-300 text-purple-600"
                  />
                  <Label htmlFor="no-supply-deduction">{t('No Supply Deduction', 'Không trừ tiền vật tư')}</Label>
                </div>
                <div className="flex items-center space-x-2 bg-white p-3 rounded-md border border-gray-200">
                  <input 
                    type="checkbox" 
                    id="owner-will-train"
                    checked={details.owner_will_train || false}
                    onChange={(e) => onChange({ ...details, owner_will_train: e.target.checked })}
                    className="rounded border-gray-300 text-purple-600"
                  />
                  <Label htmlFor="owner-will-train">{t('Owner Will Train', 'Chủ sẽ đào tạo')}</Label>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RequirementsSection;
