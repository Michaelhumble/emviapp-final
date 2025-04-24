
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Upload, ImagePlus, Edit, Trash2, Check, X } from "lucide-react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import EditPortfolioItemModal from "./EditPortfolioItemModal";
import PortfolioUploadModal from "./PortfolioUploadModal";

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

const ArtistPortfolioManager = () => {
  const [portfolio, setPortfolio] = useState(mockPortfolio);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [editingItem, setEditingItem] = useState<typeof mockPortfolio[0] | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDeleteConfirm = () => {
    if (itemToDelete !== null) {
      setPortfolio(prev => prev.filter(item => item.id !== itemToDelete));
      setItemToDelete(null);
    }
  };

  const handleEditSave = (id: number, newTitle: string, newCategory: string) => {
    setPortfolio(prev => prev.map(item => 
      item.id === id ? { ...item, title: newTitle, category: newCategory } : item
    ));
    setEditingItem(null);
  };

  const handleAddPortfolioItem = async (file: File, title: string) => {
    try {
      setUploading(true);
      // Mock upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find the highest ID to create a new unique ID
      const maxId = portfolio.reduce((max, item) => Math.max(max, item.id), 0);
      
      const newItem = {
        id: maxId + 1,
        image: URL.createObjectURL(file),
        title: title,
        category: "New Work",
        featured: false
      };
      
      setPortfolio(prev => [...prev, newItem]);
      setUploading(false);
      return true;
    } catch (error) {
      console.error("Error adding portfolio item:", error);
      setUploading(false);
      return false;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-playfair font-semibold text-gray-900">Portfolio Manager</h1>
        <div className="flex gap-3">
          {isEditMode ? (
            <Button 
              onClick={() => setIsEditMode(false)}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
            >
              <Check className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          ) : (
            <>
              <Button 
                variant="outline"
                className="flex items-center gap-2 bg-white/80 border-purple-200 hover:bg-purple-50"
                onClick={() => setIsEditMode(true)}
              >
                <Edit className="h-4 w-4" />
                Edit Portfolio
              </Button>
              <Button 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                onClick={() => setIsUploadModalOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Work
              </Button>
            </>
          )}
        </div>
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
              <div className="mx-auto w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4 shadow-md">
                <ImagePlus className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-playfair font-semibold text-gray-900 mb-2">
                Your portfolio is currently empty
              </h3>
              <p className="text-base text-gray-600 mb-6 max-w-md mx-auto">
                Showcase your talent and attract clients by uploading your best work. 
                High-quality images make a lasting first impression.
              </p>
              <Button 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white min-h-[44px] min-w-[200px] rounded-full"
                onClick={() => setIsUploadModalOpen(true)}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Your First Work
              </Button>
            </motion.div>
          ) : (
            <Reorder.Group 
              axis="y" 
              values={portfolio} 
              onReorder={setPortfolio}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {portfolio.map((item) => (
                  <Reorder.Item
                    key={item.id}
                    value={item}
                    whileDrag={{ scale: 1.03 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative group rounded-xl overflow-hidden aspect-square cursor-move"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <motion.div 
                      initial={false}
                      animate={{ opacity: isEditMode || hoveredId === item.id ? 1 : 0 }}
                      className="absolute inset-0 bg-black/50 flex items-center justify-center gap-3"
                      onHoverStart={() => setHoveredId(item.id)}
                      onHoverEnd={() => setHoveredId(null)}
                    >
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-10 w-10 bg-white hover:bg-white/90"
                        onClick={() => setEditingItem(item)}
                      >
                        <Edit className="h-4 w-4 text-gray-700" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-10 w-10 bg-white hover:bg-white/90 text-red-500 hover:text-red-600"
                        onClick={() => setItemToDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </motion.div>
                    {item.featured && (
                      <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-medium px-2 py-1 rounded">
                        Featured
                      </div>
                    )}
                  </Reorder.Item>
                ))}
              </AnimatePresence>
            </Reorder.Group>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={itemToDelete !== null} onOpenChange={() => setItemToDelete(null)}>
        <AlertDialogContent className="bg-white/95 backdrop-blur-sm border-0">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-playfair text-xl">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this work? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Portfolio Item Modal */}
      <EditPortfolioItemModal
        open={editingItem !== null}
        onClose={() => setEditingItem(null)}
        item={editingItem}
        onSave={handleEditSave}
        onDelete={(id) => setItemToDelete(id)}
      />

      {/* Upload Portfolio Item Modal */}
      <PortfolioUploadModal
        open={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleAddPortfolioItem}
        loading={uploading}
      />
    </div>
  );
};

export default ArtistPortfolioManager;
