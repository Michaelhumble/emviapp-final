
import { useEffect } from "react";
import { useAuth } from "@/context/auth";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Briefcase, Users, User } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AIDashboardWidgets from "@/components/ai/AIDashboardWidgets";
import ProfileCompletionCard from "@/components/profile/ProfileCompletionCard";
import AIAffiliateTrackingWidget from "@/components/ai/AIAffiliateTrackingWidget";

const FreelancerDashboard = () => {
  const { userProfile } = useAuth();
  const firstName = userProfile?.full_name?.split(' ')[0] || userProfile?.email?.split('@')[0] || 'Freelancer';

  useEffect(() => {
    document.title = "Freelancer Dashboard | EmviApp";
  }, []);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Layout>
      <div className="container px-4 mx-auto py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-serif mb-4">
              Hi {firstName}! Ready to level up your freelance career? 💅
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Turn passion into your path — with EmviApp.
            </p>
          </div>
          
          {/* Profile Completion Card */}
          <div className="mb-6">
            <ProfileCompletionCard />
          </div>
          
          {/* AI Dashboard Widgets */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <AIDashboardWidgets className="col-span-1 md:col-span-2" />
            <AIAffiliateTrackingWidget />
          </div>
          
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <motion.div variants={item}>
              <Card className="h-full">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-xl">Create Portfolio</CardTitle>
                  <Camera className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">Showcase your best freelance work</CardDescription>
                  <Link to="/profile/edit">
                    <Button variant="default" className="w-full">
                      Build Portfolio
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={item}>
              <Card className="h-full">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-xl">Find Freelance Gigs</CardTitle>
                  <Briefcase className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">Discover opportunities for freelancers</CardDescription>
                  <Link to="/jobs">
                    <Button variant="default" className="w-full">
                      Browse Gigs
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={item}>
              <Card className="h-full">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-xl">Connect with Salons</CardTitle>
                  <Users className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">Network with beauty businesses</CardDescription>
                  <Link to="/salons">
                    <Button variant="default" className="w-full">
                      Find Partners
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10"
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-medium mb-2">Complete Your Freelancer Profile</h3>
                <p className="text-muted-foreground">Stand out and attract more clients to your services</p>
              </div>
              <Link to="/profile/edit">
                <Button variant="outline" className="min-w-[140px]">
                  <User className="mr-2 h-4 w-4" /> Update Profile
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default FreelancerDashboard;
