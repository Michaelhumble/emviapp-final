import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Crown, Zap, Users, Calendar, Award, Target, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Participant {
  id: string;
  name: string;
  avatar: string;
  score: number;
  rank: number;
  submissionCount: number;
  isCurrentUser?: boolean;
}

interface BeautyBattle {
  id: string;
  title: string;
  description: string;
  category: string;
  prize: string;
  endDate: Date;
  totalParticipants: number;
  submissions: number;
  trending: boolean;
}

const BeautyBattlesLeaderboard = () => {
  const [activeTab, setActiveTab] = useState<'battles' | 'leaderboard' | 'myProgress'>('battles');
  const [selectedBattle, setSelectedBattle] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: string }>({});

  // Mock data for battles
  const battles: BeautyBattle[] = [
    {
      id: '1',
      title: '🔥 Ultimate Nail Art Challenge',
      description: 'Show us your most creative nail design using autumn colors',
      category: 'Nail Art',
      prize: '$500 Cash + Featured Spotlight',
      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      totalParticipants: 234,
      submissions: 89,
      trending: true
    },
    {
      id: '2',
      title: '💇‍♀️ Hair Transformation Battle',
      description: 'Before & after transformations that wow!',
      category: 'Hair Styling',
      prize: '$300 Cash + VIP Badge',
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      totalParticipants: 156,
      submissions: 67,
      trending: false
    },
    {
      id: '3',
      title: '✨ Makeup Artistry Showdown',
      description: 'Create a look inspired by your favorite movie character',
      category: 'Makeup',
      prize: '$400 Cash + Masterclass Access',
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      totalParticipants: 189,
      submissions: 45,
      trending: true
    }
  ];

  // Mock leaderboard data
  const leaderboard: Participant[] = [
    { id: '1', name: 'Sarah Chen', avatar: '/api/placeholder/40/40', score: 2850, rank: 1, submissionCount: 12 },
    { id: '2', name: 'Maria Garcia', avatar: '/api/placeholder/40/40', score: 2720, rank: 2, submissionCount: 10 },
    { id: '3', name: 'You', avatar: '/api/placeholder/40/40', score: 2650, rank: 3, submissionCount: 8, isCurrentUser: true },
    { id: '4', name: 'Jessica Kim', avatar: '/api/placeholder/40/40', score: 2580, rank: 4, submissionCount: 9 },
    { id: '5', name: 'Amanda Rose', avatar: '/api/placeholder/40/40', score: 2450, rank: 5, submissionCount: 7 }
  ];

  // Calculate time remaining
  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft: { [key: string]: string } = {};
      battles.forEach(battle => {
        const now = new Date().getTime();
        const distance = battle.endDate.getTime() - now;
        
        if (distance > 0) {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          
          newTimeLeft[battle.id] = `${days}d ${hours}h ${minutes}m`;
        } else {
          newTimeLeft[battle.id] = 'Ended';
        }
      });
      setTimeLeft(newTimeLeft);
    }, 60000);

    return () => clearInterval(interval);
  }, [battles]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Trophy className="h-5 w-5 text-gray-400" />;
      case 3: return <Award className="h-5 w-5 text-orange-500" />;
      default: return <Target className="h-5 w-5 text-gray-400" />;
    }
  };

  const getBattleStatusColor = (battle: BeautyBattle) => {
    const now = new Date();
    const hoursLeft = (battle.endDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    if (hoursLeft < 24) return 'from-red-500 to-pink-500';
    if (hoursLeft < 72) return 'from-orange-500 to-yellow-500';
    return 'from-green-500 to-blue-500';
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
        {[
          { id: 'battles', label: 'Active Battles', icon: Flame },
          { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
          { id: 'myProgress', label: 'My Progress', icon: Target }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 ${activeTab === tab.id 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                : 'text-gray-600'
              }`}
            >
              <Icon className="mr-2 h-4 w-4" />
              {tab.label}
            </Button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {/* Active Battles Tab */}
        {activeTab === 'battles' && (
          <motion.div
            key="battles"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {battles.map((battle, index) => (
              <motion.div
                key={battle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`border-2 overflow-hidden ${
                  battle.trending 
                    ? 'border-purple-300 bg-gradient-to-br from-purple-50 via-white to-pink-50' 
                    : 'border-gray-200 bg-white'
                }`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg">{battle.title}</CardTitle>
                          {battle.trending && (
                            <motion.div
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
                                🔥 Trending
                              </Badge>
                            </motion.div>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{battle.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {battle.totalParticipants} joined
                          </span>
                          <span className="flex items-center gap-1">
                            <Zap className="h-4 w-4" />
                            {battle.submissions} submissions
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {timeLeft[battle.id] || 'Calculating...'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <Badge variant="secondary" className="mb-2">
                          {battle.category}
                        </Badge>
                        <p className="text-sm font-semibold text-green-600">{battle.prize}</p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Progress</span>
                          <span>{Math.round((battle.submissions / battle.totalParticipants) * 100)}%</span>
                        </div>
                        <Progress 
                          value={(battle.submissions / battle.totalParticipants) * 100} 
                          className={`h-2 bg-gray-100 [&>div]:bg-gradient-to-r [&>div]:${getBattleStatusColor(battle)}`}
                        />
                      </div>
                      
                      <Button 
                        className={`bg-gradient-to-r ${getBattleStatusColor(battle)} hover:opacity-90 text-white font-semibold`}
                      >
                        Join Battle
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <motion.div
            key="leaderboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="bg-gradient-to-br from-yellow-50 via-white to-orange-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                  Global Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {leaderboard.map((participant, index) => (
                  <motion.div
                    key={participant.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                      participant.isCurrentUser 
                        ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-300 shadow-md' 
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {getRankIcon(participant.rank)}
                        <span className="font-bold text-lg text-gray-700">#{participant.rank}</span>
                      </div>
                      
                      <img 
                        src={participant.avatar} 
                        alt={participant.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200"
                      />
                      
                      <div>
                        <p className="font-semibold text-gray-900">{participant.name}</p>
                        <p className="text-sm text-gray-500">{participant.submissionCount} submissions</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-xl text-purple-600">{participant.score.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">points</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* My Progress Tab */}
        {activeTab === 'myProgress' && (
          <motion.div
            key="myProgress"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <Card className="bg-gradient-to-br from-purple-50 via-white to-pink-50 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  Your Battle Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-white rounded-xl border border-purple-100">
                    <p className="text-2xl font-bold text-purple-600">8</p>
                    <p className="text-sm text-gray-600">Battles Joined</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl border border-purple-100">
                    <p className="text-2xl font-bold text-green-600">3</p>
                    <p className="text-sm text-gray-600">Battles Won</p>
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold">
                  View All My Submissions
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BeautyBattlesLeaderboard;