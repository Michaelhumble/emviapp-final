
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Copy, CheckCircle2, Mail, Sparkles } from "lucide-react";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";

const CustomerReferralPanel: React.FC = () => {
  const { userProfile } = useAuth();
  const [copied, setCopied] = useState(false);

  // Use referral_code if present, else fallback to user id short
  const code = userProfile?.referral_code || userProfile?.id?.substring(0,8) || '---';
  const referralLink = `https://emviapp.com/join?ref=${code}`;
  const credits = userProfile?.credits ?? 0;
  // Simulate history count for now, can be replaced with actual referrals
  const referralCount = userProfile?.referral_count ?? 0;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="relative shadow-lg border-0 overflow-hidden px-0 md:px-0 my-1" style={{ background: "linear-gradient(90deg, #faf0fc 0%, #f3e9fa 100%)" }}>
        {/* Gradient ribbon/banner */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-400 via-pink-400 to-pink-300" />
        <CardContent className="!p-0">
          <div className="flex flex-col sm:flex-row items-center gap-0 md:gap-8 py-7 px-4 md:px-8 relative">
            <div className="flex flex-col items-center md:items-start text-center md:text-left min-w-[150px] mb-4 md:mb-0 md:border-r md:pr-7 border-purple-100">
              {/* Icon + Title */}
              <div className="flex items-center gap-2 mb-1">
                <Gift className="text-pink-500 h-7 w-7" />
                <span className="font-bold text-lg md:text-xl text-purple-900">Invite &amp; Earn</span>
              </div>
              <div className="bg-gradient-to-r from-purple-100 to-pink-50 p-1 px-3 rounded-full text-purple-700 font-semibold text-xs mb-2 flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-pink-500" />
                Earn exclusive credits!
              </div>
              <div className="hidden md:block">
                <span className="text-xs text-gray-500">Your personal invite link</span>
              </div>
            </div>
            {/* Main content: Link/Buttons */}
            <div className="flex-1 flex flex-col gap-3 w-full">
              <div>
                <div className="text-gray-700 text-sm mb-2 text-center md:text-left">
                  Share EmviApp and get credits for each friend who signs up and books!
                </div>
                {/* Referral link input + buttons */}
                <div className="flex items-center rounded-md bg-white/90 border border-purple-100 px-2 py-2 shadow-inner">
                  <input
                    className="flex-1 outline-none bg-transparent text-sm text-gray-900 px-1 min-w-0"
                    value={referralLink}
                    readOnly
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1 text-purple-700 hover:bg-purple-100"
                    onClick={handleCopy}
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy Link
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="ml-1"
                    title="Invite by email (Coming soon)"
                    onClick={() => toast.info("Invite by email coming soon!")}
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {/* Credits & mini tracker */}
              <div className="flex flex-col md:flex-row md:gap-4 items-center mt-2">
                <div className="flex items-center gap-1 text-pink-600 font-bold text-base rounded bg-pink-50 px-3 py-1 my-1">
                  🎁 +{credits} credits
                </div>
                <span className="text-xs text-gray-500">{referralCount > 0
                  ? `You've invited ${referralCount} friend${referralCount !== 1 ? "s" : ""} already!`
                  : "Invite friends and track your rewards here!"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerReferralPanel;
