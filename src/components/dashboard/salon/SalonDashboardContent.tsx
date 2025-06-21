
import React from 'react';
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
  Zap
} from "lucide-react";
import { useAuth } from "@/context/auth";

export const SalonDashboardContent = () => {
  const { userProfile } = useAuth();
  
  // Dynamic salon name with proper fallback chain
  const salonName = userProfile?.salon_name ?? userProfile?.company_name ?? userProfile?.full_name ?? "Salon Owner";

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 min-h-screen">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {salonName}!
        </h1>
        <p className="text-gray-600">
          Manage your salon operations and grow your business with our advanced tools
        </p>
      </div>

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
  );
};

export default SalonDashboardContent;
