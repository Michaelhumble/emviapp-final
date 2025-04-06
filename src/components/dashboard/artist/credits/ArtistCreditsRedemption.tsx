
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RocketIcon } from "lucide-react";
import CreditOptionCard from "./CreditOptionCard";
import { creditOptions } from "./creditOptions";
import { ArtistCreditsRedemptionProps } from "./types";
import { useProfileBoost } from "./useProfileBoost";
import { useCreditRedemption } from "./useCreditRedemption";
import BoostStatusBanner from "./BoostStatusBanner";
import PostJobButton from "./PostJobButton";

const ArtistCreditsRedemption = ({ credits = 0 }: ArtistCreditsRedemptionProps) => {
  const { boostStatus, setBoostStatus, activateBoost, isBoostLoading } = useProfileBoost();
  const { isProcessing, redeemSuccess, handleRedeemAction, redeemCredits, isRedeeming } = useCreditRedemption();
  const [redeemError, setRedeemError] = useState<string | null>(null);

  // Handle credit redemption for profile boost
  const handleProfileBoost = async (option: any) => {
    const { id, creditCost } = option;
    
    if (credits < creditCost) {
      setRedeemError("You don't have enough credits for this action");
      setTimeout(() => setRedeemError(null), 3000);
      return;
    }
    
    try {
      setRedeemError(null);
      
      // Handle profile boost specifically - 7 days
      if (id === 'profile-boost') {
        const boostDays = 7; // Standard 7-day boost
        
        // First redeem the credits
        const redeemed = await redeemCredits(id, creditCost, boostDays, 'profile_boost');
        
        if (redeemed) {
          // Then activate the boost
          const activated = await activateBoost(boostDays);
          
          if (activated) {
            // Update the boost status on success
            setBoostStatus(prev => ({
              ...prev,
              isActive: true,
              // Calculate new expiration date (7 days from now)
              expiresAt: new Date(Date.now() + (boostDays * 24 * 60 * 60 * 1000)).toISOString(),
              daysRemaining: boostDays
            }));
          }
        }
      } else {
        // For other redemption options
        await handleRedeemAction(id, creditCost, option.id);
      }
    } catch (error) {
      console.error("Error redeeming credits:", error);
      setRedeemError("Failed to redeem credits. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-4xl">
      {/* Error message */}
      {redeemError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {redeemError}
        </div>
      )}
      
      {/* Boost Status Banner */}
      {boostStatus.isActive && boostStatus.expiresAt && (
        <BoostStatusBanner 
          isActive={boostStatus.isActive} 
          expiresAt={boostStatus.expiresAt}
          daysRemaining={boostStatus.daysRemaining}
        />
      )}
      
      {/* Current Credits Card */}
      <Card className="mb-6 bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">Your Credit Balance</h3>
              <p className="text-gray-600">Use your credits to boost your profile and increase visibility</p>
            </div>
            <div className="bg-white px-4 py-3 rounded-lg shadow-sm border border-amber-100">
              <div className="flex items-center">
                <Badge variant="outline" className="font-bold text-2xl bg-amber-50 text-amber-700 px-2 py-1 mr-2">
                  {credits}
                </Badge>
                <span className="text-amber-800 font-medium">Credits</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Post Job Button Card */}
      <Card className="mb-6 bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="bg-indigo-100 p-2 rounded-full">
              <RocketIcon className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1">Post a Job for Free!</h3>
              <p className="text-gray-600 mb-4">Looking for new opportunities? Use your credits to post a job request and get seen by salon owners.</p>
              
              <PostJobButton />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Credit Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {creditOptions.map((option) => (
          <CreditOptionCard
            key={option.id}
            option={option}
            canAfford={credits >= option.creditCost}
            onRedeem={handleProfileBoost}
            isProcessing={isRedeeming(option.id) || isBoostLoading}
            isSuccess={redeemSuccess[option.id] || false}
          />
        ))}
      </div>
    </div>
  );
};

export default ArtistCreditsRedemption;
