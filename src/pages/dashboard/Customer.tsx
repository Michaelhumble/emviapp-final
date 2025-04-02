
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Calendar, Bell, Settings } from "lucide-react";
import { motion } from "framer-motion";

const CustomerDashboard = () => {
  const { user } = useAuth();
  const firstName = user?.email?.split('@')[0] || 'there';
  
  useEffect(() => {
    document.title = "Customer Dashboard | EmviApp";
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
              Hi {firstName}! Let's help you get the most out of EmviApp as a Customer 💅
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover beauty services, book appointments, and enjoy exclusive discounts.
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
                  <CardTitle className="text-xl">Upcoming Appointments</CardTitle>
                  <Calendar className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">Your scheduled beauty services</CardDescription>
                  <div className="text-center py-8 border border-dashed rounded-md">
                    <p className="text-muted-foreground">No appointments yet</p>
                    <Button variant="link" className="mt-2">Book your first appointment</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={item}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-xl">Special Offers</CardTitle>
                  <Gift className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">Exclusive discounts just for you</CardDescription>
                  <div className="space-y-4">
                    <div className="p-3 bg-primary/10 rounded-md">
                      <p className="font-medium">20% off your first booking</p>
                      <p className="text-sm text-muted-foreground">Valid for 30 days</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-md">
                      <p className="font-medium">Free consultation with top stylists</p>
                      <p className="text-sm text-muted-foreground">Book now through the app</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={item}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-xl">Beauty Tips</CardTitle>
                  <Bell className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">Personalized recommendations</CardDescription>
                  <div className="space-y-2">
                    <p className="text-sm">• How to prepare for your salon appointment</p>
                    <p className="text-sm">• Summer hair care essentials</p>
                    <p className="text-sm">• Trending nail designs for this season</p>
                    <Button variant="ghost" size="sm" className="mt-2 w-full justify-start">
                      View all beauty tips
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={item}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-xl">Account Settings</CardTitle>
                  <Settings className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">Manage your preferences</CardDescription>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">Update Profile</Button>
                    <Button variant="outline" className="w-full justify-start">Notification Settings</Button>
                    <Button variant="outline" className="w-full justify-start">Payment Methods</Button>
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

export default CustomerDashboard;
