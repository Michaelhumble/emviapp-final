
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link2, Copy, Users, Gift, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/auth";

const AffiliateReferralCard = () => {
  const { userProfile } = useAuth();
  const [copied, setCopied] = useState(false);
  
  // Generate a referral code if none exists
  const referralCode = userProfile?.affiliate_code || `EMVI${Math.floor(1000 + Math.random() * 9000)}`;
  const referralLink = `https://emviapp.com/join?ref=${referralCode}`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied to clipboard");
    
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  
  return (
    <Card className="border-indigo-100">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Link2 className="h-5 w-5 text-indigo-500" />
          Affiliate Rewards
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-indigo-50 rounded-lg p-4 flex items-center justify-between mb-4">
          <div className="flex items-center text-indigo-700">
            <Gift className="h-5 w-5 mr-2" />
            <span className="font-medium">Earn Emvi Credits</span>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-indigo-700">
              {userProfile?.referral_count || 0}
            </div>
            <div className="text-xs text-gray-500">Friends Joined</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mt-4">
          <input
            value={referralLink}
            readOnly
            className="flex-1 font-mono text-xs bg-gray-50 border border-gray-200 rounded-md py-2 px-3"
          />
          <Button 
            size="sm" 
            variant="outline" 
            onClick={copyToClipboard}
          >
            {copied ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AffiliateReferralCard;
