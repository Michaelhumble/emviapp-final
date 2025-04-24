
import React from "react";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyPortfolioStateProps {
  onAddWork: () => void;
}

const EmptyPortfolioState = ({ onAddWork }: EmptyPortfolioStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-20 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100/50 shadow-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="max-w-md mx-auto px-4"
      >
        <div className="mx-auto w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-md">
          <ImageIcon className="h-10 w-10 text-purple-400" />
        </div>
        <h3 className="text-2xl font-playfair font-semibold text-gray-900 mb-3">
          Every great artist starts with a blank canvas
        </h3>
        <p className="text-lg text-gray-600 mb-8">
          Let's create your legacy by showcasing your unique style and artistry to potential clients.
        </p>
        <Button
          onClick={onAddWork}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 rounded-lg text-lg font-medium shadow-lg hover:shadow-xl transition-all"
        >
          ➕ Create Your First Masterpiece
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default EmptyPortfolioState;
