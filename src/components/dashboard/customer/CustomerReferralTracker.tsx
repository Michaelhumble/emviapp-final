
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Share2, 
  Copy, 
  MessageCircle, 
  Mail, 
  Users, 
  Trophy, 
  Gift,
  Star,
  Target,
  Zap
} from 'lucide-react';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

// Fixed interfaces to match actual data structure
interface ReferralStats {
  totalReferrals: number;
  successfulReferrals: number;
  creditsEarned: number;
  currentStreak: number;
}

interface ReferralProgress {
  current: number;
  target: number;
  percentage: number;
}

const CustomerReferralTracker = () => {
  const { user, userProfile } = useAuth();
  const [referralStats, setReferralStats] = useState<ReferralStats>({
    totalReferrals: 8,
    successfulReferrals: 5,
    creditsEarned: 1250,
    currentStreak: 3
  });

  const [progress, setProgress] = useState<ReferralProgress>({
    current: 5,
    target: 10,
    percentage: 50
  });

  // Generate referral link
  const referralLink = `https://emviapp.com/join?ref=${user?.id || 'demo'}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      toast.success('Referral link copied! Share it to earn rewards! 🎉');
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const handleShareNow = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join EmviApp - Find Amazing Beauty Artists!',
          text: 'I found the best beauty artists on EmviApp! Join me and discover incredible nail artists, salons, and more!',
          url: referralLink
        });
        toast.success('Thanks for sharing! 🚀');
      } catch (error) {
        if (error.name !== 'AbortError') {
          toast.error('Sharing failed, but you can still copy the link!');
        }
      }
    } else {
      // Fallback to copying link
      handleCopyLink();
    }
  };

  const handleSendText = () => {
    const message = `Hey! I found this amazing app for booking beauty services - EmviApp! Check it out: ${referralLink}`;
    const smsUrl = `sms:?body=${encodeURIComponent(message)}`;
    window.open(smsUrl, '_blank');
    toast.success('SMS app opened! Send to your friends! 📱');
  };

  const handleSendEmail = () => {
    const subject = 'You need to see this beauty app!';
    const body = `Hi!\n\nI've been using EmviApp to find amazing beauty artists and nail salons, and I thought you'd love it too!\n\nIt's super easy to book appointments and discover talented artists in your area.\n\nCheck it out: ${referralLink}\n\nThanks!\n${userProfile?.full_name || 'Your friend'}`;
    
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, '_blank');
    toast.success('Email app opened! Share with friends! ✉️');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24" />
        
        <CardContent className="relative p-8 text-white">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Users className="h-8 w-8" />
              <h2 className="text-3xl font-bold">Be the Bridge!</h2>
            </div>
            <p className="text-white/90 text-lg">
              Connect artists with customers and earn amazing rewards
            </p>
            <div className="mt-4 flex items-center justify-center gap-4">
              <Badge className="bg-white/20 text-white border-0 text-sm px-3 py-1">
                <Trophy className="h-4 w-4 mr-1" />
                VIP Referrer
              </Badge>
              <Badge className="bg-amber-400/20 text-amber-100 border-0 text-sm px-3 py-1">
                <Star className="h-4 w-4 mr-1" />
                {referralStats.creditsEarned} Credits
              </Badge>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold">{referralStats.totalReferrals}</div>
              <div className="text-white/80 text-sm">Total Invites</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{referralStats.successfulReferrals}</div>
              <div className="text-white/80 text-sm">Successful</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{referralStats.creditsEarned}</div>
              <div className="text-white/80 text-sm">Credits Earned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{referralStats.currentStreak}</div>
              <div className="text-white/80 text-sm">Day Streak</div>
            </div>
          </div>

          {/* Progress to Next Reward */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/90 font-medium">Next Reward Progress</span>
              <span className="text-white/90 text-sm">{progress.current}/{progress.target}</span>
            </div>
            <Progress value={progress.percentage} className="h-3 bg-white/20" />
            <p className="text-white/80 text-sm mt-2">
              {progress.target - progress.current} more successful referrals to unlock 500 bonus credits!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button
              onClick={handleCopyLink}
              className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            
            <Button
              onClick={handleShareNow}
              className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            
            <Button
              onClick={handleSendText}
              className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Text
            </Button>
            
            <Button
              onClick={handleSendEmail}
              className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm"
            >
              <Mail className="h-4 w-4 mr-2" />
              Email
            </Button>
          </div>

          {/* Motivational Message */}
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center gap-2 text-white/90">
              <Zap className="h-5 w-5" />
              <span className="font-medium">Every referral helps artists grow their business!</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CustomerReferralTracker;
