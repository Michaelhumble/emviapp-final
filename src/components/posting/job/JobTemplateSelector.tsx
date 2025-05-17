
import React, { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { Sparkles, ChevronDown, Clock } from 'lucide-react';
import { JobFormValues, IndustryType } from './jobFormSchema';
import { jobTemplates } from './jobTemplates';

interface JobTemplateSelectorProps {
  onSelectTemplate: (industryType: IndustryType, templateData: Partial<JobFormValues>) => void;
}

export const JobTemplateSelector: React.FC<JobTemplateSelectorProps> = ({
  onSelectTemplate
}) => {
  const { t } = useTranslation();
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryType | ''>('');
  
  const handleSelectTemplate = (industryType: IndustryType) => {
    if (!industryType) return;
    
    setSelectedIndustry(industryType);
    const template = jobTemplates[industryType];
    
    if (template) {
      onSelectTemplate(industryType, {
        title: template.title,
        description: template.description,
        salary_range: template.salary_range,
        jobType: template.jobType as JobFormValues['jobType'],
        experience_level: template.experience_level as JobFormValues['experience_level']
      });
    }
  };
  
  return (
    <div className="relative">
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center mb-2">
              <Sparkles className="h-5 w-5 text-purple-500 mr-2" />
              <h3 className="font-semibold text-lg text-gray-800">
                {t("Quick-start with industry templates")}
              </h3>
            </div>
            <p className="text-gray-600 text-sm">
              {t("Start with a professional template tailored for your industry")}
            </p>
          </div>
          
          <div className="flex items-center">
            <div className="w-full md:w-56">
              <Select 
                value={selectedIndustry} 
                onValueChange={(value) => handleSelectTemplate(value as IndustryType)}
              >
                <SelectTrigger className="bg-white h-12 text-base">
                  <SelectValue placeholder={t("Select your industry")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nails">{t("Nails")}</SelectItem>
                  <SelectItem value="hair">{t("Hair")}</SelectItem>
                  <SelectItem value="lashes">{t("Lashes")}</SelectItem>
                  <SelectItem value="massage">{t("Massage")}</SelectItem>
                  <SelectItem value="tattoo">{t("Tattoo")}</SelectItem>
                  <SelectItem value="brows">{t("Brows")}</SelectItem>
                  <SelectItem value="skincare">{t("Skincare")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="ml-2 text-xs text-purple-600 flex items-center">
                    <Clock size={12} className="mr-1" />
                    {t("Save time")}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-xs">{t("Our templates are crafted from successful job posts that received the most applicants")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        {selectedIndustry && (
          <div className="mt-4 pt-4 border-t border-purple-100">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-700">
                {t("Example")} ({selectedIndustry}):
              </h4>
              <span className="text-xs text-purple-600">
                {t("High-performing title")}
              </span>
            </div>
            <p className="text-gray-900 font-medium">
              {jobTemplates[selectedIndustry]?.title}
            </p>
          </div>
        )}
      </div>
      
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="bg-white p-1 rounded-full shadow-sm">
          <ChevronDown className="h-5 w-5 text-purple-400" />
        </div>
      </div>
    </div>
  );
};
