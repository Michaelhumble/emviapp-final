
import { createContext } from "react";
import { AuthContextType } from "./types/authTypes";

// Create a context with undefined as initial value
// The actual value will be provided by the AuthProvider
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Assign a display name for better debugging
AuthContext.displayName = 'AuthContext';
