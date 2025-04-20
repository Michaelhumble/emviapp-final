import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { Sparkles, Lock, TrendingUp, Gift, Lightbulb } from "lucide-react";
import AIWelcomeAssistant from "@/components/ai/AIWelcomeAssistant";
import AISmartReminder from "@/components/ai/AISmartReminder";
import React from "react";
import NearbyOffersSection from "./offers/NearbyOffersSection";
import SuggestedServicesSection from "./services/SuggestedServicesSection";
import CustomerInbox from "./messages/CustomerInbox";

const CustomerDashboard = () => {
  const { user } = useAuth();
  const isLoggedIn = !!user;
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 mx-auto">
        
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
            {isLoggedIn ? "Your Beauty Benefits" : "Discover Beauty Benefits"}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {isLoggedIn 
              ? "Exclusive discounts, beauty tips, and offers just for you." 
              : "Sign up to unlock exclusive discounts, beauty tips, and special offers."}
          </p>
        </motion.div>
        
        {/* AI Components for logged in users */}
        {isLoggedIn && (
          <div className="max-w-3xl mx-auto mb-10 space-y-4">
            <AISmartReminder />
            <AIWelcomeAssistant />
          </div>
        )}

        {/* ==== NEARBY OFFERS SECTION START ==== */}
        {isLoggedIn && (
          <React.Suspense fallback={null}>
            {/* Place offers below AI banner but above primary cards */}
            <div className="mb-10">
              <NearbyOffersSection />
            </div>
          </React.Suspense>
        )}
        {/* ==== NEARBY OFFERS SECTION END ==== */}

        {/* ==== SUGGESTED SERVICES SECTION START ==== */}
        {isLoggedIn && (
          <div className="mb-12">
            <SuggestedServicesSection />
          </div>
        )}
        {/* ==== SUGGESTED SERVICES SECTION END ==== */}

        {/* ==== MESSAGES SECTION ==== */}
        {isLoggedIn && (
          <div className="mb-12">
            <h2 className="text-xl font-bold font-serif mb-2">Your Messages</h2>
            <CustomerInbox />
          </div>
        )}

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <Card className="h-full hover:shadow-md transition-all">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Gift className="mr-2 h-5 w-5 text-primary" /> 
                  Exclusive Discounts
                </CardTitle>
                <CardDescription>Save on premium beauty services</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  {isLoggedIn 
                    ? "Get 20% off your first booking at partner salons this month!" 
                    : "Members get up to 30% off premium beauty services across our network."}
                </p>
              </CardContent>
              <CardFooter>
                {!isLoggedIn && (
                  <div className="w-full flex items-center justify-between text-sm text-primary/80">
                    <div className="flex items-center">
                      <Lock className="h-3 w-3 mr-1" />
                      <span>Unlock Full Access with a Free Account</span>
                    </div>
                    <Link to="/auth/signup">
                      <Button variant="ghost" size="sm">Sign Up</Button>
                    </Link>
                  </div>
                )}
                {isLoggedIn && (
                  <Link to="/checkout" className="w-full">
                    <Button variant="outline" size="sm" className="w-full">
                      View Offers
                    </Button>
                  </Link>
                )}
              </CardFooter>
            </Card>
          </motion.div>
          
          <motion.div variants={item}>
            <Card className="h-full hover:shadow-md transition-all">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="mr-2 h-5 w-5 text-primary" /> 
                  Beauty Tips & Guides
                </CardTitle>
                <CardDescription>Expert advice for your beauty routine</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  {isLoggedIn 
                    ? "Personalized recommendations based on your profile preferences." 
                    : "Our experts share insider tips for maintaining your beauty routines."}
                </p>
              </CardContent>
              <CardFooter>
                {isLoggedIn && (
                  <div className="w-full flex items-center justify-between text-sm text-primary/80">
                    <div className="flex items-center">
                      <Sparkles className="h-3 w-3 mr-1" />
                      <span>Upgrade to Pro for personalized consultations</span>
                    </div>
                    <Button variant="ghost" size="sm">Upgrade</Button>
                  </div>
                )}
                {!isLoggedIn && (
                  <div className="w-full flex items-center justify-between text-sm text-primary/80">
                    <div className="flex items-center">
                      <Lock className="h-3 w-3 mr-1" />
                      <span>Unlock Full Access with a Free Account</span>
                    </div>
                    <Link to="/auth/signup">
                      <Button variant="ghost" size="sm">Sign Up</Button>
                    </Link>
                  </div>
                )}
              </CardFooter>
            </Card>
          </motion.div>
          
          <motion.div variants={item}>
            <Card className="h-full hover:shadow-md transition-all relative overflow-hidden">
              {!isLoggedIn && (
                <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px] flex items-center justify-center z-10">
                  <div className="bg-white/90 px-6 py-4 rounded-lg shadow-lg text-center">
                    <Lock className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <h3 className="font-medium mb-2">Premium Content</h3>
                    <p className="text-sm text-gray-500 mb-3">Sign up to unlock exclusive member content</p>
                    <Link to="/auth/signup">
                      <Button size="sm">Create Free Account</Button>
                    </Link>
                  </div>
                </div>
              )}
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-primary" /> 
                  Trending Styles
                </CardTitle>
                <CardDescription>Stay ahead with latest beauty trends</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Discover what's trending in the beauty world and stay ahead of the curve.
                </p>
              </CardContent>
              <CardFooter>
                <Link to={isLoggedIn ? "/analysis" : "/auth/signup"} className="w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    {isLoggedIn ? "View Trends" : "Sign Up to View"}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
        
        {isLoggedIn && (
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary">
              <Sparkles className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Upgrade to Pro for premium features and dedicated support</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
