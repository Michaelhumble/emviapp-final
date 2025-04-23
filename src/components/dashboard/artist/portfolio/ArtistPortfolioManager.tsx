
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Image as ImageIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useArtistPortfolio } from "@/hooks/useArtistPortfolio";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PortfolioUploadModal from "./PortfolioUploadModal";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";

const ArtistPortfolioManager = () => {
  const {
    portfolio,
    isLoading,
    addPortfolioItem,
    deletePortfolioItem,
    reorderPortfolioItems,
    uploading,
  } = useArtistPortfolio();
  
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [previewItem, setPreviewItem] = useState<string | null>(null);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<string | null>(null);
  
  // Handle drag and drop reordering
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    
    if (startIndex === endIndex) return;
    
    reorderPortfolioItems(startIndex, endIndex);
  };
  
  // Handle image preview
  const handlePreview = (imageUrl: string) => {
    setPreviewItem(imageUrl);
  };
  
  // Handle delete confirmation
  const confirmDelete = (id: string, imageUrl: string) => {
    setDeleteConfirmItem(id);
  };
  
  // Handle actual deletion
  const handleDelete = async () => {
    if (!deleteConfirmItem) return;
    
    const itemToDelete = portfolio.find(item => item.id === deleteConfirmItem);
    if (!itemToDelete) return;
    
    const success = await deletePortfolioItem(deleteConfirmItem, itemToDelete.image_url);
    if (success) {
      toast.success("Portfolio item deleted successfully");
    }
    
    setDeleteConfirmItem(null);
  };

  return (
    <Card className="shadow-sm border-purple-100">
      <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-purple-50 to-white pb-3">
        <CardTitle className="text-xl font-serif flex items-center">
          <ImageIcon className="h-5 w-5 mr-2 text-purple-500" />
          My Portfolio
        </CardTitle>
        <Button
          onClick={() => setUploadModalOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white"
          size="sm"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add New Work
        </Button>
      </CardHeader>
      
      <CardContent className="pt-4 pb-6">
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="aspect-square bg-gray-100 animate-pulse rounded-md" />
            ))}
          </div>
        ) : portfolio.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-gray-500 mb-2">No portfolio items yet</h3>
            <p className="text-gray-400 text-sm mb-4">
              Add your best work to showcase your skills
            </p>
            <Button 
              onClick={() => setUploadModalOpen(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add New Work
            </Button>
          </div>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="portfolio" direction="horizontal">
              {(provided) => (
                <div 
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
                >
                  {portfolio.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`relative group rounded-md overflow-hidden border border-gray-200 ${
                            snapshot.isDragging ? "shadow-lg" : ""
                          }`}
                        >
                          <div className="aspect-square">
                            <img 
                              src={item.image_url} 
                              alt={item.title || "Portfolio item"} 
                              className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                              onClick={() => handlePreview(item.image_url)}
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center">
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  confirmDelete(item.id, item.image_url);
                                }}
                                size="sm"
                                variant="destructive"
                                className="rounded-full h-8 w-8 p-0"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="absolute top-2 left-2 bg-white/80 px-2 py-1 text-xs rounded-full shadow-sm">
                            {item.title || "Untitled"}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </CardContent>
      
      {/* Upload Modal */}
      <PortfolioUploadModal
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onUpload={addPortfolioItem}
        loading={uploading}
      />
      
      {/* Image Preview Modal */}
      {previewItem && (
        <Dialog open={!!previewItem} onOpenChange={() => setPreviewItem(null)}>
          <DialogContent className="max-w-3xl p-0 overflow-hidden">
            <div className="p-0">
              <img
                src={previewItem}
                alt="Portfolio preview"
                className="w-full h-auto"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Delete Confirmation Modal */}
      <Dialog open={!!deleteConfirmItem} onOpenChange={(open) => !open && setDeleteConfirmItem(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Portfolio Item</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this item? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setDeleteConfirmItem(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ArtistPortfolioManager;
