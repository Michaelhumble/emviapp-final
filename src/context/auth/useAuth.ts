
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { AuthContextType } from "./types/authTypes";

/**
 * Custom hook to access authentication context throughout the application
 * 
 * @returns {AuthContextType} The authentication context containing user state and auth methods
 * @throws {Error} If used outside of an AuthProvider component
 * 
 * @example
 * ```tsx
 * const { user, signIn, signOut, isSignedIn } = useAuth();
 * 
 * // Check if user is authenticated
 * if (isSignedIn) {
 *   // User is logged in
 * }
 * ```
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};
