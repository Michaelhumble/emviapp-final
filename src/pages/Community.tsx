
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Search, Sparkles, Camera, Video, Plus, Heart, MessageCircle, Share2, Bookmark, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CommunityStoryForm from '@/components/community/CommunityStoryForm';

const Community = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const quickFilters = [
    { id: 'all', label: 'All', icon: Sparkles, color: 'bg-purple-500' },
    { id: 'nails', label: 'Nails', icon: Heart, color: 'bg-pink-500' },
    { id: 'hair', label: 'Hair', icon: Camera, color: 'bg-blue-500' },
    { id: 'makeup', label: 'Makeup', icon: Video, color: 'bg-orange-500' },
  ];

  const trendingTopics = [
    { tag: 'nail-art-2024', posts: 234, emoji: '💅' },
    { tag: 'lash-extensions', posts: 189, emoji: '👁️' },
    { tag: 'hair-color', posts: 156, emoji: '🌈' },
    { tag: 'skincare-tips', posts: 143, emoji: '✨' },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Ultra-Minimal Header - Just Search */}
        <div className="sticky top-0 z-30 bg-white border-b shadow-sm">
          <div className="px-4 py-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search posts, creators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 rounded-lg border-gray-200 focus:border-purple-400"
              />
            </div>
          </div>
        </div>

        <div className="px-4 py-4 space-y-3">
          {/* Inline Filter Pills - More Space Efficient */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {quickFilters.map((filter) => (
              <Badge
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                className={`cursor-pointer whitespace-nowrap px-3 py-1 ${
                  activeFilter === filter.id 
                    ? 'bg-purple-500 hover:bg-purple-600' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label} {filter.id === 'all' ? '2.3k' : Math.floor(Math.random() * 500 + 100)}
              </Badge>
            ))}
            <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">
              <TrendingUp className="h-3 w-3 mr-1" />
              Trending
            </Badge>
          </div>

          {/* Quick Post Composer - Simplified */}
          <Card className="shadow-sm border-0">
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white font-semibold text-xs">You</span>
                </div>
                <button className="flex-1 text-left px-3 py-2 bg-gray-50 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors text-sm">
                  Share your beauty moment...
                </button>
                <Button size="sm" className="bg-purple-500 hover:bg-purple-600 rounded-lg px-3">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Sample Posts Feed */}
          <div className="space-y-4">
            {/* Sample Post 1 */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">A</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Alex Chen</h4>
                    <p className="text-sm text-gray-500">Nail Artist • 2h ago</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-gray-400">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
                
                <p className="text-gray-800 mb-3">
                  Just finished this stunning ombre design! The transition from purple to pink is everything 💜✨
                </p>
                
                <div className="w-full h-48 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-white font-medium">Beautiful Nail Art</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50">
                      <Heart className="h-4 w-4 mr-1" />
                      24
                    </Button>
                    <Button variant="ghost" size="sm" className="text-blue-500 hover:bg-blue-50">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      8
                    </Button>
                    <Button variant="ghost" size="sm" className="text-green-500 hover:bg-green-50">
                      <Share2 className="h-4 w-4 mr-1" />
                      3
                    </Button>
                  </div>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    #nail-art-2024
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Sample Post 2 */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">M</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Maya Rodriguez</h4>
                    <p className="text-sm text-gray-500">Hair Stylist • 4h ago</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-gray-400">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
                
                <p className="text-gray-800 mb-3">
                  Client transformation day! From damaged hair to healthy, vibrant curls 🌟 Sometimes all it takes is the right care routine.
                </p>
                
                <div className="w-full h-48 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-white font-medium">Hair Transformation</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50">
                      <Heart className="h-4 w-4 mr-1" />
                      42
                    </Button>
                    <Button variant="ghost" size="sm" className="text-blue-500 hover:bg-blue-50">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      15
                    </Button>
                    <Button variant="ghost" size="sm" className="text-green-500 hover:bg-green-50">
                      <Share2 className="h-4 w-4 mr-1" />
                      7
                    </Button>
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    #hair-transformation
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Add some bottom padding for tab bar */}
          <div className="h-20"></div>
        </div>
      </div>
    </Layout>
  );
};

export default Community;
