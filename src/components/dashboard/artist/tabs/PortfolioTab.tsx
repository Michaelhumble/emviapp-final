
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Trash2, Star, Image } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// This will be populated with actual portfolio items from the user's account
// For now, using an empty array so no items are displayed
const portfolioItems = [];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

const PortfolioTab = () => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-medium">Your Portfolio</CardTitle>
          <p className="text-sm text-gray-500 mt-1">Showcase your best work to attract clients</p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Add New Work
        </Button>
      </CardHeader>
      <CardContent className="pt-4">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {portfolioItems.length > 0 ? (
            portfolioItems.map((item: any) => (
              <motion.div 
                key={item.id}
                className="group relative rounded-lg overflow-hidden"
                variants={itemVariants}
                onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
              >
                <div className="aspect-square relative cursor-pointer">
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-lg border border-gray-200">
                    <Image className="h-8 w-8 text-gray-300" />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="mr-2 bg-white hover:bg-white/90"
                      >
                        <Star className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        className="bg-white text-red-500 hover:text-white hover:bg-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <h3 className="mt-2 text-sm font-medium">Portfolio Item</h3>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-200">
              <Image className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Your portfolio is empty</p>
              <p className="text-sm text-gray-400 mb-4">Add your best work to showcase your skills</p>
              <Button>Upload Your First Work</Button>
            </div>
          )}
          
          <motion.div
            variants={itemVariants}
            className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-purple-400 transition-colors"
          >
            <div className="text-center">
              <Plus className="h-8 w-8 mx-auto text-gray-400" />
              <p className="mt-2 text-sm font-medium text-gray-500">Add More</p>
            </div>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default PortfolioTab;
