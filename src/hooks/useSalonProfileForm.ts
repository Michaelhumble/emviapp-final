
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { useSalon } from '@/context/salon';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { z } from 'zod';

const salonProfileSchema = z.object({
  salon_name: z.string().min(2, "Salon name must be at least 2 characters"),
  address: z.string().min(1, "Address is required"),
  phone: z.string().optional(),
  about: z.string().min(10, "Description must be at least 10 characters"),
  logo_url: z.string().min(1, "Profile image is required"),
  services: z.array(z.string()).min(1, "At least one service is required")
});

export const useSalonProfileForm = () => {
  const { userProfile } = useAuth();
  const { currentSalon, updateSalon } = useSalon();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    salon_name: '',
    address: '',
    phone: '',
    about: '',
    logo_url: '',
    services: [] as string[]
  });
  const [completionPercentage, setCompletionPercentage] = useState(0);

  useEffect(() => {
    if (currentSalon) {
      setFormData({
        salon_name: currentSalon.salon_name || '',
        address: currentSalon.address || '',
        phone: currentSalon.phone || '',
        about: currentSalon.about || '',
        logo_url: currentSalon.logo_url || '',
        services: currentSalon.services || []
      });
    }
  }, [currentSalon]);

  useEffect(() => {
    // Calculate completion percentage
    const result = salonProfileSchema.safeParse(formData);
    if (result.success) {
      setCompletionPercentage(100);
    } else {
      const totalFields = 6; // Required fields count
      const filledFields = Object.entries(formData).filter(([key, value]) => {
        if (key === 'services') return value.length > 0;
        return value && value.length > 0;
      }).length;
      setCompletionPercentage(Math.round((filledFields / totalFields) * 100));
    }
  }, [formData]);

  const handleFileUpload = async (file: File) => {
    if (!userProfile?.id) return;

    const fileExt = file.name.split('.').pop();
    const filePath = `${userProfile.id}/${Math.random()}.${fileExt}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('salon-logos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('salon-logos')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, logo_url: data.publicUrl }));
    } catch (error) {
      console.error('Error uploading logo:', error);
      toast.error('Failed to upload logo');
    }
  };

  const handleSubmit = async () => {
    const result = salonProfileSchema.safeParse(formData);
    if (!result.success) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      if (!currentSalon?.id) {
        throw new Error('No salon found');
      }

      await updateSalon(currentSalon.id, formData);
      toast.success('Salon profile updated successfully!');
    } catch (error) {
      console.error('Error updating salon:', error);
      toast.error('Failed to update salon profile');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    isLoading,
    completionPercentage,
    handleFileUpload,
    handleSubmit
  };
};
