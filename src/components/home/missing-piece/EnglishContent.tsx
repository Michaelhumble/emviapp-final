
import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface EnglishContentProps {
  itemVariants: any;
}

const EnglishContent = ({ itemVariants }: EnglishContentProps) => {
  const benefits = [
    "Find salons ready to hire you right now",
    "Connect with booth rental opportunities",
    "Discover established salons for sale",
    "Get paid what you're worth"
  ];

  return (
    <div className="space-y-8">
      <motion.h3 
        className="text-3xl md:text-4xl font-playfair font-bold text-gray-800"
        variants={itemVariants}
      >
        Your Missing Piece in the Beauty Industry
      </motion.h3>
      
      <motion.p 
        className="text-lg text-gray-600"
        variants={itemVariants}
      >
        Connecting talented beauty professionals with their perfect opportunities has never been easier. Whether you're looking to join a team or find your next star employee, we've created the platform the beauty industry has been waiting for.
      </motion.p>
      
      <div className="space-y-3">
        {benefits.map((benefit, index) => (
          <motion.div 
            key={index}
            className="flex items-start"
            variants={itemVariants}
          >
            <Check className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">{benefit}</span>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        className="pt-4"
        variants={itemVariants}
      >
        <Link to="/signup">
          <Button size="lg" className="group">
            Join EmviApp Today
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default EnglishContent;
