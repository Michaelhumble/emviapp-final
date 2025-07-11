import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight } from 'lucide-react';

const JobsCallToAction = () => {
  return (
    <motion.section 
      className="py-12 bg-gradient-to-r from-primary/5 to-accent/5"
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
            <Briefcase className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Your Dream Job Awaits
            </h2>
          </div>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Don't let another opportunity slip by. Browse hundreds of beauty industry jobs 
            and take the next step in your career today.
          </p>
          <Link to="/jobs">
            <Button 
              size="lg" 
              className="group px-8 py-6 text-lg font-semibold hover:scale-105 transition-all duration-300"
            >
              Browse All Jobs
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default JobsCallToAction;