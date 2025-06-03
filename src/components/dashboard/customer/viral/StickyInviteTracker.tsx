
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Crown, Trophy, Share2, Gift, ChevronUp, ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/auth';

const StickyInviteTracker: React.FC = () => {
  const { userProfile } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Mock data (in real app, this would come from API)
  const currentReferrals = 1;
  const nextReward = 3;
  const progress = (currentReferrals / nextReward) * 100;
  
  const topInviters = [
    { name: 'Sarah M.', referrals: 12, badge: '👑' },
    { name: 'Alex K.', referrals: 8, badge: '🏆' },
    { name: 'Mia R.', referrals: 6, badge: '⭐' },
    { name: 'You', referrals: currentReferrals, badge: '💎', isUser: true },
  ];

  const handleShare = () => {
    const referralLink = `https://emviapp.com/join?ref=${userProfile?.referral_code || 'beauty2024'}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Join me on EmviApp!',
        text: 'I found the most amazing beauty platform! Join me and get credits 💎',
        url: referralLink
      });
    } else {
      navigator.clipboard.writeText(referralLink);
    }
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 2 }}
    >
      <Card className="w-80 shadow-xl bg-gradient-to-r from-purple-600 to-pink-600 border-0 text-white overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span className="font-semibold">Invite Progress</span>
              <Badge className="bg-white/20 text-white">
                {currentReferrals}/{nextReward}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-white hover:bg-white/10 h-8 w-8 p-0"
            >
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            </Button>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Next reward in {nextReward - currentReferrals} friends</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2 bg-white/20" />
            </div>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-3"
                >
                  <div className="bg-white/10 rounded-lg p-3">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Trophy className="h-4 w-4" />
                      Top Inviters This Month
                    </h4>
                    <div className="space-y-1">
                      {topInviters.slice(0, 3).map((inviter, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2">
                            <span>{inviter.badge}</span>
                            <span className={inviter.isUser ? 'font-bold' : ''}>
                              {inviter.name}
                            </span>
                          </span>
                          <span className="opacity-90">{inviter.referrals} friends</span>
                        </div>
                      ))}
                      <div className="text-center pt-2 border-t border-white/20">
                        <span className="text-xs opacity-75">
                          Your rank: #4 • Keep climbing! 🚀
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-500/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Gift className="h-4 w-4 text-amber-300" />
                      <span className="font-medium text-amber-100">Next Reward</span>
                    </div>
                    <p className="text-sm text-amber-100">
                      VIP Status + 100 Credits + Priority Booking
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              onClick={handleShare}
              className="w-full bg-white text-purple-600 hover:bg-gray-100 font-medium"
              size="sm"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Invite Friends Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StickyInviteTracker;
