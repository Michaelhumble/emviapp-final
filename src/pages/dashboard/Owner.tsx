
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Store, Users2, LineChart, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const OwnerDashboard = () => {
  const { user } = useAuth();
  const firstName = user?.email?.split('@')[0] || 'there';
  
  useEffect(() => {
    document.title = "Salon Owner Dashboard | EmviApp";
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
              Hi {firstName}! Let's help you get the most out of EmviApp as a Salon Owner 💅
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Manage your salon, recruit talented artists, and grow your business.
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
                  <CardTitle className="text-xl">Salon Profile</CardTitle>
                  <Store className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">Showcase your salon to potential clients</CardDescription>
                  <div className="text-center py-8 border border-dashed rounded-md">
                    <p className="text-muted-foreground">Complete your salon profile</p>
                    <Button variant="secondary" className="mt-2">Add Salon Details</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={item}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-xl">Team Management</CardTitle>
                  <Users2 className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">Manage your salon staff</CardDescription>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">View Current Team</Button>
                    <Button variant="outline" className="w-full justify-start">Post Job Openings</Button>
                    <Button variant="outline" className="w-full justify-start">Browse Artist Profiles</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={item}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-xl">Business Analytics</CardTitle>
                  <LineChart className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">Track your salon's performance</CardDescription>
                  <div className="space-y-2">
                    <p className="text-sm">• Customer retention metrics</p>
                    <p className="text-sm">• Service popularity insights</p>
                    <p className="text-sm">• Revenue and growth tracking</p>
                    <Button variant="ghost" size="sm" className="mt-2 w-full justify-start">
                      View Analytics Dashboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={item}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-xl">Appointment Calendar</CardTitle>
                  <Calendar className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">Manage your salon's schedule</CardDescription>
                  <div className="text-center py-8 border border-dashed rounded-md">
                    <p className="text-muted-foreground">Set up your booking system</p>
                    <Button variant="secondary" className="mt-2">Configure Calendar</Button>
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

export default OwnerDashboard;
