import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { creditsManager, LEVEL_CONFIGS, type LevelConfig } from '@/lib/credits';
import { useToast } from '@/hooks/use-toast';
import confetti from 'canvas-confetti';
import { Coins, Trophy, Star, Zap, Gift, Users, TrendingUp } from 'lucide-react';

interface CreditsProgressProps {
  userId: string;
  credits: number;
  onCreditsUpdate: () => void;
}

const CreditsProgress: React.FC<CreditsProgressProps> = ({ 
  userId, 
  credits, 
  onCreditsUpdate 
}) => {
  const [currentLevel, setCurrentLevel] = useState<LevelConfig>(LEVEL_CONFIGS[0]);
  const [nextLevel, setNextLevel] = useState<LevelConfig | null>(null);
  const [progress, setProgress] = useState(0);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [showUnlockCelebration, setShowUnlockCelebration] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const current = creditsManager.getCurrentLevel(credits);
    const next = creditsManager.getNextLevel(credits);
    const progressPercent = creditsManager.getProgressToNextLevel(credits);

    setCurrentLevel(current);
    setNextLevel(next);
    setProgress(progressPercent);
  }, [credits]);

  const handleUnlockLevel = async () => {
    if (!nextLevel || isUnlocking) return;

    setIsUnlocking(true);
    try {
      const success = await creditsManager.unlockLevel(
        userId,
        nextLevel.level,
        nextLevel.creditsRequired
      );

      if (success) {
        // Trigger confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#8B5CF6', '#F59E0B', '#10B981', '#F97316']
        });

        setShowUnlockCelebration(true);
        setTimeout(() => setShowUnlockCelebration(false), 3000);

        toast({
          title: `🎉 Level ${nextLevel.level} Unlocked!`,
          description: `Welcome to ${nextLevel.name}! You've unlocked new benefits.`,
        });

        onCreditsUpdate();
      } else {
        toast({
          title: "Unlock Failed",
          description: "You don't have enough credits for this level.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error unlocking level:', error);
      toast({
        title: "Error",
        description: "Failed to unlock level. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUnlocking(false);
    }
  };

  const getEarnCreditsOptions = () => [
    { action: "Complete your profile", credits: 50, icon: <Users className="h-4 w-4" /> },
    { action: "Make your first booking", credits: 100, icon: <Star className="h-4 w-4" /> },
    { action: "Leave a review", credits: 30, icon: <TrendingUp className="h-4 w-4" /> },
    { action: "Refer a friend", credits: 150, icon: <Gift className="h-4 w-4" /> },
    { action: "Share an artist", credits: 10, icon: <Zap className="h-4 w-4" /> }
  ];

  return (
    <TooltipProvider>
      <Card className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{currentLevel.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {currentLevel.name}
                </h3>
                <p className="text-sm text-gray-600">{currentLevel.description}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-xl font-bold text-purple-600">
                <Coins className="h-5 w-5" />
                {credits.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500">Credits</p>
            </div>
          </div>

          {/* Progress Section */}
          {nextLevel ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  Progress to {nextLevel.name}
                </span>
                <span className="text-sm text-gray-500">
                  {credits} / {nextLevel.creditsRequired} credits
                </span>
              </div>
              
              <div className="relative">
                <Progress value={progress} className="h-3" />
                <motion.div
                  className="absolute top-0 left-0 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>

              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-500">
                  {nextLevel.creditsRequired - credits} credits needed
                </div>
                {credits >= nextLevel.creditsRequired && (
                  <Button
                    onClick={handleUnlockLevel}
                    disabled={isUnlocking}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                    size="sm"
                  >
                    {isUnlocking ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Trophy className="h-4 w-4" />
                      </motion.div>
                    ) : (
                      <>
                        <Trophy className="h-4 w-4 mr-1" />
                        Unlock {nextLevel.name}
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="text-4xl mb-2">🏆</div>
              <p className="text-lg font-semibold text-gray-800">Max Level Reached!</p>
              <p className="text-sm text-gray-600">You've unlocked everything!</p>
            </div>
          )}

          {/* Benefits */}
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-gray-800 mb-3">Current Benefits:</h4>
            <div className="flex flex-wrap gap-2">
              {currentLevel.benefits.map((benefit, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-purple-100 text-purple-800 border-purple-200"
                >
                  {benefit}
                </Badge>
              ))}
            </div>
          </div>

          {/* How to Earn Credits */}
          {nextLevel && (
            <div className="mt-6 pt-4 border-t border-purple-200">
              <h4 className="text-sm font-semibold text-gray-800 mb-3">
                How to earn credits:
              </h4>
              <div className="space-y-2">
                {getEarnCreditsOptions().slice(0, 3).map((option, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-white/50 hover:bg-white/80 transition-colors cursor-help">
                        <div className="flex items-center gap-2">
                          {option.icon}
                          <span className="text-xs text-gray-700">{option.action}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          +{option.credits}
                        </Badge>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Earn {option.credits} credits by {option.action.toLowerCase()}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          )}
        </CardContent>

        {/* Unlock Celebration Overlay */}
        <AnimatePresence>
          {showUnlockCelebration && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: "spring", damping: 15 }}
                className="text-center"
              >
                <div className="text-6xl mb-2">🎉</div>
                <h2 className="text-xl font-bold text-white mb-1">Level Up!</h2>
                <p className="text-white/90">Welcome to {nextLevel?.name}!</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </TooltipProvider>
  );
};

export default CreditsProgress;