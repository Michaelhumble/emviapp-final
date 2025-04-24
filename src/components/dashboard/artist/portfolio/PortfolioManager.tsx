
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, Check, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import PortfolioHero from "./PortfolioHero";
import EmptyPortfolioState from "./EmptyPortfolioState";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Mock portfolio data with unique IDs
const mockPortfolio = [
  {
    id: 1,
    image: "/lovable-uploads/67947adb-5754-4569-aa1c-228d8f9db461.png",
    title: "French Gradient",
    category: "Nails",
    featured: true
  },
  {
    id: 2,
    image: "/lovable-uploads/70c8662a-4525-4854-a529-62616b5b6c81.png",
    title: "Minimalist Line Art",
    category: "Makeup",
    featured: false
  },
  {
    id: 3,
    image: "/lovable-uploads/81e6d95d-e09b-45f0-a4bc-96358592e462.png",
    title: "Pink Floral Design",
    category: "Nails",
    featured: false
  }
];

const PortfolioManager = () => {
  const [portfolio, setPortfolio] = useState(mockPortfolio);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState<null | { id: number; image: string; title: string }>(null);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const handleDeleteItem = (id: number) => {
    setItemToDelete(id);
  };

  const confirmDelete = () => {
    if (itemToDelete !== null) {
      setPortfolio(prev => prev.filter(item => item.id !== itemToDelete));
      setItemToDelete(null);
    }
  };

  const handleAddWork = () => {
    // Mock function for adding new work
    const newId = Math.max(...portfolio.map(item => item.id), 0) + 1;
    const newItem = {
      id: newId,
      image: "/lovable-uploads/a3c08446-c1cb-492d-a361-7ec4aca18cfd.png", // Default image
      title: `New Work ${newId}`,
      category: "New Category",
      featured: false
    };
    setPortfolio(prev => [...prev, newItem]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <PortfolioHero artistName="Michael" />
      
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-playfair font-medium text-gray-900">Portfolio Manager</h2>
        <div className="flex gap-3">
          {portfolio.length > 0 && (
            <Button
              variant={isEditMode ? "default" : "outline"}
              className={isEditMode 
                ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md"
                : "bg-white/80 border-purple-200 hover:bg-purple-50 text-purple-700"}
              onClick={() => setIsEditMode(!isEditMode)}
            >
              {isEditMode ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Portfolio
                </>
              )}
            </Button>
          )}
          <Button
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md hover:shadow-lg transition-all"
            onClick={handleAddWork}
          >
            <Plus className="w-4 h-4 mr-2" />
            ➕ Add New Masterpiece
          </Button>
        </div>
      </div>

      {portfolio.length === 0 ? (
        <EmptyPortfolioState onAddWork={handleAddWork} />
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {portfolio.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative group rounded-xl overflow-hidden aspect-square cursor-pointer shadow-sm hover:shadow-md transition-all"
                onClick={() => !isEditMode && setSelectedImage(item)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative h-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                {isEditMode ? (
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-10 w-10 bg-white hover:bg-white/90"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Edit item:', item.id);
                      }}
                    >
                      <Edit className="h-4 w-4 text-gray-700" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-10 w-10 bg-white hover:bg-white/90 text-red-500 hover:text-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteItem(item.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform">
                    <h3 className="text-lg font-medium">{item.title}</h3>
                    {item.category && (
                      <p className="text-sm text-white/80">{item.category}</p>
                    )}
                    <Button
                      variant="secondary"
                      size="sm"
                      className="mt-2 bg-white/20 hover:bg-white/40 backdrop-blur-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(item);
                      }}
                    >
                      <ZoomIn className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </div>
                )}

                {item.featured && !isEditMode && (
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                    Featured
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Lightbox Preview */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 25 }}
            src={selectedImage.image}
            alt={selectedImage.title}
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
          <Button 
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white"
            onClick={() => setSelectedImage(null)}
          >
            Close
          </Button>
        </motion.div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={itemToDelete !== null} onOpenChange={() => setItemToDelete(null)}>
        <AlertDialogContent className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-playfair text-xl">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete this portfolio item permanently. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-purple-200 hover:bg-purple-50 text-gray-700">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-sm"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PortfolioManager;
