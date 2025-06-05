
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Search, User, Heart, MessageSquare, Star, MapPin, Camera } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CustomerInstantActions = () => {
  const navigate = useNavigate();

  const handleBookService = () => {
    navigate("/artists");
    toast.success("Finding amazing artists for you! ✨");
  };

  const handleFindArtists = () => {
    navigate("/artists");
  };

  const handleEditProfile = () => {
    navigate("/profile/edit");
  };

  const handleViewProfile = () => {
    navigate("/profile");
  };

  const handleMessages = () => {
    toast.info("Messages feature coming soon! 💬");
  };

  const handleFavorites = () => {
    toast.info("Favorites feature coming soon! ❤️");
  };

  const quickActions = [
    {
      icon: Calendar,
      title: "Book a Service",
      description: "Find & book with top-rated artists",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
      action: handleBookService,
      featured: true
    },
    {
      icon: Search,
      title: "Find Artists",
      description: "Discover talent near you",
      color: "from-blue-500 to-indigo-500",
      bgColor: "from-blue-50 to-indigo-50",
      action: handleFindArtists
    },
    {
      icon: Camera,
      title: "Edit Profile",
      description: "Update photos & preferences",
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
      action: handleEditProfile
    },
    {
      icon: User,
      title: "View Profile",
      description: "See your public profile",
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50",
      action: handleViewProfile
    },
    {
      icon: Heart,
      title: "Favorites",
      description: "Your saved artists & salons",
      color: "from-pink-500 to-rose-500",
      bgColor: "from-pink-50 to-rose-50",
      action: handleFavorites
    },
    {
      icon: MessageSquare,
      title: "Messages",
      description: "Chat with your artists",
      color: "from-cyan-500 to-blue-500",
      bgColor: "from-cyan-50 to-blue-50",
      action: handleMessages
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">
          Quick Actions ⚡
        </h2>
        <p className="text-purple-200">
          Everything you need at your fingertips
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions.map((action, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="relative border-0 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                  onClick={action.action}>
              {action.featured && (
                <div className="absolute top-3 right-3 z-10">
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-lg">
                    <Star className="h-3 w-3 mr-1" />
                    Popular
                  </Badge>
                </div>
              )}
              
              {/* Gradient Border */}
              <div className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
              
              <CardContent className={`relative p-6 bg-gradient-to-br ${action.bgColor} group-hover:scale-[1.02] transition-transform duration-300`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${action.color} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
                  {action.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors">
                  {action.description}
                </p>
                
                {/* Hover Arrow */}
                <div className="mt-4 flex items-center text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className={`bg-gradient-to-r ${action.color} bg-clip-text text-transparent`}>
                    Get started →
                  </span>
                </div>
                
                {/* Shine Effect */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <Card className="border-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 shadow-2xl rounded-2xl overflow-hidden">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <MapPin className="h-6 w-6 text-white" />
              <h3 className="text-xl font-bold text-white">
                🎯 Ready to Transform Your Look?
              </h3>
              <MapPin className="h-6 w-6 text-white" />
            </div>
            
            <p className="text-white/90 font-medium mb-4">
              Book with verified artists in your area and get exclusive member rewards
            </p>
            
            <Button 
              onClick={handleBookService}
              className="bg-white text-purple-600 hover:bg-white/90 font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Book My Service Now 🚀
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CustomerInstantActions;
