
import { createContext } from "react";

export interface AuthContextType {
  user: any | null;
  userProfile: any | null;
  isSignedIn: boolean;
  userRole: string | null;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
AuthContext.displayName = 'AuthContext';
