
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { AuthContextType } from "./types/authTypes";

/**
 * Custom hook to access authentication context
 * @returns AuthContextType - The authentication context
 * @throws Error - If used outside AuthProvider
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};
