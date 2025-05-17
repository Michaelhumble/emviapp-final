
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { IndustryType, JobTemplate } from "./jobFormSchema";
import { useTranslation } from "@/hooks/useTranslation";
import { jobTemplatesByIndustry, getPopularityBadgeColor, getPopularityLabel } from "./jobTemplates";

interface TemplateCarouselProps {
  selectedIndustry: IndustryType;
  onSelectTemplate: (template: JobTemplate) => void;
}

const TemplateCarousel: React.FC<TemplateCarouselProps> = ({
  selectedIndustry,
  onSelectTemplate,
}) => {
  const { t, isVietnamese } = useTranslation();
  const [currentTemplateIndex, setCurrentTemplateIndex] = useState(0);
  
  // Get templates for the selected industry, fallback to empty array
  const templates = jobTemplatesByIndustry[selectedIndustry] || [];
  const currentTemplate = templates[currentTemplateIndex];
  
  // Navigate through templates
  const goToPrevTemplate = () => {
    setCurrentTemplateIndex((prev) => 
      prev === 0 ? templates.length - 1 : prev - 1
    );
  };
  
  const goToNextTemplate = () => {
    setCurrentTemplateIndex((prev) => 
      prev === templates.length - 1 ? 0 : prev + 1
    );
  };

  // If no templates available
  if (!templates.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        {t({
          english: "No templates available for this industry yet.",
          vietnamese: "Chưa có mẫu có sẵn cho ngành này."
        })}
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Navigation buttons */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <Button
          variant="outline"
          size="icon"
          onClick={goToPrevTemplate}
          className="h-8 w-8 rounded-full bg-white/90 shadow-md hover:bg-white"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="absolute inset-y-0 right-0 flex items-center">
        <Button
          variant="outline" 
          size="icon"
          onClick={goToNextTemplate}
          className="h-8 w-8 rounded-full bg-white/90 shadow-md hover:bg-white"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Template card */}
      <motion.div
        key={currentTemplate.id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.3 }}
        className="px-10"
      >
        <Card className="p-6 border border-gray-200 shadow-md">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Preview section */}
            <div className="flex-1 md:max-w-[50%]">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium text-lg text-gray-900 mb-1">
                    {isVietnamese && currentTemplate.vietnameseTitle
                      ? currentTemplate.vietnameseTitle 
                      : currentTemplate.title
                    }
                  </h4>
                  <div className="text-sm text-gray-500 font-light">
                    {currentTemplate.location}
                  </div>
                </div>
                
                {currentTemplate.popularity && (
                  <Badge 
                    className={`${getPopularityBadgeColor(currentTemplate.popularity)} border px-2 py-0.5 text-xs`}
                  >
                    {getPopularityLabel(currentTemplate.popularity)[isVietnamese ? "vietnamese" : "english"]}
                  </Badge>
                )}
              </div>
              
              <div className="text-sm text-gray-700 mb-4 space-y-2">
                {(isVietnamese && currentTemplate.vietnameseDescription 
                  ? currentTemplate.vietnameseDescription 
                  : currentTemplate.description
                ).map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
              
              <div className="mb-4">
                <h5 className="font-medium text-sm text-gray-900 mb-1">
                  {t({
                    english: "Requirements",
                    vietnamese: "Yêu Cầu"
                  })}
                </h5>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  {(isVietnamese && currentTemplate.vietnameseRequirements
                    ? currentTemplate.vietnameseRequirements
                    : currentTemplate.requirements
                  ).map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="text-gray-600 mr-2">
                    {t({
                      english: "Experience:",
                      vietnamese: "Kinh nghiệm:"
                    })}
                  </span>
                  <span className="text-gray-900">
                    {t({
                      english: currentTemplate.experience_level === "entry" 
                        ? "Entry Level" 
                        : currentTemplate.experience_level === "intermediate" 
                          ? "Intermediate" 
                          : currentTemplate.experience_level === "experienced" 
                            ? "Experienced" 
                            : "Senior Level",
                      vietnamese: currentTemplate.experience_level === "entry" 
                        ? "Mới Vào Nghề" 
                        : currentTemplate.experience_level === "intermediate" 
                          ? "Trung Cấp" 
                          : currentTemplate.experience_level === "experienced" 
                            ? "Có Kinh Nghiệm" 
                            : "Cao Cấp"
                    })}
                  </span>
                </div>
                <div className="font-medium text-green-700">
                  {currentTemplate.salary_range}
                </div>
              </div>
            </div>
            
            {/* Action section */}
            <div className="flex flex-col justify-center items-center md:min-w-[220px] space-y-4 bg-gray-50 rounded-lg p-4">
              <div className="text-center">
                <p className="font-medium text-gray-900 mb-1">
                  {t({
                    english: "Ready to post this job?",
                    vietnamese: "Sẵn sàng đăng tin này?"
                  })}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  {t({
                    english: "Use this template and customize as needed",
                    vietnamese: "Sử dụng mẫu này và tùy chỉnh khi cần"
                  })}
                </p>
                
                <Button 
                  onClick={() => onSelectTemplate(currentTemplate)}
                  className="w-full mb-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  {t({
                    english: "Use This Template",
                    vietnamese: "Dùng Mẫu Này"
                  })}
                </Button>
                
                <div className="text-center text-xs text-gray-500">
                  {t({
                    english: `Template ${currentTemplateIndex + 1} of ${templates.length}`,
                    vietnamese: `Mẫu ${currentTemplateIndex + 1} trên ${templates.length}`
                  })}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default TemplateCarousel;
