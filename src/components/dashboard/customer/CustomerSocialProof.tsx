
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, MapPin, Heart, Star, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const CustomerSocialProof = () => {
  const stats = [
    { label: "Active Users", value: "50K+", icon: Users, growth: "+15%" },
    { label: "Beauty Experts", value: "2.5K+", icon: Star, growth: "+25%" },
    { label: "Cities Covered", value: "45+", icon: MapPin, growth: "+8%" },
    { label: "Monthly Bookings", value: "12K+", icon: Heart, growth: "+32%" }
  ];

  const recentActivity = [
    { name: "Sarah M.", action: "booked a manicure", time: "2 min ago", city: "Toronto" },
    { name: "Jessica L.", action: "left a 5-star review", time: "5 min ago", city: "Vancouver" },
    { name: "Maya P.", action: "joined EmviApp", time: "8 min ago", city: "Montreal" },
    { name: "Amanda K.", action: "referred 3 friends", time: "12 min ago", city: "Calgary" }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">
          Join Thousands of Happy Customers 🎉
        </h2>
        <p className="text-purple-200">
          See what's happening in the EmviApp community right now
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-lg rounded-xl hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {stat.value}
                </div>
                
                <div className="text-xs text-gray-600 mb-2">
                  {stat.label}
                </div>
                
                <Badge className="bg-green-100 text-green-700 text-xs">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.growth}
                </Badge>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Live Activity Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <h3 className="text-lg font-bold text-gray-800">
                Live Activity Feed
              </h3>
              <Badge className="bg-red-100 text-red-700 text-xs">
                LIVE
              </Badge>
            </div>
            
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {activity.name.charAt(0)}
                      </span>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-800">
                        <span className="font-semibold">{activity.name}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">
                        {activity.city} • {activity.time}
                      </p>
                    </div>
                  </div>
                  
                  <MessageCircle className="h-4 w-4 text-purple-400" />
                </motion.div>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-purple-600">247 people</span> joined EmviApp today! 🚀
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CustomerSocialProof;
