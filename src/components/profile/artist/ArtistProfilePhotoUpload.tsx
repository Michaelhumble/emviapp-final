
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { supabaseBypass } from "@/types/supabase-bypass";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Upload, Trash2 } from "lucide-react";
import { getInitials } from "@/utils/userUtils";

const ArtistProfilePhotoUpload = () => {
  const { user, refreshUserProfile } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchUserAvatar = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabaseBypass
          .from('profiles' as any)
          .select('avatar_url' as any)
          .eq('id' as any, user.id as any)
          .single();
          
        if (error) throw error;
        
        if ((data as any) && (data as any).avatar_url) {
          setAvatarUrl((data as any).avatar_url);
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
      const { error: uploadError } = await supabaseBypass.storage
        .from('avatars' as any)
        .upload(filePath as any, file as any, { upsert: true } as any);
      
      if (uploadError) throw uploadError;
      
      // Get the public URL
      const { data: publicUrlData } = supabaseBypass.storage
        .from('avatars' as any)
        .getPublicUrl(filePath as any);
      
      const newAvatarUrl = publicUrlData.publicUrl;
      
      // Get current completed tasks
      const currentTasks = await getCompletedTasks();
      
      // Update user profile with the avatar URL
      const { error: updateError } = await supabaseBypass
        .from('profiles' as any)
        .update({ 
          avatar_url: newAvatarUrl,
          updated_at: new Date().toISOString(),
          completed_profile_tasks: currentTasks.includes('profile_picture') 
            ? currentTasks 
            : [...currentTasks, 'profile_picture']
        } as any)
        .eq('id' as any, user.id as any);
      
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
      await supabaseBypass.storage
        .from('avatars' as any)
        .remove([filePath] as any);
      
      // Update user profile
      const { error } = await supabaseBypass
        .from('profiles' as any)
        .update({ 
          avatar_url: null,
          updated_at: new Date().toISOString()
        } as any)
        .eq('id' as any, user.id as any);
      
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
      const { data, error } = await supabaseBypass
        .from('profiles' as any)
        .select('completed_profile_tasks' as any)
        .eq('id' as any, user.id as any)
        .single();
      
      if (error) {
        console.error('Error getting completed tasks:', error);
        return [];
      }
      
      return (data as any).completed_profile_tasks || [];
    } catch (error) {
      console.error('Error getting completed tasks:', error);
      return [];
    }
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
