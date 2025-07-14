import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Crown, TrendingUp, Users, Star } from 'lucide-react';

const TopCreators = () => {
  const topCreators = [
    {
      id: 1,
      name: 'Luna Martinez',
      category: 'Nail Artist',
      followers: '12.3K',
      posts: 89,
      avatar: '',
      badge: 'gold',
      trending: true,
      location: 'Miami, FL'
    },
    {
      id: 2,
      name: 'Sophia Kim',
      category: 'Hair Stylist',
      followers: '9.8K',
      posts: 124,
      avatar: '',
      badge: 'silver',
      trending: true,
      location: 'LA, CA'
    },
    {
      id: 3,
      name: 'Maya Johnson',
      category: 'Makeup Artist',
      followers: '8.1K',
      posts: 67,
      avatar: '',
      badge: 'bronze',
      trending: false,
      location: 'NYC, NY'
    }
  ];

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'gold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'silver': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'bronze': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-purple-100 text-purple-800 border-purple-200';
    }
  };

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'gold': return '🥇';
      case 'silver': return '🥈';
      case 'bronze': return '🥉';
      default: return '⭐';
    }
  };

  return (
    <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Crown className="h-5 w-5 text-indigo-600" />
          <span className="font-bold text-indigo-800">Top Creators This Week</span>
          <TrendingUp className="h-4 w-4 text-indigo-600" />
        </div>

        <div className="space-y-3">
          {topCreators.map((creator, index) => (
            <div key={creator.id} className="flex items-center gap-3 p-3 bg-white/60 rounded-lg backdrop-blur-sm">
              <div className="relative">
                <div className="absolute -top-1 -left-1 text-lg">
                  {getBadgeIcon(creator.badge)}
                </div>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={creator.avatar} />
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    {creator.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-900 truncate">
                    {creator.name}
                  </h4>
                  {creator.trending && (
                    <Badge className="bg-red-100 text-red-800 text-xs px-1">
                      🔥 Hot
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span>{creator.category}</span>
                  <span>•</span>
                  <span>{creator.location}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {creator.followers} followers
                  </span>
                  <span>{creator.posts} posts</span>
                </div>
              </div>

              <Button
                size="sm"
                variant="outline"
                className="bg-white/80 hover:bg-white text-purple-600 border-purple-200 px-3"
              >
                Follow
              </Button>
            </div>
          ))}
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="w-full mt-3 text-indigo-600 hover:bg-indigo-50"
        >
          <Star className="h-4 w-4 mr-1" />
          View Full Leaderboard
        </Button>
      </CardContent>
    </Card>
  );
};

export default TopCreators;