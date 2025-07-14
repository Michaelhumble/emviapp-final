import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Trophy, Star, TrendingUp, Users, Heart } from 'lucide-react';

const leaderboardData = [
  {
    id: '1',
    name: 'Isabella Rodriguez',
    avatar: '',
    level: 'Diamond',
    points: 2847,
    posts: 156,
    likes: 12430,
    badge: 'Top Creator',
    badgeColor: 'bg-yellow-100 text-yellow-700'
  },
  {
    id: '2',
    name: 'Marcus Chen',
    avatar: '',
    level: 'Platinum',
    points: 2156,
    posts: 89,
    likes: 8920,
    badge: 'Rising Star',
    badgeColor: 'bg-purple-100 text-purple-700'
  },
  {
    id: '3',
    name: 'Sophia Williams',
    avatar: '',
    level: 'Gold',
    points: 1823,
    posts: 72,
    likes: 6450,
    badge: 'Trendsetter',
    badgeColor: 'bg-pink-100 text-pink-700'
  },
  {
    id: '4',
    name: 'Alex Thompson',
    avatar: '',
    level: 'Gold',
    points: 1654,
    posts: 58,
    likes: 5230,
    badge: 'Helper',
    badgeColor: 'bg-blue-100 text-blue-700'
  },
  {
    id: '5',
    name: 'Maya Patel',
    avatar: '',
    level: 'Silver',
    points: 1421,
    posts: 45,
    likes: 4120,
    badge: 'Newcomer',
    badgeColor: 'bg-green-100 text-green-700'
  }
];

const CommunityLeaderboard = () => {
  const getLevelColor = (level: string) => {
    const colors = {
      Diamond: 'from-purple-600 to-pink-600',
      Platinum: 'from-gray-400 to-gray-600',
      Gold: 'from-yellow-500 to-orange-500',
      Silver: 'from-gray-300 to-gray-500',
      Bronze: 'from-orange-600 to-red-600'
    };
    return colors[level as keyof typeof colors] || colors.Bronze;
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return <Crown className="h-5 w-5 text-yellow-500" />;
    if (index === 1) return <Trophy className="h-5 w-5 text-gray-400" />;
    if (index === 2) return <Star className="h-5 w-5 text-orange-500" />;
    return <span className="text-sm font-bold text-gray-500">#{index + 1}</span>;
  };

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
          <TrendingUp className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-gray-900">Community Leaders</h3>
          <p className="text-sm text-gray-600">This week's top contributors</p>
        </div>
      </div>

      <div className="space-y-4">
        {leaderboardData.map((user, index) => (
          <div key={user.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 transition-colors">
            {/* Rank */}
            <div className="w-8 flex justify-center">
              {getRankIcon(index)}
            </div>

            {/* Avatar */}
            <div className={`w-10 h-10 bg-gradient-to-r ${getLevelColor(user.level)} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
              {user.name.charAt(0)}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900 truncate">
                  {user.name}
                </span>
                <Badge className={user.badgeColor}>
                  {user.badge}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {user.posts} posts
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  {user.likes.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Points */}
            <div className="text-right">
              <div className="font-bold text-purple-600">
                {user.points.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">
                {user.level}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-purple-100">
        <Button 
          variant="outline" 
          className="w-full border-purple-200 hover:bg-purple-50 text-purple-600"
        >
          View Full Leaderboard
        </Button>
      </div>

      {/* Your Rank */}
      <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Your rank this week:</span>
          <span className="font-bold text-purple-600">#47 (1,234 points)</span>
        </div>
      </div>
    </Card>
  );
};

export default CommunityLeaderboard;