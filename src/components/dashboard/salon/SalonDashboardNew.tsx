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
import SalonTeamManagement from './salon/team/SalonTeamManagement';
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-white to-indigo-50/20">
      {/* Debug Info - Remove in production */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>Debug Info:</strong> Current Salon ID: {currentSalon.id} | Name: {currentSalon.salon_name}
            </p>
          </div>
        </div>
      </div>

      {/* Premium Dashboard Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-indigo-700/90"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Salon Info */}
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  {currentSalon.logo_url ? (
                    <img 
                      src={currentSalon.logo_url} 
                      alt={currentSalon.salon_name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                  ) : (
                    <Store className="h-10 w-10 text-white" />
                  )}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Crown className="h-4 w-4 text-white" />
                </div>
              </div>
              
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {currentSalon.salon_name}
                </h1>
                <div className="flex items-center space-x-4 text-purple-100">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{currentSalon.location || 'Location not set'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">Owner Dashboard</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">This Month</p>
                    <p className="text-white text-2xl font-bold">$4,890</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-400" />
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Bookings</p>
                    <p className="text-white text-2xl font-bold">127</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-400" />
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Team</p>
                    <p className="text-white text-2xl font-bold">8</p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-400" />
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Rating</p>
                    <p className="text-white text-2xl font-bold">4.9</p>
                  </div>
                  <Award className="h-8 w-8 text-purple-400" />
                </div>
              </div>
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
