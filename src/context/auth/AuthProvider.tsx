
import { useState, useEffect, createContext } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthContextType, UserProfile, UserRole } from "./types";
import { toast } from "sonner";
import { AuthContext } from "./AuthContext";

// Initial context value
const initialAuthContext: AuthContextType = {
  session: null,
  user: null,
  userProfile: null,
  userRole: null,
  loading: true,
  isSignedIn: false,
  isNewUser: false,
  clearIsNewUser: () => {},
  signIn: async () => { return undefined; },
  signUp: async () => { return undefined; },
  signOut: async () => {},
  refreshUserProfile: async () => {},
};

// Auth provider component that wraps the app
export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // If the user just signed up, set the new user flag
        // Use the correct AuthChangeEvent type from Supabase
        if (event === 'SIGNED_UP') {
          console.log("New user signed up!");
          setIsNewUser(true);
          // Store this in localStorage as well for persistence
          localStorage.setItem('emviapp_new_user', 'true');
        }
      }
    );

    // Check for existing session
    const getInitialSession = async () => {
      try {
        setLoading(true);
        
        // Get the user's session
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        setSession(initialSession);
        setUser(initialSession?.user ?? null);

        // Check if user is new from localStorage
        const isNewUserFromStorage = localStorage.getItem('emviapp_new_user') === 'true';
        if (isNewUserFromStorage) {
          setIsNewUser(true);
        }
        
        if (initialSession?.user) {
          // Fetch the user's profile
          await fetchUserProfile(initialSession.user.id);
        }
      } catch (error) {
        console.error("Error fetching initial session:", error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch user profile from the database
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')  // Use 'users' table instead of 'profiles'
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        // Cast data to UserProfile with type assertion
        setUserProfile(data as unknown as UserProfile);
        setUserRole(data.role as UserRole);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  // Clear the new user flag
  const clearIsNewUser = () => {
    setIsNewUser(false);
    localStorage.removeItem('emviapp_new_user');
  };

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // Show success toast
      toast.success("Signed in successfully!");
      
      return data;
    } catch (error) {
      console.error("Error signing in:", error);
      toast.error(error.message || "Failed to sign in");
      throw error;
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // Show success toast
      toast.success("Account created successfully!");
      
      // Set the new user flag
      setIsNewUser(true);
      localStorage.setItem('emviapp_new_user', 'true');
      
      return data;
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error(error.message || "Failed to sign up");
      throw error;
    }
  };

  // Sign out the current user
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      // Clear user data
      setSession(null);
      setUser(null);
      setUserProfile(null);
      setUserRole(null);
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
      throw error;
    }
  };

  // Refresh the user profile data
  const refreshUserProfile = async () => {
    if (user) {
      await fetchUserProfile(user.id);
    }
  };

  // The value to provide to the context consumers
  const value: AuthContextType = {
    session,
    user,
    userProfile,
    userRole,
    loading,
    isSignedIn: !!user,
    isNewUser,
    clearIsNewUser,
    signIn,
    signUp,
    signOut,
    refreshUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
