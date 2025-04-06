
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditOption } from './types';
import { Badge } from '@/components/ui/badge';

interface CreditOptionCardProps {
  option: CreditOption;
  canAfford?: boolean; // Added canAfford prop
  onRedeem: (option: any) => void;
  isProcessing?: boolean;
  isSuccess?: boolean;
}

const CreditOptionCard = ({ 
  option, 
  canAfford = true, // Default to true
  onRedeem, 
  isProcessing = false,
  isSuccess = false
}: CreditOptionCardProps) => {
  const { 
    id, 
    title, 
    description, 
    creditCost, 
    icon, 
    isDisabled = false,
    actionText = "Redeem",
    comingSoon = false
  } = option;

  const handleClick = () => {
    if (!isDisabled && !isProcessing && !isSuccess && canAfford) {
      onRedeem(option);
    }
  };

  return (
    <Card className={`border overflow-hidden h-full transition-all duration-300 ${isDisabled || !canAfford ? 'opacity-70' : 'hover:shadow-md'}`}>
      <CardContent className="p-5 pt-6 flex-grow">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
            {icon}
          </div>
          <div>
            <h3 className="font-medium text-lg">{title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                {creditCost} credits
              </Badge>
              
              {comingSoon && (
                <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20">
                  Coming Soon
                </Badge>
              )}
              
              {!canAfford && !comingSoon && (
                <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-500/20">
                  Not Enough Credits
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">
          {description}
        </p>
      </CardContent>
      
      <CardFooter className="p-5 pt-0">
        <Button 
          variant={isDisabled || isSuccess || !canAfford ? "outline" : "default"}
          className="w-full"
          disabled={isDisabled || isProcessing || isSuccess || !canAfford}
          onClick={handleClick}
        >
          {isProcessing ? "Processing..." : isSuccess ? "Redeemed" : actionText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreditOptionCard;
