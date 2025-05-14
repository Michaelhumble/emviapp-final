
import { useState } from 'react';

export interface PolishedDescription {
  style: string;
  text: string;
}

export const usePolishedDescriptions = () => {
  const [descriptions, setDescriptions] = useState<PolishedDescription[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Define the styles we want to generate
  const styles = [
    { name: "Professional", prompt: "professional, formal, corporate" },
    { name: "Friendly", prompt: "friendly, approachable, warm" },
    { name: "Enthusiastic", prompt: "enthusiastic, exciting, energetic" },
    { name: "Modern", prompt: "modern, contemporary, trendy" },
    { name: "Detailed", prompt: "detailed, comprehensive, thorough" },
    { name: "Concise", prompt: "concise, brief, to-the-point" },
    { name: "Casual", prompt: "casual, conversational, relaxed" },
    { name: "Premium", prompt: "premium, luxury, high-end" },
    { name: "Engaging", prompt: "engaging, interesting, captivating" },
    { name: "Supportive", prompt: "supportive, nurturing, inclusive" }
  ];

  const generatePolishedDescriptions = async (originalText: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // For now, let's simulate the API call with mock data
      // In a real implementation, this would call an API endpoint
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      
      // Generate variations for each style
      const generatedDescriptions: PolishedDescription[] = styles.map(style => {
        // In a real implementation, this would use the API response
        // Here we're just making simple modifications based on the style
        let polishedText = originalText;
        
        // Apply simple transformations based on style
        // This is just for demonstration - in production you'd use an AI service
        switch (style.name) {
          case "Professional":
            polishedText = `We are seeking a dedicated professional to join our team. ${originalText.replace(/We are looking for/gi, "Our salon is seeking")}`;
            break;
          case "Friendly":
            polishedText = `Hi there! We'd love to have you join our team! ${originalText.replace(/requirements/gi, "things we're hoping for")}`;
            break;
          case "Enthusiastic":
            polishedText = `Exciting opportunity! Join our amazing team! ${originalText} We can't wait to meet you!`;
            break;
          case "Modern":
            polishedText = `Ready to level up your career? ${originalText.replace(/experience/gi, "expertise")}`;
            break;
          case "Detailed":
            polishedText = `${originalText} Additionally, the ideal candidate will demonstrate strong time management, attention to detail, and excellent customer service skills.`;
            break;
          case "Concise":
            polishedText = originalText.split('.').slice(0, 2).join('.') + '.';
            break;
          case "Casual":
            polishedText = `Hey! We're looking for someone awesome to join us. ${originalText.replace(/applicant/gi, "you")}`;
            break;
          case "Premium":
            polishedText = `Exclusive opportunity at our luxury salon. ${originalText.replace(/job/gi, "position")}`;
            break;
          case "Engaging":
            polishedText = `Imagine working in a place where your creativity shines! ${originalText}`;
            break;
          case "Supportive":
            polishedText = `Join our inclusive and supportive team. We value your growth and well-being. ${originalText}`;
            break;
          default:
            break;
        }
        
        return {
          style: style.name,
          text: polishedText
        };
      });
      
      setDescriptions(generatedDescriptions);
    } catch (err) {
      console.error('Error generating polished descriptions:', err);
      setError('Failed to generate descriptions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generatePolishedDescriptions,
    descriptions,
    isLoading,
    error
  };
};
