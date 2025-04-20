
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Heart, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";
import CustomerWelcomeBanner from "./CustomerWelcomeBanner";
import CustomerBookingsSection from "./bookings/CustomerBookingsSection";
import FavoritesSection from "./favorites/FavoritesSection";
import SuggestedServicesSection from "./services/SuggestedServicesSection";
import { useAuth } from "@/context/auth";

const CustomerDashboard = () => {
  const { userProfile } = useAuth();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <CustomerWelcomeBanner />
      
      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="hover:shadow-md transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-rose-100 rounded-full">
                  <Calendar className="h-6 w-6 text-rose-600" />
                </div>
                <div>
                  <p className="text-2xl font-semibold">12</p>
                  <p className="text-sm text-gray-500">Upcoming Appointments</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="hover:shadow-md transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Heart className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-semibold">8</p>
                  <p className="text-sm text-gray-500">Favorite Artists</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="hover:shadow-md transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-amber-100 rounded-full">
                  <Star className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-semibold">4.9</p>
                  <p className="text-sm text-gray-500">Average Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Upcoming Appointments Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="shadow-sm">
          <CardHeader className="pb-0">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Upcoming Appointments
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <CustomerBookingsSection type="upcoming" />
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Previous Bookings Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="shadow-sm">
          <CardHeader className="pb-0">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Booking History
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <CustomerBookingsSection type="previous" />
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Favorites Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="shadow-sm">
          <CardHeader className="pb-0">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <Heart className="h-5 w-5 text-rose-500" />
              Your Favorites
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <FavoritesSection />
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Suggested Services Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="shadow-sm">
          <CardHeader className="pb-0">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              Suggested For You
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <SuggestedServicesSection />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CustomerDashboard;
