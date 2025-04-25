
import { motion } from "framer-motion";
import { Palette } from "lucide-react";

interface PortfolioHeroProps {
  artistName?: string;
}

const PortfolioHero = ({ artistName = "Artist" }: PortfolioHeroProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative mb-8 rounded-2xl overflow-hidden"
    >
      <div className="bg-gradient-to-r from-purple-50 via-purple-100/50 to-pink-50 p-8 md:p-12">
        <div className="max-w-3xl">
          <motion.h1 
            className="text-2xl md:text-3xl font-playfair text-gray-900 mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {artistName}, this is your stage —
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            showcase your best work to the world
          </motion.p>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 pointer-events-none" />
    </motion.div>
  );
};

export default PortfolioHero;
