
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Image as ImageIcon, 
  Upload, 
  Trash2, 
  ZoomIn, 
  Loader2, 
  Check, 
  Plus,
  XCircle
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { motion, AnimatePresence } from "framer-motion";

interface PortfolioImage {
  id: string;
  url: string;
  name: string;
  category?: string;
  tags?: string[];
  created_at?: string;
}

const CATEGORIES = [
  "All",
  "Nail Art",
  "Acrylic",
  "Gel",
  "Pedicure",
  "Manicure",
  "Extensions",
  "3D Design",
  "French",
  "Seasonal",
  "Wedding"
];

const TAGS = [
  "Bridal",
  "Chrome",
  "Ombré",
  "Geometric",
  "Floral",
  "Glitter",
  "Matte",
  "Minimalist",
  "Colorful",
  "Holiday"
];

const ArtistPortfolioSection = () => {
  const { toast } = useToast();
  const { user, userProfile, refreshUserProfile } = useAuth();
  const [portfolioImages, setPortfolioImages] = useState<PortfolioImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [viewImage, setViewImage] = useState<PortfolioImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [editImage, setEditImage] = useState<PortfolioImage | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [imageToDelete, setImageToDelete] = useState<PortfolioImage | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch portfolio images
  useEffect(() => {
    fetchPortfolioImages();
  }, [user]);

  const fetchPortfolioImages = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Get portfolio URLs from user profile
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('portfolio_urls')
        .eq('id', user.id)
        .single();
      
      if (userError) throw userError;
      
      if (userData && userData.portfolio_urls && userData.portfolio_urls.length > 0) {
        // Convert the URLs to portfolio image objects
        const imageObjects: PortfolioImage[] = userData.portfolio_urls.map((url: string, index: number) => ({
          id: `${index}-${new Date().getTime()}`,
          url: url,
          name: url.split('/').pop() || `Image ${index + 1}`,
          category: Math.random() > 0.5 ? CATEGORIES[Math.floor(Math.random() * (CATEGORIES.length - 1)) + 1] : undefined,
          tags: Math.random() > 0.7 ? [TAGS[Math.floor(Math.random() * TAGS.length)]] : undefined
        }));
        
        setPortfolioImages(imageObjects);
      } else {
        setPortfolioImages([]);
      }
    } catch (error) {
      console.error("Error fetching portfolio images:", error);
      toast({
        title: "Error loading portfolio",
        description: "There was a problem loading your portfolio. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !user) return;
    
    setUploadError(null);
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      const uploadedUrls: string[] = [];
      
      // Upload each file
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Validate file type
        if (!['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.type)) {
          throw new Error(`File ${file.name} is not a supported image type`);
        }
        
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          throw new Error(`File ${file.name} exceeds 5MB size limit`);
        }
        
        // Create a unique file name
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        
        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
          .from('portfolio_images')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
          });
        
        if (error) throw error;
        
        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('portfolio_images')
          .getPublicUrl(fileName);
        
        uploadedUrls.push(publicUrl);
        
        // Update progress
        setUploadProgress(Math.round(((i + 1) / files.length) * 100));
      }
      
      // Get existing portfolio URLs
      const { data: userData } = await supabase
        .from('users')
        .select('portfolio_urls')
        .eq('id', user.id)
        .single();
      
      const existingUrls = userData?.portfolio_urls || [];
      const updatedUrls = [...existingUrls, ...uploadedUrls];
      
      // Update user profile with new portfolio URLs
      const { error: updateError } = await supabase
        .from('users')
        .update({ portfolio_urls: updatedUrls })
        .eq('id', user.id);
      
      if (updateError) throw updateError;
      
      // Refresh user profile
      await refreshUserProfile();
      
      // Add new images to state
      const newImages: PortfolioImage[] = uploadedUrls.map((url, index) => ({
        id: `${new Date().getTime()}-${index}`,
        url,
        name: url.split('/').pop() || `New Image ${index + 1}`
      }));
      
      setPortfolioImages(prev => [...prev, ...newImages]);
      
      toast({
        title: "Images uploaded successfully",
        description: `${files.length} image${files.length > 1 ? 's' : ''} added to your portfolio`,
        variant: "default"
      });
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      setUploadError(error instanceof Error ? error.message : "Failed to upload images");
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload images",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = async (image: PortfolioImage) => {
    if (!user) return;
    setImageToDelete(null);
    
    try {
      // Get the file path from the URL
      const filePath = image.url.split('portfolio_images/')[1];
      
      if (filePath) {
        // Delete from storage - this might fail if the file doesn't exist
        // but we still want to remove it from the user's profile
        await supabase.storage
          .from('portfolio_images')
          .remove([filePath]);
      }

      // Update user profile
      const { data: userData } = await supabase
        .from('users')
        .select('portfolio_urls')
        .eq('id', user.id)
        .single();

      if (userData) {
        const updatedUrls = (userData.portfolio_urls || []).filter(url => url !== image.url);
        
        const { error } = await supabase
          .from('users')
          .update({ portfolio_urls: updatedUrls })
          .eq('id', user.id);

        if (error) throw error;
        
        // Update local state
        setPortfolioImages(prev => prev.filter(img => img.url !== image.url));
        
        // Refresh user profile
        await refreshUserProfile();
        
        toast({
          title: "Image deleted",
          description: "The portfolio image has been removed."
        });
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      toast({
        title: "Error deleting image",
        description: "There was a problem removing the image. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleUpdateImageDetails = async () => {
    if (!editImage) return;
    
    // In a real app, we would update metadata in the database
    // For this demo, we'll just update the local state
    setPortfolioImages(prev => 
      prev.map(img => 
        img.id === editImage.id 
          ? { ...img, category: editImage.category, tags: editImage.tags } 
          : img
      )
    );
    
    toast({
      title: "Image updated",
      description: "Portfolio image details have been updated."
    });
    
    setEditImage(null);
  };
  
  const handleAddTag = () => {
    if (!newTag.trim() || !editImage) return;
    
    const tag = newTag.trim();
    if (editImage.tags?.includes(tag)) {
      toast({
        title: "Tag already exists",
        description: "This tag is already added to the image."
      });
      return;
    }
    
    setEditImage({
      ...editImage,
      tags: [...(editImage.tags || []), tag]
    });
    
    setNewTag("");
  };
  
  const handleRemoveTag = (tag: string) => {
    if (!editImage) return;
    
    setEditImage({
      ...editImage,
      tags: editImage.tags?.filter(t => t !== tag)
    });
  };
  
  const filteredImages = portfolioImages.filter(image => 
    selectedCategory === "All" || image.category === selectedCategory
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-serif">Portfolio Gallery</CardTitle>
        <CardDescription>
          Showcase your best work to attract clients
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {/* Upload Section */}
        <div className="mb-6">
          <Label htmlFor="portfolio-upload" className="mb-2 block">Upload Portfolio Images</Label>
          <div 
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              isUploading ? 'bg-primary/5 border-primary/40' : 'bg-muted/30 border-border hover:border-primary/30 hover:bg-primary/5'
            } cursor-pointer`}
            onClick={() => !isUploading && fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/jpeg,image/jpg,image/png,image/webp"
              className="hidden"
              id="portfolio-upload"
              disabled={isUploading}
              multiple
            />
            
            {isUploading ? (
              <div className="flex flex-col items-center justify-center py-4">
                <Loader2 className="h-10 w-10 text-primary animate-spin mb-2" />
                <p className="text-sm font-medium">Uploading... {uploadProgress}%</p>
              </div>
            ) : uploadError ? (
              <div className="flex flex-col items-center justify-center py-4 text-destructive">
                <XCircle className="h-10 w-10 mb-2" />
                <p className="text-sm font-medium mb-1">Upload failed</p>
                <p className="text-xs">{uploadError}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setUploadError(null);
                  }}
                >
                  Try Again
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-4">
                <Upload className="h-10 w-10 text-muted-foreground mb-2" strokeWidth={1.5} />
                <p className="text-sm font-medium">Drag & drop images here</p>
                <p className="text-xs text-muted-foreground mt-1">or click to browse</p>
                <Button type="button" className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Images
                </Button>
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Supported formats: JPEG, PNG, WebP. Maximum size: 5MB per image.
          </p>
        </div>

        {/* Category Filter Tabs */}
        {portfolioImages.length > 0 && (
          <div className="mb-6">
            <Tabs defaultValue="All" value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="mb-4 flex flex-wrap h-auto">
                {CATEGORIES.map((category) => (
                  <TabsTrigger key={category} value={category} className="mb-1">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        )}
        
        {/* Image Gallery */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square bg-muted animate-pulse rounded-md"></div>
            ))}
          </div>
        ) : portfolioImages.length === 0 ? (
          <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed">
            <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-medium mb-2">Your portfolio is empty</h3>
            <p className="text-muted-foreground mb-4 max-w-md mx-auto">
              Upload photos of your best work to attract clients and showcase your talent.
            </p>
            <Button onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Your First Image
            </Button>
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No images in the "{selectedCategory}" category.</p>
            <Button variant="link" onClick={() => setSelectedCategory("All")}>
              Show all images
            </Button>
          </div>
        ) : (
          <AnimatePresence>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="group relative"
                >
                  <div className="relative aspect-square rounded-md overflow-hidden border bg-muted/20">
                    <img 
                      src={image.url} 
                      alt={image.name || "Portfolio image"}
                      className="object-cover w-full h-full transition-transform group-hover:scale-105 duration-300"
                      onClick={() => setViewImage(image)}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="secondary" 
                          className="rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            setViewImage(image);
                          }}
                        >
                          <ZoomIn className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="secondary" 
                          className="rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditImage(image);
                          }}
                        >
                          <ImageIcon className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          className="rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            setImageToDelete(image);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Category and Tags */}
                  {(image.category || (image.tags && image.tags.length > 0)) && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {image.category && (
                        <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                          {image.category}
                        </Badge>
                      )}
                      {image.tags?.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </CardContent>

      {/* Image Viewer Dialog */}
      <Dialog open={!!viewImage} onOpenChange={(open) => !open && setViewImage(null)}>
        <DialogContent className="max-w-4xl p-1 sm:p-6 overflow-hidden">
          {viewImage && (
            <div className="relative">
              <div className="flex justify-end absolute top-2 right-2 z-10">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-black/30 text-white border-0 hover:bg-black/50"
                  onClick={() => setViewImage(null)}
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              </div>
              <img
                src={viewImage.url}
                alt={viewImage.name || "Portfolio preview"}
                className="w-full h-auto object-contain max-h-[80vh]"
              />
              <div className="p-4">
                {viewImage.category && (
                  <Badge className="mb-2 mr-2">{viewImage.category}</Badge>
                )}
                {viewImage.tags?.map(tag => (
                  <Badge key={tag} variant="outline" className="mb-2 mr-2">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Image Dialog */}
      <Dialog open={!!editImage} onOpenChange={(open) => !open && setEditImage(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Image Details</DialogTitle>
            <DialogDescription>
              Categorize and tag your portfolio image
            </DialogDescription>
          </DialogHeader>

          {editImage && (
            <div className="grid gap-4 py-4">
              <div className="flex justify-center mb-4">
                <img 
                  src={editImage.url} 
                  alt={editImage.name} 
                  className="h-40 object-contain rounded-md"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={editImage.category || ""}
                  onChange={(e) => setEditImage({...editImage, category: e.target.value})}
                >
                  <option value="">No Category</option>
                  {CATEGORIES.filter(c => c !== "All").map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex flex-wrap gap-1 mb-2">
                  {editImage.tags?.map(tag => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:text-destructive"
                      >
                        <XCircle className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {!editImage.tags?.length && (
                    <span className="text-xs text-muted-foreground">No tags added yet</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Input
                    id="new-tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a new tag"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={handleAddTag}
                    disabled={!newTag.trim()}
                  >
                    Add
                  </Button>
                </div>
                <div className="mt-1">
                  <p className="text-xs text-muted-foreground mb-1">Suggested tags:</p>
                  <div className="flex flex-wrap gap-1">
                    {TAGS.slice(0, 8).map(tag => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className="cursor-pointer"
                        onClick={() => {
                          if (!editImage.tags?.includes(tag)) {
                            setEditImage({
                              ...editImage,
                              tags: [...(editImage.tags || []), tag]
                            });
                          }
                        }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditImage(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateImageDetails}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!imageToDelete} onOpenChange={(open) => !open && setImageToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Image</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this image from your portfolio? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {imageToDelete && (
            <div className="flex justify-center py-4">
              <img 
                src={imageToDelete.url} 
                alt="To be deleted" 
                className="h-40 object-contain rounded-md"
              />
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setImageToDelete(null)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => imageToDelete && handleDeleteImage(imageToDelete)}
            >
              Delete Image
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ArtistPortfolioSection;
