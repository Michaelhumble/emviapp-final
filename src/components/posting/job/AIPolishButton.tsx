
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from '@/components/ui/popover';
import { Wand2, Loader2 } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { aiPolishSuggestions, aiPolishSuggestionsVietnamese, IndustryType } from './jobTemplates';

interface AIPolishButtonProps {
  industryType?: IndustryType;
  onSelectSuggestion: (suggestion: string) => void;
}

const AIPolishButton: React.FC<AIPolishButtonProps> = ({ 
  industryType, 
  onSelectSuggestion 
}) => {
  const { t, isVietnamese } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSelectSuggestion = (suggestion: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      onSelectSuggestion(suggestion);
      setIsLoading(false);
    }, 500);
  };
  
  const getSuggestions = () => {
    if (!industryType) return [];
    
    return isVietnamese 
      ? aiPolishSuggestionsVietnamese[industryType] 
      : aiPolishSuggestions[industryType];
  };
  
  const suggestions = getSuggestions();
  
  if (!industryType) {
    return null;
  }
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1 text-xs bg-white hover:bg-purple-50 hover:text-purple-700 border-purple-100"
        >
          <Wand2 className="h-3 w-3" />
          {t("Polish with AI")}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-3 bg-gradient-to-r from-purple-50 to-indigo-50 border-b">
          <h4 className="font-medium text-sm text-gray-800">
            {t("AI Content Enhancement")}
          </h4>
          <p className="text-xs text-gray-600">
            {t("Select a suggestion to enhance your job description")}
          </p>
        </div>
        
        <div className="max-h-[300px] overflow-y-auto py-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors flex items-center gap-2"
              onClick={() => handleSelectSuggestion(suggestion)}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Wand2 className="h-3 w-3 text-purple-500" />
              )}
              {suggestion}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AIPolishButton;
