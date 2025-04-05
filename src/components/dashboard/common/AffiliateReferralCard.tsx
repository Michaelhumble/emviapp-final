
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, Users, Copy, Gift } from "lucide-react";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";

const AffiliateReferralCard = () => {
  const { user, userProfile } = useAuth();
  const [copied, setCopied] = useState(false);
  
  // Generate a unique affiliate link based on user ID
  const affiliateLink = user ? 
    `https://emviapp.com/refer/${user.id.substring(0, 8)}` : 
    'https://emviapp.com/signup';
  
  const handleCopy = () => {
    navigator.clipboard.writeText(affiliateLink).then(() => {
      setCopied(true);
      toast.success("Affiliate link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Gift className="h-5 w-5 text-indigo-500" />
          Invite & Earn
        </CardTitle>
        <CardDescription>
          Share EmviApp. Help someone, earn something.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Input 
            value={affiliateLink}
            readOnly
            className="font-mono text-sm"
          />
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleCopy}
          >
            {copied ? "Copied!" : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-4 w-4 text-indigo-500" />
            <span className="text-sm font-medium">
              Referrals: {userProfile?.referral_count || 0}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Earn $5 off your next post for each friend who signs up.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AffiliateReferralCard;
