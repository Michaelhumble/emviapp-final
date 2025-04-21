
import { Card, CardContent } from "@/components/ui/card";
import { Gift, Users, CheckCircle2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useReferralStatsDb } from "@/hooks/useReferralStatsDb";
import { useAuth } from "@/context/auth";
import { useState } from "react";

/**
 * Classy tracker showing: people invited, credits earned, your referral link (+ copy), and bonus text.
 */
const CustomerReferralTracker: React.FC = () => {
  const { userProfile } = useAuth();
  const { invitedCount, creditsEarned, loading } = useReferralStatsDb();
  const code = userProfile?.referral_code || userProfile?.id?.substring(0,8) || 'yourcode';
  const referralLink = `https://emvi.app/signup?ref=${code}`;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="max-w-xl mx-auto border-0 shadow-lg rounded-2xl bg-gradient-to-r from-violet-50 via-rose-50 to-yellow-50 my-6">
      <CardContent className="flex flex-col items-center text-center space-y-3 py-8">
        <div className="flex items-center gap-2 mb-1">
          <Gift className="text-pink-500 h-7 w-7" />
          <span className="font-bold text-xl text-primary">🎉 Invite Friends, Earn Free Credits</span>
        </div>
        <div className="text-base text-gray-700 max-w-xs">
          Share EmviApp and get <span className="font-semibold text-amber-500">+10 credits</span> when your friends join.
        </div>
        <div className="text-sm text-purple-600 italic w-full max-w-xs pb-2">
          💜 Limited-time reward — this offer may disappear soon.
        </div>
        <div className="flex items-center my-2 w-full max-w-xs bg-white border border-primary/10 rounded-lg px-3 py-2 shadow-sm">
          <Copy className="text-primary/70 mr-2 h-4 w-4" />
          <input
            className="flex-1 bg-transparent outline-none text-sm text-primary"
            value={referralLink}
            readOnly
          />
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
        </div>
        <div className="flex flex-col gap-2 pt-2 w-full">
          <div className="flex justify-center gap-8">
            <div className="flex flex-col items-center">
              <Users className="h-5 w-5 text-indigo-400" />
              <span className="text-xl font-bold text-purple-700">{loading ? "--" : invitedCount}</span>
              <span className="text-xs text-gray-600">Friends Invited</span>
            </div>
            <div className="flex flex-col items-center">
              <Gift className="h-5 w-5 text-amber-400" />
              <span className="text-xl font-bold text-amber-600">{loading ? "--" : creditsEarned}</span>
              <span className="text-xs text-gray-600">Credits Earned</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerReferralTracker;
