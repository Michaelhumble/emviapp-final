import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight } from 'lucide-react';

const JobsCallToAction = () => {
  return (
    <motion.section 
      className="py-20 md:py-28 bg-gradient-to-br from-purple-50/60 via-white to-pink-50/40 relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-1/4 left-10 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-gradient-to-tl from-blue-400 to-purple-400 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <motion.div 
            className="flex items-center justify-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div
              className="p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/40 mr-6"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.1, rotate: 0 }}
            >
              <Briefcase className="h-12 w-12 text-purple-600" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-foreground leading-tight">
              Your Dream Career Starts Here
            </h2>
          </motion.div>
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto font-inter leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Don't let another opportunity slip by. Browse <em className="text-purple-600 font-bold">15,000+ premium beauty jobs</em> 
            and join the professionals transforming their careers with EmviApp.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link to="/nails">
              <motion.div
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Button 
                  size="lg" 
                  className="group bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 hover:from-purple-700 hover:via-purple-800 hover:to-pink-700 text-white font-inter font-bold px-16 py-8 rounded-3xl text-xl shadow-2xl hover:shadow-purple-500/40 transition-all duration-500 relative overflow-hidden min-h-[72px]"
                  aria-label="Browse all available jobs"
                  style={{
                    boxShadow: '0 25px 50px -12px rgba(147, 51, 234, 0.4), 0 10px 20px -8px rgba(147, 51, 234, 0.3)',
                  }}
                >
                  <span className="relative z-10 flex items-center">
                    <span className="mr-4">🎯 Explore 15,000+ Premium Opportunities</span>
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-3 transition-transform duration-300" />
                  </span>
                  
                  {/* Enhanced shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 animate-shimmer" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default JobsCallToAction;