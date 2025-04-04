
import { createContext } from 'react';
import { AuthContextType } from './types';

// Create the auth context with undefined default value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
