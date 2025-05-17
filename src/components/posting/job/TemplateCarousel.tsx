
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { jobTemplatesByIndustry } from './jobTemplates';
import { IndustryType, JobFormValues } from './jobFormSchema';
import { Clock, Sparkles, TrendingUp, Check } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

interface TemplateCarouselProps {
  selectedIndustry: IndustryType | '';
  onSelectTemplate: (template: any) => void;
}

export const TemplateCarousel: React.FC<TemplateCarouselProps> = ({
  selectedIndustry,
  onSelectTemplate
}) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!selectedIndustry) return null;
  
  const templates = jobTemplatesByIndustry[selectedIndustry as IndustryType] || [];
  
  if (templates.length === 0) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full my-8"
    >
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">
          <Sparkles className="inline-block h-5 w-5 mr-2 text-yellow-500" />
          {t({
            english: "Post a job in 60 seconds. No writing needed. Just pick a template!",
            vietnamese: "Đăng tin tuyển dụng trong 60 giây. Không cần viết. Chỉ cần chọn mẫu!"
          })}
        </h3>
        <p className="text-gray-600 mt-1">
          {t({
            english: "These templates get the most applicants",
            vietnamese: "Những mẫu này nhận được nhiều ứng viên nhất"
          })}
        </p>
      </div>
      
      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent>
            {templates.map((template) => (
              <CarouselItem key={template.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                <TemplateCard template={template} onSelect={() => onSelectTemplate(template)} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
      
      <div className="text-center mt-4">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors"
        >
          {isExpanded ? t({
            english: "Show fewer options",
            vietnamese: "Hiển thị ít tùy chọn hơn"
          }) : t({
            english: "Show more options",
            vietnamese: "Hiển thị thêm tùy chọn"
          })}
        </button>
      </div>
    </motion.div>
  );
};

interface TemplateCardProps {
  template: any;
  onSelect: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onSelect }) => {
  const { t } = useTranslation();
  
  const getPerkIcon = (popularity: string) => {
    switch (popularity) {
      case 'most-hired':
        return <Check className="h-4 w-4 mr-1 text-green-500" />;
      case 'fastest-applicants':
        return <TrendingUp className="h-4 w-4 mr-1 text-blue-500" />;
      case 'trusted':
        return <Sparkles className="h-4 w-4 mr-1 text-yellow-500" />;
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
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden h-full flex flex-col"
    >
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-4">
          <h3 className="font-semibold text-lg line-clamp-2">{template.title}</h3>
          <p className="text-gray-600 text-sm mt-2 line-clamp-3">{template.summary}</p>
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center text-sm font-medium">
            <span className="text-green-600">{template.salary_range}</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center text-xs text-gray-500 mb-3">
            {getPerkIcon(template.popularity)}
            <span>{getPopularityLabel(template.popularity)}</span>
          </div>
          
          <button
            type="button"
            onClick={onSelect}
            className={cn(
              "w-full py-2 px-4 rounded text-sm font-medium transition-colors",
              "bg-purple-600 text-white hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            )}
          >
            {t({
              english: "Use This Template",
              vietnamese: "Sử dụng mẫu này"
            })}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TemplateCarousel;
