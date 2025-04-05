
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, CalendarDays, Gift, User, Heart, MapPin, SparkleIcon, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import UserActionButtons from "../common/UserActionButtons";

const CustomerDashboardWidgets = () => {
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
    { id: 1, name: "Glow Beauty Salon", distance: "0.8 miles", rating: 4.8 },
    { id: 2, name: "Nail Paradise", distance: "1.2 miles", rating: 4.7 },
    { id: 3, name: "Elite Nails", distance: "1.5 miles", rating: 4.9 }
  ];
  
  return (
    <>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Nearby Offers Banner */}
        <motion.div variants={item}>
          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-100">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <h3 className="text-lg font-medium text-indigo-900 flex items-center gap-2 mb-2">
                    <MapPin className="h-5 w-5 text-indigo-500" />
                    Nearby Special Offers
                  </h3>
                  <p className="text-indigo-700 max-w-md">
                    Discover exclusive deals and offers from premium salons in your area, personalized just for you.
                  </p>
                </div>
                <div className="flex items-center">
                  <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
                    <Link to="/offers/nearby">Explore All Offers</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Featured Nearby Salons */}
        <motion.div variants={item}>
          <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
            <Star className="h-5 w-5 text-amber-500" />
            Featured Salons Near You
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {nearbySalons.map(salon => (
              <Card key={salon.id} className="hover:shadow-md transition-shadow">
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
                  <p className="text-xs text-emerald-600 font-medium mb-3">
                    <SparkleIcon className="h-3 w-3 inline-block mr-1" /> Special offer available
                  </p>
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
