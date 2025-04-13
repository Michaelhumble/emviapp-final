
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Trash2, Upload, Image } from "lucide-react";
import { toast } from "sonner";

// Define the portfolio item structure
interface PortfolioItem {
  id: string;
  url: string;
}

const ArtistPortfolioGallery = () => {
  const [images, setImages] = useState<PortfolioItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);
      
      // Convert FileList to array for easier processing
      const newFiles = Array.from(e.target.files);
      
      // Process each file
      const promises = newFiles.map(file => {
        return new Promise<PortfolioItem>((resolve) => {
          // Only allow image files
          if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
            toast.error(`File ${file.name} is not a supported image type`);
            return;
          }
          
          // Mock file upload with temporary URL
          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target?.result) {
              resolve({
                id: Date.now() + Math.random().toString(36).substring(2, 9),
                url: event.target.result as string
              });
            }
          };
          reader.readAsDataURL(file);
        });
      });
      
      // Add all valid images to state
      Promise.all(promises.filter(Boolean) as Promise<PortfolioItem>[])
        .then(newImages => {
          setImages(prev => [...prev, ...newImages]);
          setIsUploading(false);
          toast.success(`${newImages.length} images added to your portfolio`);
        });
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };
  
  // Handle image deletion
  const handleDeleteImage = (id: string) => {
    setImages(prev => prev.filter(image => image.id !== id));
    toast.success("Image removed from your portfolio");
  };
  
  // Handle drag events for drag-and-drop functionality
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const changeEvent = {
        target: {
          files: e.dataTransfer.files
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      handleFileChange(changeEvent);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-6"
    >
      <Card className="border-purple-100 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-serif">My Portfolio</CardTitle>
          <CardDescription>
            A place to showcase your best work.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {/* Upload area */}
          <div 
            className={`
              border-2 border-dashed rounded-lg p-6 text-center mb-6
              ${isUploading ? 'border-primary/50 bg-primary/5' : 'border-gray-200 hover:border-primary/30 hover:bg-gray-50'}
              transition-colors cursor-pointer
            `}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              multiple
              accept="image/jpeg,image/png"
            />
            
            <div className="flex flex-col items-center">
              {isUploading ? (
                <div className="animate-pulse">
                  <Upload className="h-12 w-12 text-primary/70 mb-3" />
                  <p className="text-sm font-medium">Uploading...</p>
                </div>
              ) : (
                <>
                  <Upload className="h-12 w-12 text-gray-400 mb-3" />
                  <p className="text-sm font-medium mb-1">
                    Drag & drop your photos or click to browse
                  </p>
                  <p className="text-xs text-gray-500">
                    JPG, PNG • Max 5MB per image
                  </p>
                </>
              )}
            </div>
          </div>
          
          {/* Image gallery grid */}
          {images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="group relative aspect-square rounded-md overflow-hidden border border-gray-200"
                >
                  <img 
                    src={image.url} 
                    alt="Portfolio item" 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteImage(image.id);
                      }}
                      size="sm"
                      variant="destructive"
                      className="rounded-full p-2 h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Image className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium">
                You haven't uploaded any photos yet.
              </h3>
              <p className="text-sm text-gray-500 mt-1 mb-4 max-w-md mx-auto">
                Upload photos of your best work to showcase your talent and skills.
              </p>
              <Button onClick={() => fileInputRef.current?.click()}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Photos
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ArtistPortfolioGallery;
