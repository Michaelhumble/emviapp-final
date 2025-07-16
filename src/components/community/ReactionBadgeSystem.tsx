import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, Flame, Sparkles, Trophy, Crown, Zap, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  requirement: number;
  userProgress: number;
  earned: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface ReactionStats {
  hearts_given: number;
  hearts_received: number;
  inspiring_posts: number;
  viral_content: number;
  community_love: number;
}

const ReactionBadgeSystem: React.FC = () => {
  const { user } = useAuth();
  const [userStats, setUserStats] = useState<ReactionStats>({
    hearts_given: 47,
    hearts_received: 156,
    inspiring_posts: 23,
    viral_content: 8,
    community_love: 234
  });
  const [showBadgeModal, setShowBadgeModal] = useState<Badge | null>(null);
  const [newBadgeAlert, setNewBadgeAlert] = useState<Badge | null>(null);

  const badges: Badge[] = [
    {
      id: 'heart-giver',
      name: 'Heart Giver',
      description: 'Spread 50+ hearts to fellow community members',
      icon: Heart,
      color: 'text-red-500',
      bgColor: 'bg-red-100',
      requirement: 50,
      userProgress: userStats.hearts_given,
      earned: userStats.hearts_given >= 50,
      rarity: 'common'
    },
    {
      id: 'most-loved',
      name: 'Most Loved',
      description: 'Receive 100+ hearts on your posts',
      icon: Sparkles,
      color: 'text-pink-500',
      bgColor: 'bg-pink-100',
      requirement: 100,
      userProgress: userStats.hearts_received,
      earned: userStats.hearts_received >= 100,
      rarity: 'rare'
    },
    {
      id: 'inspiring-creator',
      name: 'Inspiring Creator',
      description: 'Create 20+ posts that inspire others',
      icon: Star,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100',
      requirement: 20,
      userProgress: userStats.inspiring_posts,
      earned: userStats.inspiring_posts >= 20,
      rarity: 'rare'
    },
    {
      id: 'viral-sensation',
      name: 'Viral Sensation',
      description: 'Create 5+ viral posts with 50+ hearts each',
      icon: Flame,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100',
      requirement: 5,
      userProgress: userStats.viral_content,
      earned: userStats.viral_content >= 5,
      rarity: 'epic'
    },
    {
      id: 'community-champion',
      name: 'Community Champion',
      description: 'Earn 500+ total community love points',
      icon: Trophy,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100',
      requirement: 500,
      userProgress: userStats.community_love,
      earned: userStats.community_love >= 500,
      rarity: 'epic'
    },
    {
      id: 'beauty-legend',
      name: 'Beauty Legend',
      description: 'Achieve legendary status in the community',
      icon: Crown,
      color: 'text-amber-500',
      bgColor: 'bg-amber-100',
      requirement: 1000,
      userProgress: userStats.community_love,
      earned: userStats.community_love >= 1000,
      rarity: 'legendary'
    }
  ];

  const earnedBadges = badges.filter(badge => badge.earned);
  const nextBadges = badges.filter(badge => !badge.earned).slice(0, 3);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'border-gray-300 bg-gray-50';
      case 'rare':
        return 'border-blue-300 bg-blue-50';
      case 'epic':
        return 'border-purple-300 bg-purple-50';
      case 'legendary':
        return 'border-yellow-300 bg-yellow-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'rare':
        return 'shadow-blue-200';
      case 'epic':
        return 'shadow-purple-200';
      case 'legendary':
        return 'shadow-yellow-200';
      default:
        return '';
    }
  };

  // Check for new badges (simulate)
  useEffect(() => {
    const checkForNewBadges = () => {
      // Simulate earning a new badge
      const almostEarnedBadge = nextBadges.find(badge => 
        badge.userProgress >= badge.requirement * 0.9
      );
      
      if (almostEarnedBadge && Math.random() > 0.8) {
        setNewBadgeAlert(almostEarnedBadge);
        setTimeout(() => setNewBadgeAlert(null), 5000);
      }
    };

    const interval = setInterval(checkForNewBadges, 10000);
    return () => clearInterval(interval);
  }, [nextBadges]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full">
            <Award className="text-purple-600" size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold">Reaction Badges</h2>
            <p className="text-sm text-muted-foreground">Earn badges for spreading love in the community</p>
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{earnedBadges.length}</div>
          <div className="text-xs text-muted-foreground">Earned</div>
        </div>
      </div>

      {/* Earned Badges */}
      {earnedBadges.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3 flex items-center">
            <Trophy className="mr-2 text-yellow-500" size={18} />
            Your Badges ({earnedBadges.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {earnedBadges.map((badge) => {
              const IconComponent = badge.icon;
              return (
                <motion.div
                  key={badge.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowBadgeModal(badge)}
                  className={`p-4 rounded-xl border-2 cursor-pointer ${getRarityColor(badge.rarity)} ${getRarityGlow(badge.rarity)}`}
                >
                  <div className={`w-12 h-12 ${badge.bgColor} rounded-full flex items-center justify-center mb-2 mx-auto`}>
                    <IconComponent className={badge.color} size={24} />
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-sm">{badge.name}</div>
                    <div className="text-xs text-muted-foreground capitalize">{badge.rarity}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Next Badges to Earn */}
      <div>
        <h3 className="font-semibold mb-3 flex items-center">
          <Zap className="mr-2 text-blue-500" size={18} />
          Next to Earn
        </h3>
        <div className="space-y-3">
          {nextBadges.map((badge) => {
            const IconComponent = badge.icon;
            const progress = (badge.userProgress / badge.requirement) * 100;
            
            return (
              <Card key={badge.id} className="p-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${badge.bgColor} rounded-full flex items-center justify-center opacity-60`}>
                    <IconComponent className={badge.color} size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium">{badge.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {badge.userProgress}/{badge.requirement}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">{badge.description}</div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div
                        className="bg-primary h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(progress, 100)}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Stats Overview */}
      <Card className="p-4 bg-gradient-to-r from-primary/5 to-purple-500/5">
        <h3 className="font-semibold mb-3">Your Community Impact</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-500">{userStats.hearts_given}</div>
            <div className="text-sm text-muted-foreground">Hearts Given</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-500">{userStats.hearts_received}</div>
            <div className="text-sm text-muted-foreground">Hearts Received</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-500">{userStats.inspiring_posts}</div>
            <div className="text-sm text-muted-foreground">Inspiring Posts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-500">{userStats.viral_content}</div>
            <div className="text-sm text-muted-foreground">Viral Content</div>
          </div>
        </div>
      </Card>

      {/* Badge Detail Modal */}
      <AnimatePresence>
        {showBadgeModal && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowBadgeModal(null)}
          >
            <motion.div
              className="bg-background rounded-2xl shadow-2xl max-w-md w-full p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className={`w-20 h-20 ${showBadgeModal.bgColor} rounded-full flex items-center justify-center mb-4 mx-auto`}>
                  <showBadgeModal.icon className={showBadgeModal.color} size={40} />
                </div>
                <h3 className="text-xl font-bold mb-2">{showBadgeModal.name}</h3>
                <div className="text-sm text-muted-foreground mb-4">{showBadgeModal.description}</div>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium capitalize ${getRarityColor(showBadgeModal.rarity)}`}>
                  {showBadgeModal.rarity} Badge
                </div>
                {showBadgeModal.earned && (
                  <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg">
                    🎉 Congratulations! You've earned this badge!
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* New Badge Alert */}
      <AnimatePresence>
        {newBadgeAlert && (
          <motion.div
            className="fixed top-4 right-4 z-50"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            <Card className="p-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-xl">
              <div className="flex items-center space-x-3">
                <Trophy size={24} />
                <div>
                  <div className="font-bold">Almost there! 🎯</div>
                  <div className="text-sm opacity-90">
                    {newBadgeAlert.requirement - newBadgeAlert.userProgress} more to earn "{newBadgeAlert.name}"
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReactionBadgeSystem;