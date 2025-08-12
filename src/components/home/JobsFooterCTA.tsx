import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase } from 'lucide-react';

const JobsFooterCTA = () => {
  return (
    <motion.section 
      className="py-12 bg-muted/30 border-t border-border"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center justify-center mb-4">
            <Briefcase className="h-6 w-6 text-primary mr-2" />
            <h3 className="text-xl md:text-2xl font-semibold text-foreground">
              Ready to Find Your Next Opportunity?
            </h3>
          </div>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Join thousands of beauty professionals who've found their perfect job through EmviApp.
          </p>
          <div className="flex flex-col items-center gap-4">
            {/* Primary CTA */}
            <Link to="/jobs">
              <Button
                size="lg" 
                className="group px-6 py-3 font-medium hover:scale-105 transition-all duration-300"
              >
                Explore Jobs Now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            {/* Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link to="/signup?redirect=%2F">
                <Button variant="outline" className="bg-white hover:bg-gray-50 text-purple-700 border-purple-200 hover:border-purple-300 font-inter">
                  ✨ Create Your Free Account
                </Button>
              </Link>
              
              <Link to="/signin?redirect=%2F">
                <Button variant="ghost" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 font-inter">
                  Welcome Back! Sign In
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default JobsFooterCTA;