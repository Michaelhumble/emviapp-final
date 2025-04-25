
import { motion } from "framer-motion";
import { WandSparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyPortfolioStateProps {
  onAddWork: () => void;
}

const EmptyPortfolioState = ({ onAddWork }: EmptyPortfolioStateProps) => {
  return (
    <motion.div 
      className="text-center py-20"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <WandSparkles className="w-8 h-8 text-purple-400" />
      </motion.div>
      
      <h2 className="text-2xl font-playfair text-gray-900 mb-4">
        Every great artist starts with a blank canvas
      </h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Let's create your legacy
      </p>
      
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={onAddWork}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-shadow"
        >
          ➕ Add New Masterpiece
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default EmptyPortfolioState;
