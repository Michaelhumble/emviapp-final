
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, MessageCircle, Share2, TrendingUp, Users, Award,
  Play, Search, Filter, ChevronRight, Star, MapPin,
  Calendar, Clock, BookOpen, Mic, Video, Camera,
  Target, Trophy, Gift, Zap, ThumbsUp, Eye, Bell
} from "lucide-react";
import Layout from "@/components/layout/Layout";

export default function FreelancersCommunity() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [newPost, setNewPost] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for posts
  const posts = [
    {
      id: 1,
      author: "Sarah M.",
      avatar: "/lovable-uploads/avatar1.jpg",
      time: "2 hours ago",
      content: "Just completed my first bridal makeup! The bride was absolutely glowing. Any tips for wedding day timeline management?",
      image: "/lovable-uploads/bridal-makeup.jpg",
      likes: 24,
      comments: 8,
      category: "advice"
    },
    {
      id: 2,
      author: "Mike Chen",
      avatar: "/lovable-uploads/avatar2.jpg",
      time: "4 hours ago",
      content: "Opened my second salon location today! Dreams do come true with hard work and this amazing community's support 💪",
      likes: 89,
      comments: 23,
      category: "wins"
    },
    {
      id: 3,
      author: "Luna Rodriguez",
      avatar: "/lovable-uploads/avatar3.jpg",
      time: "6 hours ago",
      content: "Looking for a nail artist to collaborate on a photoshoot next week in downtown LA. Split the portfolio benefits!",
      likes: 15,
      comments: 12,
      category: "collaboration"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Posts', count: 156 },
    { id: 'advice', name: 'Advice', count: 42 },
    { id: 'wins', name: 'Wins & Success', count: 28 },
    { id: 'collaboration', name: 'Collaborations', count: 19 },
    { id: 'local', name: 'Local Meetups', count: 8 },
    { id: 'promote', name: 'Promote Yourself', count: 34 }
  ];

  const trendingTopics = [
    "#BridalSeason2024", "#ColorCorrection", "#NailArt", "#SalonOwnerTips",
    "#BeautyTrends", "#ClientRetention", "#InstagramMarketing"
  ];

  const achievements = [
    { icon: Trophy, name: "Top Contributor", color: "text-yellow-500" },
    { icon: Star, name: "5-Star Reviews", color: "text-blue-500" },
    { icon: Users, name: "Community Leader", color: "text-purple-500" },
    { icon: Target, name: "Goal Crusher", color: "text-green-500" }
  ];

  const successTicker = [
    "Sarah from NY just booked $500 client!",
    "Mike opened his 2nd salon location!",
    "Luna got featured in Beauty Magazine!",
    "Jessica hit $10K monthly revenue!",
    "Alex completed advanced color certification!"
  ];

  const [currentTicker, setCurrentTicker] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTicker((prev) => (prev + 1) % successTicker.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      // In real app, this would create a new post
      setNewPost('');
      // Show success feedback
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        {/* Fixed Header */}
        <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold font-serif bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Beauty Community
                </h1>
                <p className="text-gray-600 text-sm md:text-base">Connect, inspire, learn, and grow together</p>
              </div>
              
              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search posts, topics, or members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/80 border-purple-200 focus:border-purple-400 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              {/* Online Members Counter */}
              <Card className="border-purple-200 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">Online now</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-600">2,847</div>
                  <div className="text-sm text-gray-500">Active members</div>
                </CardContent>
              </Card>

              {/* Categories */}
              <Card className="border-purple-200 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveFilter(category.id)}
                      className={`w-full flex items-center justify-between p-3 hover:bg-purple-50 transition-colors ${
                        activeFilter === category.id ? 'bg-purple-100 border-r-2 border-purple-500' : ''
                      }`}
                    >
                      <span className={`text-sm ${activeFilter === category.id ? 'font-medium text-purple-700' : 'text-gray-600'}`}>
                        {category.name}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </button>
                  ))}
                </CardContent>
              </Card>

              {/* Trending Topics */}
              <Card className="border-purple-200 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Trending</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {trendingTopics.map((topic, index) => (
                    <button
                      key={index}
                      className="block w-full text-left p-2 text-sm text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
                    >
                      {topic}
                    </button>
                  ))}
                </CardContent>
              </Card>

              {/* Achievement Badges */}
              <Card className="border-purple-200 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Your Achievements</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-2">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex flex-col items-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <achievement.icon className={`h-6 w-6 ${achievement.color} mb-1`} />
                      <span className="text-xs text-center text-gray-600">{achievement.name}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Success Ticker */}
              <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <div className="text-green-700 font-medium animate-pulse">
                      🎉 {successTicker[currentTicker]}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Create Post */}
              <Card className="border-purple-200 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/lovable-uploads/default-avatar.jpg" />
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-3">
                      <Textarea
                        placeholder="What's on your mind? Share your story or ask a question!"
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        className="resize-none border-purple-200 focus:border-purple-400"
                        rows={3}
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="text-purple-600 hover:bg-purple-100">
                            <Camera className="h-4 w-4 mr-1" />
                            Photo
                          </Button>
                          <Button variant="ghost" size="sm" className="text-purple-600 hover:bg-purple-100">
                            <Video className="h-4 w-4 mr-1" />
                            Video
                          </Button>
                        </div>
                        <Button 
                          onClick={handlePostSubmit}
                          disabled={!newPost.trim()}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                        >
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Filter Tabs */}
              <Tabs defaultValue="hot" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-white/80 border border-purple-200">
                  <TabsTrigger value="hot" className="data-[state=active]:bg-purple-100">🔥 Hot Now</TabsTrigger>
                  <TabsTrigger value="new" className="data-[state=active]:bg-purple-100">⭐ New</TabsTrigger>
                  <TabsTrigger value="unanswered" className="data-[state=active]:bg-purple-100">❓ Unanswered</TabsTrigger>
                </TabsList>

                <TabsContent value="hot" className="space-y-4 mt-4">
                  {posts.map((post) => (
                    <Card key={post.id} className="border-purple-200 bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-200">
                      <CardContent className="p-4">
                        <div className="flex gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={post.avatar} />
                            <AvatarFallback>{post.author[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium text-gray-900">{post.author}</span>
                              <span className="text-sm text-gray-500">{post.time}</span>
                              <Badge variant="outline" className="text-xs">
                                {post.category}
                              </Badge>
                            </div>
                            <p className="text-gray-700 mb-3">{post.content}</p>
                            {post.image && (
                              <div className="mb-3">
                                <img 
                                  src={post.image} 
                                  alt="Post content" 
                                  className="w-full max-w-md rounded-lg object-cover"
                                />
                              </div>
                            )}
                            <div className="flex items-center gap-4">
                              <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors group">
                                <Heart className="h-4 w-4 group-hover:fill-current" />
                                <span className="text-sm">{post.likes}</span>
                              </button>
                              <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                                <MessageCircle className="h-4 w-4" />
                                <span className="text-sm">{post.comments}</span>
                              </button>
                              <button className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors">
                                <Share2 className="h-4 w-4" />
                                <span className="text-sm">Share</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="new" className="space-y-4 mt-4">
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>New posts will appear here</p>
                  </div>
                </TabsContent>

                <TabsContent value="unanswered" className="space-y-4 mt-4">
                  <div className="text-center py-8 text-gray-500">
                    <MessageCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Questions waiting for answers will appear here</p>
                  </div>
                </TabsContent>
              </Tabs>

              {/* User Spotlights */}
              <Card className="border-purple-200 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Community Spotlights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="/lovable-uploads/spotlight1.jpg" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Jessica D.</div>
                        <div className="text-sm text-gray-600">Master Colorist</div>
                        <div className="text-xs text-purple-600">Featured for innovation</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="/lovable-uploads/spotlight2.jpg" />
                        <AvatarFallback>RM</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Roberto M.</div>
                        <div className="text-sm text-gray-600">Salon Owner</div>
                        <div className="text-xs text-blue-600">Community Helper</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Challenge */}
              <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-orange-500" />
                    This Week's Challenge
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h3 className="font-medium text-orange-900">"Natural Glow Transformation"</h3>
                    <p className="text-sm text-orange-700">
                      Share your best natural makeup look that enhances client's natural beauty. 
                      Vote for your favorites and win exclusive prizes!
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-orange-600">47 entries so far</div>
                      <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                        Join Challenge
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Coming Soon Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageCircle className="h-5 w-5 text-indigo-500" />
                      <span className="font-medium text-indigo-900">Direct Messaging</span>
                    </div>
                    <p className="text-sm text-indigo-700 mb-3">
                      Private conversations with community members coming soon!
                    </p>
                    <Button size="sm" variant="outline" className="border-indigo-300 text-indigo-600 hover:bg-indigo-100">
                      Join Waitlist
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-5 w-5 text-emerald-500" />
                      <span className="font-medium text-emerald-900">Group Chats</span>
                    </div>
                    <p className="text-sm text-emerald-700 mb-3">
                      Join specialized groups for focused discussions and networking.
                    </p>
                    <Button size="sm" variant="outline" className="border-emerald-300 text-emerald-600 hover:bg-emerald-100">
                      Get Early Access
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Sponsored Partners */}
              <Card className="border-2 border-dashed border-gray-300 bg-gray-50/50">
                <CardContent className="p-6 text-center">
                  <div className="text-sm text-gray-500 mb-2">Sponsored Partners</div>
                  <div className="text-gray-400">
                    Premium placement for beauty industry partners
                  </div>
                  <Button variant="ghost" size="sm" className="mt-2 text-gray-500">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
