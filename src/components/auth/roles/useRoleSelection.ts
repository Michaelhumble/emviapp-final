import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const useRoleSelection = (userId: string, onOpenChange: (open: boolean) => void) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleRoleSelection = async () => {
    if (!selectedRole) {
      toast.error("Please select a role to continue.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('users')
        .update({ role: selectedRole })
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        console.error("Error updating user role:", error);
        toast.error("Failed to update role. Please try again.");
        return;
      }
      
      // Store the selected role in localStorage
      localStorage.setItem('emviapp_user_role', selectedRole);
      
      toast.success("Role selected successfully!");
      onOpenChange(false);
      
      // Redirect based on user role
      switch (selectedRole) {
        case 'artist':
        case 'nail technician/artist':
          navigate('/dashboard/artist');
          break;
        case 'salon':
        case 'owner':
          navigate('/dashboard/salon');
          break;
        case 'freelancer':
          navigate('/dashboard/freelancer');
          break;
        case 'customer':
          navigate('/dashboard/customer');
          break;
        case 'supplier':
        case 'beauty supplier':
          navigate('/dashboard/supplier');
          break;
        default:
          navigate('/dashboard/other');
      }
    } catch (error) {
      console.error("Unexpected error during role selection:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    selectedRole,
    setSelectedRole,
    isSubmitting,
    handleRoleSelection
  };
};
