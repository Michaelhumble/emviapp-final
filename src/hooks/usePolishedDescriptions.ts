
import { useState, useMemo } from 'react';

export interface PolishedDescription {
  style: string;
  text: string;
}

export const usePolishedDescriptions = (description: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Generate 10 polished descriptions from a base description
  const generatePolishedDescriptions = async (): Promise<PolishedDescription[]> => {
    if (!description || description.trim().length < 10) {
      setError('Please provide a longer description to polish');
      return [];
    }

    setIsLoading(true);
    setError(null);

    try {
      // In a real implementation, this would call an API
      // For now we'll simulate the API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response with various styles
      return [
        {
          style: "Friendly & Warm",
          text: `We're so excited to welcome a new talent to our friendly team! ${description} We're like a family here, and we can't wait to meet you!`
        },
        {
          style: "Professional & Sharp",
          text: `We're seeking an exceptional professional to join our established team. ${description} Qualified candidates will receive competitive compensation and opportunities for growth.`
        },
        {
          style: "Short & Direct",
          text: `Now hiring. ${description} Apply today. Immediate start available.`
        },
        {
          style: "Empathetic & Heartfelt",
          text: `We understand finding the right workplace matters. ${description} We value your unique talents and will support your journey with us.`
        },
        {
          style: "High-Energy",
          text: `Ready to LEVEL UP your career?! ${description} Join our AMAZING team and transform your future TODAY!!`
        },
        {
          style: "Creative & Artistic",
          text: `Seeking artistic souls to add color to our canvas. ${description} Express yourself through your work in our inspiring space.`
        },
        {
          style: "Smart & Modern",
          text: `Join an innovative team embracing modern techniques. ${description} We leverage technology and data-driven approaches to stay ahead.`
        },
        {
          style: "Recruiting-Focused",
          text: `Top talent wanted for immediate position. ${description} Excellent career trajectory for the right candidate.`
        },
        {
          style: "Local & Down-to-Earth",
          text: `Local beauty business seeking new team member. ${description} We serve our community with pride and personal attention.`
        },
        {
          style: "Inspired & Motivational",
          text: `Ready to achieve your career dreams? ${description} We believe in your potential and will help you reach new heights.`
        }
      ];
    } catch (err) {
      setError('Failed to generate polished descriptions. Please try again.');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Memoize the function to prevent unnecessary re-renders
  const polishDescription = useMemo(() => {
    return {
      generatePolishedDescriptions,
      isLoading,
      error
    };
  }, [description, isLoading, error]);

  return polishDescription;
};

export default usePolishedDescriptions;
