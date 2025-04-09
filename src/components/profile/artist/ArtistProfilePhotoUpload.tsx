
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Upload, Trash2 } from "lucide-react";

const ArtistProfilePhotoUpload = () => {
  const { user, refreshUserProfile } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchUserAvatar = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('users')
          .select('avatar_url')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        
        if (data && data.avatar_url) {
          setAvatarUrl(data.avatar_url);
        }
      } catch (error) {
        console.error('Error fetching avatar:', error);
      }
    };
    
    fetchUserAvatar();
  }, [user]);
  
  const handleUploadClick = () => {
    document.getElementById('avatarUpload')?.click();
  };
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !user) {
      return;
    }
    
    const file = e.target.files[0];
    setUploading(true);
    
    try {
      // Create file preview
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFilePreview(reader.result as string);
      };
      
      // Upload to Supabase Storage
      const filePath = `${user.id}/avatar.jpg`;
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });
      
      if (uploadError) throw uploadError;
      
      // Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
      
      const newAvatarUrl = publicUrlData.publicUrl;
      
      // Update user profile with the avatar URL
      const { error: updateError } = await supabase
        .from('users')
        .update({ 
          avatar_url: newAvatarUrl,
          updated_at: new Date().toISOString(),
          completed_profile_tasks: supabase.rpc('array_append_unique', { 
            arr: await getCompletedTasks(), 
            item: 'profile_picture' 
          })
        })
        .eq('id', user.id);
      
      if (updateError) throw updateError;
      
      setAvatarUrl(newAvatarUrl);
      await refreshUserProfile();
      toast.success("Profile photo updated successfully!");
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error("Failed to upload profile photo. Please try again.");
    } finally {
      setUploading(false);
    }
  };
  
  const handleRemovePhoto = async () => {
    if (!user) return;
    
    setUploading(true);
    
    try {
      // Remove from storage (optional)
      const filePath = `${user.id}/avatar.jpg`;
      await supabase.storage
        .from('avatars')
        .remove([filePath]);
      
      // Update user profile
      const { error } = await supabase
        .from('users')
        .update({ 
          avatar_url: null,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      setAvatarUrl(null);
      setFilePreview(null);
      await refreshUserProfile();
      toast.success("Profile photo removed");
    } catch (error) {
      console.error('Error removing photo:', error);
      toast.error("Failed to remove profile photo");
    } finally {
      setUploading(false);
    }
  };
  
  // Helper function to get current completed tasks
  const getCompletedTasks = async (): Promise<string[]> => {
    if (!user) return [];
    
    try {
      const { data, error } = await supabase
        .from('users')
        .select('completed_profile_tasks')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      
      return data.completed_profile_tasks || [];
    } catch (error) {
      console.error('Error getting completed tasks:', error);
      return [];
    }
  };
  
  const getInitials = (name: string = 'User') => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  return (
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="w-32 h-32 border-2 border-primary/20">
        <AvatarImage src={filePreview || avatarUrl || undefined} />
        <AvatarFallback className="text-lg">
          {getInitials(user?.user_metadata?.name)}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex gap-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleUploadClick}
          disabled={uploading}
          className="flex items-center gap-2"
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              {avatarUrl ? "Change Photo" : "Upload Photo"}
            </>
          )}
        </Button>
        
        {avatarUrl && (
          <Button 
            type="button" 
            variant="destructive" 
            onClick={handleRemovePhoto}
            disabled={uploading}
            size="icon"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <input
        id="avatarUpload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      <p className="text-xs text-gray-500 max-w-xs text-center">
        Upload a professional photo to help clients recognize you.
        Square images work best.
      </p>
    </div>
  );
};

export default ArtistProfilePhotoUpload;
