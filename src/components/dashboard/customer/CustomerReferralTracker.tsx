
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Copy, 
  Share2, 
  MessageCircle, 
  Mail, 
  Crown,
  Sparkles,
  Zap,
  Gift
} from 'lucide-react';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

const CustomerReferralTracker = () => {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  // Mock referral data
  const referralStats = {
    totalInvites: 8,
    successful: 5,
    creditsEarned: 1250,
    dayStreak: 3,
    nextRewardProgress: 50, // 5 out of 10
    nextRewardCredits: 500
  };

  // Generate referral link
  const referralLink = `https://emviapp.com/invite/${user?.id?.substring(0, 8) || 'demo123'}`;
  const referralCode = `BEAUTY${user?.id?.substring(0, 6)?.toUpperCase() || 'DEMO123'}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast.success('Referral link copied to clipboard! 🔗');
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      console.error('Failed to copy:', error);
      toast.error('Failed to copy link. Please try again.');
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Join me on EmviApp!',
      text: `I'm loving EmviApp for all my beauty needs! Join me with my referral link and we both get credits! 💅✨`,
      url: referralLink
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        toast.success('Thanks for sharing! 🎉');
      } else {
        // Fallback to copying
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        toast.success('Share content copied to clipboard! 📋');
      }
    } catch (error) {
      console.error('Share failed:', error);
      // Fallback to copy
      try {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        toast.success('Share content copied to clipboard! 📋');
      } catch (copyError) {
        toast.error('Failed to share. Please try again.');
      }
    }
  };

  const handleTextShare = () => {
    const message = `Hey! I'm loving EmviApp for all my beauty needs! Join me with code ${referralCode} and we both get credits! ${referralLink}`;
    const smsUrl = `sms:?body=${encodeURIComponent(message)}`;
    window.open(smsUrl, '_blank');
    toast.success('Text message ready to send! 📱');
  };

  const handleEmailShare = () => {
    const subject = 'Join me on EmviApp - Beauty Made Easy!';
    const body = `Hi there!\n\nI've been using EmviApp to find amazing beauty services and artists, and I thought you'd love it too!\n\nUse my referral code: ${referralCode}\nOr click this link: ${referralLink}\n\nWe'll both get credits when you join! 💅✨\n\nSee you there!\n`;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, '_blank');
    toast.success('Email ready to send! 📧');
  };

  return (
    <Card className="bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 border-0 shadow-2xl text-white overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-4 right-4 w-20 h-20 bg-white rounded-full animate-pulse" />
        <div className="absolute bottom-8 left-8 w-16 h-16 bg-yellow-300 rounded-full animate-bounce" />
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-purple-300 rounded-full animate-ping" />
      </div>

      <CardContent className="p-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Be the Bridge!</h2>
              <p className="text-white/90">Connect artists with customers and earn amazing rewards</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-white/20 text-white border-white/30">
              <Crown className="h-3 w-3 mr-1" />
              VIP Referrer
            </Badge>
            <Badge className="bg-yellow-400/90 text-yellow-900 border-0">
              <Sparkles className="h-3 w-3 mr-1" />
              {referralStats.creditsEarned} Credits
            </Badge>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">{referralStats.totalInvites}</div>
            <div className="text-sm text-white/80">Total Invites</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">{referralStats.successful}</div>
            <div className="text-sm text-white/80">Successful</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">{referralStats.creditsEarned}</div>
            <div className="text-sm text-white/80">Credits Earned</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">{referralStats.dayStreak}</div>
            <div className="text-sm text-white/80">Day Streak</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">Next Reward Progress</span>
            <span className="text-sm text-white/90">{referralStats.nextRewardProgress}/10</span>
          </div>
          <Progress 
            value={referralStats.nextRewardProgress * 10} 
            className="h-3 bg-white/20"
          />
          <p className="text-sm text-white/90 mt-2">
            {10 - referralStats.nextRewardProgress} more successful referrals to unlock {referralStats.nextRewardCredits} bonus credits!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button
            onClick={handleCopyLink}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/30 text-white"
            variant="outline"
          >
            <Copy className="h-4 w-4 mr-2" />
            {copied ? 'Copied!' : 'Copy'}
          </Button>
          
          <Button
            onClick={handleShare}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/30 text-white"
            variant="outline"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          
          <Button
            onClick={handleTextShare}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/30 text-white"
            variant="outline"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Text
          </Button>
          
          <Button
            onClick={handleEmailShare}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/30 text-white"
            variant="outline"
          >
            <Mail className="h-4 w-4 mr-2" />
            Email
          </Button>
        </div>

        {/* Motivational Message */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="h-5 w-5 text-yellow-300" />
            <span className="font-semibold">Every referral helps artists grow their business!</span>
            <Gift className="h-5 w-5 text-yellow-300" />
          </div>
          <p className="text-sm text-white/90">
            Share your unique code: <span className="font-mono bg-white/20 px-2 py-1 rounded">{referralCode}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerReferralTracker;
