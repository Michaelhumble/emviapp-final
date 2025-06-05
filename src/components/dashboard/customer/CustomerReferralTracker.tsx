
import { Card, CardContent } from "@/components/ui/card";
import { Gift, Users, CheckCircle2, Copy, Sparkles, Crown, Timer, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useReferralStatsDb } from "@/hooks/useReferralStatsDb";
import { useAuth } from "@/context/auth";
import { useState } from "react";
import { motion } from "framer-motion";

/**
 * Hero referral section with maximum FOMO and visibility - the bridge feature
 */
const CustomerReferralTracker: React.FC = () => {
  const { userProfile } = useAuth();
  const { invitedCount, creditsEarned, loading } = useReferralStatsDb();
  const code = userProfile?.referral_code || userProfile?.id?.substring(0,8) || 'yourcode';
  const referralLink = `https://emvi.app/signup?ref=${code}`;
  const [copied, setCopied] = useState(false);

  // Mock progress data - replace with real data later
  const nextMilestone = 10;
  const progressPercent = (invitedCount / nextMilestone) * 100;
  const remainingInvites = Math.max(0, nextMilestone - invitedCount);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied! Share it to earn credits 🎉");
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="w-full">
      {/* Main Hero Referral Card */}
      <Card className="relative overflow-hidden border-0 shadow-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 via-pink-600/90 to-rose-500/90" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
        
        <CardContent className="relative p-8 text-white">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Left Side - Hero Message */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center lg:justify-start gap-2 mb-4"
              >
                <Crown className="h-8 w-8 text-yellow-300" />
                <h2 className="text-3xl lg:text-4xl font-bold">
                  Be the Bridge! 🌉
                </h2>
              </motion.div>
              
              <p className="text-xl mb-4 text-white/90">
                Help artists & salon owners discover EmviApp. Every friend you invite strengthens our beauty community!
              </p>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-6">
                <Badge className="bg-yellow-400 text-yellow-900 font-bold px-4 py-2">
                  <Gift className="h-4 w-4 mr-2" />
                  +10 Credits per Signup
                </Badge>
                <Badge className="bg-emerald-400 text-emerald-900 font-bold px-4 py-2">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  +50 Credits when they book
                </Badge>
              </div>

              {/* FOMO Timer */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 text-yellow-300 mb-2">
                  <Timer className="h-5 w-5" />
                  <span className="font-semibold">Limited Time: Triple Rewards!</span>
                </div>
                <p className="text-sm text-white/80">
                  Invite 10 friends in the next 30 days and unlock exclusive VIP perks. Only {remainingInvites} more to go!
                </p>
              </div>
            </div>

            {/* Right Side - Stats & Action */}
            <div className="lg:w-96 w-full">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                {/* Progress Section */}
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold mb-2">{loading ? "--" : invitedCount}</div>
                  <div className="text-white/80 mb-4">Friends Invited</div>
                  
                  <Progress value={progressPercent} className="h-3 bg-white/20 mb-2" />
                  <div className="text-sm text-white/70">
                    {remainingInvites} more invites to unlock VIP status
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-300">{loading ? "--" : creditsEarned}</div>
                    <div className="text-xs text-white/70">Credits Earned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-300">
                      {Math.min(Math.floor(progressPercent), 100)}%
                    </div>
                    <div className="text-xs text-white/70">To VIP Status</div>
                  </div>
                </div>

                {/* Referral Link */}
                <div className="bg-white rounded-lg p-4">
                  <div className="text-gray-700 text-sm mb-2 font-medium">Your Referral Link:</div>
                  <div className="flex items-center gap-2">
                    <input
                      className="flex-1 bg-gray-50 border rounded px-3 py-2 text-sm text-gray-800 truncate"
                      value={referralLink}
                      readOnly
                    />
                    <Button
                      onClick={handleCopy}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2"
                    >
                      {copied ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Share Actions */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-purple-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-4 text-center">
            <Sparkles className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-800 mb-1">Share on Social</h3>
            <p className="text-sm text-gray-600 mb-3">Post your link on Instagram, Facebook & TikTok</p>
            <Button variant="outline" size="sm" className="w-full">
              Share Now
            </Button>
          </CardContent>
        </Card>

        <Card className="border-pink-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-pink-500 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-800 mb-1">Text Friends</h3>
            <p className="text-sm text-gray-600 mb-3">Send direct messages to your beauty-loving friends</p>
            <Button variant="outline" size="sm" className="w-full">
              Send Messages
            </Button>
          </CardContent>
        </Card>

        <Card className="border-rose-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-4 text-center">
            <Gift className="h-8 w-8 text-rose-500 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-800 mb-1">Email Invite</h3>
            <p className="text-sm text-gray-600 mb-3">Send personalized invitations via email</p>
            <Button variant="outline" size="sm" className="w-full">
              Send Emails
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerReferralTracker;
