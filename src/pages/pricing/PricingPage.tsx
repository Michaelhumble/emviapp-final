
import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Timer, Star, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Solo Freelancer",
    originalPrice: 49,
    discountPrice: 24,
    features: [
      "Perfect for independent artists",
      "Full booking calendar",
      "Client management tools",
      "Portfolio showcase",
      "Direct messaging",
    ],
    limit: "1 artist",
    recommended: false
  },
  {
    name: "Small Salon",
    originalPrice: 99,
    discountPrice: 49,
    features: [
      "Up to 5 artists",
      "Team management",
      "Advanced analytics",
      "Priority support",
      "Custom branding",
    ],
    limit: "1-5 artists",
    recommended: true
  },
  {
    name: "Growing Salon",
    originalPrice: 175,
    discountPrice: 89,
    features: [
      "Up to 15 artists",
      "Advanced reports",
      "Multi-location support",
      "Training resources",
      "API access",
    ],
    limit: "6-15 artists",
    recommended: false
  },
  {
    name: "Large Salon",
    originalPrice: 249,
    discountPrice: 125,
    features: [
      "Unlimited artists",
      "Enterprise support",
      "Custom integrations",
      "White-label options",
      "Dedicated account manager",
    ],
    limit: "Unlimited artists",
    recommended: false
  }
];

const PricingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const calculateDiscount = (original: number, discounted: number) => {
    return Math.round(((original - discounted) / original) * 100);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Perfect Plan</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Start with 50% OFF your first 3 months—limited time only
          </p>
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full">
            <Timer className="h-5 w-5" />
            <span className="font-medium">Early-bird pricing ends soon!</span>
          </div>
        </div>

        {/* Pricing Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
        >
          {plans.map((plan) => (
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
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold">${plan.discountPrice}</span>
                    <div className="flex flex-col items-start">
                      <span className="text-sm line-through text-muted-foreground">
                        ${plan.originalPrice}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        Save {calculateDiscount(plan.originalPrice, plan.discountPrice)}%
                      </Badge>
                    </div>
                  </div>
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
                  onClick={() => {
                    if (user) {
                      navigate("/checkout?plan=" + encodeURIComponent(plan.name));
                    } else {
                      navigate("/auth/signin?redirect=/pricing");
                    }
                  }}
                >
                  Get Started
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  First 3 months at ${plan.discountPrice}/mo
                </p>
              </CardFooter>
            </Card>
          ))}
        </motion.div>

        {/* Trust Banner */}
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
        </div>
      </div>
    </Layout>
  );
};

export default PricingPage;
