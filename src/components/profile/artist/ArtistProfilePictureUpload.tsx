
import { useState, useRef } from "react";
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
  const [previewUrl, setPreviewUrl] = useState<string | null>(userProfile?.avatar_url || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if avatar task is already complete
  const avatarTaskComplete = isTaskComplete("avatar");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

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

    try {
      setIsUploading(true);

      // Create preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // Get file extension
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}.${fileExt}`;
      const filePath = `${fileName}`;

      // Check if bucket exists, if not don't error out
      const { data: buckets } = await supabase
        .storage
        .listBuckets();
      
      const profileBucketExists = buckets?.some(bucket => bucket.name === 'profile_images');
      
      // First ensure bucket exists
      if (!profileBucketExists) {
        console.log("Creating profile_images bucket");
        const { error: bucketError } = await supabase
          .storage
          .createBucket('profile_images', {
            public: true,
            fileSizeLimit: 5 * 1024 * 1024
          });
          
        if (bucketError) {
          console.error("Error creating bucket:", bucketError);
          // Continue anyway, might be permissions issue but bucket exists
        }
      }

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("profile_images")
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type,
        });

      if (uploadError) throw uploadError;

      // Get public URL - ensure we're getting the fresh URL with cache-busting
      const timestamp = new Date().getTime();
      const { data: publicUrlData } = supabase.storage
        .from("profile_images")
        .getPublicUrl(`${filePath}?t=${timestamp}`);

      const publicUrl = publicUrlData.publicUrl.split('?')[0]; // Remove query params for storage

      // Update user record
      const { error: updateError } = await supabase
        .from("users")
        .update({ 
          avatar_url: publicUrl, 
          updated_at: new Date().toISOString() 
        })
        .eq("id", user.id);

      if (updateError) throw updateError;

      // Refresh user profile in auth context with a slight delay
      // to ensure Supabase has processed the update
      setTimeout(async () => {
        await refreshUserProfile();
        
        // Mark task as complete
        markTaskComplete("avatar");
        
        toast.success("Profile picture updated successfully");
        setIsUploading(false);
      }, 1000);
      
    } catch (error: any) {
      console.error("Error uploading profile picture:", error);
      toast.error(error.message || "Failed to upload profile picture");
      
      // Reset preview if upload failed
      if (userProfile?.avatar_url) {
        setPreviewUrl(userProfile.avatar_url);
      } else {
        setPreviewUrl(null);
      }
      setIsUploading(false);
    }
  };

  const removeProfilePicture = async () => {
    if (!user || isUploading) return;

    try {
      setIsUploading(true);

      // Remove the profile picture URL from the user record
      const { error } = await supabase
        .from("users")
        .update({ avatar_url: null, updated_at: new Date().toISOString() })
        .eq("id", user.id);

      if (error) throw error;

      // Try to remove the file from storage (don't fail if it doesn't exist)
      try {
        await supabase.storage
          .from("profile_images")
          .remove([`${user.id}.jpg`, `${user.id}.jpeg`, `${user.id}.png`]);
      } catch (storageError) {
        console.log("Storage delete warning:", storageError);
        // Continue even if storage deletion fails
      }

      // Update preview and refresh user profile
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
          {avatarTaskComplete && (
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
