import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Star, Zap, Award, Users, TrendingUp, Sparkles, Badge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/context/auth';

interface CreatorModeProps {
  className?: string;
}

interface CreatorStats {
  shares: number;
  invites: number;
  contestWins: number;
  isCreator: boolean;
  level: 'bronze' | 'silver' | 'gold' | 'diamond';
}

const CreatorMode: React.FC<CreatorModeProps> = ({ className }) => {
  const { user } = useAuth();
  const [stats, setStats] = useState<CreatorStats>({
    shares: 0,
    invites: 0,
    contestWins: 0,
    isCreator: false,
    level: 'bronze'
  });
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);

  // Mock data - in real app, fetch from database
  useEffect(() => {
    // Simulate checking creator status
    const mockStats = {
      shares: 7,
      invites: 12,
      contestWins: 2,
      isCreator: true,
      level: 'gold' as const
    };
    setStats(mockStats);
  }, [user]);

  const creatorLevels = {
    bronze: {
      name: 'Rising Creator',
      icon: Award,
      color: 'from-amber-500 to-orange-500',
      requirements: '3+ shares OR 5+ invites',
      perks: ['Custom profile badge', 'Early access to new tools']
    },
    silver: {
      name: 'Viral Creator',
      icon: Star,
      color: 'from-gray-400 to-gray-600',
      requirements: '10+ shares AND 8+ invites',
      perks: ['Personal landing page', 'Featured in Creator carousel', 'Priority support']
    },
    gold: {
      name: 'Gold Creator',
      icon: Crown,
      color: 'from-yellow-400 to-yellow-600',
      requirements: '25+ shares AND 15+ invites AND 1+ contest win',
      perks: ['VIP badge', 'Monthly spotlight', 'Exclusive creator events']
    },
    diamond: {
      name: 'Diamond Creator',
      icon: Sparkles,
      color: 'from-blue-400 to-purple-600',
      requirements: '50+ shares AND 30+ invites AND 3+ contest wins',
      perks: ['Diamond crown badge', 'Co-marketing opportunities', 'Revenue sharing']
    }
  };

  const currentLevel = creatorLevels[stats.level];
  const IconComponent = currentLevel.icon;

  const checkCreatorUnlock = () => {
    const hasMinShares = stats.shares >= 3;
    const hasMinInvites = stats.invites >= 5;
    const hasContestWin = stats.contestWins >= 1;
    
    return hasMinShares || hasMinInvites || hasContestWin;
  };

  const getProgress = () => {
    const shareProgress = Math.min((stats.shares / 3) * 100, 100);
    const inviteProgress = Math.min((stats.invites / 5) * 100, 100);
    return Math.max(shareProgress, inviteProgress);
  };

  if (!stats.isCreator && !checkCreatorUnlock()) {
    return (
      <Card className={`p-4 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 ${className}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <Crown className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Unlock Creator Mode</h3>
            <p className="text-xs text-muted-foreground">Share your wins to become a creator</p>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Progress to Creator</span>
            <span className="text-primary font-medium">{Math.round(getProgress())}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${getProgress()}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Need: {creatorLevels.bronze.requirements}
          </p>
        </div>

        <div className="text-xs text-muted-foreground">
          <p className="mb-1">Current stats:</p>
          <div className="flex gap-4">
            <span>Shares: {stats.shares}</span>
            <span>Invites: {stats.invites}</span>
            <span>Contest wins: {stats.contestWins}</span>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <>
      <motion.div
        layout
        className={`${className}`}
      >
        <Card className="p-4 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-2 right-2 text-4xl">👑</div>
            <div className="absolute bottom-2 left-2 text-2xl">✨</div>
          </div>

          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <motion.div 
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentLevel.color} flex items-center justify-center`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <IconComponent className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">{currentLevel.name}</h3>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Badge className="text-xs px-2 py-1 bg-primary/20 text-primary border-primary/30">
                      Creator
                    </Badge>
                  </motion.div>
                </div>
                <p className="text-xs text-muted-foreground">Level {stats.level.toUpperCase()}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-3 text-center">
              <div className="bg-background/50 rounded-lg p-2">
                <div className="font-semibold text-primary">{stats.shares}</div>
                <div className="text-xs text-muted-foreground">Shares</div>
              </div>
              <div className="bg-background/50 rounded-lg p-2">
                <div className="font-semibold text-primary">{stats.invites}</div>
                <div className="text-xs text-muted-foreground">Invites</div>
              </div>
              <div className="bg-background/50 rounded-lg p-2">
                <div className="font-semibold text-primary">{stats.contestWins}</div>
                <div className="text-xs text-muted-foreground">Wins</div>
              </div>
            </div>

            <div className="space-y-1 mb-3">
              <h4 className="text-xs font-medium text-foreground">Creator Perks:</h4>
              {currentLevel.perks.map((perk, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 text-xs text-muted-foreground"
                >
                  <div className="w-1 h-1 bg-primary rounded-full" />
                  {perk}
                </motion.div>
              ))}
            </div>

            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
            >
              <Star className="w-3 h-3 mr-1" />
              View Creator Dashboard
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Unlock Animation */}
      <AnimatePresence>
        {showUnlockAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-background rounded-2xl p-8 text-center max-w-sm mx-4"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity 
                }}
                className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center"
              >
                <Crown className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className="text-xl font-bold text-foreground mb-2">Creator Mode Unlocked!</h3>
              <p className="text-sm text-muted-foreground mb-4">
                You've earned Creator status! Enjoy your new perks and exclusive tools.
              </p>
              
              <Button
                onClick={() => setShowUnlockAnimation(false)}
                className="bg-gradient-to-r from-primary to-secondary"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Explore Creator Tools
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CreatorMode;