import React, { useEffect } from 'react';
import { 
  BarChart3, 
  Calendar, 
  Crown, 
  MapPin, 
  Plus, 
  RefreshCw, 
  Settings, 
  Star, 
  Store, 
  TrendingUp, 
  Users,
  Award,
  Image,
  AlertCircle
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import SalonTeamManagement from './team/SalonTeamManagement';
import { useSalon } from '@/context/salon';

const SalonDashboardNew = () => {
  const { currentSalon, isLoadingSalons } = useSalon();

  // Debug logging
  useEffect(() => {
    console.log('SalonDashboardNew - currentSalon:', currentSalon);
    console.log('SalonDashboardNew - isLoadingSalons:', isLoadingSalons);
  }, [currentSalon, isLoadingSalons]);

  if (isLoadingSalons) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto text-purple-600" />
          <p className="text-gray-600">Loading your salon dashboard...</p>
        </div>
      </div>
    );
  }

  if (!currentSalon) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
            <Store className="h-8 w-8 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Salon Found</h2>
            <p className="text-gray-600 mb-4">
              You don't have any salons set up yet. Create your first salon to get started.
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Salon
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Hero Section - Salon Empire */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/95 via-purple-700/90 to-indigo-800/95"></div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.08%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-pink-400/20 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="relative container mx-auto px-6 py-16">
          {/* Salon Empire Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-3xl bg-white/15 backdrop-blur-xl flex items-center justify-center border border-white/30 shadow-2xl">
                  {currentSalon.logo_url ? (
                    <img 
                      src={currentSalon.logo_url} 
                      alt={currentSalon.salon_name}
                      className="w-20 h-20 rounded-2xl object-cover shadow-lg"
                    />
                  ) : (
                    <Store className="h-12 w-12 text-white" />
                  )}
                </div>
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white/20">
                  <Crown className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
              Salon Empire
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-purple-100 mb-6">
              {currentSalon.salon_name}
            </h2>
            <p className="text-lg text-purple-200 max-w-2xl mx-auto leading-relaxed">
              Welcome to your premium salon management dashboard. Build your beauty empire with powerful tools designed for success.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-purple-100">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <MapPin className="h-4 w-4" />
                <span className="text-sm font-medium">{currentSalon.location || 'Set Location'}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <Calendar className="h-4 w-4" />
                <span className="text-sm font-medium">Owner Dashboard</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <Award className="h-4 w-4" />
                <span className="text-sm font-medium">Premium Salon</span>
              </div>
            </div>
          </div>

          {/* Premium Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group bg-white/15 backdrop-blur-xl rounded-2xl p-6 border border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-green-400" />
                </div>
                <div className="text-right">
                  <p className="text-purple-100 text-sm font-medium">Revenue</p>
                  <p className="text-white text-2xl font-bold">$12,890</p>
                </div>
              </div>
              <div className="text-green-400 text-sm font-medium">+23% this month</div>
            </div>
            
            <div className="group bg-white/15 backdrop-blur-xl rounded-2xl p-6 border border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <Users className="h-6 w-6 text-blue-400" />
                </div>
                <div className="text-right">
                  <p className="text-purple-100 text-sm font-medium">Bookings</p>
                  <p className="text-white text-2xl font-bold">247</p>
                </div>
              </div>
              <div className="text-blue-400 text-sm font-medium">+18% this month</div>
            </div>
            
            <div className="group bg-white/15 backdrop-blur-xl rounded-2xl p-6 border border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-yellow-500/20 rounded-xl">
                  <Star className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="text-right">
                  <p className="text-purple-100 text-sm font-medium">Team Size</p>
                  <p className="text-white text-2xl font-bold">12</p>
                </div>
              </div>
              <div className="text-yellow-400 text-sm font-medium">2 new hires</div>
            </div>
            
            <div className="group bg-white/15 backdrop-blur-xl rounded-2xl p-6 border border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <Award className="h-6 w-6 text-purple-400" />
                </div>
                <div className="text-right">
                  <p className="text-purple-100 text-sm font-medium">Rating</p>
                  <p className="text-white text-2xl font-bold">4.9</p>
                </div>
              </div>
              <div className="text-purple-400 text-sm font-medium">248 reviews</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-none lg:flex bg-white/60 backdrop-blur-sm border border-purple-100">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Team</span>
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Bookings</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              <span className="hidden sm:inline">Gallery</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Overview content */}
              <Card className="bg-white/60 backdrop-blur-sm border-purple-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    Today's Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">8 appointments scheduled</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="team">
            <SalonTeamManagement />
          </TabsContent>

          <TabsContent value="bookings">
            <Card className="bg-white/60 backdrop-blur-sm border-purple-100">
              <CardHeader>
                <CardTitle>Booking Management</CardTitle>
                <CardDescription>Manage your salon bookings and appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Booking management features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="bg-white/60 backdrop-blur-sm border-purple-100">
              <CardHeader>
                <CardTitle>Analytics & Reports</CardTitle>
                <CardDescription>View your salon's performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Analytics dashboard coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery">
            <Card className="bg-white/60 backdrop-blur-sm border-purple-100">
              <CardHeader>
                <CardTitle>Photo Gallery</CardTitle>
                <CardDescription>Manage your salon's photo gallery</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Photo gallery management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-white/60 backdrop-blur-sm border-purple-100">
              <CardHeader>
                <CardTitle>Salon Settings</CardTitle>
                <CardDescription>Configure your salon preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Settings panel coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SalonDashboardNew;
