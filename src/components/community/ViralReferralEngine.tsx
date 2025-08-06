import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Copy, Check, Users, Gift, Star, TrendingUp, Clock, Crown, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReferralReward {
  id: string;
  milestone: number;
  reward: string;
  type: 'credits' | 'badge' | 'vip' | 'cash';
  claimed: boolean;
  value: number;
}

interface ReferredUser {
  id: string;
  name: string;
  avatar: string;
  joinDate: Date;
  status: 'active' | 'pending' | 'churned';
  contribution: number;
  tier: string;
}

const ViralReferralEngine = () => {
  const [userReferralCode, setUserReferralCode] = useState('EMVI-BEAUTY-XYZ');
  const [totalReferrals, setTotalReferrals] = useState(7);
  const [activeReferrals, setActiveReferrals] = useState(5);
  const [totalEarnings, setTotalEarnings] = useState(125);
  const [copiedCode, setCopiedCode] = useState(false);
  const [shareMethod, setShareMethod] = useState<'link' | 'code' | 'social'>('link');

  // Mock referred users
  const referredUsers: ReferredUser[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      avatar: '/api/placeholder/40/40',
      joinDate: new Date(2024, 1, 15),
      status: 'active',
      contribution: 250,
      tier: 'Artist'
    },
    {
      id: '2',
      name: 'Maria Garcia',
      avatar: '/api/placeholder/40/40',
      joinDate: new Date(2024, 2, 3),
      status: 'active',
      contribution: 180,
      tier: 'Salon Owner'
    },
    {
      id: '3',
      name: 'Jessica Kim',
      avatar: '/api/placeholder/40/40',
      joinDate: new Date(2024, 2, 20),
      status: 'pending',
      contribution: 0,
      tier: 'Customer'
    }
  ];

  // Referral rewards system
  const rewards: ReferralReward[] = [
    { id: '1', milestone: 1, reward: '50 Credits', type: 'credits', claimed: true, value: 50 },
    { id: '2', milestone: 3, reward: 'Rising Star Badge', type: 'badge', claimed: true, value: 0 },
    { id: '3', milestone: 5, reward: '100 Credits + VIP Trial', type: 'vip', claimed: true, value: 100 },
    { id: '4', milestone: 10, reward: '$25 Cash Bonus', type: 'cash', claimed: false, value: 25 },
    { id: '5', milestone: 25, reward: 'VIP Status + $100', type: 'cash', claimed: false, value: 100 },
    { id: '6', milestone: 50, reward: 'Elite Ambassador + $250', type: 'cash', claimed: false, value: 250 }
  ];

  const nextMilestone = rewards.find(r => !r.claimed);
  const progressToNext = nextMilestone ? (totalReferrals / nextMilestone.milestone) * 100 : 100;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(userReferralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    const referralLink = `https://emvi.app/join?ref=${userReferralCode}`;
    navigator.clipboard.writeText(referralLink);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const getRewardIcon = (type: string) => {
    switch (type) {
      case 'credits': return <Star className="h-4 w-4 text-yellow-500" />;
      case 'badge': return <Gift className="h-4 w-4 text-purple-500" />;
      case 'vip': return <Crown className="h-4 w-4 text-purple-500" />;
      case 'cash': return <TrendingUp className="h-4 w-4 text-green-500" />;
      default: return <Gift className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'churned': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <Card className="bg-gradient-to-br from-purple-50 via-white to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6 text-purple-600" />
            Referral Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-white rounded-xl border border-purple-100">
              <motion.p 
                className="text-3xl font-bold text-purple-600"
                key={totalReferrals}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
              >
                {totalReferrals}
              </motion.p>
              <p className="text-sm text-gray-600">Total Referrals</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl border border-purple-100">
              <p className="text-3xl font-bold text-green-600">{activeReferrals}</p>
              <p className="text-sm text-gray-600">Active Users</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl border border-purple-100">
              <p className="text-3xl font-bold text-blue-600">${totalEarnings}</p>
              <p className="text-sm text-gray-600">Total Earned</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl border border-purple-100">
              <p className="text-3xl font-bold text-orange-600">
                {Math.round((activeReferrals / totalReferrals) * 100)}%
              </p>
              <p className="text-sm text-gray-600">Success Rate</p>
            </div>
          </div>

          {/* Progress to Next Reward */}
          {nextMilestone && (
            <div className="bg-white rounded-xl p-4 border border-purple-100">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">Next Reward</h4>
                <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  {nextMilestone.milestone - totalReferrals} more needed
                </Badge>
              </div>
              <div className="flex items-center gap-3 mb-3">
                {getRewardIcon(nextMilestone.type)}
                <span className="font-medium text-gray-700">{nextMilestone.reward}</span>
              </div>
              <Progress 
                value={progressToNext} 
                className="h-3 bg-gray-100 [&>div]:bg-gradient-to-r [&>div]:from-purple-500 [&>div]:to-pink-500"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-1">
                <span>{totalReferrals} referrals</span>
                <span>{nextMilestone.milestone} target</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sharing Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-green-600" />
            Share & Earn
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Share Method Toggle */}
          <div className="flex gap-2 mb-4 p-1 bg-gray-100 rounded-lg">
            {[
              { id: 'link', label: 'Share Link' },
              { id: 'code', label: 'Share Code' },
              { id: 'social', label: 'Social Media' }
            ].map(method => (
              <Button
                key={method.id}
                variant={shareMethod === method.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setShareMethod(method.id as any)}
                className={`flex-1 ${shareMethod === method.id 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                  : 'text-gray-600'
                }`}
              >
                {method.label}
              </Button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {shareMethod === 'link' && (
              <motion.div
                key="link"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="flex gap-2">
                  <Input
                    value={`https://emvi.app/join?ref=${userReferralCode}`}
                    readOnly
                    className="bg-gray-50"
                  />
                  <Button onClick={handleCopyLink} variant="outline">
                    {copiedCode ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-sm text-gray-600">
                  Share this link with friends. They get 25 free credits, you earn when they're active!
                </p>
              </motion.div>
            )}

            {shareMethod === 'code' && (
              <motion.div
                key="code"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                  <p className="text-sm text-gray-600 mb-2">Your Referral Code</p>
                  <div className="flex items-center justify-center gap-3">
                    <code className="text-2xl font-bold text-purple-600 bg-white px-4 py-2 rounded-lg border">
                      {userReferralCode}
                    </code>
                    <Button onClick={handleCopyCode} variant="outline" size="sm">
                      {copiedCode ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 text-center">
                  Friends can enter this code during signup for instant bonuses!
                </p>
              </motion.div>
            )}

            {shareMethod === 'social' && (
              <motion.div
                key="social"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { platform: 'Instagram Stories', color: 'from-pink-500 to-purple-600', emoji: '📸' },
                    { platform: 'TikTok', color: 'from-black to-red-600', emoji: '🎵' },
                    { platform: 'Facebook', color: 'from-blue-600 to-blue-700', emoji: '👥' },
                    { platform: 'Twitter/X', color: 'from-gray-800 to-black', emoji: '🐦' }
                  ].map(social => (
                    <Button
                      key={social.platform}
                      className={`bg-gradient-to-r ${social.color} hover:opacity-90 text-white h-12`}
                    >
                      <span className="mr-2">{social.emoji}</span>
                      {social.platform}
                    </Button>
                  ))}
                </div>
                <p className="text-sm text-gray-600 text-center">
                  Pre-made templates for each platform with your referral link included!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Referred Users */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            Your Referrals ({referredUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {referredUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-10 h-10 rounded-full ring-2 ring-gray-200"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                      <span className="text-sm text-gray-500">{user.tier}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold text-green-600">+${user.contribution}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {user.joinDate.toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rewards Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Milestone Rewards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {rewards.map((reward, index) => (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                  reward.claimed 
                    ? 'bg-green-50 border-green-200' 
                    : totalReferrals >= reward.milestone
                    ? 'bg-yellow-50 border-yellow-300 shadow-md'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  {getRewardIcon(reward.type)}
                  <div>
                    <p className="font-medium text-gray-900">
                      {reward.milestone} Referrals: {reward.reward}
                    </p>
                    <p className="text-sm text-gray-600">
                      {reward.claimed ? 'Claimed' : totalReferrals >= reward.milestone ? 'Ready to claim!' : `${reward.milestone - totalReferrals} referrals needed`}
                    </p>
                  </div>
                </div>
                
                {reward.claimed ? (
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    <Check className="h-3 w-3 mr-1" />
                    Claimed
                  </Badge>
                ) : totalReferrals >= reward.milestone ? (
                  <Button 
                    size="sm"
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                  >
                    Claim Reward
                  </Button>
                ) : (
                  <Badge variant="outline">
                    {reward.milestone - totalReferrals} more
                  </Badge>
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViralReferralEngine;