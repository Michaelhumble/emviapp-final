
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Store, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const BeautyExchangeSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    animation: 'fade-in'
  });
  
  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-20 bg-gradient-to-r from-white to-purple-50/30"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Left side - Image/Icon */}
          <motion.div 
            className="w-full md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-purple-100/80 blur-xl"></div>
              <div className="relative bg-white p-8 rounded-full shadow-xl border border-purple-100">
                <Store 
                  className="w-24 h-24 md:w-32 md:h-32 text-purple-600"
                  strokeWidth={1.5}
                />
              </div>
            </div>
          </motion.div>
          
          {/* Right side - Content */}
          <motion.div 
            className="w-full md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-3">
              The Beauty Exchange
            </h2>
            <h3 className="text-xl md:text-2xl text-purple-700 mb-4">
              Turn Beauticians Into Magicians.
            </h3>
            <p className="text-gray-700 mb-8 max-w-xl mx-auto md:mx-0">
              Buy or sell salons, booths, and listings with ease. 
              Whether you're a solo artist or a salon empire builder — 
              this is where dreams change hands.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link to="/salons">
                <Button 
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white shadow-md"
                  size="lg"
                >
                  <Store className="mr-2 h-5 w-5" /> Post a Salon for Sale
                </Button>
              </Link>
              <Link to="/salons">
                <Button 
                  className="w-full sm:w-auto border-2 border-purple-600 bg-transparent text-purple-700 hover:bg-purple-50"
                  variant="outline"
                  size="lg"
                >
                  <Search className="mr-2 h-5 w-5" /> Browse Beauty Listings
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BeautyExchangeSection;
