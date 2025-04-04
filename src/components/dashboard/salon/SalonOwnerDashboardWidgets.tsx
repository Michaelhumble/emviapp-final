
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, User, Store, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import UserActionButtons from "../common/UserActionButtons";

const SalonOwnerDashboardWidgets = () => {
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
              <CardTitle className="text-xl">Hire an Artist</CardTitle>
              <Users className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">Find talented beauty professionals</CardDescription>
              <Link to="/artists">
                <Button variant="default" className="w-full">
                  Browse Artists
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={item}>
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">Post a Job or Booth</CardTitle>
              <Briefcase className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">Create job listings or booth rentals</CardDescription>
              <Link to="/post-job">
                <Button variant="default" className="w-full">
                  Create Listing
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={item}>
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">Your Applicants</CardTitle>
              <User className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">Review candidates for your positions</CardDescription>
              <Link to="/manage-jobs">
                <Button variant="default" className="w-full">
                  Check Applications
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={item}>
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">Your Profile</CardTitle>
              <Store className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">Manage your salon information</CardDescription>
              <Link to="/profile/edit">
                <Button variant="default" className="w-full">
                  Edit Salon Profile
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={item} className="md:col-span-2">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">Affiliate Referrals</CardTitle>
              <Heart className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">Refer other salon owners and beauty professionals to earn rewards</CardDescription>
              <UserActionButtons />
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </>
  );
};

export default SalonOwnerDashboardWidgets;
