
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { User } from "../types/user";

interface ProfileFormData {
  full_name: string;
  avatar_url: string;
  specialty: string;
  location: string;
  bio: string;
  instagram: string;
  website: string;
  phone: string;
}

interface UseProfileFormResult {
  formData: ProfileFormData;
  loading: boolean;
  success: boolean;
  error: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export const useProfileForm = (
  profile: User,
  onSave: (updatedProfile: User) => void
): UseProfileFormResult => {
  const [formData, setFormData] = useState<ProfileFormData>({
    full_name: profile.full_name || "",
    avatar_url: profile.avatar_url || "",
    specialty: profile.specialty || "",
    location: profile.location || "",
    bio: profile.bio || "",
    instagram: profile.instagram || "",
    website: profile.website || "",
    phone: profile.phone || ""
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const { error } = await supabase
        .from("users")
        .update({
          full_name: formData.full_name,
          avatar_url: formData.avatar_url,
          specialty: formData.specialty,
          location: formData.location,
          bio: formData.bio,
          instagram: formData.instagram,
          website: formData.website,
          phone: formData.phone,
          updated_at: new Date().toISOString()
        })
        .eq("id", profile.id);

      if (error) throw error;
      
      setSuccess(true);
      onSave({ ...profile, ...formData });
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    success,
    error,
    handleChange,
    handleSubmit
  };
};
