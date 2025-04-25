
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { demoPortfolioItems } from "../../utils/demoData";

const PortfolioTab = () => {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-medium">Your Portfolio</CardTitle>
          <p className="text-sm text-gray-500 mt-1">Start showcasing your best work</p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Add Your Work
        </Button>
      </CardHeader>
      <CardContent className="pt-4">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {demoPortfolioItems.map((item) => (
            <motion.div 
              key={item.id}
              className="group relative rounded-lg overflow-hidden"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="aspect-square relative">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover rounded-lg border border-gray-200"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300" />
              </div>
              <h3 className="mt-2 text-sm font-medium">{item.title}</h3>
            </motion.div>
          ))}
          
          <motion.div
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
