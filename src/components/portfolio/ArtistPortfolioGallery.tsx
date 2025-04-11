
import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { 
  UploadCloud, 
  Trash2, 
  Loader2, 
  X, 
  Plus, 
  ImageIcon, 
  ZoomIn,
  Info
} from 'lucide-react';
import { usePortfolioImages, PortfolioImage } from '@/hooks/portfolio/usePortfolioImages';
import { useAuth } from '@/context/auth';
import { motion, AnimatePresence } from 'framer-motion';

export default function ArtistPortfolioGallery() {
  const { user } = useAuth();
  const { 
    images, 
    isLoading, 
    isUploading, 
    uploadProgress, 
    fileInputRef, 
    uploadImage,
    deleteImage,
    isArtist
  } = usePortfolioImages();
  
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [previewImageOpen, setPreviewImageOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<PortfolioImage | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Form state for upload
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // File selection handler
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  // Upload form handler
  const handleUpload = async () => {
    if (!selectedFile) return;
    
    await uploadImage(selectedFile, title, description);
    
    // Reset form
    setTitle('');
    setDescription('');
    setSelectedFile(null);
    setUploadDialogOpen(false);
  };
  
  // Delete confirmation handler
  const handleDeleteConfirm = async () => {
    if (!selectedImage) return;
    
    const success = await deleteImage(selectedImage.id, selectedImage.url);
    if (success) {
      setSelectedImage(null);
      setDeleteDialogOpen(false);
    }
  };
  
  // Drag and drop handlers
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
      setUploadDialogOpen(true);
    }
  };
  
  // Check if user is authorized
  if (!user || !isArtist) {
    return (
      <Card className="border-red-100">
        <CardHeader>
          <CardTitle className="text-xl font-serif">Portfolio Gallery</CardTitle>
          <CardDescription>
            Only artists can manage their portfolio
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-10 text-center">
          <Info className="h-12 w-12 text-red-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">Access Restricted</h3>
          <p className="text-muted-foreground max-w-md">
            You need to be logged in as an artist to view and manage your portfolio.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="border-purple-100 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-serif">Portfolio Gallery</CardTitle>
        <CardDescription>
          Showcase your best work to attract clients
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {/* Upload Button */}
        <div className="mb-6">
          <Button
            onClick={() => setUploadDialogOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Image
          </Button>
        </div>
        
        {/* Gallery Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="aspect-square rounded-md bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        ) : images.length === 0 ? (
          <div 
            className={`
              border-2 border-dashed rounded-lg p-8 text-center
              ${isDragging ? 'border-purple-300 bg-purple-50' : 'border-gray-200 bg-gray-50'}
              transition-colors
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center py-4">
              <div className="bg-purple-100 p-3 rounded-full mb-3">
                <ImageIcon className="h-10 w-10 text-purple-500" />
              </div>
              <h3 className="text-lg font-medium mb-2">You haven't uploaded anything yet</h3>
              <p className="text-gray-500 mb-6 max-w-md">
                Upload photos of your best work to attract clients and showcase your talent.
              </p>
              <Button 
                onClick={() => setUploadDialogOpen(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <UploadCloud className="mr-2 h-4 w-4" />
                Upload Your First Image
              </Button>
            </div>
          </div>
        ) : (
          <AnimatePresence>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="group relative aspect-square rounded-md overflow-hidden border border-gray-200"
                >
                  <img 
                    src={image.url} 
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                  />
                  
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => {
                          setSelectedImage(image);
                          setPreviewImageOpen(true);
                        }}
                        size="sm"
                        variant="secondary"
                        className="rounded-full p-2 h-8 w-8"
                      >
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => {
                          setSelectedImage(image);
                          setDeleteDialogOpen(true);
                        }}
                        size="sm"
                        variant="destructive"
                        className="rounded-full p-2 h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <h4 className="text-white text-sm font-medium truncate">{image.title}</h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
        
        {/* Upload Dialog */}
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload Portfolio Image</DialogTitle>
              <DialogDescription>
                Add a new image to showcase your work
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="file">Image</Label>
                <div 
                  className={`
                    border-2 border-dashed rounded-lg p-4 text-center cursor-pointer
                    ${isDragging ? 'border-purple-300 bg-purple-50' : 'border-gray-200 hover:bg-gray-50'}
                    transition-colors
                  `}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    id="file"
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  
                  {selectedFile ? (
                    <div className="py-2">
                      <p className="text-sm font-medium">{selectedFile.name}</p>
                      <p className="text-xs text-gray-500">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mt-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFile(null);
                          if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="py-4">
                      <UploadCloud className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">
                        Drag and drop or click to browse
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        JPG, PNG, WebP • 5MB max
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Summer Collection"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your work..."
                  rows={3}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleUpload} 
                disabled={!selectedFile || isUploading}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading ({uploadProgress}%)
                  </>
                ) : (
                  'Upload'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the image from your portfolio.
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDeleteConfirm}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        
        {/* Image Preview Dialog */}
        <Dialog open={previewImageOpen} onOpenChange={setPreviewImageOpen}>
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedImage?.title}</DialogTitle>
              {selectedImage?.description && (
                <DialogDescription>
                  {selectedImage.description}
                </DialogDescription>
              )}
            </DialogHeader>
            
            <div className="overflow-hidden rounded-md">
              {selectedImage && (
                <img 
                  src={selectedImage.url} 
                  alt={selectedImage.title}
                  className="w-full h-auto object-contain max-h-[70vh]"
                />
              )}
            </div>
            
            <DialogFooter>
              <Button onClick={() => setPreviewImageOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
