
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Star, 
  Users, 
  TrendingUp, 
  Award, 
  Heart, 
  Sparkles, 
  Crown, 
  Zap,
  ArrowRight,
  Timer,
  Trophy,
  Camera,
  DollarSign,
  MapPin
} from 'lucide-react';
import Layout from '@/components/layout/Layout';

const FreelancersPage = () => {
  const [joinCount, setJoinCount] = useState(8547);
  const [activeUsers, setActiveUsers] = useState(1243);
  const [currentActivity, setCurrentActivity] = useState(0);
  const [timeLeft, setTimeLeft] = useState(72);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');

  // Rotating headlines
  const headlines = [
    "Where Beauty Pros, Salons & Clients Unite",
    "The Most Trusted, Inspiring, and Rewarding Beauty Community on Earth",
    "Your Success Story Starts Here"
  ];
  const [currentHeadline, setCurrentHeadline] = useState(0);

  // Live activity feed
  const activities = [
    "Ngoc just landed a job at Diamond Nails! 💎",
    "Beauty Haus Salon upgraded to Pro Membership! 🚀",
    "Maria earned $2,400 this week! 💰",
    "Sunset Spa got 5 new bookings today! ⭐",
    "Kevin completed his 100th service! 🏆",
    "Luxury Nails is now trending in Houston! 🔥"
  ];

  // Success stories
  const successStories = [
    {
      name: "Sarah Chen",
      role: "Nail Artist",
      story: "Went from $30K to $85K in 6 months",
      image: "/lovable-uploads/1f3cfd40-4041-4545-b71e-5a7f484f86e9.png",
      badge: "Top Earner"
    },
    {
      name: "Diamond Nails",
      role: "Premium Salon",
      story: "300% booking increase in 3 months",
      image: "/lovable-uploads/2951176b-68c9-45d6-8bc5-20513e72d0a3.png",
      badge: "Most Popular"
    },
    {
      name: "Mike Rodriguez",
      role: "Freelancer",
      story: "Booked solid for next 2 months",
      image: "/lovable-uploads/4963d98c-613d-4a9a-99a4-7fa4b2e22717.png",
      badge: "Most Hired"
    }
  ];

  // Leaderboard
  const leaderboard = [
    { name: "Luna Beauty", earnings: "$12,500", type: "salon" },
    { name: "Alex Kim", earnings: "$8,900", type: "artist" },
    { name: "Glamour Studio", earnings: "$7,600", type: "salon" }
  ];

  useEffect(() => {
    // Rotate headlines
    const headlineInterval = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % headlines.length);
    }, 4000);

    // Rotate activities
    const activityInterval = setInterval(() => {
      setCurrentActivity((prev) => (prev + 1) % activities.length);
    }, 3000);

    // Update counters
    const counterInterval = setInterval(() => {
      setJoinCount(prev => prev + Math.floor(Math.random() * 3));
      setActiveUsers(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 8000);

    // Countdown timer
    const timerInterval = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 72);
    }, 3600000); // Update every hour

    return () => {
      clearInterval(headlineInterval);
      clearInterval(activityInterval);
      clearInterval(counterInterval);
      clearInterval(timerInterval);
    };
  }, []);

  const handleJoinNow = () => {
    if (email && name && city) {
      // Add confetti effect here in real implementation
      alert(`Welcome to EmviApp Community, ${name}! 🎉`);
    }
  };

  return (
    <Layout>
      {/* Debug Banner */}
      <div className="bg-red-500 text-white text-center py-3 px-4 font-bold text-lg animate-pulse">
        🚨 EMVI.APP COMMUNITY PAGE REBUILD (JUNE 2025) — REPLACING FREELANCERS 🚨
      </div>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
        {/* Hero/FOMO Section */}
        <section className="relative overflow-hidden py-20 px-4">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm"></div>
          
          <div className="container mx-auto text-center relative z-10">
            <motion.div
              key={currentHeadline}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                {headlines[currentHeadline]}
              </h1>
            </motion.div>

            <div className="text-xl md:text-2xl text-gray-700 mb-8 space-y-2">
              <motion.p
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Join the fastest-growing network of salons, artists, and clients
              </motion.p>
              <p className="text-lg">Thousands of success stories, unlimited opportunity</p>
            </div>

            {/* Live Counters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-white/80 backdrop-blur-md rounded-lg p-4 shadow-lg"
              >
                <div className="text-2xl font-bold text-purple-600">{joinCount.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Members Joined</div>
              </motion.div>
              
              <div className="bg-white/80 backdrop-blur-md rounded-lg p-4 shadow-lg">
                <div className="text-2xl font-bold text-green-600">{activeUsers}</div>
                <div className="text-sm text-gray-600">Online Now</div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-md rounded-lg p-4 shadow-lg">
                <div className="text-2xl font-bold text-blue-600">$2.1M+</div>
                <div className="text-sm text-gray-600">Earned This Month</div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-md rounded-lg p-4 shadow-lg">
                <div className="text-2xl font-bold text-pink-600">4,892</div>
                <div className="text-sm text-gray-600">Jobs Filled</div>
              </div>
            </div>

            {/* FOMO Scarcity Banner */}
            <motion.div
              animate={{ boxShadow: ['0 0 20px rgba(255,215,0,0.5)', '0 0 40px rgba(255,215,0,0.8)', '0 0 20px rgba(255,215,0,0.5)'] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-lg mb-8 inline-block"
            >
              <div className="flex items-center gap-2">
                <Crown className="h-6 w-6" />
                <span className="font-bold">Founding Member Special!</span>
                <Timer className="h-5 w-5" />
                <span>{timeLeft}h left</span>
              </div>
              <div className="text-sm mt-1">Only 147 VIP spots remaining this week!</div>
            </motion.div>

            {/* Main CTA */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 text-xl font-bold shadow-2xl animate-pulse"
                onClick={() => document.getElementById('join-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Sparkles className="mr-2 h-6 w-6" />
                Reserve Your Spot Now!
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Live Activity Feed */}
        <section className="py-12 px-4 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">🔥 Live Community Activity</h2>
              <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-lg inline-block">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentActivity}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="text-lg font-medium"
                  >
                    {activities[currentActivity]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* Trending Now Bar */}
            <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white p-3 rounded-lg text-center mb-8">
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="h-5 w-5" />
                <span className="font-bold">Trending Now:</span>
                <span>Nail Art Competitions • Salon Partnerships • VIP Memberships</span>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories & Featured Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">✨ Featured Success Stories</h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {successStories.map((story, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="relative"
                >
                  <Card className="overflow-hidden bg-white/80 backdrop-blur-md shadow-xl border-0">
                    <CardContent className="p-6">
                      <div className="relative mb-4">
                        <img 
                          src={story.image} 
                          alt={story.name} 
                          className="w-20 h-20 rounded-full mx-auto object-cover"
                        />
                        <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500">
                          {story.badge}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold text-center mb-2">{story.name}</h3>
                      <p className="text-gray-600 text-center mb-3">{story.role}</p>
                      <p className="text-green-600 font-bold text-center text-lg">{story.story}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Monthly Leaderboard */}
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
                <Trophy className="h-8 w-8 text-yellow-500" />
                This Month's Top Earners
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {leaderboard.map((leader, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-bold">{leader.name}</div>
                        <div className="text-green-600 font-bold">{leader.earnings}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Community Engagement */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">🗳️ You Decide What We Build Next!</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-6 bg-white/80 backdrop-blur-md">
                <h3 className="text-xl font-bold mb-4">📱 Mobile App with AR Try-On</h3>
                <div className="bg-green-200 h-4 rounded-full mb-2">
                  <div className="bg-green-500 h-4 rounded-full w-3/4"></div>
                </div>
                <p className="text-sm text-gray-600">2,847 votes (74%)</p>
              </Card>
              
              <Card className="p-6 bg-white/80 backdrop-blur-md">
                <h3 className="text-xl font-bold mb-4">🎥 Live Streaming Features</h3>
                <div className="bg-blue-200 h-4 rounded-full mb-2">
                  <div className="bg-blue-500 h-4 rounded-full w-1/4"></div>
                </div>
                <p className="text-sm text-gray-600">1,023 votes (26%)</p>
              </Card>
            </div>

            {/* Monthly Challenge */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-8 rounded-2xl mb-8">
              <h3 className="text-2xl font-bold mb-4">🏆 December Challenge: Nail Art of the Month</h3>
              <p className="text-lg mb-4">Winner gets $1,000 + Feature on our homepage!</p>
              <Button className="bg-white text-purple-600 hover:bg-gray-100">
                Submit Your Entry
              </Button>
            </div>

            {/* Referral System */}
            <div className="bg-yellow-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">💰 Invite Friends = Earn Rewards</h3>
              <p className="mb-4">Get $50 credit for every friend who joins + they get VIP status!</p>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                Start Referring Now
              </Button>
            </div>
          </div>
        </section>

        {/* Join Form */}
        <section id="join-form" className="py-16 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <div className="container mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold mb-4">🚀 Ready to Transform Your Career?</h2>
            <p className="text-xl mb-8">Get early access, grow your career, and never miss an opportunity again.</p>
            
            <div className="bg-white/20 backdrop-blur-md p-8 rounded-2xl">
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <Input
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/90 text-gray-800"
                />
                <Input
                  placeholder="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/90 text-gray-800"
                />
                <Input
                  placeholder="Your City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="bg-white/90 text-gray-800"
                />
              </div>
              
              <Button 
                onClick={handleJoinNow}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-4 text-lg"
                disabled={!email || !name || !city}
              >
                <Zap className="mr-2 h-6 w-6" />
                Claim My VIP Membership Now!
              </Button>
              
              <p className="text-sm mt-4 text-white/80">
                ✅ Your privacy and future are protected by EmviApp
              </p>
            </div>
          </div>
        </section>

        {/* Trust & Final FOMO */}
        <section className="py-12 px-4 bg-gray-900 text-white">
          <div className="container mx-auto text-center">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="flex flex-col items-center">
                <Heart className="h-12 w-12 text-red-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Trusted by 8,500+</h3>
                <p className="text-gray-300">Beauty professionals worldwide</p>
              </div>
              
              <div className="flex flex-col items-center">
                <Award className="h-12 w-12 text-yellow-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Industry Leading</h3>
                <p className="text-gray-300">Security & privacy protection</p>
              </div>
              
              <div className="flex flex-col items-center">
                <Star className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">4.9/5 Rating</h3>
                <p className="text-gray-300">From verified members</p>
              </div>
            </div>
            
            <motion.div
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-2xl font-bold text-yellow-400 mb-4"
            >
              ⚡ Limited Time: First 1,000 members get lifetime VIP perks!
            </motion.div>
            
            <p className="text-gray-400 text-sm mb-8">
              Join now before we reach capacity. Next enrollment opens in 3 months.
            </p>

            {/* Sunshine Credit */}
            <p className="text-gray-500 text-sm">
              Inspired by Sunshine ☀️
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default FreelancersPage;
