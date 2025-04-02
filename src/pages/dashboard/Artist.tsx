
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BriefcaseBusiness, Users, ImagePlus, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

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
              Hi {firstName}! Let's help you get the most out of EmviApp as an Artist 💅
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Showcase your work, connect with clients, and grow your beauty career.
            </p>
          </div>
          
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <motion.div variants={item}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-xl">Job Opportunities</CardTitle>
                  <BriefcaseBusiness className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">Available positions matching your skills</CardDescription>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-md">
                      <p className="font-medium">Senior Hair Stylist</p>
                      <p className="text-sm text-muted-foreground mb-2">Luxe Salon • 2 miles away</p>
                      <Button size="sm" variant="outline">View Details</Button>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="font-medium">Makeup Artist (Contract)</p>
                      <p className="text-sm text-muted-foreground mb-2">Beauty Co • Remote</p>
                      <Button size="sm" variant="outline">View Details</Button>
                    </div>
                    <Button variant="ghost" size="sm" className="w-full">Browse All Jobs</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={item}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-xl">Portfolio</CardTitle>
                  <ImagePlus className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">Showcase your best work</CardDescription>
                  <div className="text-center py-8 border border-dashed rounded-md">
                    <p className="text-muted-foreground">Start building your portfolio</p>
                    <Button variant="secondary" className="mt-2">Upload Photos</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={item}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-xl">Network</CardTitle>
                  <Users className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">Connect with salons and other artists</CardDescription>
                  <div className="space-y-2">
                    <p className="text-sm">• Find mentors in your specialty</p>
                    <p className="text-sm">• Join beauty professional groups</p>
                    <p className="text-sm">• Connect with salon owners looking to hire</p>
                    <Button variant="ghost" size="sm" className="mt-2 w-full justify-start">
                      Explore Network
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={item}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-xl">Skills Development</CardTitle>
                  <Lightbulb className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">Grow your professional abilities</CardDescription>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">Browse Workshops</Button>
                    <Button variant="outline" className="w-full justify-start">Online Courses</Button>
                    <Button variant="outline" className="w-full justify-start">Certification Programs</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default ArtistDashboard;
