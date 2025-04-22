
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Trash2, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock portfolio data
const portfolioItems = [
  {
    id: 1,
    image: "/lovable-uploads/67947adb-5754-4569-aa1c-228d8f9db461.png",
    title: "French Gradient",
    featured: true
  },
  {
    id: 2,
    image: "/lovable-uploads/70c8662a-4525-4854-a529-62616b5b6c81.png",
    title: "Minimalist Line Art",
    featured: false
  },
  {
    id: 3,
    image: "/lovable-uploads/81e6d95d-e09b-45f0-a4bc-96358592e462.png",
    title: "Pink Floral Design",
    featured: false
  },
  {
    id: 4,
    image: "/lovable-uploads/7d585be5-b70d-4d65-b57f-803de81839ba.png",
    title: "Elegant Marble Pattern",
    featured: true
  },
  {
    id: 5,
    image: "/lovable-uploads/a3c08446-c1cb-492d-a361-7ec4aca18cfd.png",
    title: "Geometric Abstract",
    featured: false
  },
  {
    id: 6,
    image: "/lovable-uploads/c9e52825-c7f4-4923-aecf-a92a8799530b.png",
    title: "Glitter Accent",
    featured: false
  }
];

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
          {portfolioItems.map((item) => (
            <motion.div 
              key={item.id}
              className="group relative rounded-lg overflow-hidden"
              variants={itemVariants}
              onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
            >
              <div className="aspect-square relative cursor-pointer">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover rounded-lg border border-gray-200"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="mr-2 bg-white hover:bg-white/90"
                    >
                      <Star className={`h-4 w-4 ${item.featured ? 'fill-yellow-500 text-yellow-500' : ''}`} />
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
                {item.featured && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                    Featured
                  </div>
                )}
              </div>
              <h3 className="mt-2 text-sm font-medium">{item.title}</h3>
            </motion.div>
          ))}
          
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
