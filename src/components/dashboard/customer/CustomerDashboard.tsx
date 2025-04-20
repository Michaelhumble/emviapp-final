
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Heart, Sparkles, Star, Users, Bell, Wallet, TrendingUp } from "lucide-react";
import { useCustomerDashboard } from "@/hooks/useCustomerDashboard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/auth";
import CustomerBookingsSection from "./bookings/CustomerBookingsSection";
import FavoritesSection from "./favorites/FavoritesSection";
import { useNavigate } from "react-router-dom";
import CustomerWelcomeBanner from "./CustomerWelcomeBanner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CustomerDashboard = () => {
  const { userProfile } = useAuth();
  const { bookings, upcomingBookings, previousBookings, favorites, loading, error } = useCustomerDashboard();
  const name = userProfile?.full_name?.split(" ")[0] || userProfile?.full_name || "there";
  const navigate = useNavigate();

  // Motion variants for staggered animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="max-w-6xl mx-auto w-full pt-2 pb-14 px-2 md:px-4">
      {/* Welcome Banner */}
      <CustomerWelcomeBanner isProfileTrending={upcomingBookings.length > 0} />

      {/* STATS CARDS (Quick Overview) */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Upcoming */}
        <motion.div variants={item}>
          <Card className="hover:shadow-md transition-all duration-200 border-primary/10">
            <CardContent className="p-4 md:p-5 flex items-center gap-4">
              <div className="p-3 bg-rose-100 rounded-full">
                <Calendar className="h-5 w-5 md:h-6 md:w-6 text-rose-600" />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold">{loading ? <Skeleton className="h-5 w-12" /> : upcomingBookings.length}</div>
                <div className="text-gray-500 text-sm">Upcoming</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Favorites */}
        <motion.div variants={item}>
          <Card className="hover:shadow-md transition-all duration-200 border-primary/10">
            <CardContent className="p-4 md:p-5 flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <Heart className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold">{loading ? <Skeleton className="h-5 w-12" /> : favorites.length}</div>
                <div className="text-gray-500 text-sm">Favorites</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Booking history */}
        <motion.div variants={item}>
          <Card className="hover:shadow-md transition-all duration-200 border-primary/10">
            <CardContent className="p-4 md:p-5 flex items-center gap-4">
              <div className="p-3 bg-amber-100 rounded-full">
                <Star className="h-5 w-5 md:h-6 md:w-6 text-amber-600" />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold">{loading ? <Skeleton className="h-5 w-12" /> : previousBookings.length}</div>
                <div className="text-gray-500 text-sm">Completed</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Loyalty Points (Placeholder) */}
        <motion.div variants={item}>
          <Card className="hover:shadow-md transition-all duration-200 border-primary/10">
            <CardContent className="p-4 md:p-5 flex items-center gap-4">
              <div className="p-3 bg-emerald-100 rounded-full">
                <Wallet className="h-5 w-5 md:h-6 md:w-6 text-emerald-600" />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold">{loading ? <Skeleton className="h-5 w-12" /> : 150}</div>
                <div className="text-gray-500 text-sm">Loyalty Points</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Main Content Tabs for Mobile - Stack/tabs on mobile, grid on desktop */}
      <div className="block md:hidden mb-6">
        <Tabs defaultValue="appointments" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="suggestions">For You</TabsTrigger>
          </TabsList>
          
          <TabsContent value="appointments" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Upcoming Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CustomerBookingsSection type="upcoming" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Booking History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CustomerBookingsSection type="previous" />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="favorites">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Heart className="h-5 w-5 text-rose-500" />
                  Your Favorites
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FavoritesSection />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="suggestions">
            <SuggestedServicesSection />
          </TabsContent>
        </Tabs>
      </div>

      {/* DASHBOARD GRID LAYOUT - Desktop */}
      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {/* column 1: Upcoming bookings, Booking history */}
        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Upcoming Appointments
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <CustomerBookingsSection type="upcoming" />
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Booking History
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <CustomerBookingsSection type="previous" />
            </CardContent>
          </Card>
        </div>

        {/* column 2: Favorites + Booking Reminders */}
        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Heart className="h-5 w-5 text-rose-500" />
                Your Favorites
              </CardTitle>
              <CardDescription>
                Artists or salons you saved for easy access
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <FavoritesSection />
            </CardContent>
          </Card>

          <Card className="shadow-sm border-amber-100 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Bell className="h-5 w-5 text-amber-500" />
                Booking Reminders
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 text-amber-700">
                <div className="bg-amber-100 p-3 rounded-full">
                  <Bell className="h-5 w-5 text-amber-600" />
                </div>
                <p className="text-sm">You'll receive a text reminder 24 hours before each booking.</p>
              </div>
              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/settings/notifications')}>
                  Manage Notifications
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* column 3: Suggested Services + Trending */}
        <div className="space-y-6">
          <SuggestedServicesSection />
          
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                Trending Styles
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded-lg flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-blue-700">Natural Nails</p>
                    <p className="text-xs text-blue-600">Most booked this week</p>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-3 rounded-lg flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <TrendingUp className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-purple-700">Chrome Polish</p>
                    <p className="text-xs text-purple-600">Featured in magazine</p>
                  </div>
                </div>
                
                <div className="bg-pink-50 p-3 rounded-lg flex items-center gap-3">
                  <div className="bg-pink-100 p-2 rounded-full">
                    <TrendingUp className="h-4 w-4 text-pink-600" />
                  </div>
                  <div>
                    <p className="font-medium text-pink-700">French Tips</p>
                    <p className="text-xs text-pink-600">Back in style</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/explore/styles')}>
                  Explore All Trends
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Suggested Services Section Component
const SuggestedServicesSection = () => (
  <Card className="shadow-sm">
    <CardHeader className="pb-2">
      <CardTitle className="text-xl font-semibold flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-amber-500" /> Suggested For You
      </CardTitle>
    </CardHeader>
    <CardContent className="p-4">
      <div className="space-y-3">
        <div className="border border-gray-200 p-3 rounded-lg flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-2 rounded-full">
              <Sparkles className="h-4 w-4 text-amber-600" />
            </div>
            <div>
              <p className="font-medium">Gel Manicure</p>
              <p className="text-xs text-gray-500">From $35</p>
            </div>
          </div>
          <Button size="sm" variant="outline">Book</Button>
        </div>
        
        <div className="border border-gray-200 p-3 rounded-lg flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-2 rounded-full">
              <Sparkles className="h-4 w-4 text-amber-600" />
            </div>
            <div>
              <p className="font-medium">Nail Art</p>
              <p className="text-xs text-gray-500">From $20</p>
            </div>
          </div>
          <Button size="sm" variant="outline">Book</Button>
        </div>
        
        <div className="border border-gray-200 p-3 rounded-lg flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-2 rounded-full">
              <Sparkles className="h-4 w-4 text-amber-600" />
            </div>
            <div>
              <p className="font-medium">Pedicure</p>
              <p className="text-xs text-gray-500">From $45</p>
            </div>
          </div>
          <Button size="sm" variant="outline">Book</Button>
        </div>
      </div>
      
      <div className="mt-4">
        <Button variant="outline" size="sm" className="w-full">
          View All Services
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default CustomerDashboard;
