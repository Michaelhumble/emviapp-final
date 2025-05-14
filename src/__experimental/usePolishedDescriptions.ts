
import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { POLISHED_DESCRIPTIONS } from '@/components/posting/job/jobFormConstants';

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
  jobType = '',
  isOpen,
  onOpenChange,
  onSelect,
}: PolishedDescriptionsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const { isVietnamese } = useTranslation();

  const generateDescriptions = async () => {
    setIsLoading(true);
    
    try {
      // For now, we'll use our predefined descriptions
      // In a real implementation, this would call an API
      
      const templateKey = jobType ? jobType.toLowerCase().replace(/\s+/g, '-') : 'nail-technician';
      
      // Generate an array of descriptions for each style
      const generatedDescriptions: string[] = [];
      
      // Add descriptions for each style (professional, friendly, luxury, casual, detailed)
      if (isVietnamese) {
        generatedDescriptions.push(POLISHED_DESCRIPTIONS.professionalVi[templateKey as keyof typeof POLISHED_DESCRIPTIONS.professionalVi] || '');
        generatedDescriptions.push(POLISHED_DESCRIPTIONS.friendlyVi[templateKey as keyof typeof POLISHED_DESCRIPTIONS.friendlyVi] || '');
        generatedDescriptions.push(POLISHED_DESCRIPTIONS.luxuryVi[templateKey as keyof typeof POLISHED_DESCRIPTIONS.luxuryVi] || '');
        generatedDescriptions.push(POLISHED_DESCRIPTIONS.casualVi[templateKey as keyof typeof POLISHED_DESCRIPTIONS.casualVi] || '');
        generatedDescriptions.push(POLISHED_DESCRIPTIONS.detailedVi[templateKey as keyof typeof POLISHED_DESCRIPTIONS.detailedVi] || '');
      } else {
        generatedDescriptions.push(POLISHED_DESCRIPTIONS.professional[templateKey as keyof typeof POLISHED_DESCRIPTIONS.professional] || '');
        generatedDescriptions.push(POLISHED_DESCRIPTIONS.friendly[templateKey as keyof typeof POLISHED_DESCRIPTIONS.friendly] || '');
        generatedDescriptions.push(POLISHED_DESCRIPTIONS.luxury[templateKey as keyof typeof POLISHED_DESCRIPTIONS.luxury] || '');
        generatedDescriptions.push(POLISHED_DESCRIPTIONS.casual[templateKey as keyof typeof POLISHED_DESCRIPTIONS.casual] || '');
        generatedDescriptions.push(POLISHED_DESCRIPTIONS.detailed[templateKey as keyof typeof POLISHED_DESCRIPTIONS.detailed] || '');
      }
      
      // Filter out any empty descriptions
      const filteredDescriptions = generatedDescriptions.filter(desc => desc.length > 0);
      
      setDescriptions(filteredDescriptions.length > 0 ? filteredDescriptions : [
        isVietnamese 
          ? "Tiệm nail đang tuyển thợ có kinh nghiệm làm móng tay, móng chân, đắp bột và sơn gel. Môi trường làm việc thoải mái, lương cao, tip hậu, khách đông."
          : "We are looking for experienced nail technicians to join our team. Must be skilled in manicures, pedicures, gel polish, and acrylic application. Competitive pay and great working environment."
      ]);
      
      // In a real implementation, you would use the API response here
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

  return {
    descriptions,
    isLoading,
    isOpen,
    handleOpenChange,
    onSelect,
    selectedTemplate: jobType ? jobType.toLowerCase().replace(/\s+/g, '-') : 'nail-technician'
  };
};
