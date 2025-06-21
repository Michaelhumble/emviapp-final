import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Calendar, 
  Users, 
  CreditCard, 
  Crown,
  Sparkles,
  BarChart3,
  CalendarCheck,
  Megaphone,
  Star,
  TrendingUp,
  Brain,
  Zap,
  Rocket,
  ChevronRight
} from "lucide-react";
import { useAuth } from "@/context/auth";

export const SalonDashboardContent = () => {
  const { user } = useAuth();
  
  const salonName = user?.salon_name ?? user?.company_name ?? user?.full_name ?? "Salon Owner";

  return (
    <div className="space-y-8 p-6">
      {/* Dynamic Welcome Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Welcome back, {salonName}!
        </h1>
        <p className="text-gray-600">Manage your salon with advanced tools and insights</p>
      </div>

      {/* Premium Smart Review AI Card */}
      <Card className="border-gradient-to-r from-blue-200 to-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-purple-50">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-xl">
            <Sparkles className="h-6 w-6 text-yellow-500" />
            Smart Review AI ✨
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center gap-4 mb-4">
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <span className="text-red-500 font-bold text-sm">Google</span>
            </div>
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <span className="text-orange-500 font-bold text-sm">Yelp</span>
            </div>
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <span className="text-blue-600 font-bold text-sm">Facebook</span>
            </div>
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <span className="text-pink-500 font-bold text-sm">TikTok</span>
            </div>
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <span className="text-green-600 font-bold text-sm">ChatGPT</span>
            </div>
          </div>
          <div className="bg-white/70 p-4 rounded-lg">
            <p className="text-sm text-gray-700 italic">
              "AI-generated insights from your reviews across all platforms. Get actionable feedback and improve customer satisfaction automatically."
            </p>
          </div>
          <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            Notify Me When Available
          </Button>
        </CardContent>
      </Card>

      {/* Coming Soon Premium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* AI Analytics Pro */}
        <Card className="border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-cyan-50 group">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-lg text-blue-700">AI Analytics Pro</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-600 mb-4">Advanced business intelligence with predictive insights</p>
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Coming Soon</Badge>
          </CardContent>
        </Card>

        {/* Smart Scheduling */}
        <Card className="border-2 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50 group">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
              <CalendarCheck className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-lg text-green-700">Smart Scheduling</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-600 mb-4">AI-powered appointment optimization and management</p>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Coming Soon</Badge>
          </CardContent>
        </Card>

        {/* Marketing Autopilot */}
        <Card className="border-2 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50 group">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
              <Megaphone className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-lg text-purple-700">Marketing Autopilot</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-600 mb-4">Automated social media and customer engagement</p>
            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">Coming Soon</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Existing Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Advanced Communication Hub */}
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-indigo-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-indigo-700">
              <MessageSquare className="h-6 w-6" />
              Advanced Communication Hub
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Streamline client communications with AI-powered messaging</p>
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
              Access Hub <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Advanced Service Management */}
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-emerald-50 to-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-700">
              <Calendar className="h-6 w-6" />
              Advanced Service Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Optimize your service offerings and scheduling</p>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
              Manage Services <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Credit Balance */}
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-amber-50 to-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-700">
              <CreditCard className="h-6 w-6" />
              Credit Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-600 mb-2">250</div>
            <p className="text-gray-600 mb-4">Available credits for premium features</p>
            <Button variant="outline" className="w-full border-amber-300 text-amber-700 hover:bg-amber-50">
              View Details
            </Button>
          </CardContent>
        </Card>

        {/* Upgrade to Pro */}
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <Crown className="h-6 w-6" />
              Upgrade to Pro
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Unlock premium features and advanced analytics</p>
            <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Upgrade Now <Sparkles className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Team & Recognition */}
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-rose-50 to-pink-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-rose-700">
              <Users className="h-6 w-6" />
              Team & Recognition
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Manage your team and celebrate achievements</p>
            <Button className="w-full bg-rose-600 hover:bg-rose-700">
              View Team <Star className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Booking Calendar */}
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-teal-50 to-cyan-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-teal-700">
              <Calendar className="h-6 w-6" />
              Booking Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">View and manage all appointments</p>
            <Button className="w-full bg-teal-600 hover:bg-teal-700">
              Open Calendar <Calendar className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Revolutionary Features Coming Soon */}
      <Card className="shadow-xl bg-gradient-to-br from-slate-50 to-gray-50 border-2 border-gray-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
            Revolutionary Features Coming Soon
          </CardTitle>
          <p className="text-gray-600">The future of salon management is here</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Brain className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <h4 className="font-semibold text-gray-700">AI Assistant</h4>
              <p className="text-xs text-gray-500 mt-1">24/7 intelligent support</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Zap className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
              <h4 className="font-semibold text-gray-700">VR Consultations</h4>
              <p className="text-xs text-gray-500 mt-1">Virtual reality previews</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <h4 className="font-semibold text-gray-700">Predictive Analytics</h4>
              <p className="text-xs text-gray-500 mt-1">Future trend insights</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Rocket className="h-8 w-8 mx-auto mb-2 text-purple-500" />
              <h4 className="font-semibold text-gray-700">Growth Accelerator</h4>
              <p className="text-xs text-gray-500 mt-1">Business optimization</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
