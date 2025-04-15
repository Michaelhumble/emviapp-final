
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function EditProfilePage() {
  const { userProfile, refreshUserProfile } = useAuth();
  const [searchParams] = useSearchParams();
  const focus = searchParams.get("focus");
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    bio: userProfile?.bio || "",
    specialty: userProfile?.specialty || "",
    location: userProfile?.location || "",
    instagram: userProfile?.instagram || "",
    website: userProfile?.website || ""
  });

  // Update form data when profile loads/changes
  useEffect(() => {
    if (userProfile) {
      setFormData({
        bio: userProfile.bio || "",
        specialty: userProfile.specialty || "",
        location: userProfile.location || "",
        instagram: userProfile.instagram || "",
        website: userProfile.website || ""
      });
    }
  }, [userProfile]);

  // Scroll to focused field
  useEffect(() => {
    if (focus) {
      const element = document.getElementById(focus);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [focus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProfile?.id) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from("users")
        .update(formData)
        .eq("id", userProfile.id);

      if (error) throw error;

      await refreshUserProfile();
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Edit Your Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div id="bio">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself..."
              className="mt-1"
            />
          </div>

          <div id="specialty">
            <Label htmlFor="specialty">Specialty</Label>
            <Input
              id="specialty"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              placeholder="e.g. Nail Art, Hair Styling"
              className="mt-1"
            />
          </div>

          <div id="location">
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

          <div id="instagram">
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

          <div id="website">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://yourwebsite.com"
              type="url"
              className="mt-1"
            />
          </div>

          <Button type="submit" className="w-full" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </div>
    </Layout>
  );
}
