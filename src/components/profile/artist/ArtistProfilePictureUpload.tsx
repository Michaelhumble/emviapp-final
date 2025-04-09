
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CloudUpload, Loader2, X, Check } from "lucide-react";
import { useProfileCompletion } from "../hooks/useProfileCompletion";

const ArtistProfilePictureUpload = () => {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const { markTaskComplete, isTaskComplete } = useProfileCompletion();
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if profile picture task is already complete
  const profilePictureTaskComplete = isTaskComplete("profile_picture");

  // Initialize preview with profile image if available
  useEffect(() => {
    if (userProfile?.avatar_url) {
      setPreviewUrl(userProfile.avatar_url);
      console.log("Loaded profile image:", userProfile.avatar_url);
    }
  }, [userProfile]);

  // Create profile_images bucket if it doesn't exist
  const ensureStorageBucket = async () => {
    try {
      const { data: buckets } = await supabase.storage.listBuckets();
      const bucketExists = buckets?.some(bucket => bucket.name === 'profile_images');
      
      if (!bucketExists) {
        console.log("Creating profile_images bucket...");
        const { error } = await supabase.storage.createBucket('profile_images', {
          public: true
        });
        
        if (error) {
          console.error("Error creating bucket:", error);
          return false;
        }
        
        console.log("Successfully created profile_images bucket");
      } else {
        console.log("profile_images bucket already exists");
      }
      
      return true;
    } catch (error) {
      console.error("Error checking/creating bucket:", error);
      return false;
    }
  };

  const uploadProfilePicture = async (file: File) => {
    if (!user) {
      toast.error("You must be logged in to upload a profile picture");
      return false;
    }

    try {
      // Ensure the storage bucket exists
      const bucketReady = await ensureStorageBucket();
      if (!bucketReady) {
        toast.error("Failed to prepare storage. Please try again later.");
        return false;
      }

      // Create a file path with user ID and file extension
      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const filePath = `${user.id}/avatar.${fileExt}`;
      
      console.log("Uploading file to:", filePath);

      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('profile_images')
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      // Get the public URL of the uploaded image
      const { data: urlData } = supabase.storage
        .from('profile_images')
        .getPublicUrl(filePath);

      if (!urlData || !urlData.publicUrl) {
        throw new Error("Failed to get public URL for uploaded image");
      }

      console.log("Image uploaded successfully. Public URL:", urlData.publicUrl);

      // Update the user profile with the new avatar URL
      const { error: updateError } = await supabase
        .from('users')
        .update({ 
          avatar_url: urlData.publicUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (updateError) {
        console.error("Database update error:", updateError);
        throw new Error(`Failed to update profile: ${updateError.message}`);
      }

      console.log("Profile updated with new avatar URL");
      
      // Refresh the user profile to see the changes
      await refreshUserProfile();
      
      // Mark the task as complete
      markTaskComplete("profile_picture");
      
      return true;
    } catch (error) {
      console.error("Error in uploadProfilePicture:", error);
      return false;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a JPG or PNG image");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    setIsUploading(true);
    
    try {
      // Create a preview URL for immediate feedback
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      
      toast.info("Uploading profile picture...");
      
      // Upload the file
      const success = await uploadProfilePicture(file);
      
      if (success) {
        toast.success("Profile picture uploaded successfully");
      } else {
        throw new Error("Failed to upload profile picture");
      }
    } catch (error: any) {
      console.error("Error in handleFileChange:", error);
      toast.error(error.message || "Failed to upload profile picture");
      
      // Reset preview if upload failed but we have an existing avatar
      if (userProfile?.avatar_url) {
        setPreviewUrl(userProfile.avatar_url);
      } else {
        setPreviewUrl(null);
      }
    } finally {
      setIsUploading(false);
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeProfilePicture = async () => {
    if (!user || isUploading) return;

    try {
      setIsUploading(true);
      toast.info("Removing profile picture...");

      // Update the user record to remove the avatar URL
      const { error } = await supabase
        .from("users")
        .update({ 
          avatar_url: null, 
          updated_at: new Date().toISOString() 
        })
        .eq("id", user.id);

      if (error) throw error;

      // Try to remove the files from storage
      try {
        await supabase.storage
          .from("profile_images")
          .remove([
            `${user.id}/avatar.jpg`, 
            `${user.id}/avatar.jpeg`, 
            `${user.id}/avatar.png`
          ]);
      } catch (storageError) {
        console.log("Storage delete warning:", storageError);
        // Continue even if storage deletion fails
      }

      // Reset preview and refresh profile
      setPreviewUrl(null);
      await refreshUserProfile();

      toast.success("Profile picture removed");
    } catch (error: any) {
      console.error("Error removing profile picture:", error);
      toast.error(error.message || "Failed to remove profile picture");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="shadow-sm border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          Add Your Profile Picture
          {profilePictureTaskComplete && (
            <span className="ml-2 text-green-500">
              <Check className="h-5 w-5" />
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="h-32 w-32 rounded-full overflow-hidden border-2 border-primary/20 flex items-center justify-center bg-muted">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Profile Preview"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    console.error("Image failed to load:", previewUrl);
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // Prevent infinite error loop
                    target.src = ''; // Clear src
                    if (userProfile?.avatar_url) {
                      // Try the original URL without preview changes
                      setTimeout(() => {
                        target.src = userProfile.avatar_url || '';
                      }, 100);
                    }
                  }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full w-full text-muted-foreground">
                  <CloudUpload className="h-10 w-10 mb-1" strokeWidth={1.5} />
                  <span className="text-xs text-center">Upload Image</span>
                </div>
              )}
              {isUploading && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-full">
                  <Loader2 className="h-10 w-10 text-white animate-spin" />
                </div>
              )}
            </div>

            {previewUrl && !isUploading && (
              <button
                onClick={removeProfilePicture}
                className="absolute -top-2 -right-2 p-1 bg-red-100 rounded-full border border-red-200 text-red-500 hover:bg-red-200 transition-colors"
                title="Remove photo"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex flex-col gap-2 items-center">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/jpeg,image/jpg,image/png"
              className="hidden"
              id="profile-picture-input"
              disabled={isUploading}
            />

            <Button
              type="button"
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              <CloudUpload className="h-4 w-4" />
              {previewUrl ? "Change Photo" : "Upload Photo"}
            </Button>

            <p className="text-xs text-muted-foreground max-w-xs text-center">
              Upload a professional photo that clearly shows your face. 
              JPG or PNG, max 5MB.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistProfilePictureUpload;
