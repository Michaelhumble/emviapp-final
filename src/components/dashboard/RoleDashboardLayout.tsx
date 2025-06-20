
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  TrendingUp, 
  Calendar, 
  Users, 
  MessageCircle, 
  CreditCard,
  Star,
  Bell,
  ThumbsUp,
  Plus,
  Crown,
  Zap,
  Target,
  Gift,
  Award,
  Heart,
  Rocket,
  Diamond,
  Shield,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

const RoleDashboardLayout = () => {
  const { userProfile } = useAuth();
  const [votedFeatures, setVotedFeatures] = useState<Set<number>>(new Set());

  // Get salon name from user profile, fallback to "Salon Owner"
  const salonName = userProfile?.salon_name || userProfile?.business_name || "Salon Owner";

  const handleVote = (featureId: number) => {
    if (!votedFeatures.has(featureId)) {
      setVotedFeatures(prev => new Set([...prev, featureId]));
      toast.success("Thank you for your vote! We'll prioritize this feature.", {
        icon: "🗳️"
      });
    }
  };

  const handleNotifyMe = () => {
    toast.success("You'll be notified when this feature launches!", {
      icon: "🔔"
    });
  };

  const revolutionaryFeatures = [
    { id: 1, title: "AI Booking Assistant", icon: Rocket, gradient: "from-purple-500 to-pink-500" },
    { id: 2, title: "Smart Staff Scheduling", icon: Calendar, gradient: "from-blue-500 to-cyan-500" },
    { id: 3, title: "Client Retention AI", icon: Heart, gradient: "from-red-500 to-pink-500" },
    { id: 4, title: "Revenue Optimizer", icon: TrendingUp, gradient: "from-green-500 to-emerald-500" },
    { id: 5, title: "Social Media Autopilot", icon: Sparkles, gradient: "from-orange-500 to-red-500" },
    { id: 6, title: "VIP Client Portal", icon: Crown, gradient: "from-yellow-500 to-orange-500" },
    { id: 7, title: "Performance Analytics", icon: Target, gradient: "from-indigo-500 to-purple-500" },
    { id: 8, title: "Loyalty Rewards Engine", icon: Gift, gradient: "from-pink-500 to-rose-500" },
    { id: 9, title: "Team Recognition Hub", icon: Award, gradient: "from-emerald-500 to-teal-500" },
    { id: 10, title: "Premium Security Suite", icon: Shield, gradient: "from-slate-500 to-gray-500" }
  ];

  const quickStats = [
    { title: "New Applicants", value: "12", change: "+3 today", icon: Users, color: "text-blue-500" },
    { title: "Profile Views", value: "284", change: "+18% this week", icon: TrendingUp, color: "text-green-500" },
    { title: "Active Bookings", value: "47", change: "+5 pending", icon: Calendar, color: "text-purple-500" },
    { title: "Growth Rate", value: "23%", change: "+2% this month", icon: Rocket, color: "text-orange-500" },
    { title: "Credits", value: "150", change: "Earn more", icon: Diamond, color: "text-cyan-500" },
    { title: "Team Score", value: "9.2", change: "Excellent", icon: Star, color: "text-yellow-500" }
  ];

  const demoBookings = [
    { id: 1, client: "Sarah Chen", service: "Hair Color & Cut", time: "10:00 AM", status: "Confirmed" },
    { id: 2, client: "Marcus Johnson", service: "Beard Trim", time: "2:30 PM", status: "Pending" },
    { id: 3, client: "Emily Davis", service: "Manicure", time: "4:00 PM", status: "Confirmed" }
  ];

  const teamMembers = [
    { name: "Alex Rivera", role: "Senior Stylist", avatar: "A", rating: 4.9, isEotw: true },
    { name: "Jamie Kim", role: "Color Specialist", avatar: "J", rating: 4.8, isEotw: false },
    { name: "Taylor Brown", role: "Nail Technician", avatar: "T", rating: 4.7, isEotw: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Premium Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 p-8 text-white shadow-2xl"
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-4xl md:text-6xl font-playfair font-bold mb-4"
            >
              Welcome back, {salonName}! ✨
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="text-xl md:text-2xl font-light opacity-90"
            >
              Your future starts here. Build something extraordinary.
            </motion.p>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"
          ></motion.div>
        </motion.div>

        {/* Revolutionary Features Coming Soon - FOMO Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-6"
        >
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-playfair font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Revolutionary Features Coming Soon
            </h2>
            <p className="text-gray-600 dark:text-gray-300">Vote for what you want to see first!</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {revolutionaryFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group"
              >
                <Card className="relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-sm">{feature.title}</h3>
                    <div className="space-y-2">
                      <Button
                        size="sm"
                        variant={votedFeatures.has(feature.id) ? "secondary" : "default"}
                        onClick={() => handleVote(feature.id)}
                        disabled={votedFeatures.has(feature.id)}
                        className="w-full"
                      >
                        {votedFeatures.has(feature.id) ? "Voted ✓" : "Vote"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleNotifyMe}
                        className="w-full"
                      >
                        <Bell className="w-3 h-3 mr-1" />
                        Notify Me
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color} group-hover:scale-110 transition-transform`} />
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">{stat.title}</div>
                  <div className="text-xs text-green-600 dark:text-green-400">{stat.change}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* Bookings & Calendar Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg h-full">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-purple-500" />
                    Today's Bookings
                  </h3>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Booking
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {demoBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                      <div>
                        <div className="font-medium">{booking.client}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{booking.service}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{booking.time}</div>
                        <Badge variant={booking.status === 'Confirmed' ? 'default' : 'secondary'} className="text-xs">
                          {booking.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                
                {demoBookings.length === 0 && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No bookings scheduled for today</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* My Team & Recognition */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg h-full">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-500" />
                    My Team
                  </h3>
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                    <Crown className="w-3 h-3 mr-1" />
                    Employee of the Week
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div key={member.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${member.isEotw ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'}`}>
                          {member.avatar}
                          {member.isEotw && <Crown className="w-3 h-3 absolute -top-1 -right-1" />}
                        </div>
                        <div>
                          <div className="font-medium flex items-center">
                            {member.name}
                            {member.isEotw && <span className="ml-2">👑</span>}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{member.role}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-yellow-500">
                          <Star className="w-4 h-4 mr-1" />
                          {member.rating}
                        </div>
                        <Button size="sm" variant="ghost" disabled className="text-xs">
                          Write Review
                          <Lock className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Service Management & Credit Balance Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* Service Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-green-500" />
                    Service Management
                  </h3>
                  <Badge variant="secondary">Coming Soon</Badge>
                </div>
                
                <div className="space-y-4 opacity-60">
                  <div className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center">
                    <Lock className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Advanced service management tools coming soon!</p>
                    <Button disabled>Vote for Priority</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Credit Balance & Pro Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold flex items-center">
                    <Diamond className="w-5 h-5 mr-2" />
                    Credits & Pro Plan
                  </h3>
                  <Badge className="bg-white/20 text-white">Premium</Badge>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-3xl font-bold mb-1">150 Credits</div>
                    <div className="text-white/80 text-sm">Available for premium features</div>
                  </div>
                  
                  <Button className="w-full bg-white text-purple-600 hover:bg-white/90">
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade to Pro
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Messages & Internal Chat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2 text-cyan-500" />
                  Messages & Internal Chat
                </h3>
                <Badge variant="secondary">Coming Soon</Badge>
              </div>
              
              <div className="text-center py-8">
                <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                <h4 className="text-lg font-medium mb-2">Team Communication Hub</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Advanced messaging system with client communication, team chat, and AI-powered insights coming soon!
                </p>
                <div className="flex justify-center space-x-2">
                  <Button variant="outline" onClick={() => handleVote(11)}>
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Vote for Priority
                  </Button>
                  <Button variant="outline" onClick={handleNotifyMe}>
                    <Bell className="w-4 h-4 mr-2" />
                    Notify Me
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </div>
    </div>
  );
};

export default RoleDashboardLayout;
