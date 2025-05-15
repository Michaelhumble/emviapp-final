
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { JOB_TEMPLATES_EN, JOB_TEMPLATES_VI } from "./jobFormConstants";
import { JobFormValues } from "./jobFormSchema";
import { useForm } from "react-hook-form";

interface JobTemplateSelectorProps {
  onSelectTemplate: (template: Partial<JobFormValues>) => void;
}

const JobTemplateSelector: React.FC<JobTemplateSelectorProps> = ({ 
  onSelectTemplate 
}) => {
  const { isVietnamese } = useTranslation();
  const templates = isVietnamese ? JOB_TEMPLATES_VI : JOB_TEMPLATES_EN;

  const handleSelectTemplate = (template: any) => {
    onSelectTemplate({
      title: template.title,
      type: template.type,
      description: template.description,
      template: template.id
    });
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-medium text-gray-800">
          {isVietnamese ? "Mẫu Tin Tuyển Dụng" : "Instant Job Templates"}
        </h3>
        <p className="text-sm text-gray-500">
          {isVietnamese ? "Chọn để điền mẫu nhanh" : "Select to prefill the form"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card 
            key={template.id}
            className="overflow-hidden transition-all duration-300 border hover:border-primary/30 hover:shadow-md cursor-pointer group"
            onClick={() => handleSelectTemplate(template)}
          >
            <CardContent className="p-4">
              <h4 className="font-medium text-gray-900 mb-2 group-hover:text-primary transition-colors">
                {template.title}
              </h4>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {template.shortSummary}
              </p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs w-full bg-gray-50 hover:bg-primary/10 hover:text-primary"
              >
                {isVietnamese ? "Sử dụng mẫu này" : "Use this template"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobTemplateSelector;
