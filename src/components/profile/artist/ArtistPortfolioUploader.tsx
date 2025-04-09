
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Check, Image as ImageIcon } from "lucide-react";
import { useProfileCompletion } from "../hooks/useProfileCompletion";
import { v4 as uuidv4 } from "uuid";

// Import the components
import PortfolioUploadArea from "./components/PortfolioUploadArea";
import PortfolioImageGrid from "./components/PortfolioImageGrid";
import PortfolioInfo from "./components/PortfolioInfo";
import PortfolioEmptyState from "./components/PortfolioEmptyState";

const ArtistPortfolioUploader = () => {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const { markTaskComplete, isTaskComplete } = useProfileCompletion();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [portfolioImages, setPortfolioImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if portfolio task is already complete
  const portfolioTaskComplete = isTaskComplete("portfolio");

  // Load portfolio images on mount
  useEffect(() => {
    if (userProfile?.portfolio_urls && userProfile.portfolio_urls.length > 0) {
      setPortfolioImages(userProfile.portfolio_urls);
      console.log("Loaded portfolio images:", userProfile.portfolio_urls);
    }
  }, [userProfile]);

  const createBucketIfNeeded = async () => {
    try {
      // Check if bucket exists
      const { data: buckets } = await supabase.storage.listBuckets();
      
      const portfolioBucketExists = buckets?.some(bucket => bucket.name === 'portfolio_images');
      
      // Create bucket if it doesn't exist
      if (!portfolioBucketExists) {
        console.log("Creating portfolio_images bucket");
        const { error: bucketError } = await supabase
          .storage
          .createBucket('portfolio_images', {
            public: true,
            fileSizeLimit: 5 * 1024 * 1024
          });
          
        if (bucketError) {
          console.error("Error creating bucket:", bucketError);
          // Continue anyway, might be permissions issue but bucket exists
        }
      }
    } catch (error) {
      console.error("Error checking/creating bucket:", error);
      // Continue anyway as the bucket might exist but user doesn't have permission to list
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files.length || !user) return;

    // Check if adding these files would exceed the 12 image limit
    if (portfolioImages.length + files.length > 12) {
      toast.error(`You can only have up to 12 portfolio images. You currently have ${portfolioImages.length}.`);
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    toast.info("Uploading portfolio images...");

    // Ensure bucket exists
    await createBucketIfNeeded();

    const uploadedUrls: string[] = [];
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        toast.error(`File ${file.name} is not a valid image type. Please upload JPG, PNG, or WEBP files.`);
        errorCount++;
        continue;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`File ${file.name} exceeds the 5MB size limit.`);
        errorCount++;
        continue;
      }
      
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/${uuidv4()}.${fileExt}`;

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
        const updatedUrls = [...portfolioImages, ...uploadedUrls];
        setPortfolioImages(updatedUrls);
        
        const { error } = await supabase
          .from('users')
          .update({ 
            portfolio_urls: updatedUrls,
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);

        if (error) throw error;
        
        // Mark task as complete if this is the first upload
        if (!portfolioTaskComplete && updatedUrls.length > 0) {
          markTaskComplete("portfolio");
        }
        
        // Refresh user profile in auth context
        await refreshUserProfile();
        
        toast.success(
          `Successfully uploaded ${successCount} image${successCount !== 1 ? 's' : ''}.`
        );
      } catch (error: any) {
        console.error("Error updating user profile:", error);
        toast.error(error.message || "Failed to update portfolio images");
      } finally {
        setIsUploading(false);
        setUploadProgress(0);
      }
    } else {
      setIsUploading(false);
      setUploadProgress(0);
    }

    if (errorCount > 0) {
      toast.error(`${errorCount} image${errorCount !== 1 ? 's' : ''} failed to upload.`);
    }
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = async (urlToRemove: string) => {
    if (!user || isUploading) return;

    try {
      setIsUploading(true);
      toast.info("Removing image...");

      // Remove from local state first for immediate UI feedback
      const updatedImages = portfolioImages.filter(url => url !== urlToRemove);
      setPortfolioImages(updatedImages);

      // Extract the file path from the URL
      const filePath = urlToRemove.split('portfolio_images/')[1];
      
      if (filePath) {
        // Try to remove the file from storage
        await supabase.storage
          .from('portfolio_images')
          .remove([filePath]);
      }

      // Update the user profile
      const { error } = await supabase
        .from('users')
        .update({ 
          portfolio_urls: updatedImages,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      // Refresh the user profile
      await refreshUserProfile();
      toast.success("Image removed from portfolio");
    } catch (error: any) {
      console.error("Error removing portfolio image:", error);
      toast.error(error.message || "Failed to remove image");
      // Restore the original state on failure
      if (userProfile?.portfolio_urls) {
        setPortfolioImages(userProfile.portfolio_urls);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const dragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const dropHandler = (e: React.DragEvent) => {
    e.preventDefault();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0 && fileInputRef.current) {
      fileInputRef.current.files = e.dataTransfer.files;
      handleFileChange({ target: { files: e.dataTransfer.files } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <Card className="shadow-sm border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          Showcase Your Work
          {portfolioTaskComplete && (
            <span className="ml-2 text-green-500">
              <Check className="h-5 w-5" />
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex flex-col space-y-4">
          {/* Drag and drop area */}
          <PortfolioUploadArea
            onFileChange={handleFileChange}
            isUploading={isUploading}
            uploadProgress={uploadProgress}
            fileInputRef={fileInputRef}
            dragOver={dragOver}
            dropHandler={dropHandler}
          />

          {/* Portfolio limit info */}
          <PortfolioInfo imageCount={portfolioImages.length} />

          {/* Empty state or portfolio grid */}
          {portfolioImages.length === 0 ? (
            <PortfolioEmptyState isUploading={isUploading} />
          ) : (
            <PortfolioImageGrid 
              images={portfolioImages}
              onRemoveImage={handleRemoveImage}
              isUploading={isUploading}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistPortfolioUploader;
