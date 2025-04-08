
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, ArrowUpRight, Users } from "lucide-react";
import { UserProfile } from "@/types/profile";
import { useState } from "react";
import { toast } from "sonner";

interface ArtistReferralSectionProps {
  profileData?: UserProfile | null;
}

const ArtistReferralSection = ({ profileData }: ArtistReferralSectionProps) => {
  const [isCopying, setIsCopying] = useState(false);
  
  // If the profile has a referral_code, use it; otherwise, use a placeholder
  const referralCode = profileData?.referral_code || "EMVI1234";
  const referralCount = profileData?.referral_count || 0;
  
  const handleCopyLink = async () => {
    setIsCopying(true);
    try {
      const referralLink = `https://emviapp.com/join?ref=${referralCode}`;
      await navigator.clipboard.writeText(referralLink);
      toast.success("Referral link copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy link. Please try again.");
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <Card className="border-purple-100">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-white pb-2">
        <CardTitle className="font-serif text-lg text-purple-700 flex items-center">
          <Users className="h-5 w-5 mr-2 text-purple-500" />
          Referral Program
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <div className="bg-purple-50 p-4 rounded-lg mb-5">
          <h3 className="font-medium text-purple-800 mb-1">Your Referral Code</h3>
          <div className="flex justify-between items-center">
            <div className="bg-white px-3 py-1.5 rounded border border-purple-100 font-mono text-lg text-purple-700">
              {referralCode}
            </div>
            <Button 
              size="sm" 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={handleCopyLink}
              disabled={isCopying}
            >
              <Share2 className="h-3.5 w-3.5 mr-1" />
              Share
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-sm text-gray-500">Total Referrals</h4>
              <p className="text-2xl font-semibold text-gray-800">{referralCount}</p>
            </div>
            <div>
              <h4 className="text-sm text-gray-500">Potential Earnings</h4>
              <p className="text-2xl font-semibold text-gray-800">${referralCount * 5}</p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">Refer 5 Clients</h4>
                <p className="text-xs text-gray-500">Get $25 credit</p>
              </div>
              <div className="text-xs text-purple-600">
                {referralCount}/5 completed
              </div>
            </div>
            {/* Progress bar */}
            <div className="h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-purple-500 rounded-full" 
                style={{ width: `${Math.min((referralCount / 5) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
          
          <Button 
            variant="link" 
            className="text-purple-600 p-0 h-auto text-sm w-full justify-end"
          >
            View Referral History
            <ArrowUpRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistReferralSection;
