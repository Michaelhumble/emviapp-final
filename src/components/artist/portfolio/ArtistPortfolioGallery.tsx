
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Upload, 
  X, 
  Trash2, 
  Image as ImageIcon, 
  Info, 
  Loader2, 
  Plus 
} from 'lucide-react';
import { toast } from 'sonner';
import { useArtistPortfolio, PortfolioImage } from '@/hooks/useArtistPortfolio';
import { useAuth } from '@/context/auth';

const ArtistPortfolioGallery = () => {
  const { user } = useAuth();
  const { 
    images, 
    isLoading, 
    isUploading, 
    fileInputRef, 
    uploadImage, 
    deleteImage 
  } = useArtistPortfolio();
  
  const [selectedImage, setSelectedImage] = useState<PortfolioImage | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Handle file selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      await uploadImage(file);
    }
  };
  
  // Handle delete confirmation
  const confirmDelete = async () => {
    if (!selectedImage) return;
    
    setIsDeleting(true);
    await deleteImage(selectedImage.name);
    setIsDeleting(false);
    setSelectedImage(null);
  };
  
  // Handle drag events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      await uploadImage(file);
    }
  };
  
  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              You must be logged in to view your portfolio.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="shadow-sm border-purple-100">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-xl font-serif">
            <ImageIcon className="h-5 w-5 mr-2 text-purple-500" />
            My Portfolio
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          {/* Upload area */}
          <div
            className={`
              border-2 border-dashed rounded-lg p-6 text-center mb-6
              ${isDragging ? 'border-purple-400 bg-purple-50/50' : 'border-gray-200 hover:border-purple-200 hover:bg-gray-50'}
              ${isUploading ? 'border-purple-300 bg-purple-50/30' : ''}
              transition-colors cursor-pointer
            `}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/jpeg,image/png,image/webp"
            />
            
            {isUploading ? (
              <div className="flex flex-col items-center py-4">
                <Loader2 className="h-10 w-10 text-purple-500 animate-spin mb-3" />
                <p className="text-sm font-medium">Uploading your image...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center py-4">
                <Upload className="h-10 w-10 text-gray-400 mb-3" />
                <p className="text-sm font-medium mb-1">
                  Drag & drop your photos or click to browse
                </p>
                <p className="text-xs text-gray-500 mb-3">
                  Upload your best work to showcase your skills
                </p>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Select Image
                </Button>
              </div>
            )}
          </div>
          
          {/* Portfolio grid */}
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div 
                  key={i} 
                  className="aspect-square rounded-md bg-gray-100 animate-pulse"
                />
              ))}
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <ImageIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium">
                Your portfolio is empty
              </h3>
              <p className="text-gray-500 mt-1 mb-4 max-w-md mx-auto">
                Upload your best work to showcase your skills and attract clients.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <AnimatePresence>
                {images.map((image) => (
                  <motion.div
                    key={image.id || image.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="relative aspect-square rounded-md overflow-hidden group border"
                  >
                    <img
                      src={image.url}
                      alt={`Portfolio image - ${image.name}`}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                    />
                    
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => setSelectedImage(image)}
                          size="sm"
                          variant="secondary"
                          className="rounded-full w-8 h-8 p-0"
                        >
                          <ImageIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(image);
                          }}
                          size="sm"
                          variant="destructive"
                          className="rounded-full w-8 h-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Image preview modal */}
      <Dialog open={!!selectedImage && !isDeleting} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          {selectedImage && (
            <>
              <DialogHeader className="p-4">
                <DialogTitle className="flex items-center justify-between">
                  <span>Portfolio Image</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setSelectedImage(null)}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </DialogTitle>
              </DialogHeader>
              <div className="relative max-h-[70vh] overflow-hidden">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.name}
                  className="w-full h-auto"
                />
              </div>
              <div className="p-4 flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  {new Date(selectedImage.created_at).toLocaleDateString()}
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={confirmDelete}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Image
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete confirmation modal */}
      <Dialog open={!!selectedImage && isDeleting} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Image</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this image? This action cannot be undone.</p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setSelectedImage(null)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>
              {isDeleting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Trash2 className="h-4 w-4 mr-2" />}
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default ArtistPortfolioGallery;
