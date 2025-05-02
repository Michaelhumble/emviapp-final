
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const MissingPieceSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Experience the Missing Piece
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            EmviApp bridges the gap between beauty professionals and clients with technology 
            that fosters trust, transparency and genuine connections.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth/signup">
              <Button size="lg" className="font-medium px-8">
                Start Your Journey
              </Button>
            </Link>
            <Link to="/tour">
              <Button size="lg" variant="outline" className="font-medium">
                Take a Tour
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissingPieceSection;
