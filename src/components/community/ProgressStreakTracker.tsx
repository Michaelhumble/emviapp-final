import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Flame, Star, Trophy, Crown, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const ProgressStreakTracker = () => {
  const currentLevel = 3;
  const currentXP = 750;
  const nextLevelXP = 1000;
  const progressPercentage = (currentXP / nextLevelXP) * 100;
  const currentStreak = 7;
  const nextReward = 'VIP Lounge Access';

  const badges = [
    { icon: Flame, name: 'Hot Streak', earned: true, color: 'text-orange-500' },
    { icon: Star, name: 'Rising Star', earned: true, color: 'text-yellow-500' },
    { icon: Trophy, name: 'Top Creator', earned: false, color: 'text-gray-400' },
    { icon: Crown, name: 'VIP Member', earned: false, color: 'text-purple-500' },
  ];

  return (
    <Card className="bg-gradient-to-br from-purple-50 via-white to-pink-50 border-purple-200 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-bounce" />
      
      <CardContent className="p-6 relative z-10">
        {/* Level Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="h-6 w-6 text-purple-600" />
              </motion.div>
              <h3 className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Level {currentLevel} Creator
              </h3>
            </div>
            <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200">
              {currentXP}/{nextLevelXP} XP
            </Badge>
          </div>
          
          <div className="space-y-2">
            <Progress 
              value={progressPercentage} 
              className="h-3 bg-gray-100 [&>div]:bg-gradient-to-r [&>div]:from-purple-500 [&>div]:to-pink-500 [&>div]:animate-pulse"
            />
            <p className="text-sm text-gray-600">
              {nextLevelXP - currentXP} XP until <span className="font-semibold text-purple-600">{nextReward}</span>
            </p>
          </div>
        </div>

        {/* Streak Counter */}
        <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Flame className="h-8 w-8 text-orange-500" />
              </motion.div>
              <div>
                <p className="font-bold text-xl text-orange-600">{currentStreak} Day Streak</p>
                <p className="text-sm text-orange-500">Keep posting to maintain your fire!</p>
              </div>
            </div>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold pulse-glow"
            >
              Post Now
            </Button>
          </div>
        </div>

        {/* Achievement Badges */}
        <div>
          <h4 className="font-semibold mb-3 text-gray-700">Achievement Badges</h4>
          <div className="grid grid-cols-4 gap-3">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.name}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all cursor-pointer ${
                  badge.earned 
                    ? 'bg-gradient-to-br from-white to-gray-50 border-purple-200 shadow-md hover:shadow-lg' 
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <badge.icon className={`h-6 w-6 mb-1 ${badge.color}`} />
                <span className="text-xs font-medium text-center leading-tight">{badge.name}</span>
                {badge.earned && (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mt-1"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 border-purple-200 text-purple-600 hover:bg-purple-50"
          >
            View Leaderboard
          </Button>
          <Button 
            size="sm" 
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
          >
            Unlock Next Level
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressStreakTracker;