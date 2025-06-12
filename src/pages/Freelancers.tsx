
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, TrendingUp, Star, Trophy, MessageCircle, Handshake, Vote, Camera, Palette, Scissors, Sparkles, Crown, Badge, Eye, ArrowUp, ArrowDown, Clock, Fire } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge as UIBadge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Layout from '@/components/layout/Layout';

const CommunityPage = () => {
  const [selectedBattle, setSelectedBattle] = useState('nail-art');
  const [trendVotes, setTrendVotes] = useState({
    'glass-skin': 145,
    'chrome-nails': 89,
    'wolf-cut': 234,
    'soap-brows': 67
  });
  const [userVotes, setUserVotes] = useState<string[]>([]);
  const [activeOnline] = useState(1247);

  const handleTrendVote = (trend: string) => {
    if (!userVotes.includes(trend)) {
      setTrendVotes(prev => ({
        ...prev,
        [trend]: prev[trend] + 1
      }));
      setUserVotes(prev => [...prev, trend]);
    }
  };

  const battles = {
    'nail-art': {
      title: 'Nail Art Battle Royale',
      entries: [
        { artist: 'Sarah M.', votes: 234, image: '💅', technique: 'Chrome Marble' },
        { artist: 'Lisa K.', votes: 189, image: '✨', technique: 'Galaxy Nails' },
        { artist: 'Emma R.', votes: 156, image: '🌸', technique: 'Floral 3D' }
      ]
    },
    'makeup': {
      title: 'Makeup Mastery Challenge',
      entries: [
        { artist: 'Maya P.', votes: 267, image: '💄', technique: 'Smokey Glam' },
        { artist: 'Ana L.', votes: 198, image: '🎨', technique: 'Editorial Art' },
        { artist: 'Zoe T.', votes: 143, image: '✨', technique: 'Natural Glow' }
      ]
    }
  };

  const collaborationPosts = [
    {
      id: 1,
      author: 'Jessica Nails Pro',
      specialty: 'Nail Technician',
      post: 'Looking for a makeup artist for a bridal photoshoot collaboration! 💍',
      responses: 12,
      time: '2 hours ago'
    },
    {
      id: 2,
      author: 'Mike Ink Master',
      specialty: 'Tattoo Artist',
      post: 'Anyone interested in nail art + tattoo style collaboration? 🔥',
      responses: 8,
      time: '4 hours ago'
    },
    {
      id: 3,
      author: 'Beauty Studio LA',
      specialty: 'Salon Owner',
      post: 'Seeking freelance lash technician for weekend bookings',
      responses: 15,
      time: '6 hours ago'
    }
  ];

  const skillExchanges = [
    { offer: 'Microblading Technique', want: 'Lash Extension Mastery', user: 'ProBrow_Sarah' },
    { offer: 'Balayage Coloring', want: 'Nail Art Basics', user: 'HairByAlex' },
    { offer: 'Massage Therapy', want: 'Eyebrow Shaping', user: 'ZenSpa_Maya' }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
        {/* Debug Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 text-center font-bold text-sm">
          🚀 EMVI.APP COMMUNITY FOMO UPGRADE — JUNE 2025 🚀
        </div>

        {/* Hero Section */}
        <section className="relative py-20 px-4 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10"></div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              Where Beauty Pros Unite & Thrive
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 font-medium">
              The most exciting, rewarding community in the beauty industry
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                Join the Revolution
              </Button>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span>{activeOnline.toLocaleString()} pros online now</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Live Professional Battles */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
                <Trophy className="text-yellow-500" />
                Live Professional Battles
                <Fire className="text-red-500" />
              </h2>
              <p className="text-xl text-gray-600">Vote for your favorites and watch the leaderboard change in real-time!</p>
            </div>

            <div className="flex justify-center gap-4 mb-8">
              <Button
                variant={selectedBattle === 'nail-art' ? 'default' : 'outline'}
                onClick={() => setSelectedBattle('nail-art')}
                className="px-6 py-3"
              >
                💅 Nail Art Battle
              </Button>
              <Button
                variant={selectedBattle === 'makeup' ? 'default' : 'outline'}
                onClick={() => setSelectedBattle('makeup')}
                className="px-6 py-3"
              >
                💄 Makeup Challenge
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {battles[selectedBattle].entries.map((entry, index) => (
                <motion.div
                  key={entry.artist}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-300">
                    <CardHeader className="text-center">
                      <div className="text-6xl mb-4">{entry.image}</div>
                      <CardTitle className="flex items-center justify-center gap-2">
                        {index === 0 && <Crown className="text-yellow-500" />}
                        {entry.artist}
                      </CardTitle>
                      <p className="text-gray-600">{entry.technique}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center mb-4">
                        <div className="text-2xl font-bold text-purple-600">{entry.votes} votes</div>
                        <Progress value={(entry.votes / 300) * 100} className="mt-2" />
                      </div>
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                        <Heart className="mr-2 h-4 w-4" />
                        Vote Now!
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Cross-Specialty Networking */}
        <section className="py-16 px-4 bg-white/70 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
                <Handshake className="text-blue-500" />
                Cross-Specialty Networking
              </h2>
              <p className="text-xl text-gray-600">Connect, collaborate, and grow together across all beauty specialties</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Collaboration Hub */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="text-purple-600" />
                    Collaboration Hub
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {collaborationPosts.map((post) => (
                      <div key={post.id} className="border-l-4 border-purple-500 pl-4 py-3 bg-purple-50 rounded-r-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="font-semibold text-purple-700">{post.author}</span>
                            <UIBadge variant="secondary" className="ml-2 text-xs">
                              {post.specialty}
                            </UIBadge>
                          </div>
                          <span className="text-xs text-gray-500">{post.time}</span>
                        </div>
                        <p className="text-gray-700 mb-2">{post.post}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.responses} responses</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                    Post Your Collaboration Request
                  </Button>
                </CardContent>
              </Card>

              {/* Skill Exchange */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ArrowUp className="text-green-500" />
                    <ArrowDown className="text-blue-500" />
                    Skill Exchange
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {skillExchanges.map((exchange, index) => (
                      <div key={index} className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-green-700">Offering:</span>
                          <span className="text-sm text-gray-600">@{exchange.user}</span>
                        </div>
                        <p className="text-green-800 mb-2">{exchange.offer}</p>
                        <div className="flex items-center mb-2">
                          <span className="font-semibold text-blue-700">Wants to learn:</span>
                        </div>
                        <p className="text-blue-800">{exchange.want}</p>
                        <Button size="sm" className="mt-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                          Connect
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                    Post Your Skills Exchange
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Interactive Trend Prediction */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
                <TrendingUp className="text-pink-500" />
                Trend Prediction Hub
                <Sparkles className="text-yellow-500" />
              </h2>
              <p className="text-xl text-gray-600">Vote on what's next and help shape the future of beauty!</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* What's the Next Big Trend */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Vote className="text-pink-500" />
                    What's the Next Big Trend?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(trendVotes).map(([trend, votes]) => (
                      <div key={trend} className="border rounded-lg p-4 hover:bg-pink-50 transition-colors">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold capitalize">
                            {trend.replace('-', ' ')}
                          </span>
                          <span className="text-sm font-bold text-pink-600">{votes} votes</span>
                        </div>
                        <Progress value={(votes / 300) * 100} className="mb-3" />
                        <Button
                          size="sm"
                          onClick={() => handleTrendVote(trend)}
                          disabled={userVotes.includes(trend)}
                          className={`${
                            userVotes.includes(trend) 
                              ? 'bg-gray-400 cursor-not-allowed' 
                              : 'bg-pink-600 hover:bg-pink-700'
                          }`}
                        >
                          {userVotes.includes(trend) ? 'Voted!' : 'Vote'}
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4 bg-pink-600 hover:bg-pink-700">
                    Submit New Trend Idea
                  </Button>
                </CardContent>
              </Card>

              {/* Rate This Technique */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="text-yellow-500" />
                    Rate This Technique
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-4">💎</div>
                    <h3 className="text-xl font-bold mb-2">Diamond Nail Technique</h3>
                    <p className="text-gray-600">Multi-dimensional crystal effect</p>
                  </div>
                  <div className="flex justify-center gap-2 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-8 w-8 cursor-pointer hover:text-yellow-500 transition-colors"
                        fill="currentColor"
                      />
                    ))}
                  </div>
                  <div className="text-center text-sm text-gray-600 mb-4">
                    <Eye className="inline h-4 w-4 mr-1" />
                    2,547 professionals have rated this
                  </div>
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                    Next Technique
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Coming Soon Teasers */}
        <section className="py-16 px-4 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Coming Soon to Our Community</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-lg border-2 border-dashed border-purple-300">
                <CardContent className="p-8 text-center">
                  <MessageCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Direct Messaging</h3>
                  <p className="text-gray-600 mb-4">Connect directly with other professionals</p>
                  <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                    Join Early Access
                  </Button>
                </CardContent>
              </Card>
              <Card className="shadow-lg border-2 border-dashed border-pink-300">
                <CardContent className="p-8 text-center">
                  <Badge className="h-12 w-12 text-pink-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Professional Matching</h3>
                  <p className="text-gray-600 mb-4">AI-powered partner recommendations</p>
                  <Button variant="outline" className="border-pink-600 text-pink-600 hover:bg-pink-50">
                    Join Waitlist
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Don't Miss Out - Community Is Filling Up Fast!
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join the most exciting and rewarding beauty community on Earth
            </p>
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-12 py-4 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              Reserve Your Spot Now
            </Button>
            <div className="mt-8 flex justify-center items-center gap-8 text-sm opacity-80">
              <span>✨ 12,547 active members</span>
              <span>🏆 Weekly challenges</span>
              <span>🤝 Cross-specialty networking</span>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default CommunityPage;
