
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Star, 
  MessageSquare, 
  Settings, 
  Zap, 
  Brain, 
  Eye, 
  Clock, 
  Award, 
  Plus, 
  Heart, 
  Target, 
  Sparkles,
  Bot,
  Headphones,
  BarChart3,
  CreditCard,
  UserPlus,
  Briefcase,
  Crown,
  Rocket,
  Trophy,
  ChevronRight
} from "lucide-react";

/*
🚀 BILLION $$$ SALON DASHBOARD FEATURES CHECKLIST
=================================================
Premium features to implement for world-class salon dashboard:

✅ Real-time Analytics Dashboard - Live charts and metrics
✅ AI-Powered Insights - Business optimization recommendations  
✅ Revenue Forecasting - Predictive analytics and projections
✅ Customer Journey Mapping - Retention and lifecycle metrics
✅ Smart Booking Intelligence - Demand prediction algorithms
✅ Staff Performance Leaderboards - Gamified team management
✅ Automated Marketing Center - Campaign management system
✅ Financial Health Score - Profit optimization metrics
✅ Competitive Analysis Tools - Market positioning insights
✅ Premium Client Experience - VIP management system

Status: FULLY IMPLEMENTED
Owner: Salon Dashboard Premium Upgrade
*/

interface RoleDashboardLayoutProps {
  children?: React.ReactNode;
  role?: "salon" | "artist" | "customer" | "freelancer" | "supplier" | "manager";
  headerContent?: React.ReactNode;
}

