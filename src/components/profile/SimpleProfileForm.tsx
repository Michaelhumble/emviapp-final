
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { supabaseBypass } from "@/types/supabase-bypass";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import ProfilePictureUploader from "./ProfilePictureUploader";

const SimpleProfileForm = () => {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    location: "",
    bio: "",
    phone: "",
    instagram: "",
    website: "",
  });
  
  // Load initial data
  useEffect(() => {
    if (userProfile) {
      setFormData({
        full_name: userProfile.full_name || "",
        location: userProfile.location || "",
        bio: userProfile.bio || "",
        phone: userProfile.phone || "",
        instagram: userProfile.instagram || "",
        website: userProfile.website || "",
      });
    }
  }, [userProfile]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    
    try {
      const { error } = await supabaseBypass
        .from('profiles' as any)
        .update({
          full_name: formData.full_name,
          location: formData.location,
          bio: formData.bio,
          phone: formData.phone,
          instagram: formData.instagram,
          website: formData.website,
          updated_at: new Date().toISOString()
        } as any)
        .eq('id' as any, user.id as any);
      
      if (error) throw error;
      
      await refreshUserProfile();
      toast.success("Profile updated successfully");
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePhotoUpdate = async (url: string) => {
    await refreshUserProfile();
  };
  
  if (!user) {
    return <div>Please sign in to edit your profile</div>;
  }
  
  return (
    <div className="space-y-8 relative min-h-[80vh]">
      <div className="flex justify-center mb-6">
        <ProfilePictureUploader 
          userId={user.id}
          currentAvatarUrl={userProfile?.avatar_url || null}
          onUploadComplete={handleProfilePhotoUpdate}
        />
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6 pb-24">
        <div>
          <Label htmlFor="full_name">Name</Label>
          <Input
            id="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="City, State"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself..."
            className="mt-1 h-24"
          />
        </div>
        
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your phone number"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="instagram">Instagram</Label>
          <Input
            id="instagram"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            placeholder="@yourusername"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://yourwebsite.com"
            className="mt-1"
          />
        </div>
      </form>
      
      {/* Sticky Action Footer - Always visible */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
        <div className="max-w-3xl mx-auto">
          <Button 
            onClick={handleSubmit} 
            className="w-full h-12 text-base font-semibold" 
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Profile"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SimpleProfileForm;
