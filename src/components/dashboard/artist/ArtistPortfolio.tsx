
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { Upload, Trash2, X, Plus, Loader2, Image as ImageIcon, ZoomIn } from "lucide-react";
import { useArtistData } from "./context/ArtistDataContext";

interface PortfolioImage {
  id: string;
  url: string;
  name: string;
}

const ArtistPortfolio = () => {
  const { user } = useAuth();
  const { artistProfile, refreshArtistProfile } = useArtistData();
  const { toast } = useToast();
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedImage, setSelectedImage] = useState<PortfolioImage | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load portfolio images from user profile
  useEffect(() => {
    if (artistProfile && artistProfile.portfolio_urls) {
      const loadedImages = (artistProfile.portfolio_urls || []).map((url, index) => ({
        id: `${index}-${new Date().getTime()}`,
        url,
        name: url.split('/').pop() || `image-${index}`
      }));
      setImages(loadedImages);
    }
    setIsLoading(false);
  }, [artistProfile]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files.length || !user) return;

    // Check if adding these files would exceed the 12 image limit
    if (images.length + files.length > 12) {
      toast({
        title: "Upload limit reached",
        description: `You can only have up to 12 portfolio images. You currently have ${images.length}.`,
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const uploadedUrls: string[] = [];
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      try {
        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
          .from('portfolio_images')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (error) throw error;

        // Get the public URL
        const { data: urlData } = supabase.storage
          .from('portfolio_images')
          .getPublicUrl(data.path);

        uploadedUrls.push(urlData.publicUrl);
        successCount++;
        
        // Update progress
        setUploadProgress(Math.round((i + 1) / files.length * 100));
      } catch (error) {
        console.error("Error uploading file:", error);
        errorCount++;
      }
    }

    // Update user profile with new images
    if (uploadedUrls.length > 0) {
      try {
        const currentUrls = artistProfile?.portfolio_urls || [];
        const updatedUrls = [...currentUrls, ...uploadedUrls];
        
        const { error } = await supabase
          .from('users')
          .update({ portfolio_urls: updatedUrls })
          .eq('id', user.id);

        if (error) throw error;

        // Update local state
        const newImages = uploadedUrls.map((url, index) => ({
          id: `new-${index}-${new Date().getTime()}`,
          url,
          name: url.split('/').pop() || `image-${index + images.length}`
        }));

        setImages([...images, ...newImages]);
        
        toast({
          title: "Upload complete",
          description: `Successfully uploaded ${successCount} image${successCount !== 1 ? 's' : ''}.`
        });
        
        // Refresh user profile to get updated portfolio_urls
        refreshArtistProfile();
      } catch (error) {
        console.error("Error updating user profile:", error);
        toast({
          title: "Error updating profile",
          description: "Your images were uploaded but we couldn't update your profile. Please try again.",
          variant: "destructive"
        });
      }
    }

    if (errorCount > 0) {
      toast({
        title: "Upload issues",
        description: `${errorCount} image${errorCount !== 1 ? 's' : ''} failed to upload.`,
        variant: "destructive"
      });
    }

    setIsUploading(false);
    setUploadProgress(0);
    
    // Reset the file input
    e.target.value = '';
  };

  const handleDeleteImage = async (imageToDelete: PortfolioImage) => {
    if (!user || !artistProfile) return;

    try {
      // Get the file path from the URL
      const filePath = imageToDelete.url.split('portfolio_images/')[1];
      
      if (filePath) {
        // Try to delete from storage - this might fail if the file doesn't exist
        // but we still want to remove it from the user's profile
        await supabase.storage
          .from('portfolio_images')
          .remove([filePath]);
      }

      // Update user profile
      const updatedUrls = (artistProfile.portfolio_urls || []).filter(url => url !== imageToDelete.url);
      
      const { error } = await supabase
        .from('users')
        .update({ portfolio_urls: updatedUrls })
        .eq('id', user.id);

      if (error) throw error;

      // Update local state
      setImages(images.filter(img => img.id !== imageToDelete.id));
      
      toast({
        title: "Image deleted",
        description: "The portfolio image has been removed."
      });
      
      // Refresh user profile
      refreshArtistProfile();
    } catch (error) {
      console.error("Error deleting image:", error);
      toast({
        title: "Error deleting image",
        description: "There was a problem removing the image. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-serif">My Portfolio</CardTitle>
          <CardDescription>Showcase your best work to attract clients</CardDescription>
        </div>
        
        <div>
          <input
            type="file"
            id="portfolio-upload"
            className="hidden"
            accept="image/png, image/jpeg, image/webp"
            multiple
            onChange={handleFileUpload}
            disabled={isUploading}
          />
          <label htmlFor="portfolio-upload">
            <Button asChild={!isUploading} disabled={isUploading}>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading {uploadProgress}%
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Images
                </>
              )}
            </Button>
          </label>
        </div>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-16 bg-muted/30 rounded-lg border border-dashed">
            <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground text-lg">No portfolio yet. Upload your best work to start attracting clients!</p>
            <label htmlFor="portfolio-upload" className="inline-block mt-4">
              <Button variant="outline" className="mt-2">
                <Plus className="mr-2 h-4 w-4" />
                Add Portfolio Images
              </Button>
            </label>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div key={image.id} className="group relative">
                <div className="relative aspect-square rounded-md overflow-hidden border bg-muted/20">
                  <img 
                    src={image.url} 
                    alt={image.name}
                    className="object-cover w-full h-full transition-transform group-hover:scale-105 duration-300"
                    onClick={() => setSelectedImage(image)}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button 
                      className="bg-white/90 p-2 rounded-full"
                      onClick={() => setSelectedImage(image)}
                    >
                      <ZoomIn className="h-5 w-5 text-gray-700" />
                    </button>
                  </div>
                </div>
                
                <button
                  className="absolute top-2 right-2 p-1 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleDeleteImage(image)}
                >
                  <Trash2 className="h-4 w-4 text-white" />
                </button>
              </div>
            ))}
          </div>
        )}
        
        {/* Image Preview Dialog */}
        <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <span>{selectedImage?.name}</span>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </DialogTitle>
            </DialogHeader>
            <div className="max-h-[70vh] overflow-hidden">
              <AspectRatio ratio={1}>
                <img 
                  src={selectedImage?.url} 
                  alt={selectedImage?.name || "Portfolio image"} 
                  className="object-contain w-full h-full"
                />
              </AspectRatio>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ArtistPortfolio;
