
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Calendar } from "lucide-react"; // Use for date picker icon

const SERVICE_OPTIONS = [
  { label: "Hair", value: "hair" },
  { label: "Nails", value: "nails" },
  { label: "Skincare", value: "skincare" },
  { label: "Massage", value: "massage" },
  { label: "Other", value: "other" },
];
const ARTIST_TYPE_OPTIONS = [
  { label: "Studio", value: "studio" },
  { label: "Booth Renter", value: "booth-renter" },
  { label: "Luxury Spa", value: "luxury-spa" },
];
const LANGUAGE_OPTIONS = [
  { label: "English", value: "en" },
  { label: "Vietnamese", value: "vi" },
  { label: "Spanish", value: "es" },
];
const COMM_PREFS = [
  { label: "Email", value: "email" },
  { label: "SMS", value: "sms" },
  { label: "App Notifications", value: "app" },
];

// Helper multi-select
function MultiSelect({ options, selected, onChange, name }: {
  options: { label: string; value: string }[];
  selected: string[];
  onChange: (arr: string[]) => void;
  name: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <label key={opt.value} className="flex items-center space-x-2 cursor-pointer">
          <Checkbox
            checked={selected.includes(opt.value)}
            onCheckedChange={v => {
              if (v) onChange([...selected, opt.value]);
              else onChange(selected.filter(val => val !== opt.value));
            }}
            id={`${name}_${opt.value}`}
          />
          <span>{opt.label}</span>
        </label>
      ))}
    </div>
  );
}

const defaultForm = {
  preferences: [] as string[],
  artistTypes: [] as string[],
  preferred_language: "en",
  birthday: "",
  commPrefs: [] as string[],
  avatar_url: "",
  uploading: false,
};

const PERCENT_FIELDS = ["preferences", "artistTypes", "preferred_language", "commPrefs", "birthday", "avatar_url"];

const CustomerPreferencesPanel: React.FC = () => {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const [form, setForm] = useState({ ...defaultForm, uploading: false });
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState(0);

  // Load current user preferences
  useEffect(() => {
    if (!userProfile || !user) return;

    setForm(f => ({
      ...f,
      preferences: userProfile.preferences || [],
      artistTypes: (userProfile.favorite_artist_types || userProfile.artistTypes) || [],
      preferred_language: userProfile.preferred_language || "en",
      birthday: userProfile.birthday || "",
      commPrefs: userProfile.communication_preferences || [],
      avatar_url: userProfile.avatar_url || "",
    }));
  }, [userProfile, user]);

  // Completion percent calculation
  useEffect(() => {
    let complete = 0;
    PERCENT_FIELDS.forEach(field => {
      // At least one value for preference/artist/commPrefs, else count if present
      if (
        (Array.isArray(form[field]) && form[field].length > 0) ||
        (typeof form[field] === "string" && form[field])
      ) {
        complete += 1;
      }
    });
    setProgress(Math.round((complete / PERCENT_FIELDS.length) * 100));
  }, [form]);

  // File upload (avatar)
  const handleAvatarChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !user) return;
      setForm(f => ({ ...f, uploading: true }));
      try {
        // Upload to Supabase Storage (public avatar bucket not enforced here for demo)
        const filePath = `avatars/${user.id}-${Date.now()}-${file.name}`;
        const { data, error } = await supabase.storage.from("avatars").upload(filePath, file, {
          upsert: true,
        });
        if (error) throw error;
        const url = `${supabase.storageUrl}/object/public/avatars/${filePath}`;
        setForm(f => ({ ...f, avatar_url: url, uploading: false }));
        toast.success("Avatar uploaded!");
      } catch (err) {
        toast.error("Avatar upload failed");
        setForm(f => ({ ...f, uploading: false }));
      }
    }, [user]);

  // Handle save
  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    const updateObj: any = {
      preferences: form.preferences,
      favorite_artist_types: form.artistTypes,
      preferred_language: form.preferred_language,
      communication_preferences: form.commPrefs,
      avatar_url: form.avatar_url,
    };
    if (form.birthday) updateObj.birthday = form.birthday;
    const { error } = await supabase
      .from("users")
      .update(updateObj)
      .eq("id", user.id);
    setSaving(false);
    if (error) {
      toast.error("Could not save preferences");
    } else {
      toast.success("Preferences updated!");
      await refreshUserProfile();
    }
  }

  return (
    <div className="w-full max-w-xl bg-white border rounded-lg p-5 sm:p-7 mx-auto mt-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-2 flex items-center">
        Personalize Your Experience
      </h3>
      {progress >= 80 && (
        <div className="mb-2 text-green-700 rounded flex items-center gap-1">
          <span role="img" aria-label="confetti">🎉</span>
          Your preferences are fully set!
        </div>
      )}
      <form autoComplete="off" onSubmit={handleSave} className="grid grid-cols-1 gap-5">
        {/* Preferred Services */}
        <div>
          <label className="font-medium">Preferred Services</label>
          <MultiSelect
            options={SERVICE_OPTIONS}
            selected={form.preferences}
            onChange={arr => setForm(f => ({ ...f, preferences: arr }))}
            name="preferences"
          />
        </div>
        {/* Favorite Artists / Salon Types */}
        <div>
          <label className="font-medium">Favorite Artist or Salon Types</label>
          <MultiSelect
            options={ARTIST_TYPE_OPTIONS}
            selected={form.artistTypes}
            onChange={arr => setForm(f => ({ ...f, artistTypes: arr }))}
            name="artistTypes"
          />
        </div>
        {/* Language Dropdown */}
        <div>
          <label className="font-medium" htmlFor="lang">Language</label>
          <Select
            value={form.preferred_language}
            onValueChange={val => setForm(f => ({ ...f, preferred_language: val }))}
          >
            <SelectTrigger id="lang" className="mt-1">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGE_OPTIONS.map(opt =>
                <SelectItem value={opt.value} key={opt.value}>{opt.label}</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        {/* Birthday selector */}
        <div>
          <label className="font-medium" htmlFor="birthday">Birthday <span className="text-xs text-gray-400">(optional)</span></label>
          <div className="flex items-center gap-2">
            <Input
              id="birthday"
              type="date"
              className="w-full"
              value={form.birthday || ""}
              onChange={e => setForm(f => ({ ...f, birthday: e.target.value }))}
              max={new Date().toISOString().split('T')[0]}
            />
            <Calendar className="h-5 w-5 text-primary" />
          </div>
        </div>
        {/* Communication Preferences */}
        <div>
          <label className="font-medium">Communication Preferences</label>
          <MultiSelect
            options={COMM_PREFS}
            selected={form.commPrefs}
            onChange={arr => setForm(f => ({ ...f, commPrefs: arr }))}
            name="commPrefs"
          />
        </div>
        {/* Avatar Upload */}
        <div>
          <label className="font-medium">Avatar (Optional)</label>
          <div className="flex flex-row items-center gap-3">
            {form.avatar_url ? (
              <img
                src={form.avatar_url}
                alt="avatar"
                className="rounded-full border h-14 w-14 object-cover"
              />
            ) : (
              <div className="h-14 w-14 rounded-full border bg-gray-100 flex items-center justify-center text-gray-400">No Avatar</div>
            )}
            <Input
              type="file"
              accept="image/*"
              disabled={form.uploading}
              onChange={handleAvatarChange}
              className="w-auto py-1"
            />
          </div>
        </div>
        <Button type="submit" disabled={saving || form.uploading} className="mt-1">
          {saving ? "Saving..." : "Save Preferences"}
        </Button>
      </form>
    </div>
  );
};

export default CustomerPreferencesPanel;
