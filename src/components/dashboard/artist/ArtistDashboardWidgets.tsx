
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Heart, ImagePlus, User, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import UserActionButtons from "../common/UserActionButtons";

const ArtistDashboardWidgets = () => {
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
              <CardTitle className="text-xl">New Job Matches</CardTitle>
              <Briefcase className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">Find your next opportunity</CardDescription>
              <Link to="/jobs">
                <Button variant="default" className="w-full">
                  Browse Jobs
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={item}>
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">Booth Rental Listings</CardTitle>
              <User className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">Find a booth to rent in top salons</CardDescription>
              <Link to="/booths">
                <Button variant="default" className="w-full">
                  Browse Booths
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={item}>
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">Upgrade to Premium</CardTitle>
              <Sparkles className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">Get featured in search results and unlock exclusive features</CardDescription>
              <Link to="/checkout?plan=premium">
                <Button variant="default" className="w-full">
                  Upgrade Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={item}>
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">My Profile</CardTitle>
              <ImagePlus className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">Customize your professional portfolio</CardDescription>
              <Link to="/profile/edit">
                <Button variant="default" className="w-full">
                  Edit Profile
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={item} className="md:col-span-2">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">Affiliate Earnings</CardTitle>
              <Heart className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">Share EmviApp and earn rewards for each friend who joins</CardDescription>
              <UserActionButtons />
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </>
  );
};

export default ArtistDashboardWidgets;
