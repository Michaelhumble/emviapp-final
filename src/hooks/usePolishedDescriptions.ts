
import { useState, useMemo } from 'react';

interface PolishedDescription {
  style: string;
  text: string;
}

// This is a simplified version of the hook that just returns one polished description
export const usePolishedDescriptions = (description: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Generate a single polished description from the base description
  const generatePolishedDescription = async () => {
    if (!description || description.trim().length < 10) {
      setError('Please provide a longer description to polish');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      // In a real implementation, this would call an API
      // For now we'll simulate the API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return a single polished description
      return {
        style: "Professional & Friendly",
        text: `We're excited to welcome a new talent to join our team! ${description} We offer a supportive environment with opportunities for growth.`
      };
    } catch (err) {
      setError('Failed to generate polished description. Please try again.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Memoize the function to prevent unnecessary re-renders
  const polishDescription = useMemo(() => {
    return {
      generatePolishedDescription,
      isLoading,
      error
    };
  }, [description, isLoading, error]);

  return polishDescription;
};

export default usePolishedDescriptions;
