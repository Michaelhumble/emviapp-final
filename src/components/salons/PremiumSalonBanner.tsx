
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface PremiumSalonBannerProps {
  className?: string;
}

const PremiumSalonBanner = ({ className }: PremiumSalonBannerProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set visible after a short delay for animation purposes
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative w-full ${className}`} style={{ height: '450px' }}>
      {/* Banner image - Updated to use the new image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/lovable-uploads/d66c2458-7ed3-4f09-8713-75aef6b2c2a8.png)' }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-35" />
      
      {/* Content container */}
      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6">
        <div className="text-center max-w-3xl">
          {/* Headline with animation */}
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-playfair mb-3 sm:mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Premium Salons for Sale — Ready to Own
          </motion.h1>
          
          {/* Subheadline with animation */}
          <motion.p 
            className="text-lg sm:text-xl text-white mb-8 sm:mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover, list, and buy high-end beauty businesses with EmviApp
          </motion.p>
          
          {/* CTA buttons with animation */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/salons/post">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white px-8 py-3 rounded-md transition-all transform hover:scale-105"
              >
                Post Your Salon
              </Button>
            </Link>
            <Link to="/salons/marketplace">
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 px-8 py-3 rounded-md transition-all transform hover:scale-105"
              >
                Browse Listings
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PremiumSalonBanner;
