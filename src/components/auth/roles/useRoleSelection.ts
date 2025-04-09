
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserRole } from "@/context/auth/types";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { navigateToRoleDashboard } from "@/utils/navigation";

export const useRoleSelection = (userId: string, onOpenChange: (open: boolean) => void) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>("artist"); // Default to artist 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleRoleSelection = async () => {
    if (!selectedRole) {
      toast.error("Please select a role to continue");
      return;
    }

    setIsSubmitting(true);
    console.log(`[RoleSelection] Setting role for user ${userId} to ${selectedRole}`);

    try {
      // First update auth metadata with the role
      const { error: metadataError } = await supabase.auth.updateUser({
        data: { role: selectedRole }
      });
      
      if (metadataError) {
        console.error("[RoleSelection] Error updating auth metadata:", metadataError);
        throw metadataError;
      }
      
      console.log("[RoleSelection] Successfully updated auth metadata");
      
      // Then update the users table with the selected role
      const { error: dbError } = await supabase
        .from('users')
        .update({ role: selectedRole })
        .eq('id', userId);
        
      if (dbError) {
        console.error("[RoleSelection] Error updating role in database:", dbError);
        throw dbError;
      }
      
      console.log("[RoleSelection] Successfully updated role in database");
      
      // Force a session refresh to get the updated metadata
      await supabase.auth.refreshSession();
      
      // Close the modal
      onOpenChange(false);
      
      // Show success message
      toast.success(`Your role is now set to ${selectedRole}!`);
      
      // Navigate to the appropriate dashboard
      navigateToRoleDashboard(navigate, selectedRole);
      
    } catch (error) {
      console.error("[RoleSelection] Role selection error:", error);
      toast.error("Failed to update your role. Please try again.");
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
