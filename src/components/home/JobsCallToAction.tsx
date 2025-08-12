import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight } from 'lucide-react';

const JobsCallToAction = () => {
  return (
    <motion.section 
      className="py-16 bg-gradient-to-br from-purple-50/60 via-white to-pink-50/40 relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Elegant background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-gradient-to-tl from-blue-400 to-purple-400 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div 
            className="flex items-center justify-center mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div
              className="p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/40 mr-4"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Briefcase className="h-8 w-8 text-purple-600" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-foreground leading-tight">
              Your Dream Job Awaits
            </h2>
          </motion.div>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto font-inter leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Don't let another opportunity slip by. Browse hundreds of <em className="text-purple-600 font-semibold">beauty industry jobs</em> 
            and take the next step in your career today.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            {/* Primary CTA */}
            <Link to="/jobs">
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Button 
                  size="lg" 
                  className="group bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 hover:from-purple-700 hover:via-purple-800 hover:to-pink-700 text-white font-inter font-bold px-12 py-6 rounded-2xl text-lg shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 relative overflow-hidden"
                  aria-label="Browse all available jobs"
                >
                  <span className="relative z-10 flex items-center">
                    <span className="mr-3">🚀 Browse 1,000+ Dream Jobs</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12" />
                </Button>
              </motion.div>
            </Link>
            
            {/* Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link to="/signup?redirect=%2F">
                <Button variant="outline" className="bg-white hover:bg-gray-50 text-purple-700 border-purple-200 hover:border-purple-300 font-inter font-semibold">
                  ✨ Create Your Free Account
                </Button>
              </Link>
              
              <Link to="/signin?redirect=%2F">
                <Button variant="ghost" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 font-inter font-medium">
                  Welcome Back! Sign In
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default JobsCallToAction;