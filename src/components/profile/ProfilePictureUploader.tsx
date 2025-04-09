
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { UserCircle, Upload, Loader2, X } from "lucide-react";
import { toast } from "sonner";

interface ProfilePictureUploaderProps {
  userId: string;
  currentAvatarUrl: string | null;
  onUploadComplete: (url: string) => void;
}

const ProfilePictureUploader = ({
  userId,
  currentAvatarUrl,
  onUploadComplete,
}: ProfilePictureUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentAvatarUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const fileType = file.type;
    if (!fileType.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    setIsUploading(true);

    try {
      // Create object URL for preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // Get file extension
      const fileExt = file.name.split(".").pop();
      const fileName = `avatar.${fileExt}`;
      const filePath = `${userId}/${fileName}`;

      // Upload file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("profile_images")
        .upload(filePath, file, {
          upsert: true,
          contentType: fileType,
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from("profile_images")
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      // Update user record in the database
      const { error: updateError } = await supabase
        .from("users")
        .update({ avatar_url: publicUrl })
        .eq("id", userId);

      if (updateError) {
        throw updateError;
      }

      // Call the completion callback
      onUploadComplete(publicUrl);
      toast.success("Profile picture updated successfully");
    } catch (error: any) {
      console.error("Error uploading image:", error);
      toast.error(error.message || "Failed to upload image");
      
      // Revert preview if upload failed
      setPreviewUrl(currentAvatarUrl);
    } finally {
      setIsUploading(false);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveAvatar = async () => {
    if (!previewUrl || isUploading) return;

    setIsUploading(true);

    try {
      // Update user record to remove avatar_url
      const { error } = await supabase
        .from("users")
        .update({ avatar_url: null })
        .eq("id", userId);

      if (error) throw error;

      // Try to delete the file from storage (don't fail if it doesn't exist)
      await supabase.storage
        .from("profile_images")
        .remove([`${userId}/avatar.jpg`, `${userId}/avatar.jpeg`, `${userId}/avatar.png`]);

      setPreviewUrl(null);
      onUploadComplete("");
      toast.success("Profile picture removed");
    } catch (error: any) {
      console.error("Error removing avatar:", error);
      toast.error(error.message || "Failed to remove profile picture");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <div className="h-32 w-32 rounded-full overflow-hidden border-2 border-primary/20 shadow-sm flex items-center justify-center bg-gray-50">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <UserCircle className="h-20 w-20 text-gray-300" strokeWidth={1.5} />
          )}
          
          {isUploading && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-full">
              <Loader2 className="h-10 w-10 text-white animate-spin" />
            </div>
          )}
        </div>
        
        {previewUrl && !isUploading && (
          <button
            onClick={handleRemoveAvatar}
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
          accept="image/*"
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
          <Upload className="h-4 w-4" />
          {previewUrl ? "Change photo" : "Upload photo"}
        </Button>
        
        <span className="text-xs text-gray-500">
          Recommended: Square image, max 5MB
        </span>
      </div>
    </div>
  );
};

export default ProfilePictureUploader;
