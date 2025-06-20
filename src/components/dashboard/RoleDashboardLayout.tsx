
import React from 'react';
import { useAuth } from "@/context/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  Star, 
  Users, 
  Calendar, 
  TrendingUp, 
  Crown, 
  MessageSquare,
  CreditCard,
  CheckCircle,
  Sparkles,
  Eye,
  BookOpen,
  Award,
  Heart,
  Zap,
  Target,
  ChevronRight,
  Plus,
  Vote,
  Bell
} from "lucide-react";
import { toast } from "sonner";

interface RoleDashboardLayoutProps {
  children?: React.ReactNode;
}

const RoleDashboardLayout = ({ children }: RoleDashboardLayoutProps) => {
  const { userProfile } = useAuth();
  
  const salonName = userProfile?.salon_name || userProfile?.business_name || "Salon Owner";

  // Features that are actually live and functional
  const liveFeatures = [
    {
      icon: <Users className="h-5 w-5" />,
      title: "Profile Management",
      description: "Complete salon profile setup and editing",
      status: "live"
    },
    {
      icon: <Star className="h-5 w-5" />,
      title: "Dashboard Analytics",
      description: "Basic stats and metrics overview",
      status: "live"
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: "Contact System",
      description: "Receive and manage customer inquiries",
      status: "live"
    }
  ];

  // Features that are coming soon or not fully built
  const comingSoonFeatures = [
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "AI-Optimized Scheduling",
      description: "Smart booking management with AI recommendations",
      votes: 234,
      priority: "high"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Bookings",
      description: "Real-time appointment booking system",
      votes: 189,
      priority: "high"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Team Leaderboard",
      description: "Performance tracking and team competition",
      votes: 156,
      priority: "medium"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Pro Analytics Suite",
      description: "Advanced business intelligence and insights",
      votes: 201,
      priority: "high"
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Instant Payouts",
      description: "Same-day payment processing",
      votes: 178,
      priority: "medium"
    },
    {
      icon: <Crown className="h-6 w-6" />,
      title: "VIP Client Profiles",
      description: "Premium customer relationship management",
      votes: 143,
      priority: "medium"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Live Availability Sync",
      description: "Real-time calendar synchronization",
      votes: 167,
      priority: "high"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Client Loyalty Program",
      description: "Automated rewards and retention system",
      votes: 132,
      priority: "low"
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "AI Beauty Consultant",
      description: "Personalized service recommendations",
      votes: 198,
      priority: "high"
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Digital Service Menu",
      description: "Interactive service catalog with pricing",
      votes: 124,
      priority: "medium"
    }
  ];

  const handleVote = (featureTitle: string) => {
    toast.success(`Thank you for voting for ${featureTitle}! We'll notify you when it's ready.`);
  };

  const handleNotifyMe = (featureTitle: string) => {
    toast.success(`You'll be notified when ${featureTitle} launches!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Animated Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <motion.h1 
                className="text-4xl md:text-5xl font-playfair font-bold mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Welcome back, {salonName}!
              </motion.h1>
              <motion.p 
                className="text-xl text-purple-100 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Your future starts here. ✨
              </motion.p>
            </div>
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-pink-300/20 rounded-full blur-lg"></div>
          </div>
        </motion.div>

        {/* Live Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
            <h2 className="text-2xl font-playfair font-bold text-gray-900">Live Features</h2>
            <Badge className="bg-green-100 text-green-700 border-green-200">Available Now</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {liveFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="border-2 border-green-200 bg-green-50/50 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-green-100 p-3 rounded-xl text-green-600">
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </div>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Revolutionary Features Coming Soon Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full"></div>
            <h2 className="text-2xl font-playfair font-bold text-gray-900">Revolutionary Features Coming Soon</h2>
            <Badge className="bg-purple-100 text-purple-700 border-purple-200">Vote Now</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comingSoonFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <Card className="border-2 border-purple-200 bg-gradient-to-br from-white to-purple-50/30 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardHeader className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-3 rounded-xl text-purple-600">
                        {feature.icon}
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`
                          ${feature.priority === 'high' ? 'border-red-200 text-red-600 bg-red-50' : ''}
                          ${feature.priority === 'medium' ? 'border-yellow-200 text-yellow-600 bg-yellow-50' : ''}
                          ${feature.priority === 'low' ? 'border-blue-200 text-blue-600 bg-blue-50' : ''}
                        `}
                      >
                        {feature.priority === 'high' ? 'High Priority' : feature.priority === 'medium' ? 'Medium Priority' : 'Future'}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                      {feature.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleVote(feature.title)}
                          className="bg-white hover:bg-purple-50 border-purple-200 text-purple-600"
                        >
                          <Vote className="h-4 w-4 mr-1" />
                          Vote ({feature.votes})
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleNotifyMe(feature.title)}
                          className="bg-white hover:bg-pink-50 border-pink-200 text-pink-600"
                        >
                          <Bell className="h-4 w-4 mr-1" />
                          Notify Me
                        </Button>
                      </div>
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
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-6">Quick Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { icon: <Users className="h-6 w-6" />, label: "Applicants", value: "12", color: "blue" },
              { icon: <Eye className="h-6 w-6" />, label: "Profile Views", value: "1.2k", color: "green" },
              { icon: <Calendar className="h-6 w-6" />, label: "Bookings", value: "8", color: "purple" },
              { icon: <TrendingUp className="h-6 w-6" />, label: "Growth", value: "+24%", color: "pink" },
              { icon: <CreditCard className="h-6 w-6" />, label: "Credits", value: "150", color: "orange" },
              { icon: <Star className="h-6 w-6" />, label: "Rating", value: "4.9", color: "yellow" }
            ].map((stat, index) => (
              <Card key={stat.label} className="bg-white/70 backdrop-blur-sm border-gray-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4 text-center">
                  <div className={`mx-auto w-12 h-12 rounded-xl bg-${stat.color}-100 flex items-center justify-center text-${stat.color}-600 mb-3`}>
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Bookings & Calendar Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-8"
        >
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-playfair">Recent Bookings</CardTitle>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Booking
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">No bookings yet</h3>
                <p className="text-sm">Your upcoming appointments will appear here</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* My Team & Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mb-8"
        >
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-playfair">My Team</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">Build your dream team</h3>
                <p className="text-sm mb-4">Invite talented artists to join your salon</p>
                <Button variant="outline" disabled>
                  <Plus className="h-4 w-4 mr-2" />
                  Invite Team Member (Coming Soon)
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Service Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mb-8"
        >
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-playfair">Service Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Sparkles className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">Premium Service Suite</h3>
                <p className="text-sm mb-4">Advanced service management tools coming soon</p>
                <Button variant="outline" disabled>
                  Coming Soon - Vote for Priority
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Credit Balance & Pro Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <CardHeader>
              <CardTitle className="text-xl font-playfair">Pro Plan & Credits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold mb-2">150 Credits Available</div>
                  <p className="text-purple-100">Upgrade to Pro for unlimited features</p>
                </div>
                <Button variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
                  Upgrade Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Messages & Internal Chat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="mb-8"
        >
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-playfair">Messages & Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">Internal Communication Hub</h3>
                <p className="text-sm mb-4">Team chat and customer messaging coming soon</p>
                <Button variant="outline" disabled>
                  Coming Soon
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {children}
      </div>
    </div>
  );
};

export default RoleDashboardLayout;
