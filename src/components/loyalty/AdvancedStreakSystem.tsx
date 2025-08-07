import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Zap, Flame, Gift, Crown, Star, Trophy, Calendar, Coins, 
  Sparkles, Target, TrendingUp, Shield, Gem 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

interface StreakMilestone {
  days: number;
  reward: {
    points: number;
    credits: number;
    badge?: string;
    special?: string;
  };
  unlocked: boolean;
  claimed: boolean;
}

interface StreakBonus {
  type: 'multiplier' | 'protection' | 'special';
  name: string;
  description: string;
  icon: string;
  active: boolean;
  daysRequired: number;
}

interface StreakStats {
  currentStreak: number;
  longestStreak: number;
  totalDays: number;
  streakFreeze: number;
  nextMilestone: number;
  streakMultiplier: number;
  level: number;
}

const AdvancedStreakSystem: React.FC = () => {
  const { user } = useAuth();
  const [streakStats, setStreakStats] = useState<StreakStats>({
    currentStreak: 7,
    longestStreak: 15,
    totalDays: 42,
    streakFreeze: 2,
    nextMilestone: 10,
    streakMultiplier: 1.5,
    level: 3
  });
  
  const [milestones, setMilestones] = useState<StreakMilestone[]>([]);
  const [bonuses, setBonuses] = useState<StreakBonus[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReward, setShowReward] = useState(false);

  useEffect(() => {
    loadStreakData();
  }, []);

  const loadStreakData = async () => {
    try {
      setLoading(true);
      
      // Define streak milestones with real-world value
      const streakMilestones: StreakMilestone[] = [
        {
          days: 3,
          reward: { points: 100, credits: 10, badge: '🔥 Getting Hot' },
          unlocked: true,
          claimed: true
        },
        {
          days: 7,
          reward: { points: 250, credits: 25, badge: '⚡ Week Warrior', special: '5% Booking Discount' },
          unlocked: true,
          claimed: false
        },
        {
          days: 14,
          reward: { points: 500, credits: 50, badge: '🏆 Fortnight Champion', special: '10% Booking Discount' },
          unlocked: false,
          claimed: false
        },
        {
          days: 30,
          reward: { points: 1000, credits: 100, badge: '👑 Monthly Master', special: 'Priority Booking + 15% Discount' },
          unlocked: false,
          claimed: false
        },
        {
          days: 60,
          reward: { points: 2500, credits: 250, badge: '💎 Diamond Streaker', special: 'VIP Status + 20% Discount' },
          unlocked: false,
          claimed: false
        },
        {
          days: 100,
          reward: { points: 5000, credits: 500, badge: '🌟 Century Legend', special: 'Lifetime VIP + 25% Discount' },
          unlocked: false,
          claimed: false
        }
      ];

      // Define streak bonuses
      const streakBonuses: StreakBonus[] = [
        {
          type: 'multiplier',
          name: 'Point Multiplier',
          description: 'Earn 1.5x points on all activities',
          icon: '✨',
          active: streakStats.currentStreak >= 5,
          daysRequired: 5
        },
        {
          type: 'protection',
          name: 'Streak Shield',
          description: 'Protect your streak for 1 day if you miss',
          icon: '🛡️',
          active: streakStats.streakFreeze > 0,
          daysRequired: 10
        },
        {
          type: 'special',
          name: 'Express Booking',
          description: 'Skip waiting lists and get priority booking',
          icon: '⚡',
          active: streakStats.currentStreak >= 14,
          daysRequired: 14
        },
        {
          type: 'multiplier',
          name: 'Referral Boost',
          description: 'Double rewards from referrals',
          icon: '🚀',
          active: streakStats.currentStreak >= 21,
          daysRequired: 21
        }
      ];

      setMilestones(streakMilestones);
      setBonuses(streakBonuses);
    } catch (error) {
      console.error('Error loading streak data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClaimReward = (milestone: StreakMilestone) => {
    if (!milestone.unlocked || milestone.claimed) return;

    setMilestones(prev => 
      prev.map(m => 
        m.days === milestone.days ? { ...m, claimed: true } : m
      )
    );

    setShowReward(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FFA500', '#FF69B4', '8B5CF6']
    });

    toast.success(`🎉 Claimed ${milestone.reward.points} points and ${milestone.reward.credits} credits!`);
    
    setTimeout(() => setShowReward(false), 3000);
  };

  const useStreakFreeze = () => {
    if (streakStats.streakFreeze <= 0) return;
    
    setStreakStats(prev => ({ ...prev, streakFreeze: prev.streakFreeze - 1 }));
    toast.success('🛡️ Streak freeze activated! Your streak is protected today.');
  };

  const getStreakLevel = (days: number) => {
    if (days >= 100) return { level: 'Legend', color: 'from-purple-400 to-pink-500', icon: '🌟' };
    if (days >= 60) return { level: 'Diamond', color: 'from-blue-400 to-cyan-500', icon: '💎' };
    if (days >= 30) return { level: 'Gold', color: 'from-yellow-400 to-orange-500', icon: '👑' };
    if (days >= 14) return { level: 'Silver', color: 'from-gray-300 to-gray-500', icon: '🏆' };
    if (days >= 7) return { level: 'Bronze', color: 'from-amber-600 to-amber-800', icon: '🥉' };
    return { level: 'Starter', color: 'from-green-400 to-emerald-500', icon: '🔥' };
  };

  const progressToNext = ((streakStats.currentStreak % streakStats.nextMilestone) / streakStats.nextMilestone) * 100;
  const streakLevel = getStreakLevel(streakStats.currentStreak);

  if (loading) {
    return (
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-white/20 rounded w-3/4"></div>
            <div className="h-20 bg-white/20 rounded"></div>
            <div className="space-y-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-16 bg-white/20 rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <Flame className="h-5 w-5 mr-2 text-orange-400" />
          Advanced Streak System
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Current Streak Display */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className={`bg-gradient-to-r ${streakLevel.color} rounded-lg p-6 text-center`}
        >
          <div className="text-4xl mb-2">{streakLevel.icon}</div>
          <div className="text-3xl font-bold mb-1">{streakStats.currentStreak}</div>
          <div className="text-sm opacity-90 mb-3">Day Streak • {streakLevel.level} Level</div>
          
          <div className="flex items-center justify-center space-x-4 text-xs">
            <div className="flex items-center">
              <Trophy className="h-3 w-3 mr-1" />
              <span>Best: {streakStats.longestStreak}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              <span>Total: {streakStats.totalDays}</span>
            </div>
            <div className="flex items-center">
              <Star className="h-3 w-3 mr-1" />
              <span>{streakStats.streakMultiplier}x Points</span>
            </div>
          </div>
        </motion.div>

        {/* Active Bonuses */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold flex items-center">
            <Sparkles className="h-4 w-4 mr-2 text-yellow-400" />
            Active Bonuses
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {bonuses.filter(b => b.active).map((bonus, index) => (
              <motion.div
                key={bonus.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-lg p-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{bonus.icon}</span>
                    <div>
                      <p className="font-medium text-green-200">{bonus.name}</p>
                      <p className="text-xs text-green-300/70">{bonus.description}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                    Active
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Streak Protection */}
        {streakStats.streakFreeze > 0 && (
          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="font-medium text-blue-200">Streak Protection</p>
                  <p className="text-xs text-blue-300/70">Use if you miss a day</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  {streakStats.streakFreeze} left
                </Badge>
                <Button
                  size="sm"
                  onClick={useStreakFreeze}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Use Shield
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Progress to Next Milestone */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/70">Next milestone in {streakStats.nextMilestone - streakStats.currentStreak} days</span>
            <span className="text-white/70">{Math.round(progressToNext)}%</span>
          </div>
          <Progress 
            value={progressToNext}
            className="h-3 bg-white/20 [&>div]:bg-gradient-to-r [&>div]:from-orange-400 [&>div]:to-red-500"
          />
        </div>

        {/* Milestone Rewards */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold flex items-center">
            <Target className="h-4 w-4 mr-2 text-yellow-400" />
            Milestone Rewards
          </h4>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.days}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  milestone.claimed 
                    ? 'bg-green-500/10 border-green-500/30' 
                    : milestone.unlocked
                    ? 'bg-yellow-500/10 border-yellow-500/30'
                    : 'bg-white/5 border-white/20'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    milestone.claimed
                      ? 'bg-green-500'
                      : milestone.unlocked
                      ? 'bg-yellow-500'
                      : 'bg-white/20'
                  }`}>
                    {milestone.claimed ? (
                      <Sparkles className="h-4 w-4 text-white" />
                    ) : (
                      <span className="text-xs font-bold text-white">{milestone.days}</span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-white">{milestone.days} Day Milestone</p>
                    <div className="flex items-center space-x-2 text-xs text-white/70">
                      <span>{milestone.reward.points} pts</span>
                      <span>•</span>
                      <span>{milestone.reward.credits} credits</span>
                      {milestone.reward.special && (
                        <>
                          <span>•</span>
                          <span className="text-yellow-300">{milestone.reward.special}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                {milestone.claimed ? (
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                    Claimed
                  </Badge>
                ) : milestone.unlocked ? (
                  <Button
                    size="sm"
                    onClick={() => handleClaimReward(milestone)}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                  >
                    <Gift className="h-3 w-3 mr-1" />
                    Claim
                  </Button>
                ) : (
                  <Badge variant="outline" className="bg-white/10 text-white/50 border-white/30">
                    Locked
                  </Badge>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Celebration Animation */}
        <AnimatePresence>
          {showReward && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            >
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-lg text-center">
                <div className="text-4xl mb-2">🎉</div>
                <div className="font-bold">Milestone Claimed!</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default AdvancedStreakSystem;