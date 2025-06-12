
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, TrendingUp, Users, Star, Clock, MapPin, Sparkles, ChevronDown, ChevronUp, Plus, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Layout from '@/components/layout/Layout';

const FreelancersPage = () => {
  const [onlineCount, setOnlineCount] = useState(847);
  const [activeTab, setActiveTab] = useState('all');
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Maria Rodriguez',
      role: 'Nail Artist',
      content: 'Just finished this amazing ombre set! The client was so happy she tipped 30%! Never give up on perfecting your craft 💅✨',
      image: '/lovable-uploads/generated(01).png',
      likes: 156,
      comments: 23,
      timeAgo: '2h ago',
      trending: true
    },
    {
      id: 2,
      author: 'David Chen',
      role: 'Hair Stylist',
      content: 'Looking for a makeup artist to collaborate on a photoshoot next week in downtown LA. Split the revenue 50/50. DM me!',
      likes: 89,
      comments: 12,
      timeAgo: '4h ago',
      pinned: true
    },
    {
      id: 3,
      author: 'Sarah Johnson',
      role: 'Esthetician',
      content: 'Quick question - what\'s your go-to method for treating stubborn blackheads? My usual technique isn\'t working on this client.',
      likes: 67,
      comments: 31,
      timeAgo: '6h ago',
      unanswered: true
    }
  ]);

  const [successTicker, setSuccessTicker] = useState(0);
  const successMessages = [
    "Sarah from NY just booked $500 client!",
    "Mike in LA landed 3 new regulars this week!",
    "Emma got featured in Beauty Magazine!",
    "Carlos opened his 2nd location!",
    "Lisa's client gave her a $200 tip!"
  ];

  const [motivation, setMotivation] = useState(0);
  const motivationalMessages = [
    "Your next breakthrough client is just one post away! 💫",
    "Every expert was once a beginner. Keep growing! 🌟",
    "Your skills are unique. Share them with the world! ✨",
    "Success is built one satisfied client at a time! 💪",
    "You're not just creating beauty, you're changing lives! 💝"
  ];

  const trendingHashtags = ['#NailArt', '#HairGoals', '#SkinCare', '#MakeupMagic', '#BeautyBoss', '#ClientLove'];

  const faqs = [
    {
      question: "How do I build my client base as a new beauty professional?",
      answer: "Start by offering exceptional service to every client, ask for referrals, maintain an active social media presence, and network with other professionals in the industry."
    },
    {
      question: "What should I charge for my services?",
      answer: "Research local market rates, consider your experience level, factor in your costs, and don't undervalue your skills. Start competitive and increase as you build reputation."
    },
    {
      question: "How do I handle difficult clients?",
      answer: "Stay professional, listen actively, set clear boundaries, document everything, and know when to say no. Your mental health and business reputation matter."
    },
    {
      question: "Should I work in a salon or go independent?",
      answer: "Both have pros and cons. Salons provide stability and mentorship, while independence offers higher earning potential and creative freedom. Consider your experience and goals."
    },
    {
      question: "How do I stay updated with beauty trends?",
      answer: "Follow industry leaders on social media, attend trade shows, take continuing education courses, and engage with beauty communities like this one!"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount(prev => prev + Math.floor(Math.random() * 3) - 1);
      setSuccessTicker(prev => (prev + 1) % successMessages.length);
    }, 5000);

    const motivationInterval = setInterval(() => {
      setMotivation(prev => (prev + 1) % motivationalMessages.length);
    }, 8000);

    return () => {
      clearInterval(interval);
      clearInterval(motivationInterval);
    };
  }, []);

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        author: 'You',
        role: 'Beauty Professional',
        content: newPost,
        likes: 0,
        comments: 0,
        timeAgo: 'Just now'
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  const likePost = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
        {/* Hero Section */}
        <section className="py-16 text-center bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="container mx-auto px-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to Your Beauty Community
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Connect, Inspire, Learn, and Grow Together
            </p>
            <div className="flex items-center justify-center gap-2 text-lg">
              <div className="h-3 w-3 bg-green-400 rounded-full animate-pulse"></div>
              <span>{onlineCount.toLocaleString()} beauty pros online now</span>
            </div>
          </motion.div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Side Panel: Quick Navigation */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-lg">Navigate Community</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant={activeTab === 'all' ? 'default' : 'ghost'} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab('all')}
                  >
                    All Posts
                  </Button>
                  <Button 
                    variant={activeTab === 'advice' ? 'default' : 'ghost'} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab('advice')}
                  >
                    Advice
                  </Button>
                  <Button 
                    variant={activeTab === 'work' ? 'default' : 'ghost'} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab('work')}
                  >
                    Find Work
                  </Button>
                  <Button 
                    variant={activeTab === 'promote' ? 'default' : 'ghost'} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab('promote')}
                  >
                    Promote Yourself
                  </Button>
                  <Button 
                    variant={activeTab === 'meetups' ? 'default' : 'ghost'} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab('meetups')}
                  >
                    Local Meetups
                  </Button>
                  <Button 
                    variant={activeTab === 'wins' ? 'default' : 'ghost'} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab('wins')}
                  >
                    Wins & Success
                  </Button>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-2">Trending</h4>
                    <div className="flex flex-wrap gap-1">
                      {trendingHashtags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Live Success Ticker */}
              <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white overflow-hidden">
                <CardContent className="p-4">
                  <motion.div
                    key={successTicker}
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <TrendingUp className="h-5 w-5" />
                    <span className="font-medium">{successMessages[successTicker]}</span>
                  </motion.div>
                </CardContent>
              </Card>

              {/* Motivational Message */}
              <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <CardContent className="p-6 text-center">
                  <motion.div
                    key={motivation}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-lg font-medium">{motivationalMessages[motivation]}</p>
                  </motion.div>
                </CardContent>
              </Card>

              {/* Start a Post */}
              <Card>
                <CardHeader>
                  <CardTitle>What's on your mind? Share your story or ask a question!</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <textarea
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      placeholder="Share your experience, ask for advice, or celebrate a win..."
                      className="w-full p-4 border rounded-lg resize-none"
                      rows={4}
                    />
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        This is a safe space for all beauty professionals
                      </div>
                      <Button onClick={handlePostSubmit} disabled={!newPost.trim()}>
                        <Send className="h-4 w-4 mr-2" />
                        Post
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Community Feed */}
              <div className="space-y-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-6">
                    <TabsTrigger value="all">All Posts</TabsTrigger>
                    <TabsTrigger value="hot">Hot Now</TabsTrigger>
                    <TabsTrigger value="pinned">Pinned</TabsTrigger>
                    <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-6">
                    {posts.map(post => (
                      <Card key={post.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="h-12 w-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                              {post.author.charAt(0)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-semibold">{post.author}</span>
                                <Badge variant="outline">{post.role}</Badge>
                                <span className="text-sm text-gray-500">{post.timeAgo}</span>
                                {post.trending && <Badge className="bg-orange-500">🔥 Trending</Badge>}
                                {post.pinned && <Badge className="bg-blue-500">📌 Pinned</Badge>}
                                {post.unanswered && <Badge variant="destructive">❓ Unanswered</Badge>}
                              </div>
                              <p className="mb-4">{post.content}</p>
                              {post.image && (
                                <img 
                                  src={post.image} 
                                  alt="Post content" 
                                  className="rounded-lg mb-4 max-w-md"
                                />
                              )}
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <button 
                                  onClick={() => likePost(post.id)}
                                  className="flex items-center gap-1 hover:text-red-500 transition-colors"
                                >
                                  <Heart className="h-4 w-4" />
                                  {post.likes}
                                </button>
                                <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                                  <MessageCircle className="h-4 w-4" />
                                  {post.comments}
                                </button>
                                <button className="flex items-center gap-1 hover:text-green-500 transition-colors">
                                  <Share2 className="h-4 w-4" />
                                  Share
                                </button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="hot">
                    {posts.filter(post => post.trending).map(post => (
                      <Card key={post.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          {/* Same post structure as above */}
                          <div className="flex items-start gap-4">
                            <div className="h-12 w-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                              {post.author.charAt(0)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-semibold">{post.author}</span>
                                <Badge variant="outline">{post.role}</Badge>
                                <span className="text-sm text-gray-500">{post.timeAgo}</span>
                                <Badge className="bg-orange-500">🔥 Trending</Badge>
                              </div>
                              <p className="mb-4">{post.content}</p>
                              {post.image && (
                                <img 
                                  src={post.image} 
                                  alt="Post content" 
                                  className="rounded-lg mb-4 max-w-md"
                                />
                              )}
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <button 
                                  onClick={() => likePost(post.id)}
                                  className="flex items-center gap-1 hover:text-red-500 transition-colors"
                                >
                                  <Heart className="h-4 w-4" />
                                  {post.likes}
                                </button>
                                <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                                  <MessageCircle className="h-4 w-4" />
                                  {post.comments}
                                </button>
                                <button className="flex items-center gap-1 hover:text-green-500 transition-colors">
                                  <Share2 className="h-4 w-4" />
                                  Share
                                </button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                </Tabs>
              </div>

              {/* Skill Exchange Hub */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Skill Exchange Hub
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Trade: Advanced Color Theory for Social Media Marketing</span>
                        <Badge>Active</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        I'll teach you advanced color theory and correction in exchange for social media marketing strategies for salons.
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Users className="h-3 w-3" />
                        <span>Posted by Jessica M. • Hair Colorist</span>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Offering: Lash Extension Training for Business Setup Help</span>
                        <Badge variant="secondary">New</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Certified lash instructor willing to teach extensions in exchange for help setting up business systems and accounting.
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Users className="h-3 w-3" />
                        <span>Posted by Amanda K. • Lash Specialist</span>
                      </div>
                    </div>
                    
                    <Button className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Join Skill Exchange
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Collaboration Hub */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Collaboration Hub
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 bg-yellow-50">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-yellow-500">Hot Collab</Badge>
                        <span className="font-medium">Wedding Team Needed - Downtown LA</span>
                      </div>
                      <p className="text-sm mb-3">
                        Looking for makeup artist and hairstylist for luxury wedding. Revenue split 3-ways. Portfolio required.
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <MapPin className="h-3 w-3" />
                          <span>Los Angeles, CA • Wedding Photographer</span>
                        </div>
                        <Button variant="outline" size="sm">Apply</Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">Music Video Glam Team - Atlanta</span>
                      </div>
                      <p className="text-sm mb-3">
                        Major recording artist needs full glam team for video shoot. Paid gig + portfolio content.
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>2 days ago • Video Production Company</span>
                        </div>
                        <Button variant="outline" size="sm">Learn More</Button>
                      </div>
                    </div>
                    
                    <Button className="w-full" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Post Your Collaboration Request
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Polls & Interactive Trend Voting */}
              <Card>
                <CardHeader>
                  <CardTitle>What's the Next Big Trend?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <span>Glass Skin Makeup Technique</span>
                        <span className="text-sm font-medium">34%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{width: '34%'}}></div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <span>Sustainable Beauty Products</span>
                        <span className="text-sm font-medium">28%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{width: '28%'}}></div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <span>AI-Assisted Color Matching</span>
                        <span className="text-sm font-medium">23%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{width: '23%'}}></div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <span>Minimalist Nail Art</span>
                        <span className="text-sm font-medium">15%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-pink-600 h-2 rounded-full" style={{width: '15%'}}></div>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      Suggest New Trend
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Q&A Section for New Members */}
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <p className="text-sm text-gray-600">Get answers to common questions from experienced professionals</p>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>

              {/* Coming Soon Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-2 border-dashed border-purple-300 bg-purple-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-purple-600" />
                      Direct Messaging & Professional Matching
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Connect directly with other professionals, get matched with collaboration partners, and build your network.
                    </p>
                    <Button className="w-full" variant="outline">
                      Join Waitlist
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-dashed border-green-300 bg-green-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-green-600" />
                      Group Chats & Private Discussions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Join specialized groups, participate in private discussions, and connect with pros in your area.
                    </p>
                    <Button className="w-full" variant="outline">
                      Early Access Signup
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Sponsor Ads Space */}
              <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-amber-800">Featured Partner</CardTitle>
                    <Badge variant="outline" className="text-amber-700 border-amber-300">Sponsored</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                      B
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-amber-900">BeautyPro Supplies</h3>
                      <p className="text-sm text-amber-700 mb-2">
                        Professional beauty supplies at wholesale prices. Community members get 15% off first order.
                      </p>
                      <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                        Shop Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Inspired by Sunshine */}
              <div className="text-center py-8">
                <p className="text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-400 bg-clip-text text-transparent">
                  Inspired by Sunshine ☀️
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FreelancersPage;
