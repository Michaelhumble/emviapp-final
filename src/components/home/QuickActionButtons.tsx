import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Briefcase, Store } from 'lucide-react';

const QuickActionButtons = () => {
  return (
    <motion.section 
      className="py-8 bg-gradient-to-r from-purple-50 to-blue-50"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
          {/* Post Job Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto"
          >
            <Button asChild size="lg" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl">
              <Link to="/post-job" className="flex items-center justify-center gap-2">
                <Briefcase className="h-5 w-5" />
                Post a Job
              </Link>
            </Button>
          </motion.div>

          {/* Sell Salon Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto"
          >
            <Button asChild size="lg" className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-semibold px-8 py-4 rounded-xl">
              <Link to="/sell-salon" className="flex items-center justify-center gap-2">
                <Store className="h-5 w-5" />
                Sell Your Salon
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default QuickActionButtons;