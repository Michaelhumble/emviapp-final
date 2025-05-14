
import { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { POLISHED_DESCRIPTIONS } from '@/components/posting/job/jobFormConstants';

export type PolishedDescriptionStyle = 'professional' | 'friendly' | 'luxury' | 'casual' | 'detailed';

export type PolishedDescriptionsProps = {
  initialContent?: string;
  jobType?: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (description: string) => void;
};

/**
 * Hook to handle polished job descriptions
 */
export const usePolishedDescriptions = ({
  initialContent = '',
  jobType = 'nail-technician',
  isOpen,
  onOpenChange,
  onSelect,
}: PolishedDescriptionsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [activeStyle, setActiveStyle] = useState<PolishedDescriptionStyle>('professional');
  const [selectedTemplate, setSelectedTemplate] = useState<string>(jobType);
  const { isVietnamese } = useTranslation();

  // Effect to update the selected template when jobType changes
  useEffect(() => {
    if (jobType) {
      setSelectedTemplate(jobType.toLowerCase().replace(/\s+/g, '-'));
    }
  }, [jobType]);

  const generateDescriptions = async () => {
    setIsLoading(true);
    
    try {
      // Get the normalized template key
      const templateKey = selectedTemplate || 'nail-technician';
      
      // Create an array of descriptions for the selected style
      let generatedDescriptions: string[] = [];
      
      if (isVietnamese) {
        const styles: PolishedDescriptionStyle[] = ['professionalVi', 'friendlyVi', 'luxuryVi', 'casualVi', 'detailedVi'] as any;
        styles.forEach(style => {
          const description = POLISHED_DESCRIPTIONS[style]?.[templateKey as keyof typeof POLISHED_DESCRIPTIONS[typeof style]];
          if (description) generatedDescriptions.push(description);
        });
      } else {
        const styles: PolishedDescriptionStyle[] = ['professional', 'friendly', 'luxury', 'casual', 'detailed'];
        styles.forEach(style => {
          const description = POLISHED_DESCRIPTIONS[style]?.[templateKey as keyof typeof POLISHED_DESCRIPTIONS[typeof style]];
          if (description) generatedDescriptions.push(description);
        });
      }
      
      setDescriptions(generatedDescriptions.length > 0 ? generatedDescriptions : [
        isVietnamese 
          ? "Tiệm nail đang tuyển thợ có kinh nghiệm làm móng tay, móng chân, đắp bột và sơn gel. Môi trường làm việc thoải mái, lương cao, tip hậu, khách đông."
          : "We are looking for experienced nail technicians to join our team. Must be skilled in manicures, pedicures, gel polish, and acrylic application. Competitive pay and great working environment."
      ]);
    } catch (error) {
      console.error('Error generating descriptions:', error);
      
      // Fallback descriptions in case of error
      setDescriptions([
        isVietnamese 
          ? "Tiệm nail đang tuyển thợ có kinh nghiệm làm móng tay, móng chân, đắp bột và sơn gel. Môi trường làm việc thoải mái, lương cao, tip hậu, khách đông."
          : "We are looking for experienced nail technicians to join our team. Must be skilled in manicures, pedicures, gel polish, and acrylic application. Competitive pay and great working environment."
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      generateDescriptions();
    }
    onOpenChange(open);
  };

  const handleSelectStyle = (style: PolishedDescriptionStyle) => {
    setActiveStyle(style);
    generateDescriptions();
  };

  const styleLabels = {
    professional: { en: "Professional & Sharp", vi: "Chuyên nghiệp" },
    friendly: { en: "Friendly & Warm", vi: "Thân thiện" },
    luxury: { en: "Luxury & Premium", vi: "Cao cấp" },
    casual: { en: "Casual & Relaxed", vi: "Thoải mái" },
    detailed: { en: "Detailed & Specific", vi: "Chi tiết" }
  };

  const getDescriptionForStyle = (style: PolishedDescriptionStyle): string => {
    if (!selectedTemplate) return "";
    
    const sourceStyle = isVietnamese ? `${style}Vi` : style;
    return POLISHED_DESCRIPTIONS[sourceStyle as keyof typeof POLISHED_DESCRIPTIONS]?.[selectedTemplate as keyof typeof POLISHED_DESCRIPTIONS[typeof sourceStyle]] || "";
  };

  return {
    descriptions,
    isLoading,
    isOpen,
    handleOpenChange,
    onSelect,
    selectedTemplate,
    activeStyle,
    handleSelectStyle,
    styleLabels,
    getDescriptionForStyle
  };
};
