
import React from "react";
import { motion } from "framer-motion";

interface PortfolioHeroProps {
  artistName: string;
}

const PortfolioHero = ({ artistName }: PortfolioHeroProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative rounded-xl overflow-hidden mb-8"
    >
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 text-center border border-purple-100/50 shadow-sm">
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-playfair font-medium text-gray-900 mb-3">
            {artistName}, this is your stage
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Showcase your best work to the world. Your portfolio is a reflection of your unique artistry and talent.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PortfolioHero;
