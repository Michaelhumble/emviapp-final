
import { useState } from "react";
import { useAuth } from "@/context/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ImagePlus, 
  PlusCircle, 
  X, 
  Image as ImageIcon, 
  AlertCircle, 
  Loader2
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ArtistPortfolio = () => {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const portfolioImages = userProfile?.portfolio_urls || [];
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !user) {
      return;
    }
    
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const filePath = `${user.id}/portfolio/${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    setUploading(true);
    
    try {
      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(filePath, file);
      
      if (uploadError) throw uploadError;
      
      // Get the public URL
      const { data } = supabase.storage
        .from('portfolio')
        .getPublicUrl(filePath);
      
      const publicUrl = data.publicUrl;
      
      // Update user profile with new portfolio image
      const updatedPortfolio = [...portfolioImages, publicUrl];
      
      const { error: updateError } = await supabase
        .from('users')
        .update({
          portfolio_urls: updatedPortfolio,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (updateError) throw updateError;
      
      // Refresh user profile to get updated data
      await refreshUserProfile();
      
      toast.success("Portfolio image added successfully");
    } catch (error) {
      console.error('Error uploading portfolio image:', error);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };
  
  const handleRemoveImage = async (imageUrl: string) => {
    if (!user) return;
    
    try {
      // Remove from portfolio_urls array
      const updatedPortfolio = portfolioImages.filter(url => url !== imageUrl);
      
      const { error } = await supabase
        .from('users')
        .update({
          portfolio_urls: updatedPortfolio,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Refresh user profile
      await refreshUserProfile();
      
      toast.success("Image removed from portfolio");
    } catch (error) {
      console.error('Error removing portfolio image:', error);
      toast.error("Failed to remove image. Please try again.");
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <ImageIcon className="mr-2 h-5 w-5 text-primary" />
          My Portfolio
        </CardTitle>
      </CardHeader>
      <CardContent>
        {portfolioImages.length === 0 ? (
          <div className="py-10 text-center">
            <ImageIcon className="h-12 w-12 mx-auto text-gray-300 mb-3" />
            <h3 className="text-lg font-medium mb-2">No portfolio images yet</h3>
            <p className="text-gray-500 mb-4 max-w-md mx-auto">
              Upload your best work to showcase your skills and attract more clients.
            </p>
            <Button 
              onClick={() => document.getElementById('portfolio-upload')?.click()}
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add First Image
                </>
              )}
            </Button>
            <input
              id="portfolio-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        ) : (
          <>
            {/* Image Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {portfolioImages.map((image, index) => (
                <div 
                  key={index} 
                  className="relative rounded-md overflow-hidden border h-48 group"
                  onClick={() => setSelectedImage(image)}
                >
                  <img 
                    src={image} 
                    alt={`Portfolio ${index + 1}`} 
                    className="w-full h-full object-cover cursor-pointer transition-all hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage(image);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {/* Add More Button */}
              <div className="border border-dashed rounded-md flex items-center justify-center h-48">
                <Button 
                  variant="ghost" 
                  className="h-full w-full rounded-md"
                  onClick={() => document.getElementById('portfolio-upload')?.click()}
                  disabled={uploading}
                >
                  {uploading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <div className="flex flex-col items-center">
                      <ImagePlus className="h-8 w-8 mb-2 text-gray-400" />
                      <span className="text-sm">Add More</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>
            
            <input
              id="portfolio-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            
            <Alert className="bg-blue-50 border-blue-100">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-sm text-blue-700">
                Images you upload here will be visible to clients browsing your profile.
                Show off your best work to attract more business!
              </AlertDescription>
            </Alert>
          </>
        )}
        
        {/* Image Preview Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh] w-full">
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute top-2 right-2 z-10 bg-white rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
              <img 
                src={selectedImage} 
                alt="Portfolio preview" 
                className="max-h-[90vh] max-w-full object-contain mx-auto"
                onClick={(e) => e.stopPropagation()} 
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ArtistPortfolio;
