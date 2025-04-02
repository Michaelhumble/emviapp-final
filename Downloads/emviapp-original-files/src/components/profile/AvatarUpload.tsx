
import { useState } from "react";
import { User } from "../../types/user";
import { supabase } from "../../lib/supabaseClient";
import { Loader, Check, X, Camera } from "lucide-react";

interface AvatarUploadProps {
  profile: User;
  onAvatarUpdate: (url: string) => void;
}

const AvatarUpload = ({ profile, onAvatarUpdate }: AvatarUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError("");
      setSuccess(false);
      
      const file = event.target.files?.[0];
      if (!file) {
        setError("No file selected");
        return;
      }

      // Validate file type
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      if (!['jpg', 'jpeg', 'png'].includes(fileExt || '')) {
        setError("Only JPG and PNG images are allowed");
        return;
      }

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setError("File size must be less than 2MB");
        return;
      }

      setUploading(true);

      // Create a unique file path for the user
      const userId = profile.id;
      const filePath = `${userId}/${Date.now()}-${file.name}`;

      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('profile_images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL for the uploaded file
      const { data: publicUrlData } = supabase.storage
        .from('profile_images')
        .getPublicUrl(filePath);

      const avatarUrl = publicUrlData.publicUrl;

      // Update user profile with new avatar URL
      const { error: updateError } = await supabase
        .from('users')
        .update({ 
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (updateError) {
        throw updateError;
      }

      // Update the avatar in the UI
      onAvatarUpdate(avatarUrl);
      setSuccess(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);

    } catch (error) {
      console.error('Error uploading avatar:', error);
      setError(error instanceof Error ? error.message : "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      <input
        type="file"
        id="avatar-upload"
        accept="image/jpeg,image/png"
        onChange={handleUpload}
        disabled={uploading}
        className="hidden"
      />
      
      <label
        htmlFor="avatar-upload"
        className="mt-3 flex items-center justify-center px-4 py-2 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-full cursor-pointer transition-colors duration-300"
      >
        {uploading ? (
          <Loader size={16} className="mr-2 animate-spin" />
        ) : success ? (
          <Check size={16} className="mr-2 text-green-300" />
        ) : (
          <Camera size={16} className="mr-2" />
        )}
        {uploading ? "Uploading..." : "Upload Photo"}
      </label>
      
      {error && (
        <div className="mt-2 flex items-center text-red-400 text-sm">
          <X size={14} className="mr-1" />
          {error}
        </div>
      )}
      
      {success && (
        <div className="mt-2 flex items-center text-green-400 text-sm">
          <Check size={14} className="mr-1" />
          Avatar updated!
        </div>
      )}
    </div>
  );
};

export default AvatarUpload;
