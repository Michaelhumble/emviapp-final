
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, ArrowRight, Megaphone, Briefcase, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

interface ArtistCreditsRedemptionProps {
  credits: number;
}

const ArtistCreditsRedemption = ({ credits = 0 }: ArtistCreditsRedemptionProps) => {
  const [isRedeeming, setIsRedeeming] = useState(false);

  const handleRedeemAction = (action: string, requiredCredits: number) => {
    setIsRedeeming(true);
    
    // Simulate API call
    setTimeout(() => {
      if (credits >= requiredCredits) {
        toast.success(`Initiated: ${action}`);
        // In a real implementation, we would call an API to perform the redemption
      } else {
        toast.error("Not enough credits for this action");
      }
      setIsRedeeming(false);
    }, 600);
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
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-between bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200 hover:bg-purple-200"
              disabled={credits < 10 || isRedeeming}
              onClick={() => handleRedeemAction("Profile Boost", 10)}
            >
              <div className="flex items-center">
                <Megaphone className="h-4 w-4 mr-1" />
                Boost My Profile
              </div>
              <ArrowRight className="h-3 w-3" />
            </Button>
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
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-between bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200 hover:bg-purple-200"
              disabled={credits < 15 || isRedeeming}
              onClick={() => handleRedeemAction("Free Job Post", 15)}
            >
              <div className="flex items-center">
                <Briefcase className="h-4 w-4 mr-1" />
                Post a Job for Free
              </div>
              <ArrowRight className="h-3 w-3" />
            </Button>
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
