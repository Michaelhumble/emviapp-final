
// COMMUNITY PAGE UPDATE - Smart tooltips for locked features
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Lock, Crown, Zap } from 'lucide-react';

interface PremiumTooltipProps {
  children: React.ReactNode;
  message?: string;
  type?: 'signup' | 'premium' | 'vip';
}

const PremiumTooltips: React.FC<PremiumTooltipProps> = ({ 
  children, 
  message,
  type = 'signup'
}) => {
  const getTooltipContent = () => {
    if (message) return message;
    
    switch (type) {
      case 'premium':
        return '✨ Premium feature - Unlock by upgrading!';
      case 'vip':
        return '👑 VIP exclusive - Join our elite community!';
      default:
        return '🔓 Unlock more by signing up!';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'premium':
        return <Zap className="h-3 w-3 text-amber-500" />;
      case 'vip':
        return <Crown className="h-3 w-3 text-purple-500" />;
      default:
        return <Lock className="h-3 w-3 text-gray-500" />;
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative group cursor-help">
            {children}
            <div className="absolute top-1 right-1 opacity-60 group-hover:opacity-100 transition-opacity">
              {getIcon()}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-gray-900 text-white border border-gray-700">
          <p className="text-sm">{getTooltipContent()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PremiumTooltips;
