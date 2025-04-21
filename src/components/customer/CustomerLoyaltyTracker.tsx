
import React, { useState } from "react";
import { useAuth } from "@/context/auth";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Gift, Copy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const REWARD_MILESTONE = 100;

function getNextMilestone(current: number) {
  return Math.ceil((current + 1) / REWARD_MILESTONE) * REWARD_MILESTONE;
}

// Tooltip component for simplicity
const Tooltip = ({ children, content }: { children: React.ReactNode; content: string }) => (
  <span className="relative group">
    {children}
    <span className="absolute left-1/2 bottom-full -translate-x-1/2 mb-2 pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition bg-black text-xs text-white whitespace-nowrap px-2 py-1 rounded shadow-lg">
      {content}
    </span>
  </span>
);

/**
 * Customer Loyalty Tracker with:
 * - Monthly 100 credit cap progress
 * - Banked credits overflow
 * - Referral info section
 * - Clean, upscale UI
 */
const CustomerLoyaltyTracker: React.FC = () => {
  const { userProfile } = useAuth();

  // In a real app, this should come from the backend as the sum of "earned" credits in the current month.
  // For demo purposes, simulate monthly and total credits:
  const creditsThisMonth = userProfile?.creditsThisMonth ?? 115; // Replace/mock as needed
  const totalCredits = userProfile?.credits ?? creditsThisMonth;

  // Banked credits = creditsThisMonth - 100 if > 100
  const hasBanked = creditsThisMonth > REWARD_MILESTONE;
  const bankedCredits = hasBanked ? creditsThisMonth - REWARD_MILESTONE : 0;

  const progress = Math.min((creditsThisMonth / REWARD_MILESTONE) * 100, 100);
  const reachedGoal = creditsThisMonth >= REWARD_MILESTONE;

  // Referral section (sample mock logic)
  const invitedCount = userProfile?.referral_count ?? 3;
  const referralCreditsEarned = (userProfile?.referral_count ?? 3) * 10;
  const referralCode = userProfile?.referral_code || userProfile?.id?.slice(0, 8) || "yourcode";
  const referralLink = `https://emvi.app/join?ref=${referralCode}`;
  const [copied, setCopied] = useState(false);

  // Abuse flag (just status/visual for now, not active backend logic)
  const [referralTimestamps] = useState<number[]>([Date.now()]); // mock data
  const abuseSuspected = referralTimestamps.length > 5; // in production, calculate # within last hour by timestamp

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    toast.success("Copied referral code!");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="w-full max-w-xl mx-auto my-4 px-2 sm:px-4">
      <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-0 overflow-hidden">
        {/* Loyalty Cap Section */}
        <div className="py-6 px-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-1">
            <div className="font-semibold text-lg flex items-center gap-2">
              <Gift className="h-5 w-5 text-purple-500" />
              Loyalty Tracker
            </div>
            <div className="text-amber-600 font-bold flex items-center gap-1">
              {reachedGoal && <Sparkles className="h-5 w-5 animate-pulse text-amber-400" />}
              <span>{totalCredits} credit{totalCredits === 1 ? "" : "s"}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Progress 
              value={progress}
              className="h-3 bg-primary/20 min-w-0 shadow-sm"
              indicatorClassName="bg-gradient-to-r from-amber-400 via-pink-400 to-primary"
            />
            <span className="ml-2 text-xs text-gray-600 font-semibold">{progress.toFixed(0)}%</span>
          </div>
          <div className="flex justify-between items-center text-xs sm:text-sm text-gray-500 mb-2">
            <span>
              {reachedGoal ? (
                <span className="text-amber-600 font-bold flex items-center gap-1">
                  🎉 You’ve reached this month’s 100-credit goal!
                </span>
              ) : (
                <>Next goal: <span className="font-bold text-gray-700">{REWARD_MILESTONE}</span> to unlock a free service!</>
              )}
            </span>
          </div>

          {/* Banked Credits UI (if above cap) */}
          {hasBanked && (
            <div className="flex items-center justify-between bg-gradient-to-r from-violet-50 to-pink-50 px-4 py-3 my-2 rounded-xl border border-primary/10 shadow-sm">
              <div className="text-base font-semibold text-purple-700 flex items-center gap-2">
                <Tooltip content="These bonus credits may unlock future rewards. Stay tuned!">
                  <span>
                    Banked Credits: <span className="font-bold text-green-600">+{bankedCredits}</span>
                  </span>
                </Tooltip>
              </div>
            </div>
          )}

          {/* Redeem Button (show only if total ≤ 100) */}
          {!hasBanked && (
            <div className="flex items-center pt-2">
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 shadow border-0 text-white font-semibold text-base"
                size="lg"
              >
                Redeem Credits
              </Button>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="px-5 my-4">
          <div className="h-px bg-gradient-to-r from-purple-100 via-gray-200 to-pink-100" />
        </div>

        {/* Referral & Invite Stats */}
        <div className="pb-5 px-5">
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-5 w-5 text-amber-500" />
            <span className="font-bold text-sm text-pink-700">
              Invite friends, earn rewards!
            </span>
          </div>
          <div className="flex gap-6 mb-2">
            <div className="flex flex-col text-left">
              <span className="text-xs text-gray-500">You’ve invited:</span>
              <span className="font-bold text-purple-700 text-lg">{invitedCount}</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs text-gray-500">Credits earned:</span>
              <span className="font-bold text-amber-600 text-lg">+{referralCreditsEarned}</span>
            </div>
          </div>
          <div className="flex items-center bg-gray-50 border border-gray-100 rounded-lg p-2">
            <input
              className="flex-1 bg-transparent outline-none text-base text-purple-600 font-mono font-semibold"
              value={referralCode}
              readOnly
            />
            <Tooltip content="This early access reward is part of our launch thank-you. It won’t last forever.">
              <Button
                variant="outline"
                size="sm"
                className="ml-2 border-0 bg-gradient-to-r from-pink-100 to-purple-50 shadow-none"
                onClick={handleCopyCode}
              >
                {copied ? "Copied!" : <Copy className="h-4 w-4 text-purple-600" />}
              </Button>
            </Tooltip>
          </div>
          <div className="text-xs text-gray-400 mt-2 text-right italic">
            Your referral code | <a href={referralLink} className="underline hover:text-purple-500 transition" target="_blank" rel="noopener noreferrer">
              referral link
            </a>
          </div>
        </div>

        {/* Optional abuse guard: just UI hint in demo mode */}
        {abuseSuspected && (
          <div className="p-3 bg-yellow-200 text-yellow-900 rounded-b-xl text-xs font-medium text-center animate-pulse">
            ⚠️ Unusual referral activity detected. Your account may be flagged for review.
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerLoyaltyTracker;
