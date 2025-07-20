import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Settings, 
  CreditCard, 
  Users, 
  Calendar,
  Sparkles,
  TrendingUp,
  Clock,
  Megaphone,
  Star,
  Brain,
  BarChart3,
  Zap,
  Crown,
  Award,
  Target,
  Building2
} from "lucide-react";
import { useAuth } from "@/context/auth";

export const SalonDashboardContent = () => {
  const { userProfile } = useAuth();
  
  // Dynamic salon name with proper fallback chain
  const salonName = userProfile?.salon_name ?? userProfile?.company_name ?? userProfile?.full_name ?? "Salon Owner";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Premium Hero Section - Full Width */}
      <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-purple-600/20 backdrop-blur-sm"></div>
        <div className="absolute -right-20 -top-20 w-60 h-60 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl"></div>
        <div className="absolute -left-24 -bottom-24 w-72 h-72 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Side - Avatar and Welcome */}
            <div className="flex items-center gap-6">
              {/* Salon Avatar */}
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-white/20 to-white/10 rounded-full flex items-center justify-center border-4 border-white/30 backdrop-blur-sm">
                  {userProfile?.avatar_url ? (
                    <img 
                      src={userProfile.avatar_url} 
                      alt={salonName}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <Building2 className="h-12 w-12 text-white" />
                  )}
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Crown className="h-3 w-3 text-purple-900" />
                </div>
              </div>
              
              {/* Welcome Text */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  Welcome back, <span className="bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">{salonName}</span>! ✨
                </h1>
                <p className="text-purple-100 text-lg mb-4">
                  Your premium salon management hub. Build something extraordinary.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-900 font-semibold px-3 py-1">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                  <Badge className="bg-white/20 text-white backdrop-blur-sm border border-white/30">
                    Level 3 Elite
                  </Badge>
                  <Badge className="bg-green-500/20 text-green-200 backdrop-blur-sm border border-green-400/30">
                    85% Complete
                  </Badge>
                </div>
              </div>
            </div>
            
            {/* Right Side - Quick Stats */}
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center min-w-[120px]">
                <div className="text-2xl font-bold">{userProfile?.credits || 0}</div>
                <div className="text-purple-200 text-sm">Credits</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center min-w-[120px]">
                <div className="text-2xl font-bold">4.9</div>
                <div className="text-purple-200 text-sm flex items-center justify-center gap-1">
                  <Star className="h-3 w-3 fill-current" />
                  Rating
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center min-w-[120px]">
                <div className="text-2xl font-bold">12</div>
                <div className="text-purple-200 text-sm">Team</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white relative overflow-hidden hover:scale-105 transition-transform duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <Calendar className="h-8 w-8 text-white" />
                <TrendingUp className="h-5 w-5 text-blue-200" />
              </div>
              <div className="text-3xl font-bold mb-1">24</div>
              <div className="text-blue-100 text-sm">Today's Bookings</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white relative overflow-hidden hover:scale-105 transition-transform duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <Star className="h-8 w-8 text-white fill-current" />
                <Award className="h-5 w-5 text-green-200" />
              </div>
              <div className="text-3xl font-bold mb-1">4.9</div>
              <div className="text-green-100 text-sm">Avg Rating</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white relative overflow-hidden hover:scale-105 transition-transform duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <Users className="h-8 w-8 text-white" />
                <Crown className="h-5 w-5 text-purple-200" />
              </div>
              <div className="text-3xl font-bold mb-1">12</div>
              <div className="text-purple-100 text-sm">Team Members</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white relative overflow-hidden hover:scale-105 transition-transform duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <Target className="h-8 w-8 text-white" />
                <Sparkles className="h-5 w-5 text-amber-200" />
              </div>
              <div className="text-3xl font-bold mb-1">8</div>
              <div className="text-amber-100 text-sm">Active Offers</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          
          {/* Advanced Communication Hub */}
          <Card className="hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                Advanced Communication Hub
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Connect with clients, manage bookings, and streamline communication
              </p>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300">
                Open Messages
              </Button>
            </CardContent>
          </Card>

          {/* Advanced Service Management */}
          <Card className="hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Settings className="h-5 w-5 text-emerald-600" />
                Advanced Service Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Manage services, pricing, and staff scheduling efficiently
              </p>
              <Button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300">
                Manage Services
              </Button>
            </CardContent>
          </Card>

          {/* Smart Review AI - Premium FOMO Feature */}
          <Card className="hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-violet-50 to-indigo-50 border-2 border-violet-200 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-violet-400/20 to-indigo-400/20 rounded-full -translate-y-10 translate-x-10"></div>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-violet-600" />
                Smart Review AI ✨
                <Badge variant="secondary" className="ml-auto bg-violet-100 text-violet-700 text-xs">
                  Premium
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  AI-powered review management across all platforms
                </p>
                
                {/* Platform logos */}
                <div className="flex gap-2 items-center">
                  <span className="text-xs text-gray-500">Platforms:</span>
                  <div className="flex gap-1">
                    <Badge variant="outline" className="text-xs">Google</Badge>
                    <Badge variant="outline" className="text-xs">Yelp</Badge>
                    <Badge variant="outline" className="text-xs">Facebook</Badge>
                    <Badge variant="outline" className="text-xs">TikTok</Badge>
                  </div>
                </div>
                
                {/* AI highlights */}
                <div className="bg-white/60 p-3 rounded-lg border">
                  <p className="text-xs text-gray-700 italic">
                    "AI Summary: 92% positive sentiment • 15% increase in bookings • Top keywords: 'professional', 'relaxing', 'amazing'"
                  </p>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 transition-all duration-300 shadow-md">
                  <Brain className="h-4 w-4 mr-2" />
                  Notify Me
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Credit Balance */}
          <Card className="hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <CreditCard className="h-5 w-5 text-amber-600" />
                Credit Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600 mb-2">
                {userProfile?.credits || 0} Credits
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Use credits for premium features and boosts
              </p>
              <Button variant="outline" className="w-full hover:bg-amber-50 border-amber-200">
                View History
              </Button>
            </CardContent>
          </Card>

          {/* Upgrade to Pro */}
          <Card className="hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Star className="h-5 w-5 text-orange-600" />
                Upgrade to Pro
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Unlock advanced analytics, priority support, and exclusive features
              </p>
              <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                Upgrade Now
              </Button>
            </CardContent>
          </Card>

          {/* Team & Recognition */}
          <Card className="hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-purple-600" />
                Team & Recognition
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Manage staff, track performance, and celebrate achievements
              </p>
              <Button variant="outline" className="w-full hover:bg-purple-50 border-purple-200">
                View Team
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Coming Soon Premium Features */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-violet-600" />
            Premium Features Coming Soon
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* AI Analytics Pro */}
            <Card className="hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="pb-3 relative z-10">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  AI Analytics Pro
                  <Badge variant="secondary" className="ml-auto bg-blue-100 text-blue-700 text-xs">
                    Coming Soon
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-sm text-gray-600 mb-4">
                  Advanced business intelligence with predictive analytics and revenue optimization
                </p>
                <Button variant="outline" className="w-full border-blue-200 hover:bg-blue-50" disabled>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Get Notified
                </Button>
              </CardContent>
            </Card>

            {/* Smart Scheduling */}
            <Card className="hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-200 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="pb-3 relative z-10">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5 text-emerald-600" />
                  Smart Scheduling
                  <Badge variant="secondary" className="ml-auto bg-emerald-100 text-emerald-700 text-xs">
                    Coming Soon
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-sm text-gray-600 mb-4">
                  AI-powered scheduling optimization with automatic conflict resolution and capacity planning
                </p>
                <Button variant="outline" className="w-full border-emerald-200 hover:bg-emerald-50" disabled>
                  <Calendar className="h-4 w-4 mr-2" />
                  Get Notified
                </Button>
              </CardContent>
            </Card>

            {/* Marketing Autopilot */}
            <Card className="hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="pb-3 relative z-10">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Megaphone className="h-5 w-5 text-purple-600" />
                  Marketing Autopilot
                  <Badge variant="secondary" className="ml-auto bg-purple-100 text-purple-700 text-xs">
                    Coming Soon
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-sm text-gray-600 mb-4">
                  Automated social media management, customer retention campaigns, and targeted promotions
                </p>
                <Button variant="outline" className="w-full border-purple-200 hover:bg-purple-50" disabled>
                  <Zap className="h-4 w-4 mr-2" />
                  Get Notified
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Booking Calendar */}
        <Card className="mt-6 hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-indigo-600" />
              Booking Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              View and manage all upcoming appointments and availability
            </p>
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
              Open Calendar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalonDashboardContent;