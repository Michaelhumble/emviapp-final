
import { useEffect } from "react";
import { useAuth } from "@/context/auth";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Compass, Lightbulb, HelpCircle, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useRoleSelection } from "@/hooks/useRoleSelection";
import AISmartReminder from "@/components/ai/AISmartReminder";
import AIWelcomeAssistant from "@/components/ai/AIWelcomeAssistant";

const OtherDashboard = () => {
  const { user } = useAuth();
  const firstName = user?.email?.split('@')[0] || 'there';
  const { setIsRoleModalOpen } = useRoleSelection();
  
  useEffect(() => {
    document.title = "Welcome to EmviApp";
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
              Welcome to EmviApp, {firstName}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tell us more so we can guide your journey
            </p>
          </div>
          
          {/* AI Dashboard Widgets - only a few for "Other" role */}
          <div className="space-y-6 mb-12">
            <AISmartReminder />
            <AIWelcomeAssistant />
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
                  <CardTitle className="text-xl">Choose Your Role</CardTitle>
                  <Compass className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">Select how you'd like to use EmviApp</CardDescription>
                  <Button 
                    variant="default" 
                    className="w-full mb-4"
                    onClick={() => setIsRoleModalOpen(true)}
                  >
                    <UserPlus className="mr-2 h-4 w-4" /> Choose a Role
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Personalize your experience by selecting the role that fits you best
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={item}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-xl">Learn How EmviApp Works</CardTitle>
                  <Lightbulb className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">Discover all the features and benefits</CardDescription>
                  <div className="space-y-2">
                    <p className="text-sm">• Connect with beauty professionals</p>
                    <p className="text-sm">• Find job opportunities or great hires</p>
                    <p className="text-sm">• Access premium beauty services</p>
                    <Link to="/analysis">
                      <Button variant="ghost" size="sm" className="mt-2 w-full justify-start">
                        Learn More About EmviApp
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={item} className="md:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-xl">Need Help?</CardTitle>
                  <HelpCircle className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">Have questions about EmviApp?</CardDescription>
                  <div className="text-center py-4">
                    <p className="text-muted-foreground mb-4">
                      Our team is ready to help you navigate the platform and get the most out of your experience
                    </p>
                    <Button variant="outline">Contact Support</Button>
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

export default OtherDashboard;
