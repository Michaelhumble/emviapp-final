
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BadgePercent, Copy, Users, TrendingUp, DollarSign, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReferralSystem } from "@/hooks/useReferralSystem";
import { toast } from "sonner";
import ReferralLink from "./ReferralLink";
import ReferralStats from "./ReferralStats";
import ReferralHeader from "./ReferralHeader";

const SalonReferralPanel = () => {
  const { loading, referralCode, referralLink, referralStats, copied, copyReferralLink } = useReferralSystem();
  const [expanded, setExpanded] = useState(false);

  if (loading) {
    return (
      <Card className="animate-pulse">
        <CardHeader className="pb-2">
          <div className="h-5 w-36 bg-gray-200 rounded"></div>
        </CardHeader>
        <CardContent>
          <div className="h-20 bg-gray-100 rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border-blue-100">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <ReferralHeader />
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
          <div className="flex-1 space-y-2">
            <h3 className="text-sm font-medium">Your Referral Statistics</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <div className="bg-blue-50 p-2 rounded-md">
                <div className="flex items-center gap-1 text-blue-700">
                  <Users className="h-4 w-4" />
                  <span className="text-xs">Referrals</span>
                </div>
                <p className="text-lg font-semibold">{referralStats?.completedReferrals || 0}</p>
              </div>
              
              <div className="bg-green-50 p-2 rounded-md">
                <div className="flex items-center gap-1 text-green-700">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-xs">Credits</span>
                </div>
                <p className="text-lg font-semibold">{referralStats?.credits || 0}</p>
              </div>
              
              <div className="bg-amber-50 p-2 rounded-md">
                <div className="flex items-center gap-1 text-amber-700">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-xs">Earnings</span>
                </div>
                <p className="text-lg font-semibold">${referralStats?.estimatedEarnings || 0}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-2 border-t border-blue-100">
          <ReferralLink
            referralLink={referralLink}
            onCopy={copyReferralLink}
            copied={copied}
          />
        </div>
        
        {expanded && (
          <div className="pt-3 border-t border-blue-100">
            <ReferralStats referralCount={referralStats?.completedReferrals || 0} />
          </div>
        )}
        
        <div className="bg-blue-50 p-3 rounded-md text-center">
          <p className="text-sm text-blue-700">
            Invite other salons or artists — get rewarded every time.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonReferralPanel;
