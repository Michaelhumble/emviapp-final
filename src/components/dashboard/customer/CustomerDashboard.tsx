
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Heart, Sparkles, Star, Users } from "lucide-react";
import { useCustomerDashboard } from "@/hooks/useCustomerDashboard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/auth";
import CustomerBookingsSection from "./bookings/CustomerBookingsSection";
import FavoritesSection from "./favorites/FavoritesSection";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Optional: Placeholder for suggested services
const SuggestedServicesSection = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-amber-500" /> Suggested For You
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-500">Feature coming soon! Get personalized suggestions for services you'll love.</p>
    </CardContent>
  </Card>
);

const CustomerDashboard = () => {
  const { userProfile } = useAuth();
  const { bookings, upcomingBookings, previousBookings, favorites, loading, error } = useCustomerDashboard();
  const name = userProfile?.full_name?.split(" ")[0] || userProfile?.full_name || "there";
  const navigate = useNavigate();

  // Layout: 1col mobile, 2col grid on md+
  return (
    <div className="max-w-6xl mx-auto w-full pt-2 pb-14 px-1">
      {/* Greeting */}
      <motion.div
        className="mb-6 mt-4"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
          <span>Welcome back, {name} 👋</span>
        </h1>
        <div className="text-gray-600 text-base font-normal mt-1">
          Your personalized beauty dashboard
        </div>
      </motion.div>

      {/* STATS CARDS (Quick Overview) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Upcoming */}
        <Card className="hover:shadow">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-rose-100 rounded-full">
              <Calendar className="h-6 w-6 text-rose-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{loading ? <Skeleton className="h-5 w-12" /> : upcomingBookings.length}</div>
              <div className="text-gray-500 text-sm">Upcoming Appointments</div>
            </div>
          </CardContent>
        </Card>
        {/* Favorites */}
        <Card className="hover:shadow">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <Heart className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{loading ? <Skeleton className="h-5 w-12" /> : favorites.length}</div>
              <div className="text-gray-500 text-sm">Favorite Artists</div>
            </div>
          </CardContent>
        </Card>
        {/* Booking history */}
        <Card className="hover:shadow">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-amber-100 rounded-full">
              <Star className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{loading ? <Skeleton className="h-5 w-12" /> : previousBookings.length}</div>
              <div className="text-gray-500 text-sm">Completed Bookings</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* DASHBOARD GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* column 1: Upcoming bookings, Booking history */}
        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-0">
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
            <CardHeader className="pb-0">
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

        {/* column 2: Favorites */}
        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-0">
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

          {/* Stack on sm, flex on desktop */}
          <div className="hidden lg:block">
            <SuggestedServicesSection />
          </div>
        </div>
        
        {/* column 3: Suggested (only on large screens) */}
        <div className="block lg:hidden mt-6">
          <SuggestedServicesSection />
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
