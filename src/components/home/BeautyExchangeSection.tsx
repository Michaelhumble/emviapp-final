
import React from 'react';
import { motion } from 'framer-motion';
import { Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const BeautyExchangeSection = () => {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left side with icon and brand name */}
          <div className="flex flex-col items-center">
            <motion.div
              className="bg-purple-100 p-4 rounded-full"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Sun size={48} className="text-purple-500" />
            </motion.div>
            
            {/* Keep little Sunshine text intact */}
            <span className="text-sm font-medium text-[#B57CF3] mt-2">
              little Sunshine ☀️
            </span>
          </div>
          
          {/* Right side with content and stable button */}
          <div className="flex-1 md:ml-8">
            <h2 className="text-3xl font-serif font-bold mb-3">
              Beauty Exchange
            </h2>
            <p className="text-gray-600 mb-6 max-w-xl">
              Connecting beauty professionals with opportunities. Find jobs, salons for sale, and talented artists all in one place.
            </p>
            
            {/* Ensure button links to a known working route */}
            <Button asChild className="bg-purple-500 hover:bg-purple-600">
              <Link to="/jobs">Browse Beauty Listings</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeautyExchangeSection;
