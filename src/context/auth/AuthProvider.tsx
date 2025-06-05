
import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { AuthContextType, UserProfile, UserRole } from "./types";
import { useSession } from "./hooks/useSession";
import { useUserProfile } from "./hooks/useUserProfile";
import { authService } from "./services/authService";
import { supabase } from "@/integrations/supabase/client";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { session, user, loading: sessionLoading, isNewUser, clearIsNewUser, setLoading } = useSession();
  const { userProfile, refreshUserProfile, isError } = useUserProfile(user, setLoading);
  
  // REFACTOR: SINGLE SOURCE OF TRUTH - Only use Supabase auth metadata for role
  // Removed all localStorage, database fallbacks, and complex role normalization
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  
  const [loading, setLoadingState] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);

  // UNIFIED ROLE DETECTION: Only from Supabase auth metadata
  useEffect(() => {
    if (user?.user_metadata?.role) {
      // Direct assignment from auth metadata - no normalization, no fallbacks
      const metadataRole = user.user_metadata.role as UserRole;
      console.log("UNIFIED ROLE: Using auth metadata as single source of truth:", metadataRole);
      setUserRole(metadataRole);
    } else {
      setUserRole(null);
    }
  }, [user]);

  // REFACTOR: Removed all role synchronization logic to database/localStorage
  // Auth metadata is now the only source - simpler and more reliable
  
  const isSignedIn = !!user;

  const signIn = async (email: string, password: string) => {
    try {
      setLoadingState(true);
      const result = await authService.signIn(email, password);
      // Role will be set automatically via useEffect when user updates
      return result;
    } catch (error) {
      console.error("Sign in error:", error);
      return { success: false, error: error as Error };
    } finally {
      setLoadingState(false);
    }
  };

  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      setLoadingState(true);
      const result = await authService.signUp(email, password, userData);
      // Role will be set automatically via useEffect when user updates
      return result;
    } catch (error) {
      console.error("Sign up error:", error);
      return { success: false, error: error as Error };
    } finally {
      setLoadingState(false);
    }
  };

  const signOut = async () => {
    try {
      setLoadingState(true);
      await authService.signOut();
      // Clear all state
      setUserRole(null);
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      setLoadingState(false);
    }
  };

  // REFACTOR: Simplified updateUserRole to only update auth metadata
  // Removed database synchronization and localStorage storage
  const updateUserRole = async (role: UserRole) => {
    try {
      console.log("UNIFIED ROLE UPDATE: Updating auth metadata only:", role);
      
      const { error } = await supabase.auth.updateUser({
        data: { role }
      });
      
      if (error) throw error;
      
      // Role will be updated automatically via useEffect when user metadata changes
      console.log("UNIFIED ROLE UPDATE: Successfully updated auth metadata");
    } catch (error) {
      console.error("Error updating user role:", error);
      throw error;
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    try {
      setProfileLoading(true);
      return await authService.updateProfile(data);
    } catch (error) {
      console.error("Update profile error:", error);
      return { success: false, error: error as Error };
    } finally {
      setProfileLoading(false);
    }
  };

  const contextValue: AuthContextType = {
    user,
    userProfile,
    userRole, // SINGLE SOURCE: Only from auth metadata
    loading: sessionLoading || loading || profileLoading,
    isSignedIn,
    isError,
    isNewUser,
    clearIsNewUser,
    signIn,
    signUp,
    signOut,
    refreshUserProfile,
    updateUserRole,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
