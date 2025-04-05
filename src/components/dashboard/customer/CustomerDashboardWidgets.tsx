
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, CalendarDays, Gift, User, Heart, MapPin, SparkleIcon, Star, Zap, Ticket, BellRing } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import UserActionButtons from "../common/UserActionButtons";
import { useAuth } from "@/context/auth";

const CustomerDashboardWidgets = () => {
  const { userProfile } = useAuth();
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  // Mock nearby salons - would come from a real API
  const nearbySalons = [
    { id: 1, name: "Glow Beauty Salon", distance: "0.8 miles", rating: 4.8, offer: "20% off first visit" },
    { id: 2, name: "Nail Paradise", distance: "1.2 miles", rating: 4.7, offer: "Free nail art with manicure" },
    { id: 3, name: "Elite Nails", distance: "1.5 miles", rating: 4.9, offer: "$10 off pedicure" }
  ];
  
  return (
    <>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Welcome Banner */}
        <motion.div variants={item}>
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-100">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <h3 className="text-lg font-medium text-purple-900 flex items-center gap-2 mb-2">
                    <Gift className="h-5 w-5 text-purple-500" />
                    Welcome, {userProfile?.full_name?.split(' ')[0] || 'there'}!
                  </h3>
                  <p className="text-purple-700 max-w-md">
                    Discover beauty services, exclusive offers, and connect with top nail artists near you.
                  </p>
                </div>
                <div className="flex items-center">
                  <Button asChild className="bg-purple-600 hover:bg-purple-700">
                    <Link to="/offers/nearby">Explore Special Offers</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Featured Nearby Salons */}
        <motion.div variants={item}>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-500" />
              Special Offers Near You
            </h3>
            <Button variant="link" size="sm" className="text-primary" asChild>
              <Link to="/offers/all">View All</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {nearbySalons.map(salon => (
              <Card key={salon.id} className="hover:shadow-md transition-shadow border-amber-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{salon.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {salon.distance}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="flex items-center text-amber-500 mb-2">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current opacity-50" />
                    <span className="ml-1 text-sm text-gray-600">{salon.rating}</span>
                  </div>
                  <div className="bg-amber-50 text-amber-800 px-3 py-2 rounded-md flex items-center gap-2 mb-3">
                    <Ticket className="h-4 w-4 text-amber-500" />
                    <p className="text-xs font-medium">{salon.offer}</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to={`/salon/${salon.id}`}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">Book Services</CardTitle>
              <CalendarDays className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">Find and book top beauty professionals</CardDescription>
              <Link to="/services">
                <Button variant="default" className="w-full">
                  Browse Services
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">Discover Artists</CardTitle>
              <Search className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">Explore beauty artists near you</CardDescription>
              <Link to="/artists">
                <Button variant="default" className="w-full">
                  Find Artists
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={item}>
          <Card className="bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <BellRing className="h-5 w-5 text-primary" />
                Stay Updated
              </CardTitle>
              <CardDescription>
                Get notified when your favorite salons add new offers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-md">
                  <Button size="sm" variant="outline" asChild>
                    <Link to="/preferences">Set Preferences</Link>
                  </Button>
                  <span className="text-sm text-gray-600">Customize your notifications</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-md">
                  <Button size="sm" variant="outline" asChild>
                    <Link to="/favorites">Favorite Salons</Link>
                  </Button>
                  <span className="text-sm text-gray-600">Track your favorite places</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={item} className="md:col-span-2">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">Invite & Earn</CardTitle>
              <Heart className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">Share EmviApp with friends and earn rewards</CardDescription>
              <UserActionButtons />
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </>
  );
};

export default CustomerDashboardWidgets;
