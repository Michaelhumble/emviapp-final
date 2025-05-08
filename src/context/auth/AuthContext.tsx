
import { createContext } from "react";
import { AuthContextType } from "./types";

// Create the auth context with undefined as default value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Add display name for easier debugging
AuthContext.displayName = 'AuthContext';
