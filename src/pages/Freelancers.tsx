
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { MessageSquare, Users, TrendingUp, Star, Heart, ThumbsUp, MessageCircle, Award, Sparkles, Crown, Globe, Clock, UserPlus, ChevronRight, Send, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const CommunityPage = () => {
  const [onlineCount, setOnlineCount] = useState(487);
  const [memberCount, setMemberCount] = useState(12847);
  const [activeQuestions, setActiveQuestions] = useState(23);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount(prev => prev + Math.floor(Math.random() * 3) - 1);
      setMemberCount(prev => prev + Math.floor(Math.random() * 2));
      setActiveQuestions(prev => prev + Math.floor(Math.random() * 2) - 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const hotQuestions = [
    {
      id: 1,
      question: "What's the best way to build client loyalty as a new nail technician?",
      author: "Sarah M.",
      role: "Nail Technician",
      answers: 12,
      likes: 34,
      timeAgo: "2 hours ago",
      trending: true
    },
    {
      id: 2,
      question: "How do you handle difficult clients professionally?",
      author: "Mike L.",
      role: "Salon Owner",
      answers: 28,
      likes: 67,
      timeAgo: "4 hours ago",
      trending: true
    },
    {
      id: 3,
      question: "Best marketing strategies for small salons in 2025?",
      author: "Lisa K.",
      role: "Business Owner",
      answers: 19,
      likes: 45,
      timeAgo: "6 hours ago",
      trending: false
    }
  ];

  const successStories = [
    {
      name: "Jennifer R.",
      role: "Freelance Artist",
      story: "EmviApp helped me connect with 5 new salons in my area. My income increased by 40% in 3 months!",
      verified: true
    },
    {
      name: "Golden Nails Spa",
      role: "Salon Owner",
      story: "We found 3 amazing artists through EmviApp. Our booking rate went up 25% this quarter.",
      verified: true
    }
  ];

  const featureRequests = [
    { id: 1, title: "Mobile App for iOS/Android", votes: 234, trending: true },
    { id: 2, title: "Advanced Search Filters", votes: 187, trending: false },
    { id: 3, title: "Video Portfolio Uploads", votes: 156, trending: true },
    { id: 4, title: "Group Messaging for Teams", votes: 143, trending: false }
  ];

  return (
    <Layout hideFooter={true}>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
        {/* Debug Banner */}
        <div className="bg-red-600 text-white text-center py-2 px-4 font-bold text-sm">
          🔧 EMVI.APP COMMUNITY PAGE UPGRADE (JUNE 2025) — REAL FOMO & Q&A
        </div>

        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10"></div>
          <div className="container mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                Where Beauty Pros, Salons & Clients Unite
              </h1>
              <div className="text-xl md:text-2xl text-gray-600 mb-8 space-y-2">
                <motion.p
                  key={Math.floor(Date.now() / 3000)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  The most trusted, inspiring, and rewarding beauty community
                </motion.p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>{onlineCount} online now</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span>{memberCount.toLocaleString()} members</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                  <span>{activeQuestions} active discussions</span>
                </div>
              </div>

              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                <UserPlus className="w-5 h-5 mr-2" />
                Join the Community
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Community Board / Q&A Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Community Board</h2>
              <p className="text-xl text-gray-600">Ask questions, share wisdom, grow together</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Hot Questions */}
              <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-red-500" />
                    Hot Questions
                    <Badge variant="secondary" className="bg-red-100 text-red-600">
                      {activeQuestions} active
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {hotQuestions.map((q) => (
                    <motion.div
                      key={q.id}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-800 leading-tight">{q.question}</h4>
                        {q.trending && <Badge className="bg-red-500 text-white text-xs">HOT</Badge>}
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{q.author} • {q.role}</span>
                        <span>{q.timeAgo}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-3 text-sm">
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{q.answers} answers</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{q.likes} likes</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>Seen by {Math.floor(Math.random() * 50) + 20}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              {/* Ask a Question */}
              <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-500" />
                    Ask the Community
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Input placeholder="What's your question?" className="border-2 border-gray-200 focus:border-purple-500" />
                    <Textarea placeholder="Share more details to get better answers..." className="border-2 border-gray-200 focus:border-purple-500 min-h-[100px]" />
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                      <Send className="w-4 h-4 mr-2" />
                      Post Question
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Direct Messaging Teaser */}
        <section className="py-16 px-4 bg-gradient-to-r from-purple-100 to-blue-100">
          <div className="container mx-auto text-center">
            <Card className="max-w-2xl mx-auto backdrop-blur-sm bg-white/90 border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="mb-6">
                  <MessageSquare className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">1:1 Connections Coming Soon!</h3>
                  <p className="text-lg text-gray-600 mb-6">
                    Direct messaging between artists, salons, and clients is in development. 
                    Join the early access waitlist to be the first to connect!
                  </p>
                </div>
                <div className="flex gap-2 max-w-md mx-auto">
                  <Input placeholder="Enter your email for early access" className="flex-1" />
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Join Waitlist
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  {Math.floor(Math.random() * 500) + 200} people already signed up!
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Feature Voting */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Help Shape Our Future</h2>
              <p className="text-xl text-gray-600">Vote for the features you want to see next</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    Feature Requests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {featureRequests.map((feature) => (
                      <motion.div
                        key={feature.id}
                        whileHover={{ scale: 1.01 }}
                        className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1 hover:bg-purple-50"
                          >
                            <ThumbsUp className="w-4 h-4" />
                            {feature.votes}
                          </Button>
                          <span className="font-medium">{feature.title}</span>
                          {feature.trending && <Badge className="bg-orange-100 text-orange-600">Trending</Badge>}
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Suggest a new feature</h4>
                    <div className="flex gap-2">
                      <Input placeholder="What feature would you love to see?" className="flex-1" />
                      <Button>Submit</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16 px-4 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Real Success Stories</h2>
              <p className="text-xl text-gray-600">How EmviApp helped our community grow</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {successStories.map((story, index) => (
                <Card key={index} className="backdrop-blur-sm bg-white/90 border-0 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-lg">{story.name}</h4>
                        <p className="text-gray-600">{story.role}</p>
                      </div>
                      {story.verified && (
                        <Badge className="bg-green-100 text-green-600">
                          <Star className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-700 leading-relaxed">{story.story}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="max-w-2xl mx-auto backdrop-blur-sm bg-white/90 border-0 shadow-xl">
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold mb-4">Share Your Story</h3>
                <p className="text-gray-600 mb-6">
                  Have EmviApp helped your business or career? We'd love to hear about it!
                </p>
                <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                  Tell Your Story
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Invite & Reward System */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <Card className="max-w-4xl mx-auto backdrop-blur-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-xl">
              <CardContent className="p-8 text-center">
                <Crown className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
                <h2 className="text-4xl font-bold mb-4">Invite Friends & Earn Rewards</h2>
                <p className="text-xl mb-8 opacity-90">
                  For every friend who joins EmviApp, you both get credits and special perks!
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
                    <h3 className="text-2xl font-bold mb-2">3 Friends</h3>
                    <p className="mb-4">Unlock VIP Badge</p>
                    <div className="w-full bg-white/30 rounded-full h-2">
                      <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <p className="text-sm mt-2">2 more to go!</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
                    <h3 className="text-2xl font-bold mb-2">5 Friends</h3>
                    <p className="mb-4">50 Free Credits</p>
                    <div className="w-full bg-white/30 rounded-full h-2">
                      <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                    <p className="text-sm mt-2">4 more to go!</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
                    <h3 className="text-2xl font-bold mb-2">10 Friends</h3>
                    <p className="mb-4">Pro Membership Discount</p>
                    <div className="w-full bg-white/30 rounded-full h-2">
                      <div className="bg-gray-400 h-2 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                    <p className="text-sm mt-2">Not started yet</p>
                  </div>
                </div>

                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold">
                  <UserPlus className="w-5 h-5 mr-2" />
                  Start Inviting Friends
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold mb-6">Don't Miss Out</h2>
              <p className="text-xl mb-8 opacity-90">
                The community is growing fast. Join now and be part of something special.
              </p>
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Community filling up fast</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>Members from 50+ cities</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Active 24/7</span>
                </div>
              </div>
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 rounded-full text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300">
                <Sparkles className="w-6 h-6 mr-2" />
                Join EmviApp Community
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Single Footer */}
        <footer className="bg-gray-50 py-12 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-lg mb-4">EmviApp</h3>
                <p className="text-gray-600 mb-4">
                  The most trusted beauty community connecting professionals and clients.
                </p>
                <p className="text-sm text-gray-500">
                  Your privacy and future are protected by EmviApp.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Community</h4>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="#" className="hover:text-purple-600 transition-colors">Ask Questions</a></li>
                  <li><a href="#" className="hover:text-purple-600 transition-colors">Success Stories</a></li>
                  <li><a href="#" className="hover:text-purple-600 transition-colors">Feature Requests</a></li>
                  <li><a href="#" className="hover:text-purple-600 transition-colors">Guidelines</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="#" className="hover:text-purple-600 transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-purple-600 transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-purple-600 transition-colors">Report Issue</a></li>
                  <li><a href="#" className="hover:text-purple-600 transition-colors">Privacy Policy</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="#" className="hover:text-purple-600 transition-colors">Early Access</a></li>
                  <li><a href="#" className="hover:text-purple-600 transition-colors">Newsletter</a></li>
                  <li><a href="#" className="hover:text-purple-600 transition-colors">Updates</a></li>
                  <li><a href="#" className="hover:text-purple-600 transition-colors">Feedback</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-600 mb-4 md:mb-0">
                © 2025 EmviApp. All rights reserved.
              </p>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                Inspired by Sunshine <span className="text-yellow-500">☀️</span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
};

export default CommunityPage;
