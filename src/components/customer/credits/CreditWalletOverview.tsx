
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp, Heart, Gift } from 'lucide-react';
import { CreditStats } from './types';

interface CreditWalletOverviewProps {
  currentCredits?: number;
  progressPercentage?: number;
  rewardsAvailable?: number;
  stats: CreditStats;
  onRedeemClick?: () => void;
}

const CreditWalletOverview: React.FC<CreditWalletOverviewProps> = ({
  currentCredits = 0,
  progressPercentage = 0,
  rewardsAvailable = 0,
  stats,
  onRedeemClick = () => {}
}) => {
  return (
    <div>
      {/* Progress tracker */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2 text-sm">
          <span>Progress to next reward</span>
          <span className="font-medium">{currentCredits % 100}/100 credits</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
        
        {rewardsAvailable > 0 && (
          <div className="mt-3 p-2 bg-pink-50 border border-pink-100 rounded-md text-sm text-pink-700 flex justify-between items-center">
            <span className="flex items-center">
              <Gift className="h-4 w-4 mr-2" />
              You have {rewardsAvailable} reward{rewardsAvailable > 1 ? 's' : ''} available!
            </span>
            <Button 
              size="sm" 
              variant="outline" 
              className="h-7 text-xs border-pink-200 hover:bg-pink-100"
              onClick={onRedeemClick}
            >
              Redeem Now
            </Button>
          </div>
        )}
      </div>
      
      <div className="text-sm text-muted-foreground mb-4">
        Bạn có {currentCredits} điểm Emvi
      </div>
      
      {/* Credit statistics */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mb-2">
            <ArrowDown className="h-4 w-4 text-green-600" />
          </div>
          <div className="text-xl font-medium text-green-600">{stats.earned}</div>
          <div className="text-xs text-muted-foreground">Earned</div>
        </div>
        
        <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
          <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mb-2">
            <Heart className="h-4 w-4 text-amber-600" />
          </div>
          <div className="text-xl font-medium text-amber-600">{stats.supported}</div>
          <div className="text-xs text-muted-foreground">Supported</div>
        </div>
        
        <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
          <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mb-2">
            <ArrowUp className="h-4 w-4 text-red-600" />
          </div>
          <div className="text-xl font-medium text-red-600">{stats.spent}</div>
          <div className="text-xs text-muted-foreground">Spent</div>
        </div>
      </div>
    </div>
  );
};

export default CreditWalletOverview;
