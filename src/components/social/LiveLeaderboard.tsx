import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Crown, Star, TrendingUp, Users, Zap, Gift, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  points: number;
  streak: number;
  referrals: number;
  bookings: number;
  level: number;
  badge: string;
  rank: number;
  weeklyGrowth: number;
}

interface LeaderboardProps {
  type?: 'global' | 'friends' | 'local';
  timeframe?: 'week' | 'month' | 'alltime';
}

const LiveLeaderboard: React.FC<LeaderboardProps> = ({ 
  type = 'global', 
  timeframe = 'week' 
}) => {
  const { user, userProfile } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [userRank, setUserRank] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'points' | 'referrals' | 'bookings'>('points');

  useEffect(() => {
    loadLeaderboard();
    const interval = setInterval(loadLeaderboard, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [type, timeframe, selectedTab]);

  const loadLeaderboard = async () => {
    try {
      setLoading(true);
      
      // Simulate live leaderboard data
      const mockUsers: LeaderboardUser[] = [
        {
          id: '1',
          name: 'Emma Beauty Queen',
          avatar: '',
          points: 2850,
          streak: 15,
          referrals: 12,
          bookings: 28,
          level: 8,
          badge: '👑 Beauty Empress',
          rank: 1,
          weeklyGrowth: 23
        },
        {
          id: '2', 
          name: 'Sofia Glam Guru',
          avatar: '',
          points: 2640,
          streak: 12,
          referrals: 9,
          bookings: 24,
          level: 7,
          badge: '✨ Glam Master',
          rank: 2,
          weeklyGrowth: 18
        },
        {
          id: '3',
          name: 'Mia Style Icon',
          avatar: '',
          points: 2420,
          streak: 9,
          referrals: 8,
          bookings: 22,
          level: 6,
          badge: '💎 Style Diamond',
          rank: 3,
          weeklyGrowth: 15
        },
        {
          id: '4',
          name: 'Aria Beauty Star',
          avatar: '',
          points: 2180,
          streak: 7,
          referrals: 6,
          bookings: 19,
          level: 5,
          badge: '⭐ Beauty Star',
          rank: 4,
          weeklyGrowth: 12
        },
        {
          id: user?.id || '5',
          name: userProfile?.full_name || 'You',
          avatar: userProfile?.avatar_url || '',
          points: 1950,
          streak: 5,
          referrals: 4,
          bookings: 16,
          level: 4,
          badge: '🚀 Rising Star',
          rank: 5,
          weeklyGrowth: 25
        }
      ];

      // Sort by selected metric
      const sortedUsers = [...mockUsers].sort((a, b) => {
        switch (selectedTab) {
          case 'referrals':
            return b.referrals - a.referrals;
          case 'bookings':
            return b.bookings - a.bookings;
          default:
            return b.points - a.points;
        }
      });

      // Update ranks
      sortedUsers.forEach((user, index) => {
        user.rank = index + 1;
      });

      setLeaderboard(sortedUsers);
      
      // Find user's rank
      const currentUserRank = sortedUsers.findIndex(u => u.id === user?.id) + 1;
      setUserRank(currentUserRank);

    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-400" />;
      case 2:
        return <Trophy className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Trophy className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-sm font-bold text-white/60">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-400 to-amber-500';
      case 2:
        return 'from-gray-300 to-gray-500';
      case 3:
        return 'from-amber-500 to-orange-600';
      default:
        return 'from-purple-400 to-pink-500';
    }
  };

  const handleShareRank = () => {
    const message = `🏆 I'm ranked #${userRank} on EmviApp's Beauty Leaderboard! Join me and climb the ranks! ✨`;
    navigator.clipboard.writeText(message);
    toast.success('Leaderboard status copied! Share your success! 🎉');
  };

  const getMetricValue = (user: LeaderboardUser) => {
    switch (selectedTab) {
      case 'referrals':
        return user.referrals;
      case 'bookings':
        return user.bookings;
      default:
        return user.points.toLocaleString();
    }
  };

  if (loading) {
    return (
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white/20 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-white/20 rounded w-3/4"></div>
                  <div className="h-3 bg-white/20 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-white">
            <Trophy className="h-5 w-5 mr-2 text-yellow-400" />
            Live Leaderboard
          </CardTitle>
          <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
            Live
          </Badge>
        </div>
        
        {/* Metric Tabs */}
        <div className="flex space-x-2">
          {[
            { key: 'points', label: 'Points', icon: Star },
            { key: 'referrals', label: 'Referrals', icon: Users },
            { key: 'bookings', label: 'Bookings', icon: TrendingUp }
          ].map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              variant={selectedTab === key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedTab(key as typeof selectedTab)}
              className={`${
                selectedTab === key
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-white/10 text-white/70 border-white/30 hover:bg-white/20'
              }`}
            >
              <Icon className="h-3 w-3 mr-1" />
              {label}
            </Button>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* User's Current Rank */}
        {userRank > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center">
                  {getRankIcon(userRank)}
                </div>
                <div>
                  <p className="font-semibold text-white">Your Rank: #{userRank}</p>
                  <p className="text-xs text-white/70">
                    {selectedTab === 'points' && `${leaderboard.find(u => u.id === user?.id)?.points.toLocaleString()} points`}
                    {selectedTab === 'referrals' && `${leaderboard.find(u => u.id === user?.id)?.referrals} referrals`}
                    {selectedTab === 'bookings' && `${leaderboard.find(u => u.id === user?.id)?.bookings} bookings`}
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                onClick={handleShareRank}
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                <Share2 className="h-3 w-3 mr-1" />
                Share
              </Button>
            </div>
          </motion.div>
        )}

        {/* Leaderboard List */}
        <div className="space-y-3 max-h-80 overflow-y-auto">
          <AnimatePresence>
            {leaderboard.slice(0, 10).map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center justify-between p-3 rounded-lg transition-all hover:scale-105 ${
                  user.id === user?.id
                    ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-400/50'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8">
                    {getRankIcon(user.rank)}
                  </div>
                  
                  <Avatar className="h-10 w-10 border-2 border-white/20">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className={`bg-gradient-to-r ${getRankColor(user.rank)} text-white font-bold`}>
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <p className="font-semibold text-white text-sm">{user.name}</p>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="text-white/70">{user.badge}</span>
                      {user.weeklyGrowth > 0 && (
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">
                          +{user.weeklyGrowth}%
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-white">
                    {getMetricValue(user)}
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-white/60">
                    <Zap className="h-3 w-3" />
                    <span>{user.streak} day streak</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Challenge Call-to-Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-white">Weekly Challenge</p>
              <p className="text-xs text-white/70">Climb 3 ranks to win 500 bonus points!</p>
            </div>
            <Gift className="h-6 w-6 text-amber-400" />
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default LiveLeaderboard;