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
import CustomerLoyaltyTracker from "@/components/customer/CustomerLoyaltyTracker";
import CustomerInbox from "./messages/CustomerInbox";
import CustomerWallet from "@/components/customer/CustomerWallet";
import RecommendedServicesSection from "./services/RecommendedServicesSection";
import BookAgainSection from "./services/BookAgainSection";
import CustomerPendingReviewsSection from "./reviews/CustomerPendingReviewsSection";

const CustomerDashboard = () => {
  const { user, userRole } = useAuth();
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
    <div className="py-8 md:py-12 bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <div className="container px-2 sm:px-4 mx-auto">
        
        <motion.div 
          className="text-center mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif mb-3 md:mb-4" style={{ fontSize: 'clamp(1.25rem, 5vw, 2.2rem)' }}>
            {isLoggedIn ? "Your Beauty Benefits" : "Discover Beauty Benefits"}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            {isLoggedIn 
              ? "Exclusive discounts, beauty tips, and offers just for you." 
              : "Sign up to unlock exclusive discounts, beauty tips, and special offers."}
          </p>
        </motion.div>
        
        {isLoggedIn && userRole === "customer" && <CustomerLoyaltyTracker />}

        {/* Book Again Section (Single row, stacked on mobile) */}
        {isLoggedIn && (
          <div className="max-w-full md:max-w-5xl mx-auto mb-6 md:mb-10 px-0 sm:px-2">
            <BookAgainSection />
          </div>
        )}

        {/* Recommended Services Section */}
        {isLoggedIn && (
          <div className="max-w-full md:max-w-5xl mx-auto mb-6 md:mb-10 px-0 sm:px-2">
            <RecommendedServicesSection />
          </div>
        )}

        {/* AI Components for logged in users */}
        {isLoggedIn && (
          <div className="max-w-full md:max-w-3xl mx-auto mb-6 md:mb-10 space-y-4 px-0 sm:px-2">
            <AISmartReminder />
            <AIWelcomeAssistant />
          </div>
        )}

        {/* ==== NEARBY OFFERS SECTION START ==== */}
        {isLoggedIn && (
          <React.Suspense fallback={null}>
            {/* Place offers below AI banner but above primary cards */}
            <div className="mb-6 md:mb-10">
              <NearbyOffersSection />
            </div>
          </React.Suspense>
        )}

        {/* ==== SUGGESTED SERVICES SECTION START ==== */}
        {isLoggedIn && (
          <div className="mb-8 md:mb-12">
            <SuggestedServicesSection />
          </div>
        )}

        {/* ==== MESSAGES SECTION ==== */}
        {isLoggedIn && (
          <div className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-bold font-serif mb-2" style={{ fontSize: 'clamp(1.15rem, 4vw, 1.7rem)' }}>Your Messages</h2>
            <CustomerInbox />
          </div>
        )}

        {/* ==== EMVI WALLET SECTION ==== */}
        {isLoggedIn && (
          <div className="mb-6 md:mb-8">
            <CustomerWallet />
          </div>
        )}

        {/* New: Show Rate Your Experience section if logged in */}
        {isLoggedIn && (
          <div className="max-w-full md:max-w-2xl mx-auto mb-6 md:mb-10 px-0 sm:px-2">
            <CustomerPendingReviewsSection />
          </div>
        )}

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-10 md:mb-12"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <Card className="h-full hover:shadow-md transition-all">
              <CardHeader>
                <CardTitle className="flex items-center text-base md:text-lg">
                  <Gift className="mr-2 h-5 w-5 text-primary" /> 
                  Exclusive Discounts
                </CardTitle>
                <CardDescription>Save on premium beauty services</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-sm md:text-base">
                  {isLoggedIn 
                    ? "Get 20% off your first booking at partner salons this month!" 
                    : "Members get up to 30% off premium beauty services across our network."}
                </p>
              </CardContent>
              <CardFooter>
                {!isLoggedIn && (
                  <div className="w-full flex flex-col xs:flex-row items-center justify-between text-sm text-primary/80 gap-3">
                    <div className="flex items-center">
                      <Lock className="h-3 w-3 mr-1" />
                      <span>Unlock Full Access with a Free Account</span>
                    </div>
                    <Link to="/auth/signup">
                      <Button variant="ghost" size="sm" className="w-full min-h-[44px]">Sign Up</Button>
                    </Link>
                  </div>
                )}
                {isLoggedIn && (
                  <Link to="/checkout" className="w-full">
                    <Button variant="outline" size="sm" className="w-full min-h-[44px]">
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
                <CardTitle className="flex items-center text-base md:text-lg">
                  <Lightbulb className="mr-2 h-5 w-5 text-primary" /> 
                  Beauty Tips & Guides
                </CardTitle>
                <CardDescription>Expert advice for your beauty routine</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-sm md:text-base">
                  {isLoggedIn 
                    ? "Personalized recommendations based on your profile preferences." 
                    : "Our experts share insider tips for maintaining your beauty routines."}
                </p>
              </CardContent>
              <CardFooter>
                {isLoggedIn && (
                  <div className="w-full flex flex-col xs:flex-row items-center justify-between text-sm text-primary/80 gap-3">
                    <div className="flex items-center">
                      <Sparkles className="h-3 w-3 mr-1" />
                      <span>Upgrade to Pro for personalized consultations</span>
                    </div>
                    <Button variant="ghost" size="sm" className="w-full min-h-[44px]">Upgrade</Button>
                  </div>
                )}
                {!isLoggedIn && (
                  <div className="w-full flex flex-col xs:flex-row items-center justify-between text-sm text-primary/80 gap-3">
                    <div className="flex items-center">
                      <Lock className="h-3 w-3 mr-1" />
                      <span>Unlock Full Access with a Free Account</span>
                    </div>
                    <Link to="/auth/signup">
                      <Button variant="ghost" size="sm" className="w-full min-h-[44px]">Sign Up</Button>
                    </Link>
                  </div>
                )}
              </CardFooter>
            </Card>
          </motion.div>
          
          <motion.div variants={item}>
            <Card className="h-full hover:shadow-md transition-all relative overflow-hidden">
              {!isLoggedIn && (
                <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px] flex items-center justify-center z-10 px-2">
                  <div className="bg-white/90 px-4 sm:px-6 py-4 rounded-lg shadow-lg text-center">
                    <Lock className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <h3 className="font-medium mb-2 text-base">Premium Content</h3>
                    <p className="text-sm text-gray-500 mb-3">Sign up to unlock exclusive member content</p>
                    <Link to="/auth/signup">
                      <Button size="sm" className="min-h-[44px]">Create Free Account</Button>
                    </Link>
                  </div>
                </div>
              )}
              <CardHeader>
                <CardTitle className="flex items-center text-base md:text-lg">
                  <TrendingUp className="mr-2 h-5 w-5 text-primary" /> 
                  Trending Styles
                </CardTitle>
                <CardDescription>Stay ahead with latest beauty trends</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-sm md:text-base">
                  Discover what's trending in the beauty world and stay ahead of the curve.
                </p>
              </CardContent>
              <CardFooter>
                <Link to={isLoggedIn ? "/analysis" : "/auth/signup"} className="w-full">
                  <Button variant="outline" size="sm" className="w-full min-h-[44px]">
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
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.1rem)' }}>
              <Sparkles className="h-4 w-4 mr-2" />
              <span className="font-medium">Upgrade to Pro for premium features and dedicated support</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
