
import { useState } from 'react';
import { Briefcase } from 'lucide-react';

export const usePolishedDescriptions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [polishedVersions, setPolishedVersions] = useState<Array<{
    theme: string;
    icon: JSX.Element;
    description: string;
  }>>([]);

  // Simplified version that just returns a single polished version
  const generateVersions = async (originalDescription: string) => {
    setIsLoading(true);
    try {
      // Generate a single enhanced version for now
      const enhancedDescription = `${originalDescription}\n\n• Experience required\n• Competitive pay\n• Flexible schedule\n• Great team environment`;
      
      // Return a single version with the enhanced description
      setPolishedVersions([{
        theme: 'Professional',
        icon: <Briefcase className="h-4 w-4" />,
        description: enhancedDescription
      }]);
    } catch (error) {
      console.error("Error generating description:", error);
      setPolishedVersions([{
        theme: 'Professional',
        icon: <Briefcase className="h-4 w-4" />,
        description: originalDescription
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    polishedVersions,
    generateVersions
  };
};
