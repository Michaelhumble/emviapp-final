import { useState } from 'react';
import { POLISHED_DESCRIPTIONS, POLISHED_DESCRIPTIONS_VI } from '@/components/posting/job/jobFormConstants';
import { useTranslation } from './useTranslation';

interface PolishedDescriptionsHook {
  polishedDescriptions: Array<{ title: string; description: string }>;
  isLoading: boolean;
  fetchPolishedDescriptions: (text: string, industry?: string) => Promise<void>;
}

export const usePolishedDescriptions = (): PolishedDescriptionsHook => {
  const [polishedDescriptions, setPolishedDescriptions] = useState<Array<{ title: string; description: string }>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isVietnamese } = useTranslation();

  // Fetch polished descriptions based on text input and industry
  const fetchPolishedDescriptions = async (text: string, industry?: string): Promise<void> => {
    if (!text || text.trim().length === 0) {
      setPolishedDescriptions([]);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Select descriptions source based on language
      const descriptionsSource = isVietnamese ? POLISHED_DESCRIPTIONS_VI : POLISHED_DESCRIPTIONS;
      
      // If industry is provided and exists in our data, use it
      if (industry && descriptionsSource[industry] && descriptionsSource[industry].length > 0) {
        setPolishedDescriptions(descriptionsSource[industry]);
      } else {
        // Otherwise combine all style types into a flattened array
        const allDescriptions = [
          ...(descriptionsSource.professional || []),
          ...(descriptionsSource.friendly || []),
          ...(descriptionsSource.luxury || []),
          ...(descriptionsSource.casual || []),
          ...(descriptionsSource.detailed || [])
        ];
        
        setPolishedDescriptions(allDescriptions);
      }
      
      // Simulate API delay for a smoother UX
      await new Promise(resolve => setTimeout(resolve, 800));
    } catch (error) {
      console.error('Error fetching polished descriptions:', error);
      // Fallback to original description with minor enhancement
      setPolishedDescriptions([
        {
          title: isVietnamese ? "Phiên Bản Cải Tiến" : "Enhanced Version",
          description: text
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    polishedDescriptions,
    isLoading,
    fetchPolishedDescriptions,
  };
};
