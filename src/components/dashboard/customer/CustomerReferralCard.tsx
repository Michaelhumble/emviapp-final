
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Link2, Copy, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const CustomerReferralCard: React.FC = () => {
  const { userProfile } = useAuth();
  const [copied, setCopied] = useState(false);

  // Use referral_code if present, fallback to short user id
  const code = userProfile?.referral_code || userProfile?.id?.substring(0, 8) || "yourcode";
  const referralLink = `https://emvi.app/signup?ref=${code}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-r from-violet-50 via-rose-50 to-yellow-50 mx-auto mb-6">
      <CardContent className="flex flex-col items-center text-center space-y-3 py-7">
        <div className="flex items-center gap-2 mb-1">
          <Gift className="text-pink-500 h-7 w-7" />
          <span className="font-bold text-xl text-primary">🎉 Invite Friends, Earn Free Credits</span>
        </div>
        <div className="text-base text-gray-700 max-w-xs">
          Share EmviApp and get <span className="font-semibold text-amber-500">+10 credits</span> when your friends join.
        </div>
        <div className="text-sm text-purple-600 italic w-full max-w-xs">
          💜 Limited-time reward — this offer may disappear soon.
        </div>
        <div className="flex items-center my-2 w-full max-w-xs bg-white border border-primary/10 rounded-lg px-3 py-2 shadow-sm">
          <Link2 className="text-primary/70 mr-2 h-4 w-4" />
          <input
            className="flex-1 bg-transparent outline-none text-sm text-primary"
            value={referralLink}
            readOnly
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={copied ? "outline" : "default"}
                size="sm"
                onClick={handleCopy}
                className="ml-2 flex items-center gap-1"
                aria-label="Copy referral link"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy My Link
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              This early access reward is part of our launch thank-you. It won’t last forever.
            </TooltipContent>
          </Tooltip>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerReferralCard;

