import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Share2, TrendingUp, Medal, Crown, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SharerStats {
  id: string;
  name: string;
  avatar?: string;
  shares: number;
  points: number;
  rank: number;
  streak: number;
  badges: string[];
}

const SharerLeaderboard: React.FC = () => {
  const [topSharers, setTopSharers] = useState<SharerStats[]>([]);
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'all'>('week');

  // Mock data - in real app, this would come from your database
  useEffect(() => {
    const mockData: SharerStats[] = [
      {
        id: '1',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150',
        shares: 142,
        points: 710,
        rank: 1,
        streak: 7,
        badges: ['viral-master', 'share-champion', 'early-adopter']
      },
      {
        id: '2', 
        name: 'Maya Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        shares: 98,
        points: 490,
        rank: 2,
        streak: 4,
        badges: ['influencer', 'consistent-sharer']
      },
      {
        id: '3',
        name: 'Alex Kim',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        shares: 76,
        points: 380,
        rank: 3,
        streak: 2,
        badges: ['rising-star']
      },
      {
        id: '4',
        name: 'Jordan Taylor',
        shares: 54,
        points: 270,
        rank: 4,
        streak: 1,
        badges: []
      },
      {
        id: '5',
        name: 'Casey Miller',
        shares: 41,
        points: 205,
        rank: 5,
        streak: 3,
        badges: ['loyal-sharer']
      }
    ];
    setTopSharers(mockData);
  }, [timeframe]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Medal className="h-5 w-5 text-gray-400" />;
      case 3: return <Medal className="h-5 w-5 text-amber-600" />;
      default: return <Trophy className="h-4 w-4 text-gray-400" />;
    }
  };

  const getBadgeColor = (badge: string) => {
    const colors = {
      'viral-master': 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
      'share-champion': 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white',
      'early-adopter': 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
      'influencer': 'bg-gradient-to-r from-orange-500 to-red-500 text-white',
      'consistent-sharer': 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white',
      'rising-star': 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white',
      'loyal-sharer': 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
    };
    return colors[badge as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-purple-600" />
          <CardTitle className="text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Top Sharers 🏆
          </CardTitle>
        </div>
        <div className="flex gap-2">
          {(['week', 'month', 'all'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-3 py-1 text-xs rounded-full transition-all ${
                timeframe === period
                  ? 'bg-purple-500 text-white shadow-md'
                  : 'bg-white text-purple-600 hover:bg-purple-100'
              }`}
            >
              {period === 'all' ? 'All Time' : `This ${period}`}
            </button>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <AnimatePresence mode="wait">
          {topSharers.map((sharer, index) => (
            <motion.div
              key={sharer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                sharer.rank <= 3 
                  ? 'bg-white/80 backdrop-blur-sm shadow-md border border-purple-100' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {getRankIcon(sharer.rank)}
                  <span className="font-bold text-sm text-gray-700">#{sharer.rank}</span>
                </div>
                
                <Avatar className="h-8 w-8">
                  <AvatarImage src={sharer.avatar} />
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                    {sharer.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <div className="font-medium text-sm text-gray-900">{sharer.name}</div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Share2 className="h-3 w-3" />
                    <span>{sharer.shares} shares</span>
                    {sharer.streak > 0 && (
                      <>
                        <span>•</span>
                        <span className="text-orange-600">{sharer.streak} day streak</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div className="font-bold text-sm text-purple-600">{sharer.points}</div>
                  <div className="text-xs text-gray-500">points</div>
                </div>
                
                {sharer.badges.length > 0 && (
                  <div className="flex flex-col gap-1">
                    {sharer.badges.slice(0, 2).map((badge) => (
                      <Badge
                        key={badge}
                        className={`${getBadgeColor(badge)} text-xs px-2 py-0 h-5 animate-pulse`}
                      >
                        <Star className="h-2 w-2 mr-1" />
                        {badge.replace('-', ' ')}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        <div className="text-center pt-2">
          <p className="text-xs text-gray-600">
            🎁 Share externally to earn points and climb the leaderboard!
          </p>
          <p className="text-xs text-purple-600 font-medium mt-1">
            Top sharers get exclusive early access to new features ✨
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SharerLeaderboard;