
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Search, Sparkles, Camera, Video, Image, Plus, Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        {/* Compact Header - Mobile Optimized */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-purple-100 shadow-sm">
          <div className="px-4 py-3">
            {/* Search Bar */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search posts, creators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 rounded-full border-gray-200 focus:border-purple-400 focus:ring-purple-400 bg-gray-50"
              />
            </div>

            {/* Quick Filters - Horizontal Scroll */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {quickFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                    activeFilter === filter.id
                      ? `${filter.color} text-white shadow-lg`
                      : 'bg-white text-gray-700 border border-gray-200'
                  }`}
                >
                  <filter.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{filter.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="px-4 py-4 space-y-4">
          {/* Quick Post Composer */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">You</span>
                </div>
                <div className="flex-1">
                  <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-full text-gray-500 hover:bg-gray-100 transition-colors">
                    Share your beauty story...
                  </button>
                </div>
              </div>
              
              {/* Quick Action Buttons */}
              <div className="flex justify-around">
                <Button variant="ghost" size="sm" className="flex-1 text-purple-600 hover:bg-purple-50">
                  <Camera className="h-4 w-4 mr-2" />
                  Photo
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 text-pink-600 hover:bg-pink-50">
                  <Video className="h-4 w-4 mr-2" />
                  Video
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 text-orange-600 hover:bg-orange-50">
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI Polish
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Trending Topics - Compact Card */}
          <Card className="border-0 shadow-md bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5" />
                <h3 className="font-bold">Trending Now</h3>
                <Badge className="bg-white/20 text-white border-0">Hot</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {trendingTopics.map((topic) => (
                  <button
                    key={topic.tag}
                    className="flex items-center gap-2 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <span className="text-lg">{topic.emoji}</span>
                    <div className="text-left">
                      <p className="text-sm font-medium">#{topic.tag}</p>
                      <p className="text-xs opacity-80">{topic.posts} posts</p>
                    </div>
                  </button>
                ))}
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

          {/* Floating Action Button - Better positioned */}
          <div className="fixed bottom-20 right-4 z-40">
            <Button
              size="lg"
              className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-xl hover:shadow-2xl transition-all duration-200"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Community;
