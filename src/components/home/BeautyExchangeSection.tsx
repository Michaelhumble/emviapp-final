
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BeautyExchangeSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            The Beauty Industry Exchange
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            From salons for sale to job listings, connect with verified businesses and professionals within our curated marketplace.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Link to="/salons">
              <Button className="font-medium" size="lg">
                Browse Beauty Listings
              </Button>
            </Link>
            <Link to="/create-listing">
              <Button variant="outline" className="font-medium" size="lg">
                Post a Job or Salon for Sale
              </Button>
            </Link>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.div
            className="bg-white p-6 rounded-xl shadow-sm text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💼</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Find Your Next Position</h3>
            <p className="text-gray-600 mb-4">
              Browse job listings from top salons looking for talented professionals like you.
            </p>
            <Link to="/jobs" className="text-primary font-medium hover:underline">
              View Job Listings →
            </Link>
          </motion.div>
          
          <motion.div
            className="bg-white p-6 rounded-xl shadow-sm text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏢</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Salon Opportunities</h3>
            <p className="text-gray-600 mb-4">
              Discover salons for sale, booth rentals, and partnership opportunities in your area.
            </p>
            <Link to="/salons" className="text-primary font-medium hover:underline">
              Browse Salon Listings →
            </Link>
          </motion.div>
          
          <motion.div
            className="bg-white p-6 rounded-xl shadow-sm text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👩‍💼</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Find Talented Artists</h3>
            <p className="text-gray-600 mb-4">
              Connect with skilled beauty professionals for your salon or business.
            </p>
            <Link to="/artists" className="text-primary font-medium hover:underline">
              Browse Artists →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BeautyExchangeSection;
