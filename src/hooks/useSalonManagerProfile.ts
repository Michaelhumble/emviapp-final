
import { useState, useCallback } from 'react';
import { z } from 'zod';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { useSalon } from '@/context/salon';

const managerProfileSchema = z.object({
  full_name: z.string().min(2, "Full name is required"),
  job_title: z.string().min(2, "Job title is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  profile_photo_url: z.string().optional(),
});

type ManagerProfileData = z.infer<typeof managerProfileSchema>;

export const useSalonManagerProfile = () => {
  const { user } = useAuth();
  const { currentSalon } = useSalon();
  const [isLoading, setIsLoading] = useState(false);
  
  const saveProfile = async (data: ManagerProfileData) => {
    if (!user?.email || !currentSalon?.id) {
      toast.error("Missing required information");
      return false;
    }
    
    try {
      setIsLoading(true);
      
      // Validate the data
      const validatedData = managerProfileSchema.parse(data);
      
      // Update salon_staff record
      const { error } = await supabase
        .from('salon_staff')
        .update({
          full_name: validatedData.full_name,
          job_title: validatedData.job_title,
          phone: validatedData.phone,
          profile_photo_url: validatedData.profile_photo_url,
          updated_at: new Date().toISOString()
        })
        .eq('salon_id', currentSalon.id)
        .eq('email', user.email);
      
      if (error) throw error;
      
      toast.success("Manager profile saved successfully!");
      return true;
      
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0].message);
      } else {
        console.error('Error saving manager profile:', err);
        toast.error("Failed to save profile");
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  return { saveProfile, isLoading };
};
