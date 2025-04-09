
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CloudUpload, Loader2, X } from "lucide-react";
import { useProfileCompletion } from "../hooks/useProfileCompletion";

const ProfilePhotoUploader = () => {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const { markTaskComplete, isTaskComplete } = useProfileCompletion();
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Task completion status
  const profilePhotoTaskComplete = isTaskComplete("profile_picture");
  
  // Initialize with existing profile image
  useEffect(() => {
    if (userProfile?.avatar_url) {
      setImageUrl(userProfile.avatar_url);
      console.log("Loaded existing profile image:", userProfile.avatar_url);
    }
  }, [userProfile]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Clear previous errors
    setError(null);

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a JPG or PNG image");
      setError("Invalid file type. Please upload a JPG or PNG image.");
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size should be less than 2MB");
      setError("File size too large. Maximum size is 2MB.");
      return;
    }

    try {
      setIsUploading(true);
      toast.info("Uploading profile picture...");
      
      // Create a unique file name
      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${user?.id}/${fileName}`;
      
      console.log("Starting upload to profile_images bucket...");
      
      // First, ensure the bucket exists
      try {
        const { data: buckets } = await supabase.storage.listBuckets();
        if (!buckets?.some(b => b.name === 'profile_images')) {
          console.log("Creating profile_images bucket...");
          const { error: bucketError } = await supabase.storage.createBucket('profile_images', {
            public: true
          });
          
          if (bucketError) {
            throw new Error(`Failed to create storage bucket: ${bucketError.message}`);
          }
        }
      } catch (bucketError) {
        console.error("Bucket creation error:", bucketError);
        // Continue anyway, the bucket might exist already
      }
      
      // Upload the file
      const { error: uploadError } = await supabase.storage
        .from('profile_images')
        .upload(filePath, file, { 
          upsert: true,
          contentType: file.type
        });

      if (uploadError) {
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      // Get the public URL
      const { data: urlData } = supabase.storage
        .from('profile_images')
        .getPublicUrl(filePath);

      if (!urlData?.publicUrl) {
        throw new Error("Failed to get public URL");
      }

      const publicUrl = urlData.publicUrl;
      console.log("Image uploaded successfully. Public URL:", publicUrl);

      // Update the user profile with the new avatar URL
      const { error: updateError } = await supabase
        .from('users')
        .update({ 
          avatar_url: publicUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id);

      if (updateError) {
        throw new Error(`Failed to update profile: ${updateError.message}`);
      }

      // Update local state
      setImageUrl(publicUrl);
      
      // Refresh user profile to get the updated data
      await refreshUserProfile();
      
      // Mark task as complete
      markTaskComplete("profile_picture");
      
      toast.success("Profile picture uploaded successfully");
    } catch (error: any) {
      console.error("Error in upload process:", error);
      setError(error.message || "Failed to upload profile picture");
      toast.error(error.message || "Failed to upload profile picture");
    } finally {
      setIsUploading(false);
      
      // Reset the file input
      if (e.target) {
        e.target.value = '';
      }
    }
  };

  const removeProfilePicture = async () => {
    if (!user?.id || isUploading) return;

    try {
      setIsUploading(true);
      toast.info("Removing profile picture...");

      // Update the user record to remove the avatar URL
      const { error: updateError } = await supabase
        .from("users")
        .update({ 
          avatar_url: null, 
          updated_at: new Date().toISOString() 
        })
        .eq("id", user.id);

      if (updateError) {
        throw new Error(`Failed to update profile: ${updateError.message}`);
      }

      // Try to delete the file from storage (don't fail if it doesn't exist)
      try {
        if (imageUrl) {
          // Extract the path from the URL
          const urlParts = imageUrl.split('/');
          const filePath = urlParts.slice(urlParts.indexOf('profile_images') + 1).join('/');
          
          if (filePath) {
            await supabase.storage
              .from("profile_images")
              .remove([filePath]);
          }
        }
      } catch (storageError) {
        console.warn("Storage deletion warning:", storageError);
        // Continue even if storage deletion fails
      }

      // Reset UI state
      setImageUrl(null);
      
      // Refresh user profile
      await refreshUserProfile();

      toast.success("Profile picture removed");
    } catch (error: any) {
      console.error("Error removing profile picture:", error);
      setError(error.message || "Failed to remove profile picture");
      toast.error(error.message || "Failed to remove profile picture");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Profile Image Display */}
      <div className="relative">
        <div className="h-32 w-32 rounded-full overflow-hidden border-2 border-primary/20 bg-muted flex items-center justify-center shadow-sm">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Profile"
              className="h-full w-full object-cover"
              onError={(e) => {
                console.error("Error loading image:", imageUrl);
                const target = e.target as HTMLImageElement;
                target.onerror = null; // Prevent infinite loop
                target.src = ''; // Clear the src
                setImageUrl(null);
                setError("Failed to load profile image.");
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

        {imageUrl && !isUploading && (
          <button
            onClick={removeProfilePicture}
            className="absolute -top-2 -right-2 p-1 bg-red-100 rounded-full border border-red-200 text-red-500 hover:bg-red-200 transition-colors"
            title="Remove photo"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Error display */}
      {error && (
        <div className="text-red-500 text-sm text-center max-w-xs">
          {error}
        </div>
      )}

      {/* Upload Button */}
      <div className="flex flex-col gap-2 items-center">
        <input
          id="profile-picture-input"
          type="file"
          onChange={handleFileChange}
          accept="image/jpeg,image/jpg,image/png"
          className="hidden"
          disabled={isUploading}
        />

        <Button
          type="button"
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => document.getElementById('profile-picture-input')?.click()}
          disabled={isUploading}
        >
          <CloudUpload className="h-4 w-4" />
          {imageUrl ? "Change Photo" : "Upload Photo"}
        </Button>

        <p className="text-xs text-muted-foreground max-w-xs text-center mt-2">
          Upload a professional photo that clearly shows your face. 
          JPG or PNG, max 2MB.
        </p>
      </div>
    </div>
  );
};

export default ProfilePhotoUploader;
