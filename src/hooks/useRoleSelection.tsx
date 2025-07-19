
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { supabaseBypass } from "@/types/supabase-bypass";

export const useRoleSelection = () => {
  const { user, userRole } = useAuth();
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [hasSelectedRole, setHasSelectedRole] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkUserRole = async () => {
      if (!user?.id) {
        setIsLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabaseBypass
          .from('profiles')
          .select('role')
          .eq('id' as any, user.id)
          .single();
        
        if (error) throw error;
        
        // If the user has a null role or hasn't selected one yet, show the modal
        if (!data || !(data as any)?.role) {
          setHasSelectedRole(false);
          setIsRoleModalOpen(true);
        } else {
          setHasSelectedRole(true);
        }
      } catch (error) {
        console.error("Error checking user role:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkUserRole();
  }, [user?.id, userRole]);
  
  return {
    isRoleModalOpen,
    setIsRoleModalOpen,
    hasSelectedRole,
    isLoading,
    userId: user?.id
  };
};
