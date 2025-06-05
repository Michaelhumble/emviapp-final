
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Search, Star, MapPin, Clock, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CustomerInstantActions = () => {
  const quickActions = [
    {
      icon: Calendar,
      title: "Book Now",
      description: "Find & book instantly",
      link: "/book",
      color: "from-blue-500 to-blue-600",
      hoverColor: "from-blue-600 to-blue-700"
    },
    {
      icon: Search,
      title: "Explore",
      description: "Discover new artists",
      link: "/explore",
      color: "from-purple-500 to-purple-600",
      hoverColor: "from-purple-600 to-purple-700"
    },
    {
      icon: Star,
      title: "My Reviews",
      description: "Share your experience",
      link: "/reviews",
      color: "from-yellow-500 to-orange-500",
      hoverColor: "from-yellow-600 to-orange-600"
    },
    {
      icon: Heart,
      title: "Favorites",
      description: "Your saved artists",
      link: "/favorites",
      color: "from-pink-500 to-rose-500",
      hoverColor: "from-pink-600 to-rose-600"
    }
  ];

  const recentlyViewed = [
    {
      name: "Bella Nails Studio",
      type: "Nail Salon",
      rating: 4.9,
      location: "Downtown Toronto",
      image: "/placeholder-salon.jpg"
    },
    {
      name: "Maya's Lash Extensions",
      type: "Lash Artist",
      rating: 5.0,
      location: "Yorkville",
      image: "/placeholder-artist.jpg"
    },
    {
      name: "Luxe Hair Studio",
      type: "Hair Salon",
      rating: 4.8,
      location: "King Street",
      image: "/placeholder-hair.jpg"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">
          Quick Actions ⚡
        </h2>
        <p className="text-purple-200">
          Everything you need, just one tap away
        </p>
      </div>

      {/* Quick Action Buttons */}
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
            <Link to={action.link}>
              <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-lg rounded-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${action.color} group-hover:bg-gradient-to-br group-hover:${action.hoverColor} flex items-center justify-center shadow-lg transition-all duration-300`}>
                    <action.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {action.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600">
                    {action.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recently Viewed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-600" />
                Recently Viewed
              </h3>
              
              <Link to="/history">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentlyViewed.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100 cursor-pointer hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {item.name.charAt(0)}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 text-sm">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {item.type}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="font-medium">{item.rating}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-gray-500">
                      <MapPin className="h-3 w-3" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CustomerInstantActions;
