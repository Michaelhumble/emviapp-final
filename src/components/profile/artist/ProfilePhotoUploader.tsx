
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Trash2, Upload, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface ProfilePhotoUploaderProps {
  onSuccess?: () => void;
}

const ProfilePhotoUploader = ({ onSuccess }: ProfilePhotoUploaderProps) => {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileSelected, setFileSelected] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  // Load avatar from profile
  useEffect(() => {
    if (userProfile?.avatar_url) {
      setAvatarUrl(userProfile.avatar_url);
      
      // If we already have a profile picture and the onSuccess callback exists, call it
      if (onSuccess && !uploading) {
        console.log("Photo already exists, marking as complete");
        onSuccess();
      }
    }
    setLoading(false);
  }, [userProfile, onSuccess, uploading]);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }
      
      const file = event.target.files[0];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error("Please select an image file (JPEG, PNG, etc.)");
        return;
      }
      
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image must be less than 2MB in size");
        return;
      }
      
      setFileSelected(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
    } catch (error) {
      console.error("Error selecting file:", error);
      toast.error("Error selecting file. Please try again.");
    }
  };

  // Handle upload
  const handleUpload = async () => {
    try {
      if (!fileSelected || !user) {
        toast.error("Please select an image first");
        return;
      }
      
      setUploading(true);
      
      // Create a unique file path
      const fileExt = fileSelected.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}`;
      const filePath = `${fileName}.${fileExt}`;
      
      // Check if avatars bucket exists or create it
      const { data: buckets } = await supabase.storage.listBuckets();
      const avatarsBucketExists = buckets?.some(bucket => bucket.name === 'avatars');
      
      // Create bucket if it doesn't exist
      if (!avatarsBucketExists) {
        const { error: createBucketError } = await supabase.storage.createBucket('avatars', {
          public: true,
        });
        
        if (createBucketError) {
          console.error('Error creating avatars bucket:', createBucketError);
          toast.error("Failed to create storage for profile pictures. Please try again.");
          setUploading(false);
          return;
        }
      }
      
      // Upload the file
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, fileSelected, {
          cacheControl: '3600',
          upsert: true
        });
        
      if (uploadError) {
        console.error('Error uploading avatar:', uploadError);
        toast.error("Failed to upload image. Please try again.");
        setUploading(false);
        return;
      }
      
      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
        
      // Update user profile with the new avatar URL
      const { error: updateError } = await supabase
        .from('users')
        .update({
          avatar_url: publicUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
        
      if (updateError) {
        console.error('Error updating profile with avatar:', updateError);
        toast.error("Failed to update profile. Please try again.");
        setUploading(false);
        return;
      }
      
      // Update local state
      setAvatarUrl(publicUrl);
      setPreview(null);
      setFileSelected(null);
      
      // Refresh user profile in context
      await refreshUserProfile();
      
      toast.success("Profile picture uploaded successfully!");
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
      
    } catch (error) {
      console.error('Error in upload process:', error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Handle avatar removal
  const handleRemove = async () => {
    try {
      if (!user) return;
      
      setUploading(true);
      
      // Update user profile to remove avatar URL
      const { error: updateError } = await supabase
        .from('users')
        .update({
          avatar_url: null,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
        
      if (updateError) {
        console.error('Error removing avatar from profile:', updateError);
        toast.error("Failed to remove profile picture. Please try again.");
        return;
      }
      
      // Reset local state
      setAvatarUrl(null);
      setPreview(null);
      setFileSelected(null);
      
      // Refresh user profile in context
      await refreshUserProfile();
      
      toast.success("Profile picture removed successfully");
      
    } catch (error) {
      console.error('Error removing avatar:', error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Cancel upload and reset state
  const handleCancel = () => {
    setPreview(null);
    setFileSelected(null);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Skeleton className="h-32 w-32 rounded-full" />
        <div className="mt-4 space-y-2">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Profile Image */}
      <div className="relative">
        <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border-2 border-purple-200">
          {preview ? (
            <img src={preview} alt="Preview" className="h-full w-full object-cover" />
          ) : avatarUrl ? (
            <img src={avatarUrl} alt="Profile" className="h-full w-full object-cover" />
          ) : (
            <User className="h-16 w-16 text-gray-400" />
          )}
          
          {uploading && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-full">
              <div className="animate-spin h-8 w-8 border-t-2 border-white rounded-full"></div>
            </div>
          )}
        </div>
      </div>
      
      {/* Upload Controls */}
      <div className="flex flex-col items-center space-y-3">
        {preview ? (
          <div className="flex space-x-2">
            <Button 
              onClick={handleUpload} 
              disabled={uploading}
              size="sm"
            >
              {uploading ? "Uploading..." : "Save"}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleCancel}
              size="sm"
              disabled={uploading}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              className="relative"
              size="sm"
              disabled={uploading}
            >
              <Upload className="h-4 w-4 mr-2" />
              {avatarUrl ? "Change Photo" : "Upload Photo"}
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
              />
            </Button>
            
            {avatarUrl && (
              <Button 
                variant="outline" 
                onClick={handleRemove}
                size="sm"
                disabled={uploading}
                className="text-red-500 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Remove
              </Button>
            )}
          </div>
        )}
        
        <p className="text-xs text-gray-500 text-center max-w-xs">
          Upload a professional photo that clearly shows your face.
          File should be JPG or PNG and less than 2MB.
        </p>
      </div>
    </div>
  );
};

export default ProfilePhotoUploader;
