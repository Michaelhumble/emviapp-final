
import React from 'react';
import { Button } from '@/components/ui/button';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Award, ChevronRight, Gift, Heart } from 'lucide-react';

interface CreditRewardsProps {
  currentCredits: number;
  loading: boolean;
  onRedeemCredit: (type: string, amount: number) => Promise<void>;
  onSupportTabClick: () => void;
}

const CreditRewards: React.FC<CreditRewardsProps> = ({ 
  currentCredits, 
  loading, 
  onRedeemCredit,
  onSupportTabClick
}) => {
  return (
    <TooltipProvider>
      {/* Redeem options */}
      <div className="grid grid-cols-1 gap-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              className="justify-between w-full"
              disabled={currentCredits < 100 || loading}
              onClick={() => onRedeemCredit('discount', 100)}
            >
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                  <Gift className="h-3 w-3 text-green-600" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-medium">$5 Booking Discount</div>
                  <div className="text-xs text-muted-foreground">100 credits</div>
                </div>
              </div>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            Trade 100 credits for a $5 discount on your next booking
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              className="justify-between w-full"
              disabled={currentCredits < 100 || loading}
              onClick={() => onRedeemCredit('giveaway', 100)}
            >
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
                  <Award className="h-3 w-3 text-purple-600" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-medium">Service Giveaway Entry</div>
                  <div className="text-xs text-muted-foreground">100 credits</div>
                </div>
              </div>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            Enter our monthly giveaway for a chance to win a free service
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              className="justify-between w-full bg-gradient-to-r from-pink-50 to-pink-100 border-pink-200 hover:bg-pink-100"
              disabled={currentCredits < 50 || loading}
              onClick={onSupportTabClick}
            >
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-pink-200 flex items-center justify-center">
                  <Heart className="h-3 w-3 text-pink-600" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-medium">Support Artists</div>
                  <div className="text-xs text-muted-foreground">Use your credits to support artists</div>
                </div>
              </div>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            Support your favorite artists by sending them credits
          </TooltipContent>
        </Tooltip>
      </div>
      
      <div className="text-center mt-5">
        <p className="text-xs text-muted-foreground">
          Redeeming credits helps support the Emvi community
        </p>
      </div>
    </TooltipProvider>
  );
};

export default CreditRewards;
