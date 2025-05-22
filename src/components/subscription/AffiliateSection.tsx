
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ClipboardCopy, Gift, Share2, Trophy } from "lucide-react";
import { useAuth } from "@/context/auth";
import { useState } from "react";
import { toast } from "sonner";

const AffiliateSection = () => {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  
  // Generate a referral code based on user ID
  const referralCode = user?.id 
    ? `EMV${user.id.substring(0, 6).toUpperCase()}` 
    : 'EMVIAFF';
  
  // Generate referral link
  const referralLink = `${window.location.origin}/signup?ref=${referralCode}`;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join EmviApp',
        text: 'Join me on EmviApp, the platform for nail industry professionals!',
        url: referralLink
      })
      .catch((error) => console.log('Error sharing:', error));
    } else {
      handleCopy();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-purple-500" />
            Refer & Earn
          </CardTitle>
          <CardDescription>
            Invite friends and earn rewards when they join
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-purple-50 rounded-lg text-center space-y-2">
            <p className="text-sm font-medium">Your referral link</p>
            <div className="flex">
              <Input 
                value={referralLink} 
                readOnly 
                className="bg-white text-sm"
              />
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-2 flex-shrink-0"
                onClick={handleCopy}
              >
                <ClipboardCopy className="h-4 w-4 mr-1" />
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button 
              variant="secondary" 
              className="w-full sm:w-auto"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Your Link
            </Button>
          </div>
          
          <div className="border-t pt-4 mt-2">
            <h4 className="font-medium mb-3 flex items-center">
              <Trophy className="h-4 w-4 text-amber-500 mr-2" />
              Rewards Program
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-green-600 font-medium mr-2">•</span>
                <span>Get $10 credit for each new user who subscribes</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 font-medium mr-2">•</span>
                <span>Your referrals get 10% off their first month</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 font-medium mr-2">•</span>
                <span>Unlock additional perks after 5+ successful referrals</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AffiliateSection;
