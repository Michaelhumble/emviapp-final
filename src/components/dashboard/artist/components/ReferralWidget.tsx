
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useReferralSystem } from '@/hooks/useReferralSystem';
import { Users, Sparkles, Clipboard, Link, CheckCircle2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const ReferralWidget = () => {
  const { referralStats, referralProgress, referralLink, copyReferralLink } = useReferralSystem();
  const [copied, setCopied] = useState(false);

  // Handle copy
  const handleCopy = () => {
    copyReferralLink();
    setCopied(true);
    toast.success("Referral link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card className="overflow-hidden border-none shadow-lg">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Sparkles className="h-6 w-6 mr-2 text-yellow-300" />
              <h3 className="text-xl font-medium">Grow Your Network</h3>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge variant="secondary" className="bg-white/20 text-white border-none">
                {referralStats.earnedCredits} credits
              </Badge>
            </motion.div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/90">Referral Progress</span>
              <span className="text-sm font-medium">{referralStats.completedReferrals}/{referralProgress.nextMilestone}</span>
            </div>
            <Progress 
              value={(referralStats.completedReferrals / referralProgress.nextMilestone) * 100} 
              className="h-2 bg-white/20" 
            />
            <p className="mt-2 text-sm text-white/80">
              {referralProgress.nextMilestoneIn > 0 
                ? `${referralProgress.nextMilestoneIn} more to reach the next reward`
                : "You've reached a milestone! Claim your reward."}
            </p>
          </div>

          <div className="mt-4 relative">
            <div className="flex">
              <div className="bg-white/10 rounded-l-md p-3 flex-1 truncate border border-white/20 text-sm">
                {referralLink}
              </div>
              <Button 
                variant="secondary" 
                className="rounded-l-none bg-white hover:bg-white/90 text-purple-600"
                onClick={handleCopy}
              >
                {copied ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <Clipboard className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ReferralWidget;
