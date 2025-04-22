
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Trash2, Upload, Image } from "lucide-react";
import { toast } from "sonner";
import { useArtistPortfolio, PortfolioItem } from "@/hooks/useArtistPortfolio";

const ArtistPortfolioGallery = () => {
  const {
    portfolio,
    isLoading,
    addPortfolioItem,
    deletePortfolioItem,
    uploading
  } = useArtistPortfolio();
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Only allow image files
      if (!file.type.match('image/jpeg') && !file.type.match('image/png') && !file.type.match('image/webp')) {
        toast.error(`File ${file.name} is not a supported image type`);
        return;
      }
      
      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
      
      // Set default title from filename
      if (!title) {
        setTitle(file.name.split('.')[0]);
      }
    }
  };
  
  // Handle image upload
  const handleUpload = async () => {
    if (!selectedFile || !title.trim()) {
      toast.error("Please select an image and provide a title");
      return;
    }
    
    const success = await addPortfolioItem(selectedFile, title.trim());
    if (success) {
      setSelectedFile(null);
      setPreview(null);
      setTitle('');
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };
  
  // Handle image deletion
  const handleDeleteImage = async (id: string, imageUrl: string) => {
    await deletePortfolioItem(id, imageUrl);
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
              ${uploading ? 'border-primary/50 bg-primary/5' : 'border-gray-200 hover:border-primary/30 hover:bg-gray-50'}
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
              accept="image/jpeg,image/png,image/webp"
            />
            
            {preview ? (
              <div className="relative max-h-[300px] overflow-hidden rounded-md mb-4">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="max-w-full h-auto mx-auto"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                    setPreview(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                {uploading ? (
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
                      JPG, PNG, WebP • Max 5MB per image
                    </p>
                  </>
                )}
              </div>
            )}
            
            {preview && (
              <div className="mt-4">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a title for your work"
                  className="w-full p-2 border rounded mb-4"
                  onClick={(e) => e.stopPropagation()}
                />
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpload();
                  }}
                  disabled={uploading || !title.trim()}
                  className="w-full"
                >
                  {uploading ? 'Uploading...' : 'Save to Portfolio'}
                </Button>
              </div>
            )}
          </div>
          
          {/* Image gallery grid */}
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square rounded-md bg-gray-100 animate-pulse" />
              ))}
            </div>
          ) : portfolio.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {portfolio.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="group relative aspect-square rounded-md overflow-hidden border border-gray-200"
                >
                  <img 
                    src={item.image_url} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteImage(item.id, item.image_url);
                      }}
                      size="sm"
                      variant="destructive"
                      className="rounded-full p-2 h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                    <p className="text-white text-sm font-medium truncate">{item.title}</p>
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
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ArtistPortfolioGallery;
