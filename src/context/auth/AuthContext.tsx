
import React from "react";
import { createContext } from "react";
import { AuthContextType } from "./types";
import { AuthProvider as AuthProviderComponent } from "./AuthProvider";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
AuthContext.displayName = 'AuthContext';

// Export the AuthProvider component
export { AuthProviderComponent as AuthProvider };
