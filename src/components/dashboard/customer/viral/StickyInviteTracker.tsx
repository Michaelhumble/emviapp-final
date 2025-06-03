
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Crown, Trophy, Share2, Gift, ChevronUp, ChevronDown, X } from 'lucide-react';
import { useAuth } from '@/context/auth';

const StickyInviteTracker: React.FC = () => {
  const { userProfile } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasUserDismissed, setHasUserDismissed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  
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

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide card if user scrolls down more than 50px
      if (currentScrollY > lastScrollY.current + 50 && isVisible && !hasUserDismissed) {
        setIsVisible(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible, hasUserDismissed]);

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node) && isVisible) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isVisible]);

  // Reset visibility on new invites or milestones (in real app, this would be triggered by actual events)
  useEffect(() => {
    // This would be connected to actual invite/milestone events
    // For now, we reset on component mount to simulate refresh behavior
    const hasNewActivity = false; // This would come from props or context
    if (hasNewActivity) {
      setIsVisible(true);
      setHasUserDismissed(false);
    }
  }, [currentReferrals]); // This would track actual referral changes

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

  const handleClose = () => {
    setIsVisible(false);
    setHasUserDismissed(true);
  };

  const handleShowCard = () => {
    setIsVisible(true);
    setIsExpanded(false);
  };

  // Mini floating button when card is hidden
  if (!isVisible) {
    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <Button
          onClick={handleShowCard}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-200"
          size="sm"
        >
          <Users className="h-6 w-6 text-white" />
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      className="fixed bottom-6 right-6 z-50"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-white hover:bg-white/10 h-8 w-8 p-0"
              >
                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="text-white hover:bg-white/10 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
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
