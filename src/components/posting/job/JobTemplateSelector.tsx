
import React, { useState, useEffect } from 'react';
import TemplateCarousel from './TemplateCarousel';
import { IndustryType, JobTemplate } from './jobFormSchema';
import { JobFormValues } from './jobFormSchema';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Badge } from '@/components/ui/badge';
import { Sparkles, TrendingUp } from 'lucide-react';

interface JobTemplateSelectorProps {
  selectedIndustry: IndustryType | '';
  onSelectTemplate: (templateData: Partial<JobFormValues>) => void;
}

const JobTemplateSelector: React.FC<JobTemplateSelectorProps> = ({ 
  selectedIndustry,
  onSelectTemplate
}) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Show template selector only when an industry is selected
    if (selectedIndustry) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [selectedIndustry]);
  
  const handleSelectTemplate = (template: JobTemplate) => {
    // Convert template format to job form values format
    const formValues: Partial<JobFormValues> = {
      title: template.title,
      industry: template.industry,
      location: template.location,
      description: template.description.join('\n\n'),
      requirements: template.requirements,
      salary_range: template.salary_range,
      jobType: template.employment_type,
      experience_level: template.experience_level as 'entry' | 'intermediate' | 'experienced' | 'senior'
    };
    
    onSelectTemplate(formValues);
  };
  
  if (!isVisible) {
    return null;
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-4 mb-8"
    >
      <div className="text-center mb-6 relative">
        <div className="absolute top-0 right-0 -mt-1">
          <Badge className="bg-gradient-to-r from-amber-400 to-amber-500 text-white">
            <Sparkles className="h-3 w-3 mr-1" /> 
            {t({
              english: "NEW",
              vietnamese: "MỚI"
            })}
          </Badge>
        </div>
        
        <motion.div 
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <h3 className="text-xl font-semibold text-gray-800 flex items-center justify-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            {t({
              english: "Post a job in 60 seconds. No writing needed!",
              vietnamese: "Đăng tin tuyển dụng trong 60 giây. Không cần viết!"
            })}
          </h3>
        </motion.div>
        
        <p className="text-gray-600 mt-2 text-sm">
          {t({
            english: "These templates are proven to get 3x more applicants",
            vietnamese: "Những mẫu này đã được chứng minh nhận được nhiều hơn 3 lần ứng viên"
          })}
        </p>
      </div>
      
      <TemplateCarousel 
        selectedIndustry={selectedIndustry}
        onSelectTemplate={handleSelectTemplate}
      />
    </motion.div>
  );
};

export default JobTemplateSelector;
