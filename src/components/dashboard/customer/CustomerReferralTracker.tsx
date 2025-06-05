
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Copy, 
  Share, 
  MessageSquare, 
  Mail, 
  Sparkles, 
  Trophy,
  Gift,
  Crown,
  Zap
} from 'lucide-react';
import { useReferralSystem } from '@/hooks/useReferralSystem';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const CustomerReferralTracker = () => {
  const navigate = useNavigate();
  const { 
    referralStats, 
    referralLink, 
    referralProgress, 
    copyReferralLink, 
    nextMilestone,
    loading 
  } = useReferralSystem();
  
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (referralLink) {
      copyReferralLink();
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleShareNow = () => {
    if (referralLink) {
      const shareText = `Join me on EmviApp - the best platform for beauty professionals! Use my link: ${referralLink}`;
      
      if (navigator.share) {
        navigator.share({
          title: 'Join EmviApp',
          text: shareText,
          url: referralLink
        });
      } else {
        // Fallback to copying
        navigator.clipboard.writeText(shareText);
        toast.success('Sharing text copied to clipboard!');
      }
    }
  };

  const handleSendMessages = () => {
    if (referralLink) {
      const smsText = `Hey! Check out EmviApp - amazing beauty services platform: ${referralLink}`;
      window.open(`sms:?body=${encodeURIComponent(smsText)}`, '_blank');
    }
  };

  const handleSendEmails = () => {
    if (referralLink) {
      const subject = 'You need to see this beauty platform!';
      const body = `Hi!\n\nI found this amazing beauty platform called EmviApp. You can find incredible artists and salon services here.\n\nCheck it out: ${referralLink}\n\nYou'll love it!`;
      window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
    }
  };

  if (loading) {
    return (
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 text-white overflow-hidden">
        <CardContent className="p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-white/20 rounded mb-4"></div>
            <div className="h-20 bg-white/20 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalReferred = referralStats?.successful_referrals || 0;
  const creditsEarned = referralStats?.total_credits_earned || 0;
  const progressPercentage = referralProgress?.progressPercentage || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 text-white overflow-hidden relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
        
        <CardContent className="p-8 relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  Be the Bridge! 
                  <Sparkles className="h-5 w-5" />
                </h2>
                <p className="text-white/80">Connect artists & salons, earn amazing rewards</p>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white border-0 px-4 py-2">
              <Crown className="h-4 w-4 mr-1" />
              VIP Referrer
            </Badge>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold">{totalReferred}</div>
              <div className="text-white/80 text-sm">Friends Joined</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{creditsEarned}</div>
              <div className="text-white/80 text-sm">Credits Earned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{nextMilestone}</div>
              <div className="text-white/80 text-sm">Next Reward</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progress to Next Milestone</span>
              <span className="text-sm">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <motion.div 
                className="bg-gradient-to-r from-amber-400 to-yellow-500 h-3 rounded-full relative overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </motion.div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button
              onClick={handleCopyLink}
              className="bg-white/20 hover:bg-white/30 border-0 backdrop-blur-sm transition-all duration-200"
            >
              <Copy className="h-4 w-4 mr-2" />
              {copied ? 'Copied!' : 'Copy'}
            </Button>
            
            <Button
              onClick={handleShareNow}
              className="bg-white/20 hover:bg-white/30 border-0 backdrop-blur-sm transition-all duration-200"
            >
              <Share className="h-4 w-4 mr-2" />
              Share Now
            </Button>
            
            <Button
              onClick={handleSendMessages}
              className="bg-white/20 hover:bg-white/30 border-0 backdrop-blur-sm transition-all duration-200"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Text Friends
            </Button>
            
            <Button
              onClick={handleSendEmails}
              className="bg-white/20 hover:bg-white/30 border-0 backdrop-blur-sm transition-all duration-200"
            >
              <Mail className="h-4 w-4 mr-2" />
              Send Emails
            </Button>
          </div>

          {/* Motivation Text */}
          <div className="mt-6 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="h-5 w-5 text-amber-400" />
              <span className="font-semibold">Why refer?</span>
            </div>
            <p className="text-sm text-white/90 leading-relaxed">
              Every person you bring to EmviApp earns you <strong>50 credits</strong> and helps build our amazing beauty community. 
              The more you share, the more you earn! 🎉
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CustomerReferralTracker;
