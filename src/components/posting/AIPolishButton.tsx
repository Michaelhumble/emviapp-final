
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface AIPolishButtonProps {
  text: string;
  onPolish: (polishedText: string) => void;
  context: string;
}

const AIPolishButton: React.FC<AIPolishButtonProps> = ({ text, onPolish, context }) => {
  const { t } = useTranslation();
  
  // This component is currently disabled as per requirements
  // "Do not include any "Polish with AI" or auto-generate description logic"
  return null;
};

export default AIPolishButton;
