
import { z } from "zod";
import { toast } from "sonner";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";

const supplierProfileSchema = z.object({
  full_name: z.string().min(2, "Business name is required"),
  specialty: z.string().min(1, "Category is required"),
  location: z.string().min(1, "Location is required"),
  bio: z.string().min(10, "Description must be at least 10 characters"),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  avatar_url: z.string().optional(),
  company_name: z.string().min(2, "Business name is required")
});

type SupplierProfileData = z.infer<typeof supplierProfileSchema>;

export const useSupplierProfileValidation = () => {
  const { user, refreshUserProfile } = useAuth();
  
  const validateAndSave = async (data: SupplierProfileData): Promise<boolean> => {
    try {
      const validatedData = supplierProfileSchema.parse(data);
      
      const { error } = await supabase
        .from('users')
        .update({
          ...validatedData,
          role: 'supplier',
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id);
      
      if (error) throw error;
      
      await refreshUserProfile();
      toast.success("Supplier profile saved!");
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
