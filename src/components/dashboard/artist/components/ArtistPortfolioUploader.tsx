import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "@/context/auth/types";
import { useAuth } from "@/context/auth";
import { useArtistData } from "../context/ArtistDataContext";

interface ArtistPortfolioUploaderProps {
  onComplete: () => void;
}

const ArtistPortfolioUploader = ({ onComplete }: ArtistPortfolioUploaderProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { artistProfile, refreshArtistProfile } = useArtistData();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files.length || !user) return;

    // Check if adding these files would exceed the 12 image limit
    const currentImages = artistProfile?.portfolio_urls || [];
    if (currentImages.length + files.length > 12) {
      toast({
        title: "Upload limit reached",
        description: `You can only have up to 12 portfolio images. You currently have ${currentImages.length}.`,
        variant: "error"
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
        
        toast({
          title: "Upload complete",
          description: `Successfully uploaded ${successCount} image${successCount !== 1 ? 's' : ''}.`
        });
        
        // Refresh artist profile data
        await refreshArtistProfile();
        
        // Call onComplete to notify parent
        onComplete();
      } catch (error) {
        console.error("Error updating user profile:", error);
        toast({
          title: "Error updating profile",
          description: "Your images were uploaded but we couldn't update your profile. Please try again.",
          variant: "error"
        });
      }
    }

    if (errorCount > 0) {
      toast({
        title: "Upload issues",
        description: `${errorCount} image${errorCount !== 1 ? 's' : ''} failed to upload.`,
        variant: "error"
      });
    }

    setIsUploading(false);
    setUploadProgress(0);
    
    // Reset the file input
    e.target.value = '';
  };

  return (
    <div className="p-4 bg-purple-50/50 rounded-lg border border-purple-100">
      <h3 className="text-lg font-medium mb-3">Upload Portfolio Images</h3>
      <p className="text-gray-500 mb-4">
        Show your best work to attract clients.
        Images should be clear and high quality.
        <br/>
        <span className="text-sm italic mt-1 inline-block">
          Maximum 12 images total. Files must be JPG, PNG or WEBP format.
        </span>
      </p>
      
      <input
        type="file"
        id="portfolio-upload"
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
        multiple
        onChange={handleFileUpload}
        disabled={isUploading}
      />
      <div className="flex items-center gap-4">
        <label htmlFor="portfolio-upload">
          <Button asChild={!isUploading} disabled={isUploading} variant="default">
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading {uploadProgress}%
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Select Images
              </>
            )}
          </Button>
        </label>
        
        {!isUploading && (
          <Button variant="outline" type="button" onClick={onComplete}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};

export default ArtistPortfolioUploader;
