
import React from "react";
import { motion } from "framer-motion";
import { Store } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BeautyExchangeSection = () => {
  return (
    <section className="bg-gradient-to-br from-purple-50 to-white py-12 md:py-16 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Left side - Icon with "little Sunshine" label */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center mb-6 md:mb-0"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full opacity-50 blur-lg"></div>
              <motion.div 
                className="relative bg-white p-6 rounded-full shadow-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Store className="w-16 h-16 md:w-20 md:h-20 text-purple-500" />
              </motion.div>
            </div>
            
            <motion.div
              className="mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.p 
                className="text-sm font-medium text-[#B57CF3]"
                animate={{ y: [0, -3, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 2,
                  ease: "easeInOut"
                }}
              >
                little Sunshine ☀️
              </motion.p>
            </motion.div>
          </motion.div>
          
          {/* Right side - Text content and buttons */}
          <div className="flex-1 text-center md:text-right">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold font-serif mb-2">
                The Beauty Exchange
              </h2>
              <p className="text-xl md:text-2xl text-purple-600 font-medium mb-3">
                Turn Beauticians Into Magicians.
              </p>
              <p className="text-gray-700 mb-6 md:mb-8 max-w-xl md:ml-auto">
                Find Your Startup. Build Something Beautiful With Your New Team.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end">
                <Link to="/beauty-listings">
                  <Button className="w-full md:w-auto bg-purple-500 hover:bg-purple-600">
                    Browse Beauty Listings
                  </Button>
                </Link>
                
                <Link to="/post-listing">
                  <Button variant="outline" className="w-full md:w-auto border-purple-200 text-purple-700 hover:bg-purple-50">
                    Post a Job or Salon for Sale
                  </Button>
                </Link>
                
                <Link to="/artists">
                  <Button variant="outline" className="w-full md:w-auto border-purple-200 text-purple-700 hover:bg-purple-50">
                    Find Artists & Stylists
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeautyExchangeSection;
