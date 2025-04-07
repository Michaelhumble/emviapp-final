
import { useState } from "react";
import CreditOptionCard from "./CreditOptionCard";
import { creditOptions } from "./creditOptions";
import { useAuth } from "@/context/auth";
import BoostStatusBanner from "./BoostStatusBanner";
import { useProfileBoost } from "./useProfileBoost";
import { useCreditRedemption } from "./useCreditRedemption";

// We'll remove the credits prop as we're getting it from useAuth
const ArtistCreditsRedemption = () => {
  const { userProfile, refreshUserProfile } = useAuth();
  const credits = userProfile?.credits || 0;
  
  const { 
    boostStatus, 
    loading: boostLoading, 
    error: boostError,
    activateProfileBoost
  } = useProfileBoost();
  
  const {
    isProcessing,
    redeemSuccess,
    handleRedeemAction
  } = useCreditRedemption(credits, boostStatus, refreshUserProfile);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Redeem Your Credits</h3>
      
      {/* Show boost status if active */}
      {boostStatus.isActive && (
        <BoostStatusBanner expiryDate={boostStatus.expiresAt} />
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {creditOptions.map((option) => (
          <CreditOptionCard
            key={option.id}
            title={option.title}
            description={option.description}
            cost={option.credits}
            icon={option.icon}
            isDisabled={
              credits < option.credits || 
              (option.id === 'profileBoost' && boostStatus.isActive) ||
              isProcessing[option.id]
            }
            isProcessing={isProcessing[option.id]}
            isSuccess={redeemSuccess[option.id]}
            onRedeem={() => handleRedeemAction(option.title, option.credits, option.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ArtistCreditsRedemption;
