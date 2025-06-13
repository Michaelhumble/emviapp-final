
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Medal, Award, Star, Crown, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  points: number;
  rank: number;
  badges: string[];
  specialty: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  progress: number;
  maxProgress: number;
}

const AchievementLeaderboard = () => {
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly' | 'all-time'>('weekly');
  
  const leaderboardData: LeaderboardUser[] = [
    {
      id: '1',
      name: 'Emma Chen',
      avatar: '/api/placeholder/40/40',
      points: 2847,
      rank: 1,
      badges: ['mentor', 'influencer', 'expert'],
      specialty: 'Nail Art'
    },
    {
      id: '2',
      name: 'David Kim',
      avatar: '/api/placeholder/40/40',
      points: 2156,
      rank: 2,
      badges: ['helper', 'consistent'],
      specialty: 'Hair Styling'
    },
    {
      id: '3',
      name: 'Sophie Johnson',
      avatar: '/api/placeholder/40/40',
      points: 1923,
      rank: 3,
      badges: ['storyteller', 'inspiring'],
      specialty: 'Makeup'
    }
  ];

  const achievements: Achievement[] = [
    {
      id: '1',
      name: 'Community Helper',
      description: 'Help 50 community members',
      icon: <Star className="h-5 w-5" />,
      rarity: 'common',
      progress: 32,
      maxProgress: 50
    },
    {
      id: '2',
      name: 'Story Master',
      description: 'Share 10 inspiring stories',
      icon: <Award className="h-5 w-5" />,
      rarity: 'rare',
      progress: 7,
      maxProgress: 10
    },
    {
      id: '3',
      name: 'Mentor Legend',
      description: 'Successfully mentor 5 professionals',
      icon: <Crown className="h-5 w-5" />,
      rarity: 'legendary',
      progress: 2,
      maxProgress: 5
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Medal className="h-5 w-5 text-gray-400" />;
      case 3: return <Award className="h-5 w-5 text-amber-600" />;
      default: return <Trophy className="h-4 w-4 text-gray-300" />;
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-700';
      case 'rare': return 'bg-blue-100 text-blue-700';
      case 'epic': return 'bg-purple-100 text-purple-700';
      case 'legendary': return 'bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leaderboard */}
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Community Leaderboard
            </CardTitle>
            <div className="flex gap-2 mt-2">
              {(['weekly', 'monthly', 'all-time'] as const).map((tab) => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveTab(tab)}
                  className="capitalize"
                >
                  {tab.replace('-', ' ')}
                </Button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboardData.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    user.rank <= 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {getRankIcon(user.rank)}
                    <span className="font-bold text-lg">#{user.rank}</span>
                  </div>
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{user.name}</h4>
                    <p className="text-sm text-gray-500">{user.specialty}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-purple-600">{user.points.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">points</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-500" />
              Your Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${getRarityColor(achievement.rarity)}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{achievement.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                      
                      {/* Progress bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{achievement.progress}/{achievement.maxProgress}</span>
                          <span className="capitalize">{achievement.rarity}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AchievementLeaderboard;
