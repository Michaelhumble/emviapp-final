
import { useState } from 'react';
import { POLISH_THEMES } from '@/components/posting/job/jobFormSchema';
import { Briefcase, Heart, Zap, Diamond, FileText, TrendingUp, Clock, Crown, ArrowRight } from 'lucide-react';

// Placeholder for actual API call to AI service
const generatePolishedDescriptions = async (originalDescription: string): Promise<Array<{theme: string, description: string}>> => {
  // In a real implementation, this would call an AI service API
  // For now, we'll generate placeholder variations based on the original text
  
  const themes = POLISH_THEMES.map(theme => theme.id);
  
  // Simple text transformations to simulate AI variations
  return themes.map(theme => {
    let polished = originalDescription;
    
    switch(theme) {
      case 'professional':
        polished = `${originalDescription}\n\nQualifications and requirements:\n• Proven experience in the field\n• Strong attention to detail\n• Excellent customer service skills\n• Ability to work in a team environment`;
        break;
      case 'warm':
        polished = `We're not just looking for an employee - we're looking for a new member of our family!\n\n${originalDescription}\n\nOur team is supportive, friendly, and we celebrate each other's successes. We can't wait to welcome you!`;
        break;
      case 'energetic':
        polished = `READY TO CRUSH IT? 🚀\n\n${originalDescription}\n\nThis is a FAST-PACED opportunity for a MOTIVATED professional who wants to MAXIMIZE their potential and EARN what they're worth!`;
        break;
      case 'luxury':
        polished = `Join our distinguished team of elite professionals.\n\n${originalDescription}\n\nWe offer an exclusive environment that cultivates excellence and provides premium services to a discerning clientele.`;
        break;
      case 'concise':
        // Just take the first paragraph and condense
        polished = originalDescription.split('\n')[0] + '\n\nKey points:\n• Experience required\n• Competitive pay\n• Flexible schedule\n• Great team';
        break;
      case 'growth':
        polished = `${originalDescription}\n\nThis position offers significant growth potential. We invest in our team through ongoing education, mentorship, and clear paths for advancement. Join us to build your skills and career.`;
        break;
      case 'flexible':
        polished = `Work-life balance matters here.\n\n${originalDescription}\n\nWe offer flexible scheduling, a relaxed atmosphere, and understand that your life outside work is important too.`;
        break;
      case 'boss':
        polished = `Looking for a LEADER, not just an employee.\n\n${originalDescription}\n\nThis role is for professionals who take ownership, make decisions confidently, and inspire others. Show us your leadership potential.`;
        break;
      case 'artistic':
        polished = `Express your creativity and artistic vision with us!\n\n${originalDescription}\n\nWe encourage innovation, unique perspectives, and the freedom to develop your signature style while delighting clients.`;
        break;
      case 'direct':
        // Extract main points only
        polished = `THE OPPORTUNITY:\n\n• ${originalDescription.split('\n').filter(line => line.trim() !== '').join('\n• ')}\n\nInterested? Apply now.`;
        break;
      default:
        break;
    }
    
    return {
      theme: theme,
      description: polished
    };
  });
};

export const usePolishedDescriptions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [polishedVersions, setPolishedVersions] = useState<Array<{
    theme: string;
    icon: JSX.Element;
    description: string;
  }>>([]);

  const generateVersions = async (originalDescription: string) => {
    setIsLoading(true);
    try {
      const versions = await generatePolishedDescriptions(originalDescription);
      
      // Map the icon components to each theme
      const versionsWithIcons = versions.map(v => {
        const theme = POLISH_THEMES.find(t => t.id === v.theme);
        let icon;
        
        // Map theme to icon component
        switch (v.theme) {
          case 'professional':
            icon = <Briefcase className="h-4 w-4" />;
            break;
          case 'warm':
            icon = <Heart className="h-4 w-4 text-pink-500" />;
            break;
          case 'energetic':
            icon = <Zap className="h-4 w-4 text-yellow-500" />;
            break;
          case 'luxury':
            icon = <Diamond className="h-4 w-4 text-purple-500" />;
            break;
          case 'concise':
            icon = <FileText className="h-4 w-4 text-blue-500" />;
            break;
          case 'growth':
            icon = <TrendingUp className="h-4 w-4 text-green-500" />;
            break;
          case 'flexible':
            icon = <Clock className="h-4 w-4 text-teal-500" />;
            break;
          case 'boss':
            icon = <Crown className="h-4 w-4 text-amber-500" />;
            break;
          case 'artistic':
            icon = <Diamond className="h-4 w-4 text-rose-500" />;
            break;
          case 'direct':
            icon = <ArrowRight className="h-4 w-4 text-gray-500" />;
            break;
          default:
            icon = <Briefcase className="h-4 w-4" />;
        }
        
        return {
          theme: theme ? theme.label : v.theme,
          icon: icon,
          description: v.description
        };
      });
      
      setPolishedVersions(versionsWithIcons);
    } catch (error) {
      console.error("Error generating descriptions:", error);
      // Provide fallback versions if API fails
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
