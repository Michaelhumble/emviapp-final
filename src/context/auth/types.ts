
import { User } from '@supabase/supabase-js';

export type UserRole = 'customer' | 'salon' | 'artist' | 'admin' | 'other';

export interface AuthContextType {
  user: User | null;
  isSignedIn: boolean;
  signOut: () => Promise<void>;
  isLoading: boolean;
  userRole?: UserRole | null;
  setUserRole?: (role: UserRole) => void;
}
