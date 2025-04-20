
import { z } from "zod";
import { toast } from "sonner";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";

const customerProfileSchema = z.object({
  full_name: z.string().min(2, "Name is required"),
  gender: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  phone: z.string().optional(),
  preferences: z.array(z.string()).optional(),
  avatar_url: z.string().optional()
});

type CustomerProfileData = z.infer<typeof customerProfileSchema>;

export const useCustomerProfileValidation = () => {
  const { user, refreshUserProfile } = useAuth();
  
  const validateAndSave = async (data: CustomerProfileData): Promise<boolean> => {
    try {
      // Validate using zod schema
      const validatedData = customerProfileSchema.parse(data);
      
      // Save to Supabase
      const { error } = await supabase
        .from('users')
        .update({
          ...validatedData,
          role: 'customer',
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id);
      
      if (error) throw error;
      
      // Refresh user data in context
      await refreshUserProfile();
      
      toast.success("Profile updated successfully!");
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
