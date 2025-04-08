
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Copy, Check, Gift } from "lucide-react";
import { UserProfile } from "@/types/profile";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface ArtistReferralSectionProps {
  profileData?: UserProfile;
}

const ArtistReferralSection = ({ profileData }: ArtistReferralSectionProps) => {
  const [copied, setCopied] = useState(false);
  
  // Get referral code from profile or generate a placeholder
  const referralCode = profileData?.affiliate_code || 
                       profileData?.referral_code || 
                       `EMVI${Math.floor(1000 + Math.random() * 9000)}`;
                       
  // Get referral count from profile or default to 0
  const referralCount = profileData?.referral_count || 0;
  
  // Progress to next tier (sample logic)
  const nextTierThreshold = 5;
  const progress = Math.min(100, (referralCount / nextTierThreshold) * 100);
  
  const handleCopyReferralLink = () => {
    const referralLink = `https://emviapp.com/join?ref=${referralCode}`;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied to clipboard!");
    
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  
  return (
    <Card className="border-purple-100 overflow-hidden">
      <CardHeader className="bg-purple-50/50 border-b border-purple-100 pb-4">
        <CardTitle className="text-xl flex items-center text-purple-900">
          <Users className="h-5 w-5 mr-2 text-purple-600" />
          Referral Stats
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="bg-gradient-to-r from-purple-100/60 to-pink-100/60 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-purple-900 mb-2">Your Referral Code</h4>
          <div className="flex items-center bg-white rounded-lg border border-purple-200 overflow-hidden">
            <div className="px-3 py-2 font-mono text-lg font-bold flex-1 text-center text-purple-700">
              {referralCode}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-full rounded-l-none px-3 bg-purple-50 hover:bg-purple-100 text-purple-700"
              onClick={handleCopyReferralLink}
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Referrals</span>
            <span className="text-sm text-purple-700 font-medium">
              {referralCount} / {nextTierThreshold}
            </span>
          </div>
          <Progress value={progress} className="h-2 bg-purple-100" />
          <p className="text-xs text-gray-500">
            {nextTierThreshold - referralCount} more referrals until you unlock the next reward tier!
          </p>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
          <div className="flex items-start">
            <div className="bg-purple-100 rounded-full p-2 mr-3">
              <Gift className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-medium text-purple-900 mb-1">Rewards Available</h4>
              <ul className="text-sm space-y-2">
                <li className="flex items-center">
                  <span className="mr-2 text-xs bg-purple-200 text-purple-800 px-1.5 py-0.5 rounded-full">
                    2 credits
                  </span>
                  <span>Profile boost for 1 week</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <span className="mr-2 text-xs bg-gray-200 px-1.5 py-0.5 rounded-full">
                    5 credits
                  </span>
                  <span>Featured artist spotlight</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <Button
          variant="outline"
          className="w-full mt-4 border-purple-200 text-purple-800 hover:bg-purple-50"
          onClick={handleCopyReferralLink}
        >
          <Users className="h-4 w-4 mr-2" />
          Share Your Referral Link
        </Button>
      </CardContent>
    </Card>
  );
};

export default ArtistReferralSection;
