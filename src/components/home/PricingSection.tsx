
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Store, Building, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const PricingSection = () => {
  const navigate = useNavigate();
  
  // Define pricing plans
  const pricingPlans = [
    {
      id: "jobs",
      title: "Job Posts",
      description: "Hire faster with AI-matched artists.",
      icon: <Briefcase className="h-6 w-6 text-blue-600" />,
      startingPrice: "Free",
      regularPrice: "$20",
      currentPrice: "$10",
      features: [
        "First post completely free",
        "AI-matched candidates",
        "+$5 for nationwide boost",
        "No hidden fees"
      ],
      accentColor: "from-blue-100 to-blue-200",
      buttonText: "Post My First Job",
      buttonAction: () => navigate("/posting/job")
    },
    {
      id: "salons",
      title: "Salon Listings",
      description: "Get noticed by buyers across the country.",
      icon: <Store className="h-6 w-6 text-yellow-600" />,
      startingPrice: "$20",
      features: [
        "Professional listing page",
        "+$10 for national reach",
        "Fast Sale Package available",
        "Renewal discounts"
      ],
      accentColor: "from-yellow-100 to-yellow-200",
      buttonText: "List a Salon",
      buttonAction: () => navigate("/posting/salon")
    },
    {
      id: "booths",
      title: "Booth Rentals",
      description: "Fill your empty chairs fast.",
      icon: <Building className="h-6 w-6 text-green-600" />,
      startingPrice: "$15",
      features: [
        "Local & nationwide options",
        "Bundle with job posts",
        "Featured placement available",
        "30-day active listing"
      ],
      accentColor: "from-green-100 to-green-200",
      buttonText: "Post a Booth",
      buttonAction: () => navigate("/posting/booth")
    },
    {
      id: "supplies",
      title: "Product Listings",
      description: "Sell directly to the beauty community.",
      icon: <ShoppingBag className="h-6 w-6 text-purple-600" />,
      startingPrice: "Coming soon",
      features: [
        "Direct supplier to salon",
        "Product promotion tools",
        "Verification badges",
        "Analytics dashboard"
      ],
      accentColor: "from-purple-100 to-purple-200",
      buttonText: "Get Notified",
      buttonAction: () => navigate("/")
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full filter blur-3xl opacity-30" aria-hidden="true"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-100 rounded-full filter blur-3xl opacity-20" aria-hidden="true"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-serif tracking-tight">
            Start Free. Grow Fast.
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Your first post is free. After that, only pay for what you use. No contracts. No pressure.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="h-full backdrop-blur-sm bg-white/90 border border-gray-100 shadow hover:shadow-lg transition-all duration-300">
                <div className={`bg-gradient-to-r ${plan.accentColor} h-2 rounded-t-lg`} />
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-lg bg-gray-50">{plan.icon}</div>
                    {plan.id === "jobs" && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        Free to start
                      </Badge>
                    )}
                  </div>
                  <CardTitle>{plan.title}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="text-3xl font-bold font-serif">
                      {plan.startingPrice}
                      {plan.regularPrice && (
                        <span className="text-base ml-2 line-through text-gray-400">{plan.regularPrice}</span>
                      )}
                      {plan.currentPrice && (
                        <span className="text-base ml-2 text-green-600">{plan.currentPrice}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">per post / month</p>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <span className="mr-2 text-primary">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={plan.buttonAction} 
                    className="w-full"
                    variant={plan.id === "supplies" ? "outline" : "default"}
                  >
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="flex justify-center mt-12">
          <div className="text-center max-w-lg bg-primary/5 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Trust & Transparency</h3>
            <p className="text-gray-600">
              Cancel anytime. No auto-renewals unless you approve them. Simple, fair pricing that scales with your needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
