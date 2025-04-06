
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import CreditOptionCard from './CreditOptionCard';
import { creditOptions } from './creditOptions';
import { ArtistCreditsRedemptionProps } from './types';
import { useProfileBoost } from './useProfileBoost';
import { useCreditRedemption } from './useCreditRedemption';
import BoostStatusBanner from './BoostStatusBanner';
import { toast } from 'sonner';

const ArtistCreditsRedemption = ({ credits = 0 }: ArtistCreditsRedemptionProps) => {
  const [redeemedActions, setRedeemedActions] = useState<Record<string, boolean>>({});
  const { activateBoost, checkBoostStatus, isBoostLoading } = useProfileBoost();
  const { redeemCredits, isRedeeming } = useCreditRedemption();
  const [boostStatus, setBoostStatus] = useState<{ isActive: boolean; expiresAt: string | null }>({
    isActive: false,
    expiresAt: null
  });

  // Check boost status on mount
  React.useEffect(() => {
    const checkStatus = async () => {
      const status = await checkBoostStatus();
      setBoostStatus({
        isActive: status.isActive,
        expiresAt: status.daysRemaining > 0 ? 
          new Date(Date.now() + status.daysRemaining * 24 * 60 * 60 * 1000).toISOString() : 
          null
      });
    };
    
    checkStatus();
  }, [checkBoostStatus]);

  const handleRedeemOption = async (optionId: string) => {
    const option = creditOptions.find(opt => opt.id === optionId);
    
    if (!option) return;
    
    if (credits < option.creditCost) {
      toast.error("Not enough credits to redeem this option");
      return;
    }
    
    if (optionId === 'profile-boost') {
      try {
        const success = await activateBoost(7); // 7 days
        
        if (success) {
          const success = await redeemCredits(option.creditCost);
          if (success) {
            setRedeemedActions(prev => ({ ...prev, [optionId]: true }));
            toast.success("Profile boost activated successfully!");
            
            // Update boost status
            setBoostStatus({
              isActive: true,
              expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
            });
          }
        }
      } catch (error) {
        toast.error("Failed to activate profile boost");
      }
    }
  };

  return (
    <div className="space-y-6">
      {boostStatus.isActive && boostStatus.expiresAt && (
        <BoostStatusBanner expiresAt={boostStatus.expiresAt} />
      )}
      
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Redeem Your Credits</h2>
            <div className="bg-primary/10 text-primary font-semibold px-3 py-1 rounded-md">
              {credits} Credits Available
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {creditOptions.map(option => (
              <CreditOptionCard
                key={option.id}
                option={option}
                onRedeem={handleRedeemOption}
                isLoading={isRedeeming || (option.id === 'profile-boost' && isBoostLoading)}
                isRedeemed={
                  option.id === 'profile-boost' 
                    ? boostStatus.isActive 
                    : redeemedActions[option.id]
                }
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArtistCreditsRedemption;
