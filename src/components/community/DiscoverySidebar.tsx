import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, UserPlus, Sparkles, TrendingUp, Star, Users } from 'lucide-react';

const suggestedUsers = [
  {
    id: '1',
    name: 'Emily Chen',
    title: 'Nail Artist Extraordinaire',
    followers: 892,
    category: 'nails',
    avatar: '',
    isVerified: true,
    recentPost: 'Just finished this stunning galaxy nail design! ✨'
  },
  {
    id: '2',
    name: 'David Martinez',
    title: 'Hair Color Specialist',
    followers: 654,
    category: 'hair',
    avatar: '',
    isVerified: false,
    recentPost: 'Spring hair color trends are here! 🌸'
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    title: 'Makeup Artist',
    followers: 1234,
    category: 'makeup',
    avatar: '',
    isVerified: true,
    recentPost: 'Bold looks for confident women 💄'
  }
];

const trendingTopics = [
  { tag: 'summervibes', posts: 234 },
  { tag: 'nailart', posts: 189 },
  { tag: 'hairgoals', posts: 156 },
  { tag: 'makeuptutorial', posts: 143 },
  { tag: 'skincareroutine', posts: 98 },
  { tag: 'beforeafter', posts: 87 }
];

const DiscoverySidebar = () => {
  const getCategoryColor = (category: string) => {
    const colors = {
      nails: 'from-pink-500 to-rose-500',
      hair: 'from-purple-500 to-indigo-500',
      makeup: 'from-orange-500 to-red-500',
      skincare: 'from-green-500 to-emerald-500'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Suggested Users */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
            <UserPlus className="h-4 w-4 text-white" />
          </div>
          <h3 className="font-bold text-gray-900">Suggested For You</h3>
        </div>

        <div className="space-y-4">
          {suggestedUsers.map((user) => (
            <div key={user.id} className="flex items-start gap-3">
              <div className={`w-10 h-10 bg-gradient-to-r ${getCategoryColor(user.category)} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-gray-900 text-sm truncate">
                    {user.name}
                  </span>
                  {user.isVerified && (
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  )}
                </div>
                <p className="text-xs text-gray-600 mb-1">{user.title}</p>
                <p className="text-xs text-gray-500 leading-tight mb-2">
                  "{user.recentPost}"
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {user.followers.toLocaleString()} followers
                  </span>
                  <Button size="sm" variant="outline" className="text-xs h-6 px-2">
                    Follow
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button 
          variant="outline" 
          className="w-full mt-4 border-purple-200 hover:bg-purple-50 text-purple-600"
        >
          <Search className="h-4 w-4 mr-2" />
          Discover More
        </Button>
      </Card>

      {/* Trending Topics */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
          <h3 className="font-bold text-gray-900">Trending Topics</h3>
        </div>

        <div className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <div key={topic.tag} className="flex items-center justify-between hover:bg-purple-50 p-2 rounded-lg cursor-pointer transition-colors">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-purple-600">
                  #{index + 1}
                </span>
                <span className="font-medium text-gray-900">
                  #{topic.tag}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                {topic.posts} posts
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Community Stats */}
      <Card className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <div className="text-center space-y-3">
          <Sparkles className="h-8 w-8 mx-auto" />
          <h3 className="font-bold text-lg">Join the Movement</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span>Active Members:</span>
              <span className="font-bold">2,847</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Posts Today:</span>
              <span className="font-bold">156</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Stories Shared:</span>
              <span className="font-bold">12,450</span>
            </div>
          </div>
          <Button 
            variant="secondary" 
            className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 mt-4"
          >
            <Users className="h-4 w-4 mr-2" />
            Invite Friends
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default DiscoverySidebar;