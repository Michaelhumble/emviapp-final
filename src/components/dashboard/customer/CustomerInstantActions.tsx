
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, Search, Heart, MapPin, Gift, Sparkles, 
  Star, Clock, TrendingUp, Zap, ArrowRight, Crown
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const CustomerInstantActions = () => {
  const quickActions = [
    {
      title: "Book Now",
      description: "Find & book your next beauty appointment",
      icon: Calendar,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      action: () => toast.success("Opening booking calendar...")
    },
    {
      title: "Discover Artists",
      description: "Explore top-rated beauty professionals",
      icon: Search,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
      action: () => toast.success("Searching for artists near you...")
    },
    {
      title: "My Favorites",
      description: "View your saved artists & salons",
      icon: Heart,
      color: "from-pink-500 to-pink-600",
      bgColor: "from-pink-50 to-pink-100",
      action: () => toast.success("Loading your favorites...")
    },
    {
      title: "Nearby Deals",
      description: "Exclusive offers in your area",
      icon: MapPin,
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
      action: () => toast.success("Finding deals near you...")
    }
  ];

  const trendingServices = [
    { name: "Gel Manicure", bookings: "+127%", price: "from $45", trending: true },
    { name: "Lash Extensions", bookings: "+89%", price: "from $120", trending: true },
    { name: "Facial Treatment", bookings: "+76%", price: "from $80", trending: false },
    { name: "Hair Styling", bookings: "+65%", price: "from $85", trending: false }
  ];

  const urgentOffers = [
    {
      title: "Flash Sale: 40% Off",
      subtitle: "Premium nail services",
      timeLeft: "2h 15m left",
      originalPrice: "$80",
      salePrice: "$48",
      badge: "HOT DEAL"
    },
    {
      title: "VIP Early Access",
      subtitle: "New luxury spa opening",
      timeLeft: "Members only",
      originalPrice: "$150",
      salePrice: "$99",
      badge: "EXCLUSIVE"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card 
              className="border-0 shadow-lg rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300"
              onClick={action.action}
            >
              <CardContent className={`p-6 bg-gradient-to-br ${action.bgColor} text-center`}>
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg`}>
                  <action.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{action.title}</h3>
                <p className="text-gray-600 text-sm">{action.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Trending Services */}
      <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-red-500" />
              🔥 Trending Now
            </h3>
            <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0">
              <Zap className="h-3 w-3 mr-1" />
              LIVE
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trendingServices.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-purple-200 transition-all"
              >
                <div className="flex items-center gap-3">
                  {service.trending && (
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  )}
                  <div>
                    <h4 className="font-semibold text-gray-800">{service.name}</h4>
                    <p className="text-gray-600 text-sm">{service.price}</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 border-0 font-semibold">
                  {service.bookings}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Urgent Offers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {urgentOffers.map((offer, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="border-0 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-6 text-white">
                <div className="flex items-start justify-between mb-4">
                  <Badge className="bg-white/20 text-white border-0 font-bold">
                    {offer.badge}
                  </Badge>
                  <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1">
                    <Clock className="h-3 w-3" />
                    <span className="text-xs font-semibold">{offer.timeLeft}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                <p className="text-white/90 mb-4">{offer.subtitle}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-white/70 line-through text-lg">{offer.originalPrice}</span>
                    <span className="text-2xl font-bold">{offer.salePrice}</span>
                  </div>
                  <Button 
                    className="bg-white text-orange-600 hover:bg-white/90 border-0 font-bold"
                    onClick={() => toast.success("Booking this amazing deal!")}
                  >
                    Book Now
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* VIP Access Teaser */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="border-0 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 shadow-2xl rounded-2xl overflow-hidden">
          <CardContent className="p-8 text-center text-white">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <Crown className="h-12 w-12 text-yellow-400" />
            </motion.div>
            
            <h3 className="text-2xl font-bold mb-3">Unlock VIP Diamond Status</h3>
            <p className="text-white/80 mb-6 max-w-md mx-auto">
              Get exclusive access to celebrity stylists, private events, and luxury perks worth $500+
            </p>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="text-center">
                <div className="text-xl font-bold text-yellow-400">✨ Premium Access</div>
                <div className="text-white/70 text-sm">Celebrity artists</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-pink-400">🎭 VIP Events</div>
                <div className="text-white/70 text-sm">Exclusive parties</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-blue-400">💎 Luxury Perks</div>
                <div className="text-white/70 text-sm">Premium rewards</div>
              </div>
            </div>
            
            <Button 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-orange-900 hover:from-yellow-500 hover:to-orange-600 border-0 font-bold text-lg px-8 py-3"
              onClick={() => toast.success("Upgrading to VIP Diamond...")}
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Upgrade Now - Only $29/month
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CustomerInstantActions;
