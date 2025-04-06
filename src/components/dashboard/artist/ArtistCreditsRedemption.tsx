
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, ArrowRight, Megaphone, Briefcase, ShoppingBag, Loader } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";

interface ArtistCreditsRedemptionProps {
  credits: number;
}

const ArtistCreditsRedemption = ({ credits = 0 }: ArtistCreditsRedemptionProps) => {
  const { user, refreshUserProfile } = useAuth();
  const [isProcessing, setIsProcessing] = useState<{ [key: string]: boolean }>({
    profileBoost: false,
    jobPost: false,
    marketplace: false
  });
  const [redeemSuccess, setRedeemSuccess] = useState<{ [key: string]: boolean }>({
    profileBoost: false,
    jobPost: false,
    marketplace: false
  });

  // Reset success state after a delay
  const resetSuccessState = (actionType: string) => {
    setTimeout(() => {
      setRedeemSuccess(prev => ({ ...prev, [actionType]: false }));
    }, 5000);
  };

  const handleRedeemAction = async (action: string, requiredCredits: number, actionType: string) => {
    if (!user) {
      toast.error("You must be logged in to redeem credits");
      return;
    }

    // Check if user has enough credits
    if (credits < requiredCredits) {
      toast.error(`You need ${requiredCredits} credits to use this feature. You currently have ${credits}.`);
      return;
    }

    // Set processing state
    setIsProcessing(prev => ({ ...prev, [actionType]: true }));

    try {
      // Update the user's credits in Supabase
      const { error } = await supabase
        .from('users')
        .update({ 
          credits: credits - requiredCredits,
          // Here you can add additional data based on action type
          // For example, if it's a profile boost, you might set a boost_until field
          ...(actionType === 'profileBoost' ? { profile_boosted_until: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() } : {})
        })
        .eq('id', user.id);

      if (error) {
        console.error("Error updating credits:", error);
        toast.error("Failed to redeem credits. Please try again.");
        return;
      }

      // Set success state and reset after delay
      setRedeemSuccess(prev => ({ ...prev, [actionType]: true }));
      resetSuccessState(actionType);
      
      // Refresh user profile to get updated credit balance
      await refreshUserProfile();
      
      toast.success(`Successfully redeemed ${requiredCredits} credits for ${action}!`, {
        description: `Your new balance is ${credits - requiredCredits} credits.`
      });
    } catch (err) {
      console.error("Unexpected error during redemption:", err);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setIsProcessing(prev => ({ ...prev, [actionType]: false }));
    }
  };

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
        
        <div className="grid gap-4 md:grid-cols-3">
          {/* Profile Boost Option */}
          <div className="bg-white p-4 rounded-lg border border-purple-100 hover:border-purple-300 transition-all shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <span className="text-purple-800 font-semibold">Profile Boost</span>
              <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded-full">
                10 Credits
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Promote your profile to the top of search results for 3 days
            </p>
            {redeemSuccess.profileBoost ? (
              <div className="w-full bg-green-100 text-green-800 py-2 px-3 rounded-md flex items-center justify-center">
                <span className="flex items-center font-medium">
                  ✅ Boost Activated!
                </span>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-between bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200 hover:bg-purple-200"
                disabled={credits < 10 || isProcessing.profileBoost}
                onClick={() => handleRedeemAction("Profile Boost", 10, "profileBoost")}
              >
                <div className="flex items-center">
                  {isProcessing.profileBoost ? (
                    <Loader className="h-4 w-4 mr-1 animate-spin" />
                  ) : (
                    <Megaphone className="h-4 w-4 mr-1" />
                  )}
                  {isProcessing.profileBoost ? "Processing..." : "Boost My Profile"}
                </div>
                <ArrowRight className="h-3 w-3" />
              </Button>
            )}
          </div>

          {/* Free Job Post Option */}
          <div className="bg-white p-4 rounded-lg border border-purple-100 hover:border-purple-300 transition-all shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <span className="text-purple-800 font-semibold">Free Job Post</span>
              <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded-full">
                15 Credits
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Post a job listing without paying the regular posting fee
            </p>
            {redeemSuccess.jobPost ? (
              <div className="w-full bg-green-100 text-green-800 py-2 px-3 rounded-md flex items-center justify-center">
                <span className="flex items-center font-medium">
                  ✅ Credit Applied!
                </span>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-between bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200 hover:bg-purple-200"
                disabled={credits < 15 || isProcessing.jobPost}
                onClick={() => handleRedeemAction("Free Job Post", 15, "jobPost")}
              >
                <div className="flex items-center">
                  {isProcessing.jobPost ? (
                    <Loader className="h-4 w-4 mr-1 animate-spin" />
                  ) : (
                    <Briefcase className="h-4 w-4 mr-1" />
                  )}
                  {isProcessing.jobPost ? "Processing..." : "Post a Job for Free"}
                </div>
                <ArrowRight className="h-3 w-3" />
              </Button>
            )}
          </div>

          {/* Marketplace Access Option */}
          <div className="bg-white p-4 rounded-lg border border-purple-100 transition-all shadow-sm opacity-90">
            <div className="flex justify-between items-center mb-3">
              <span className="text-purple-800 font-semibold">Marketplace Access</span>
              <span className="bg-gray-100 text-gray-500 text-xs font-medium px-2 py-1 rounded-full">
                Coming Soon
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Get exclusive access to special deals in the beauty marketplace
            </p>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-between bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200"
              disabled={true}
            >
              <div className="flex items-center">
                <ShoppingBag className="h-4 w-4 mr-1" />
                Unlock Marketplace Access
              </div>
              <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistCreditsRedemption;
