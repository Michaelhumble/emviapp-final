
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, CalendarDays, Gift, User, Heart } from "lucide-react";
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
  
  return (
    <>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <motion.div variants={item}>
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
        </motion.div>
        
        <motion.div variants={item}>
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
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">Discount Offers</CardTitle>
              <Gift className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">Exclusive beauty deals just for you</CardDescription>
              <Link to="/offers">
                <Button variant="default" className="w-full">
                  View Offers
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={item}>
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">My Preferences</CardTitle>
              <User className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">Customize your beauty preferences</CardDescription>
              <Link to="/profile/edit">
                <Button variant="default" className="w-full">
                  Update Preferences
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
