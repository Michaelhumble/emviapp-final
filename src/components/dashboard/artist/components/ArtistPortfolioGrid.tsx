import { useState } from "react";
import { Trash2, ZoomIn, Loader2, ImageIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabaseBypass } from "@/types/supabase-bypass";
import ArtistPortfolioViewer from "./ArtistPortfolioViewer";
import { useAuth } from "@/context/auth";
import { PortfolioImage } from "../types/ArtistDashboardTypes";

interface ArtistPortfolioGridProps {
  images: PortfolioImage[];
  isLoading: boolean;
}

const ArtistPortfolioGrid = ({ images, isLoading }: ArtistPortfolioGridProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [viewImage, setViewImage] = useState<PortfolioImage | null>(null);

  const handleDeleteImage = async (imageToDelete: PortfolioImage) => {
    if (!user) return;

    try {
      // Get the file path from the URL
      const filePath = imageToDelete.url.split('portfolio_images/')[1];
      
      if (filePath) {
        // Try to delete from storage - this might fail if the file doesn't exist
        // but we still want to remove it from the user's profile
        await supabaseBypass.storage
          .from('portfolio_images')
          .remove([filePath]);
      }

      // Update user profile
      const { data: userData } = await supabaseBypass
        .from('profiles')
        .select('portfolio_urls')
        .eq('id', user.id)
        .single();

      if (userData) {
        const updatedUrls = (userData.portfolio_urls || []).filter(url => url !== imageToDelete.url);
        
        const { error } = await supabaseBypass
          .from('profiles')
          .update({ portfolio_urls: updatedUrls })
          .eq('id', user.id);

        if (error) throw error;
        
        toast({
          title: "Image deleted",
          description: "The portfolio image has been removed."
        });
        
        // Force refresh the current page to update the images
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      toast({
        title: "Error deleting image",
        description: "There was a problem removing the image. Please try again.",
        variant: "error"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (images.length === 0) {
    return (
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
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div key={image.id} className="group relative">
            <div className="relative aspect-square rounded-md overflow-hidden border bg-muted/20">
              <img 
                src={image.url} 
                alt={image.name || "Portfolio image"}
                className="object-cover w-full h-full transition-transform group-hover:scale-105 duration-300"
                onClick={() => setViewImage(image)}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button 
                  className="bg-white/90 p-2 rounded-full"
                  onClick={() => setViewImage(image)}
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
      
      {/* Image Viewer Modal */}
      <ArtistPortfolioViewer 
        image={viewImage}
        onClose={() => setViewImage(null)}
      />
    </>
  );
};

export default ArtistPortfolioGrid;
