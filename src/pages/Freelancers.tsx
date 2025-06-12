
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Trophy, 
  TrendingUp, 
  MessageCircle, 
  Star, 
  Sparkles, 
  Heart, 
  Eye, 
  ThumbsUp, 
  Share2, 
  Crown, 
  Zap,
  ArrowRight,
  Clock,
  MapPin,
  Award
} from 'lucide-react';

const FreelancersPage = () => {
  const [selectedPoll, setSelectedPoll] = useState<string | null>(null);
  const [votes, setVotes] = useState<{[key: string]: number}>({
    'Holographic Nails': 45,
    'Minimalist Art': 32,
    'Chrome Effects': 28,
    '3D Textures': 25
  });

  const handleVote = (option: string) => {
    setSelectedPoll(option);
    setVotes(prev => ({
      ...prev,
      [option]: prev[option] + 1
    }));
  };

  const battleEntries = [
    {
      id: 1,
      artist: "NailQueen_Sarah",
      image: "/lovable-uploads/nail-art-battle-1.jpg",
      votes: 234,
      specialty: "Nail Art",
      title: "Galaxy Ombre Design"
    },
    {
      id: 2,
      artist: "InkMaster_Jake",
      image: "/lovable-uploads/tattoo-battle-1.jpg",
      votes: 189,
      specialty: "Tattoo",
      title: "Geometric Sleeve"
    },
    {
      id: 3,
      artist: "HairWizard_Alex",
      image: "/lovable-uploads/hair-battle-1.jpg",
      votes: 156,
      specialty: "Hair Styling",
      title: "Rainbow Balayage"
    }
  ];

  const collabPosts = [
    {
      id: 1,
      user: "LashLady_Maria",
      specialty: "Lash Extensions",
      post: "Looking for a brow artist to collaborate on a bridal package! Beverly Hills area 💄",
      time: "2 hours ago",
      responses: 12
    },
    {
      id: 2,
      user: "TattooTom",
      specialty: "Tattoo Artist",
      post: "Need a nail artist for photoshoot collab - dark gothic theme 🖤",
      time: "4 hours ago",
      responses: 8
    },
    {
      id: 3,
      user: "MakeupMaven_Lisa",
      specialty: "Makeup Artist",
      post: "Teaching contouring techniques - who wants to trade for microblading lessons?",
      time: "1 day ago",
      responses: 23
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        {/* Debug Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-3 font-semibold">
          🚀 EMVI.APP COMMUNITY FOMO UPGRADE — JUNE 2025 🚀
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-8 w-8 text-purple-600" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Beauty Community
              </h1>
              <Sparkles className="h-8 w-8 text-pink-600" />
            </div>
            <p className="text-xl text-gray-600 mb-6">
              Where Beauty Professionals Connect, Compete & Collaborate
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>2,847 professionals online</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>15,234 active this week</span>
              </div>
            </div>
          </motion.div>

          <Tabs defaultValue="battles" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="battles" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Live Battles
              </TabsTrigger>
              <TabsTrigger value="networking" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Networking
              </TabsTrigger>
              <TabsTrigger value="trends" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Trends & Polls
              </TabsTrigger>
              <TabsTrigger value="coming-soon" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Coming Soon
              </TabsTrigger>
            </TabsList>

            {/* Live Professional Battles */}
            <TabsContent value="battles" className="space-y-6">
              <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Crown className="h-6 w-6" />
                    <CardTitle className="text-2xl">Weekly Beauty Challenge</CardTitle>
                    <Badge variant="secondary" className="bg-white text-purple-600">
                      LIVE NOW
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-lg mb-4">Vote for the most creative beauty work this week!</p>
                  <div className="flex items-center gap-4 text-sm opacity-90">
                    <span>⏰ Ends in 2 days</span>
                    <span>🏆 Winner gets featured homepage spot</span>
                    <span>⭐ Special community badge</span>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-3 gap-6">
                {battleEntries.map((entry) => (
                  <motion.div
                    key={entry.id}
                    whileHover={{ scale: 1.02 }}
                    className="relative"
                  >
                    <Card className="overflow-hidden border-2 hover:border-purple-300 transition-colors">
                      <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                        <div className="text-center p-6">
                          <Avatar className="h-16 w-16 mx-auto mb-4">
                            <AvatarFallback className="bg-purple-500 text-white text-lg">
                              {entry.artist.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <h3 className="font-semibold text-lg">{entry.title}</h3>
                          <p className="text-purple-600 font-medium">@{entry.artist}</p>
                          <Badge variant="outline" className="mt-2">
                            {entry.specialty}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Heart className="h-4 w-4 text-red-500" />
                            <span className="font-semibold">{entry.votes} votes</span>
                          </div>
                          <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            Vote
                          </Button>
                        </div>
                        <Progress value={(entry.votes / 250) * 100} className="h-2" />
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-gold-500" />
                    Community Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {battleEntries.map((entry, index) => (
                      <div key={entry.id} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold">
                          {index + 1}
                        </div>
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{entry.artist.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-semibold">@{entry.artist}</p>
                          <p className="text-sm text-gray-600">{entry.specialty}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-purple-600">{entry.votes}</p>
                          <p className="text-xs text-gray-500">votes</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Cross-Specialty Networking */}
            <TabsContent value="networking" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Collaboration Hub
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {collabPosts.map((post) => (
                      <div key={post.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>{post.user.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold">@{post.user}</span>
                              <Badge variant="outline" className="text-xs">
                                {post.specialty}
                              </Badge>
                            </div>
                            <p className="text-gray-700 mb-2">{post.post}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {post.time}
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageCircle className="h-3 w-3" />
                                {post.responses} responses
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button className="w-full" variant="outline">
                      Post Your Collaboration Request
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Share2 className="h-5 w-5" />
                      Skill Exchange
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                        <h4 className="font-semibold text-green-700 mb-2">Teaching Available</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>• Advanced Lash Techniques</span>
                            <span className="text-green-600">3 slots left</span>
                          </div>
                          <div className="flex justify-between">
                            <span>• Color Theory for Hair</span>
                            <span className="text-green-600">5 slots left</span>
                          </div>
                          <div className="flex justify-between">
                            <span>• Business Management</span>
                            <span className="text-green-600">2 slots left</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                        <h4 className="font-semibold text-purple-700 mb-2">Learning Requests</h4>
                        <div className="space-y-2 text-sm">
                          <div>• Microblading basics (urgent)</div>
                          <div>• Nail stamping techniques</div>
                          <div>• Social media marketing</div>
                        </div>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                        Join Skill Exchange
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Referral Network
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">🌟 Premium Referrals</h4>
                      <p className="text-sm text-gray-600 mb-3">High-end client seeking full beauty team for wedding</p>
                      <Button size="sm" variant="outline" className="w-full">
                        View Details
                      </Button>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">📸 Photo Shoot Needs</h4>
                      <p className="text-sm text-gray-600 mb-3">Fashion photographer needs makeup + hair team</p>
                      <Button size="sm" variant="outline" className="w-full">
                        Apply Now
                      </Button>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">🎉 Event Opportunities</h4>
                      <p className="text-sm text-gray-600 mb-3">Corporate event needs beauty professionals</p>
                      <Button size="sm" variant="outline" className="w-full">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Interactive Trend Prediction & Polls */}
            <TabsContent value="trends" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    What's the Next Big Trend?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(votes).map(([option, count]) => (
                      <div key={option} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{option}</span>
                          <span className="text-sm text-gray-500">{count} votes</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Progress value={(count / 150) * 100} className="flex-1" />
                          <Button
                            size="sm"
                            variant={selectedPoll === option ? "default" : "outline"}
                            onClick={() => handleVote(option)}
                            disabled={selectedPoll !== null}
                          >
                            {selectedPoll === option ? "Voted!" : "Vote"}
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full mt-4">
                      Suggest New Trend
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      Rate This Technique
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center">
                        <Sparkles className="h-12 w-12 text-purple-500 mx-auto mb-2" />
                        <p className="text-lg font-semibold">Chrome Nail Effect</p>
                        <p className="text-gray-600">Latest trending technique</p>
                      </div>
                    </div>
                    <div className="flex justify-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Button
                          key={star}
                          variant="ghost"
                          size="sm"
                          className="p-1"
                        >
                          <Star className="h-6 w-6 text-yellow-400 fill-current" />
                        </Button>
                      ))}
                    </div>
                    <p className="text-center text-sm text-gray-600 mt-2">
                      4.8/5 from 2,341 professionals
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5" />
                      Predict the Winner
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">Who will win this week's battle?</p>
                    <div className="space-y-3">
                      {battleEntries.slice(0, 3).map((entry) => (
                        <Button
                          key={entry.id}
                          variant="outline"
                          className="w-full justify-between"
                        >
                          <span>@{entry.artist}</span>
                          <span className="text-purple-600">{Math.floor(Math.random() * 40 + 20)}%</span>
                        </Button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-4 text-center">
                      Correct predictions earn community points!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Coming Soon Features */}
            <TabsContent value="coming-soon" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-dashed border-2 border-purple-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      Direct Messaging
                      <Badge variant="secondary">Coming Soon</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Connect directly with other beauty professionals for private collaborations and advice.
                    </p>
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500">
                      Join Early Access Waitlist
                    </Button>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      847 professionals already signed up
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-dashed border-2 border-blue-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Professional Matching
                      <Badge variant="secondary">Next Up</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      AI-powered matching to find your perfect business partners and collaborators.
                    </p>
                    <Button variant="outline" className="w-full">
                      Join the Waitlist
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-dashed border-2 border-green-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Virtual Beauty Districts
                      <Badge variant="secondary">In Development</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Create geographic networks with professionals in your area for local collaborations.
                    </p>
                    <Button variant="outline" className="w-full">
                      Get Notified
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-dashed border-2 border-pink-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Live Streaming
                      <Badge variant="secondary">Planning</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Stream your work live, host tutorials, and build your following within the community.
                    </p>
                    <Button variant="outline" className="w-full">
                      Express Interest
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold mb-4">Shape the Future of Beauty Community</h3>
                  <p className="text-lg mb-6 opacity-90">
                    Your feedback drives our development. Tell us what features you want most!
                  </p>
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                    Submit Feature Request
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default FreelancersPage;
