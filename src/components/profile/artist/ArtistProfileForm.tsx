
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

const SPECIALTIES = [
  "Nail Technician",
  "Hair Stylist",
  "Makeup Artist",
  "Esthetician",
  "Tattoo Artist",
  "Microblading",
  "Barber",
  "Lash Tech",
  "Other"
];

const ArtistProfileForm = () => {
  const { user, refreshUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    specialty: "",
    location: "",
    bio: "",
    instagram: "",
    website: ""
  });
  
  // Load initial data
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('users')
          .select('full_name, specialty, location, bio, instagram, website')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        
        if (data) {
          setFormData({
            displayName: data.full_name || "",
            specialty: data.specialty || "",
            location: data.location || "",
            bio: data.bio || "",
            instagram: data.instagram || "",
            website: data.website || ""
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error("Failed to load profile data");
      }
    };
    
    fetchUserProfile();
  }, [user]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSpecialtyChange = (value: string) => {
    setFormData(prev => ({ ...prev, specialty: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('users')
        .update({
          full_name: formData.displayName,
          specialty: formData.specialty,
          location: formData.location,
          bio: formData.bio,
          instagram: formData.instagram,
          website: formData.website,
          updated_at: new Date().toISOString(),
          completed_profile_tasks: getCompletedTasks()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Refresh user profile in context
      await refreshUserProfile();
      
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  // Helper function to determine completed profile tasks
  const getCompletedTasks = () => {
    const tasks: string[] = [];
    
    if (formData.bio) tasks.push('bio');
    if (formData.specialty) tasks.push('specialty');
    if (formData.location) tasks.push('location');
    
    return tasks;
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="displayName">Display Name</Label>
        <Input
          id="displayName"
          name="displayName"
          value={formData.displayName}
          onChange={handleChange}
          placeholder="Your name"
          className="mt-1"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="specialty">Specialty</Label>
        <Select
          value={formData.specialty}
          onValueChange={handleSpecialtyChange}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select your specialty" />
          </SelectTrigger>
          <SelectContent>
            {SPECIALTIES.map((specialty) => (
              <SelectItem key={specialty} value={specialty}>
                {specialty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
          placeholder="Tell clients about yourself and your work..."
          className="mt-1 h-24"
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

export default ArtistProfileForm;