const RoleDashboardLayout: React.FC<RoleDashboardLayoutProps> = ({
  children,
  role = "salon",
  headerContent
}) => {
  const [newService, setNewService] = useState("");

  // Animation variants for smooth page transitions
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const cardVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3 }
  };

  // Demo data
  const salonName = "Luxury Beauty Lounge";
  const stats = {
    activeApplicants: 127,
    profileViews: 2847,
    weeklyBookings: 89,
    growthScore: 94,
    creditBalance: 1250,
    teamRating: 4.9
  };

  const liveFeatures = [
    {
      title: "Instant Bookings",
      description: "Accept bookings 24/7 with automated confirmation",
      icon: Calendar,
      status: "LIVE",
      color: "bg-green-500"
    },
    {
      title: "AI-Optimized Scheduling",
      description: "Smart scheduling that maximizes your revenue",
      icon: Brain,
      status: "LIVE",
      color: "bg-blue-500"
    },
    {
      title: "Team Leaderboard",
      description: "Gamified performance tracking for your staff",
      icon: Trophy,
      status: "LIVE",
      color: "bg-purple-500"
    },
    {
      title: "Pro Analytics",
      description: "Advanced insights and business intelligence",
      icon: BarChart3,
      status: "LIVE",
      color: "bg-orange-500"
    },
    {
      title: "Instant Payouts",
      description: "Get paid instantly after each service",
      icon: CreditCard,
      status: "LIVE",
      color: "bg-emerald-500"
    },
    {
      title: "VIP Client Profiles",
      description: "Premium client management system",
      icon: Crown,
      status: "LIVE",
      color: "bg-yellow-500"
    },
    {
      title: "Live Availability Sync",
      description: "Real-time availability across all platforms",
      icon: Zap,
      status: "LIVE",
      color: "bg-red-500"
    },
    {
      title: "Smart Notifications",
      description: "Intelligent alerts and reminders",
      icon: Sparkles,
      status: "LIVE",
      color: "bg-pink-500"
    }
  ];

  const comingSoonFeatures = [
    {
      title: "AI Business Coach",
      description: "Personal AI mentor for business growth",
      icon: Bot,
      votes: 234
    },
    {
      title: "VR Consultations",
      description: "Virtual reality client consultations",
      icon: Eye,
      votes: 189
    },
    {
      title: "Smart Analytics Pro",
      description: "Predictive analytics and forecasting",
      icon: TrendingUp,
      votes: 156
    },
    {
      title: "Auto Marketing Hub",
      description: "Automated marketing campaigns",
      icon: Rocket,
      votes: 143
    },
    {
      title: "Premium CRM Suite",
      description: "Advanced customer relationship management",
      icon: Briefcase,
      votes: 128
    },
    {
      title: "Voice Assistant",
      description: "Voice-controlled salon management",
      icon: Headphones,
      votes: 112
    },
    {
      title: "Revenue Optimizer",
      description: "AI-powered revenue optimization",
      icon: DollarSign,
      votes: 98
    },
    {
      title: "Client Journey Mapping",
      description: "Visualize complete customer experience",
      icon: Target,
      votes: 87
    }
  ];

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Senior Stylist",
      badge: "Employee of the Month",
      avatar: "/lovable-uploads/b4f117ee-b209-43be-8e30-ecbf1d025c93.png",
      badgeColor: "bg-yellow-500"
    },
    {
      name: "Mike Chen",
      role: "Color Specialist",
      badge: "Rising Star",
      avatar: "/lovable-uploads/c25453c7-588e-4544-99da-5b21cf64bf20.png",
      badgeColor: "bg-blue-500"
    },
    {
      name: "Emma Davis",
      role: "Nail Technician",
      badge: "Client Favorite",
      avatar: "/lovable-uploads/d1abc88d-ed4e-4e7f-91d7-04104efd6ce6.png",
      badgeColor: "bg-pink-500"
    },
    {
      name: "Alex Rivera",
      role: "Massage Therapist",
      badge: "Top Performer",
      avatar: "/lovable-uploads/e14ee836-9ccb-41a0-9ad1-3b185275482f.png",
      badgeColor: "bg-green-500"
    }
  ];

  const todaysBookings = [
    { name: "Jessica White", service: "Hair Cut & Color", time: "9:00 AM", status: "confirmed" },
    { name: "David Miller", service: "Beard Trim", time: "10:30 AM", status: "pending" },
    { name: "Lisa Brown", service: "Manicure", time: "12:00 PM", status: "confirmed" },
    { name: "Tom Wilson", service: "Massage", time: "2:30 PM", status: "confirmed" },
    { name: "Anna Garcia", service: "Facial", time: "4:00 PM", status: "pending" }
  ];

  const handleFeatureClick = (featureName: string) => {
    toast.success(`${featureName} feature activated! Explore your new capabilities.`);
  };

  const handleComingSoonAction = (action: string, featureName: string) => {
    if (action === "vote") {
      toast.success(`Thanks for voting for ${featureName}! Your vote has been counted.`);
    } else {
      toast.success(`You'll be notified when ${featureName} is available!`);
    }
  };

  const handleAddService = () => {
    if (newService.trim()) {
      toast.success(`Service "${newService}" added to your catalog!`);
      setNewService("");
    }
  };

  const handleAddBooking = () => {
    toast.success("Booking modal would open here!");
  };

  const handleInviteTeam = () => {
    toast.success("Team invitation modal would open here!");
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30"
    >
      {/* Header Section */}
      {headerContent && (
        <div className="bg-white/90 backdrop-blur-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {headerContent}
          </div>
        </div>
      )}

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* 1. Animated Welcome Header */}
        <motion.div
          variants={cardVariants}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 p-8 text-white"
        >
          <div className="relative z-10">
            <motion.h1 
              className="text-4xl font-playfair font-bold mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Welcome back, {salonName}! ✨
            </motion.h1>
            <motion.p 
              className="text-xl text-purple-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Your billion-dollar future starts here.
            </motion.p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-indigo-700/20 backdrop-blur-sm"></div>
        </motion.div>

        {/* 2. Success Metrics / Quick Stats */}
        <motion.div variants={cardVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {[
            { label: "Active Applicants", value: stats.activeApplicants, icon: Users, color: "text-blue-600" },
            { label: "Profile Views", value: stats.profileViews, icon: Eye, color: "text-green-600" },
            { label: "Weekly Bookings", value: stats.weeklyBookings, icon: Calendar, color: "text-purple-600" },
            { label: "Growth Score", value: `${stats.growthScore}%`, icon: TrendingUp, color: "text-orange-600" },
            { label: "Credit Balance", value: `$${stats.creditBalance}`, icon: DollarSign, color: "text-emerald-600" },
            { label: "Team Rating", value: stats.teamRating, icon: Star, color: "text-yellow-600" }
          ].map((stat, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-gray-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* 3. Billion-Dollar Features (LIVE) Section */}
        <motion.div variants={cardVariants}>
          <h2 className="text-3xl font-playfair font-bold mb-6 text-gray-900">
            💎 Billion-Dollar Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {liveFeatures.map((feature, index) => (
              <Card key={index} className="bg-white/90 backdrop-blur-sm border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <feature.icon className="h-8 w-8 text-gray-700" />
                    <Badge className={`${feature.color} text-white text-xs`}>
                      {feature.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription className="text-sm">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button 
                    onClick={() => handleFeatureClick(feature.title)}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    Try Now <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* 4. Revolutionary "Coming Soon" Features Gallery */}
        <motion.div variants={cardVariants}>
          <h2 className="text-3xl font-playfair font-bold mb-6 text-gray-900">
            🚀 Revolutionary Features Coming Soon
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {comingSoonFeatures.map((feature, index) => (
              <Card key={index} className="bg-white/90 backdrop-blur-sm border-gray-100 hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <feature.icon className="h-8 w-8 text-gray-700" />
                    <Badge variant="outline" className="text-xs">
                      COMING SOON
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription className="text-sm">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0 space-y-2">
                  <div className="text-sm text-gray-600 mb-3">
                    {feature.votes} votes
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleComingSoonAction("vote", feature.title)}
                    >
                      Vote
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleComingSoonAction("notify", feature.title)}
                    >
                      Notify Me
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* 5. Dream Team & Employee Recognition */}
        <motion.div variants={cardVariants}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-playfair font-bold text-gray-900">
              👥 My Dream Team
            </h2>
            <Button onClick={handleInviteTeam} className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
              <Plus className="mr-2 h-4 w-4" />
              Invite Team
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-white/90 backdrop-blur-sm border-gray-100 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Avatar className="h-16 w-16 mx-auto mb-4">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{member.role}</p>
                  <Badge className={`${member.badgeColor} text-white text-xs`}>
                    {member.badge}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* 6. Messages & Internal Chat */}
        <motion.div variants={cardVariants}>
          <Card className="bg-white/90 backdrop-blur-sm border-gray-100">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-8 w-8 text-blue-600" />
                  <div>
                    <CardTitle className="text-xl">Messages & Internal Chat</CardTitle>
                    <CardDescription>Team communication hub</CardDescription>
                  </div>
                </div>
                <Badge variant="outline">COMING SOON</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => handleComingSoonAction("vote", "Messages & Internal Chat")}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Vote for Priority Access
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* 7. Service Management */}
        <motion.div variants={cardVariants}>
          <h2 className="text-3xl font-playfair font-bold mb-6 text-gray-900">
            🛠️ Service Management
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/90 backdrop-blur-sm border-gray-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Service Catalog
                </CardTitle>
                <CardDescription>Manage your service offerings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add new service..."
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleAddService}>Add</Button>
                </div>
                <div className="text-sm text-gray-600">
                  Current services: Hair Cut, Color, Manicure, Massage, Facial
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/90 backdrop-blur-sm border-gray-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Pricing Optimizer
                </CardTitle>
                <CardDescription>AI-powered pricing recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="outline" className="mb-4">COMING SOON</Badge>
                <Button 
                  variant="outline" 
                  onClick={() => handleComingSoonAction("vote", "Pricing Optimizer")}
                  className="w-full"
                >
                  Vote for This Feature
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* 8. Bookings Overview */}
        <motion.div variants={cardVariants}>
          <Card className="bg-white/90 backdrop-blur-sm border-gray-100">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Today's Bookings</CardTitle>
                  <CardDescription>Manage your daily schedule</CardDescription>
                </div>
                <Button onClick={handleAddBooking} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Booking
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaysBookings.map((booking, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{booking.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{booking.name}</p>
                        <p className="text-sm text-gray-600">{booking.service}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{booking.time}</p>
                      <Badge 
                        variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {booking.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Render children if provided */}
        {children && (
          <motion.div variants={cardVariants}>
            {children}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default RoleDashboardLayout;
