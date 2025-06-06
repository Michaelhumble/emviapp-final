
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, Heart, Star, Gift, Crown, Sparkles, TrendingUp, Award, MapPin, Clock } from "lucide-react";
import { UserProfile } from "@/context/auth/types";
import CustomerLoyaltyTracker from "@/components/customer/CustomerLoyaltyTracker";

interface PremiumCustomerProfileProps {
  userProfile: UserProfile;
}

const PremiumCustomerProfile = ({ userProfile }: PremiumCustomerProfileProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Premium Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-20 right-20 w-32 h-32 bg-pink-300/20 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute bottom-10 left-1/3 w-24 h-24 bg-purple-300/20 rounded-full blur-xl animate-pulse delay-500" />
        
        <div className="relative z-10 container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Premium Avatar */}
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-inner">
                  {userProfile.first_name?.[0] || userProfile.email?.[0]?.toUpperCase()}
                </div>
              </div>
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2 shadow-lg">
                <Crown className="w-6 h-6 text-white" />
              </div>
            </div>
            
            {/* Customer Name & Status */}
            <h1 className="text-4xl font-bold text-white mb-2">
              {userProfile.first_name} {userProfile.last_name}
            </h1>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Badge className="bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0 px-4 py-1">
                <Sparkles className="w-4 h-4 mr-2" />
                Premium Beauty Enthusiast
              </Badge>
              <Badge className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0 px-4 py-1">
                <Star className="w-4 h-4 mr-2" />
                VIP Member
              </Badge>
            </div>
            <p className="text-pink-100 text-lg mb-6">
              Your beauty journey, elevated to perfection
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">24</div>
                <div className="text-pink-200 text-sm">Appointments</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">850</div>
                <div className="text-pink-200 text-sm">Loyalty Points</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">5</div>
                <div className="text-pink-200 text-sm">Favorites</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Beauty Journey Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-0 shadow-2xl bg-white/60 backdrop-blur-xl overflow-hidden">
                <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-1">
                  <CardHeader className="bg-white/50 backdrop-blur-sm">
                    <CardTitle className="flex items-center text-2xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                      <TrendingUp className="w-6 h-6 mr-3 text-pink-600" />
                      Your Beauty Journey
                    </CardTitle>
                  </CardHeader>
                </div>
                <CardContent className="p-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-100">
                      <Calendar className="w-8 h-8 text-pink-600 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-gray-800 mb-1">24</div>
                      <div className="text-sm text-gray-600">Total Visits</div>
                    </div>
                    <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100">
                      <Heart className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-gray-800 mb-1">5</div>
                      <div className="text-sm text-gray-600">Favorites</div>
                    </div>
                    <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100">
                      <Star className="w-8 h-8 text-amber-600 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-gray-800 mb-1">4.9</div>
                      <div className="text-sm text-gray-600">Avg Rating</div>
                    </div>
                    <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100">
                      <Gift className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-gray-800 mb-1">12</div>
                      <div className="text-sm text-gray-600">Rewards</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="border-0 shadow-2xl bg-white/60 backdrop-blur-xl">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                  <CardTitle className="flex items-center text-xl text-gray-800">
                    <Clock className="w-5 h-5 mr-3 text-indigo-600" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-4"></div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">Nail appointment completed</div>
                        <div className="text-sm text-gray-600">Magic Nails Salon • 2 days ago</div>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>
                    </div>
                    <div className="flex items-center p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">Upcoming hair appointment</div>
                        <div className="text-sm text-gray-600">Elite Beauty Studio • Tomorrow at 2:00 PM</div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">Upcoming</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Loyalty Tracker */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <CustomerLoyaltyTracker />
            </motion.div>

            {/* Premium Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <CardContent className="relative p-6">
                  <div className="flex items-center mb-4">
                    <Crown className="w-6 h-6 mr-3" />
                    <h3 className="text-xl font-bold">VIP Benefits</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Award className="w-4 h-4 mr-3 opacity-80" />
                      <span className="text-sm">Priority booking</span>
                    </div>
                    <div className="flex items-center">
                      <Gift className="w-4 h-4 mr-3 opacity-80" />
                      <span className="text-sm">Exclusive rewards</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-3 opacity-80" />
                      <span className="text-sm">Special discounts</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="border-0 shadow-2xl bg-white/60 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-800">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white border-0 shadow-lg">
                    Book Appointment
                  </Button>
                  <Button variant="outline" className="w-full border-pink-200 text-pink-700 hover:bg-pink-50">
                    View Favorites
                  </Button>
                  <Button variant="outline" className="w-full border-purple-200 text-purple-700 hover:bg-purple-50">
                    Redeem Rewards
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumCustomerProfile;
