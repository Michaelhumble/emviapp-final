import React from 'react';
import { TrendingUp, Sparkles, Hash } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const trendingTopics = [
  { tag: 'nail-art-2024', posts: 234, growth: '+12%', trend: 'hot' },
  { tag: 'lash-extensions', posts: 189, growth: '+8%', trend: 'rising' },
  { tag: 'color-theory', posts: 156, growth: '+15%', trend: 'hot' },
  { tag: 'salon-setup', posts: 145, growth: '+6%', trend: 'steady' },
  { tag: 'client-tips', posts: 134, growth: '+20%', trend: 'hot' },
  { tag: 'beauty-trends', posts: 128, growth: '+10%', trend: 'rising' },
  { tag: 'skin-care', posts: 112, growth: '+5%', trend: 'steady' },
  { tag: 'hair-color', posts: 98, growth: '+25%', trend: 'hot' },
];

const TrendingTopics = () => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'hot':
        return <Sparkles className="h-3 w-3 text-orange-500" />;
      case 'rising':
        return <TrendingUp className="h-3 w-3 text-green-500" />;
      default:
        return <Hash className="h-3 w-3 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'hot':
        return 'border-l-orange-500 bg-orange-50';
      case 'rising':
        return 'border-l-green-500 bg-green-50';
      default:
        return 'border-l-gray-300 bg-gray-50';
    }
  };

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-5 w-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">Trending Topics</h3>
        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs">
          Hot
        </Badge>
      </div>
      
      {/* Mobile/iPad Horizontal Scroll */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide lg:hidden">
        {trendingTopics.slice(0, 6).map((topic, index) => (
          <button
            key={topic.tag}
            className={`flex-shrink-0 p-3 rounded-lg border-l-4 transition-all hover:scale-105 ${getTrendColor(topic.trend)} hover:shadow-md`}
          >
            <div className="flex items-center gap-2 mb-1">
              {getTrendIcon(topic.trend)}
              <span className="font-medium text-gray-900 text-sm whitespace-nowrap">
                #{topic.tag}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span>{topic.posts} posts</span>
              <span className="text-green-600 font-medium">{topic.growth}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Desktop Vertical List */}
      <div className="hidden lg:block space-y-3">
        {trendingTopics.map((topic, index) => (
          <button
            key={topic.tag}
            className={`w-full p-3 rounded-lg border-l-4 transition-all hover:scale-105 ${getTrendColor(topic.trend)} hover:shadow-md`}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                {getTrendIcon(topic.trend)}
                <span className="font-medium text-gray-900 text-sm">
                  #{topic.tag}
                </span>
              </div>
              <span className="text-green-600 text-xs font-medium">{topic.growth}</span>
            </div>
            <div className="text-xs text-gray-600 text-left">
              {topic.posts} posts
            </div>
          </button>
        ))}
      </div>
    </Card>
  );
};

export default TrendingTopics;