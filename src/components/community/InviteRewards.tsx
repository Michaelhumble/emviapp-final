import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gift, Users, Star, Trophy, Crown, Zap } from 'lucide-react';

interface RewardTier {
  invites: number;
  reward: string;
  badge: string;
  unlocked: boolean;
  current?: boolean;
}

interface InviteRewardsProps {
  currentInvites?: number;
}

const InviteRewards: React.FC<InviteRewardsProps> = ({ currentInvites = 1 }) => {
  const [rewards, setRewards] = useState<RewardTier[]>([]);
  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    const rewardTiers: RewardTier[] = [
      {
        invites: 1,
        reward: 'Bronze Badge',
        badge: '🥉',
        unlocked: currentInvites >= 1
      },
      {
        invites: 3,
        reward: 'Silver Badge + 2 Contest Entries',
        badge: '🥈',
        unlocked: currentInvites >= 3,
        current: currentInvites < 3
      },
      {
        invites: 5,
        reward: 'Gold Badge + VIP Profile',
        badge: '🥇',
        unlocked: currentInvites >= 5,
        current: currentInvites >= 3 && currentInvites < 5
      },
      {
        invites: 10,
        reward: 'Platinum Badge + $50 Credit',
        badge: '💎',
        unlocked: currentInvites >= 10,
        current: currentInvites >= 5 && currentInvites < 10
      },
      {
        invites: 25,
        reward: 'Diamond Badge + Feature Spotlight',
        badge: '👑',
        unlocked: currentInvites >= 25,
        current: currentInvites >= 10 && currentInvites < 25
      }
    ];

    setRewards(rewardTiers);

    // Calculate progress to next tier
    const nextTier = rewardTiers.find(tier => !tier.unlocked);
    if (nextTier) {
      const previousTierInvites = rewardTiers[rewardTiers.indexOf(nextTier) - 1]?.invites || 0;
      const progress = ((currentInvites - previousTierInvites) / (nextTier.invites - previousTierInvites)) * 100;
      setProgressPercentage(Math.min(Math.max(progress, 0), 100));
    } else {
      setProgressPercentage(100);
    }
  }, [currentInvites]);

  const getNextReward = () => {
    return rewards.find(tier => !tier.unlocked);
  };

  const nextReward = getNextReward();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 border border-indigo-400/30 rounded-3xl p-6 mb-8 overflow-hidden relative"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-pink-500/5" />
      <motion.div
        className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <motion.div
            className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
            animate={{ 
              rotate: 360,
              boxShadow: [
                "0 0 15px rgba(99, 102, 241, 0.4)",
                "0 0 25px rgba(168, 85, 247, 0.6)",
                "0 0 15px rgba(99, 102, 241, 0.4)"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Gift className="w-5 h-5 text-white" />
          </motion.div>
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Invite Rewards
            </h3>
            <p className="text-sm text-muted-foreground">
              {currentInvites} friends invited • Unlock exclusive perks!
            </p>
          </div>
        </div>

        <motion.div
          className="px-3 py-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span className="text-white text-xs font-bold">🎁 ACTIVE</span>
        </motion.div>
      </div>

      {/* Current Progress */}
      {nextReward && (
        <div className="relative z-10 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              Progress to {nextReward.badge} {nextReward.reward}
            </span>
            <span className="text-sm text-muted-foreground">
              {currentInvites}/{nextReward.invites}
            </span>
          </div>
          
          <div className="w-full bg-background/60 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full relative"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* Animated shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>
          
          <p className="text-xs text-muted-foreground mt-2 text-center">
            {nextReward.invites - currentInvites} more invites to unlock next reward! 🚀
          </p>
        </div>
      )}

      {/* Reward Tiers */}
      <div className="relative z-10 space-y-3">
        {rewards.map((tier, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
              tier.unlocked 
                ? 'bg-green-500/10 border-green-400/30' 
                : tier.current
                ? 'bg-indigo-500/10 border-indigo-400/30 ring-2 ring-indigo-400/50'
                : 'bg-background/40 border-border/30'
            }`}
          >
            <div className="flex items-center space-x-4">
              {/* Badge */}
              <motion.div
                className={`text-2xl ${tier.current ? 'animate-pulse' : ''}`}
                animate={tier.unlocked ? { 
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, -10, 0]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {tier.badge}
              </motion.div>

              {/* Reward Info */}
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-foreground">
                    {tier.invites} Invites
                  </span>
                  {tier.unlocked && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center space-x-1 px-2 py-1 bg-green-500 rounded-full"
                    >
                      <Star className="w-3 h-3 text-white" />
                      <span className="text-white text-xs font-bold">UNLOCKED</span>
                    </motion.div>
                  )}
                  {tier.current && (
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="flex items-center space-x-1 px-2 py-1 bg-indigo-500 rounded-full"
                    >
                      <Zap className="w-3 h-3 text-white" />
                      <span className="text-white text-xs font-bold">NEXT</span>
                    </motion.div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{tier.reward}</p>
              </div>
            </div>

            {/* Status Icon */}
            <div>
              {tier.unlocked ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                >
                  <Star className="w-4 h-4 text-white" />
                </motion.div>
              ) : (
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bonus Contest Entries Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-400/20"
      >
        <div className="flex items-center space-x-2 mb-2">
          <Trophy className="w-4 h-4 text-purple-500" />
          <span className="text-sm font-medium text-foreground">Contest Bonus</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Every friend you invite gives you +1 bonus entry in Weekly Challenges! 
          More invites = more chances to win! 🎯
        </p>
      </motion.div>

      {/* Floating particles */}
      <motion.div
        className="absolute top-8 right-12 w-1.5 h-1.5 bg-indigo-400/70 rounded-full"
        animate={{ 
          y: [0, -10, 0],
          opacity: [0.4, 1, 0.4] 
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      />
      <motion.div
        className="absolute bottom-16 left-8 w-1 h-1 bg-purple-400/60 rounded-full"
        animate={{ 
          y: [0, -8, 0],
          opacity: [0.3, 0.8, 0.3] 
        }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 1.2 }}
      />
    </motion.div>
  );
};

export default InviteRewards;