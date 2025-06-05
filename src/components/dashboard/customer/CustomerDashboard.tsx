
import React from 'react';
import { Container } from "@/components/ui/container";
import CustomerDashboardHeader from "./CustomerDashboardHeader";
import { useCustomerDashboard } from "@/hooks/useCustomerDashboard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Search, Heart, Star, Sparkles, Gift, TrendingUp, Users, Crown, Zap } from "lucide-react";
import { motion } from "framer-motion";
import CustomerWelcomeBanner from "./CustomerWelcomeBanner";
import CustomerMotivationalQuote from "./CustomerMotivationalQuote";
import CustomerMetricsSection from "./CustomerMetricsSection";
import CustomerReferralCard from "./CustomerReferralCard";

const CustomerDashboard = () => {
  const { bookings, favorites, loading } = useCustomerDashboard();

  if (loading) {
    return (
      <Container className="py-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      </Container>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      <Container className="py-8 max-w-6xl mx-auto">
        <CustomerDashboardHeader />
        
        <div className="space-y-8">
          {/* Welcome Banner */}
          <CustomerWelcomeBanner isProfileTrending={true} />
          
          {/* Referral Card */}
          <CustomerReferralCard />
          
          {/* Beauty Journey Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Sparkles className="h-6 w-6 text-emerald-600 mr-3" />
                  My Beauty Journey
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Gift className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-800">1,250</div>
                    <div className="text-sm text-gray-600">Credits Earned</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Crown className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-800">12</div>
                    <div className="text-sm text-gray-600">Badges Unlocked</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Zap className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-800">7</div>
                    <div className="text-sm text-gray-600">Day Streak</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-800">45</div>
                    <div className="text-sm text-gray-600">Days Active</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions Premium Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="group overflow-hidden border-0 shadow-xl bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-white relative">
                <div className="absolute top-4 right-4 opacity-20">
                  <Search className="h-12 w-12" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                      <Search className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold">Discover Artists</h3>
                  </div>
                  <p className="text-white/90 mb-6">Find talented nail artists near you and book your next beauty session</p>
                  <Button className="w-full bg-white text-purple-600 hover:bg-gray-100 font-semibold">
                    Explore Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group overflow-hidden border-0 shadow-xl bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-white relative">
                <div className="absolute top-4 right-4 opacity-20">
                  <Calendar className="h-12 w-12" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold">Book Appointment</h3>
                  </div>
                  <p className="text-white/90 mb-6">Schedule your next beauty appointment with top-rated professionals</p>
                  <Button className="w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold">
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group overflow-hidden border-0 shadow-xl bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-white relative">
                <div className="absolute top-4 right-4 opacity-20">
                  <Heart className="h-12 w-12" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                      <Heart className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold">My Favorites</h3>
                  </div>
                  <p className="text-white/90 mb-6">View and manage your saved artists, salons, and beauty services</p>
                  <Button className="w-full bg-white text-pink-600 hover:bg-gray-100 font-semibold">
                    View Collection
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Motivational Quote */}
          <CustomerMotivationalQuote />

          {/* Beauty Metrics */}
          <CustomerMetricsSection />

          {/* Recent Activity Premium */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Card className="border-0 shadow-xl bg-gradient-to-r from-indigo-50 to-purple-50">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-900">
                  <Star className="h-6 w-6 text-indigo-600 mr-3" />
                  Recent Beauty Adventures
                </h3>
                {bookings.length > 0 ? (
                  <div className="space-y-4">
                    {bookings.slice(0, 3).map((booking, index) => (
                      <motion.div 
                        key={booking.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                            <Sparkles className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{booking.service?.title || 'Beauty Service'}</p>
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              {booking.date_requested} • {booking.status}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="hover:bg-purple-50 border-purple-200">
                          View Details
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Sparkles className="h-12 w-12 text-purple-400" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Your Beauty Journey Awaits!</h4>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">Start your first appointment to unlock amazing rewards and track your beauty journey.</p>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-3">
                      Find Your First Artist
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default CustomerDashboard;
