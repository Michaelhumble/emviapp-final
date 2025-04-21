
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Loader2, User } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

const ARTIST_TYPE_OPTIONS = [
  { label: "Studio", value: "studio" },
  { label: "Booth Renter", value: "booth-renter" },
  { label: "Luxury Spa", value: "luxury-spa" },
];
const COMM_PREFS = [
  { label: "Email", value: "email" },
  { label: "SMS", value: "sms" },
  { label: "App Notifications", value: "app" },
];

interface EditPanelProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  userProfile: any;
}

const CustomerProfileEditPanel: React.FC<EditPanelProps> = ({ open, onOpenChange, userProfile }) => {
  const { user, refreshUserProfile } = useAuth();
  const [form, setForm] = useState(() => ({
    full_name: userProfile.full_name || "",
    location: userProfile.location || "",
    avatar_url: userProfile.avatar_url || "",
    birthday: userProfile.birthday || "",
    favorite_artist_types: userProfile.favorite_artist_types || [],
    communication_preferences: userProfile.communication_preferences || [],
  }));
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Avatar upload handler
  const handleAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const filePath = `avatars/${user.id}-${Date.now()}.${fileExt}`;
      const { error } = await supabase.storage.from("avatars").upload(filePath, file, { upsert: true });
      if (error) throw error;
      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
      setForm(f => ({ ...f, avatar_url: data.publicUrl }));
      toast.success("Avatar uploaded!");
    } catch {
      toast.error("Error uploading avatar");
    } finally {
      setUploading(false);
    }
  };

  // Handle form field changes
  const handleChange = (key: string, value: any) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  // Save handler
  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("users")
        .update({
          ...form,
          favorite_artist_types: form.favorite_artist_types,
          communication_preferences: form.communication_preferences,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);
      if (error) throw error;
      await refreshUserProfile();
      toast.success("Profile updated!");
      onOpenChange(false);
    } catch (err) {
      toast.error("Could not save profile.");
    } finally {
      setSaving(false);
    }
  };

  // Utility for multi-select
  const handleMultiSelect = (field: string, value: string) => {
    setForm(f => {
      const arr = f[field] as string[];
      return {
        ...f,
        [field]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value]
      };
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg py-8 px-6 rounded-2xl bg-white/96 border shadow-xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl mb-2">Edit Profile</DialogTitle>
          <DialogDescription>Make changes and save your updated information.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center py-3">
          <div className="relative mb-4">
            <Avatar className="w-20 h-20 border shadow">
              <AvatarImage src={form.avatar_url} />
              <AvatarFallback className="text-2xl">{userProfile.full_name?.[0] || <User />}</AvatarFallback>
            </Avatar>
            <Button
              variant="ghost"
              size="sm"
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs px-2 py-0.5 bg-white/80"
              onClick={() => document.getElementById('edit-avatar-input')?.click()}
              disabled={uploading}
            >
              {uploading ? <Loader2 className="animate-spin h-3 w-3" /> : "Change"}
            </Button>
            <input
              id="edit-avatar-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatar}
              disabled={uploading}
            />
          </div>
          <div className="w-full mt-2 space-y-3">
            <div>
              <label htmlFor="edit-name" className="font-medium">Full Name</label>
              <Input
                id="edit-name"
                value={form.full_name}
                onChange={e => handleChange("full_name", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="edit-location" className="font-medium">Location</label>
              <Input
                id="edit-location"
                value={form.location}
                onChange={e => handleChange("location", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="edit-birthday" className="font-medium">Birthday</label>
              <Input
                id="edit-birthday"
                type="date"
                value={form.birthday || ""}
                onChange={e => handleChange("birthday", e.target.value)}
                className="mt-1"
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <label className="font-medium">Favorite Artist Types</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {ARTIST_TYPE_OPTIONS.map(opt => (
                  <Badge
                    key={opt.value}
                    variant={form.favorite_artist_types.includes(opt.value) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleMultiSelect("favorite_artist_types", opt.value)}
                  >
                    {opt.label}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <label className="font-medium">Communication Preferences</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {COMM_PREFS.map(opt => (
                  <Badge
                    key={opt.value}
                    variant={form.communication_preferences.includes(opt.value) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleMultiSelect("communication_preferences", opt.value)}
                  >
                    {opt.label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="pt-5 flex gap-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving || uploading}>
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default CustomerProfileEditPanel;
