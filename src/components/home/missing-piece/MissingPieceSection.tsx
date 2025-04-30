
import React from 'react';
import { motion } from 'framer-motion';
import { Store } from 'lucide-react';
import { Link } from 'react-router-dom';

const MissingPieceSection = () => {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-[#FDF6FF] via-[#FCFAFF] to-[#F6F6F6] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-10">
          {/* Left side - Icon and little Sunshine label */}
          <div className="flex flex-col items-center md:w-1/3">
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              {/* Animated glow background */}
              <motion.div
                className="absolute -inset-1 rounded-full bg-purple-300 opacity-40 blur-xl"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              />
              
              {/* Icon with sparkle animation */}
              <motion.div 
                className="relative flex items-center justify-center w-28 h-28 md:w-32 md:h-32 rounded-full bg-white border border-purple-100 shadow-sm z-10"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Store className="w-12 h-12 md:w-16 md:h-16 text-[#9B5DE5]" />
                
                {/* Sparkle elements */}
                <motion.div 
                  className="absolute -top-1 -right-2 w-4 h-4 bg-purple-100 rounded-full"
                  animate={{
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                <motion.div 
                  className="absolute bottom-0 left-0 w-3 h-3 bg-purple-100 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.4
                  }}
                />
              </motion.div>
            </motion.div>
            
            {/* Little Sunshine label with subtle animation */}
            <motion.div
              className="mt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.span
                className="text-sm font-medium text-[#B57CF3] flex items-center space-x-1.5"
                animate={{ y: [0, -2, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: "reverse", 
                  ease: "easeInOut"
                }}
              >
                little Sunshine ☀️
              </motion.span>
            </motion.div>
          </div>
          
          {/* Right side - Text and CTAs */}
          <div className="md:w-2/3 text-right">
            <div className="space-y-4 mb-6">
              <motion.h2 
                className="text-4xl md:text-6xl font-bold font-playfair leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                The Beauty Exchange
              </motion.h2>
              
              <motion.h3 
                className="text-xl font-semibold text-[#9C27B0]"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                Turn Beauticians Into Magicians.
              </motion.h3>
              
              <motion.p 
                className="text-gray-600 max-w-lg ml-auto"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                Find Your Startup. Build Something Beautiful With Your New Team.
              </motion.p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Link to="/salons">
                  <button className="w-full sm:w-auto px-8 py-2.5 rounded-full font-medium text-white bg-gradient-to-r from-[#9B5DE5] to-[#E493FF] hover:shadow-lg hover:shadow-purple-200/40 transition-all duration-300 transform hover:-translate-y-0.5">
                    Browse Beauty Listings
                  </button>
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Link to="/create-listing">
                  <button className="w-full sm:w-auto px-8 py-2.5 rounded-full font-medium text-white bg-gradient-to-r from-[#9B5DE5] to-[#E493FF] hover:shadow-lg hover:shadow-purple-200/40 transition-all duration-300 transform hover:-translate-y-0.5">
                    Post a Job or Salon for Sale
                  </button>
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Link to="/artists">
                  <button className="w-full sm:w-auto px-8 py-2.5 rounded-full font-medium text-white bg-gradient-to-r from-[#9B5DE5] to-[#E493FF] hover:shadow-lg hover:shadow-purple-200/40 transition-all duration-300 transform hover:-translate-y-0.5">
                    Find Artists & Stylists
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissingPieceSection;
