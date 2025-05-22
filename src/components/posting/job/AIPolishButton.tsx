
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface AIPolishButtonProps {
  text?: string;
  onPolish: (polishedText: string, polishedVietnameseText?: string) => void;
  industryType?: string;
}

// This component is disabled - feature has been removed
const AIPolishButton: React.FC<AIPolishButtonProps> = ({ text, onPolish, industryType = 'nails' }) => {
  // Disabled as per requirements
  return null;
};

export default AIPolishButton;
