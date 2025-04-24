
import React from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ImageIcon, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

// Mock portfolio data with unique IDs for demonstration
const mockPortfolioItems = [
  {
    id: "1",
    imageUrl: "/lovable-uploads/67947adb-5754-4569-aa1c-228d8f9db461.png",
    title: "French Gradient",
    category: "Nails",
    featured: true
  },
  {
    id: "2",
    imageUrl: "/lovable-uploads/70c8662a-4525-4854-a529-62616b5b6c81.png",
    title: "Minimalist Line Art",
    category: "Makeup",
    featured: false
  },
  {
    id: "3",
    imageUrl: "/lovable-uploads/81e6d95d-e09b-45f0-a4bc-96358592e462.png",
    title: "Pink Floral Design",
    category: "Nails",
    featured: false
  }
];

const PortfolioManagerPage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [portfolioItems, setPortfolioItems] = useState(mockPortfolioItems);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  const handleDeleteItem = (itemId: string) => {
    setPortfolioItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const handleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const hasItems = portfolioItems.length > 0;

  return (
    <Layout>
      <Helmet>
        <title>Portfolio Manager | EmviApp</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 py-8"
      >
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-playfair font-semibold text-gray-900">Portfolio Manager</h1>
            <div className="flex gap-3">
              {hasItems && (
                <Button 
                  variant="outline"
                  className="flex items-center gap-2 bg-white/80 border-purple-200 hover:bg-purple-50"
                  onClick={handleEditMode}
                >
                  <Edit className="h-4 w-4" />
                  {isEditMode ? 'Done Editing' : 'Edit Portfolio'}
                </Button>
              )}
              <Button 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Work
              </Button>
            </div>
          </div>

          <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
            <CardHeader className="border-b border-gray-100/80 pb-4">
              <CardTitle className="font-playfair text-xl text-gray-800">Your Portfolio</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 min-h-[60vh]">
              {hasItems ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {portfolioItems.map((item) => (
                    <div
                      key={item.id}
                      className="relative group rounded-xl overflow-hidden aspect-square cursor-pointer"
                      onMouseEnter={() => setHoveredItemId(item.id)}
                      onMouseLeave={() => setHoveredItemId(null)}
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {(isEditMode || hoveredItemId === item.id) && (
                        <div 
                          className="absolute inset-0 bg-black/50 flex items-center justify-center gap-3"
                        >
                          {isEditMode && (
                            <>
                              <Button
                                variant="secondary"
                                size="icon"
                                className="h-10 w-10 bg-white hover:bg-white/90"
                              >
                                <Edit className="h-4 w-4 text-gray-700" />
                              </Button>
                              <Button
                                variant="secondary"
                                size="icon"
                                className="h-10 w-10 bg-white hover:bg-white/90 text-red-500 hover:text-red-600"
                                onClick={() => handleDeleteItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      )}
                      {item.featured && (
                        <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-medium px-2 py-1 rounded">
                          Featured
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                        <p className="text-white text-sm font-medium truncate">{item.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 flex flex-col items-center justify-center h-full">
                  <div className="mx-auto w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4 shadow-md">
                    <ImageIcon className="h-8 w-8 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-playfair font-semibold text-gray-900 mb-2">
                    Your portfolio is empty
                  </h3>
                  <p className="text-base text-gray-600 mb-6 max-w-md mx-auto">
                    Start adding your best work to attract clients!
                  </p>
                  <Button 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white min-h-[44px] min-w-[200px]"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Work
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </Layout>
  );
};

export default PortfolioManagerPage;
