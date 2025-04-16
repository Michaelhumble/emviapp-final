
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="py-12 md:py-16 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-blue-50 mix-blend-multiply"></div>
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-serif"
          >
            The Future of Hiring for the Beauty Industry
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-600 text-lg mb-8"
          >
            AI-powered. Built with love. Funded by those who care.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex justify-center gap-4 flex-wrap"
          >
            <Link to="/salons">
              <Button size="lg" className="px-8 font-medium">
                Find a Salon
              </Button>
            </Link>
            <Link to="/jobs">
              <Button size="lg" variant="outline" className="px-8 font-medium">
                Find a Job
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
