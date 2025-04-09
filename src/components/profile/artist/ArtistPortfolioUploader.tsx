
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CloudUpload, Loader2, X, Image, AlertCircle, Check } from "lucide-react";
import { useProfileCompletion } from "../hooks/useProfileCompletion";
import { v4 as uuidv4 } from "uuid";

const ArtistPortfolioUploader = () => {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const { markTaskComplete, isTaskComplete } = useProfileCompletion();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [portfolioImages, setPortfolioImages] = useState<string[]>(
    userProfile?.portfolio_urls || []
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if portfolio task is already complete
  const portfolioTaskComplete = isTaskComplete("portfolio");

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

    const uploadedUrls: string[] = [];
    let successCount = 0;
    let errorCount = 0;

    // Check if bucket exists, if not create it
    const { data: buckets } = await supabase
      .storage
      .listBuckets();
    
    const portfolioBucketExists = buckets?.some(bucket => bucket.name === 'portfolio_images');
    
    // First ensure bucket exists
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

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(file.type)) {
        toast.error(`File ${file.name} is not a valid image type. Please upload JPG or PNG files.`);
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
          .update({ portfolio_urls: updatedUrls })
          .eq('id', user.id);

        if (error) throw error;
        
        // Mark task as complete if this is the first upload
        if (!portfolioTaskComplete) {
          markTaskComplete("portfolio");
        }
        
        // Refresh user profile in auth context
        setTimeout(async () => {
          await refreshUserProfile();
          
          toast.success(
            `Successfully uploaded ${successCount} image${successCount !== 1 ? 's' : ''}.`
          );
          
          setIsUploading(false);
          setUploadProgress(0);
        }, 1000);
      } catch (error: any) {
        console.error("Error updating user profile:", error);
        toast.error(error.message || "Failed to update portfolio images");
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
        .update({ portfolio_urls: updatedImages })
        .eq('id', user.id);

      if (error) throw error;

      // Refresh the user profile
      await refreshUserProfile();
      toast.success("Image removed from portfolio");
    } catch (error: any) {
      console.error("Error removing portfolio image:", error);
      toast.error(error.message || "Failed to remove image");
      // Restore the original state on failure
      setPortfolioImages(userProfile?.portfolio_urls || []);
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
          <div 
            className="border-2 border-dashed border-border rounded-lg p-6 text-center bg-muted/30 cursor-pointer"
            onDragOver={dragOver}
            onDrop={dropHandler}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/jpeg,image/jpg,image/png"
              className="hidden"
              id="portfolio-input"
              disabled={isUploading}
              multiple
            />
            
            {isUploading ? (
              <div className="flex flex-col items-center justify-center py-4">
                <Loader2 className="h-10 w-10 text-primary animate-spin mb-2" />
                <p className="text-sm font-medium">Uploading... {uploadProgress}%</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-4">
                <CloudUpload className="h-10 w-10 text-muted-foreground mb-2" strokeWidth={1.5} />
                <p className="text-sm font-medium">Drag & drop images here</p>
                <p className="text-xs text-muted-foreground mt-1">or click to browse</p>
                <Button type="button" className="mt-4">
                  <CloudUpload className="h-4 w-4 mr-2" />
                  Upload Images
                </Button>
              </div>
            )}
          </div>

          {/* Portfolio limit info */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              {portfolioImages.length} of 12 images
            </span>
            <span className="flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              Max 5MB per image
            </span>
          </div>

          {/* Portfolio image grid */}
          {portfolioImages.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
              {portfolioImages.map((url, index) => (
                <div key={index} className="group relative aspect-square rounded-md overflow-hidden border">
                  <img
                    src={url}
                    alt={`Portfolio image ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null; // Prevent infinite error loop
                      target.src = '';
                      target.classList.add('bg-muted');
                      target.parentElement?.classList.add('bg-muted');
                    }}
                  />
                  <button
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage(url);
                    }}
                    disabled={isUploading}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {portfolioImages.length === 0 && !isUploading && (
            <div className="text-center p-4 bg-muted/20 rounded-lg mt-2">
              <Image className="h-8 w-8 mx-auto text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">No portfolio images uploaded yet.</p>
              <p className="text-xs text-muted-foreground">Upload your best work to attract more clients.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistPortfolioUploader;
