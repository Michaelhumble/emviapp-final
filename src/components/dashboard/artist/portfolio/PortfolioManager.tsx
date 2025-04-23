
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, ImagePlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock portfolio data
const mockPortfolio = [
  {
    id: "1",
    image: "/lovable-uploads/67947adb-5754-4569-aa1c-228d8f9db461.png",
    title: "French Gradient",
    featured: true
  },
  {
    id: "2",
    image: "/lovable-uploads/70c8662a-4525-4854-a529-62616b5b6c81.png",
    title: "Minimalist Line Art",
    featured: false
  },
  {
    id: "3",
    image: "/lovable-uploads/81e6d95d-e09b-45f0-a4bc-96358592e462.png",
    title: "Pink Floral Design",
    featured: false
  }
];

export const PortfolioManager = () => {
  const [portfolio, setPortfolio] = useState(mockPortfolio);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-playfair font-semibold text-gray-900">Portfolio Manager</h1>
        <Button 
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          onClick={() => {}}
        >
          <Plus className="h-4 w-4 mr-2" />
          Upload New Work
        </Button>
      </div>

      <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-100/80 pb-4">
          <CardTitle className="font-playfair text-xl text-gray-800">Your Portfolio</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {portfolio.length === 0 ? (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mx-auto w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                <ImagePlus className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Your portfolio is empty
              </h3>
              <p className="text-gray-600 mb-6">
                Add your first masterpiece to attract clients!
              </p>
              <Button 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                onClick={() => {}}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Work
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {portfolio.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onHoverStart={() => setHoveredId(item.id)}
                    onHoverEnd={() => setHoveredId(null)}
                    className="relative group rounded-xl overflow-hidden aspect-square"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <motion.div 
                      initial={false}
                      animate={{ opacity: hoveredId === item.id ? 1 : 0 }}
                      className="absolute inset-0 bg-black/50 flex items-center justify-center gap-3"
                    >
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-10 w-10 bg-white hover:bg-white/90"
                        onClick={() => {}}
                      >
                        <Edit2 className="h-4 w-4 text-gray-700" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-10 w-10 bg-white hover:bg-white/90 text-red-500 hover:text-red-600"
                        onClick={() => {}}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </motion.div>
                    {item.featured && (
                      <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-medium px-2 py-1 rounded">
                        Featured
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
