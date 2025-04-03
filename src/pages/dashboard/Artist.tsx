
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, ImagePlus, LineChart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ArtistDashboard = () => {
  const { user } = useAuth();
  const firstName = user?.email?.split('@')[0] || 'there';
  
  useEffect(() => {
    document.title = "Artist Dashboard | EmviApp";
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
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-serif mb-4">
              Hi {firstName}! Let's find you something amazing 💅
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              You don't have to hustle alone. EmviApp is here.
            </p>
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
                  <CardTitle className="text-xl">View Job Listings</CardTitle>
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
                  <CardTitle className="text-xl">Showcase Your Profile</CardTitle>
                  <ImagePlus className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">Make your portfolio stand out</CardDescription>
                  <Link to="/profile/artist/setup">
                    <Button variant="default" className="w-full">
                      Update Portfolio
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={item}>
              <Card className="h-full">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-xl">Track Applications</CardTitle>
                  <LineChart className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">Manage your job applications</CardDescription>
                  <Button variant="default" className="w-full">
                    View Applications
                  </Button>
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
                <h3 className="text-xl font-medium mb-2">Upgrade to Premium Artist</h3>
                <p className="text-muted-foreground">Get featured in search results and access exclusive opportunities</p>
              </div>
              <Button variant="outline" className="min-w-[140px]">
                <Sparkles className="mr-2 h-4 w-4" /> Upgrade Now
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default ArtistDashboard;
