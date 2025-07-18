
import { useState } from "react";
import { UserRole } from "@/context/auth/types";
import { supabase } from "@/integrations/supabase/client";
import { supabaseQueries } from "@/types/supabase-bypass";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { navigateToRoleDashboard } from "@/utils/navigation";

export const useRoleSelection = (userId: string, onComplete: (open: boolean) => void) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>("customer");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleRoleSelection = async () => {
    if (!selectedRole) return;
    
    setIsSubmitting(true);
    
    try {
      const updateQuery = supabaseQueries.update('profiles', { role: selectedRole });
      const { error } = await supabaseQueries.eq(updateQuery, 'id', userId);
      
      if (error) throw error;
      
      toast.success(`Role selected! You're now registered as a ${selectedRole}.`);
      
      // Use the utility function for consistent role-based navigation
      onComplete(false);
      navigateToRoleDashboard(navigate, selectedRole);
    } catch (error) {
      console.error("Error setting user role:", error);
      toast.error("We couldn't save your role. Please try again.");
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
