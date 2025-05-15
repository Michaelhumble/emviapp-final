
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { JOB_TEMPLATES_EN, JOB_TEMPLATES_VI } from "./jobFormConstants";
import { JobFormValues } from "./jobFormSchema";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Briefcase, Scissors, Star, Users } from "lucide-react";

interface JobTemplateSelectorProps {
  onSelectTemplate: (template: Partial<JobFormValues>) => void;
}

const JobTemplateSelector: React.FC<JobTemplateSelectorProps> = ({ 
  onSelectTemplate 
}) => {
  const { isVietnamese } = useTranslation();
  const templates = isVietnamese ? JOB_TEMPLATES_VI : JOB_TEMPLATES_EN;

  const getTemplateIcon = (id: string) => {
    if (id.includes("nail")) return <Scissors className="h-5 w-5 text-pink-500" />;
    if (id.includes("hair")) return <Scissors className="h-5 w-5 text-blue-500" />;
    if (id.includes("massage")) return <Users className="h-5 w-5 text-green-500" />;
    if (id.includes("manager")) return <Briefcase className="h-5 w-5 text-amber-500" />;
    return <Star className="h-5 w-5 text-purple-500" />;
  };

  const handleSelectTemplate = (template: any) => {
    onSelectTemplate({
      title: template.title,
      type: template.type,
      description: template.description,
      template: template.id,
      payWeekly: template.payWeekly,
      provideLunch: template.provideLunch,
      qualityProducts: template.qualityProducts,
      reviewBonuses: template.reviewBonuses,
      flexibleHours: template.flexibleHours,
      growthOpportunities: template.growthOpportunities
    });
  };

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-medium text-gray-800">
            {isVietnamese ? "Mẫu Tin Tuyển Dụng" : "Instant Job Templates"}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {isVietnamese ? "Chọn để điền mẫu nhanh" : "Select to prefill the form"}
          </p>
        </div>
        <Badge variant="secondary" className="bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 border border-amber-200 px-3">
          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 mr-1" />
          {isVietnamese ? "Được tin dùng bởi tiệm hàng đầu" : "Trusted by top salons"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card 
              className="overflow-hidden transition-all duration-300 border hover:border-primary/30 hover:shadow-xl cursor-pointer group bg-white/80 backdrop-blur-sm rounded-xl"
              onClick={() => handleSelectTemplate(template)}
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {getTemplateIcon(template.id)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                      {template.title}
                    </h4>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {template.shortSummary}
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full bg-gray-50 hover:bg-primary/10 hover:text-primary text-xs font-medium transition-all group-hover:shadow-sm"
                >
                  {isVietnamese ? "Sử dụng mẫu này" : "Use this template"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default JobTemplateSelector;
