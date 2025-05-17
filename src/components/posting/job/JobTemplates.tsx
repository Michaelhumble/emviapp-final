
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { IndustryType, JobFormValues } from './jobFormSchema';
import { jobTemplates } from './jobTemplates';
import { cn } from '@/lib/utils';

interface JobTemplateProps {
  onSelectTemplate: (industryType: IndustryType, templateData: Partial<JobFormValues>) => void;
  selectedIndustry?: IndustryType;
}

export const JobTemplates: React.FC<JobTemplateProps> = ({
  onSelectTemplate,
  selectedIndustry
}) => {
  const { t } = useTranslation();
  
  const handleSelectTemplate = (industryType: IndustryType) => {
    if (!industryType) return;
    
    const template = jobTemplates[industryType];
    
    if (template) {
      onSelectTemplate(industryType, {
        title: template.title,
        description: template.description,
        vietnameseDescription: template.vietnameseDescription,
        salary_range: template.salary_range,
        jobType: template.jobType as JobFormValues['jobType'],
        experience_level: template.experience_level as JobFormValues['experience_level'],
        requirements: template.requirements || []
      });
    }
  };
  
  // Define industry icons and colors
  const industryInfo = {
    nails: {
      icon: "💅",
      color: "from-pink-500 to-purple-500",
      bgLight: "bg-pink-50"
    },
    hair: {
      icon: "💇",
      color: "from-blue-500 to-indigo-500", 
      bgLight: "bg-blue-50"
    },
    lashes: {
      icon: "👁️",
      color: "from-indigo-500 to-purple-500", 
      bgLight: "bg-indigo-50"
    },
    massage: {
      icon: "💆",
      color: "from-green-500 to-teal-500", 
      bgLight: "bg-green-50"
    },
    tattoo: {
      icon: "🎨",
      color: "from-gray-700 to-gray-900", 
      bgLight: "bg-gray-50"
    },
    brows: {
      icon: "🧿",
      color: "from-amber-500 to-orange-500", 
      bgLight: "bg-amber-50"
    },
    skincare: {
      icon: "✨",
      color: "from-blue-400 to-cyan-500", 
      bgLight: "bg-cyan-50"
    },
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-playfair font-bold bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent mb-4">
          {t({
            english: "Create Your Job Post in One Click",
            vietnamese: "Tạo Bài Đăng Việc Làm Chỉ Với Một Cú Nhấp Chuột"
          })}
        </h1>
        <p className="text-gray-600">
          {t({
            english: "Select your industry template below to instantly create a professional job post",
            vietnamese: "Chọn mẫu ngành của bạn bên dưới để tạo ngay một bài đăng việc làm chuyên nghiệp"
          })}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {(Object.keys(jobTemplates) as Array<IndustryType>).map((industry) => {
          const template = jobTemplates[industry];
          const industryData = industryInfo[industry];
          const isSelected = selectedIndustry === industry;
          
          return (
            <motion.div 
              key={industry}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              animate={{ 
                scale: isSelected ? 1.03 : 1,
                borderColor: isSelected ? '#9b87f5' : 'transparent'
              }}
              transition={{ duration: 0.2 }}
              onClick={() => handleSelectTemplate(industry)}
              className={cn(
                "cursor-pointer rounded-xl overflow-hidden border-2 shadow-lg hover:shadow-xl transition-all",
                isSelected ? "border-purple-400 ring-2 ring-purple-200" : "border-transparent",
                industryData.bgLight
              )}
            >
              <div className={cn(
                "h-2 w-full bg-gradient-to-r",
                industryData.color
              )} />
              
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{industryData.icon}</span>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-white border border-gray-100 shadow-sm">
                    {t({
                      english: industry.charAt(0).toUpperCase() + industry.slice(1),
                      vietnamese: industry.charAt(0).toUpperCase() + industry.slice(1)
                    })}
                  </span>
                </div>
                
                <h3 className="font-bold text-lg mb-1 text-gray-800 line-clamp-1">
                  {template.title}
                </h3>
                
                <div className="mb-2 text-xs text-gray-500 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="line-clamp-1">{template.location || "Multiple Locations"}</span>
                </div>
                
                <div className="text-green-600 font-medium mb-3">
                  {template.salary_range}
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {template.shortDescription || template.description.substring(0, 60) + "..."}
                </p>
                
                <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100">
                  <span className="text-xs text-gray-500">
                    {t({
                      english: template.jobType === 'full-time' ? 'Full-time' : 'Part-time',
                      vietnamese: template.jobType === 'full-time' ? 'Toàn thời gian' : 'Bán thời gian'
                    })}
                  </span>
                  
                  <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-600 font-medium border border-purple-100">
                    1-Click Template
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
