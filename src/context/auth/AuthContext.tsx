
import { createContext } from "react";
import { AuthContextType } from "./types";

// Create AuthContext with default empty values
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
