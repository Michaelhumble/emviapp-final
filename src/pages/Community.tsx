
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Users, Sparkles, Trophy, TrendingUp, Heart, Star, Crown, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Community = () => {
  const liveMembers = 8547;
  const newMembersToday = 127;
  const totalSalons = 2341;

  const trendingTopics = [
    { title: "Nail Art Trends 2024", engagement: "2.3k", isHot: true },
    { title: "Salon Growth Secrets", engagement: "1.8k", isHot: true },
    { title: "Customer Retention Tips", engagement: "1.5k", isHot: false },
    { title: "Vietnamese Nail Culture", engagement: "1.2k", isHot: false }
  ];

  const hallOfFameMembers = [
    { name: "Maria Chen", title: "Top Earner Q4", earnings: "$125k", avatar: "/lovable-uploads/8858fff4-1fa3-4803-86b1-beadca5fd1df.png" },
    { name: "David Nguyen", title: "Most Booked Artist", bookings: "847", avatar: "/lovable-uploads/8283328c-3a93-4562-be8b-32c35c31a600.png" },
    { name: "Sophie Kim", title: "Community Leader", contributions: "156", avatar: "/lovable-uploads/2542d0a3-5117-433d-baee-5c0fe2bfeca2.png" }
  ];

  const testimonials = [
    {
      text: "EmviApp transformed my nail salon from struggling to $50k/month in just 6 months!",
      author: "Lisa Tran",
      role: "Salon Owner",
      location: "Houston, TX",
      avatar: "/lovable-uploads/89855878-2908-47b5-98b0-1935d73cdd71.png"
    },
    {
      text: "I went from $800/week to $2,500/week as an independent artist. This community changed my life!",
      author: "Michael Rodriguez",
      role: "Nail Artist",
      location: "Miami, FL",
      avatar: "/lovable-uploads/8858fff4-1fa3-4803-86b1-beadca5fd1df.png"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-gold-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-4 py-20">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Crown className="h-8 w-8 text-yellow-400" />
                <Badge className="bg-yellow-400 text-black font-bold text-lg px-6 py-2">
                  EXCLUSIVE
                </Badge>
                <Crown className="h-8 w-8 text-yellow-400" />
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Beauty Billionaires Club
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 text-purple-100">
                Where nail artists become millionaires and salon owners build empires
              </p>
              
              <div className="flex flex-wrap justify-center gap-8 mb-10">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 animate-pulse">
                    {liveMembers.toLocaleString()}
                  </div>
                  <div className="text-purple-200">Active Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 animate-pulse">
                    +{newMembersToday}
                  </div>
                  <div className="text-purple-200">Joined Today</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 animate-pulse">
                    {totalSalons.toLocaleString()}
                  </div>
                  <div className="text-purple-200">Partner Salons</div>
                </div>
              </div>
              
              <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg px-8 py-4 hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-200">
                <Sparkles className="mr-2 h-5 w-5" />
                Join the Club - FREE
              </Button>
            </div>
          </div>
          
          {/* Floating Avatars */}
          <div className="absolute top-20 left-10 animate-bounce">
            <Avatar className="h-16 w-16 border-4 border-yellow-400">
              <AvatarImage src="/lovable-uploads/8858fff4-1fa3-4803-86b1-beadca5fd1df.png" />
              <AvatarFallback>MC</AvatarFallback>
            </Avatar>
          </div>
          <div className="absolute bottom-20 right-10 animate-bounce delay-1000">
            <Avatar className="h-16 w-16 border-4 border-green-400">
              <AvatarImage src="/lovable-uploads/8283328c-3a93-4562-be8b-32c35c31a600.png" />
              <AvatarFallback>DN</AvatarFallback>
            </Avatar>
          </div>
        </section>

        {/* Trending Topics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                🔥 Trending Now
              </h2>
              <p className="text-xl text-gray-600">What the community is talking about</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingTopics.map((topic, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <TrendingUp className="h-5 w-5 text-purple-600" />
                      {topic.isHot && (
                        <Badge className="bg-red-500 text-white animate-pulse">HOT</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold mb-2">{topic.title}</h3>
                    <p className="text-sm text-gray-500">{topic.engagement} discussions</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Hall of Fame */}
        <section className="py-16 bg-gradient-to-r from-yellow-50 to-orange-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                🏆 Hall of Fame
              </h2>
              <p className="text-xl text-gray-600">This month's top performers</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {hallOfFameMembers.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-2xl transition-all duration-300 border-2 border-yellow-200">
                  <CardHeader>
                    <div className="relative mx-auto mb-4">
                      <Avatar className="h-24 w-24 mx-auto border-4 border-yellow-400">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <Trophy className="absolute -top-2 -right-2 h-8 w-8 text-yellow-500" />
                    </div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <p className="text-purple-600 font-semibold">{member.title}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      {member.earnings || member.bookings || member.contributions}
                      {member.earnings && <span className="text-sm"> this quarter</span>}
                      {member.bookings && <span className="text-sm"> this month</span>}
                      {member.contributions && <span className="text-sm"> posts</span>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Value Blocks */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Why Join Our Community?</h2>
              <p className="text-xl text-gray-600">Real results from real members</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Network Effect</h3>
                <p className="text-gray-600">Connect with 8,500+ successful professionals</p>
              </div>
              
              <div className="text-center p-6">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Income Growth</h3>
                <p className="text-gray-600">Average 300% income increase in 6 months</p>
              </div>
              
              <div className="text-center p-6">
                <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Exclusive Resources</h3>
                <p className="text-gray-600">Access to premium training & tools</p>
              </div>
              
              <div className="text-center p-6">
                <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Gift className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">VIP Perks</h3>
                <p className="text-gray-600">Priority booking, exclusive events & more</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                💫 Success Stories
              </h2>
              <p className="text-xl text-gray-600">Life-changing results from our community</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="hover:shadow-2xl transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-lg italic mb-6 text-gray-700">
                      "{testimonial.text}"
                    </blockquote>
                    <div className="flex items-center">
                      <Avatar className="h-12 w-12 mr-4">
                        <AvatarImage src={testimonial.avatar} />
                        <AvatarFallback>{testimonial.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{testimonial.author}</div>
                        <div className="text-sm text-gray-500">{testimonial.role}, {testimonial.location}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Leaderboard */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">🚀 Monthly Leaderboard</h2>
              <p className="text-xl text-gray-600">Top contributors this month</p>
            </div>
            
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    { rank: 1, name: "Sarah Johnson", points: 2847, badge: "🥇" },
                    { rank: 2, name: "Mike Chen", points: 2156, badge: "🥈" },
                    { rank: 3, name: "Elena Rodriguez", points: 1923, badge: "🥉" },
                    { rank: 4, name: "David Kim", points: 1654, badge: "🏆" },
                    { rank: 5, name: "Lisa Wong", points: 1432, badge: "⭐" }
                  ].map((member) => (
                    <div key={member.rank} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{member.badge}</span>
                        <div>
                          <div className="font-semibold">{member.name}</div>
                          <div className="text-sm text-gray-500">Rank #{member.rank}</div>
                        </div>
                      </div>
                      <div className="text-lg font-bold text-purple-600">
                        {member.points.toLocaleString()} pts
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Ready to Join the Elite?
            </h2>
            <p className="text-xl mb-8 text-purple-100">
              Start your journey to beauty business success today
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
              <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg px-8 py-4 hover:from-yellow-500 hover:to-orange-600">
                <Crown className="mr-2 h-5 w-5" />
                Join for FREE
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-900">
                <Heart className="mr-2 h-5 w-5" />
                Learn More
              </Button>
            </div>
            
            <p className="text-sm text-purple-200">
              ✅ Free forever • ✅ No credit card required • ✅ Join 8,500+ members
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Community;
