
import React, { useState } from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Plus, Upload, Trash2, Pencil, Image, X } from "lucide-react";
import { motion } from "framer-motion";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import EditPortfolioItemModal from "./EditPortfolioItemModal";
import PortfolioUploadModal from "./PortfolioUploadModal";
import EmptyPortfolioState from "./EmptyPortfolioState";

// Mock portfolio data with unique IDs
const mockPortfolio = [
  {
    id: 1,
    image: "/lovable-uploads/67947adb-5754-4569-aa1c-228d8f9db461.png",
    title: "French Gradient",
    category: "Nail Art",
    featured: true
  },
  {
    id: 2,
    image: "/lovable-uploads/70c8662a-4525-4854-a529-62616b5b6c81.png",
    title: "Minimalist Line Art",
    category: "Modern Design",
    featured: false
  },
  {
    id: 3,
    image: "/lovable-uploads/81e6d95d-e09b-45f0-a4bc-96358592e462.png",
    title: "Pink Floral Design",
    category: "Seasonal",
    featured: false
  },
  {
    id: 4,
    image: "/lovable-uploads/7d585be5-b70d-4d65-b57f-803de81839ba.png",
    title: "Elegant Marble Pattern",
    category: "Premium",
    featured: true
  }
];

const ArtistPortfolioManager = () => {
  const [portfolio, setPortfolio] = useState(mockPortfolio);
  const [viewImage, setViewImage] = useState<{ id: number; image: string; title: string } | null>(null);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [editingItem, setEditingItem] = useState<typeof mockPortfolio[0] | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDeleteConfirm = () => {
    if (itemToDelete !== null) {
      setPortfolio(portfolio.filter(item => item.id !== itemToDelete));
      setItemToDelete(null);
    }
  };

  const handleEditSave = (id: number, newTitle: string, newCategory: string) => {
    setPortfolio(portfolio.map(item => 
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
      <Card className="border-purple-100 shadow-sm">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-serif">Portfolio Manager</CardTitle>
            <CardDescription>
              Curate and organize your best work
            </CardDescription>
          </div>

          {/* Only show actions if there are portfolio items */}
          {portfolio.length > 0 && (
            <div className="flex space-x-2">
              <Button 
                variant="outline"
                className="border-purple-200 text-purple-700 hover:bg-purple-50"
                onClick={() => setIsEditMode(!isEditMode)}
              >
                {isEditMode ? "Done" : "Edit"}
              </Button>
              <Button 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                onClick={() => setIsUploadModalOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Work
              </Button>
            </div>
          )}
        </CardHeader>

        <CardContent className="pt-4">
          {/* Portfolio grid */}
          {portfolio.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {portfolio.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="group relative aspect-square rounded-lg overflow-hidden border border-gray-200"
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 cursor-pointer"
                    onClick={() => !isEditMode && setViewImage(item)}
                  />
                  
                  {/* Overlay with actions */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                    <div className={`${isEditMode ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity flex space-x-2`}>
                      {isEditMode ? (
                        <>
                          <Button 
                            size="sm"
                            variant="secondary"
                            className="rounded-full h-9 w-9 p-0 bg-white hover:bg-gray-200"
                            onClick={() => setEditingItem(item)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm"
                            variant="secondary"
                            className="rounded-full h-9 w-9 p-0 bg-white hover:bg-red-100 text-red-600 hover:text-red-700"
                            onClick={() => setItemToDelete(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <Button 
                          size="sm"
                          variant="secondary"
                          className="rounded-full h-9 w-9 p-0 bg-white hover:bg-white"
                          onClick={() => setViewImage(item)}
                        >
                          <Image className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {/* Title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                    <p className="text-white text-sm font-medium truncate">{item.title}</p>
                    <p className="text-white/70 text-xs truncate">{item.category}</p>
                  </div>
                  
                  {/* Featured indicator */}
                  {item.featured && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full">
                      Featured
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <EmptyPortfolioState onAddWork={() => setIsUploadModalOpen(true)} />
          )}
        </CardContent>
      </Card>
      
      {/* Image preview dialog */}
      <Dialog open={!!viewImage} onOpenChange={() => setViewImage(null)}>
        <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-white/95 backdrop-blur-sm border-0">
          {viewImage && (
            <>
              <div className="relative">
                <img 
                  src={viewImage.image} 
                  alt={viewImage.title}
                  className="w-full max-h-[70vh] object-contain"
                />
                <Button 
                  className="absolute top-2 right-2 h-8 w-8 p-0 bg-black/50 text-white rounded-full hover:bg-black/70"
                  onClick={() => setViewImage(null)}
                  variant="ghost"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium">{viewImage.title}</h3>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete confirmation dialog */}
      <AlertDialog open={itemToDelete !== null} onOpenChange={() => setItemToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this item from your portfolio.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Edit portfolio item modal */}
      <EditPortfolioItemModal
        open={!!editingItem}
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
