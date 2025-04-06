
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditOption } from './types';
import { Badge } from '@/components/ui/badge';

interface CreditOptionCardProps {
  option: CreditOption;
  onRedeem: (optionId: string) => void;
  isLoading?: boolean;
  isRedeemed?: boolean;
}

const CreditOptionCard = ({ 
  option, 
  onRedeem, 
  isLoading = false,
  isRedeemed = false
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
    if (!isDisabled && !isLoading && !isRedeemed) {
      onRedeem(id);
    }
  };

  return (
    <Card className={`border overflow-hidden h-full transition-all duration-300 ${isDisabled ? 'opacity-70' : 'hover:shadow-md'}`}>
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
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">
          {description}
        </p>
      </CardContent>
      
      <CardFooter className="p-5 pt-0">
        <Button 
          variant={isDisabled || isRedeemed ? "outline" : "default"}
          className="w-full"
          disabled={isDisabled || isLoading || isRedeemed}
          onClick={handleClick}
        >
          {isLoading ? "Processing..." : isRedeemed ? "Redeemed" : actionText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreditOptionCard;
