
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, Users, DollarSign, Star, Bell, Zap, BarChart3, Calendar, Megaphone, Sparkles } from "lucide-react";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";

const SalonDashboardOverview = () => {
  const { userProfile } = useAuth();
  const [notifyStates, setNotifyStates] = useState({
    smartReview: false,
    aiAnalytics: false,
    smartScheduling: false,
    marketingAutopilot: false,
  });

  // Dynamic salon name with priority fallback
  const getSalonDisplayName = () => {
    return userProfile?.salon_name || 
           userProfile?.company_name || 
           userProfile?.full_name || 
           "Salon Owner";
  };

  const handleNotifyMe = (feature: string) => {
    setNotifyStates(prev => ({ ...prev, [feature]: true }));
    toast.success(`You'll be notified when ${feature} launches!`, {
      description: "We'll email you as soon as it's available.",
    });
  };

  // Dummy data for demonstration
  const todaysBookings = 5;
  const weeklyRevenue = 2450;
  const dummyStaff = [
    { id: 1, name: "Jessica Kim", bookings: 12, revenue: 1230 },
    { id: 2, name: "Michael Chen", bookings: 8, revenue: 780 },
    { id: 3, name: "Sarah Johnson", bookings: 7, revenue: 640 },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Enhanced Dynamic Welcome Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 p-8 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold font-playfair mb-2 animate-fade-in">
            Welcome back, {getSalonDisplayName()}! ✨
          </h1>
          <p className="text-lg text-blue-100 font-inter opacity-90">
            Your business is growing beautifully. Here's today's overview.
          </p>
        </div>
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-yellow-400/20 rounded-full blur-lg"></div>
      </div>
      
      {/* Stats Cards with Enhanced Animations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-muted shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-blue-50/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium font-inter text-gray-700">Today's Bookings</CardTitle>
            <CalendarClock className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{todaysBookings}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {todaysBookings > 0 ? "Appointments scheduled" : "No appointments today"}
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-muted shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-green-50/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium font-inter text-gray-700">Weekly Revenue</CardTitle>
            <DollarSign className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">${weeklyRevenue}</div>
            <p className="text-xs text-muted-foreground mt-1">
              For the current week
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-muted shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-purple-50/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium font-inter text-gray-700">Top Staff</CardTitle>
            <Users className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{dummyStaff.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active team members
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Smart Review AI Feature Card */}
      <Card className="border-2 border-gradient-to-r from-yellow-400 to-orange-500 shadow-2xl hover:shadow-3xl transition-all duration-500 bg-gradient-to-br from-yellow-50 via-white to-orange-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-yellow-400/20 to-transparent rounded-full blur-xl"></div>
        <CardHeader className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-playfair text-gray-900 flex items-center gap-2">
                  Smart Review AI
                  <Badge className="bg-gradient-to-r from-pink-500 to-violet-500 text-white animate-pulse">
                    PREMIUM
                  </Badge>
                </CardTitle>
                <p className="text-gray-600 font-inter">AI-powered review management across all platforms</p>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                Platform Integration
              </h4>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="bg-white/50">🔍 Google Reviews</Badge>
                <Badge variant="outline" className="bg-white/50">⭐ Yelp Reviews</Badge>
                <Badge variant="outline" className="bg-white/50">🤖 ChatGPT Analysis</Badge>
                <Badge variant="outline" className="bg-white/50">📘 Facebook Reviews</Badge>
                <Badge variant="outline" className="bg-white/50">🎵 TikTok Mentions</Badge>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">AI Review Highlights</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p className="italic">"Amazing service and attention to detail..."</p>
                <p className="italic">"The best nail salon in the area..."</p>
                <p className="italic">"Highly recommend their gel manicures..."</p>
              </div>
            </div>
          </div>
          <Button 
            onClick={() => handleNotifyMe('smartReview')}
            disabled={notifyStates.smartReview}
            className="mt-6 w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            {notifyStates.smartReview ? (
              <>
                <Bell className="h-5 w-5 mr-2" />
                You'll be notified!
              </>
            ) : (
              <>
                <Bell className="h-5 w-5 mr-2" />
                Notify Me When Available
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Coming Soon Premium Feature Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* AI Analytics Pro */}
        <Card className="border border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-blue-50 via-white to-indigo-50 hover:-translate-y-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-400/20 to-transparent rounded-full blur-lg"></div>
          <CardHeader className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                COMING SOON
              </Badge>
            </div>
            <CardTitle className="text-xl font-playfair text-gray-900">AI Analytics Pro</CardTitle>
            <p className="text-gray-600 text-sm font-inter">Advanced business insights powered by AI</p>
          </CardHeader>
          <CardContent className="relative z-10">
            <ul className="space-y-2 text-sm text-gray-600 mb-4">
              <li>• Predictive revenue forecasting</li>
              <li>• Customer behavior analysis</li>
              <li>• Automated reporting</li>
            </ul>
            <Button 
              onClick={() => handleNotifyMe('aiAnalytics')}
              disabled={notifyStates.aiAnalytics}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white transition-all duration-300"
            >
              {notifyStates.aiAnalytics ? (
                <>
                  <Bell className="h-4 w-4 mr-2" />
                  Notified!
                </>
              ) : (
                <>
                  <Bell className="h-4 w-4 mr-2" />
                  Notify Me
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Smart Scheduling */}
        <Card className="border border-green-200 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-green-50 via-white to-emerald-50 hover:-translate-y-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-green-400/20 to-transparent rounded-full blur-lg"></div>
          <CardHeader className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                COMING SOON
              </Badge>
            </div>
            <CardTitle className="text-xl font-playfair text-gray-900">Smart Scheduling</CardTitle>
            <p className="text-gray-600 text-sm font-inter">AI-optimized appointment management</p>
          </CardHeader>
          <CardContent className="relative z-10">
            <ul className="space-y-2 text-sm text-gray-600 mb-4">
              <li>• Intelligent time slot optimization</li>
              <li>• Automated reminder system</li>
              <li>• Dynamic pricing suggestions</li>
            </ul>
            <Button 
              onClick={() => handleNotifyMe('smartScheduling')}
              disabled={notifyStates.smartScheduling}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white transition-all duration-300"
            >
              {notifyStates.smartScheduling ? (
                <>
                  <Bell className="h-4 w-4 mr-2" />
                  Notified!
                </>
              ) : (
                <>
                  <Bell className="h-4 w-4 mr-2" />
                  Notify Me
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Marketing Autopilot */}
        <Card className="border border-purple-200 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-purple-50 via-white to-violet-50 hover:-translate-y-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-400/20 to-transparent rounded-full blur-lg"></div>
          <CardHeader className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl">
                <Megaphone className="h-6 w-6 text-white" />
              </div>
              <Badge className="bg-gradient-to-r from-purple-500 to-violet-600 text-white">
                COMING SOON
              </Badge>
            </div>
            <CardTitle className="text-xl font-playfair text-gray-900">Marketing Autopilot</CardTitle>
            <p className="text-gray-600 text-sm font-inter">Automated marketing campaigns</p>
          </CardHeader>
          <CardContent className="relative z-10">
            <ul className="space-y-2 text-sm text-gray-600 mb-4">
              <li>• Social media automation</li>
              <li>• Customer retention campaigns</li>
              <li>• Performance tracking</li>
            </ul>
            <Button 
              onClick={() => handleNotifyMe('marketingAutopilot')}
              disabled={notifyStates.marketingAutopilot}
              className="w-full bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white transition-all duration-300"
            >
              {notifyStates.marketingAutopilot ? (
                <>
                  <Bell className="h-4 w-4 mr-2" />
                  Notified!
                </>
              ) : (
                <>
                  <Bell className="h-4 w-4 mr-2" />
                  Notify Me
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Enhanced Top Staff Table */}
      <Card className="border-muted shadow-xl bg-gradient-to-br from-white to-gray-50/50">
        <CardHeader>
          <CardTitle className="text-2xl font-playfair text-gray-900 flex items-center gap-2">
            <Users className="h-6 w-6 text-indigo-600" />
            Top Performing Staff
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="font-inter border-b border-gray-200">
                  <th className="text-left py-4 px-3 font-semibold text-gray-700">Staff Member</th>
                  <th className="text-center py-4 px-3 font-semibold text-gray-700">Bookings</th>
                  <th className="text-right py-4 px-3 font-semibold text-gray-700">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {dummyStaff.map((staff, index) => (
                  <tr key={staff.id} className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-all duration-200">
                    <td className="py-4 px-3 font-medium text-gray-900">{staff.name}</td>
                    <td className="text-center py-4 px-3">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {staff.bookings}
                      </Badge>
                    </td>
                    <td className="text-right py-4 px-3 font-semibold text-green-700">${staff.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonDashboardOverview;
