
import { z } from "zod";
import { toast } from "sonner";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";

const artistProfileSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  specialty: z.string().min(1, "Please select a specialty"),
  location: z.string().min(1, "Location is required"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  instagram: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  avatar_url: z.string().min(1, "Profile photo is required"),
  independent: z.boolean().optional().default(false),
});

type ArtistProfileData = z.infer<typeof artistProfileSchema>;

export const useArtistProfileValidation = () => {
  const { user, refreshUserProfile } = useAuth();
  
  const validateAndSave = async (data: ArtistProfileData): Promise<boolean> => {
    try {
      // Validate using zod schema (independent allowed!)
      const validatedData = artistProfileSchema.parse(data);
      
      // Save to Supabase
      const { error } = await supabase
        .from('users')
        .update({
          ...validatedData,
          role: 'artist',
          independent: validatedData.independent || false,
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id);
      
      if (error) throw error;
      
      // Refresh user data in context
      await refreshUserProfile();
      
      toast.success("Your profile is now visible to salons!");
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0].message);
      } else {
        console.error('Error saving profile:', err);
        toast.error("Failed to save profile. Please try again.");
      }
      return false;
    }
  };
  
  return { validateAndSave };
};
