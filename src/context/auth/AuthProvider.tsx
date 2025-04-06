
import { AuthContextType } from "./types";
import { AuthContext } from "./AuthContext";
import { useAuthProvider } from "./hooks/useAuthProvider";

/**
 * Auth provider component that wraps the app
 */
export const AuthProvider = ({ children }) => {
  // Use the custom hook to get all auth functionality
  const authContextValue = useAuthProvider();
  
  // Add the loading alias for backward compatibility
  const contextWithLoadingAlias: AuthContextType = {
    ...authContextValue,
    loading: authContextValue.isLoading
  };
  
  return (
    <AuthContext.Provider value={contextWithLoadingAlias}>
      {children}
    </AuthContext.Provider>
  );
};
