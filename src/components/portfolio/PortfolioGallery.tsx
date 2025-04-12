
import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { usePortfolioImages } from "@/hooks/portfolio/usePortfolioImages";
import { useAuth } from "@/context/auth";
import { Image, Upload, X, AlertCircle, Trash2, Loader } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const PortfolioGallery = () => {
  const { user, userRole } = useAuth();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [currentImageId, setCurrentImageId] = useState<string | null>(null);
  const [imageTitle, setImageTitle] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  const fadeInAnimation = useScrollAnimation({ animation: 'fade-in', delay: 100 });
  
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

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFileSelect(file);
    }
  }, []);

  const handleFileSelect = (file: File) => {
    // Validate file type
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    if (!['jpg', 'jpeg', 'png', 'webp'].includes(fileExt || '')) {
      toast.error('File type not supported. Please upload JPG, PNG, or WebP images');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size too large. Maximum allowed is 5MB');
      return;
    }

    setSelectedFile(file);
    
    // Generate preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string || null);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file to upload');
      return;
    }

    if (!imageTitle.trim()) {
      toast.error('Please enter a title for your image');
      return;
    }

    const result = await uploadImage(selectedFile, imageTitle, imageDescription);
    
    if (result) {
      setSelectedFile(null);
      setImagePreview(null);
      setImageTitle("");
      setImageDescription("");
      setUploadModalOpen(false);
      toast.success('Image uploaded successfully!');
    }
  };

  const handleDeleteClick = (imageId: string, imageUrl: string) => {
    setCurrentImageId(imageId);
    setCurrentImage(imageUrl);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (currentImageId) {
      const success = await deleteImage(currentImageId, currentImage || '');
      if (success) {
        setDeleteConfirmOpen(false);
        setCurrentImageId(null);
        setCurrentImage(null);
        toast.success('Image deleted successfully');
      }
    }
  };

  const handlePreviewImage = (imageUrl: string) => {
    setCurrentImage(imageUrl);
    setPreviewModalOpen(true);
  };

  if (!user || !isArtist) {
    return (
      <div className="flex items-center justify-center p-6 bg-gray-50 rounded-md text-center">
        <div>
          <AlertCircle className="h-10 w-10 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">You need to be logged in as an artist to view and manage your portfolio.</p>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <div 
      ref={fadeInAnimation.ref as React.RefObject<HTMLDivElement>} 
      className={fadeInAnimation.className}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Your Portfolio</h3>
        <Button 
          onClick={() => setUploadModalOpen(true)}
          className="flex items-center gap-2"
          size={isMobile ? "sm" : "default"}
        >
          <Upload className="h-4 w-4" />
          <span>{isMobile ? "Upload" : "Upload New"}</span>
        </Button>
      </div>

      {isLoading ? (
        <div className="h-48 flex items-center justify-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader className="h-6 w-6 text-primary" />
          </motion.div>
          <span className="ml-2">Loading portfolio...</span>
        </div>
      ) : images.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-50 rounded-lg p-8 text-center"
        >
          <div className="bg-white w-16 h-16 mx-auto rounded-full flex items-center justify-center shadow-sm mb-4">
            <Image className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">Your portfolio is empty</h3>
          <p className="text-gray-500 mb-4">Upload your best work to showcase your skills</p>
          <Button onClick={() => setUploadModalOpen(true)}>
            Upload Your First Image
          </Button>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4"
        >
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              className="relative group rounded-md overflow-hidden bg-gray-100 aspect-square"
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                onClick={() => handlePreviewImage(image.url)}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <h4 className="text-white font-medium truncate">{image.title}</h4>
                {image.description && (
                  <p className="text-white/80 text-sm line-clamp-2">{image.description}</p>
                )}
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(image.id, image.url);
                }}
                aria-label="Delete image"
              >
                <Trash2 className="h-4 w-4" />
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Upload Modal */}
      <Dialog open={uploadModalOpen} onOpenChange={setUploadModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Portfolio Image</DialogTitle>
            <DialogDescription>
              Add new work to your portfolio. Accepted formats: JPG, PNG, WebP (max 5MB)
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {!imagePreview ? (
              <div
                className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
                  dragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary/50"
                }`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleFileInputChange}
                />
                <div className="flex flex-col items-center justify-center text-center h-32">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm font-medium mb-1">
                    Drag & drop your image here or click to browse
                  </p>
                  <p className="text-xs text-gray-500">
                    JPG, PNG, WebP (max 5MB)
                  </p>
                </div>
              </div>
            ) : (
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                />
                <button
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                  onClick={() => {
                    setSelectedFile(null);
                    setImagePreview(null);
                  }}
                  aria-label="Remove image"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            <div className="space-y-3">
              <div>
                <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
                <Input
                  id="title"
                  value={imageTitle}
                  onChange={(e) => setImageTitle(e.target.value)}
                  placeholder="E.g., Summer Nail Design"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  value={imageDescription}
                  onChange={(e) => setImageDescription(e.target.value)}
                  placeholder="Tell us about this design..."
                  className="mt-1 resize-none"
                  rows={3}
                />
              </div>
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
          </div>

          <DialogFooter className="sm:justify-between">
            <Button
              variant="ghost"
              onClick={() => {
                setUploadModalOpen(false);
                setSelectedFile(null);
                setImagePreview(null);
                setImageTitle("");
                setImageDescription("");
              }}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={isUploading || !selectedFile || !imageTitle.trim()}
              className="flex items-center gap-2"
            >
              {isUploading ? (
                <>
                  <Loader className="h-4 w-4 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  <span>Upload</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Modal */}
      <Dialog open={previewModalOpen} onOpenChange={setPreviewModalOpen}>
        <DialogContent className="sm:max-w-3xl h-auto max-h-[90vh] p-0 overflow-hidden bg-black">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <img
              src={currentImage || ''}
              alt="Preview"
              className="max-w-full max-h-[80vh] object-contain"
            />
            <button
              className="absolute top-3 right-3 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
              onClick={() => setPreviewModalOpen(false)}
              aria-label="Close preview"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Portfolio Image</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this image? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-end space-x-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setDeleteConfirmOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PortfolioGallery;
