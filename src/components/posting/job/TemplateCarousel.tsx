
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { jobTemplatesByIndustry } from './jobTemplates';
import { IndustryType, JobTemplate } from './jobFormSchema';
import { Check, Clock, Sparkles, TrendingUp, Users, DollarSign, Star } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import PremiumFeatureGate from '@/components/upgrade/PremiumFeatureGate';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface TemplateCarouselProps {
  selectedIndustry: IndustryType | '';
  onSelectTemplate: (template: JobTemplate) => void;
}

export const TemplateCarousel: React.FC<TemplateCarouselProps> = ({
  selectedIndustry,
  onSelectTemplate
}) => {
  const { t, isVietnamese } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<JobTemplate | null>(null);
  
  if (!selectedIndustry) return null;
  
  const templates = jobTemplatesByIndustry[selectedIndustry as IndustryType] || [];
  
  if (templates.length === 0) return null;
  
  const handlePreview = (template: JobTemplate) => {
    setPreviewTemplate(template);
  };
  
  const handleUseTemplate = (template: JobTemplate) => {
    setPreviewTemplate(null);
    onSelectTemplate(template);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {templates.map((template, index) => (
              <CarouselItem key={template.id} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <TemplateCard 
                    template={template} 
                    onSelect={() => onSelectTemplate(template)} 
                    onPreview={() => handlePreview(template)}
                  />
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2" />
          </div>
        </Carousel>
      </div>
      
      {previewTemplate && (
        <Dialog open={!!previewTemplate} onOpenChange={(open) => !open && setPreviewTemplate(null)}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
            <TemplatePreview 
              template={previewTemplate} 
              onUse={() => handleUseTemplate(previewTemplate)} 
            />
          </DialogContent>
        </Dialog>
      )}
    </motion.div>
  );
};

interface TemplateCardProps {
  template: JobTemplate;
  onSelect: () => void;
  onPreview: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onSelect, onPreview }) => {
  const { t, isVietnamese } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  
  const getPerkIcon = (popularity: string) => {
    switch (popularity) {
      case 'most-hired':
        return <Check className="h-4 w-4 mr-1 text-green-500" />;
      case 'fastest-applicants':
        return <TrendingUp className="h-4 w-4 mr-1 text-blue-500" />;
      case 'trusted':
        return <Star className="h-4 w-4 mr-1 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 mr-1 text-purple-500" />;
    }
  };
  
  const getPopularityLabel = (popularity: string) => {
    switch (popularity) {
      case 'most-hired':
        return t({
          english: "#1 Most hired template",
          vietnamese: "Mẫu được thuê nhiều nhất"
        });
      case 'fastest-applicants':
        return t({
          english: "Fastest to get applicants",
          vietnamese: "Nhanh chóng nhận được ứng viên"
        });
      case 'trusted':
        return t({
          english: "Trusted by top salons",
          vietnamese: "Được tin dùng bởi các tiệm hàng đầu"
        });
      default:
        return t({
          english: "Trending template",
          vietnamese: "Mẫu đang thịnh hành"
        });
    }
  };
  
  const getPopularityBadgeColor = (popularity: string) => {
    switch (popularity) {
      case 'most-hired':
        return "bg-gradient-to-r from-green-500 to-emerald-600";
      case 'fastest-applicants':
        return "bg-gradient-to-r from-blue-500 to-indigo-600";
      case 'trusted':
        return "bg-gradient-to-r from-amber-500 to-orange-600";
      default:
        return "bg-gradient-to-r from-purple-500 to-pink-600";
    }
  };
  
  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden h-full flex flex-col"
    >
      <div className="relative">
        <Badge className={cn(
          "absolute top-2 right-2 z-10", 
          getPopularityBadgeColor(template.popularity)
        )}>
          {getPerkIcon(template.popularity)}
          <span className="text-xs">
            {getPopularityLabel(template.popularity)}
          </span>
        </Badge>
        
        <div className="p-4 flex flex-col flex-grow">
          <div className="mb-3 space-y-2">
            <h3 className="font-semibold text-lg line-clamp-2">
              {isVietnamese && template.vietnameseTitle ? template.vietnameseTitle : template.title}
            </h3>
            
            <div className="flex items-center text-sm text-gray-600">
              <DollarSign className="h-4 w-4 mr-1 text-green-600" /> 
              <span className="font-medium text-green-700">{template.salary_range}</span>
            </div>
            
            <p className="text-gray-600 text-sm mt-1 line-clamp-2">
              {isVietnamese && template.vietnameseSummary ? template.vietnameseSummary : template.summary}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-2">
            {template.specialties.slice(0, 3).map((specialty, index) => (
              <Badge key={index} variant="outline" className="text-xs bg-gray-50">
                {specialty}
              </Badge>
            ))}
            {template.specialties.length > 3 && (
              <Badge variant="outline" className="text-xs bg-gray-50">
                +{template.specialties.length - 3}
              </Badge>
            )}
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col space-y-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full text-xs"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onPreview();
              }}
            >
              {t({
                english: "Preview Template",
                vietnamese: "Xem trước mẫu"
              })}
            </Button>
            
            <Button
              type="button"
              onClick={onSelect}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium"
              size="sm"
            >
              {t({
                english: "Use This Template",
                vietnamese: "Sử dụng mẫu này"
              })}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface TemplatePreviewProps {
  template: JobTemplate;
  onUse: () => void;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ template, onUse }) => {
  const { t, isVietnamese } = useTranslation();
  const [showVietnamese, setShowVietnamese] = useState(isVietnamese);
  
  const title = showVietnamese && template.vietnameseTitle ? template.vietnameseTitle : template.title;
  const description = showVietnamese && template.vietnameseDescription ? template.vietnameseDescription : template.description;
  const requirements = showVietnamese && template.vietnameseRequirements ? template.vietnameseRequirements : template.requirements;
  const benefits = showVietnamese && template.vietnameseBenefits ? template.vietnameseBenefits : template.benefits;
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">{t({
          english: "Template Preview",
          vietnamese: "Xem Trước Mẫu"
        })}</h3>
        
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant={!showVietnamese ? "default" : "outline"}
            onClick={() => setShowVietnamese(false)}
          >
            English
          </Button>
          <Button
            size="sm"
            variant={showVietnamese ? "default" : "outline"}
            onClick={() => setShowVietnamese(true)}
          >
            Tiếng Việt
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border p-6 space-y-6">
        <div className="space-y-2">
          <Badge 
            className={cn(
              getPopularityBadgeColor(template.popularity),
              "mb-2"
            )}
          >
            {template.popularity === 'most-hired' && <Users className="h-3 w-3 mr-1" />}
            {template.popularity === 'fastest-applicants' && <TrendingUp className="h-3 w-3 mr-1" />}
            {template.popularity === 'trusted' && <Star className="h-3 w-3 mr-1" />}
            {template.popularity === 'trending' && <Sparkles className="h-3 w-3 mr-1" />}
            <span className="text-xs">
              {getPopularityLabel(template.popularity)}
            </span>
          </Badge>
          
          <h1 className="text-2xl font-bold">{title}</h1>
          
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm text-gray-700">
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1 text-green-600" />
              <span className="font-medium text-green-700">{template.salary_range}</span>
            </div>
          </div>
        </div>
        
        <ScrollArea className="h-[280px] pr-4">
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">{t({
                english: "Job Description",
                vietnamese: "Mô Tả Công Việc"
              })}</h3>
              {description.map((paragraph, idx) => (
                <p key={idx} className="text-gray-600">{paragraph}</p>
              ))}
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">{t({
                english: "Requirements",
                vietnamese: "Yêu Cầu"
              })}</h3>
              <ul className="list-disc list-inside space-y-1">
                {requirements.map((req, idx) => (
                  <li key={idx} className="text-gray-600">{req}</li>
                ))}
              </ul>
            </div>
            
            {benefits && benefits.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">{t({
                  english: "Benefits",
                  vietnamese: "Phúc Lợi"
                })}</h3>
                <div className="flex flex-wrap gap-2">
                  {benefits.map((benefit, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-purple-50 text-purple-700 border-purple-100">
                      <Check className="h-3 w-3 mr-1" /> {benefit}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="pt-4 border-t border-gray-200">
          <Button 
            onClick={onUse}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {t({
              english: "Use This Template",
              vietnamese: "Sử Dụng Mẫu Này"
            })}
          </Button>
          <p className="text-xs text-center mt-2 text-gray-500">
            {t({
              english: "This will pre-fill your job form with all details. You can edit afterwards.",
              vietnamese: "Điều này sẽ điền sẵn biểu mẫu công việc của bạn với tất cả chi tiết. Bạn có thể chỉnh sửa sau."
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TemplateCarousel;
