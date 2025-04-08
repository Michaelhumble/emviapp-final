
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const BEAUTY_PREFERENCES = [
  "Hair", "Nails", "Makeup", "Skincare", "Lashes", "Brows", "Massage", 
  "Facial", "Waxing", "Tattoo", "Permanent Makeup"
];

const CustomerProfileForm = () => {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    location: "",
    avatar_url: ""
  });
  const [preferences, setPreferences] = useState<string[]>([]);
  const [newPreference, setNewPreference] = useState("");
  
  // Load initial data
  useEffect(() => {
    if (userProfile) {
      setFormData({
        full_name: userProfile.full_name || "",
        location: userProfile.location || "",
        avatar_url: userProfile.avatar_url || ""
      });
      
      if (userProfile.preferences) {
        setPreferences(userProfile.preferences);
      }
    }
  }, [userProfile]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddPreference = () => {
    if (newPreference && !preferences.includes(newPreference)) {
      setPreferences([...preferences, newPreference]);
      setNewPreference("");
    }
  };
  
  const handleRemovePreference = (pref: string) => {
    setPreferences(preferences.filter(p => p !== pref));
  };
  
  const handlePreferenceClick = (pref: string) => {
    if (preferences.includes(pref)) {
      handleRemovePreference(pref);
    } else {
      setPreferences([...preferences, pref]);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('users')
        .update({
          full_name: formData.full_name,
          location: formData.location,
          avatar_url: formData.avatar_url,
          preferences: preferences,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      await refreshUserProfile();
      toast.success("Your profile has been updated.");
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !user) return;
    
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const filePath = `${user.id}/${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    setUploading(true);
    
    try {
      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      // Get the public URL for the uploaded file
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      
      // Update the form data with the new avatar URL
      setFormData(prev => ({ ...prev, avatar_url: data.publicUrl }));
      toast.success("Avatar uploaded successfully.");
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.error("Failed to upload avatar. Please try again.");
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
      
      {/* Avatar Upload */}
      <div className="mb-6">
        <Label htmlFor="avatar">Avatar (Optional)</Label>
        <div className="flex items-center gap-4 mt-2">
          {formData.avatar_url && (
            <div className="relative w-20 h-20 rounded-full overflow-hidden border">
              <img 
                src={formData.avatar_url} 
                alt="Avatar" 
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <div>
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('avatar')?.click()}
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
                  {formData.avatar_url ? "Change Avatar" : "Upload Avatar"}
                </>
              )}
            </Button>
            <input
              id="avatar"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
              disabled={uploading}
            />
          </div>
        </div>
      </div>
      
      {/* Full Name */}
      <div>
        <Label htmlFor="full_name">Full Name</Label>
        <Input
          id="full_name"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          placeholder="Your full name"
          className="mt-1"
          required
        />
      </div>
      
      {/* Location */}
      <div>
        <Label htmlFor="location">Location (City/State)</Label>
        <Input
          id="location"
          name="location"
          value={formData.location || ""}
          onChange={handleChange}
          placeholder="City, State"
          className="mt-1"
        />
      </div>
      
      {/* Beauty Preferences */}
      <div>
        <Label>Beauty Preferences (Optional)</Label>
        <div className="flex flex-wrap gap-2 mt-2 mb-4">
          {BEAUTY_PREFERENCES.map(pref => (
            <Badge 
              key={pref} 
              variant={preferences.includes(pref) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => handlePreferenceClick(pref)}
            >
              {pref}
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Input
            value={newPreference}
            onChange={(e) => setNewPreference(e.target.value)}
            placeholder="Add custom preference"
            className="mt-1"
          />
          <Button 
            type="button" 
            variant="outline"
            onClick={handleAddPreference}
            disabled={!newPreference}
          >
            Add
          </Button>
        </div>
        
        {preferences.length > 0 && (
          <div className="mt-4">
            <Label>Your Selected Preferences:</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {preferences.map(pref => (
                <Badge key={pref} className="flex items-center gap-1">
                  {pref}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleRemovePreference(pref)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          "Save Profile"
        )}
      </Button>
    </form>
  );
};

export default CustomerProfileForm;
