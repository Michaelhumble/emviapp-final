
import { Card, CardContent } from "@/components/ui/card";
import { Coins } from "lucide-react";
import { useAuth } from "@/context/auth";
import { creditOptions, getBoostDescription } from "./creditOptions";
import BoostStatusBanner from "./BoostStatusBanner";
import CreditOptionCard from "./CreditOptionCard";
import { useProfileBoost } from "./useProfileBoost";
import { useCreditRedemption } from "./useCreditRedemption";
import { ArtistCreditsRedemptionProps } from "./types";

const ArtistCreditsRedemption = ({ credits = 0 }: ArtistCreditsRedemptionProps) => {
  const { user, refreshUserProfile } = useAuth();
  const { boostStatus, setBoostStatus } = useProfileBoost();
  const { isProcessing, redeemSuccess, handleRedeemAction } = useCreditRedemption(
    credits,
    boostStatus,
    setBoostStatus,
    refreshUserProfile
  );

  // Update dynamic description for profile boost based on boost status
  const updatedCreditOptions = creditOptions.map(option => {
    if (option.id === "profileBoost") {
      return {
        ...option,
        description: getBoostDescription(boostStatus.isActive)
      };
    }
    return option;
  });

  return (
    <Card className="border-purple-200 bg-gradient-to-br from-white to-purple-50 shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold flex items-center">
            <Coins className="h-5 w-5 text-purple-500 mr-2" />
            Redeem Your Emvi Credits
          </h3>
          <div className="bg-purple-100 py-1 px-3 rounded-full">
            <span className="text-purple-800 font-medium flex items-center">
              <Coins className="h-4 w-4 text-purple-600 mr-1" />
              {credits} Credits Available
            </span>
          </div>
        </div>
        
        <BoostStatusBanner 
          isActive={boostStatus.isActive} 
          expiresAt={boostStatus.expiresAt} 
        />
        
        <div className="grid gap-4 md:grid-cols-3">
          {updatedCreditOptions.map(option => (
            <CreditOptionCard
              key={option.id}
              option={option}
              isSuccess={redeemSuccess[option.id]}
              isProcessing={isProcessing[option.id]}
              userCredits={credits}
              onRedeem={() => handleRedeemAction(option.title, option.creditCost, option.id)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistCreditsRedemption;
