import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import FoundersEarlyAccess from "@/components/pricing/FoundersEarlyAccess";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Timer, Star, Sparkles, Gift, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";

const soloFeatures = [
  "Perfect for independent artists",
  "Full booking calendar",
  "Client management tools",
  "Portfolio showcase",
  "Direct messaging",
  "AI matching with clients",
  "Visibility in search results",
  "Referral dashboard"
];

const smallSalonFeatures = [
  "Up to 5 artists",
  "Team management",
  "Advanced analytics",
  "Priority support",
  "Custom branding",
  "Advanced reports",
  "AI matching with clients",
  "Visibility in search results",
  "Referral dashboard"
];

const mediumSalonFeatures = [
  "Up to 10 artists",
  "Advanced reports",
  "Multi-location support",
  "Training resources",
  "API access",
  "Premium search placement",
  "AI matching with clients",
  "Visibility in search results",
  "Referral dashboard"
];

const unlimitedSalonFeatures = [
  "Unlimited artists",
  "Enterprise support",
  "Custom integrations",
  "White-label options",
  "Dedicated account manager",
  "Premium search placement",
  "AI matching with clients",
  "Visibility in search results",
  "Referral dashboard"
];

const getYearlyPrice = (monthlyPrice: number) => {
  const yearlyDiscount = 0.15;
  const yearlyPrice = monthlyPrice * 12 * (1 - yearlyDiscount);
  return yearlyPrice.toFixed(2);
};

const PricingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const handleSubscribe = (plan: string) => {
    if (user) {
      navigate(`/checkout?plan=${plan}&cycle=${billingCycle}`);
    } else {
      navigate(`/auth/signin?redirect=/pricing&plan=${plan}&cycle=${billingCycle}`);
    }
  };

  const pricingPlans = [
    {
      name: "Solo Artist",
      monthlyPrice: 49.95,
      features: soloFeatures,
      recommended: false,
      limit: "1 artist"
    },
    {
      name: "Small Salon",
      monthlyPrice: 99,
      features: smallSalonFeatures,
      recommended: true,
      limit: "Up to 5 artists"
    },
    {
      name: "Medium Salon",
      monthlyPrice: 175,
      features: mediumSalonFeatures,
      recommended: false,
      limit: "Up to 10 artists"
    },
    {
      name: "Unlimited Salon",
      monthlyPrice: 199.95,
      features: unlimitedSalonFeatures,
      recommended: false,
      limit: "Unlimited artists"
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <FoundersEarlyAccess />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Perfect Plan</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Exclusive early access pricing — Join now and lock in these rates
          </p>
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full">
            <Timer className="h-5 w-5" />
            <span className="font-medium">Early-access pricing ends soon!</span>
          </div>
        </div>

        <div className="flex justify-center mb-10">
          <Tabs
            defaultValue="monthly"
            value={billingCycle}
            onValueChange={(value) => setBillingCycle(value as "monthly" | "yearly")}
            className="w-full max-w-md"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">
                Yearly
                <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-200">Save 15%</Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
        >
          {pricingPlans.map((plan) => (
            <Card key={plan.name} className={`relative flex flex-col ${
              plan.recommended ? 'border-primary shadow-lg' : ''
            }`}>
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    <Star className="h-3 w-3 mr-1" fill="currentColor" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="flex flex-col items-center">
                  <span className="text-xl mb-2">{plan.name}</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">
                      ${billingCycle === "monthly" ? plan.monthlyPrice : (parseFloat(getYearlyPrice(plan.monthlyPrice)) / 12).toFixed(2)}
                    </span>
                    <span className="text-sm text-muted-foreground">/mo</span>
                  </div>
                  {billingCycle === "yearly" && (
                    <span className="text-xs text-green-600 mt-1">
                      Billed ${getYearlyPrice(plan.monthlyPrice)}/year
                    </span>
                  )}
                  <span className="text-sm text-muted-foreground mt-2">{plan.limit}</span>
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="flex flex-col gap-4">
                <Button 
                  className="w-full"
                  variant={plan.recommended ? "default" : "outline"}
                  onClick={() => handleSubscribe(plan.name)}
                >
                  {user ? "Subscribe Now" : "Get Started"}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Join now, cancel anytime
                </p>
              </CardFooter>
            </Card>
          ))}
        </motion.div>

        <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 mb-12">
          <div className="flex flex-col sm:flex-row items-center">
            <div className="mb-6 sm:mb-0 sm:mr-8">
              <Gift className="h-12 w-12 text-primary" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-bold mb-2">
                Free Credits When You Refer Friends
              </h3>
              <p className="text-muted-foreground mb-4">
                Earn 100 credits for each friend who joins EmviApp. Credits can be used for premium features, 
                profile boosts, and more!
              </p>
              <Button variant="outline" onClick={() => navigate("/referrals")}>
                View Referral Program
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-8">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-4">
            Join now. Once you're in, you'll never leave.
          </h2>
          <p className="text-muted-foreground">
            Join thousands of successful salons and artists who trust us with their business.
            Start your journey today with our special early-bird pricing.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary" />
              <span className="text-sm">2,500+ happy customers</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 mr-2 text-primary" />
              <span className="text-sm">30-day satisfaction guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PricingPage;
