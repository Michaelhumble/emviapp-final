
import { AuthContextType } from "./types";
import { AuthContext } from "./AuthContext";
import { useAuthProvider } from "./hooks/useAuthProvider";

/**
 * Auth provider component that wraps the app
 */
export const AuthProvider = ({ children }) => {
  // Use the custom hook to get all auth functionality
  const authContextValue = useAuthProvider();
  
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
