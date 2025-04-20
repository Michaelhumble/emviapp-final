
import { z } from "zod";
import { toast } from "sonner";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";

const freelancerProfileSchema = z.object({
  full_name: z.string().min(2, "Name is required"),
  specialty: z.string().min(1, "Specialty is required"),
  location: z.string().min(1, "Location is required"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  avatar_url: z.string().optional()
});

type FreelancerProfileData = z.infer<typeof freelancerProfileSchema>;

export const useFreelancerProfileValidation = () => {
  const { user, refreshUserProfile } = useAuth();
  
  const validateAndSave = async (data: FreelancerProfileData): Promise<boolean> => {
    try {
      const validatedData = freelancerProfileSchema.parse(data);
      
      const { error } = await supabase
        .from('users')
        .update({
          ...validatedData,
          role: 'freelancer',
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id);
      
      if (error) throw error;
      
      await refreshUserProfile();
      toast.success("Freelancer profile updated successfully!");
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
