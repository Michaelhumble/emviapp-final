
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useTranslation } from '@/hooks/useTranslation';
import PremiumFeatureGate from '@/components/upgrade/PremiumFeatureGate';
import { UpgradeFeature } from '@/hooks/useUpgradePrompt';

interface AIPolishButtonProps {
  onPolish?: (polishedText: string) => void;
}

const AIPolishButton: React.FC<AIPolishButtonProps> = ({ onPolish }) => {
  const { t } = useTranslation();
  const [isPolishing, setIsPolishing] = useState(false);
  
  const handlePolish = async () => {
    setIsPolishing(true);
    
    // Simulate AI polishing (in a real implementation, this would call an API)
    setTimeout(() => {
      setIsPolishing(false);
      
      // If onPolish callback is provided, call it with the "polished" text
      if (onPolish) {
        const polishedText = "We're seeking an experienced professional to join our team. You'll be working in a modern, friendly environment with competitive compensation and opportunities for growth. We value skills, dedication, and a positive attitude.";
        onPolish(polishedText);
      }
    }, 1500);
  };
  
  return (
    <PremiumFeatureGate feature={"ai_polish" as UpgradeFeature}>
      <Button 
        size="sm" 
        variant="outline" 
        onClick={handlePolish} 
        disabled={isPolishing}
        className="text-xs h-8 px-2.5"
      >
        <Sparkles className="h-3.5 w-3.5 mr-1" />
        {isPolishing ? t({
          english: "Polishing...",
          vietnamese: "Đang làm bóng..."
        }) : t({
          english: "Polish with AI",
          vietnamese: "Làm bóng với AI"
        })}
      </Button>
    </PremiumFeatureGate>
  );
};

export default AIPolishButton;
